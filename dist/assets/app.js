/* Browser-local enhancements; core navigation and downloads need no JavaScript. */
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const { t } = window.PortfolioI18n;
let toastTimer;

function notify(message) {
  const toast = $('#toast');
  toast.textContent = message;
  toast.classList.add('visible');
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toast.classList.remove('visible'), 2800);
}

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    const field = document.createElement('textarea');
    field.value = text;
    field.style.cssText = 'position:fixed;left:-9999px;top:0;opacity:0';
    document.body.append(field);
    const previous = document.activeElement;
    field.select();
    let copied = false;
    try { copied = document.execCommand('copy'); } catch { /* Manual copy remains available. */ }
    field.remove();
    previous?.focus();
    return copied;
  }
}

$('#copy-email').addEventListener('click', async () => {
  const copied = await copyText('alimpievne@gmail.com');
  notify(t(copied ? 'emailCopied' : 'emailFallback'));
  if (copied) {
    const label = $('#copy-email span');
    label.textContent = t('copied');
    window.setTimeout(() => { label.textContent = t('copyEmail'); }, 2300);
  }
});

$$('[data-tech]').forEach((button) => button.addEventListener('click', () => {
  $$('[data-tech]').forEach((item) => {
    const selected = item === button;
    item.classList.toggle('selected', selected);
    item.setAttribute('aria-pressed', String(selected));
  });
  $('#tech-description').textContent = t(`tech_${button.dataset.tech}`);
}));

const codeExamples = {
  schema: {
    html: '<span class="syntax-purple">from</span> pydantic <span class="syntax-purple">import</span> BaseModel, Field\n\n<span class="syntax-purple">class</span> <span class="syntax-blue">ArticleSchema</span>(BaseModel):\n    title: <span class="syntax-blue">str</span> = Field(min_length=<span class="syntax-orange">5</span>)\n    views: <span class="syntax-blue">int</span> = Field(default=<span class="syntax-orange">0</span>, ge=<span class="syntax-orange">0</span>)\n\n<span class="syntax-comment"># A shared, explicit data contract.</span>\npayload = article.to_pydantic().model_dump()',
    footer: 'Python / Pydantic v2',
  },
  json: {
    html: '{\n  <span class="syntax-blue">"title"</span>: <span class="syntax-lime">"Hello Nova"</span>,\n  <span class="syntax-blue">"views"</span>: <span class="syntax-orange">0</span>\n}',
    footer: 'Illustrative output',
  },
};
function selectCode(button, focus = false) {
  $$('[data-code]').forEach((item) => {
    item.setAttribute('aria-selected', String(item === button));
    item.tabIndex = item === button ? 0 : -1;
  });
  // Only these hard-coded examples are inserted as markup; terminal input uses textContent.
  $('#nova-code').innerHTML = codeExamples[button.dataset.code].html.replace('# A shared, explicit data contract.', t('codeComment'));
  $('#code-panel').setAttribute('aria-labelledby', button.id);
  $('.code-bottom span:last-child').textContent = button.dataset.code === 'json' ? t('outputFooter') : codeExamples.schema.footer;
  if (focus) button.focus();
}
$$('[data-code]').forEach((button, index, buttons) => {
  button.addEventListener('click', () => selectCode(button));
  button.addEventListener('keydown', (event) => {
    let next;
    if (event.key === 'ArrowRight') next = (index + 1) % buttons.length;
    if (event.key === 'ArrowLeft') next = (index + buttons.length - 1) % buttons.length;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = buttons.length - 1;
    if (next !== undefined) { event.preventDefault(); selectCode(buttons[next], true); }
  });
});
$('#copy-code').addEventListener('click', async () => {
  notify(t(await copyText($('#nova-code').textContent) ? 'codeCopied' : 'codeFallback'));
});

const terminalEntries = [];
let terminalCleared = false;
const commandAliases = {
  'помощь': 'help', 'проекты': 'projects', 'стек': 'stack', 'контакты': 'contact',
  'обо мне': 'about', 'очистить': 'clear', 'кто я': 'whoami',
  ayuda: 'help', proyectos: 'projects', tecnologias: 'stack', 'tecnologías': 'stack',
  contacto: 'contact', limpiar: 'clear', acerca: 'about',
};
function renderTerminal() {
  const log = $('#terminal-history');
  log.replaceChildren();
  if (!terminalCleared && terminalEntries.length === 0) {
    const hint = document.createElement('p');
    hint.className = 'terminal-hint';
    hint.append(`${t('tryCommands')} `);
    ['help', 'projects', 'contact'].forEach((command, index) => {
      if (index > 0) hint.append(index === 2 ? ` ${t('commandOr')} ` : ', ');
      const button = document.createElement('button');
      button.type = 'button'; button.dataset.command = command; button.textContent = command;
      hint.append(button);
    });
    hint.append('.'); log.append(hint);
  }
  terminalEntries.forEach(({raw, command}) => {
    const entry = document.createElement('div');
    entry.className = 'terminal-result';
    const prompt = document.createElement('p');
    prompt.className = 'terminal-result-command'; prompt.textContent = `❯ ${raw}`;
    const answer = document.createElement('p');
    const known = ['help', 'about', 'whoami', 'projects', 'stack', 'contact'].includes(command);
    answer.textContent = known ? t(`terminal_${command}`) : t('unknownCommand', {command: raw});
    entry.append(prompt, answer); log.append(entry);
  });
  log.scrollTop = log.scrollHeight;
}
function runCommand(raw) {
  raw = raw.trim().toLowerCase().slice(0, 80);
  if (!raw) return;
  const command = commandAliases[raw] ?? raw;
  if (command === 'clear') { terminalEntries.length = 0; terminalCleared = true; }
  else { terminalEntries.push({raw, command}); if (terminalEntries.length > 12) terminalEntries.shift(); }
  renderTerminal();
}
$('#terminal-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const input = $('#terminal-input');
  runCommand(input.value);
  input.value = '';
  input.focus();
});
$('#terminal-history').addEventListener('click', (event) => {
  const button = event.target.closest('[data-command]');
  if (button) runCommand(button.dataset.command);
});

function refreshLocalizedContent() {
  $('#copy-email span').textContent = t('copyEmail');
  const tech = $('[data-tech][aria-pressed="true"]');
  $('#tech-description').textContent = t(`tech_${tech.dataset.tech}`);
  selectCode($('[data-code][aria-selected="true"]'));
  renderTerminal();
}
window.addEventListener('portfolio:language', refreshLocalizedContent);
refreshLocalizedContent();

const benchmarkDialog = $('#benchmark-dialog');
$('#open-benchmark').addEventListener('click', () => benchmarkDialog.showModal());
$('#close-benchmark').addEventListener('click', () => benchmarkDialog.close());
benchmarkDialog.addEventListener('click', (event) => {
  if (event.target !== benchmarkDialog) return;
  const bounds = benchmarkDialog.getBoundingClientRect();
  if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) benchmarkDialog.close();
});

// These are CV-backed project counts, not simulated live telemetry.
if ('IntersectionObserver' in window && !reducedMotion.matches) {
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      counterObserver.unobserve(entry.target);
      const target = Number(entry.target.dataset.count);
      const start = performance.now();
      const frame = (now) => {
        const progress = Math.min((now - start) / 700, 1);
        entry.target.textContent = String(Math.round(target * (1 - Math.pow(1 - progress, 3))));
        if (progress < 1) requestAnimationFrame(frame);
      };
      requestAnimationFrame(frame);
    });
  }, { threshold: 0.6 });
  $$('[data-count]').forEach((element) => counterObserver.observe(element));
}

if (window.matchMedia('(hover: hover) and (min-width: 1101px)').matches && !reducedMotion.matches) {
  const hero = $('.hero-card');
  const art = $('.hero-art');
  hero.addEventListener('pointermove', (event) => {
    const bounds = hero.getBoundingClientRect();
    art.style.setProperty('--rot-y', `${((event.clientX - bounds.left) / bounds.width - 0.5) * 12}deg`);
    art.style.setProperty('--rot-x', `${((event.clientY - bounds.top) / bounds.height - 0.5) * -10}deg`);
  });
  hero.addEventListener('pointerleave', () => {
    art.style.setProperty('--rot-x', '0deg');
    art.style.setProperty('--rot-y', '0deg');
  });
}
