/* Midnight Office · 엔진
   js/chapters/*.js의 장면(part)을 순서대로 이어 하나의 게임으로 진행한다.
   방·퍼즐 id는 장면 안에서만 쓰고, 물건·증거 id는 게임 전체에서 하나뿐이다. */
(function () {
  'use strict';

  const SAVE_KEY = 'midnight-office-v2';
  const $ = (s) => document.querySelector(s);
  const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const val = (v, ...a) => (typeof v === 'function' ? v(...a) : v);

  const MO = window.MO = { parts: [], byId: {}, items: {}, widgets: {}, esc };
  MO.part = MO.chapter = function (def) {
    def.order = MO.parts.length;
    MO.parts.push(def);
    MO.byId[def.id] = def;
    for (const [id, it] of Object.entries(def.items || {})) {
      if (MO.items[id]) console.warn('물건 id 중복', id);
      it.part = def.id;
      MO.items[id] = it;
    }
  };

  /* ---------------- 저장 ---------------- */
  const touch = window.matchMedia && matchMedia('(pointer: coarse)').matches;
  const defaults = () => ({ bgm: 0.6, sfx: 0.6, font: 'm', marks: touch, work: false });
  const fresh = () => ({ v: 2, started: false, done: false, part: 0, room: null, items: [], flags: {}, solved: {}, hints: {}, ohints: {}, seen: [], pstate: {}, seals: {}, intro: {}, playMs: 0, settings: defaults(), memo: '' });
  let st = fresh();
  try {
    const saved = JSON.parse(localStorage.getItem(SAVE_KEY) || 'null');
    if (saved && saved.v === 2) st = { ...fresh(), ...saved, settings: { ...defaults(), ...(saved.settings || {}) } };
  } catch (e) { /* 저장 불가 환경 */ }
  let lastTick = Date.now();
  function save() {
    const now = Date.now();
    if (st.started && !st.done && !document.hidden) st.playMs += Math.min(now - lastTick, 60000);
    lastTick = now;
    try { localStorage.setItem(SAVE_KEY, JSON.stringify(st)); } catch (e) { /* 무시 */ }
  }
  setInterval(save, 15000);

  let ch = null;          // 현재 장면 정의
  let selected = null;    // 들고 있는 물건
  let modalCtx = null;    // 열린 퍼즐
  const key = (id) => `${ch.id}/${id}`;
  const usedOrHas = (id) => st.items.includes(id) || st.flags['used:' + id];

  /* ---------------- 게임 API ---------------- */
  const g = {
    has: (id) => st.items.includes(id),
    give(ids, quiet) {
      const got = [];
      for (const id of [].concat(ids || [])) {
        if (!MO.items[id]) { console.warn('알 수 없는 물건', id); continue; }
        if (!usedOrHas(id)) { st.items.push(id); got.push(id); }
      }
      if (got.length) {
        save(); renderInventory(got);
        if (!quiet) toast('획득 · ' + got.map((id) => MO.items[id].name).join(', '));
        sfx('get');
      }
      return got;
    },
    take(id) { st.items = st.items.filter((x) => x !== id); st.flags['used:' + id] = true; if (selected === id) selected = null; save(); renderInventory(); },
    flag: (k) => st.flags[k],
    set(k, v = true) { st.flags[k] = v; save(); },
    solved: (pid) => !!st.solved[key(pid)],
    seen: (sid) => st.seen.includes(key(sid)),
    seal: (pid) => st.seals[pid],
    go: (room) => goRoom(room),
    toast: (m) => toast(m),
    say: (o) => openLook(o),
    puzzle: (pid) => openPuzzle(pid),
    refresh: () => renderRoom(),
    count: (ids) => ids.filter(usedOrHas).length,
    hadAll: (ids) => ids.every(usedOrHas),
    evidence: () => st.items.filter((id) => MO.items[id] && MO.items[id].ev),
    _item: (id) => MO.items[id],
  };
  MO.g = g;

  /* ---------------- 타이틀 ---------------- */
  function fmtTime(ms) { const m = Math.floor(ms / 60000); return m >= 60 ? `${Math.floor(m / 60)}시간 ${m % 60}분` : `${m}분`; }
  function renderTitle() {
    const p = MO.parts[st.part];
    const box = $('#titleMenu');
    if (st.done) {
      box.innerHTML = `<p class="title-progress">사건 종결 · 플레이 ${fmtTime(st.playMs)}</p><div class="btn-row"><button class="btn" id="tNew">처음부터 다시</button><button class="btn ghost" id="tSet">설정</button></div>`;
    } else if (st.started) {
      box.innerHTML = `<p class="title-progress">이어서 · <b>${esc(p.time)} ${esc(p.place)}</b> · ${st.part + 1}/${MO.parts.length}장면 · 플레이 ${fmtTime(st.playMs)}</p><div class="btn-row"><button class="btn" id="tCont">이어하기</button><button class="btn ghost" id="tNew">처음부터</button><button class="btn ghost" id="tSet">설정</button></div>`;
    } else {
      box.innerHTML = `<div class="btn-row"><button class="btn" id="tNew">야근 시작</button><button class="btn ghost" id="tSet">설정</button></div>`;
    }
    $('#tCont')?.addEventListener('click', () => resume());
    $('#tNew').addEventListener('click', () => {
      if (st.started && !st.done && !confirm('지금까지의 진행을 지우고 처음부터 시작할까요?')) return;
      const keep = { settings: st.settings, memo: st.memo };
      st = { ...fresh(), ...keep, started: true };
      save(); resume();
    });
    $('#tSet').addEventListener('click', showSettings);
  }

  function resume() {
    st.started = true;
    enterPart(MO.parts[st.part], !st.intro[MO.parts[st.part].id]);
  }

  function enterPart(def, showIntro) {
    ch = def; selected = null;
    if (!st.room || !ch.rooms[st.room]) st.room = ch.start;
    if (!st.flags['start:' + ch.id]) { st.flags['start:' + ch.id] = true; g.give(def.startItems || [], true); }
    save();
    document.body.dataset.ep = def.ep;
    $('#title').classList.add('hidden');
    $('#game').classList.remove('hidden');
    applyTitle();
    playBgm(def.bgm);
    renderRoom(); renderInventory();
    if (showIntro) {
      openLook({
        loc: `${def.time} · ${def.place}`, title: def.title, html: def.intro,
        buttons: [{ label: '조사 시작' }],
        onClose: () => { st.intro[def.id] = true; save(); },
      });
    }
  }

  function backToTitle() {
    closeModal(); save();
    $('#game').classList.add('hidden');
    $('#title').classList.remove('hidden');
    bgm.pause();
    applyTitle(true);
    renderTitle();
  }

  function applyTitle(onTitle) {
    if (st.settings.work) document.title = '3분기_업무보고_최종.xlsx - Excel';
    else document.title = onTitle || !ch ? 'Midnight Office' : `${ch.time} ${ch.place} — Midnight Office`;
    $('#partName').textContent = ch ? `${ch.time} · ${ch.title}` : '';
  }

  /* ---------------- 방 ---------------- */
  function goRoom(id) {
    if (!ch.rooms[id]) return console.warn('방 없음', id);
    st.room = id; save();
    sfx('step');
    renderRoom();
  }

  function roomSpots(room, art) {
    const list = [];
    art.forEach((p) => { if (p.spot && p.when !== false) list.push({ x: p.x - (p.pad || 0), y: p.y - (p.pad || 0), w: (p.w || 80) + (p.pad || 0) * 2, h: (p.h || 80) + (p.pad || 0) * 2, ...p.spot }); });
    (room.spots || []).forEach((s) => list.push(s));
    return list.filter((s) => !s.show || s.show(g));
  }

  function renderRoom() {
    if (!ch) return;
    const room = ch.rooms[st.room];
    $('#roomName').textContent = val(room.name, g);
    const art = (val(room.art, g) || []).map((p) => ({ ...p, when: val(p.when, g) }));
    $('#art').innerHTML = MOArt.render(art, val(room.mood, g) || {});
    const box = $('#spots');
    box.innerHTML = '';
    roomSpots(room, art).forEach((s) => {
      const b = document.createElement('button');
      b.className = 'spot' + (st.seen.includes(key(s.id)) ? ' seen' : '') + (s.y < 120 ? ' tag-below' : '');
      Object.assign(b.style, { left: s.x / 16 + '%', top: s.y / 9 + '%', width: s.w / 16 + '%', height: s.h / 9 + '%' });
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
    $('#stage').classList.toggle('show-marks', !!st.settings.marks);
    renderObjective();
  }

  function markSeen(id) { if (id && !st.seen.includes(key(id))) { st.seen.push(key(id)); save(); } }

  function clickSpot(s) {
    sfx('tap');
    if (selected) {
      const item = selected;
      const use = s.use && s.use[item];
      selectItem(null);
      if (!use) { toast(`${MO.items[item].name}은(는) 여기에 쓸 수 없다.`); return; }
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
      if (st.solved[key(pid)]) return openLook({ title: val(s.title || s.label, g), html: val(s.after, g) || val(ch.puzzles[pid].doneText, g) || '<p>이미 해결했다.</p>' });
      if (s.need && !s.need(g)) return openLook({ title: val(s.title || s.label, g), html: val(s.locked, g) || '<p>아직 다룰 수 없다.</p>' });
      return openPuzzle(pid);
    }
    if (s.look || s.onLook) {
      if (s.onLook && s.onLook(g) === false) return;
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

  /* ---------------- 소지품 · 증거 파일 ---------------- */
  function renderInventory(fresh = []) {
    if (!ch) return;
    const things = st.items.filter((id) => MO.items[id] && !MO.items[id].ev);
    const evCount = g.evidence().length;
    const list = $('#inventory');
    list.innerHTML = '';
    const file = document.createElement('button');
    file.className = 'item file' + (fresh.some((id) => MO.items[id]?.ev) ? ' new' : '');
    file.dataset.item = '__file';
    file.innerHTML = `<span class="ico">🗂️</span><span>증거 파일 ${evCount}</span>`;
    file.addEventListener('click', showFile);
    list.appendChild(file);
    things.forEach((id) => {
      const it = MO.items[id];
      const b = document.createElement('button');
      b.className = 'item' + (selected === id ? ' selected' : '') + (fresh.includes(id) ? ' new' : '');
      b.dataset.item = id;
      b.innerHTML = `<span class="ico">${it.icon || '▪'}</span><span>${esc(it.name)}</span>`;
      b.addEventListener('click', () => clickItem(id));
      list.appendChild(b);
    });
    $('#selectedHint').textContent = selected ? `${MO.items[selected].name} 사용 중 · 쓸 곳을 누르세요 (다시 누르면 내려놓기)` : '';
    $('#game').classList.toggle('using', !!selected);
  }

  function selectItem(id) { selected = id; renderInventory(); }

  function clickItem(id) {
    const it = MO.items[id];
    if (selected && selected !== id) {
      const a = MO.items[selected];
      const fn = (a.combine && a.combine[id]) || (it.combine && it.combine[selected]);
      const from = selected;
      selectItem(null);
      if (fn) { sfx('tap'); const r = fn(g); if (r) handleResult(r, { label: '조합' }); renderRoom(); return; }
      toast(`${MO.items[from].name}와(과) ${it.name}은(는) 함께 쓸 수 없다.`);
      return;
    }
    if (selected === id) { selectItem(null); return; }
    openLook({
      loc: '소지품', title: it.name, html: val(it.desc, g),
      buttons: [
        { label: '들고 쓰기', act: () => { selectItem(id); toast(`${it.name}을(를) 들었다. 쓸 곳이나 다른 물건을 누르세요.`); } },
        ...(it.action ? [{ label: it.action.label, act: () => { const r = it.action.run(g); if (r) handleResult(r, { label: it.name }); renderRoom(); } }] : []),
        { label: '닫기', ghost: true },
      ],
    });
  }

  function evidenceGroups(ids) {
    const groups = [];
    MO.parts.forEach((p) => { const list = ids.filter((id) => MO.items[id].part === p.id); if (list.length) groups.push([p, list]); });
    return groups;
  }
  MO.evidenceGroups = evidenceGroups;

  function showFile() {
    const groups = evidenceGroups(g.evidence());
    const html = groups.length ? groups.map(([p, ids]) => `<h4 class="ev-group">${esc(p.time)} · ${esc(p.place)}</h4><div class="ev-list">${ids.map((id) => {
      const it = MO.items[id];
      return `<details class="ev"><summary><small>${esc(it.code)}</small><b>${esc(it.name)}</b></summary><div>${val(it.desc, g)}</div></details>`;
    }).join('')}</div>`).join('') : '<p class="note">아직 확보한 증거가 없다.</p>';
    openLook({ loc: '증거 파일', title: `확보한 기록 ${g.evidence().length}건`, html: `<p class="note">항목을 누르면 내용을 펼칩니다. 결론을 내릴 때는 서로 다른 곳에서 나온 기록 두 개를 함께 내야 합니다.</p>${html}`, wide: true });
  }

  /* ---------------- 모달 ---------------- */
  let onCloseCb = null;
  function openModal(html, wide) {
    $('#modalBody').innerHTML = html;
    $('#modalCard').classList.toggle('wide', !!wide);
    $('#modal').classList.remove('hidden');
    $('#modalCard').scrollTop = 0;
  }
  function closeModal() {
    if ($('#modal').classList.contains('hidden')) return;
    $('#modal').classList.add('hidden');
    modalCtx = null;
    const cb = onCloseCb; onCloseCb = null;
    if (cb) cb();
    renderRoom();
  }
  MO.closeModal = closeModal;

  function openLook(o) {
    const got = (o.got || []).map((id) => MO.items[id]).filter(Boolean);
    openModal(`${o.loc ? `<p class="loc">${esc(o.loc)}</p>` : ''}${o.title ? `<h3>${esc(o.title)}</h3>` : ''}${o.html || ''}${got.length ? `<div class="got">획득 · ${got.map((it) => `<b>${it.ev ? esc(it.code) + ' ' : ''}${esc(it.name)}</b>`).join(', ')}</div>` : ''}<div class="btn-row" id="lookBtns"></div>`, o.wide);
    const row = $('#lookBtns');
    (o.buttons || [{ label: '확인' }]).forEach((bt) => {
      const b = document.createElement('button');
      b.className = 'btn' + (bt.ghost ? ' ghost' : '');
      b.textContent = bt.label;
      b.addEventListener('click', () => { closeModal(); if (bt.act) bt.act(); });
      row.appendChild(b);
    });
    onCloseCb = o.onClose || null;
  }

  /* ---------------- 퍼즐 ---------------- */
  function openPuzzle(pid) {
    const pz = ch.puzzles[pid];
    if (!pz) return console.warn('퍼즐 없음', pid);
    if (st.solved[key(pid)]) return openLook({ title: val(pz.title, g), html: val(pz.doneText, g) || '<p>이미 해결했다.</p>' });
    modalCtx = { pid, pz };
    renderPuzzle();
  }
  const pstate = (pid) => st.pstate[key(pid)] || (st.pstate[key(pid)] = {});

  function renderPuzzle() {
    const { pid, pz } = modalCtx;
    const ps = pstate(pid);
    const steps = pz.steps || [pz];
    const stepIdx = Math.min(ps.step || 0, steps.length - 1);
    const step = steps[stepIdx];
    const hints = pz.hints || [];
    const level = st.hints[key(pid)] || 0;
    openModal(`
      ${pz.loc ? `<p class="loc">${esc(val(pz.loc, g))}</p>` : ''}
      <h3>${esc(val(pz.title, g))}</h3>
      <div class="pz-prompt">${val(pz.prompt, g) || ''}</div>
      ${steps.length > 1 ? `<p class="step-tag">단계 ${stepIdx + 1} / ${steps.length}${step.label ? ' · ' + esc(step.label) : ''}</p>${step.prompt ? `<div>${val(step.prompt, g)}</div>` : ''}` : ''}
      <div id="pzPre"></div>
      <div class="pz" id="pzRoot"></div>
      <div class="pz-feedback" id="pzFb" role="status"></div>
      ${hints.length ? `<div class="hint-box"><button class="btn ghost" id="pzHint">${level >= hints.length ? '힌트를 모두 열었습니다' : `힌트 보기 (${level}/${hints.length})`}</button>${level ? `<ol>${hints.slice(0, level).map((h) => `<li>${h}</li>`).join('')}</ol>` : ''}</div>` : ''}
    `, pz.wide || step.wide);
    onCloseCb = null;
    const fb = $('#pzFb');
    const ctx = {
      g, pz: step, root: $('#pzRoot'), state: ps.w || (ps.w = {}), save,
      feedback(msg, cls) { fb.textContent = msg || ''; fb.className = 'pz-feedback ' + (cls || ''); },
      fail(msg) { ctx.feedback(msg || '맞지 않는다.', 'bad'); sfx('err'); const r = $('#pzRoot'); r.classList.remove('shake'); void r.offsetWidth; r.classList.add('shake'); save(); },
      solve() {
        sfx('ok');
        if (stepIdx < steps.length - 1) {
          ps.step = stepIdx + 1; ps.w = {}; save();
          ctx.feedback(step.okText || '맞았다. 다음 단계로.', 'good');
          setTimeout(() => modalCtx && modalCtx.pid === pid && renderPuzzle(), 600);
          return;
        }
        solvePuzzle(pid);
      },
    };
    [].concat(pz.pre || [], step !== pz ? step.pre || [] : []).forEach((pre, i) => {
      const el = document.createElement('div');
      $('#pzPre').appendChild(el);
      MO.widgets[pre.type]({ ...ctx, pz: pre, root: el, state: ps['pre' + i] || (ps['pre' + i] = {}), solve() {} });
    });
    const w = MO.widgets[step.type];
    if (!w) return ctx.feedback('알 수 없는 장치: ' + step.type, 'bad');
    w(ctx);
    $('#pzHint')?.addEventListener('click', () => { if (level < hints.length) { st.hints[key(pid)] = level + 1; save(); renderPuzzle(); } });
  }

  function solvePuzzle(pid) {
    const pz = ch.puzzles[pid];
    st.solved[key(pid)] = true;
    save();
    const got = pz.reward ? g.give(val(pz.reward, g), true) : [];
    if (pz.onSolve) pz.onSolve(g);
    modalCtx = null;
    if (pz.finish) { onCloseCb = null; closeModal(); return finishPart(); }
    openLook({ loc: val(pz.loc, g), title: val(pz.okTitle, g) || '해결', html: val(pz.okText, g) || '<p>잠금이 풀렸다.</p>', got });
    renderRoom();
  }

  /* ---------------- 목표 · 힌트 ---------------- */
  const currentObjective = () => (ch.objectives || []).find((o) => !o.done(g));
  function renderObjective() {
    const o = currentObjective();
    $('#objectiveText').textContent = o ? o.text : '마지막 장치를 확인하세요.';
  }
  function showHint() {
    if (modalCtx) { const hb = $('#pzHint'); if (hb) hb.click(); return; }
    const o = currentObjective();
    if (!o) return toast('지금 할 일은 모두 끝났다.');
    const hints = [].concat(o.hint || '주변을 더 조사해 보세요.');
    const k = key('obj' + ch.objectives.indexOf(o));
    const lv = Math.min((st.ohints[k] || 0) + 1, hints.length);
    st.ohints[k] = lv; save();
    openLook({ loc: '진행 힌트', title: o.text, html: `<ol class="hint-list">${hints.slice(0, lv).map((h) => `<li>${h}</li>`).join('')}</ol>${lv < hints.length ? '<p class="note">한 번 더 누르면 더 자세한 힌트가 나옵니다.</p>' : ''}` });
  }

  /* ---------------- 장면 전환 · 결말 ---------------- */
  function finishPart() {
    const e = ch.ending;
    if (e.seal) st.seals[ch.id] = e.seal;
    const next = MO.parts[ch.order + 1];
    sfx('end');
    if (!next) {
      st.done = true; save();
      openLook({
        wide: true,
        html: `<p class="ending-kicker">CASE CLOSED</p><h3>${esc(e.title)}</h3>${e.html}<div class="ending-stats"><span>플레이 시간 <b>${fmtTime(st.playMs)}</b></span><span>확보한 증거 <b>${g.evidence().length}건</b></span><span>사용한 힌트 <b>${Object.values(st.hints).reduce((a, b) => a + b, 0)}개</b></span></div>`,
        buttons: [{ label: '타이틀로', act: backToTitle }],
        onClose: backToTitle,
      });
      return;
    }
    // 다음 장면으로: 증거는 들고 가고, 이 장면의 물건은 두고 간다
    st.items = st.items.filter((id) => MO.items[id].ev || MO.items[id].keep);
    st.part = next.order; st.room = next.start;
    save();
    openLook({
      wide: true,
      html: `<p class="ending-kicker">${esc(ch.time)} · ${esc(ch.place)}</p><h3>${esc(e.title)}</h3>${e.html}${e.seal ? `<p class="note">층 봉인 번호 <b class="mono seal">${esc(e.seal)}</b> · 수첩에 기록됨</p>` : ''}`,
      buttons: [{ label: `${next.time} · ${next.place}로` }],
      onClose: () => enterPart(next, true),
    });
  }

  /* ---------------- 수첩 · 설정 ---------------- */
  function showNote() {
    const seals = MO.parts.filter((p) => st.seals[p.id]).map((p) => `<li>${esc(p.time)} ${esc(p.place)} · <b class="mono">${st.seals[p.id]}</b></li>`).join('');
    const done = MO.parts.slice(0, st.part).map((p) => `<li>${esc(p.time)} · ${esc(p.title)} — ${esc(p.ending.summary)}</li>`).join('');
    openLook({
      loc: '수사 수첩', title: '지금까지의 밤', wide: true,
      html: `${done ? `<ol class="story-so-far">${done}</ol>` : '<p class="note">아직 첫 장면이다.</p>'}
        ${seals ? `<p class="note">층 봉인 번호</p><ul class="seals">${seals}</ul>` : ''}
        <p class="note">메모 (자동 저장)</p><textarea class="memo" id="memo" placeholder="숫자, 시각, 수상한 점을 적어 두세요."></textarea>`,
      buttons: [{ label: '닫기' }, { label: '증거 파일 보기', ghost: true, act: showFile }],
    });
    const m = $('#memo');
    m.value = st.memo || '';
    m.addEventListener('input', () => { st.memo = m.value; save(); });
  }

  function showSettings() {
    const s = st.settings;
    openLook({
      loc: '설정', title: '편의 기능',
      html: `
        <div class="set-row"><label for="sBgm">배경음악</label><input type="range" id="sBgm" min="0" max="1" step="0.05" value="${s.bgm}"><span id="sBgmV">${Math.round(s.bgm * 100)}</span></div>
        <div class="set-row"><label for="sSfx">효과음</label><input type="range" id="sSfx" min="0" max="1" step="0.05" value="${s.sfx}"><span id="sSfxV">${Math.round(s.sfx * 100)}</span></div>
        <div class="set-row"><label>글자 크기</label><div class="seg">${[['s', '작게'], ['m', '보통'], ['l', '크게']].map(([v, l]) => `<button data-font="${v}" class="${s.font === v ? 'on' : ''}">${l}</button>`).join('')}</div></div>
        <div class="set-row"><label for="sMarks">조사 지점 항상 표시</label><input type="checkbox" id="sMarks" ${s.marks ? 'checked' : ''}></div>
        <div class="set-row"><label for="sWork">업무 모드</label><input type="checkbox" id="sWork" ${s.work ? 'checked' : ''}></div>
        <p class="note">업무 모드는 화면을 스프레드시트처럼 차분하게 바꾸고 탭 제목도 업무 파일 이름으로 바꿉니다. 언제든 <kbd>\`</kbd> 키(숫자 1 왼쪽)나 위쪽 ▦ 버튼을 누르면 가짜 업무 시트가 바로 화면을 덮고 소리가 꺼집니다. 돌아올 때는 <kbd>\`</kbd> 키를 다시 누르거나 시트 아래쪽 <b>“시트3”</b> 탭을 누르세요.</p>
        <p class="note">단축키 · <kbd>H</kbd> 힌트 · <kbd>N</kbd> 수첩 · <kbd>F</kbd> 증거 파일 · <kbd>M</kbd> 소리 끄기/켜기 · <kbd>Esc</kbd> 창 닫기</p>`,
      buttons: [{ label: '닫기' }],
    });
    const bindRange = (id, k) => {
      const el = $('#' + id);
      el.addEventListener('input', () => { s[k] = +el.value; $('#' + id + 'V').textContent = Math.round(s[k] * 100); applySettings(); save(); });
    };
    bindRange('sBgm', 'bgm'); bindRange('sSfx', 'sfx');
    $('#sSfx').addEventListener('change', () => sfx('ok'));
    document.querySelectorAll('[data-font]').forEach((b) => b.addEventListener('click', () => { s.font = b.dataset.font; document.querySelectorAll('[data-font]').forEach((x) => x.classList.toggle('on', x === b)); applySettings(); save(); }));
    $('#sMarks').addEventListener('change', (e) => { s.marks = e.target.checked; applySettings(); save(); });
    $('#sWork').addEventListener('change', (e) => { s.work = e.target.checked; applySettings(); save(); });
  }

  function applySettings() {
    const s = st.settings;
    bgm.volume = Math.min(1, s.bgm * 0.55);
    if (s.bgm === 0) bgm.pause(); else if (ch && bgm.paused && !$('#game').classList.contains('hidden') && !bossOn) bgm.play().catch(() => {});
    document.documentElement.dataset.font = s.font;
    document.body.classList.toggle('work', !!s.work);
    $('#stage')?.classList.toggle('show-marks', !!s.marks);
    $('#btnMute').classList.toggle('off', s.bgm === 0 && s.sfx === 0);
    applyTitle(!$('#title').classList.contains('hidden'));
  }

  let savedVol = null;
  function toggleMute() {
    const s = st.settings;
    if (s.bgm === 0 && s.sfx === 0) { Object.assign(s, savedVol || { bgm: 0.6, sfx: 0.6 }); toast('소리 켬'); }
    else { savedVol = { bgm: s.bgm, sfx: s.sfx }; s.bgm = 0; s.sfx = 0; toast('소리 끔'); }
    applySettings(); save();
  }

  /* ---------------- 긴급 화면 (업무 시트) ---------------- */
  let bossOn = false;
  function toggleBoss() {
    bossOn = !bossOn;
    $('#boss').classList.toggle('hidden', !bossOn);
    if (bossOn) { bgm.pause(); document.title = '3분기_업무보고_최종.xlsx - Excel'; }
    else { applySettings(); if (ch && !$('#game').classList.contains('hidden') && st.settings.bgm > 0) bgm.play().catch(() => {}); }
  }
  function buildBoss() {
    const rows = [['부서', '1월', '2월', '3월', '분기 합계', '전년 대비'], ['경영지원', 1240, 1315, 1288], ['인사', 860, 842, 901], ['총무', 530, 575, 548], ['재무', 1102, 1098, 1176], ['IT 운영', 978, 1021, 1064], ['법무', 402, 388, 415], ['감사', 315, 322, 330], ['물류', 2210, 2187, 2302]];
    let n = 0;
    const body = rows.map((r, i) => {
      const cells = i === 0 ? r : [...r, r[1] + r[2] + r[3], `${((i * 37) % 9) - 3 + 0.4}%`];
      return `<tr><th>${i + 1}</th>${cells.map((c) => `<td>${typeof c === 'number' ? c.toLocaleString() : esc(c)}</td>`).join('')}${'<td></td>'.repeat(4)}</tr>`;
    }).join('') + Array.from({ length: 22 }, (_, i) => `<tr><th>${rows.length + i + 1}</th>${'<td></td>'.repeat(10)}</tr>`).join('');
    n = rows.length;
    $('#boss').innerHTML = `<div class="xl-top"><b>3분기_업무보고_최종.xlsx</b> - Excel</div><div class="xl-menu">파일 홈 삽입 페이지 레이아웃 수식 데이터 검토 보기</div><div class="xl-fx"><span>F${n}</span><i>fx</i>=SUM(B2:D2)</div><table class="xl"><tr><th></th>${'ABCDEFGHIJ'.split('').map((c) => `<th>${c}</th>`).join('')}</tr>${body}</table><div class="xl-tabs"><span class="on">요약</span><span>부서별</span><span>추이</span><button id="bossBack" title="돌아가기">시트3</button></div>`;
    $('#bossBack').addEventListener('click', toggleBoss);
  }

  /* ---------------- 소리 ---------------- */
  const bgm = new Audio();
  bgm.loop = true; bgm.preload = 'none';
  function playBgm(src) {
    if (!src) { bgm.pause(); return; }
    if (!bgm.src.endsWith(src)) bgm.src = src;
    bgm.volume = Math.min(1, st.settings.bgm * 0.55);
    if (st.settings.bgm > 0 && !bossOn) bgm.play().catch(() => {});
  }
  let actx = null;
  function sfx(kind) {
    const vol = st.settings.sfx;
    if (!vol) return;
    try {
      actx = actx || new (window.AudioContext || window.webkitAudioContext)();
      const notes = { tap: [[660, 0.03]], step: [[220, 0.05]], get: [[784, 0.06], [1046, 0.09]], ok: [[523, 0.07], [659, 0.07], [784, 0.12]], err: [[180, 0.12], [140, 0.16]], end: [[392, 0.1], [523, 0.1], [659, 0.1], [784, 0.25]] }[kind] || [];
      let t = actx.currentTime;
      notes.forEach(([f, d]) => {
        const o = actx.createOscillator(), gn = actx.createGain();
        o.type = kind === 'err' ? 'sawtooth' : 'triangle'; o.frequency.value = f;
        gn.gain.setValueAtTime(0.0001, t); gn.gain.exponentialRampToValueAtTime(0.13 * vol, t + 0.01); gn.gain.exponentialRampToValueAtTime(0.0001, t + d);
        o.connect(gn).connect(actx.destination); o.start(t); o.stop(t + d + 0.02); t += d * 0.9;
      });
    } catch (e) { /* 소리 없음 */ }
  }

  let toastTimer;
  function toast(m) {
    const el = $('#toast'); el.textContent = m; el.classList.add('show');
    clearTimeout(toastTimer); toastTimer = setTimeout(() => el.classList.remove('show'), 2400);
  }

  /* ---------------- 시작 ---------------- */
  MO.boot = function () {
    $('#modalClose').addEventListener('click', closeModal);
    $('#modal').addEventListener('click', (e) => { if (e.target.id === 'modal') closeModal(); });
    $('#btnMenu').addEventListener('click', backToTitle);
    $('#btnHint').addEventListener('click', showHint);
    $('#btnNote').addEventListener('click', showNote);
    $('#btnSet').addEventListener('click', showSettings);
    $('#btnMute').addEventListener('click', toggleMute);
    $('#btnBoss').addEventListener('click', toggleBoss);
    document.addEventListener('keydown', (e) => {
      if (e.key === '`' || e.code === 'Backquote') { e.preventDefault(); return toggleBoss(); }
      if (bossOn) return;
      if (e.key === 'Escape') { if (!$('#modal').classList.contains('hidden')) closeModal(); else if (selected) selectItem(null); return; }
      if (/^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName) || $('#game').classList.contains('hidden')) return;
      const k = e.key.toLowerCase();
      if (k === 'm') toggleMute();
      if (!$('#modal').classList.contains('hidden') && !modalCtx) return;
      if (k === 'h') showHint();
      if (k === 'n' && !modalCtx) showNote();
      if (k === 'f' && !modalCtx) showFile();
    });
    document.addEventListener('visibilitychange', () => { lastTick = Date.now(); });
    buildBoss();
    applySettings();
    renderTitle();
    MO.debug = { st: () => st, part: (i) => { st.started = true; st.part = i; st.room = null; enterPart(MO.parts[i], false); }, open: openPuzzle, go: goRoom, give: g.give, finish: finishPart };
  };
})();
