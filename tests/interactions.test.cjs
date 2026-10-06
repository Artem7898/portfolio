const { test } = require('node:test');
const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const { join } = require('node:path');
const { JSDOM } = require('jsdom');
const root = join(__dirname, '..');
const html = readFileSync(join(root, 'dist/index.html'), 'utf8');
const source = name => readFileSync(join(root, 'dist/assets', name), 'utf8');
const orderOf = doc => [...doc.querySelectorAll('#portfolio-grid > [data-card-id]')].map(card => card.dataset.cardId);
const defaults = ['hero', 'stack', 'nova', 'terminal', 'demo', 'flaky', 'inventory', 'stats', 'commercial', 'contact'];

function boot({language, order, blockedStorage = false, url = 'https://portfolio.test/portfolio/'} = {}) {
  const dom = new JSDOM(html, {url, runScripts: 'outside-only', pretendToBeVisual: true});
  const w = dom.window;
  w.matchMedia = query => ({matches: query.includes('prefers-reduced-motion'), addEventListener() {}, removeEventListener() {}});
  w.HTMLElement.prototype.scrollIntoView = function () {};
  w.HTMLElement.prototype.setPointerCapture = function (id) { this.capturedId = id; };
  w.HTMLElement.prototype.hasPointerCapture = function (id) { return this.capturedId === id; };
  w.HTMLElement.prototype.releasePointerCapture = function () { this.capturedId = null; };
  w.scrollBy = () => {};
  w.document.elementFromPoint = () => null;
  if (language) w.localStorage.setItem('artem-portfolio-language-v1', language);
  if (order !== undefined) w.localStorage.setItem('artem-portfolio-layout-v1', typeof order === 'string' ? order : JSON.stringify(order));
  if (blockedStorage) Object.defineProperty(w, 'localStorage', {get() { throw new Error('Storage unavailable'); }});
  const errors = [];
  w.addEventListener('error', event => errors.push(event.error));
  ['i18n.js', 'app.js', 'layout.js'].forEach(name => w.eval(source(name)));
  return {dom, w, d: w.document, errors};
}
function key(w, element, value) { element.dispatchEvent(new w.KeyboardEvent('keydown', {key: value, bubbles: true, cancelable: true})); }
function command(w, d, text) { d.querySelector('#terminal-input').value = text; d.querySelector('#terminal-form').dispatchEvent(new w.Event('submit', {bubbles: true, cancelable: true})); }
function pointer(w, element, type, props = {}) {
  const event = new w.Event(type, {bubbles: true, cancelable: true});
  Object.assign(event, {pointerId: 1, button: 0, clientX: 30, clientY: 120}, props);
  element.dispatchEvent(event);
}

test('scripts, CSS, favicon and CV resolve inside root and project Pages paths in every language', () => {
  for (const path of ['/', '/portfolio/']) {
    const {dom, w, d, errors} = boot({url: `https://portfolio.test${path}`});
    for (const language of ['en', 'ru', 'es']) {
      w.PortfolioI18n.setLanguage(language);
      const elements = d.querySelectorAll('script[src], link[rel="stylesheet"], link[rel="icon"], .cv-button');
      for (const element of elements) {
        const reference = element.getAttribute('src') || element.getAttribute('href');
        if (/^https?:/.test(reference)) continue;
        const resolved = new URL(reference, d.baseURI);
        assert.equal(resolved.origin, 'https://portfolio.test');
        assert.ok(resolved.pathname.startsWith(`${path}assets/`), resolved.href);
      }
      assert.equal(d.querySelector('.cv-button').href, `https://portfolio.test${path}assets/Artem-Alimpiev-CV.pdf`);
    }
    assert.deepEqual(errors, []); dom.window.close();
  }
});

test('all translations target real elements and cover three languages', () => {
  const {dom, w, d, errors} = boot({language: 'en'});
  // Validate selectors against the original HTML, before layout controls are injected.
  const original = new JSDOM(html).window.document;
  for (const [selector, ru, es] of w.PortfolioI18n.bindings) {
    assert.ok(original.querySelector(selector), `Missing translation target: ${selector}`);
    assert.ok(ru && es);
  }
  for (const [name, values] of Object.entries(w.PortfolioI18n.messages)) {
    assert.equal(values.length, 3, name);
    assert.ok(values.every(value => typeof value === 'string' && value.length), name);
  }
  for (const [lang, expected, terminal] of [['ru', 'Артём', 'Команды:'], ['es', 'Artem', 'Comandos:'], ['en', 'Artem', 'Available commands:']]) {
    d.querySelector(`[data-language="${lang}"]`).click();
    assert.equal(d.documentElement.lang, lang);
    assert.match(d.querySelector('#hero-title').textContent, new RegExp(expected));
    assert.equal(w.localStorage.getItem('artem-portfolio-language-v1'), lang);
    assert.equal(d.querySelectorAll('[data-language][aria-pressed="true"]').length, 1);
    command(w, d, 'help');
    assert.ok(d.querySelector('#terminal-history').textContent.includes(terminal));
    assert.equal(d.querySelector('.cv-button').getAttribute('href'), './assets/Artem-Alimpiev-CV.pdf');
    assert.equal(d.querySelector('.version-row b').textContent, '0.6.3');
  }
  assert.deepEqual(errors, []); dom.window.close();
});

test('locale refresh preserves selected technology, code tab, terminal history, and safe input', () => {
  const {dom, w, d, errors} = boot({language: 'en'});
  d.querySelector('[data-tech="Redis"]').click(); d.querySelector('#tab-json').click();
  command(w, d, 'projects');
  d.querySelector('[data-language="ru"]').click();
  assert.match(d.querySelector('#tech-description').textContent, /инвалидация/);
  assert.equal(d.querySelector('#tab-json').getAttribute('aria-selected'), 'true');
  assert.equal(JSON.parse(d.querySelector('#nova-code').textContent).title, 'Hello Nova');
  assert.match(d.querySelector('#terminal-history').textContent, /типизированный инструментарий/);
  command(w, d, 'помощь'); assert.match(d.querySelector('#terminal-history').textContent, /Команды:/);
  command(w, d, '<img src=x onerror=alert(1)>');
  assert.equal(d.querySelector('#terminal-history img'), null);
  command(w, d, 'очистить'); assert.equal(d.querySelector('#terminal-history').textContent, '');
  d.querySelector('[data-language="es"]').click();
  assert.equal(d.querySelector('#terminal-history').textContent, '');
  command(w, d, 'proyectos'); assert.match(d.querySelector('#terminal-history').textContent, /herramientas tipadas/);
  assert.deepEqual(errors, []); dom.window.close();
});

test('keyboard reorder persists DOM order, survives reload, and resets', () => {
  const {dom, w, d, errors} = boot({language: 'ru'});
  assert.deepEqual(orderOf(d), defaults);
  d.querySelector('#edit-layout').click();
  const handle = d.querySelector('[data-card-id="hero"] .drag-handle');
  key(w, handle, 'End');
  assert.equal(orderOf(d).at(-1), 'hero');
  assert.equal(d.activeElement, handle);
  const stored = w.localStorage.getItem('artem-portfolio-layout-v1');
  assert.deepEqual(JSON.parse(stored), orderOf(d));
  d.querySelector('[data-language="es"]').click();
  assert.equal(orderOf(d).at(-1), 'hero');
  assert.match(handle.getAttribute('aria-label'), /Mover Presentación/);
  const reloaded = boot({language: 'es', order: stored});
  assert.deepEqual(orderOf(reloaded.d), orderOf(d));
  assert.equal(reloaded.d.querySelector('[data-language="es"]').getAttribute('aria-pressed'), 'true');
  d.querySelector('#edit-layout').click();
  assert.ok([...d.querySelectorAll('.card-move-controls')].every(element => element.hidden));
  assert.equal(d.querySelector('#reset-layout').hidden, false);
  d.querySelector('#reset-layout').click();
  assert.deepEqual(orderOf(d), defaults);
  assert.equal(d.querySelector('.section-divider').hidden, false);
  assert.deepEqual(errors, []); reloaded.dom.window.close(); dom.window.close();
});

test('drag and touch-style pointer events reorder on drop and Escape cancels', () => {
  const {dom, w, d, errors} = boot({language: 'en'});
  d.querySelector('#edit-layout').click();
  const handle = d.querySelector('[data-card-id="hero"] .drag-handle');
  const target = d.querySelector('[data-card-id="flaky"]');
  target.getBoundingClientRect = () => ({top: 100, height: 200, left: 0, width: 300});
  d.elementFromPoint = () => target;
  pointer(w, handle, 'pointerdown');
  pointer(w, handle, 'pointermove', {clientY: 260, pointerType: 'touch'});
  assert.ok(d.querySelector('.drag-ghost'));
  assert.ok(target.classList.contains('drop-after'));
  pointer(w, handle, 'pointerup', {clientY: 260});
  assert.equal(orderOf(d).indexOf('hero'), orderOf(d).indexOf('flaky') + 1);
  assert.equal(d.querySelector('.drag-ghost'), null);
  const saved = [...orderOf(d)];
  pointer(w, handle, 'pointerdown'); pointer(w, handle, 'pointermove', {clientY: 110, clientX: 90});
  key(w, handle, 'Escape');
  assert.deepEqual(orderOf(d), saved);
  assert.equal(d.querySelector('.drag-ghost'), null);
  assert.equal(d.body.classList.contains('drag-in-progress'), false);
  assert.deepEqual(errors, []); dom.window.close();
});

test('invalid saved layouts and unavailable browser storage do not break the UI', () => {
  for (const value of ['{broken', {unexpected: true}, ['contact', 'contact', 'unknown']]) {
    const {dom, d, errors} = boot({order: value});
    assert.equal(new Set(orderOf(d)).size, defaults.length);
    assert.deepEqual([...orderOf(d)].sort(), [...defaults].sort());
    assert.deepEqual(errors, []); dom.window.close();
  }
  const {dom, w, d, errors} = boot({blockedStorage: true});
  d.querySelector('[data-language="ru"]').click();
  d.querySelector('#edit-layout').click();
  key(w, d.querySelector('[data-card-id="hero"] .drag-handle'), 'ArrowDown');
  assert.equal(orderOf(d)[1], 'hero');
  assert.match(d.querySelector('#toast').textContent, /сеанс/);
  assert.deepEqual(errors, []); dom.window.close();
});

test('copy, code keyboard tabs, and project navigation survive localization and reordering', async () => {
  const {dom, w, d, errors} = boot({language: 'es'});
  let clipboard = '';
  Object.defineProperty(w.navigator, 'clipboard', {value: {writeText: async value => { clipboard = value; }}});
  d.querySelector('#copy-email').click(); await new Promise(resolve => setImmediate(resolve));
  assert.equal(clipboard, 'alimpievne@gmail.com'); assert.match(d.querySelector('#toast').textContent, /Email copiado/);
  key(w, d.querySelector('#tab-schema'), 'ArrowRight');
  d.querySelector('#copy-code').click(); await new Promise(resolve => setImmediate(resolve));
  assert.equal(JSON.parse(clipboard).views, 0);
  d.querySelector('#edit-layout').click();
  key(w, d.querySelector('[data-card-id="contact"] .drag-handle'), 'Home');
  d.querySelector('[data-language="ru"]').click();
  d.querySelector('#copy-email').click(); await new Promise(resolve => setImmediate(resolve));
  assert.equal(clipboard, 'alimpievne@gmail.com');
  assert.equal(d.querySelector('.demo-card .project-title').href, 'https://novademo.tech/');
  assert.deepEqual(errors, []); dom.window.close();
});
