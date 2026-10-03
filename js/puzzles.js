/* Midnight Office · 퍼즐 장치
   MO.widgets[type](ctx): ctx.root에 그리고, 맞으면 ctx.solve(), 틀리면 ctx.fail(메시지).
   ctx.state는 저장되는 장치 상태, ctx.pz는 챕터 데이터의 퍼즐 정의. */
(function () {
  'use strict';
  const W = MO.widgets;
  const esc = MO.esc;
  const norm = (s) => String(s).replace(/\s+/g, '');

  /* 숫자 키패드 */
  W.keypad = (ctx) => {
    const { pz, state } = ctx;
    const len = pz.len || String(pz.answer).length;
    state.v = state.v || '';
    const draw = () => {
      ctx.root.innerHTML = `
        <div class="slots">${Array.from({ length: len }, (_, i) => `<div class="slot">${esc(state.v[i] || '')}</div>`).join('')}</div>
        <div class="keys">${['1', '2', '3', '4', '5', '6', '7', '8', '9', '⌫', '0', '확인'].map((k) => `<button data-k="${k}" class="${k === '확인' ? 'ok' : ''}">${k}</button>`).join('')}</div>`;
      ctx.root.querySelectorAll('[data-k]').forEach((b) => b.addEventListener('click', () => press(b.dataset.k)));
    };
    const press = (k) => {
      if (k === '⌫') state.v = state.v.slice(0, -1);
      else if (k === '확인') return check();
      else if (state.v.length < len) state.v += k;
      ctx.feedback('');
      draw();
    };
    const check = () => {
      if (state.v.length < len) return ctx.fail(`${len}자리를 모두 입력하세요.`);
      if ([].concat(pz.answer).map(String).includes(state.v)) return ctx.solve();
      const msg = (pz.wrong && pz.wrong[state.v]) || pz.failText || '잠금이 붉게 깜빡인다. 맞지 않는다.';
      state.v = '';
      draw();
      ctx.fail(msg);
    };
    draw();
    ctx.root.tabIndex = -1;
    ctx.root.addEventListener('keydown', (e) => { if (/^[0-9]$/.test(e.key)) press(e.key); else if (e.key === 'Backspace') press('⌫'); else if (e.key === 'Enter') press('확인'); });
  };

  /* 다이얼 (문자·숫자 칸을 위아래로 돌림) */
  W.dial = (ctx) => {
    const { pz, state } = ctx;
    state.i = state.i || pz.cols.map((c) => c.start || 0);
    const draw = () => {
      ctx.root.innerHTML = `<div class="dials">${pz.cols.map((c, i) => `
        ${i && pz.seps && pz.seps[i - 1] ? `<span class="dial-sep">${esc(pz.seps[i - 1])}</span>` : ''}
        <div class="dial">${c.label ? `<span class="dial-label">${esc(c.label)}</span>` : ''}<button data-d="${i}" data-s="-1">▲</button><div class="face">${esc(c.opts[state.i[i]])}</div><button data-d="${i}" data-s="1">▼</button></div>`).join('')}</div>
        <div class="btn-row" style="justify-content:center"><button class="btn" id="dialOk">${esc(pz.okLabel || '확인')}</button></div>`;
      ctx.root.querySelectorAll('[data-d]').forEach((b) => b.addEventListener('click', () => {
        const i = +b.dataset.d, n = pz.cols[i].opts.length;
        state.i[i] = (state.i[i] + +b.dataset.s + n) % n;
        ctx.feedback(''); draw();
      }));
      ctx.root.querySelector('#dialOk').addEventListener('click', () => {
        const v = pz.cols.map((c, i) => c.opts[state.i[i]]);
        const answers = Array.isArray(pz.answer[0]) ? pz.answer : [pz.answer];
        if (answers.some((a) => a.every((x, i) => String(x) === String(v[i])))) return ctx.solve();
        ctx.fail((pz.check && pz.check(v)) || pz.failText || '맞지 않는다.');
      });
    };
    draw();
  };

  /* 하나 고르기 */
  W.choice = (ctx) => {
    const { pz, state } = ctx;
    const draw = () => {
      ctx.root.innerHTML = `<div class="choices">${pz.options.map((o) => `<button class="choice ${state.v === o.v ? 'on' : ''}" data-v="${esc(o.v)}"><b>${esc(o.label)}</b>${o.sub ? `<small>${esc(o.sub)}</small>` : ''}</button>`).join('')}</div>
        <div class="btn-row"><button class="btn" id="chOk">${esc(pz.okLabel || '결정')}</button></div>`;
      ctx.root.querySelectorAll('[data-v]').forEach((b) => b.addEventListener('click', () => { state.v = b.dataset.v; ctx.feedback(''); draw(); }));
      ctx.root.querySelector('#chOk').addEventListener('click', () => {
        if (!state.v) return ctx.fail('하나를 고르세요.');
        if (state.v === pz.answer) return ctx.solve();
        const o = pz.options.find((x) => x.v === state.v);
        ctx.fail((o && o.why) || pz.failText || '맞지 않는다.');
      });
    };
    draw();
  };

  /* 여러 개 고르기 */
  W.checks = (ctx) => {
    const { pz, state } = ctx;
    state.on = state.on || [];
    const draw = () => {
      ctx.root.innerHTML = `<div class="choices">${pz.options.map((o) => `<button class="choice ${state.on.includes(o.v) ? 'on' : ''}" data-v="${esc(o.v)}"><b>${state.on.includes(o.v) ? '☑' : '☐'} ${esc(o.label)}</b>${o.sub ? `<small>${esc(o.sub)}</small>` : ''}</button>`).join('')}</div>
        <div class="btn-row"><button class="btn" id="ckOk">${esc(pz.okLabel || '확인')}</button></div>`;
      ctx.root.querySelectorAll('[data-v]').forEach((b) => b.addEventListener('click', () => {
        const v = b.dataset.v;
        state.on = state.on.includes(v) ? state.on.filter((x) => x !== v) : [...state.on, v];
        ctx.feedback(''); draw();
      }));
      ctx.root.querySelector('#ckOk').addEventListener('click', () => {
        const ok = pz.answer.length === state.on.length && pz.answer.every((v) => state.on.includes(v));
        if (ok) return ctx.solve();
        const extra = state.on.filter((v) => !pz.answer.includes(v)).length;
        ctx.fail(extra ? (pz.extraText || '공통점이 아닌 항목이 섞였다.') : (pz.missText || `아직 빠진 항목이 있다. (${state.on.length}개 선택)`));
      });
    };
    draw();
  };

  /* 단어 조각으로 문장 만들기 */
  W.phrase = (ctx) => {
    const { pz, state } = ctx;
    state.pick = state.pick || [];
    const answers = Array.isArray(pz.answer[0]) ? pz.answer : [pz.answer];
    const draw = () => {
      ctx.root.innerHTML = `
        <div class="phrase-line">${state.pick.length ? state.pick.map((t, i) => `<button class="tile" data-rm="${i}">${esc(pz.tiles[t])}</button>`).join('') : `<span class="placeholder">${esc(pz.placeholder || '아래 조각을 순서대로 누르세요')}</span>`}</div>
        <div class="tiles">${pz.tiles.map((t, i) => `<button class="tile ${state.pick.includes(i) ? 'used' : ''}" data-add="${i}" ${state.pick.includes(i) ? 'disabled' : ''}>${esc(t)}</button>`).join('')}</div>
        <div class="btn-row" style="justify-content:center"><button class="btn ghost" id="phClr">지우기</button><button class="btn" id="phOk">${esc(pz.okLabel || '적기')}</button></div>`;
      ctx.root.querySelectorAll('[data-add]').forEach((b) => b.addEventListener('click', () => { state.pick.push(+b.dataset.add); ctx.feedback(''); draw(); }));
      ctx.root.querySelectorAll('[data-rm]').forEach((b) => b.addEventListener('click', () => { state.pick.splice(+b.dataset.rm, 1); draw(); }));
      ctx.root.querySelector('#phClr').addEventListener('click', () => { state.pick = []; draw(); });
      ctx.root.querySelector('#phOk').addEventListener('click', () => {
        const words = state.pick.map((i) => pz.tiles[i]);
        const said = norm(words.join(''));
        if (answers.some((a) => norm(a.join('')) === said)) return ctx.solve();
        ctx.fail((pz.check && pz.check(words)) || pz.failText || '그 말로는 세 기록을 모두 설명할 수 없다.');
      });
    };
    draw();
  };

  /* 겹쳐 보기: 격자 여러 장을 뒤집고 겹친다 */
  W.overlay = (ctx) => {
    const { pz, state } = ctx;
    state.flip = state.flip || pz.layers.map((l) => !!l.flipped);
    state.on = !!state.on;
    const cell = (L, i, r, c) => {
      const row = L.grid[r];
      const cc = state.flip[i] ? row.length - 1 - c : c;
      return row[cc];
    };
    const draw = () => {
      const rows = pz.layers[0].grid.length, cols = pz.layers[0].grid[0].length;
      const panels = pz.layers.map((L, i) => `
        <div class="ov-panel"><div class="cap">${esc(L.name)}${state.flip[i] ? ' · 뒤집음' : ''}</div>
        <div class="grid ${L.film ? 'film' : ''}" style="grid-template-columns:repeat(${cols},auto)">${L.grid.map((row, r) => row.map((_, c) => `<div class="c">${esc(cell(L, i, r, c) === '.' ? '' : cell(L, i, r, c))}</div>`).join('')).join('')}</div>
        ${L.flippable ? `<div class="ov-tools"><button class="btn ghost" data-flip="${i}">↔ 좌우 뒤집기</button></div>` : ''}</div>`).join('');
      let merged = '';
      if (state.on) {
        const mask = pz.layers.findIndex((L) => L.mask);
        let out = '';
        for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
          const vals = pz.layers.map((L, i) => (i === mask ? null : cell(L, i, r, c))).filter((v) => v && v !== '.');
          const show = mask < 0 || (cell(pz.layers[mask], mask, r, c) || '.') !== '.';
          out += `<div class="c ${show && vals.length ? 'hit' : 'dim'}">${show ? esc(vals.join('')) : ''}</div>`;
        }
        merged = `<div class="ov-panel"><div class="cap">겹친 모습</div><div class="grid" style="grid-template-columns:repeat(${cols},auto)">${out}</div></div>`;
      }
      ctx.root.innerHTML = `<div class="ov-wrap">${state.on ? merged : panels}</div>
        <div class="ov-tools"><button class="btn" id="ovToggle">${state.on ? '떼어 놓기' : (pz.overlayLabel || '겹쳐 보기')}</button></div>`;
      ctx.root.querySelectorAll('[data-flip]').forEach((b) => b.addEventListener('click', () => { const i = +b.dataset.flip; state.flip[i] = !state.flip[i]; ctx.save(); draw(); }));
      ctx.root.querySelector('#ovToggle').addEventListener('click', () => { state.on = !state.on; ctx.save(); draw(); });
    };
    draw();
  };

  /* 회로 타일 돌리기 */
  const DIRS = ['N', 'E', 'S', 'W'];
  const BASE = { corner: ['N', 'E'], straight: ['E', 'W'], tee: ['E', 'W', 'S'] };
  const rot = (shape, r) => BASE[shape].map((d) => DIRS[(DIRS.indexOf(d) + r / 90) % 4]);
  W.circuit = (ctx) => {
    const { pz, state } = ctx;
    state.r = state.r || pz.tiles.map((t) => t.r || 0);
    const trace = () => {
      // 출발: start 타일의 서쪽(W)에서 들어옴
      let idx = pz.start, from = 'W', fuses = '', steps = 0;
      const opp = { N: 'S', S: 'N', E: 'W', W: 'E' }, d = { N: -3, S: 3, E: 1, W: -1 };
      while (steps++ < 20) {
        const t = pz.tiles[idx], con = rot(t.shape, state.r[idx]);
        if (!con.includes(from)) return { ok: false, fuses };
        if (t.fuse === 'x') return { ok: false, fuses, burnt: true };
        if (t.fuse) fuses += t.fuse;
        const outs = con.filter((c) => c !== from);
        if (outs.length !== 1) return { ok: false, fuses, split: true };
        const out = outs[0];
        if (idx === pz.end && out === 'E') return { ok: fuses === pz.order, fuses, reached: true };
        if ((out === 'E' && idx % 3 === 2) || (out === 'W' && idx % 3 === 0)) return { ok: false, fuses };
        const nx = idx + d[out];
        if (nx < 0 || nx > 8) return { ok: false, fuses };
        idx = nx; from = opp[out];
      }
      return { ok: false, fuses };
    };
    const path = (shape) => {
      const seg = { N: 'M38 38 L38 0', E: 'M38 38 L76 38', S: 'M38 38 L38 76', W: 'M38 38 L0 38' };
      return BASE[shape].map((dd) => `<path d="${seg[dd]}" stroke="#f5b14c" stroke-width="10" stroke-linecap="round"/>`).join('') + '<circle cx="38" cy="38" r="9" fill="#f5b14c"/>';
    };
    const draw = () => {
      const res = trace();
      let html = '';
      for (let r = 0; r < 3; r++) {
        html += `<div class="end ${r === 1 ? 'live' : ''}">${r === 1 ? (pz.startLabel || 'IN') + ' ▶' : ''}</div>`;
        for (let c = 0; c < 3; c++) {
          const i = r * 3 + c, t = pz.tiles[i];
          html += `<button class="ctile ${t.fuse === 'x' ? 'bad' : ''}" data-t="${i}" aria-label="타일 ${i + 1}"><svg viewBox="0 0 76 76" style="transform:rotate(${state.r[i]}deg)">${path(t.shape)}</svg>${t.fuse ? `<span class="fuse">${t.fuse === 'x' ? '×' : '①②③④⑤'[+t.fuse - 1]}</span>` : ''}</button>`;
        }
        html += `<div class="end ${r === 1 && res.reached ? 'live' : ''}">${r === 1 ? '▶ ' + (pz.endLabel || 'OUT') : ''}</div>`;
      }
      ctx.root.innerHTML = `<div class="circuit">${html}</div><p class="note" style="text-align:center">타일을 누르면 90°씩 돈다 · 지난 퓨즈: <b class="mono">${res.fuses ? res.fuses.split('').map((f) => '①②③④⑤'[+f - 1]).join(' → ') : '없음'}</b></p>
        <div class="btn-row" style="justify-content:center"><button class="btn" id="cOk">${esc(pz.okLabel || '전류 보내기')}</button></div>`;
      ctx.root.querySelectorAll('[data-t]').forEach((b) => b.addEventListener('click', () => { const i = +b.dataset.t; state.r[i] = (state.r[i] + 90) % 360; ctx.feedback(''); ctx.save(); draw(); }));
      ctx.root.querySelector('#cOk').addEventListener('click', () => {
        const t = trace();
        if (t.ok) return ctx.solve();
        if (t.burnt) return ctx.fail('× 퓨즈를 지나 불꽃이 튄다. 그 타일은 피해야 한다.');
        if (t.split) return ctx.fail('갈림길 타일에서 신호가 둘로 나뉘었다.');
        if (t.reached) return ctx.fail('신호는 도착했지만 퓨즈를 ①→②→③→④ 순서로 모두 지나지 않았다.');
        ctx.fail('신호가 중간에서 끊겼다.');
      });
    };
    draw();
  };

  /* 미끄러지는 자석 미로 (5×5) */
  W.maze = (ctx) => {
    const { pz, state } = ctx;
    if (state.pos == null) Object.assign(state, { pos: pz.start, seals: [], moves: 0 });
    const walls = new Set(pz.walls);
    const draw = (msg) => {
      ctx.root.innerHTML = `<div class="maze">${Array.from({ length: 25 }, (_, i) => {
        const seal = pz.seals.find((s) => s.at === i);
        const cls = ['mcell', walls.has(i) ? 'wall' : '', i === pz.exit ? 'exit' : '', seal ? 'seal' : '', seal && state.seals.includes(seal.id) ? 'passed' : ''].join(' ');
        return `<div class="${cls}">${i === pz.exit ? 'EXIT' : ''}${seal ? seal.id : ''}${i === state.pos ? '<span class="mag"></span>' : ''}</div>`;
      }).join('')}</div>
        <p class="note" style="text-align:center">통과한 봉인 <b class="mono">${state.seals.join(' → ') || '없음'}</b> · 이동 ${state.moves}회</p>
        <div class="pad"><span></span><button data-m="N">▲</button><span></span><button data-m="W">◀</button><button data-m="R">↺</button><button data-m="E">▶</button><span></span><button data-m="S">▼</button><span></span></div>`;
      ctx.root.querySelectorAll('[data-m]').forEach((b) => b.addEventListener('click', () => move(b.dataset.m)));
      if (msg) ctx.feedback(msg);
    };
    const move = (m) => {
      if (m === 'R') { Object.assign(state, { pos: pz.start, seals: [], moves: 0 }); ctx.save(); return draw('처음 위치로 돌렸다.'); }
      const delta = { N: -5, S: 5, E: 1, W: -1 }[m];
      let p = state.pos, warn = '';
      for (;;) {
        const n = p + delta;
        if (n < 0 || n > 24 || (m === 'E' && p % 5 === 4) || (m === 'W' && p % 5 === 0) || walls.has(n)) break;
        p = n;
        const seal = pz.seals.find((s) => s.at === p);
        if (seal && !state.seals.includes(seal.id)) {
          const expect = pz.order[state.seals.length];
          if (seal.id === expect) state.seals.push(seal.id); else warn = `${seal.id} 봉인을 순서보다 먼저 지났다. 다음 봉인은 ${expect}.`;
        }
      }
      state.pos = p; state.moves++;
      ctx.save();
      if (p === pz.exit && state.seals.join('') === pz.order.join('')) { draw(); return ctx.solve(); }
      draw(warn || (p === pz.exit ? `EXIT에 닿았지만 봉인은 ${state.seals.length}/${pz.order.length}개뿐이다.` : ''));
    };
    draw();
  };

  /* 양팔 저울 */
  W.balance = (ctx) => {
    const { pz, state } = ctx;
    state.L = state.L || []; state.R = state.R || [];
    const wt = (ids) => ids.reduce((s, id) => s + pz.seals.find((x) => x.id === id).w, 0);
    const chip = (s) => `<button class="seal-chip" data-s="${s.id}"><b class="mono">${esc(s.label)}</b><small>${esc(s.note)}</small><i>${'▮'.repeat(s.w)}</i></button>`;
    const draw = () => {
      const used = new Set([...state.L, ...state.R]);
      const tilt = Math.max(-10, Math.min(10, (wt(state.R) - wt(state.L)) * 1.4));
      ctx.root.innerHTML = `
        <div class="balance-beam"><div class="beam" style="transform:rotate(${tilt}deg)"></div><div class="fulcrum"></div></div>
        <div class="pans"><div class="pan"><h4>${esc(pz.left)} · ${state.L.length}/3</h4>${state.L.map((id) => chip(pz.seals.find((x) => x.id === id))).join('')}</div>
        <div class="pan"><h4>${esc(pz.right)} · ${state.R.length}/3</h4>${state.R.map((id) => chip(pz.seals.find((x) => x.id === id))).join('')}</div></div>
        <div class="pool">${pz.seals.filter((s) => !used.has(s.id)).map(chip).join('')}</div>
        <p class="note">봉인을 누를 때마다 대기 → 왼쪽 → 오른쪽 → 대기로 옮겨진다. 가장자리 홈(▮)의 개수가 무게다.</p>
        <div class="btn-row"><button class="btn ghost" id="bClr">저울 비우기</button><button class="btn" id="bOk">잠금 확인</button></div>`;
      ctx.root.querySelectorAll('[data-s]').forEach((b) => b.addEventListener('click', () => {
        const id = b.dataset.s;
        if (state.L.includes(id)) { state.L = state.L.filter((x) => x !== id); if (state.R.length < 3) state.R.push(id); }
        else if (state.R.includes(id)) state.R = state.R.filter((x) => x !== id);
        else if (state.L.length < 3) state.L.push(id);
        else if (state.R.length < 3) state.R.push(id);
        ctx.feedback(''); ctx.save(); draw();
      }));
      ctx.root.querySelector('#bClr').addEventListener('click', () => { state.L = []; state.R = []; ctx.save(); draw(); });
      ctx.root.querySelector('#bOk').addEventListener('click', () => {
        if (state.L.length !== 3 || state.R.length !== 3) return ctx.fail('양쪽 접시에 정확히 세 개씩 올려야 한다.');
        const l = wt(state.L), r = wt(state.R);
        if (l !== r) return ctx.fail(l > r ? '저울이 왼쪽으로 기울었다.' : '저울이 오른쪽으로 기울었다.');
        if (!pz.answerL.every((id) => state.L.includes(id))) return ctx.fail('무게는 같지만 원본과 덮어쓴 기록이 섞였다. 접시 이름을 다시 보세요.');
        ctx.solve();
      });
    };
    draw();
  };

  /* 조각 순서·방향 맞추기 */
  W.fragments = (ctx) => {
    const { pz, state } = ctx;
    state.order = state.order || [...pz.startOrder];
    state.rot = state.rot || [...pz.startRot];
    if (state.sel === undefined) state.sel = null;
    const draw = () => {
      ctx.root.innerHTML = `<div class="frags">${state.order.map((pid, pos) => {
        const p = pz.pieces[pid];
        return `<button class="frag ${state.sel === pos ? 'sel' : ''}" data-pos="${pos}"><span class="fx" style="transform:rotate(${state.rot[pid]}deg)">${esc(p.text)}</span><small>${esc(p.note || '')}</small></button>`;
      }).join('')}</div>
        <div class="frag-actions"><button class="btn ghost" data-a="left">← 옮기기</button><button class="btn ghost" data-a="rot">↻ 90° 돌리기</button><button class="btn ghost" data-a="right">옮기기 →</button><button class="btn" data-a="ok">${esc(pz.okLabel || '이어 붙이기')}</button></div>
        <p class="note" style="text-align:center">조각을 하나 고른 뒤 옮기거나 돌리세요.</p>`;
      ctx.root.querySelectorAll('[data-pos]').forEach((b) => b.addEventListener('click', () => { const p = +b.dataset.pos; state.sel = state.sel === p ? null : p; ctx.feedback(''); draw(); }));
      ctx.root.querySelectorAll('[data-a]').forEach((b) => b.addEventListener('click', () => act(b.dataset.a)));
    };
    const act = (a) => {
      if (a === 'ok') {
        const orderOk = state.order.every((v, i) => v === pz.answer[i]);
        const rotOk = state.rot.every((r) => r % 360 === 0);
        ctx.save();
        if (orderOk && rotOk) return ctx.solve();
        return ctx.fail(!orderOk ? (pz.orderText || '연결 기호가 이어지지 않는 곳이 있다.') : (pz.rotText || '순서는 맞지만 거꾸로 놓인 조각이 있다.'));
      }
      if (state.sel === null) return ctx.feedback('먼저 조각 하나를 고르세요.', 'bad');
      const pos = state.sel;
      if (a === 'rot') { const pid = state.order[pos]; state.rot[pid] = (state.rot[pid] + 90) % 360; }
      else {
        const t = a === 'left' ? Math.max(0, pos - 1) : Math.min(state.order.length - 1, pos + 1);
        [state.order[pos], state.order[t]] = [state.order[t], state.order[pos]];
        state.sel = t;
      }
      ctx.feedback(''); ctx.save(); draw();
    };
    draw();
  };

  /* 천공판(구멍 난 종이)을 글자판 위에서 움직이기 */
  W.grille = (ctx) => {
    const { pz, state } = ctx;
    if (state.x == null) Object.assign(state, { x: pz.startX || 0, y: pz.startY || 0, r: pz.startR || 0 });
    const rows = pz.grid.length, cols = pz.grid[0].length;
    const holesAt = () => pz.holes.map(([hx, hy, n]) => {
      // 3×3 판 안에서 회전
      let x = hx, y = hy;
      for (let k = 0; k < state.r / 90; k++) [x, y] = [2 - y, x];
      return { x: state.x + x, y: state.y + y, n };
    });
    const draw = () => {
      const holes = holesAt();
      let html = '';
      for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
        const inSleeve = c >= state.x && c < state.x + 3 && r >= state.y && r < state.y + 3;
        const h = holes.find((p) => p.x === c && p.y === r);
        html += `<div class="g ${inSleeve ? (h ? 'hole' : 'cover') : ''}" ${h ? `data-n="${'①②③④'[h.n - 1]}"` : ''}>${esc(pz.grid[r][c])}</div>`;
      }
      const read = holes.slice().sort((a, b) => a.n - b.n).map((h) => pz.grid[h.y] && pz.grid[h.y][h.x]).join('');
      ctx.root.innerHTML = `<div style="text-align:center"><div class="grille" style="grid-template-columns:repeat(${cols},auto)">${html}</div></div>
        <p class="note" style="text-align:center">구멍으로 읽히는 글자(①→④): <b class="mono" style="color:var(--accent-2)">${esc(read)}</b> · 판 회전 ${state.r}°</p>
        <div class="pad"><button data-g="rl">↶</button><button data-g="N">▲</button><button data-g="rr">↷</button><button data-g="W">◀</button><button data-g="S">▼</button><button data-g="E">▶</button></div>
        <div class="btn-row" style="justify-content:center"><button class="btn" id="gOk">이 글자로 읽기</button></div>`;
      ctx.root.querySelectorAll('[data-g]').forEach((b) => b.addEventListener('click', () => {
        const a = b.dataset.g;
        if (a === 'N') state.y = Math.max(0, state.y - 1);
        if (a === 'S') state.y = Math.min(rows - 3, state.y + 1);
        if (a === 'W') state.x = Math.max(0, state.x - 1);
        if (a === 'E') state.x = Math.min(cols - 3, state.x + 1);
        if (a === 'rr') state.r = (state.r + 90) % 360;
        if (a === 'rl') state.r = (state.r + 270) % 360;
        ctx.feedback(''); ctx.save(); draw();
      }));
      ctx.root.querySelector('#gOk').addEventListener('click', () => {
        if (state.x === pz.x && state.y === pz.y && state.r === pz.r) return ctx.solve();
        ctx.fail(read === pz.word ? '글자는 맞아 보이지만 번호가 거꾸로 읽힌다. 판의 방향을 바로 세우세요.' : '뜻이 통하는 낱말이 되지 않는다.');
      });
    };
    draw();
  };

  /* 투명 종이 세 장 겹치기 */
  W.layers = (ctx) => {
    const { pz, state } = ctx;
    state.L = state.L || pz.sheets.map((s) => ({ x: s.x, y: s.y, r: s.r }));
    const same = (p) => new Set(state.L.map((l) => l[p])).size === 1;
    const draw = () => {
      const aligned = same('x') && same('y') && same('r');
      const colors = ['#e5484d', '#3b82f6', '#16a34a'];
      ctx.root.innerHTML = `
        <div class="layers-stage">${state.L.map((l, i) => `<div class="sheet" style="border-color:${colors[i]};color:${colors[i]};background:${colors[i]}14;transform:translate(${l.x * 3}px,${l.y * 3}px) rotate(${l.r}deg)"><i>＋</i><i>＋</i><i>＋</i><i>＋</i>${aligned ? '' : esc(pz.sheets[i].text)}</div>`).join('')}
        ${aligned ? `<div class="sheet" style="border-color:#111;color:#111;background:#fffbe6;transform:translate(${state.L[0].x * 3}px,${state.L[0].y * 3}px) rotate(${state.L[0].r}deg)">${pz.composite}</div>` : ''}</div>
        <div class="layer-ctl">${state.L.map((l, i) => `<div class="layer-row"><b style="color:${colors[i]}">${i + 1}. ${esc(pz.sheets[i].name)}</b>
          <button data-l="${i}" data-a="W">◀</button><button data-l="${i}" data-a="E">▶</button><button data-l="${i}" data-a="N">▲</button><button data-l="${i}" data-a="S">▼</button><button data-l="${i}" data-a="R">↻</button>
          <span>좌우 ${l.x} · 상하 ${l.y} · ${l.r}°</span></div>`).join('')}</div>
        <p class="note">세 종이의 좌우·상하·회전 값이 서로 같아지면 모서리의 ＋가 하나로 겹친다. 0일 필요는 없다. 일치: 좌우 ${same('x') ? '✓' : '○'} · 상하 ${same('y') ? '✓' : '○'} · 회전 ${same('r') ? '✓' : '○'}</p>
        <div class="btn-row"><button class="btn" id="lyOk">겹친 상태로 판독</button></div>`;
      ctx.root.querySelectorAll('[data-l]').forEach((b) => b.addEventListener('click', () => {
        const l = state.L[+b.dataset.l], a = b.dataset.a;
        if (a === 'W') l.x = Math.max(-24, l.x - 2); if (a === 'E') l.x = Math.min(24, l.x + 2);
        if (a === 'N') l.y = Math.max(-24, l.y - 2); if (a === 'S') l.y = Math.min(24, l.y + 2);
        if (a === 'R') l.r = (l.r + 90) % 360;
        ctx.feedback(''); ctx.save(); draw();
      }));
      ctx.root.querySelector('#lyOk').addEventListener('click', () => (aligned ? ctx.solve() : ctx.fail('아직 ＋ 표시가 셋으로 갈라져 보인다.')));
    };
    draw();
  };

  /* 작성자 지목: 인물·방법·동기 + 증거 네 장 */
  W.accuse = (ctx) => {
    const { pz, state, g } = ctx;
    state.a = state.a || {}; state.ev = state.ev || [];
    const evs = pz.evidence.filter((id) => g.has(id));
    const draw = () => {
      ctx.root.innerHTML = `
        <div class="selects">${pz.fields.map((f) => `<label>${esc(f.label)}<select data-f="${f.key}"><option value="">— 선택 —</option>${f.options.map((o) => `<option value="${o.v}" ${state.a[f.key] === o.v ? 'selected' : ''}>${esc(o.label)}</option>`).join('')}</select></label>`).join('')}</div>
        <p class="note">제출할 증거 ${state.ev.length}/4 · 가진 증거 카드 중에서 고르세요.</p>
        <div class="cards4">${evs.map((id) => { const it = g._item(id); return `<button class="pcard ${state.ev.includes(id) ? 'on' : ''}" data-e="${id}"><em>${esc(it.code)}</em><b>${esc(it.name)}</b><small>${esc(it.short || '')}</small></button>`; }).join('') || '<p class="note">아직 증거 카드가 없다.</p>'}</div>
        <div class="btn-row"><button class="btn" id="acOk">지목 봉인</button></div>`;
      ctx.root.querySelectorAll('[data-f]').forEach((s) => s.addEventListener('change', () => { state.a[s.dataset.f] = s.value; ctx.feedback(''); ctx.save(); }));
      ctx.root.querySelectorAll('[data-e]').forEach((b) => b.addEventListener('click', () => {
        const id = b.dataset.e;
        if (state.ev.includes(id)) state.ev = state.ev.filter((x) => x !== id); else if (state.ev.length < 4) state.ev.push(id); else return ctx.feedback('증거는 네 장까지만 낼 수 있다.', 'bad');
        ctx.feedback(''); ctx.save(); draw();
      }));
      ctx.root.querySelector('#acOk').addEventListener('click', () => {
        for (const f of pz.fields) if (state.a[f.key] !== f.answer) return ctx.fail(state.a[f.key] ? f.why : `${f.label}을(를) 고르세요.`);
        if (state.ev.length !== 4 || !pz.answerEv.every((id) => state.ev.includes(id))) return ctx.fail(pz.evWhy);
        ctx.solve();
      });
    };
    draw();
  };

  /* 사건 보드: 사건마다 서로 다른 출처의 원본 카드 두 장(승인·대체)을 고른다 */
  W.board = (ctx) => {
    const { pz, state } = ctx;
    state.i = state.i || 0; state.c = state.c || {};
    const S = (id) => state.c[id] || (state.c[id] = { proofs: [], done: false });
    const draw = () => {
      const c = pz.cases[state.i], a = S(c.id);
      const nx = pz.cases[(state.i + 1) % pz.cases.length];
      const cards = [
        { id: c.id + '-t', kind: '대체 단서', src: pz.src[c.src[1]], label: `CASE ${c.id} · 대체 코드 ${c.tc}`, sub: `${c.date} ${c.time} · ${c.tag}` },
        { id: c.id + '-c', kind: '복제 사본', src: pz.src[c.src[0]], label: `CASE ${c.id} · MIRROR COPY ${c.oc}`, sub: `${c.date} ${c.time} · 원승인 기록의 서버 사본` },
        { id: nx.id + '-t', kind: '대체 단서', src: pz.src[nx.src[1]], label: `CASE ${nx.id} · 대체 코드 ${nx.tc}`, sub: `${nx.date} ${nx.time} · ${nx.tag}` },
        { id: c.id + '-o', kind: '승인 단서', src: pz.src[c.src[0]], label: `CASE ${c.id} · 승인 코드 ${c.oc}`, sub: `${c.date} ${c.time} · 원승인 서명` },
      ];
      if (state.i % 2) cards.reverse();
      ctx.root.innerHTML = `
        <div class="case-tabs">${pz.cases.map((x, i) => `<button class="${i === state.i ? 'on' : ''} ${S(x.id).done ? 'done' : ''}" data-ci="${i}">${x.id}</button>`).join('')}</div>
        <div class="paper" style="white-space:normal"><b>CASE ${c.id} · ${esc(c.title)}</b><br>${c.date} ${c.time} · ${esc(c.place)}<br>${esc(c.text)}</div>
        <div class="cards4">${cards.map((p) => `<button class="pcard ${a.proofs.includes(p.id) ? 'on' : ''}" data-p="${p.id}" ${a.done ? 'disabled' : ''}><em>${p.kind} · ${p.src}</em><b>${esc(p.label)}</b><small>${esc(p.sub)}</small></button>`).join('')}</div>
        ${a.done ? `<div class="verify-sel">확정 · 원래 승인자 <b>${esc(c.owner)}</b> (${c.oc}) → 대체 책임자 <b>${esc(c.target)}</b> (${c.tc})</div>` : '<div class="btn-row"><button class="btn" id="bdOk">이 사건 연결 확정</button></div>'}
        <p class="note">사건 ${pz.cases.filter((x) => S(x.id).done).length} / ${pz.cases.length} 연결됨</p>`;
      ctx.root.querySelectorAll('[data-ci]').forEach((b) => b.addEventListener('click', () => { state.i = +b.dataset.ci; ctx.feedback(''); ctx.save(); draw(); }));
      ctx.root.querySelectorAll('[data-p]').forEach((b) => b.addEventListener('click', () => {
        const id = b.dataset.p;
        a.proofs = a.proofs.includes(id) ? a.proofs.filter((x) => x !== id) : [...a.proofs.slice(-1), id];
        ctx.feedback(''); ctx.save(); draw();
      }));
      ctx.root.querySelector('#bdOk')?.addEventListener('click', () => {
        if (a.proofs.length !== 2) return ctx.fail('카드 두 장을 고르세요.');
        if (a.proofs.includes(c.id + '-c')) return ctx.fail('MIRROR COPY는 원본을 복제한 서버 사본이다. 원본과 같은 출처라 독립 증거가 아니다.');
        if (a.proofs.includes(nx.id + '-t')) return ctx.fail(`그 카드는 CASE ${nx.id}의 것이다. 사건 문자와 날짜·시각을 맞추세요.`);
        a.done = true;
        ctx.save();
        if (pz.cases.every((x) => S(x.id).done)) { draw(); return ctx.solve(); }
        state.i = pz.cases.findIndex((x) => !S(x.id).done);
        draw();
        ctx.feedback(`CASE ${c.id} 확정: ${c.owner} → ${c.target}. 다음 사건으로.`, 'good');
      });
    };
    draw();
  };

  /* 교차 검증: 결론 하나 + 그 결론을 독립적으로 뒷받침하는 증거 두 장 */
  W.verify = (ctx) => {
    const { pz, state, g } = ctx;
    state.ev = state.ev || [];
    const pool = g.evidence();
    const draw = () => {
      const groups = MO.evidenceGroups(pool);
      ctx.root.innerHTML = `
        <p class="note">① 결론을 고르세요.</p>
        <div class="claims">${pz.claims.map((c) => `<button class="choice ${state.claim === c.v ? 'on' : ''}" data-c="${esc(c.v)}"><b>${esc(c.label)}</b></button>`).join('')}</div>
        <p class="note" style="margin-top:14px">② 그 결론을 증명하는, 서로 다른 곳에서 나온 기록 두 장을 고르세요.</p>
        <div class="ev-pick">${groups.map(([p, ids]) => `<h5>${esc(p.time)} · ${esc(p.place)}</h5><div class="chips">${ids.map((id) => { const it = g._item(id); return `<button class="chip ${state.ev.includes(id) ? 'on' : ''}" data-e="${id}" title="${esc(it.short || '')}"><small>${esc(it.code)}</small>${esc(it.name)}</button>`; }).join('')}</div>`).join('')}</div>
        <div class="verify-sel">선택: ${state.claim ? `<b>${esc(pz.claims.find((c) => c.v === state.claim).label)}</b>` : '결론 없음'} · 증거 ${state.ev.map((id) => `<b>${esc(g._item(id).code)}</b>`).join(' + ') || '없음'}</div>
        <div class="btn-row"><button class="btn" id="vfOk">${esc(pz.okLabel || '보드에 적기')}</button></div>`;
      ctx.root.querySelectorAll('[data-c]').forEach((b) => b.addEventListener('click', () => { state.claim = b.dataset.c; ctx.feedback(''); ctx.save(); draw(); }));
      ctx.root.querySelectorAll('[data-e]').forEach((b) => b.addEventListener('click', () => {
        const id = b.dataset.e;
        state.ev = state.ev.includes(id) ? state.ev.filter((x) => x !== id) : [...state.ev.slice(-1), id];
        ctx.feedback(''); ctx.save(); draw();
      }));
      ctx.root.querySelector('#vfOk').addEventListener('click', () => {
        if (!state.claim) return ctx.fail('먼저 결론을 고르세요.');
        if (state.claim !== pz.answer) return ctx.fail(pz.claims.find((c) => c.v === state.claim).why || '그 결론은 기록과 맞지 않는다.');
        if (state.ev.length !== 2) return ctx.fail('증거 두 장을 고르세요. 기록 하나만으로는 사실로 적지 않는다.');
        const ok = pz.pairs.some((pair) => pair.every((id) => state.ev.includes(id)));
        if (ok) return ctx.solve();
        const half = pz.pairs.some((pair) => pair.some((id) => state.ev.includes(id)));
        const msg = state.ev.map((id) => pz.notes && pz.notes[id]).find(Boolean);
        ctx.fail(msg || (half ? '하나는 맞다. 그 기록과 다른 곳에서 나온, 같은 말을 하는 두 번째 기록이 필요하다.' : (pz.evWhy || '고른 기록이 이 결론을 직접 증명하지 못한다.')));
      });
    };
    draw();
  };

  /* 순서 맞추기 */
  W.order = (ctx) => {
    const { pz, state } = ctx;
    state.o = state.o || [...pz.start];
    const draw = () => {
      ctx.root.innerHTML = `<div class="order-list">${state.o.map((id, i) => { const c = pz.cards.find((x) => x.id === id); return `<div class="order-row" data-row="${id}"><span class="n">${i + 1}</span><span class="t">${esc(c.label)}${c.sub ? `<small>${esc(c.sub)}</small>` : ''}</span><button data-up="${i}" aria-label="위로">▲</button><button data-down="${i}" aria-label="아래로">▼</button></div>`; }).join('')}</div>
        <div class="btn-row"><button class="btn" id="odOk">${esc(pz.okLabel || '이 순서로 봉인')}</button></div>`;
      const swap = (i, j) => { if (j < 0 || j >= state.o.length) return; [state.o[i], state.o[j]] = [state.o[j], state.o[i]]; ctx.feedback(''); ctx.save(); draw(); };
      ctx.root.querySelectorAll('[data-up]').forEach((b) => b.addEventListener('click', () => swap(+b.dataset.up, +b.dataset.up - 1)));
      ctx.root.querySelectorAll('[data-down]').forEach((b) => b.addEventListener('click', () => swap(+b.dataset.down, +b.dataset.down + 1)));
      ctx.root.querySelector('#odOk').addEventListener('click', () => {
        const wrong = state.o.findIndex((id, i) => id !== pz.answer[i]);
        if (wrong < 0) return ctx.solve();
        ctx.fail(`${wrong + 1}번째 자리부터 순서가 어긋난다. ${pz.failText || ''}`);
      });
    };
    draw();
  };

  /* 안내만 보여 주는 장치(pre 전용): 표나 그림 */
  W.view = (ctx) => { ctx.root.innerHTML = typeof ctx.pz.html === 'function' ? ctx.pz.html(ctx.g) : ctx.pz.html; };
})();
