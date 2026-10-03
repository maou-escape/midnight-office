/* Midnight Office · 엔진
   챕터 데이터(js/chapters/*.js)를 받아 방 화면, 조사 지점, 소지품, 퍼즐 창, 저장을 처리한다. */
(function () {
  'use strict';

  const SAVE_KEY = 'midnight-office-remake-v1';
  const $ = (s) => document.querySelector(s);
  const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  const MO = window.MO = { chapters: [], byId: {}, widgets: {}, esc };

  MO.chapter = function (def) {
    def.order = MO.chapters.length;
    MO.chapters.push(def);
    MO.byId[def.id] = def;
  };

  /* ---------------- 저장 ---------------- */
  const touch = window.matchMedia && matchMedia('(pointer: coarse)').matches;
  const fresh = () => ({ v: 1, ch: {}, branches: {}, done: {}, settings: { bgm: true, marks: touch }, memo: '', last: null });
  let store = fresh();
  try {
    const saved = JSON.parse(localStorage.getItem(SAVE_KEY) || 'null');
    if (saved && saved.v === 1) store = { ...fresh(), ...saved, settings: { ...fresh().settings, ...(saved.settings || {}) } };
  } catch (e) { /* 저장 불가 환경 */ }
  function save() { try { localStorage.setItem(SAVE_KEY, JSON.stringify(store)); } catch (e) { /* 무시 */ } }
  MO.store = () => store;

  /* ---------------- 현재 챕터 ---------------- */
  let ch = null;   // 챕터 정의
  let cs = null;   // 챕터 진행 상태
  let selected = null; // 들고 있는 물건
  let modalCtx = null; // 열린 퍼즐 정보

  const chState = (def) => store.ch[def.id] || (store.ch[def.id] = { room: def.start, items: [...(def.startItems || [])], flags: {}, solved: {}, hints: {}, ohints: {}, seen: [], pstate: {}, done: false });

  /* 퍼즐·조사 지점에 넘기는 게임 API */
  const g = {
    has: (id) => cs.items.includes(id),
    give(ids, quiet) {
      const list = [].concat(ids || []);
      const got = [];
      for (const id of list) {
        if (!ch.items[id]) { console.warn('알 수 없는 물건', id); continue; }
        if (!cs.items.includes(id) && !cs.flags['used:' + id]) { cs.items.push(id); got.push(id); }
      }
      if (got.length) {
        save(); renderInventory(got);
        if (!quiet) toast('획득 · ' + got.map((id) => ch.items[id].name).join(', '));
        sfx('get');
      }
      return got;
    },
    take(id) { cs.items = cs.items.filter((x) => x !== id); cs.flags['used:' + id] = true; if (selected === id) selectItem(null); save(); renderInventory(); },
    flag: (k) => cs.flags[k],
    set(k, v = true) { cs.flags[k] = v; save(); },
    solved: (pid) => !!cs.solved[pid],
    seen: (sid) => cs.seen.includes(sid),
    branch: (cid) => store.branches[cid],
    go(room) { goRoom(room); },
    toast: (m) => toast(m),
    say: (o) => openLook(o),
    puzzle: (pid) => openPuzzle(pid),
    refresh: () => renderRoom(),
    finish: () => finishChapter(),
    count: (ids) => ids.filter((id) => cs.items.includes(id) || cs.flags['used:' + id]).length,
    hadAll: (ids) => ids.every((id) => cs.items.includes(id) || cs.flags['used:' + id]),
    _item: (id) => ch.items[id],
  };
  MO.g = g;

  /* ---------------- 타이틀 ---------------- */
  function renderTitle() {
    const groups = {};
    MO.chapters.forEach((c) => { (groups[c.ep] = groups[c.ep] || []).push(c); });
    $('#chapterList').innerHTML = Object.entries(groups).map(([ep, list]) => `
      <div class="ep-group" data-ep="${ep}">
        <h2>EPISODE ${ep}<b>${esc(list[0].epTitle.replace(/^Episode \d+\.\s*/, ''))}</b></h2>
        <div class="chapter-grid">${list.map((c) => {
          const st = store.ch[c.id];
          const cls = store.done[c.id] ? 'done' : (st ? 'playing' : '');
          return `<button class="chapter-card ${cls}" data-ch="${c.id}"><small>ACT ${c.act} · ${esc(c.kicker)}</small><b>${esc(c.title)}</b><span>${esc(c.tagline || '')}</span></button>`;
        }).join('')}</div>
      </div>`).join('');
    $('#chapterList').querySelectorAll('[data-ch]').forEach((b) => b.addEventListener('click', () => chooseChapter(b.dataset.ch)));
  }

  function chooseChapter(id) {
    const def = MO.byId[id];
    const st = store.ch[id];
    if (st && !st.done) return startChapter(def, false);
    if (st && st.done) {
      openLook({
        title: def.title, loc: def.epTitle,
        html: `<p>이미 완료한 막입니다. 기록 ${store.branches[id] ? `<b class="mono">${store.branches[id]}</b>` : ''}</p>`,
        buttons: [{ label: '처음부터 다시', act: () => { delete store.ch[id]; save(); startChapter(def, true); } }, { label: '닫기', ghost: true }],
      });
      return;
    }
    startChapter(def, true);
  }

  function startChapter(def, isNew) {
    ch = def; cs = chState(def); selected = null;
    store.last = def.id; save();
    document.body.dataset.ep = def.ep;
    $('#title').classList.add('hidden');
    $('#game').classList.remove('hidden');
    $('#chapterName').textContent = `${def.epTitle} · ${def.title}`;
    document.title = `${def.title} — Midnight Office`;
    playBgm(def.bgm);
    renderRoom(); renderInventory();
    if (isNew || !cs.introSeen) {
      openLook({
        loc: def.kicker, title: `${def.epTitle} · ${def.title}`,
        html: `<p class="note">${esc(def.premise)}</p>${def.intro}`,
        buttons: [{ label: '조사 시작', act: () => { cs.introSeen = true; save(); } }],
        onClose: () => { cs.introSeen = true; save(); },
      });
    }
  }

  function backToTitle() {
    closeModal();
    $('#game').classList.add('hidden');
    $('#title').classList.remove('hidden');
    document.title = 'Midnight Office';
    stopBgm();
    renderTitle();
  }

  /* ---------------- 방 ---------------- */
  function goRoom(id) {
    if (!ch.rooms[id]) return;
    cs.room = id; save();
    sfx('step');
    renderRoom();
  }

  const val = (v, ...a) => (typeof v === 'function' ? v(...a) : v);

  function roomSpots(room) {
    const list = [];
    (room.art || []).forEach((p) => { if (p.spot && val(p.when, g) !== false) list.push({ x: p.x - (p.pad || 0), y: p.y - (p.pad || 0), w: (p.w || 80) + (p.pad || 0) * 2, h: (p.h || 80) + (p.pad || 0) * 2, ...p.spot }); });
    (room.spots || []).forEach((s) => list.push(s));
    return list.filter((s) => !s.show || s.show(g));
  }

  function renderRoom() {
    const room = ch.rooms[cs.room];
    $('#roomName').textContent = val(room.name, g);
    const art = (val(room.art, g) || []).map((p) => ({ ...p, when: val(p.when, g) }));
    $('#art').innerHTML = MOArt.render(art, val(room.mood, g) || {});
    const spots = roomSpots({ ...room, art });
    const box = $('#spots');
    box.innerHTML = '';
    spots.forEach((s) => {
      const b = document.createElement('button');
      b.className = 'spot' + (cs.seen.includes(s.id) ? ' seen' : '') + (s.y < 120 ? ' tag-below' : '');
      b.style.left = (s.x / 16) + '%';
      b.style.top = (s.y / 9) + '%';
      b.style.width = (s.w / 16) + '%';
      b.style.height = (s.h / 9) + '%';
      b.setAttribute('aria-label', val(s.label, g));
      b.dataset.spot = s.id;
      b.innerHTML = `<span class="dot"></span><span class="tag">${esc(val(s.label, g))}</span>`;
      b.addEventListener('click', () => clickSpot(s));
      box.appendChild(b);
    });
    const nav = $('#roomNav');
    nav.innerHTML = '';
    (room.exits || []).forEach((e) => {
      if (e.show && !e.show(g)) return;
      const b = document.createElement('button');
      b.textContent = '→ ' + val(e.label, g);
      b.dataset.to = e.to;
      b.addEventListener('click', () => {
        if (selected) selectItem(null);
        if (e.need && !e.need(g)) return openLook({ title: val(e.label, g), html: val(e.locked, g) || '<p>지금은 갈 수 없다.</p>' });
        goRoom(e.to);
      });
      nav.appendChild(b);
    });
    $('#stage').classList.toggle('show-marks', !!store.settings.marks);
    $('#btnMarks').classList.toggle('off', !store.settings.marks);
    renderObjective();
  }

  function markSeen(id) { if (id && !cs.seen.includes(id)) { cs.seen.push(id); save(); } }

  function clickSpot(s) {
    sfx('tap');
    // 물건을 들고 있으면 사용 시도
    if (selected) {
      const item = selected;
      const use = s.use && s.use[item];
      if (!use) { toast(`${ch.items[item].name}은(는) 여기에 쓸 수 없다.`); return; }
      selectItem(null);
      markSeen(s.id);
      const r = typeof use === 'function' ? use(g) : use;
      if (r && typeof r === 'object') handleResult(r, s);
      renderRoom();
      return;
    }
    markSeen(s.id);
    if (s.goto) {
      if (s.need && !s.need(g)) return openLook({ title: val(s.label, g), html: val(s.locked, g) || '<p>잠겨 있다.</p>' });
      return goRoom(s.goto);
    }
    if (s.puzzle) {
      const pid = val(s.puzzle, g);
      if (cs.solved[pid]) {
        const pz = ch.puzzles[pid];
        return openLook({ title: val(s.title || s.label, g), html: val(s.after, g) || val(pz.doneText, g) || '<p>이미 해결했다.</p>' });
      }
      if (s.need && !s.need(g)) return openLook({ title: val(s.title || s.label, g), html: val(s.locked, g) || '<p>아직 다룰 수 없다.</p>' });
      return openPuzzle(pid);
    }
    if (s.look || s.onLook) {
      const r = s.onLook ? s.onLook(g) : null;
      if (r === false) return;
      handleResult({ title: val(s.title || s.label, g), html: val(s.look, g), give: val(s.give, g), set: s.set }, s);
      renderRoom();
    }
  }

  function handleResult(r, s) {
    if (r.set) [].concat(r.set).forEach((k) => g.set(k));
    if (r.take) [].concat(r.take).forEach((id) => g.take(id));
    const got = r.give ? g.give(r.give, true) : [];
    if (r.then) r.then(g);
    if (r.puzzle) return openPuzzle(r.puzzle);
    if (r.html || got.length) openLook({ title: r.title || val(s.title || s.label, g), html: r.html || '', got });
    if (r.goto) goRoom(r.goto);
  }

  /* ---------------- 소지품 ---------------- */
  function renderInventory(fresh = []) {
    const list = $('#inventory');
    if (!cs) return;
    const items = cs.items.map((id) => [id, ch.items[id]]).filter(([, it]) => it);
    // 물건 먼저, 증거는 뒤에
    items.sort((a, b) => (!!a[1].ev - !!b[1].ev));
    list.innerHTML = items.length ? '' : '<span class="inv-empty">아직 가진 것이 없다. 화면 속 물건을 눌러 조사하세요.</span>';
    items.forEach(([id, it]) => {
      const b = document.createElement('button');
      b.className = 'item' + (it.ev ? ' evidence' : '') + (selected === id ? ' selected' : '') + (fresh.includes(id) ? ' new' : '');
      b.dataset.item = id;
      b.innerHTML = `<span class="ico">${it.ev ? esc(it.code || 'DOC') : (it.icon || '▪')}</span><span>${esc(it.name)}</span>`;
      b.addEventListener('click', () => clickItem(id));
      list.appendChild(b);
    });
    $('#selectedHint').textContent = selected ? `${ch.items[selected].name} 사용 중 · 조사 지점이나 다른 물건을 누르세요` : '';
    $('#game').classList.toggle('using', !!selected);
  }

  function selectItem(id) { selected = id; renderInventory(); }

  function clickItem(id) {
    const it = ch.items[id];
    if (selected && selected !== id) {
      // 조합 시도
      const a = ch.items[selected];
      const fn = (a.combine && a.combine[id]) || (it.combine && it.combine[selected]);
      const from = selected;
      selectItem(null);
      if (fn) { sfx('tap'); const r = fn(g); if (r) handleResult(r, { label: '조합' }); renderRoom(); return; }
      toast(`${ch.items[from].name}와(과) ${it.name}은(는) 함께 쓸 수 없다.`);
      return;
    }
    if (selected === id) { selectItem(null); return; }
    const usable = !it.ev || it.usable;
    openLook({
      loc: it.ev ? `증거 ${it.code || ''}` : '소지품',
      title: it.name,
      html: val(it.desc, g),
      buttons: [
        ...(usable ? [{ label: '들고 쓰기', act: () => { selectItem(id); toast(`${it.name}을(를) 들었다. 쓸 곳을 누르세요.`); } }] : []),
        ...(it.action ? [{ label: it.action.label, act: () => { const r = it.action.run(g); if (r) handleResult(r, { label: it.name }); renderRoom(); } }] : []),
        { label: '닫기', ghost: true },
      ],
    });
  }

  /* ---------------- 모달 ---------------- */
  function openModal(html, wide) {
    $('#modalBody').innerHTML = html;
    $('#modalCard').classList.toggle('wide', !!wide);
    $('#modal').classList.remove('hidden');
    $('#modalCard').scrollTop = 0;
  }
  let onCloseCb = null;
  function closeModal() {
    if ($('#modal').classList.contains('hidden')) return;
    $('#modal').classList.add('hidden');
    modalCtx = null;
    const cb = onCloseCb; onCloseCb = null;
    if (cb) cb();
    if (cs) renderRoom();
  }
  MO.closeModal = closeModal;

  function openLook(o) {
    const got = (o.got || []).map((id) => ch.items[id]).filter(Boolean);
    openModal(`${o.loc ? `<p class="loc">${esc(o.loc)}</p>` : ''}${o.title ? `<h3>${esc(o.title)}</h3>` : ''}${o.html || ''}${got.length ? `<div class="got">획득 · ${got.map((it) => `<b>${esc(it.name)}</b>`).join(', ')}</div>` : ''}<div class="btn-row" id="lookBtns"></div>`, o.wide);
    const row = $('#lookBtns');
    const buttons = o.buttons || [{ label: '확인' }];
    buttons.forEach((bt) => {
      const b = document.createElement('button');
      b.className = 'btn' + (bt.ghost ? ' ghost' : '');
      b.textContent = bt.label;
      b.addEventListener('click', () => { onCloseCb = null; closeModal(); if (bt.act) bt.act(); });
      row.appendChild(b);
    });
    onCloseCb = o.onClose || null;
  }

  /* ---------------- 퍼즐 ---------------- */
  function openPuzzle(pid) {
    const pz = ch.puzzles[pid];
    if (!pz) return console.warn('퍼즐 없음', pid);
    if (cs.solved[pid]) return openLook({ title: pz.title, html: val(pz.doneText, g) || '<p>이미 해결했다.</p>' });
    modalCtx = { pid, pz };
    renderPuzzle();
  }

  function pstate(pid) { return cs.pstate[pid] || (cs.pstate[pid] = {}); }

  function renderPuzzle() {
    const { pid, pz } = modalCtx;
    const ps = pstate(pid);
    const steps = pz.steps || [pz];
    const stepIdx = Math.min(ps.step || 0, steps.length - 1);
    const step = steps[stepIdx];
    const hints = pz.hints || [];
    const level = cs.hints[pid] || 0;
    openModal(`
      ${pz.loc ? `<p class="loc">${esc(val(pz.loc, g))}</p>` : ''}
      <h3>${esc(val(pz.title, g))}</h3>
      <div class="pz-prompt">${val(pz.prompt, g) || ''}</div>
      ${steps.length > 1 ? `<p class="note">단계 ${stepIdx + 1} / ${steps.length}${step.label ? ' · ' + esc(step.label) : ''}</p>${step.prompt && step !== pz ? `<div>${val(step.prompt, g)}</div>` : ''}` : ''}
      <div id="pzPre"></div>
      <div class="pz" id="pzRoot"></div>
      <div class="pz-feedback" id="pzFb" role="status"></div>
      ${hints.length ? `<div class="hint-box"><button class="btn ghost" id="pzHint">${level >= hints.length ? '힌트를 모두 열었습니다' : `힌트 보기 (${level}/${hints.length})`}</button>${level ? `<ol>${hints.slice(0, level).map((h) => `<li>${h}</li>`).join('')}</ol>` : ''}</div>` : ''}
    `, pz.wide);
    onCloseCb = null;
    const fb = $('#pzFb');
    const ctx = {
      g, pz: step, root: $('#pzRoot'), state: ps.w || (ps.w = {}),
      save,
      feedback(msg, cls) { fb.textContent = msg || ''; fb.className = 'pz-feedback ' + (cls || ''); },
      fail(msg) { ctx.feedback(msg || '맞지 않는다.', 'bad'); sfx('err'); const r = $('#pzRoot'); r.classList.remove('shake'); void r.offsetWidth; r.classList.add('shake'); save(); },
      solve() {
        sfx('ok');
        if (stepIdx < steps.length - 1) {
          ps.step = stepIdx + 1; ps.w = {}; save();
          setTimeout(() => modalCtx && modalCtx.pid === pid && renderPuzzle(), 450);
          ctx.feedback(step.okText || '맞았다. 다음 단계로.', 'good');
          return;
        }
        solvePuzzle(pid);
      },
    };
    (pz.pre || step.pre ? [].concat(pz.pre || [], step.pre || []) : []).forEach((pre, i) => {
      const el = document.createElement('div');
      $('#pzPre').appendChild(el);
      const pctx = { ...ctx, pz: pre, root: el, state: ps['pre' + i] || (ps['pre' + i] = {}), solve() {} };
      MO.widgets[pre.type](pctx);
    });
    const w = MO.widgets[step.type];
    if (!w) { ctx.feedback('알 수 없는 장치: ' + step.type, 'bad'); return; }
    w(ctx);
    const hb = $('#pzHint');
    if (hb) hb.addEventListener('click', () => { if ((cs.hints[pid] || 0) < hints.length) { cs.hints[pid] = (cs.hints[pid] || 0) + 1; save(); renderPuzzle(); } });
  }

  function solvePuzzle(pid) {
    const pz = ch.puzzles[pid];
    cs.solved[pid] = true;
    save();
    const got = pz.reward ? g.give(val(pz.reward, g), true) : [];
    if (pz.onSolve) pz.onSolve(g);
    if (pz.finish) { closeModal(); return finishChapter(); }
    modalCtx = null;
    openLook({ loc: val(pz.loc, g), title: val(pz.okTitle, g) || '해결', html: val(pz.okText, g) || '<p>잠금이 풀렸다.</p>', got, onClose: pz.onClose ? () => pz.onClose(g) : null });
    renderRoom();
  }

  /* ---------------- 목표 · 힌트 ---------------- */
  function currentObjective() {
    return (ch.objectives || []).find((o) => !o.done(g));
  }
  function renderObjective() {
    const o = currentObjective();
    $('#objectiveText').textContent = o ? o.text : '마지막 장면을 확인하세요.';
  }
  function showHint() {
    if (modalCtx) { const hb = $('#pzHint'); if (hb) hb.click(); else toast('이 장치에는 힌트가 없습니다.'); return; }
    const o = currentObjective();
    if (!o) return toast('목표를 모두 달성했다.');
    const hints = [].concat(o.hint || '주변을 더 조사해 보세요.');
    const key = (ch.objectives || []).indexOf(o);
    const lv = Math.min((cs.ohints[key] || 0) + 1, hints.length);
    cs.ohints[key] = lv; save();
    openLook({ loc: '진행 힌트', title: o.text, html: `<ol class="hint-list">${hints.slice(0, lv).map((h) => `<li>${h}</li>`).join('')}</ol>${lv < hints.length ? '<p class="note">힌트 버튼을 한 번 더 누르면 더 자세한 힌트가 나옵니다.</p>' : ''}` });
  }

  /* ---------------- 수첩 ---------------- */
  function showNote() {
    const evs = cs.items.concat(Object.keys(cs.flags).filter((k) => k.startsWith('used:')).map((k) => k.slice(5)))
      .map((id) => ch.items[id]).filter((it) => it && it.ev);
    const branches = MO.chapters.filter((c) => store.branches[c.id]).map((c) => `<span class="mono">${esc(c.title)} · <b>${store.branches[c.id]}</b></span>`);
    openLook({
      loc: '수사 수첩', title: `${ch.title} 기록`,
      html: `<div class="ev-list">${evs.length ? evs.map((it) => `<div class="ev"><small>${esc(it.code || '')}</small><b>${esc(it.name)}</b><div class="note">${val(it.summary || it.desc, g)}</div></div>`).join('') : '<p class="note">아직 확보한 증거가 없다.</p>'}</div>
        ${branches.length ? `<p class="note">분기 기록 · ${branches.join(' · ')}</p>` : ''}
        <p class="note">메모 (모든 막에서 공유, 자동 저장)</p><textarea class="memo" id="memo" placeholder="숫자, 시각, 수상한 점을 적어 두세요."></textarea>`,
      buttons: [{ label: '닫기' }, { label: '이 막 처음부터', ghost: true, act: () => { if (confirm(`${ch.title}의 진행을 지우고 처음부터 시작할까요?`)) { delete store.ch[ch.id]; save(); startChapter(ch, true); } } }],
      wide: true,
    });
    const m = $('#memo');
    m.value = store.memo || '';
    m.addEventListener('input', () => { store.memo = m.value; save(); });
  }

  /* ---------------- 엔딩 ---------------- */
  function finishChapter() {
    const e = ch.ending;
    cs.done = true;
    store.done[ch.id] = true;
    if (e.branch) store.branches[ch.id] = e.branch;
    save();
    sfx('end');
    const next = MO.chapters[ch.order + 1];
    openLook({
      wide: true,
      html: `<p class="ending-kicker">${esc(ch.title.toUpperCase())} CLEAR</p><h3>${esc(e.title)}</h3>${e.html}${e.branch ? `<p class="note">분기 기록</p><div class="ending-code">${esc(e.branch)}</div>` : ''}<p class="note">${esc(e.summary || '')}</p>`,
      buttons: [
        ...(next ? [{ label: `다음 · ${next.epTitle === ch.epTitle ? '' : next.epTitle + ' '}${next.title}`, act: () => chooseChapter(next.id) }] : []),
        { label: '챕터 선택', ghost: true, act: backToTitle },
      ],
      onClose: () => {},
    });
  }

  /* ---------------- 소리 ---------------- */
  const bgm = new Audio();
  bgm.loop = true; bgm.volume = 0.32; bgm.preload = 'none';
  function playBgm(src) {
    if (!src) return stopBgm();
    if (!bgm.src.endsWith(src)) bgm.src = src;
    if (store.settings.bgm) bgm.play().catch(() => {});
    $('#btnBgm').classList.toggle('off', !store.settings.bgm);
  }
  function stopBgm() { bgm.pause(); }
  function toggleBgm() {
    store.settings.bgm = !store.settings.bgm; save();
    if (store.settings.bgm) bgm.play().catch(() => {}); else bgm.pause();
    $('#btnBgm').classList.toggle('off', !store.settings.bgm);
    toast(store.settings.bgm ? '배경음악 켬' : '배경음악 끔');
  }
  let actx = null;
  function sfx(kind) {
    if (!store.settings.bgm) return;
    try {
      actx = actx || new (window.AudioContext || window.webkitAudioContext)();
      const notes = { tap: [[660, 0.03]], step: [[220, 0.05]], get: [[784, 0.06], [1046, 0.09]], ok: [[523, 0.07], [659, 0.07], [784, 0.12]], err: [[180, 0.12], [140, 0.16]], end: [[392, 0.1], [523, 0.1], [659, 0.1], [784, 0.25]] }[kind] || [];
      let t = actx.currentTime;
      notes.forEach(([f, d]) => {
        const o = actx.createOscillator(), gn = actx.createGain();
        o.type = kind === 'err' ? 'sawtooth' : 'triangle'; o.frequency.value = f;
        gn.gain.setValueAtTime(0.0001, t); gn.gain.exponentialRampToValueAtTime(0.08, t + 0.01); gn.gain.exponentialRampToValueAtTime(0.0001, t + d);
        o.connect(gn).connect(actx.destination); o.start(t); o.stop(t + d + 0.02); t += d * 0.9;
      });
    } catch (e) { /* 소리 없음 */ }
  }

  /* ---------------- 토스트 ---------------- */
  let toastTimer;
  function toast(m) {
    const el = $('#toast'); el.textContent = m; el.classList.add('show');
    clearTimeout(toastTimer); toastTimer = setTimeout(() => el.classList.remove('show'), 2400);
  }

  /* ---------------- 시작 ---------------- */
  MO.boot = function () {
    $('#modalClose').addEventListener('click', closeModal);
    $('#modal').addEventListener('click', (e) => { if (e.target.id === 'modal') closeModal(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') { if (!$('#modal').classList.contains('hidden')) closeModal(); else if (selected) selectItem(null); } });
    $('#btnMenu').addEventListener('click', backToTitle);
    $('#btnHint').addEventListener('click', showHint);
    $('#btnNote').addEventListener('click', showNote);
    $('#btnBgm').addEventListener('click', toggleBgm);
    $('#btnMarks').addEventListener('click', () => { store.settings.marks = !store.settings.marks; save(); renderRoom(); toast(store.settings.marks ? '조사 지점 표시 켬' : '조사 지점 표시 끔'); });
    renderTitle();
    // 디버그·테스트용 진입점
    MO.debug = { store: () => store, state: () => cs, open: openPuzzle, solve: solvePuzzle, go: goRoom, start: (id) => startChapter(MO.byId[id], true), give: g.give };
  };
})();
