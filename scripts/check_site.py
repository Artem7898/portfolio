"""Validate static assets and navigation at root and GitHub project subpaths."""
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urljoin, urlsplit
import hashlib

ROOT = Path(__file__).resolve().parents[1]
PUBLIC = ROOT / "dist"


class Document(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.ids = []
        self.references = []
        self.semantic = []

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        self.semantic.append(tag)
        if "id" in a:
            self.ids.append(a["id"])
        for name in ("href", "src"):
            if a.get(name):
                self.references.append(a[name])
        if a.get("target") == "_blank":
            assert {"noopener", "noreferrer"} <= set(a.get("rel", "").split()), a
        if tag == "img":
            assert "alt" in a, "Missing image alt text"


html = (PUBLIC / "index.html").read_text(encoding="utf-8")
doc = Document()
doc.feed(html)
assert len(doc.ids) == len(set(doc.ids)), "Duplicate element IDs"
assert "base" not in doc.semantic, "A base element can break project-relative URLs"
assets = set()
for ref in doc.references:
    if ref.startswith("#"):
        assert ref == "#" or ref[1:] in doc.ids, f"Missing anchor: {ref}"
        continue
    parsed = urlsplit(ref)
    if parsed.scheme or parsed.netloc:
        continue
    assert not parsed.path.startswith("/"), f"Root-relative URL breaks GitHub project Pages: {ref}"
    for prefix in ("/", "/portfolio/"):
        resolved = urlsplit(urljoin("https://example.github.io" + prefix, ref)).path
        assert resolved.startswith(prefix), f"Asset escapes the project path: {ref}"
        asset = (PUBLIC / unquote(resolved[len(prefix):])).resolve()
        assert asset.is_relative_to(PUBLIC.resolve()), f"Asset escapes dist: {ref}"
        assert asset.is_file() and asset.stat().st_size, f"Missing asset: {ref}"
        assets.add(asset)
assert doc.semantic.count("h1") == 1
assert all(tag in doc.semantic for tag in ("main", "header", "nav", "footer", "section", "article"))
assert "appgprj_" not in html and "chatgpt.site" not in html
pdf = PUBLIC / "assets/Artem-Alimpiev-CV.pdf"
assert pdf.read_bytes().startswith(b"%PDF-"), "CV is not a PDF"
css = (PUBLIC / "assets/styles.css").read_text(encoding="utf-8")
assert all(word in css for word in ("grid-template-columns", "prefers-reduced-motion", "max-width:600px", ".flex"))
assert "0.6.3" in html and "0.2.1" in html
assert "alimpievne@gmail.com" in html
assert (PUBLIC / ".nojekyll").is_file()
print(f"PASS: {len(doc.ids)} unique IDs, {len(doc.references)} links, {len(assets)} local assets.")
print("PASS: asset paths at / and /portfolio/, semantic markup, responsive CSS, PDF download.")
print("CV SHA-256:", hashlib.sha256(pdf.read_bytes()).hexdigest())
