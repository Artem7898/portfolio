/* Curated translations. Names of packages, code, and URLs stay unchanged. */
(() => {
  const arrow = '<svg class="icon"><use href="#i-arrow"/></svg>';
  const right = '<svg class="icon"><use href="#i-right"/></svg>';
  const dot = '<span class="status-dot"></span>';
  // [selector, Russian, Spanish, optional attribute]. English is the authored HTML.
  const bindings = [
    ['.skip-link', 'Перейти к содержимому', 'Ir al contenido'],
    ['.brand', 'Артём Алимпиев, главная', 'Artem Alimpiev, inicio', 'aria-label'],
    ['.desktop-nav', 'Основная навигация', 'Navegación principal', 'aria-label'],
    ['.desktop-nav a[href="#work"]', 'Проекты', 'Proyectos'],
    ['.desktop-nav a[href="#stack"]', 'Стек', 'Tecnologías'],
    ['.desktop-nav a[href="#contact"]', 'Контакты <span aria-hidden="true">↗</span>', 'Contacto <span aria-hidden="true">↗</span>'],
    ['.header-status', `${dot} Открыт к предложениям`, `${dot} Abierto a oportunidades`],
    ['.language-switch', 'Язык сайта', 'Idioma del sitio', 'aria-label'],
    ['.page-intro .eyebrow:first-child', 'НЕЗАВИСИМЫЙ РАЗРАБОТЧИК · OPEN SOURCE', 'DESARROLLADOR INDEPENDIENTE · CÓDIGO ABIERTO'],
    ['.intro-year', 'ПОРТФОЛИО / 2026', 'PORTAFOLIO / 2026'],
    ['.hero-top>span', 'Уругвай <span class="separator">/</span> Удалённо', 'Uruguay <span class="separator">/</span> Remoto'],
    ['#hero-title', 'Артём<br>Алимпиев<span class="lime">.</span>', 'Artem<br>Alimpiev<span class="lime">.</span>'],
    ['.hero-role', '<span class="lime">//</span> Python Backend-разработчик', '<span class="lime">//</span> Ingeniero backend Python'],
    ['.hero-description', 'Создаю системы,<br>на которых всё работает.', 'Construyo los sistemas<br>que hacen todo posible.'],
    ['.hero-detail', 'Продуманная архитектура. Явные контракты.<br>Понятный и поддерживаемый бэкенд на Python.', 'Arquitectura cuidada. Contratos explícitos.<br>Backends Python fáciles de comprender.'],
    ['.hero-content>.button', `Смотреть проекты ${right}`, `Explorar proyectos ${right}`],
    ['.label-two', '<i></i> Python в основе', '<i></i> Python en el centro'],
    ['.hero-footer>span:nth-child(2)', 'ПРОДУМАННЫЙ ПОДХОД К КОДУ', 'CÓDIGO CON INTENCIÓN'],
    ['.stack-card>.card-top>.eyebrow', '01 / ТЕХНОЛОГИИ', '01 / TECNOLOGÍAS'],
    ['#stack-title', 'Python в основе.<br><span class="muted">Надёжность на каждом уровне.</span>', 'Python primero.<br><span class="muted">Solidez en cada capa.</span>'],
    ['.stack-grid', 'Подробнее о технологиях', 'Explorar mis tecnologías', 'aria-label'],
    ['.stack-foot>span', 'ТАКЖЕ ИСПОЛЬЗУЮ', 'TAMBIÉN UTILIZO'],
    ['.flagship-card>.card-top>.eyebrow', '<span class="nova-spark">✳</span> 02 / ГЛАВНЫЙ OPEN-SOURCE ПРОЕКТ', '<span class="nova-spark">✳</span> 02 / PROYECTO PRINCIPAL'],
    ['.small-link', `НА PYPI ${arrow}`, `EN PYPI ${arrow}`],
    ['.flagship-heading>div>p', 'ORM Django. Более строгий контракт.', 'El ORM de Django. Un contrato más sólido.'],
    ['.flagship-heading>.tag', 'Автор и разработчик', 'Creador y mantenedor'],
    ['.flagship-description', 'Типизированный инструментарий Django: валидация Pydantic, планирование запросов по схемам и кэширование QuerySet.', 'Un conjunto de herramientas tipadas para Django: validación Pydantic, planificación de consultas basada en esquemas y caché de QuerySet.'],
    ['.code-tabs', 'Примеры кода Nova', 'Ejemplos de código de Nova', 'aria-label'],
    ['#copy-code', 'Копировать пример кода', 'Copiar ejemplo de código', 'aria-label'],
    ['.code-bottom>span:first-child', '<i class="status-dot"></i> Общая схема', '<i class="status-dot"></i> Esquema compartido'],
    ['.benchmark-panel>.eyebrow', 'ЗАМЕР / АВГУСТ 2026¹', 'PRUEBA / AGO 2026¹'],
    ['.benchmark-number', '1,78<span>мкс</span>', '1,78<span>μs</span>'],
    ['.benchmark-label', 'Инициализация модели', 'Inicialización del modelo'],
    ['.throughput>strong', '563 тыс.', '563 mil'],
    ['.throughput>span', 'инициализаций / сек', 'inicializaciones / seg'],
    ['#open-benchmark', '¹ Условия замера <span>↗</span>', '¹ Contexto de la medición <span>↗</span>'],
    ['.flagship-footer .tag:first-child', 'Типизация Python', 'Python tipado'],
    ['.flagship-footer .tag:last-child', 'Кэширование', 'Caché'],
    ['.flagship-footer>.text-link', `Исходный код ${arrow}`, `Ver código ${arrow}`],
    ['#terminal-title', 'НЕМНОГО ОБО МНЕ', 'UN POCO SOBRE MÍ'],
    ['.terminal-output', 'Инженер по опыту.<br>Создатель по призванию.', 'Ingeniero por experiencia.<br>Creador por curiosidad.'],
    ['.terminal-facts>p:nth-child(1)', '<span>фокус</span> backend-системы', '<span>enfoque</span> sistemas backend'],
    ['.terminal-facts>p:nth-child(2)', '<span>принцип</span> явность и типизация', '<span>criterio</span> explícito y tipado'],
    ['.terminal-facts>p:nth-child(3)', '<span>подход</span> проверять границы', '<span>método</span> probar los límites'],
    ['.terminal-facts>p:nth-child(4)', '<span>локация</span> Уругвай, удалённо', '<span>lugar</span> Uruguay, remoto'],
    ['#terminal-history', 'Ответы терминала', 'Resultados del terminal', 'aria-label'],
    ['.terminal-input-row .sr-only', 'Команда терминала', 'Comando del terminal'],
    ['#terminal-input', 'введите команду…', 'escribí un comando…', 'placeholder'],
    ['.terminal-input-row>button', 'Выполнить команду', 'Ejecutar comando', 'aria-label'],
    ['.terminal-footer', `${dot} ЛЮБОПЫТСТВО ПО УМОЛЧАНИЮ<span class="blinking-cursor" aria-hidden="true">▋</span>`, `${dot} CURIOSIDAD POR DEFECTO<span class="blinking-cursor" aria-hidden="true">▋</span>`],
    ['.section-divider>h2', 'Код для реальных задач<span>.</span>', 'Código que resuelve problemas<span>.</span>'],
    ['.section-divider>.eyebrow', '03 / ИЗБРАННЫЕ ПРОЕКТЫ', '03 / PROYECTOS SELECCIONADOS'],
    ['.demo-card>.card-top>.tag', 'ИНТЕРАКТИВНАЯ ЛАБОРАТОРИЯ', 'LABORATORIO INTERACTIVO'],
    ['.demo-card>p:not(.project-note)', 'Интерактивная лаборатория.<br>Проверьте django-nova в настоящем Django-приложении.', 'Un laboratorio interactivo.<br>Explorá django-nova en una aplicación Django real.'],
    ['.version-row>span:first-child', 'ПАКЕТ <b>0.6.3</b>', 'PAQUETE <b>0.6.3</b>'],
    ['.version-row>span:last-child', 'ДЕМО <b>0.2.1</b>', 'DEMO <b>0.2.1</b>'],
    ['.demo-card>.project-note', 'Отдельное приложение для проверки опубликованного пакета.', 'Una aplicación independiente para probar el paquete publicado.'],
    ['.demo-card>.project-bottom', `Открыть демо ${arrow}`, `Explorar la demo ${arrow}`],
    ['.flaky-card>.card-top>.tag', 'ИНСТРУМЕНТЫ РАЗРАБОТЧИКА', 'HERRAMIENTAS DE DESARROLLO'],
    ['.flaky-card>p', 'Находите скрытые сигналы в тестах.<br>Анализ AST и CatBoost выявляют потенциально нестабильные Python-тесты.', 'Encontrá señales ocultas en tus tests.<br>Análisis AST de Python y CatBoost para detectar posible inestabilidad.'],
    ['.flaky-visual', 'Иллюстрация паттерна теста с аномалией', 'Ilustración de un patrón de prueba con una anomalía', 'aria-label'],
    ['.anomaly-caption', '↳ исследовать аномалию', '↳ investigar lo inesperado'],
    ['.flaky-card>.project-bottom, .inventory-card>.project-bottom', `Открыть репозиторий ${arrow}`, `Explorar el repositorio ${arrow}`],
    ['.inventory-card>.card-top>.tag', 'ПРАКТИЧЕСКИЕ СЦЕНАРИИ', 'FLUJOS DE TRABAJO REALES'],
    ['.inventory-card>p', 'У каждой вещи своё место.<br>Учёт имущества с QR-сценариями и API с разграничением доступа.', 'Un lugar para cada cosa.<br>Gestión de inventario con flujos QR y APIs con control de permisos.'],
    ['.inventory-label>small', 'СЦЕНАРИЙ / 001', 'FLUJO / 001'],
    ['.inventory-label>b', 'Сканируй. Находи. Управляй.', 'Escaneá. Buscá. Gestioná.'],
    ['.inventory-label>span', '<i class="status-dot"></i> Всё под контролем', '<i class="status-dot"></i> Todo bajo control'],
    ['.stats-card', 'Опыт разработки', 'Experiencia de desarrollo', 'aria-label'],
    ['.stats-card>.card-top>.eyebrow', '04 / РАБОТА В ЦИФРАХ', '04 / EL TRABAJO EN CIFRAS'],
    ['.stats-grid>div:nth-child(1)>.stat-label', 'Самостоятельных<br>инженерных проекта', 'Proyectos de<br>ingeniería propios'],
    ['.stats-grid>div:nth-child(2)>.stat-label', 'Коммерческий<br>сайт создан', 'Sitio comercial<br>entregado'],
    ['.stats-grid>div:nth-child(3)>.stat-label', 'Языка на сайте<br>для клиента', 'Idiomas en el<br>sitio del cliente'],
    ['.stats-foot', `${dot} Публикация на PyPI <span>·</span> Асинхронный Python`, `${dot} Publicado en PyPI <span>·</span> Python asíncrono`],
    ['.commercial-card>.card-top>.eyebrow', 'ОТ КОДА К КЛИЕНТУ', 'DEL CÓDIGO AL CLIENTE'],
    ['#commercial-title', 'Реальные задачи.<br>Готовый результат.', 'Necesidades reales.<br>Resultados reales.'],
    ['.commercial-card>p', 'Accept Metall — двуязычный коммерческий сайт: от прямого общения с клиентом до адаптивной реализации.', 'Accept Metall: un sitio comercial bilingüe, desde el diálogo directo con el cliente hasta la implementación adaptable.'],
    ['.commercial-card>.text-link', `Коммерческий проект ${arrow}`, `Ver trabajo comercial ${arrow}`],
    ['.contact-card>div:first-child>.eyebrow', '05 / ДАВАЙТЕ ОБСУДИМ', '05 / CONVERSEMOS'],
    ['#contact-title', 'Хорошие системы начинаются<br>с хорошего разговора<span class="lime">.</span>', 'Los buenos sistemas empiezan<br>con una buena conversación<span class="lime">.</span>'],
    ['.contact-card>div:first-child>p', 'Рассматриваю удалённую backend-разработку и интересные совместные проекты.', 'Abierto a puestos remotos de backend y colaboraciones con propósito.'],
    ['.cv-button', '<svg class="icon"><use href="#i-download"/></svg>Скачать CV <span class="cv-format">PDF · EN</span>', '<svg class="icon"><use href="#i-download"/></svg>Descargar CV <span class="cv-format">PDF · EN</span>'],
    ['.site-footer>span:first-child', '© 2026 Артём Алимпиев', '© 2026 Artem Alimpiev'],
    ['.footer-message', 'Меньше магии. Больше продуманных решений.', 'Un poco menos de magia. Mucha más intención.'],
    ['.site-footer>a', 'Наверх <span aria-hidden="true">↑</span>', 'Volver arriba <span aria-hidden="true">↑</span>'],
    ['.dialog-header>.eyebrow', 'ПРОИЗВОДИТЕЛЬНОСТЬ / КОНТЕКСТ', 'RENDIMIENTO / CONTEXTO'],
    ['#close-benchmark', 'Закрыть условия замера', 'Cerrar contexto de la medición', 'aria-label'],
    ['#benchmark-dialog-title', 'Цифрам нужен контекст.', 'Los números necesitan contexto.'],
    ['#benchmark-dialog>p:nth-of-type(1)', 'Замер из репозитория от <strong>23 августа 2026 года</strong>: среднее время инициализации NovaModel — <strong>1,777 мкс</strong> по <strong>120 измеренным значениям</strong>. Выборочное стандартное отклонение — <strong>0,047 мкс</strong>.', 'Medición del repositorio del <strong>23 de agosto de 2026</strong>: la inicialización de NovaModel promedió <strong>1,777 μs</strong> en <strong>120 valores medidos</strong>, con una desviación estándar muestral de <strong>0,047 μs</strong>.'],
    ['#benchmark-dialog>p:nth-of-type(2)', 'Окружение: <strong>CPython 3.12.13</strong>, <strong>AMD Ryzen 7 5800H</strong>, Linux; pyperf 2.10.0. Показатель 563 тыс. инициализаций в секунду рассчитан как величина, обратная среднему времени.', 'Entorno: <strong>CPython 3.12.13</strong>, <strong>AMD Ryzen 7 5800H</strong>, Linux; pyperf 2.10.0. Las 563 mil inicializaciones por segundo se calculan como el inverso del tiempo medio.'],
    ['#benchmark-dialog>p:nth-of-type(3)', 'Измеряется создание экземпляра модели, а не пропускная способность HTTP, SQL, валидация при сохранении или кэширование. Это не новый замер релиза 0.6.3.', 'Se mide la creación de instancias del modelo, no el rendimiento HTTP, SQL, la validación al guardar ni la caché. No es una nueva medición de la versión 0.6.3.'],
    ['#benchmark-dialog>.button', `Исходные измерения ${arrow}`, `Ver mediciones originales ${arrow}`],
  ];

  // Dynamic UI messages are explicit in all three languages.
  const messages = {
    title: ['Artem Alimpiev — Python Backend Engineer', 'Артём Алимпиев — Python Backend-разработчик', 'Artem Alimpiev — Ingeniero backend Python'],
    description: ['Artem Alimpiev — Python Backend Engineer based in Uruguay. Creator of django-nova. Django, FastAPI, PostgreSQL, and thoughtful backend systems.', 'Артём Алимпиев — Python Backend-разработчик в Уругвае. Автор django-nova. Django, FastAPI, PostgreSQL и продуманные backend-системы.', 'Artem Alimpiev — Ingeniero backend Python en Uruguay. Creador de django-nova. Django, FastAPI, PostgreSQL y sistemas backend bien diseñados.'],
    copyEmail: ['Copy email', 'Копировать email', 'Copiar email'],
    copied: ['Copied!', 'Скопировано!', '¡Copiado!'],
    emailCopied: ['Email copied. Let’s talk!', 'Email скопирован. Давайте обсудим!', 'Email copiado. ¡Conversemos!'],
    emailFallback: ['Please copy: alimpievne@gmail.com', 'Скопируйте адрес: alimpievne@gmail.com', 'Copiá la dirección: alimpievne@gmail.com'],
    codeCopied: ['Code copied to clipboard.', 'Код скопирован.', 'Código copiado.'],
    codeFallback: ['Select the code to copy it manually.', 'Выделите код и скопируйте вручную.', 'Seleccioná el código y copialo manualmente.'],
    codeComment: ['# A shared, explicit data contract.', '# Общий, явный контракт данных.', '# Un contrato de datos compartido y explícito.'],
    outputFooter: ['Illustrative output', 'Пример результата', 'Resultado ilustrativo'],
    tryCommands: ['Try', 'Попробуйте', 'Probá'],
    commandOr: ['or', 'или', 'o'],
    terminal_help: ['Available commands:\n  about     who I am\n  projects  selected engineering work\n  stack     the technologies I use\n  contact   let’s connect\n  clear     clear this terminal', 'Команды:\n  about     обо мне\n  projects  мои проекты\n  stack     технологии\n  contact   контакты\n  clear     очистить терминал\n\nМожно вводить: помощь, проекты, стек, контакты, очистить.', 'Comandos:\n  about     sobre mí\n  projects  mis proyectos\n  stack     tecnologías\n  contact   contacto\n  clear     limpiar terminal\n\nTambién: ayuda, proyectos, tecnologías, contacto, limpiar.'],
    terminal_about: ['Artem Alimpiev — Python Backend Engineer.\nBased in Uruguay. Open to remote roles.\nCreator and maintainer of django-nova.', 'Артём Алимпиев — Python Backend-разработчик.\nЖиву в Уругвае. Рассматриваю удалённую работу.\nАвтор и разработчик django-nova.', 'Artem Alimpiev — Ingeniero backend Python.\nVivo en Uruguay. Abierto al trabajo remoto.\nCreador y mantenedor de django-nova.'],
    terminal_whoami: ['Artem Alimpiev // Python Backend Engineer\nI build the systems behind the experience.', 'Артём Алимпиев // Python Backend-разработчик\nСоздаю системы, на которых всё работает.', 'Artem Alimpiev // Ingeniero backend Python\nConstruyo los sistemas que hacen todo posible.'],
    terminal_projects: ['django-nova     → typed Django toolkit\nNova Demo       → interactive dogfooding lab\nFlakyDetector   → AST + CatBoost analysis\nHomeInventory   → QR inventory workflows\n\nExplore the project cards for links.', 'django-nova     → типизированный инструментарий Django\nNova Demo       → интерактивная лаборатория\nFlakyDetector   → анализ AST + CatBoost\nHomeInventory   → учёт имущества с QR\n\nСсылки доступны в карточках проектов.', 'django-nova     → herramientas tipadas para Django\nNova Demo       → laboratorio interactivo\nFlakyDetector   → análisis AST + CatBoost\nHomeInventory   → inventario con flujos QR\n\nEncontrá los enlaces en las tarjetas de proyectos.'],
    terminal_stack: ['Python · Django · FastAPI\nPostgreSQL · Redis · Asyncio · Docker\nPydantic · Pytest · GitHub Actions', 'Python · Django · FastAPI\nPostgreSQL · Redis · Asyncio · Docker\nPydantic · Pytest · GitHub Actions', 'Python · Django · FastAPI\nPostgreSQL · Redis · Asyncio · Docker\nPydantic · Pytest · GitHub Actions'],
    terminal_contact: ['alimpievne@gmail.com\ngithub.com/Artem7898\nlinkedin.com/in/artem-alimpiev\n\nCopy the email or download my CV in the contact card.', 'alimpievne@gmail.com\ngithub.com/Artem7898\nlinkedin.com/in/artem-alimpiev\n\nВ карточке контактов можно скопировать email и скачать резюме.', 'alimpievne@gmail.com\ngithub.com/Artem7898\nlinkedin.com/in/artem-alimpiev\n\nCopiá el email o descargá mi CV en la tarjeta de contacto.'],
    unknownCommand: ['Unknown command: {command}\nType help to see available commands.', 'Неизвестная команда: {command}\nВведите help или помощь.', 'Comando desconocido: {command}\nEscribí help o ayuda.'],
    tech_Django: ['Django ORM, shared validation schemas, and APIs with clear boundaries.', 'Django ORM, общие схемы валидации и API с чёткими границами.', 'Django ORM, esquemas de validación compartidos y APIs con límites claros.'],
    tech_FastAPI: ['Typed APIs for scientific workloads and developer tooling, with Pydantic contracts.', 'Типизированные API для научных задач и инструментов разработчика с контрактами Pydantic.', 'APIs tipadas para tareas científicas y herramientas de desarrollo, con contratos Pydantic.'],
    tech_PostgreSQL: ['Schema design, query optimization, indexing, and deliberate migration workflows.', 'Проектирование схем, оптимизация запросов, индексы и продуманные миграции.', 'Diseño de esquemas, optimización de consultas, índices y migraciones planificadas.'],
    tech_Redis: ['Caching and cache invalidation that account for transaction boundaries.', 'Кэширование и инвалидация кэша с учётом границ транзакций.', 'Caché e invalidación que respetan los límites de las transacciones.'],
    tech_Asyncio: ['Concurrent Python workflows, asynchronous tasks, and tracing across awaited work.', 'Конкурентные сценарии на Python, асинхронные задачи и трассировка ожидаемых операций.', 'Concurrencia en Python, tareas asíncronas y trazabilidad de operaciones con await.'],
    tech_Docker: ['Repeatable development environments with Docker, Compose, and CI checks.', 'Воспроизводимое окружение разработки с Docker, Compose и проверками CI.', 'Entornos de desarrollo reproducibles con Docker, Compose y verificaciones CI.'],
    arrange: ['Arrange cards', 'Переместить карточки', 'Mover tarjetas'],
    done: ['Done arranging', 'Готово', 'Listo'],
    reset: ['Reset layout', 'Сбросить порядок', 'Restablecer orden'],
    layoutHint: ['Your space, your arrangement.', 'Ваше пространство, ваш порядок.', 'Tu espacio, tu orden.'],
    layoutHelp: ['Drag a handle or use the arrow buttons. Changes are saved in this browser.', 'Тяните за ручку или используйте стрелки. Порядок сохраняется в этом браузере.', 'Arrastrá el control o usá las flechas. El orden se guarda en este navegador.'],
    layoutSaved: ['Card order saved in this browser.', 'Порядок карточек сохранён в этом браузере.', 'Orden de tarjetas guardado en este navegador.'],
    layoutReset: ['Original card order restored.', 'Исходный порядок карточек восстановлен.', 'Se restauró el orden original.'],
    layoutUnavailable: ['Order changed for this visit. Browser storage is unavailable.', 'Порядок изменён на этот сеанс. Хранилище браузера недоступно.', 'Orden cambiado para esta visita. El almacenamiento del navegador no está disponible.'],
    moveHandle: ['Move {name}. Drag, or use arrow keys.', 'Переместить: {name}. Тяните или используйте клавиши со стрелками.', 'Mover {name}. Arrastrá o usá las teclas de flecha.'],
    moveEarlier: ['Move {name} earlier', 'Переместить выше: {name}', 'Mover {name} antes'],
    moveLater: ['Move {name} later', 'Переместить ниже: {name}', 'Mover {name} después'],
    cardMoved: ['{name}: position {position} of {total}.', '{name}: позиция {position} из {total}.', '{name}: posición {position} de {total}.'],
    moveCancelled: ['Move cancelled.', 'Перемещение отменено.', 'Movimiento cancelado.'],
    card_hero: ['Introduction', 'Обо мне', 'Presentación'],
    card_stack: ['Toolkit', 'Технологии', 'Tecnologías'],
    card_nova: ['django-nova', 'django-nova', 'django-nova'],
    card_terminal: ['Terminal', 'Терминал', 'Terminal'],
    card_demo: ['Nova Demo', 'Nova Demo', 'Nova Demo'],
    card_flaky: ['FlakyDetector', 'FlakyDetector', 'FlakyDetector'],
    card_inventory: ['HomeInventory', 'HomeInventory', 'HomeInventory'],
    card_stats: ['Experience', 'Опыт', 'Experiencia'],
    card_commercial: ['Commercial work', 'Коммерческий проект', 'Trabajo comercial'],
    card_contact: ['Contact', 'Контакты', 'Contacto'],
  };
  const languages = ['en', 'ru', 'es'];
  const records = bindings.flatMap(([selector, ru, es, attribute]) =>
    [...document.querySelectorAll(selector)].map(element => ({element, attribute, values: [attribute ? element.getAttribute(attribute) : element.innerHTML, ru, es]})));
  let language = 'en';
  function t(key, values = {}) {
    const template = messages[key]?.[languages.indexOf(language)] ?? key;
    return template.replace(/\{(\w+)\}/g, (match, name) => String(values[name] ?? match));
  }
  function setLanguage(next, persist = true) {
    if (!languages.includes(next)) return;
    language = next;
    document.documentElement.lang = next;
    records.forEach(({element, attribute, values}) => {
      if (attribute) element.setAttribute(attribute, values[languages.indexOf(next)]);
      else element.innerHTML = values[languages.indexOf(next)];
    });
    document.title = t('title');
    document.querySelector('meta[name="description"]').content = t('description');
    document.querySelector('meta[property="og:title"]').content = t('title');
    document.querySelector('meta[property="og:description"]').content = t('description');
    document.querySelectorAll('[data-language]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.language === next)));
    if (persist) { try { localStorage.setItem('artem-portfolio-language-v1', next); } catch { /* Session still works. */ } }
    window.dispatchEvent(new CustomEvent('portfolio:language', { detail: { language: next } }));
  }
  document.querySelectorAll('[data-language]').forEach(button => button.addEventListener('click', () => setLanguage(button.dataset.language)));
  let initial;
  try { initial = localStorage.getItem('artem-portfolio-language-v1'); } catch { /* Use browser language. */ }
  if (!languages.includes(initial)) initial = (navigator.language || 'en').slice(0, 2).toLowerCase();
  window.PortfolioI18n = { t, setLanguage, get language() { return language; }, bindings, messages };
  setLanguage(languages.includes(initial) ? initial : 'en', false);
})();
