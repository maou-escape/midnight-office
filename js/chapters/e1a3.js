/* 장면 3 · 01:47 지하 1층 폐기 서버 구역 — 복제 */
MO.part({
  id: 'e1a3', ep: 1, time: '01:47', place: '지하 1층 폐기 서버 구역', title: '복제',
  bgm: 'assets/audio/ep1-act3.mp3',
  intro: `
    <p class="note">복제 카드는 누가, 어떤 권한으로 만들었는가. 요청한 사람과 승인한 주체를 따로 밝혀야 한다.</p>
    <p>화물 엘리베이터 문이 열리자 차가운 먼지 냄새가 올라온다. 지하 1층은 폐기 대기 서버가 모이는 곳이다.</p>
    <p>엘리베이터 통제판이 붉게 깜빡인다. <span class="say">“B1 하역 완료 서버의 운송사 코드를 입력하십시오.”</span> 창고 셔터는 그 코드 없이는 올라가지 않는다.</p>
    <p class="note">K의 말을 기억하자. 서로 독립된 두 기록이 같은 말을 할 때만 사실로 적는다.</p>`,
  start: 'freight',

  items: {
    guestCard: { name: '무기명 카드', icon: '💳', desc: '<p>이름 칸이 비어 있는 사원증. 손전등을 비스듬히 비추자 보안선 일부가 반짝인다. 내 카드와 K 카드의 무늬가 섞여 있는 것 같다.</p><p class="note">UV 검사기에 올려 보면 더 잘 보일 것이다.</p>' },
    player: { name: '소형 음성 재생기', icon: '📼', desc: '<p>K의 이름표가 붙은 재생기. 화면에 문구가 떠 있다.</p><div class="screen-text">발급 기록 · 승인 경로 · 보관 명세\n세 가지를 확인한 사람에게만 재생</div>',
      action: { label: '재생 버튼 누르기', run: (g) => {
        if (!g.hadAll(['E3-03', 'E3-04', 'E3-05'])) return { title: '소형 음성 재생기', html: `<p>재생기가 짧게 삑 소리를 낸다. 화면에 확인된 항목 수가 뜬다: <b class="mono">${g.count(['E3-03', 'E3-04', 'E3-05'])}/3</b></p><p class="note">발급 감사 로그, 네트워크 승인 경로, R-17 보관 명세를 모두 확보해야 한다.</p>` };
        if (g.has('E3-06')) return { title: 'K의 녹음', html: '<p>이미 들은 녹음이다. 수첩에 적어 두었다.</p>' };
        return { title: 'K의 사전 녹음', give: ['E3-06'], html: '<p>재생기에서 K의 숨 고르는 소리가 먼저 들린다.</p><blockquote>“네 계정을 쓴 건 나야. 원본에 닿을 수 있는 살아 있는 계정이 필요했어. 박 과장이 폐기 목록을 네게 맡기도록 유도했고 정전도 예약했다. 변명하지 않겠다.”</blockquote><blockquote>“하지만 카드 발급을 승인한 주체는 내가 만든 MIRROR다. 그 시스템이 누구의 지시로 무엇을 했는지 원본으로 확인해. 내 말만 믿으면 또 같은 실수를 하는 거야.”</blockquote><p>고백은 중요한 단서지만 그 자체가 최종 증거는 아니다.</p>' };
      } } },
    'E3-01': { ev: true, code: 'E3-01', name: 'SENTINEL 운송 원장', desc: '<div class="paper">SENTINEL 원본 서버 · 봉인 SN-31B-017\n반입: 서버 A / 운송사 318\n보관 위치: <b>R-17</b>\n상태: 폐기 보류 / 감사 원본</div>' },
    'E3-03': { ev: true, code: 'E3-03', name: '카드 발급 감사 로그', desc: '<div class="paper">카드 일련번호: GUEST-9042\n표시 사원번호: 19-0426-071 / K-001\n승인: <b>MIRROR-SVC</b>\n작업 단말: K-DEV-04\n발급 시각: 23:32</div><p class="note">작업 단말은 K의 것이지만 최종 승인은 사람이 아닌 서비스 계정이다.</p>' },
    'E3-04': { ev: true, code: 'E3-04', name: 'MIRROR 접속 흔적', desc: '<div class="screen-text">K-DEV-04 → MIRROR-GW → MIRROR-SVC\n요청자 입력: K\n권한 승인: MIRROR-SVC 자동 정책\n정책 작성자: K / 변경 승인자: 박 과장</div><p class="note">자동 계정이라는 말이 사람의 책임을 없애지는 않는다.</p>' },
    'E3-05': { ev: true, code: 'E3-05', name: 'R-17 보관 명세', desc: '<div class="paper">R-17 / SENTINEL ORIGINAL\n쓰기 금지 봉인: 정상\n반출 권한: 내부감사 윤서진 또는 <b>감사 보류 계정</b></div><p class="note">누군가 원본 접근 자격을 내 번호에 임시로 붙였다.</p>' },
    'E3-06': { ev: true, code: 'E3-06', name: 'K 사전 녹음', desc: '<p>K가 내 계정 도용과 야근·정전 유도를 인정하되, MIRROR 승인 기록을 원본으로 검증하라고 남긴 음성.</p>' },
    'E3-07': { ev: true, code: 'E3-07', name: '원본 저장장치', desc: '<p>금속 케이스에 든 WORM 저장장치. 윤서진의 필체로 “성운물류센터 2018-11-03 / 수정 전”이라고 적혀 있다.</p>' },
  },

  rooms: {
    freight: {
      name: '지하 1층 · 화물 엘리베이터',
      mood: { dark: 0.3, vignette: 0.85 },
      exits: [{ to: 'storage', label: '폐기 서버 창고', need: (g) => g.solved('freightCode'), locked: '<p>창고 셔터가 내려와 있다. 엘리베이터 통제판에 운송사 코드를 넣어야 올라간다.</p>' }],
      art: (g) => [
        { t: 'room', wall: '#2a2a2a', floor: '#161616', tiles: true },
        { t: 'emergency', x: 760, y: 40 },
        { t: 'elevator', x: 520, y: 220, w: 420, h: 420, floor: 'B1', open: true },
        { t: 'panel', x: 1010, y: 300, w: 130, h: 200, color: '#3a3f4b', lamp: g.solved('freightCode') ? '#3dff8a' : '#ff4848', spot: { id: 'fpanel', label: '화물 통제판', puzzle: 'freightCode', after: '<p>셔터가 올라가 있다. 창고로 들어갈 수 있다.</p>' } },
        { t: 'board', x: 100, y: 200, w: 320, h: 260, cork: true, pins: 3, spot: { id: 'guardLog', label: '경비실 반입 기록', look: '<p>경비실 반입 기록과 보정표가 붙어 있다.</p><table><tr><th>경비실 시각</th><th>화물</th><th>무게</th><th>운송사</th></tr><tr><td>23:12</td><td>서버 A</td><td>480kg</td><td>318</td></tr><tr><td>23:18</td><td>문서</td><td>120kg</td><td>552</td></tr><tr><td>23:27</td><td>서버 B</td><td>480kg</td><td>604</td></tr><tr><td>23:37</td><td>보존함</td><td>260kg</td><td>731</td></tr></table><div class="paper">보정표: 경비실 시계는 승강기보다 정확히 <b>4분 느림</b></div>' } },
        { t: 'monitor', x: 1220, y: 230, w: 260, h: 170, color: '#ffb36b', bg: '#1a1006', lines: ['ELEVATOR LOG', '23:16 B1 STOP 480→0', '23:22 B2 STOP 120→0', '23:31 B1 PASS 480→480', '23:41 7F STOP 260→0'],
          spot: { id: 'elevLog', label: '승강기 운행 기록', look: '<table><tr><th>승강기 시각</th><th>층</th><th>동작</th><th>적재 무게</th></tr><tr><td>23:16</td><td>B1</td><td>정차</td><td>480 → 0kg</td></tr><tr><td>23:22</td><td>B2</td><td>정차</td><td>120 → 0kg</td></tr><tr><td>23:31</td><td>B1</td><td>통과</td><td>480 → 480kg</td></tr><tr><td>23:41</td><td>7F</td><td>정차</td><td>260 → 0kg</td></tr></table><p class="note">같은 무게만 찾으면 서버 B라는 미끼에 걸린다. 시계 보정과 실제 하역 여부를 함께 봐야 한다.</p>' } },
      ],
    },

    storage: {
      name: '지하 1층 · 폐기 서버 창고',
      mood: { dark: 0.28, vignette: 0.8 },
      exits: [{ to: 'issuer', label: '카드 발급실' }, { to: 'network', label: '네트워크 복원실' }, { to: 'repair', label: '수리 작업대' }, { to: 'freight', label: '화물 엘리베이터' }],
      art: (g) => [
        { t: 'room', wall: '#202428', floor: '#121416', tiles: true },
        { t: 'ceilingLight', x: 300, y: 30, color: '#cfe0ff' }, { t: 'ceilingLight', x: 1080, y: 30, color: '#cfe0ff' },
        { t: 'rack', x: 60, y: 170, w: 150, h: 470, label: 'R-15', leds: '#59606f' }, { t: 'rack', x: 230, y: 170, w: 150, h: 470, label: 'R-16', leds: '#59606f' },
        { t: 'rack', x: 400, y: 170, w: 170, h: 470, label: 'R-17', leds: '#f5b14c',
          spot: { id: 'r17', label: 'R-17 선반', give: ['E3-01', 'guestCard'], look: '<p>SENTINEL 원본 서버의 봉인에는 <b class="mono">SN-31B-017</b>이 찍혀 있다. 클립보드에 운송 원장이 걸려 있다.</p><div class="paper">반입: 서버 A / 운송사 318\n보관 위치: <b>R-17</b>\n상태: 폐기 보류 / 감사 원본</div><p>선반 위에는 이름 없는 사원증 한 장이 놓여 있다. 손전등을 비추자 내 카드와 K 카드의 보안선이 겹쳐 보인다.</p>' } },
        { t: 'rack', x: 590, y: 170, w: 150, h: 470, label: 'R-18', leds: '#59606f' },
        { t: 'vault', x: 820, y: 230, w: 300, h: 300, label: 'R-17 봉인함',
          spot: { id: 'vault', label: 'R-17 봉인함', puzzle: 'approver', need: (g) => g.hadAll(['E3-03', 'E3-04', 'E3-06']),
            locked: (g) => `<p>봉인함은 세 가지를 확인하라고 요구한다. 하나의 시스템 기록만으로는 열 수 없도록 윤서진이 만든 절차다.</p><div class="screen-text">① 카드 발급 기록  ${g.has('E3-03') ? '✓' : '·'}\n② 네트워크 승인 경로  ${g.has('E3-04') ? '✓' : '·'}\n③ 요청자의 진술  ${g.has('E3-06') ? '✓' : '·'}</div>`,
            after: '<p>봉인함은 열려 있다. 원본 저장장치는 챙겼다.</p>' } },
        { t: 'workbench', x: 1180, y: 470, w: 360 },
        { t: 'shape', x: 1220, y: 400, w: 280, h: 70, fill: '#3a3f4b', rx: 6, spot: { id: 'exportDesk', label: '반출 기록대', puzzle: 'intent', need: (g) => g.hadAll(['E3-06', 'E3-07']), locked: '<p>반출 기록대는 원본 저장장치와 요청자 진술을 함께 올려야 결론을 적을 수 있다.</p>' } },
      ],
    },

    issuer: {
      name: '지하 1층 · 카드 발급실',
      mood: { dark: 0.3, vignette: 0.8, tint: '#7b5cff' },
      exits: [{ to: 'storage', label: '창고 중앙' }],
      art: [
        { t: 'room', wall: '#1f1c2a', floor: '#131118' },
        { t: 'printer', x: 520, y: 340, w: 440, h: 300 },
        { t: 'shape', x: 600, y: 280, w: 280, h: 60, fill: '#2a1f4a', rx: 8, spot: { id: 'uv', label: 'UV 검사기', puzzle: 'uv', need: (g) => g.has('guestCard') || g.solved('uv'), locked: '<p>UV 검사기다. 검사할 카드를 올려야 작동한다.</p>', use: { guestCard: { puzzle: 'uv' } }, after: '<p>검사기 서랍은 열려 있고 감열지 원장은 챙겼다.</p>' } },
        { t: 'glowSpot', x: 640, y: 280, w: 200, h: 60, color: '#8a5cff', op: 0.5 },
        { t: 'paper', x: 1100, y: 300, w: 120, h: 160, r: 4, spot: { id: 'uvMemo', label: '정비 메모', pad: 10, look: '<div class="paper">발급기 정비 메모\n불완전한 카드의 흔적은 <b>좌우 순서로 합칠 것</b>.\nK 카드는 발급기 안쪽에 <b>거꾸로</b> 끼워져 있었음.\n→ 그 줄은 좌우를 뒤집은 뒤 같은 칸에 겹칠 것.</div>' } },
        { t: 'cabinet', x: 120, y: 300, w: 220, h: 340, n: 3 },
      ],
    },

    network: {
      name: '지하 1층 · 네트워크 복원실',
      mood: { dark: 0.2, vignette: 0.75, tint: '#3dff8a' },
      exits: [{ to: 'storage', label: '창고 중앙' }],
      art: [
        { t: 'room', wall: '#141c1a', floor: '#0d1110' },
        { t: 'rack', x: 120, y: 160, w: 200, h: 480 }, { t: 'rack', x: 1280, y: 160, w: 200, h: 480 },
        { t: 'panel', x: 480, y: 220, w: 640, h: 200, color: '#20252f', inner: '#14171d', label: 'CORE SWITCH',
          spot: { id: 'switch', label: '코어 스위치', puzzle: 'network', after: '<p>복원된 스위치 로그는 이미 출력해 두었다.</p>' } },
        { t: 'monitor', x: 560, y: 460, w: 480, h: 150, lines: ['성공 접속 순서  R-03 → R-01 → R-07 → R-00 → R-04', '패킷  03 OK / 01 OK / 07 FAIL', '      17 OK / 00 OK / 04 OK'],
          spot: { id: 'netLog', label: '접속표', look: '<div class="screen-text">성공 접속 순서\nR-03 → R-01 → R-07 → R-00 → R-04\n\n패킷 상태\n03 성공 / 01 성공 / 07 실패\n17 성공 / 00 성공 / 04 성공</div><p>메모: 실패한 07은 버리고, 같은 끝자리 7을 가진 <b>성공 랙</b>으로 바꿔 넣는다. 접속 순서는 유지한다.</p>' } },
      ],
    },

    repair: {
      name: '지하 1층 · 수리 작업대',
      mood: { dark: 0.3, vignette: 0.8 },
      exits: [{ to: 'storage', label: '창고 중앙' }],
      art: [
        { t: 'room', wall: '#28231e', floor: '#16130f' },
        { t: 'ceilingLight', x: 650, y: 30, color: '#ffe2b8' },
        { t: 'workbench', x: 360, y: 420, w: 860, tools: true },
        { t: 'shape', x: 760, y: 470, w: 200, h: 70, fill: '#4a505d', rx: 4, spot: { id: 'secretDrawer', label: '비밀 서랍', puzzle: 'rack', after: '<p>서랍은 비어 있다.</p>' } },
        { t: 'paper', x: 480, y: 340, w: 90, h: 70, r: -10, spot: { id: 'labels', label: '라벨 조각', pad: 20, look: '<p>작업대 위에 랙 라벨 조각이 섞여 있다. <b class="mono">SN-31B-017</b>, <b class="mono">R-1?</b>, <b class="mono">Q-0?</b>…</p><p>서랍 메모: “서버 일련번호가 아니라 <b>물리 원본이 놓인 랙</b>을 넣을 것.”</p>' } },
        { t: 'board', x: 1240, y: 160, w: 280, h: 220, cork: true, pins: 3 },
      ],
    },
  },

  puzzles: {
    freightCode: {
      type: 'keypad', len: 3, answer: '318',
      loc: '지하 1층 · 화물 통제판', title: 'B1 하역 서버 운송사',
      prompt: '<p>통제판: “B1 하역 완료 서버의 운송사 코드를 입력하십시오.”</p>',
      wrong: { '604': '서버 B는 무게가 같지만, 그 시각 승강기는 B1을 통과했을 뿐이다.', '552': '문서 화물은 B2에서 내렸다.', '731': '보존함은 7층에서 내렸다.' },
      hints: ['경비실 반입 기록(코르크판)과 승강기 운행 기록(모니터)을 모두 보세요.', '승강기 시각에서 4분을 빼면 경비실 시각입니다. B1에서 480→0kg이 된 정차만 진짜 하역입니다.', '승강기 23:16 → 경비실 23:12 서버 A. 정답은 318입니다.'],
      okText: '<p>덜컹. 창고 셔터가 천천히 올라간다. R-01부터 R-20까지 랙이 드러난다.</p>',
    },
    uv: {
      type: 'keypad', len: 4, answer: '6117',
      loc: '지하 1층 · 카드 발급실', title: 'UV 검사기 · 관리자 서랍',
      prompt: '<p>무기명 카드를 올리자 발급기 기록에서 세 카드의 UV 흔적이 불러와진다. 각 카드에는 네 자리 숫자의 일부만 남아 있다. 관리자 서랍은 네 자리를 요구한다.</p>',
      pre: [{ type: 'overlay', overlayLabel: '세 줄 겹치기', layers: [
        { name: '내 원본', grid: [['6', '.', '.', '.']] },
        { name: 'K 원본', grid: [['.', '1', '.', '.']], flippable: true },
        { name: '무기명 카드', grid: [['.', '1', '.', '7']] },
      ] }],
      wrong: { '6017': '빈칸이 하나 남았다면 어떤 줄이 거꾸로인지 생각해 보자.', '6111': '자리를 다시 확인하자.' },
      failText: '서랍이 열리지 않는다. 정비 메모를 다시 보자.',
      hints: ['벽의 정비 메모를 보세요. K 카드만 거꾸로 끼워져 있었습니다.', 'K 원본 줄을 좌우로 뒤집은 뒤 겹치면 네 칸이 모두 찹니다.', '6 · 1 · 1 · 7, 정답은 6117입니다.'],
      reward: ['E3-03'],
      okText: '<p>서랍에서 감열지 원장을 꺼낸다. 이름 칸은 지워졌지만 승인 계정은 남아 있다.</p><div class="paper">카드 일련번호: GUEST-9042\n표시 사원번호: 19-0426-071 / K-001\n승인: <b>MIRROR-SVC</b>\n작업 단말: K-DEV-04 · 발급 시각: 23:32</div><p>작업 단말은 K의 것이지만 최종 승인은 서비스 계정이다. 둘을 같은 책임으로 뭉뚱그리면 안 된다.</p>',
    },
    network: {
      type: 'keypad', len: 5, answer: '31704',
      loc: '지하 1층 · 네트워크 복원실', title: '복원 네트워크 코드',
      prompt: '<p>스위치 다섯 포트가 깜빡인다. 복원 코드는 접속 순서대로 <b>랙 번호의 끝자리</b>만 이어 쓴 다섯 자리다.</p>',
      wrong: { '31004': '실패한 07을 지운 것 같다. 같은 끝자리를 가진 성공 랙으로 바꿔 넣어야 한다.' },
      hints: ['아래쪽 접속표를 먼저 읽으세요.', '순서는 3, 1, 7, 0, 4입니다. 07은 실패했지만 17은 성공했고 끝자리는 둘 다 7입니다.', '끝자리만 이어 쓴 정답은 31704입니다.'],
      reward: ['E3-04'],
      okText: '<p>복원된 패킷에 발급 승인 요청의 실제 경로가 남아 있다.</p><div class="screen-text">K-DEV-04 → MIRROR-GW → MIRROR-SVC\n요청자 입력: K\n권한 승인: MIRROR-SVC 자동 정책\n정책 작성자: K / 변경 승인자: 박 과장</div><p>K는 시스템을 만들고 요청했다. 박 과장은 정책 변경을 승인했다.</p>',
    },
    rack: {
      type: 'dial', loc: '지하 1층 · 수리 작업대', title: '물리 원본 보관 랙',
      prompt: '<p>서랍 잠금은 영문 한 자와 두 자리 숫자를 요구한다.</p>',
      cols: [{ label: '행', opts: ['Q', 'R', 'S'] }, { label: '번호', opts: Array.from({ length: 20 }, (_, i) => String(i + 1).padStart(2, '0')) }],
      seps: ['-'], answer: ['R', '17'],
      check: (v) => (v[1] === '17' ? '번호는 맞다. 행 문자는?' : v[0] === 'S' ? 'SN-31B-017은 서버 일련번호라서 미끼다.' : '창고에서 본 운송 원장의 보관 위치를 떠올리자.'),
      hints: ['SN-31B-017은 서버 일련번호입니다.', '창고 R-17 선반의 운송 원장(E3-01)에 보관 위치가 적혀 있습니다.', '정답은 R-17입니다.'],
      reward: ['E3-05', 'player'],
      okText: '<p>서랍에는 WORM 보관 명세와 소형 음성 재생기가 있다.</p><div class="paper">R-17 / SENTINEL ORIGINAL\n쓰기 금지 봉인: 정상\n반출 권한: 내부감사 윤서진 또는 <b>감사 보류 계정</b></div><p>내 계정이 왜 감사 보류로 바뀌었는지 연결된다. 누군가 원본 접근 자격을 내 번호에 임시로 붙였다.</p><p class="note">재생기는 소지품에서 눌러 재생할 수 있다.</p>',
    },
    approver: {
      type: 'choice', loc: '지하 1층 · R-17 봉인 검증', title: '복제 카드 최종 승인 주체',
      prompt: '<p>발급 원장은 서비스 계정을, 네트워크 로그는 같은 서비스의 자동 정책을, K의 녹음은 자신이 만든 시스템을 지목한다.</p><p>질문은 “누가 요청했나”가 아니라 <b>“복제 카드에 최종 권한을 준 승인 주체가 무엇인가”</b>이다.</p>',
      options: [
        { v: 'K', label: 'K', sub: '작업 단말 K-DEV-04의 주인', why: 'K는 요청자다. 최종 승인 칸에는 사람이 없었다.' },
        { v: 'park', label: '박 과장', sub: '정책 변경 승인자', why: '박 과장은 정책 변경을 승인했지만, 카드 발급 승인 계정은 따로 있다.' },
        { v: 'MIRROR', label: 'MIRROR', sub: 'MIRROR-GW · MIRROR-SVC' },
        { v: 'SENTINEL', label: 'SENTINEL', sub: '원본 아카이브 서버', why: 'SENTINEL은 보호 대상이었다.' },
        { v: 'GUEST', label: 'GUEST-9042', sub: '무기명 카드 일련번호', why: '그건 만들어진 카드 자체다.' },
      ],
      answer: 'MIRROR',
      hints: ['사람 이름이나 K는 정답이 아닙니다.', '발급 로그의 승인 계정과 네트워크 게이트웨이 이름을 비교하세요.', '정답은 MIRROR입니다.'],
      reward: ['E3-07'],
      okText: '<p>봉인함 안에는 금속 케이스에 든 WORM 저장장치가 있다. 라벨에는 윤서진의 필체로 “성운물류센터 2018-11-03 / 수정 전”.</p><p>케이스 안쪽에는 K가 남긴 마지막 문장도 있다.</p><blockquote>너를 원본으로 데려온 것은 우연이 아니다. 그렇다고 원본의 내용까지 내가 만든 것은 아니다.</blockquote>',
    },
    intent: {
      type: 'verify', loc: '지하 1층 · 반출 기록대', title: '세 번째 결론 · K는 무엇을 했나',
      prompt: '<p>반출 기록대에 원본 저장장치를 올리자, 반출 사유를 적는 칸이 뜬다. 이 밤에 내가 여기까지 온 이유를 정확히 적어야 한다.</p>',
      claims: [
        { v: 'chance', label: '나는 우연히 사건을 발견했다', why: '정전은 전날 예약됐고, 야근 지시도 미리 내려졌다. 우연이 아니다.' },
        { v: 'lure', label: 'K가 나를 의도적으로 원본까지 이끌었다' },
        { v: 'all', label: 'K가 이 모든 일의 주범이다', why: 'K는 MIRROR를 만들고 내 계정을 썼다. 하지만 카드는 자동 정책이 승인했고 그 정책 변경은 박 과장이 승인했다. 한 사람에게 모든 책임을 몰면 회사가 하는 일과 다를 바 없다.' },
      ],
      answer: 'lure',
      pairs: [['E3-06', 'E1-05'], ['E3-06', 'E3-05'], ['E1-05', 'E3-05']],
      notes: { 'E3-07': '저장장치는 원본이 보존됐다는 사실을 말할 뿐, 내가 왜 여기 있는지는 말하지 않는다.', 'E3-03': '발급 원장은 카드 승인에 관한 기록이다.' },
      hints: ['K의 녹음(E3-06)은 진술입니다. 진술과 같은 말을 하는, 진술과 무관한 물리 기록이 하나 더 필요합니다.', '8층 배전반의 정전 예약표(E1-05)는 K 단말에서 전날 예약됐다는 물리 라벨입니다. R-17 명세(E3-05)는 내 번호에 원본 반출 권한이 붙어 있었다는 기록입니다.', '결론은 “K가 의도적으로 이끌었다”, 증거는 E3-06 + E1-05입니다.'],
      finish: true,
    },
  },

  objectives: [
    { text: '화물 통제판에 운송사 코드 넣기', done: (g) => g.solved('freightCode'), hint: ['경비실 반입 기록과 승강기 운행 기록을 비교하세요.', '시계 차이 4분을 보정하고, B1에서 실제로 무게가 0이 된 화물을 찾으세요.'] },
    { text: '창고 R-17 선반 조사하기', done: (g) => g.has('E3-01'), hint: ['노란 불이 깜빡이는 R-17 랙을 누르세요.'] },
    { text: '발급 기록·승인 경로·보관 명세 확보하기', done: (g) => g.hadAll(['E3-03', 'E3-04', 'E3-05']), hint: ['카드 발급실(무기명 카드를 UV 검사기에), 네트워크 복원실, 수리 작업대를 차례로 조사하세요.'] },
    { text: '음성 재생기로 K의 녹음 듣기', done: (g) => g.has('E3-06'), hint: ['소지품의 음성 재생기를 누르고 “재생 버튼 누르기”를 고르세요.'] },
    { text: 'R-17 봉인함 열기', done: (g) => g.solved('approver'), hint: ['창고의 R-17 봉인함에서 최종 승인 주체를 고르세요.'] },
    { text: '반출 기록대에서 세 번째 결론 적기', done: (g) => g.solved('intent'), hint: ['창고 오른쪽 작업대 위 반출 기록대를 누르세요.', 'K의 고백만으로는 사실이 되지 않습니다. 앞서 8층에서 모은 기록도 증거 파일에 남아 있습니다.'] },
  ],

  ending: {
    title: '의도적 유도',
    seal: '9042',
    html: '<p>WORM 케이스를 꽂자 4층 감사 전용 승강기가 열린다.</p><p>K의 선의는 계정 도용을 지우지 않는다. 박 과장의 승인도 K의 개발 책임을 지우지 않는다. 이제 사람의 고백이 아니라 <b>수정 불가능한 원본</b>으로 사고 자체를 복원할 차례다.</p>',
    summary: '복제 카드의 최종 승인 주체가 MIRROR임을 확인했고, K가 나를 의도적으로 원본까지 유도했음을 그의 고백과 독립 기록으로 교차 검증했다.',
  },
});
