# Artem Alimpiev — personal portfolio

For deployment, start with [DEPLOY_RU.md](DEPLOY_RU.md). Verification results: [VALIDATION_RU.md](VALIDATION_RU.md).

A responsive portfolio in English, Russian, and Spanish with a dark bento layout, local terminal interactions, code examples, project links, and the original CV download.

## Development

Requires Node.js 24 and Python 3 for the optional static checks.

```bash
npm ci
npm run build
npm run check
npm test
```

Serve `dist/` with any static web server. CSS is compiled from Tailwind CSS 4 and the custom component styles; production does not depend on a Tailwind CDN. DM Sans and JetBrains Mono are loaded from Google Fonts with local system font fallbacks.

## Structure

- `dist/index.html`: semantic document and bento sections.
- `src/styles.css`: Tailwind entry point, design tokens, component styles, and responsive layouts.
- `dist/assets/styles.css`: compiled production styles.
- `dist/assets/app.js`: progressive enhancements with no framework or tracking.
- `dist/assets/i18n.js`: complete UI translations, terminal messages, metadata, and persisted language selection.
- `dist/assets/layout.js`: pointer/touch and keyboard card ordering with browser-local persistence.
- `tests/interactions.test.cjs`: DOM-level interaction tests (no browser rendering).
- `dist/assets/Artem-Alimpiev-CV.pdf`: unchanged CV supplied by the owner.
- `scripts/check_site.py`: asset, anchor, semantic markup, and subpath deployment checks.
- `.github/workflows/pages.yml`: GitHub Pages build, checks, tests, and deployment.
- `DEPLOY_RU.md`: Russian deployment instructions.

## Interactions

Tech buttons reveal contextual experience. Code tabs support keyboard navigation and copying. The terminal supports `help`, `whoami`, `about`, `projects`, `stack`, `contact`, and `clear`; it does not run shell commands. Email copying includes a fallback. Performance notes use an accessible native dialog. Motion honors the reduced-motion preference.

The RU / EN / ES buttons switch the page language immediately, including technology descriptions, terminal history, copy feedback, metadata, and accessibility labels. Selection is saved in localStorage. The supplied CV remains the original English PDF.

Arrange cards enables dedicated drag handles and earlier/later buttons. Handles support pointer events (mouse and touch), arrow keys, Home, and End. Dragging supports edge auto-scrolling and Escape cancellation. Card order is saved in localStorage; reset restores the authored layout. Invalid saved layouts are normalized, new cards are retained, and denied storage does not prevent use during the current visit. Preferences affect only the current browser, not the shared source layout.

## Content provenance

The supplied Artem Alimpiev CV provides the contact details, project links, skills, four independent projects, one commercial website, and two website languages. The requested Nova Demo package version (0.6.3) and app version (0.2.1) are displayed separately and are not described as automatically current versions. Project descriptions are grounded in the CV and task brief.

The performance values are calculated from the repository’s `bench-models-v3.json` snapshot retrieved on 6 October 2026 UTC: the `nova_model_initialization` benchmark contains 120 measured values with a mean of 1.7768651525 μs and sample standard deviation of 0.0474263306 μs. These runs are dated 23 August 2026 on CPython 3.12.13 / AMD Ryzen 7 5800H. The displayed 563k operations/sec is the reciprocal of the mean, rounded. This is model construction, not HTTP throughput, SQL, save-time validation, caching, or a fresh benchmark of package 0.6.3. Full context is available in the on-page measurement dialog. Public repository references:

- https://github.com/Artem7898/django-nova
- https://github.com/Artem7898/django-nova/blob/main/bench-models-v3.json
- https://github.com/Artem7898/flakydetector
- https://github.com/Artem7898/homeinventory

Browser visual QA is unavailable in the current managed execution environment. Static validation and production CSS compilation are available. No analytics or server-side visitor storage is included. Language and card-order preferences are stored only in the visitor’s browser.
