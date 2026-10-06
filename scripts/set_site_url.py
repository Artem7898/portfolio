"""Set deployment metadata from SITE_URL without affecting relative asset URLs."""
from html import escape
from pathlib import Path
from urllib.parse import urlsplit
import os
import re

page = Path(__file__).resolve().parents[1] / "dist/index.html"
html = page.read_text(encoding="utf-8")
html = re.sub(r'^\s*<meta property="og:url"[^>]*>\n', '', html, flags=re.MULTILINE)
url = os.environ.get("SITE_URL", "").strip()
if url:
    parts = urlsplit(url)
    if parts.scheme not in {"http", "https"} or not parts.hostname or parts.username or parts.password or parts.query or parts.fragment:
        raise SystemExit("SITE_URL must be an absolute HTTP(S) website URL without credentials, query or fragment")
    html = html.replace('</head>', f'  <meta property="og:url" content="{escape(url.rstrip("/") + "/", quote=True)}">\n</head>')
page.write_text(html, encoding="utf-8")
print("Site URL metadata configured." if url else "Portable build: no fixed hosting URL.")
