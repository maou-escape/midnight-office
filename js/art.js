/* Midnight Office · 방 배경 그림 (SVG, 1600×900 좌표)
   방 데이터의 art 배열을 받아 SVG 문자열을 만든다. 각 소품은 {t, x, y, w, h, ...옵션}. */
(function () {
  'use strict';

  const esc = (s) => String(s ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const txt = (x, y, s, o = {}) => `<text x="${x}" y="${y}" fill="${o.fill || '#cfd5e2'}" font-size="${o.size || 18}" font-family="${o.mono === false ? 'Noto Sans KR' : 'IBM Plex Mono, monospace'}" text-anchor="${o.anchor || 'middle'}" font-weight="${o.weight || 500}"${o.extra || ''}>${esc(s)}</text>`;
  const rect = (x, y, w, h, fill, o = {}) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${o.rx ?? 4}" fill="${fill}"${o.stroke ? ` stroke="${o.stroke}" stroke-width="${o.sw || 2}"` : ''}${o.op != null ? ` opacity="${o.op}"` : ''}${o.filter ? ` filter="url(#${o.filter})"` : ''}/>`;
  const glow = (x, y, w, h, color, op = 0.35) => `<ellipse cx="${x + w / 2}" cy="${y + h / 2}" rx="${w * 0.8}" ry="${h * 0.8}" fill="${color}" opacity="${op}" filter="url(#blur)"/>`;

  const P = {
    // 배경 벽 + 바닥
    room(o) {
      const wall = o.wall || '#1d2230', floor = o.floor || '#14161c', fy = o.floorY ?? 640;
      let s = rect(0, 0, 1600, fy, wall, { rx: 0 });
      s += `<rect x="0" y="0" width="1600" height="${fy}" fill="url(#wallShade)"/>`;
      s += rect(0, fy, 1600, 900 - fy, floor, { rx: 0 });
      s += `<rect x="0" y="${fy}" width="1600" height="${900 - fy}" fill="url(#floorShade)"/>`;
      s += rect(0, fy - 6, 1600, 8, o.trim || '#0d0f14', { rx: 0 });
      if (o.tiles) for (let x = 0; x < 1600; x += 160) s += `<line x1="${x}" y1="${fy}" x2="${x - 220 + x * 0.3}" y2="900" stroke="#ffffff" stroke-opacity=".04" stroke-width="2"/>`;
      if (o.panels) for (let x = 80; x < 1600; x += 200) s += `<line x1="${x}" y1="0" x2="${x}" y2="${fy - 6}" stroke="#000" stroke-opacity=".18" stroke-width="2"/>`;
      return s;
    },
    ceilingLight(o) {
      const on = o.on !== false;
      let s = rect(o.x, o.y, o.w || 220, 14, on ? (o.color || '#f2f5ff') : '#2a2f3b', { rx: 4 });
      if (on) s += glow(o.x, o.y, o.w || 220, 60, o.color || '#dfe6ff', 0.18);
      return s;
    },
    emergency(o) { // 비상등
      return rect(o.x, o.y, 70, 26, '#2c0f10', { rx: 6 }) + rect(o.x + 8, o.y + 6, 54, 14, '#ff5b5b', { rx: 4 }) + glow(o.x, o.y, 70, 26, '#ff4040', 0.5);
    },
    exitSign(o) {
      return rect(o.x, o.y, 110, 40, '#0e3b22', { rx: 4 }) + txt(o.x + 55, o.y + 27, o.text || 'EXIT', { fill: '#5dff9e', size: 18, weight: 600 }) + glow(o.x, o.y, 110, 40, '#3dff8a', 0.25);
    },
    window(o) {
      const { x, y, w, h } = o;
      let s = rect(x - 8, y - 8, w + 16, h + 16, '#0b0d12', { rx: 6 }) + rect(x, y, w, h, o.sky || '#0b1424', { rx: 2 });
      const rnd = mulberry(x * 7 + y);
      for (let i = 0; i < (o.buildings ?? 7); i++) {
        const bw = 40 + rnd() * 70, bx = x + rnd() * (w - bw), bh = h * (0.3 + rnd() * 0.6);
        s += rect(bx, y + h - bh, bw, bh, '#111827', { rx: 0 });
        for (let wy = y + h - bh + 10; wy < y + h - 8; wy += 16) for (let wx = bx + 6; wx < bx + bw - 8; wx += 14) if (rnd() > 0.72) s += rect(wx, wy, 6, 8, '#f6d27a', { rx: 1, op: 0.75 });
      }
      if (o.dawn) s += `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="url(#dawn)" opacity=".7"/>`;
      s += `<line x1="${x + w / 2}" y1="${y}" x2="${x + w / 2}" y2="${y + h}" stroke="#0b0d12" stroke-width="8"/>`;
      return s;
    },
    door(o) {
      const { x, y, w, h } = o;
      let s = rect(x - 10, y - 10, w + 20, h + 10, o.frame || '#0f1218', { rx: 4 });
      s += rect(x, y, w, h, o.color || '#3a4252', { rx: 2 });
      if (o.glass) s += rect(x + w * 0.2, y + h * 0.12, w * 0.6, h * 0.3, '#0a1220', { rx: 2, op: 0.9 });
      s += rect(x + w - 26, y + h * 0.52, 14, 34, '#9aa3b5', { rx: 3 });
      if (o.label) s += rect(x + w / 2 - 70, y + 24, 140, 30, '#e8ebf1', { rx: 3 }) + txt(x + w / 2, y + 45, o.label, { fill: '#1b202b', size: 16, mono: false, weight: 700 });
      if (o.lamp) {
        const c = o.lamp === 'green' ? '#3dff8a' : '#ff4848';
        s += rect(x + w + 16, y + h * 0.42, 40, 60, '#0b0d12', { rx: 6 }) + `<circle cx="${x + w + 36}" cy="${y + h * 0.42 + 18}" r="7" fill="${c}"/>` + glow(x + w + 16, y + h * 0.42, 40, 30, c, 0.5);
      }
      if (o.open) s += rect(x, y, w, h, '#05060a', { rx: 2, op: 0.85 });
      return s;
    },
    elevator(o) {
      const { x, y, w, h } = o;
      let s = rect(x - 16, y - 16, w + 32, h + 16, '#4a5160', { rx: 4 });
      s += rect(x, y, w / 2 - 2, h, '#8c94a3', { rx: 0 }) + rect(x + w / 2 + 2, y, w / 2 - 2, h, '#8c94a3', { rx: 0 });
      s += rect(x + w / 2 - 50, y - 64, 100, 36, '#090b0f', { rx: 4 }) + txt(x + w / 2, y - 39, o.floor || 'B1', { fill: '#ff8a5b', size: 20, weight: 600 });
      if (o.open) s += rect(x, y, w, h, '#0c0e12', { rx: 0, op: 0.9 });
      return s;
    },
    desk(o) {
      const { x, y, w } = o, h = o.h || 110;
      let s = rect(x, y, w, 18, o.top || '#5b4a3a', { rx: 4 }) + rect(x + 10, y + 18, 12, h - 18, '#2a2f3b', { rx: 2 }) + rect(x + w - 22, y + 18, 12, h - 18, '#2a2f3b', { rx: 2 });
      if (o.drawers) s += rect(x + w - 150, y + 18, 120, h - 30, '#3a3f4b', { rx: 3 }) + rect(x + w - 140, y + 30, 100, 26, '#4a505d', { rx: 3 }) + rect(x + w - 140, y + 64, 100, 26, '#4a505d', { rx: 3 }) + rect(x + w - 100, y + 40, 20, 6, '#9aa3b5', { rx: 2 }) + rect(x + w - 100, y + 74, 20, 6, '#9aa3b5', { rx: 2 });
      return s;
    },
    monitor(o) {
      const { x, y, w, h } = o; const on = o.on !== false; const c = o.color || '#6ff2b0';
      let s = rect(x + w / 2 - 10, y + h, 20, 26, '#2a2f3b', { rx: 2 }) + rect(x + w / 2 - 40, y + h + 22, 80, 8, '#2a2f3b', { rx: 3 });
      s += rect(x - 6, y - 6, w + 12, h + 12, '#0b0d12', { rx: 6 }) + rect(x, y, w, h, on ? (o.bg || '#06140e') : '#0a0c10', { rx: 2 });
      if (on) {
        s += glow(x, y, w, h, c, 0.16);
        (o.lines || []).forEach((l, i) => { s += txt(x + 10, y + 24 + i * 20, l, { fill: c, size: 13, anchor: 'start' }); });
      }
      return s;
    },
    screens(o) { // 모니터 벽
      let s = '';
      const cols = o.cols || 4, rows = o.rows || 3, gw = o.w / cols, gh = o.h / rows;
      for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
        const x = o.x + c * gw + 4, y = o.y + r * gh + 4, alt = (r + c) % 3;
        s += rect(x, y, gw - 8, gh - 8, '#0b0d12', { rx: 3 }) + rect(x + 4, y + 4, gw - 16, gh - 16, ['#0c1f2c', '#10202a', '#1c1010'][alt], { rx: 2 });
        s += rect(x + 10, y + 12, (gw - 30) * 0.6, 4, '#4fb3ff', { op: 0.5, rx: 1 }) + rect(x + 10, y + 22, (gw - 30) * 0.4, 4, '#4fb3ff', { op: 0.35, rx: 1 });
      }
      return s + glow(o.x, o.y, o.w, o.h, '#4fb3ff', 0.12);
    },
    cabinet(o) {
      const { x, y, w, h } = o; const n = o.n || 4;
      let s = rect(x, y, w, h, o.color || '#3c4352', { rx: 4 });
      for (let i = 0; i < n; i++) { const dy = y + 8 + i * ((h - 16) / n); s += rect(x + 8, dy, w - 16, (h - 16) / n - 8, '#495062', { rx: 3 }) + rect(x + w / 2 - 16, dy + 10, 32, 6, '#9aa3b5', { rx: 2 }); }
      return s;
    },
    shelf(o) {
      const { x, y, w, h } = o; const rows = o.rows || 4; const rnd = mulberry(x + y * 3);
      let s = rect(x, y, w, h, '#2b2420', { rx: 2 });
      for (let r = 0; r < rows; r++) {
        const sy = y + (r + 1) * (h / rows);
        s += rect(x, sy - 8, w, 8, '#4a3b30', { rx: 1 });
        let bx = x + 8;
        while (bx < x + w - 30) {
          const bw = o.boxes ? 60 + rnd() * 30 : 14 + rnd() * 14, bh = o.boxes ? h / rows * 0.6 : h / rows * (0.55 + rnd() * 0.3);
          const col = o.boxes ? ['#a58a64', '#8d7553', '#b79a70'][Math.floor(rnd() * 3)] : ['#6b2e2e', '#2e4b6b', '#3e5b3a', '#6b5a2e', '#4a3d6b', '#7a7a7a'][Math.floor(rnd() * 6)];
          if (bx + bw > x + w - 8) break;
          s += rect(bx, sy - 8 - bh, bw, bh, col, { rx: 2 });
          if (o.boxes) s += rect(bx + bw / 2 - 14, sy - 8 - bh * 0.6, 28, 12, '#efe9da', { rx: 1, op: 0.8 });
          bx += bw + (o.boxes ? 8 : 3);
        }
      }
      if (o.label) s += rect(x + w / 2 - 50, y - 30, 100, 24, '#e8ebf1', { rx: 3 }) + txt(x + w / 2, y - 12, o.label, { fill: '#1b202b', size: 14, weight: 700 });
      return s;
    },
    rack(o) {
      const { x, y, w, h } = o; const rnd = mulberry(x * 3 + y);
      let s = rect(x, y, w, h, '#14171d', { rx: 4, stroke: '#2a3140' });
      for (let yy = y + 14; yy < y + h - 20; yy += 26) {
        s += rect(x + 10, yy, w - 20, 20, '#1f2430', { rx: 2 });
        for (let k = 0; k < 4; k++) if (rnd() > 0.3) s += `<circle cx="${x + 22 + k * 12}" cy="${yy + 10}" r="3" fill="${rnd() > 0.85 ? '#ff5b5b' : (o.leds || '#3dff8a')}"/>`;
      }
      if (o.label) s += rect(x + w / 2 - 40, y - 28, 80, 22, '#e8ebf1', { rx: 3 }) + txt(x + w / 2, y - 11, o.label, { fill: '#1b202b', size: 14, weight: 700 });
      return s + glow(x, y, w, h, o.leds || '#3dff8a', 0.05);
    },
    panel(o) { // 배전반 / 장치 함
      const { x, y, w, h } = o;
      let s = rect(x, y, w, h, o.color || '#59606f', { rx: 4, stroke: '#2a2f3b' }) + rect(x + 10, y + 10, w - 20, h - 20, o.inner || '#4a505d', { rx: 3 });
      if (o.hazard) s += `<polygon points="${x + w / 2},${y + 24} ${x + w / 2 + 22},${y + 62} ${x + w / 2 - 22},${y + 62}" fill="#f5b14c"/>` + txt(x + w / 2, y + 56, '!', { fill: '#111', size: 24, weight: 700 });
      if (o.open) for (let r = 0; r < 3; r++) for (let c = 0; c < 6; c++) s += rect(x + 20 + c * ((w - 40) / 6), y + 30 + r * ((h - 60) / 3), (w - 40) / 6 - 6, (h - 60) / 3 - 10, r === 1 && c === 3 && o.lit ? '#3dff8a' : '#2a2f3b', { rx: 2 });
      if (o.label) s += txt(x + w / 2, y + h - 18, o.label, { fill: '#e8ebf1', size: 14, weight: 600 });
      if (o.lamp) s += `<circle cx="${x + w - 22}" cy="${y + 22}" r="6" fill="${o.lamp}"/>` + glow(x + w - 30, y + 14, 16, 16, o.lamp, 0.6);
      return s;
    },
    keypad(o) {
      const { x, y } = o, w = o.w || 70, h = o.h || 100;
      let s = rect(x, y, w, h, '#1b1f27', { rx: 6, stroke: '#3a4252' }) + rect(x + 8, y + 8, w - 16, 18, o.on === false ? '#0a0c10' : '#082015', { rx: 2 });
      for (let r = 0; r < 4; r++) for (let c = 0; c < 3; c++) s += rect(x + 10 + c * ((w - 20) / 3), y + 32 + r * ((h - 40) / 4), (w - 20) / 3 - 4, (h - 40) / 4 - 4, '#3a4252', { rx: 2 });
      if (o.on !== false) s += glow(x, y, w, 20, o.lamp || '#3dff8a', 0.4);
      return s;
    },
    printer(o) {
      const { x, y, w, h } = o;
      let s = rect(x, y, w, h, '#c8ccd4', { rx: 8 }) + rect(x, y, w, h * 0.25, '#e2e5ea', { rx: 8 }) + rect(x + 20, y + h * 0.35, w - 40, 10, '#2a2f3b', { rx: 2 });
      s += rect(x + w - 70, y + 14, 50, 18, '#0b2a1a', { rx: 2 });
      if (o.jam) s += `<polygon points="${x + 40},${y + h * 0.35} ${x + w - 60},${y + h * 0.35} ${x + w - 80},${y + h * 0.35 - 70} ${x + 60},${y + h * 0.35 - 60}" fill="#f4f1e8"/>` + txt(x + w / 2, y + h * 0.35 - 30, '23:41 · USER K', { fill: '#444', size: 12 });
      return s;
    },
    fridge(o) {
      const { x, y, w, h } = o;
      let s = rect(x, y, w, h, '#d4d8de', { rx: 10 }) + `<line x1="${x}" y1="${y + h * 0.38}" x2="${x + w}" y2="${y + h * 0.38}" stroke="#9aa3b5" stroke-width="3"/>`;
      s += rect(x + w - 24, y + 30, 8, 60, '#9aa3b5', { rx: 3 }) + rect(x + w - 24, y + h * 0.45, 8, 80, '#9aa3b5', { rx: 3 });
      if (o.note) s += rect(x + 24, y + h * 0.5, 70, 90, '#f4f1e8', { rx: 1 }) + `<circle cx="${x + 59}" cy="${y + h * 0.5 + 6}" r="7" fill="#e5484d"/>`;
      return s;
    },
    board(o) { // 화이트보드 / 게시판
      const { x, y, w, h } = o;
      let s = rect(x - 6, y - 6, w + 12, h + 12, '#9aa3b5', { rx: 4 }) + rect(x, y, w, h, o.cork ? '#9b6b43' : '#eef0f3', { rx: 2 });
      (o.lines || []).forEach((l, i) => { s += txt(x + 16, y + 30 + i * 26, l, { fill: o.cork ? '#fff' : '#2a3a6a', size: 16, anchor: 'start', mono: false }); });
      if (o.pins) for (let i = 0; i < o.pins; i++) s += rect(x + 20 + i * (w - 40) / o.pins, y + 20 + (i % 2) * 40, (w - 60) / o.pins, 70, '#f4f1e8', { rx: 1 }) + `<circle cx="${x + 20 + i * (w - 40) / o.pins + 14}" cy="${y + 26 + (i % 2) * 40}" r="5" fill="#e5484d"/>`;
      return s;
    },
    paper(o) {
      const r = o.r || 0;
      return `<g transform="rotate(${r} ${o.x + (o.w || 60) / 2} ${o.y + (o.h || 80) / 2})">${rect(o.x, o.y, o.w || 60, o.h || 80, o.color || '#f4f1e8', { rx: 1 })}${[0, 1, 2, 3].map((i) => rect(o.x + 8, o.y + 14 + i * 14, (o.w || 60) - 16 - (i % 2) * 12, 4, '#9aa3b5', { rx: 1, op: 0.7 })).join('')}</g>`;
    },
    clock(o) {
      const r = o.r || 40;
      return `<circle cx="${o.x}" cy="${o.y}" r="${r}" fill="#e8ebf1" stroke="#2a2f3b" stroke-width="6"/><line x1="${o.x}" y1="${o.y}" x2="${o.x}" y2="${o.y - r * 0.7}" stroke="#1b202b" stroke-width="4"/><line x1="${o.x}" y1="${o.y}" x2="${o.x + r * 0.45}" y2="${o.y + r * 0.1}" stroke="#1b202b" stroke-width="5"/><line x1="${o.x}" y1="${o.y}" x2="${o.x - r * 0.2}" y2="${o.y - r * 0.75}" stroke="#e5484d" stroke-width="2"/>`;
    },
    table(o) { // 카페 원형/사각 테이블
      const { x, y, w } = o;
      return `<ellipse cx="${x + w / 2}" cy="${y}" rx="${w / 2}" ry="${w * 0.14}" fill="${o.color || '#6b4a32'}"/><ellipse cx="${x + w / 2}" cy="${y - 4}" rx="${w / 2}" ry="${w * 0.14}" fill="${o.top || '#8a6244'}"/>` + rect(x + w / 2 - 10, y + 6, 20, o.h || 180, '#2a2f3b', { rx: 3 }) + `<ellipse cx="${x + w / 2}" cy="${y + (o.h || 180) + 6}" rx="${w * 0.22}" ry="12" fill="#1b1f27"/>`;
    },
    cup(o) { return `<path d="M${o.x} ${o.y} h50 l-6 60 h-38 z" fill="${o.color || '#efe9da'}"/>` + rect(o.x + 4, o.y + 18, 42, 20, o.sleeve || '#9b6b43', { rx: 2 }); },
    phone(o) {
      return `<g transform="rotate(${o.r || -8} ${o.x + 30} ${o.y + 50})">${rect(o.x, o.y, 60, 104, '#0b0d12', { rx: 10 })}${rect(o.x + 5, o.y + 8, 50, 86, o.on ? '#0c2a1c' : '#111', { rx: 6 })}${o.on ? txt(o.x + 30, o.y + 54, 'xlsx', { fill: '#5dff9e', size: 12 }) : ''}</g>` + (o.on ? glow(o.x, o.y, 60, 104, '#21a366', 0.3) : '');
    },
    envelope(o) {
      const w = o.w || 120, h = o.h || 76;
      return `<g transform="rotate(${o.r || 0} ${o.x + w / 2} ${o.y + h / 2})">${rect(o.x, o.y, w, h, o.color || '#a3262a', { rx: 3 })}<polyline points="${o.x},${o.y} ${o.x + w / 2},${o.y + h * 0.55} ${o.x + w},${o.y}" fill="none" stroke="#000" stroke-opacity=".3" stroke-width="3"/>${o.label ? txt(o.x + w / 2, o.y + h - 12, o.label, { fill: '#f4d9a0', size: 14, weight: 600 }) : ''}</g>`;
    },
    box(o) {
      const { x, y, w, h } = o;
      return rect(x, y, w, h, o.color || '#a58a64', { rx: 3 }) + rect(x, y, w, 14, '#000', { rx: 3, op: 0.15 }) + (o.label ? rect(x + w / 2 - 40, y + h / 2 - 14, 80, 28, '#efe9da', { rx: 2 }) + txt(x + w / 2, y + h / 2 + 6, o.label, { fill: '#2a2620', size: 14, weight: 600 }) : '') + (o.seal ? rect(x + w / 2 - 8, y, 16, h, '#c0392b', { rx: 0, op: 0.85 }) : '');
    },
    counter(o) {
      const { x, y, w, h } = o;
      return rect(x, y, w, 20, o.top || '#3a2c22', { rx: 4 }) + rect(x + 10, y + 20, w - 20, h - 20, o.color || '#241c16', { rx: 2 });
    },
    plant(o) { return rect(o.x, o.y + 60, 50, 50, '#3a3f4b', { rx: 4 }) + `<ellipse cx="${o.x + 25}" cy="${o.y + 30}" rx="40" ry="44" fill="#1f3a2a"/><ellipse cx="${o.x + 10}" cy="${o.y + 10}" rx="20" ry="30" fill="#24452f"/>`; },
    chair(o) { return rect(o.x, o.y, 70, 80, o.color || '#2a2f3b', { rx: 10 }) + rect(o.x - 5, o.y + 70, 80, 16, o.color || '#2a2f3b', { rx: 6 }) + rect(o.x + 30, o.y + 86, 10, 50, '#14161c', { rx: 2 }); },
    sofa(o) { return rect(o.x, o.y, o.w, 70, o.color || '#3b2f4a', { rx: 16 }) + rect(o.x - 10, o.y + 40, o.w + 20, 60, o.color || '#3b2f4a', { rx: 16 }) + rect(o.x + 10, o.y + 100, 14, 20, '#111', {}) + rect(o.x + o.w - 24, o.y + 100, 14, 20, '#111', {}); },
    pipe(o) { return rect(o.x, o.y, o.w, o.h, o.color || '#3a4252', { rx: Math.min(o.w, o.h) / 2 }); },
    lightbox(o) { const { x, y, w, h } = o; return rect(x, y, w, h, '#2a2f3b', { rx: 6 }) + rect(x + 10, y + 10, w - 20, h - 20, '#f6f4ea', { rx: 3 }) + glow(x, y, w, h, '#fffbe6', 0.25); },
    console(o) { const { x, y, w, h } = o; return `<polygon points="${x},${y + h} ${x + 20},${y} ${x + w - 20},${y} ${x + w},${y + h}" fill="#20252f"/>` + rect(x + 30, y + 10, w - 60, h * 0.35, '#071410', { rx: 3 }) + glow(x + 30, y + 10, w - 60, h * 0.35, '#3dff8a', 0.2) + Array.from({ length: 10 }, (_, i) => `<circle cx="${x + 50 + i * (w - 100) / 9}" cy="${y + h * 0.7}" r="5" fill="${i % 3 ? '#f5b14c' : '#e5484d'}"/>`).join(''); },
    sign(o) { return rect(o.x, o.y, o.w || 160, 34, o.bg || '#e8ebf1', { rx: 4 }) + txt(o.x + (o.w || 160) / 2, o.y + 23, o.text, { fill: o.fill || '#1b202b', size: 15, mono: false, weight: 700 }); },
    text(o) { return txt(o.x, o.y, o.text, { fill: o.fill, size: o.size, anchor: o.anchor, mono: o.mono, weight: o.weight }); },
    shape(o) { return rect(o.x, o.y, o.w, o.h, o.fill || '#3a4252', { rx: o.rx ?? 6, stroke: o.stroke, op: o.op }); },
    glowSpot(o) { return glow(o.x, o.y, o.w, o.h, o.color || '#f5b14c', o.op ?? 0.3); },
    vault(o) { const { x, y, w, h } = o; return rect(x, y, w, h, '#4a5160', { rx: 8, stroke: '#2a2f3b', sw: 4 }) + `<circle cx="${x + w / 2}" cy="${y + h / 2}" r="${Math.min(w, h) * 0.22}" fill="#2a2f3b" stroke="#9aa3b5" stroke-width="4"/>` + [0, 60, 120].map((a) => `<line x1="${x + w / 2}" y1="${y + h / 2}" x2="${x + w / 2 + Math.cos(a * Math.PI / 180) * Math.min(w, h) * 0.3}" y2="${y + h / 2 + Math.sin(a * Math.PI / 180) * Math.min(w, h) * 0.3}" stroke="#9aa3b5" stroke-width="5"/>`).join('') + (o.label ? txt(x + w / 2, y + 28, o.label, { fill: '#e8ebf1', size: 15, weight: 600 }) : ''); },
    workbench(o) { const { x, y, w } = o; return rect(x, y, w, 22, '#6b5a44', { rx: 3 }) + rect(x + 10, y + 22, 16, 120, '#2a2f3b') + rect(x + w - 26, y + 22, 16, 120, '#2a2f3b') + rect(x + 30, y + 60, w - 60, 10, '#3a3f4b') + (o.tools ? rect(x + 40, y - 30, 60, 30, '#c0392b', { rx: 3 }) + rect(x + 120, y - 14, 90, 14, '#9aa3b5', { rx: 2 }) : ''); },
  };

  function mulberry(a) { return function () { a |= 0; a = (a + 0x6D2B79F5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }

  const defs = `<defs>
    <filter id="blur" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="28"/></filter>
    <linearGradient id="wallShade" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#000" stop-opacity=".35"/><stop offset=".6" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".25"/></linearGradient>
    <linearGradient id="floorShade" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#000" stop-opacity=".1"/><stop offset="1" stop-color="#000" stop-opacity=".55"/></linearGradient>
    <linearGradient id="dawn" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#ff9a5b"/><stop offset=".6" stop-color="#5b6bff" stop-opacity=".3"/><stop offset="1" stop-color="#0b1424" stop-opacity="0"/></linearGradient>
    <radialGradient id="torch" cx="50%" cy="55%" r="65%"><stop offset="0" stop-color="#000" stop-opacity="0"/><stop offset=".55" stop-color="#000" stop-opacity=".35"/><stop offset="1" stop-color="#000" stop-opacity=".9"/></radialGradient>
  </defs>`;

  function render(art, mood = {}) {
    let body = '';
    for (const prop of art) {
      if (prop.when === false) continue;
      const fn = P[prop.t];
      body += fn ? fn(prop) : '';
    }
    let overlay = '';
    if (mood.dark) overlay += `<rect width="1600" height="900" fill="#000" opacity="${(mood.dark * 0.7).toFixed(2)}"/>`;
    if (mood.vignette !== false) overlay += `<rect width="1600" height="900" fill="url(#torch)" opacity="${((mood.vignette ?? 0.6) * 0.75).toFixed(2)}"/>`;
    if (mood.tint) overlay += `<rect width="1600" height="900" fill="${mood.tint}" opacity=".12" style="mix-blend-mode:screen"/>`;
    return `<svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">${defs}${body}${overlay}</svg>`;
  }

  window.MOArt = { render };
})();
