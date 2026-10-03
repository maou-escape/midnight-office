/* Midnight Office · 자동 플레이 테스트
   모든 막을 실제 화면 버튼으로 처음부터 엔딩까지 진행해 정답이 통과되는지 확인한다.
   사용: python3 -m http.server 8766 (다른 터미널) → node tools/playtest.js [주소] */
let playwright;
try { playwright = require('playwright'); } catch (e) { playwright = require('/opt/node22/lib/node_modules/playwright'); }

const URL = process.argv[2] || 'http://localhost:8766/';
const SHOTS = process.env.SHOTS; // 폴더를 주면 각 막 엔딩 화면을 저장

(async () => {
  const browser = await playwright.chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
  page.setDefaultTimeout(4000);
  const errors = [];
  page.on('pageerror', (e) => errors.push(e.message));
  page.on('console', (m) => { if (m.type() === 'error' && !/Failed to load resource/.test(m.text())) errors.push(m.text()); });
  await page.goto(URL);
  const WORK = !!process.env.WORK; // 업무 모드(엑셀 화면)로 진행
  await page.evaluate(([mute, work]) => { localStorage.clear(); if (mute || work) localStorage.setItem('midnight-office-v2', JSON.stringify({ v: 2, settings: { bgm: mute ? 0 : 0.6, sfx: mute ? 0 : 0.6, work } })); }, [!!process.env.MUTE, WORK]);
  await page.reload();

  const wait = (ms) => page.waitForTimeout(ms);
  const modalOpen = () => page.evaluate(() => !document.querySelector('#modal').classList.contains('hidden'));
  async function closeLook() {
    await wait(80);
    if (!(await modalOpen())) return;
    const btn = await page.$('#lookBtns button');
    if (btn) await btn.click(); else await page.click('#modalClose');
    await wait(60);
  }
  async function spot(id) {
    if (process.env.TRACE) console.log("spot", id);
    const el = await page.$(WORK ? `#sheet tr[data-spot="${id}"]` : `.spot[data-spot="${id}"]`);
    if (!el) throw new Error(`조사 지점 없음: ${id} (방: ${await page.textContent('#roomName')})`);
    await el.click();
    await wait(60);
  }
  async function go(room) {
    const el = await page.$(WORK ? `#sheet tr[data-to="${room}"]` : `#roomNav [data-to="${room}"]`);
    if (!el) throw new Error(`이동 버튼 없음: ${room}`);
    await el.click();
    await wait(60);
  }
  async function hold(item) {
    await page.click(WORK ? `#sheet tr[data-item="${item}"]` : `#inventory [data-item="${item}"]`);
    await page.click('#lookBtns button:has-text("들고 쓰기")');
    await wait(40);
  }
  async function use(item, spotId) { await hold(item); await spot(spotId); }
  async function combine(a, b) { await hold(a); await page.click(WORK ? `#sheet tr[data-item="${b}"]` : `#inventory [data-item="${b}"]`); await wait(60); }
  async function action(item, label) { await page.click(WORK ? `#sheet tr[data-item="${item}"]` : `#inventory [data-item="${item}"]`); await page.click(`#lookBtns button:has-text("${label}")`); await wait(60); }

  /* ---- 장치별 풀이 ---- */
  const S = {
    async keypad(code) { for (const c of code) await page.click(`#pzRoot [data-k="${c}"]`); await page.click('#pzRoot [data-k="확인"]'); },
    async dial(values) {
      for (let i = 0; i < values.length; i++) {
        for (let n = 0; n < 80; n++) {
          const face = await page.$$eval('#pzRoot .dial .face', (els, i) => els[i].textContent, i);
          if (face === String(values[i])) break;
          await page.click(`#pzRoot [data-d="${i}"][data-s="1"]`);
        }
      }
      await page.click('#dialOk');
    },
    async phrase(words) {
      for (const w of words) {
        const ok = await page.evaluate((w) => { const b = [...document.querySelectorAll('#pzRoot [data-add]')].find((x) => !x.disabled && x.textContent === w); if (b) { b.click(); return true; } return false; }, w);
        if (!ok) throw new Error('단어 조각 없음: ' + w);
      }
      await page.click('#phOk');
    },
    async choice(v) { await page.click(`#pzRoot [data-v="${v}"]`); await page.click('#chOk'); },
    async checks(vs) { for (const v of vs) await page.click(`#pzRoot [data-v="${v}"]`); await page.click('#ckOk'); },
    async circuit(target) {
      for (const [i, want] of Object.entries(target)) {
        for (let n = 0; n < 4; n++) {
          const r = await page.$eval(`#pzRoot [data-t="${i}"] svg`, (s) => parseInt(s.style.transform.match(/-?\d+/)[0], 10));
          if ([].concat(want).includes(r)) break;
          await page.click(`#pzRoot [data-t="${i}"]`);
        }
      }
      await page.click('#cOk');
    },
    async maze(moves) { for (const m of moves) await page.click(`#pzRoot [data-m="${m}"]`); },
    async balance(L, R) {
      const clickSeal = (id) => page.evaluate((id) => [...document.querySelectorAll('#pzRoot .pool [data-s]')].find((b) => b.dataset.s === id).click(), id);
      for (const id of L) await clickSeal(id);
      for (const id of R) await clickSeal(id);
      await page.click('#bOk');
    },
    async fragments(texts) {
      const read = () => page.$$eval('#pzRoot .frag', (els) => els.map((e) => ({ t: e.querySelector('.fx').textContent, r: parseInt((e.querySelector('.fx').style.transform.match(/-?\d+/) || ['0'])[0], 10) })));
      for (let i = 0; i < texts.length; i++) {
        let cur = (await read()).findIndex((p) => p.t === texts[i]);
        if (cur < 0) throw new Error('조각 없음: ' + texts[i]);
        if (cur !== i) {
          await page.click(`#pzRoot [data-pos="${cur}"]`);
          while (cur > i) { await page.click('#pzRoot [data-a="left"]'); cur--; }
          await page.click(`#pzRoot [data-pos="${i}"]`);
        }
      }
      const now = await read();
      for (let i = 0; i < now.length; i++) {
        let r = now[i].r;
        if (r % 360 === 0) continue;
        await page.click(`#pzRoot [data-pos="${i}"]`);
        while (r % 360 !== 0) { await page.click('#pzRoot [data-a="rot"]'); r += 90; }
        await page.click(`#pzRoot [data-pos="${i}"]`);
      }
      await page.click('#pzRoot [data-a="ok"]');
    },
    async grille(x, y) {
      for (let n = 0; n < 4; n++) { const t = await page.textContent('#pzRoot .note'); if (/판 회전 0°/.test(t)) break; await page.click('#pzRoot [data-g="rr"]'); }
      for (let n = 0; n < 8; n++) { await page.click('#pzRoot [data-g="W"]'); await page.click('#pzRoot [data-g="N"]'); }
      for (let n = 0; n < x; n++) await page.click('#pzRoot [data-g="E"]');
      for (let n = 0; n < y; n++) await page.click('#pzRoot [data-g="S"]');
      await page.click('#gOk');
    },
    async layers() {
      const read = () => page.$$eval('#pzRoot .layer-row span', (els) => els.map((e) => e.textContent.match(/-?\d+/g).map(Number)));
      const base = (await read())[0];
      for (let i = 1; i < 3; i++) {
        for (let n = 0; n < 40; n++) {
          const v = (await read())[i];
          if (v[0] < base[0]) await page.click(`#pzRoot [data-l="${i}"][data-a="E"]`);
          else if (v[0] > base[0]) await page.click(`#pzRoot [data-l="${i}"][data-a="W"]`);
          else if (v[1] < base[1]) await page.click(`#pzRoot [data-l="${i}"][data-a="S"]`);
          else if (v[1] > base[1]) await page.click(`#pzRoot [data-l="${i}"][data-a="N"]`);
          else if (v[2] !== base[2]) await page.click(`#pzRoot [data-l="${i}"][data-a="R"]`);
          else break;
        }
      }
      await page.click('#lyOk');
    },
    async accuse(fields, evs) {
      for (const [k, v] of Object.entries(fields)) await page.selectOption(`#pzRoot select[data-f="${k}"]`, v);
      for (const e of evs) await page.click(`#pzRoot [data-e="${e}"]`);
      await page.click('#acOk');
    },
    async board(ids) {
      for (let i = 0; i < ids.length; i++) {
        await page.click(`#pzRoot [data-ci="${i}"]`);
        await page.click(`#pzRoot [data-p="${ids[i]}-o"]`);
        await page.click(`#pzRoot [data-p="${ids[i]}-t"]`);
        await page.click('#bdOk');
        await wait(40);
      }
    },
    async verify(claim, evs) {
      await page.click(`#pzRoot [data-c="${claim}"]`);
      for (const e of evs) await page.click(`#pzRoot [data-e="${e}"]`);
      await page.click('#vfOk');
    },
    async order(ids) {
      for (let i = 0; i < ids.length; i++) {
        for (let n = 0; n < 10; n++) {
          const cur = await page.$$eval('#pzRoot .order-row', (els) => els.map((e) => e.dataset.row));
          const at = cur.indexOf(ids[i]);
          if (at === i) break;
          await page.click(`#pzRoot [data-up="${at}"]`);
        }
      }
      await page.click('#odOk');
    },
  };
  async function solve(type, ...args) {
    if (process.env.TRACE) console.log('solve', type, JSON.stringify(args));
    await S[type](...args);
    await wait(120);
    const r = await page.evaluate(() => { const el = document.querySelector('#pzFb'); return el ? [el.className, el.textContent] : null; });
    if (r && /bad/.test(r[0]) && r[1]) throw new Error(`${type} 실패: ${r[1]}`);
  }
  const nextStep = () => wait(650);

  async function next(id) {
    await wait(150);
    const html = await page.innerHTML('#modalBody');
    if (SHOTS) await page.screenshot({ path: `${SHOTS}/${id}-end.png` });
    if (/CASE CLOSED/.test(html)) { await page.click('#lookBtns button'); console.log(`✓ ${id} · 결말`); return; }
    if (!/<h3>/.test(html) || !(await page.$('#lookBtns button'))) throw new Error(`${id}: 장면 전환 화면이 나오지 않음`);
    await page.click('#lookBtns button'); // 다음 장면으로
    await wait(150);
    await closeLook(); // 다음 장면 도입부
    console.log(`✓ ${id}`);
  }

  const plays = {
    async e1a1() {
      await spot('exitDoor'); await closeLook();
      await spot('drawer'); await solve('keypad', '0426'); await closeLook();
      await go('copy'); await spot('printer'); await closeLook();
      await go('pantry'); await spot('fridge'); await closeLook();
      await go('hall'); await use('hexkey', 'panel'); await solve('dial', ['B', '08']); await closeLook();
      await spot('panel'); await closeLook();
      await spot('serverPadSpot'); await solve('keypad', '14399'); await closeLook();
      await spot('serverDoor');
      await spot('kcard'); await closeLook(); await spot('console'); await closeLook();
      await spot('board'); await solve('verify', 'plan', ['E1-05', 'E1-04']);
    },
    async e1a2() {
      await spot('roster'); await closeLook();
      await spot('doorphone'); await solve('keypad', '731'); await closeLook();
      await spot('archiveDoor'); await spot('retiree'); await closeLook(); await spot('cctvFile'); await closeLook();
      await go('lobby'); await go('pantry'); await spot('patrol'); await closeLook();
      await go('facility'); await use('film', 'lightMap'); await solve('keypad', '2408'); await closeLook();
      await go('lobby'); await spot('secPadSpot'); await solve('keypad', '2408'); await closeLook();
      await spot('secDoor');
      await spot('monitors'); await closeLook();
      await spot('kCheck'); await solve('verify', 'clone', ['E1-06', 'E2-04']); await closeLook();
      await spot('meCheck'); await solve('dial', ['00', '0', '2']); await closeLook();
      await spot('timeCheck'); await solve('choice', 'retro'); await closeLook();
      await spot('board2'); await solve('verify', 'manip', ['E2-05', 'E2-06']);
    },
    async e1a3() {
      await spot('fpanel'); await solve('keypad', '318'); await closeLook();
      await go('storage'); await spot('r17'); await closeLook();
      await go('issuer'); await use('guestCard', 'uv'); await solve('keypad', '6117'); await closeLook();
      await go('storage'); await go('network'); await spot('switch'); await solve('keypad', '31704'); await closeLook();
      await go('storage'); await go('repair'); await spot('secretDrawer'); await solve('dial', ['R', '17']); await closeLook();
      await action('player', '재생 버튼 누르기'); await closeLook();
      await go('storage'); await spot('vault'); await solve('choice', 'MIRROR'); await closeLook();
      await spot('exportDesk'); await solve('verify', 'lure', ['E3-06', 'E1-05']);
    },
    async e1a4() {
      await spot('door-alarm'); await spot('alarmBox'); await solve('dial', ['02', '13']); await closeLook(); await go('hub');
      await spot('door-video'); await spot('videoConsole'); await solve('choice', 'MIRROR'); await closeLook(); await go('hub');
      await spot('door-personnel'); await spot('carbon'); await solve('choice', 'standby'); await closeLook(); await go('hub');
      await spot('door-ledger'); await spot('voucherSafe'); await solve('dial', ['C', '17']); await closeLook(); await go('hub');
      await spot('door-comms'); await spot('tape'); await solve('dial', ['02', '13']); await closeLook(); await go('hub');
      await spot('verdict'); await solve('order', ['fire', 'call', 'manual', 'erase', 'money', 'yoon']);
    },
    async e1a5() {
      await spot('authScreen'); await solve('keypad', '4341'); await closeLook();
      await spot('controlDoor');
      await spot('official'); await closeLook();
      await spot('kv'); await solve('verify', 'k2', ['E3-04', 'E3-03']); await closeLook();
      await spot('yv'); await solve('verify', 'y2', ['E3-05', 'E4-03']); await closeLook();
      await spot('cv'); await solve('verify', 'c3', ['E2-06', 'E3-03']); await closeLook();
      await spot('invoice'); await closeLook();
      await spot('iv'); await solve('verify', 'm2', ['E4-04', 'E5-05']); await closeLook();
      await spot('pack'); await solve('checks', ['audit', 'press']); await closeLook();
      await go('elevator'); await spot('exitConsole'); await solve('choice', 'leave');
    },
    async e2a1() {
      await spot('cupSpot'); await closeLook(); await spot('env1'); await closeLook();
      await go('counter'); await spot('lost'); await closeLook(); await spot('kiosk'); await closeLook();
      await go('table');
      await combine('phone', 'reader'); await solve('circuit', { 0: 90, 1: [0, 180], 2: 180, 3: 270, 5: 0 }); await closeLook();
      await combine('sleeve', 'letter'); await solve('grille', 2, 1); await closeLook();
      await action('phone', '파일 열기'); await solve('phrase', ['인', '수', '인', '계']); await closeLook();
      await spot('env2'); await solve('maze', ['N', 'E', 'N', 'S', 'E', 'N']); await closeLook();
      await spot('mysteryBox'); await solve('accuse', { author: 'choi', method: 'owner', motive: 'warn' }, ['E-03', 'E-04', 'E-05', 'E-06']); await closeLook();
      await spot('env3'); await solve('balance', ['rm', 'voice', 'seal'], ['owner', 'hero', 'mirror']); await closeLook();
      await spot('keyBox'); await solve('fragments', ['START ─ ◆', '◆ ─ ○', '○ ─ ▲', '▲ ─ ■ END']); await nextStep(); await solve('keypad', '3071');
    },
    async e2a2() {
      await spot('chrono'); await closeLook(); await spot('transfer'); await closeLook();
      await go('storage'); await spot('rackmap'); await closeLook();
      await spot('rRow'); await solve('dial', ['R', '04']); await nextStep(); await solve('fragments', ['START · ▲', '▲ R ●', '● 0 ■', '■ 4 END']); await closeLook();
      await go('lightroom');
      await spot('caseBoard'); await solve('board', ['A', 'B', 'C', 'D', 'E', 'F', 'G']); await closeLook();
      await spot('ruleBoard'); await solve('checks', ['exit', 'audit', 'leave', 'isolated']); await nextStep(); await solve('phrase', ['즉시', '소명', '불가']); await closeLook();
      await spot('lightbox'); await solve('layers'); await nextStep(); await solve('phrase', ['04', '26']); await nextStep(); await solve('choice', 'hire'); await closeLook();
      await spot('branchPad'); await solve('keypad', '4268');
    },
  };

  let failed = 0;
  try {
    await page.click('#tNew'); await wait(150); await closeLook();
    for (const [id, play] of Object.entries(plays)) { await play(); await next(id); }
    const title = await page.isVisible('#title');
    if (!title) throw new Error('결말 뒤 타이틀로 돌아가지 않음');
  } catch (e) {
    failed++;
    console.log(`✗ ${e.message}`);
    if (SHOTS) await page.screenshot({ path: `${SHOTS}/fail.png` });
  }
  if (errors.length) { console.log('브라우저 오류:\n' + [...new Set(errors)].join('\n')); failed++; }
  console.log(failed ? `실패 ${failed}건` : '처음부터 결말까지 통과');
  await browser.close();
  process.exit(failed ? 1 : 0);
})();
