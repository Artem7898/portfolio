# Публикация портфолио на GitHub Pages

Отдельный хостинг и VPS не нужны. GitHub Pages размещает HTML, CSS, JavaScript и PDF. GitHub Actions устанавливает зависимости, собирает CSS, проверяет файлы, запускает тесты и публикует `dist/`.

В портфолио нет серверного Django-приложения или базы данных. Терминал, RU / EN / ES и перемещение карточек работают в браузере. Язык и порядок сохраняются в этом браузере. На новом домене настройки нужно выбрать заново. CV остаётся оригинальным английским PDF.

## 1. Распаковать и проверить

Распакуйте ZIP и откройте папку `artem-alimpiev-portfolio` через PyCharm → File → Open. В корне находятся `package.json`, `package-lock.json`, `dist`, `src`, `scripts`, `tests` и `.github`.

Для сборки нужны Node.js 24 и Python 3. Python используется только для проверок и метаданных сборки; на хостинге он не запускается. Скрипты используют стандартную библиотеку и работают в Python 3.12+, в workflow закреплён Python 3.13.

Если установлен nvm, в терминале PyCharm:

```bash
nvm install 24
nvm use 24
node --version
python3 --version
npm ci
npm run build
npm run check
npm test
```

`package-lock.json` включён: `npm ci` выполняйте из корня проекта, не из `dist`.

## 2. Посмотреть локально

```bash
python3 -m http.server 8080 --bind 127.0.0.1 --directory dist
```

Откройте http://127.0.0.1:8080/. Остановка: Ctrl+C. Это локальный просмотр, не постоянный хостинг. При открытии HTML через `file://` поведение буфера обмена и хранилища может отличаться.

## 3. Создать репозиторий

1. На GitHub создайте новый репозиторий `portfolio` в аккаунте `Artem7898`.
2. Выберите **Public**: GitHub Pages доступен для публичных репозиториев на GitHub Free. Для приватных нужны соответствующие платные планы.
3. Не создавайте README, лицензию и `.gitignore` автоматически: файлы проекта уже подготовлены.
4. Из папки проекта выполните:

```bash
git init -b main
git add .
git commit -m "Add multilingual portfolio with GitHub Pages deployment"
git remote add origin https://github.com/Artem7898/portfolio.git
git push -u origin main
```

Используйте сохранённую авторизацию GitHub/PyCharm. Обычный пароль аккаунта не подходит для Git по HTTPS; при запросе выполните вход поддерживаемым способом. Токен не вставляйте в URL или код.

Альтернатива через интерфейс: PyCharm → VCS → Enable Version Control Integration → Git, затем Git → GitHub → Share Project on GitHub. Имя — `portfolio`, приватность — Public. Названия пунктов могут отличаться между версиями IDE. Достаточно одного способа создания репозитория.

## 4. Включить Pages

1. Репозиторий → **Settings → Pages**.
2. **Build and deployment → Source → GitHub Actions**.
3. **Actions → Portfolio — check and deploy → Run workflow → main → Run workflow**.
4. Дождитесь зелёных `Build and tests` и `Deploy to GitHub Pages`.
5. При имени репозитория `portfolio` ожидаемый адрес: **https://artem7898.github.io/portfolio/**.

Первый запуск после push может упасть на Configure Pages, если Pages ещё не включён. После включения запустите workflow снова. Точный адрес будет во вкладке Actions и Settings → Pages.

Workflow находится в `.github/workflows/pages.yml`. Публикуется только `dist/`. `node_modules`, тесты и скрипты не попадают на сайт. Исходники доступны посетителям публичного репозитория. PDF из архива будет доступен посетителям по кнопке скачивания CV.

## 5. Выпускать изменения

Редактируйте HTML в `dist/index.html`, JavaScript в `dist/assets/`, переводы в `dist/assets/i18n.js`, CSS в `src/styles.css`. `dist/assets/styles.css` генерируется автоматически.

```bash
npm run build
npm run check
npm test
git add .
git commit -m "Update portfolio"
git push
```

Если `main` защищён, используйте отдельную ветку и Pull Request. Для PR в `main` запускаются проверки; публикация выполняется только после успешных проверок push/merge в `main`. В защите ветки можно выбрать проверку **Build and tests** после первого запуска. Не требуйте Deploy на PR: публикация для PR отключена.

## 6. Переносимость

Ссылки `./assets/...` работают в корне домена и в подпапке репозитория. Имя репозитория можно изменить. Workflow получает адрес Pages и записывает его в метаданные через `SITE_URL`.

Репозиторий `Artem7898.github.io` даёт адрес https://artem7898.github.io/, но основной сайт может быть только один на аккаунт. Отдельный `portfolio` удобен рядом с существующими проектами.

Для другого статического хостинга загрузите содержимое `dist/`. Если известен домен:

```bash
SITE_URL=https://example.com npm run build
```

GitHub Pages не запускает Django, PostgreSQL или серверный API. Если позже появится свой сервер для отправки писем, личного кабинета или базы данных, ему понадобится отдельное размещение. Текущий сайт этого не требует.

## 7. Проверки

Результаты находятся в `VALIDATION_RU.md`. Автоматические проверки используют DOM-модель и не заменяют визуальный просмотр. После публикации проверьте сайт на компьютере и телефоне: языки, переносы текста, перетаскивание, ссылки и CV.

Официальная документация, проверенная 7 октября 2026 года:

- https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages
- https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages
- https://github.com/actions/setup-node
- https://github.com/actions/setup-python
