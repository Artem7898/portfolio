/* Accessible card reordering. Only the visitor's browser stores the arrangement. */
(() => {
  const { t } = window.PortfolioI18n;
  const grid = document.querySelector('#portfolio-grid');
  const cards = [...grid.querySelectorAll(':scope > [data-card-id]')];
  const cardMap = new Map(cards.map(card => [card.dataset.cardId, card]));
  const defaultOrder = cards.map(card => card.dataset.cardId);
  const divider = grid.querySelector('.section-divider');
  const editButton = document.querySelector('#edit-layout');
  const resetButton = document.querySelector('#reset-layout');
  const announcement = document.querySelector('#layout-announcement');
  const storageKey = 'artem-portfolio-layout-v1';
  let order = [...defaultOrder];
  let editing = false;
  let drag = null;
  let scrollFrame = 0;

  function normalizeOrder(value) {
    if (!Array.isArray(value)) return [...defaultOrder];
    const known = [...new Set(value.filter(id => typeof id === 'string' && cardMap.has(id)))];
    return [...known, ...defaultOrder.filter(id => !known.includes(id))];
  }
  function isCustom() { return order.some((id, index) => id !== defaultOrder[index]); }
  function announce(message) { announcement.textContent = message; }
  function persist() {
    try { localStorage.setItem(storageKey, JSON.stringify(order)); return true; }
    catch { return false; }
  }
  function updateControls() {
    editButton.setAttribute('aria-pressed', String(editing));
    editButton.querySelector('[data-layout-label]').textContent = t(editing ? 'done' : 'arrange');
    resetButton.textContent = t('reset');
    resetButton.hidden = !editing && !isCustom();
    document.querySelector('#layout-hint').textContent = t(editing ? 'layoutHelp' : 'layoutHint');
    grid.classList.toggle('layout-editing', editing);
    grid.classList.toggle('custom-layout', isCustom());
    divider.hidden = editing || isCustom();
    cards.forEach(card => {
      const id = card.dataset.cardId;
      const name = t(`card_${id}`);
      const position = order.indexOf(id);
      const controls = card.querySelector('.card-move-controls');
      controls.hidden = !editing;
      controls.querySelector('.move-card-name').textContent = name;
      const handle = controls.querySelector('.drag-handle');
      handle.setAttribute('aria-label', t('moveHandle', {name}));
      handle.title = t('moveHandle', {name});
      const earlier = controls.querySelector('[data-move="-1"]');
      const later = controls.querySelector('[data-move="1"]');
      earlier.disabled = position === 0;
      later.disabled = position === order.length - 1;
      earlier.setAttribute('aria-label', t('moveEarlier', {name}));
      later.setAttribute('aria-label', t('moveLater', {name}));
      earlier.title = t('moveEarlier', {name});
      later.title = t('moveLater', {name});
    });
  }
  function applyOrder() {
    // Reorder existing nodes, preserving listeners, terminal history, and focusable controls.
    order.forEach(id => grid.append(cardMap.get(id)));
    grid.insertBefore(divider, cardMap.get('demo'));
    updateControls();
  }
  function confirmMove(id) {
    const saved = persist();
    announce(t('cardMoved', {name: t(`card_${id}`), position: order.indexOf(id) + 1, total: order.length}));
    if (!saved) notify(t('layoutUnavailable'));
  }
  function moveTo(id, index) {
    const previous = order.indexOf(id);
    index = Math.max(0, Math.min(order.length - 1, index));
    if (previous < 0 || index === previous) return;
    order.splice(previous, 1); order.splice(index, 0, id);
    applyOrder();
    cardMap.get(id).querySelector('.drag-handle').focus({preventScroll: true});
    cardMap.get(id).scrollIntoView({block: 'nearest', behavior: 'instant'});
    confirmMove(id);
  }

  cards.forEach(card => {
    const controls = document.createElement('div');
    controls.className = 'card-move-controls';
    controls.hidden = true;
    const handle = document.createElement('button');
    handle.type = 'button'; handle.className = 'drag-handle';
    handle.innerHTML = '<span class="grip-dots" aria-hidden="true">⠿</span><span class="move-card-name"></span>';
    handle.setAttribute('aria-describedby', 'layout-hint');
    controls.append(handle);
    [-1, 1].forEach(direction => {
      const button = document.createElement('button');
      button.type = 'button'; button.className = 'move-step'; button.dataset.move = direction;
      button.textContent = direction < 0 ? '↑' : '↓';
      button.addEventListener('click', () => moveTo(card.dataset.cardId, order.indexOf(card.dataset.cardId) + direction));
      controls.append(button);
    });
    card.prepend(controls);
    handle.addEventListener('keydown', event => {
      if (!editing || drag) return;
      const current = order.indexOf(card.dataset.cardId);
      const positions = {ArrowUp: current - 1, ArrowLeft: current - 1, ArrowDown: current + 1, ArrowRight: current + 1, Home: 0, End: order.length - 1};
      if (Object.hasOwn(positions, event.key)) { event.preventDefault(); moveTo(card.dataset.cardId, positions[event.key]); }
    });
    handle.addEventListener('pointerdown', event => {
      if (!editing || drag || event.button !== 0) return;
      event.preventDefault();
      handle.focus({preventScroll: true});
      drag = {id: card.dataset.cardId, card, handle, pointerId: event.pointerId, startX: event.clientX, startY: event.clientY, x: event.clientX, y: event.clientY, active: false, target: null, after: false, ghost: null};
      handle.setPointerCapture(event.pointerId);
    });
    handle.addEventListener('pointermove', event => {
      if (!drag || event.pointerId !== drag.pointerId) return;
      drag.x = event.clientX; drag.y = event.clientY;
      if (!drag.active && Math.hypot(drag.x - drag.startX, drag.y - drag.startY) < 6) return;
      if (!drag.active) {
        drag.active = true;
        card.classList.add('is-dragging');
        document.body.classList.add('drag-in-progress');
        drag.ghost = document.createElement('div');
        drag.ghost.className = 'drag-ghost'; drag.ghost.setAttribute('aria-hidden', 'true');
        drag.ghost.textContent = `⠿ ${t(`card_${drag.id}`)}`;
        document.body.append(drag.ghost);
        scrollFrame = requestAnimationFrame(autoScroll);
      }
      updateDropTarget();
      event.preventDefault();
    });
    handle.addEventListener('pointerup', event => { if (drag?.pointerId === event.pointerId) finishDrag(false); });
    handle.addEventListener('pointercancel', event => { if (drag?.pointerId === event.pointerId) finishDrag(true); });
    handle.addEventListener('lostpointercapture', event => { if (drag?.pointerId === event.pointerId) finishDrag(true); });
  });

  function updateDropTarget() {
    if (!drag?.active) return;
    drag.ghost.style.left = `${Math.min(window.innerWidth - 160, Math.max(8, drag.x + 14))}px`;
    drag.ghost.style.top = `${Math.max(8, Math.min(window.innerHeight - 52, drag.y + 14))}px`;
    cards.forEach(card => card.classList.remove('drop-before', 'drop-after'));
    const candidate = document.elementFromPoint(drag.x, drag.y)?.closest('[data-card-id]');
    drag.target = candidate && cardMap.has(candidate.dataset.cardId) && candidate !== drag.card ? candidate : null;
    if (drag.target) {
      const rect = drag.target.getBoundingClientRect();
      drag.after = drag.y > rect.top + rect.height / 2;
      drag.target.classList.add(drag.after ? 'drop-after' : 'drop-before');
    }
  }
  function autoScroll() {
    if (!drag?.active) return;
    const edge = 85;
    const speed = drag.y < edge ? -Math.ceil((edge - drag.y) / 7) : drag.y > window.innerHeight - edge ? Math.ceil((drag.y - window.innerHeight + edge) / 7) : 0;
    if (speed) { window.scrollBy(0, Math.max(-18, Math.min(18, speed))); updateDropTarget(); }
    scrollFrame = requestAnimationFrame(autoScroll);
  }
  function finishDrag(cancelled) {
    if (!drag) return;
    const state = drag; drag = null;
    cancelAnimationFrame(scrollFrame);
    state.ghost?.remove();
    cards.forEach(card => card.classList.remove('is-dragging', 'drop-before', 'drop-after'));
    document.body.classList.remove('drag-in-progress');
    if (state.handle.hasPointerCapture(state.pointerId)) state.handle.releasePointerCapture(state.pointerId);
    if (cancelled) { if (state.active) announce(t('moveCancelled')); return; }
    if (!state.active || !state.target) return;
    const remaining = order.filter(id => id !== state.id);
    const index = remaining.indexOf(state.target.dataset.cardId) + (state.after ? 1 : 0);
    remaining.splice(index, 0, state.id);
    if (remaining.every((id, position) => id === order[position])) return;
    order = remaining; applyOrder();
    state.handle.focus({preventScroll: true});
    confirmMove(state.id);
  }
  editButton.addEventListener('click', () => {
    finishDrag(true);
    editing = !editing;
    updateControls();
    if (!editing) notify(t(persist() ? 'layoutSaved' : 'layoutUnavailable'));
  });
  resetButton.addEventListener('click', () => {
    finishDrag(true); order = [...defaultOrder]; applyOrder();
    const saved = persist(); notify(t(saved ? 'layoutReset' : 'layoutUnavailable'));
    announce(t('layoutReset'));
    if (resetButton.hidden) editButton.focus();
  });
  document.addEventListener('keydown', event => { if (event.key === 'Escape' && drag) { event.preventDefault(); finishDrag(true); } });
  window.addEventListener('blur', () => finishDrag(true));
  window.addEventListener('portfolio:language', () => { finishDrag(true); updateControls(); });
  try { order = normalizeOrder(JSON.parse(localStorage.getItem(storageKey))); } catch { order = [...defaultOrder]; }
  applyOrder();
})();
