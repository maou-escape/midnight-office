/* 장면 1 · 00:00 8층 경영지원팀 — 정전 */
MO.part({
  id: 'e1a1', ep: 1, time: '00:00', place: '8층 경영지원팀', title: '정전',
  bgm: 'assets/audio/ep1-act1.mp3',
  intro: `
    <p>나는 한결물류 본사 경영지원팀 직원이다. 오늘 밤엔 상사 박 과장이 맡긴 일 때문에 혼자 야근 중이다. “버릴 서버 목록을 정리해 두고 가.”</p>
    <p>자정이 되는 순간, 사무실 불이 한꺼번에 꺼졌다. 출입문 카드 리더에 빨간 불이 들어오고 문이 잠겼다. 휴대전화도 터지지 않는다.</p>
    <p>그리고 꺼지지 않은 내 모니터에 이런 글이 떠 있다.</p>
    <div class="screen-text red">오전 6시, 물류센터 화재 원본 자료를 영구 삭제합니다.\n삭제 실행자: 19-0426-071</div>
    <p><b>19-0426-071은 내 사원번호다.</b> 나는 이런 걸 예약한 적이 없다. 이대로 6시가 되면, 회사의 중요한 자료를 지운 사람은 내가 된다.</p>
    <p class="note">조작 · 화면 속 물건을 눌러 조사합니다. 소지품을 누르고 “들고 쓰기”를 고른 뒤 쓸 곳을 누르면 물건을 씁니다. 찾은 기록은 🗂️ 증거 파일에 쌓이고, 밤새 계속 쓰입니다. 막히면 ? 버튼을 누르세요.</p>`,
  goal: '<ul><li>잠긴 사무실을 둘러보고 단서를 모은다.</li><li>복도 끝 <b>서버실</b>에 들어가 누가 내 이름으로 삭제를 걸어 두었는지 확인한다.</li></ul>',
  people: [
    { name: '나', role: '경영지원팀 직원. 사원번호 19-0426-071. 오늘 밤 혼자 야근 중.' },
    { name: '박 과장', role: '나의 직속 상사. 오늘 밤 야근을 시키고 먼저 퇴근했다.' },
  ],
  terms: [
    { name: '원본 자료', role: '나중에 고칠 수 없는 처음 기록. 몇 년 전 물류센터 화재에 관한 원본이 서버실에 있다.' },
  ],
  start: 'office',
  startItems: ['badge'],

  items: {
    badge: { name: '내 사원증', icon: '🪪', desc: `<div class="paper">경영지원팀 · 사원번호 <b>19-0426-071</b></div><p>예전에 전산팀 강 선배가 해 준 말이 떠오른다.</p><blockquote>“우리 회사 사번은 가운데 네 자리가 입사한 날이야. 너는 4월 26일에 들어왔으니까 0426.”</blockquote>` },
    hexkey: { name: '비상 육각 키', icon: '🔧', desc: '<p>배전반 덮개를 여는 육각 키. 강 선배의 명함과 함께 내 서랍에 들어 있었다. 내가 넣은 적은 없다.</p>' },
    'E1-01': { ev: true, code: 'E1-01', name: '출입문 안내문', short: '오늘 밤용으로 급히 붙인 종이', desc: '<div class="paper">이 계정은 조사 중이므로 퇴실할 수 없습니다.\n전기를 살리려면: <b>배전반 B구역 / 이 층의 끝자리 번호</b></div><p class="note">회사 공식 안내문 양식이 아니다. 누군가 오늘 밤을 위해 미리 붙여 둔 종이다.</p>' },
    'E1-02': { ev: true, code: 'E1-02', name: '강 선배의 명함', desc: '<p>전산팀 강 선배의 명함. 뒷면에 숫자판 두 개가 손으로 그려져 있다.</p><div class="compare"><div><b>계산기</b><pre>7 8 9\n4 5 6\n1 2 3\n  0</pre></div><div><b>전화기</b><pre>1 2 3\n4 5 6\n7 8 9\n  0</pre></div></div><blockquote>숫자를 읽지 말고 자리를 옮겨. 서버실 비밀번호는 복사실에 남겼어. — 강</blockquote>' },
    'E1-03': { ev: true, code: 'E1-03', name: '복사기에 걸린 종이', short: '23:41 강 선배가 출력', desc: '<div class="paper">23:41 출력 · 출력자: 강(전산팀)\n서버실 비밀번호(원래 숫자): <b>74933</b>\n\n(연필 메모) B구역, 우리가 있는 층</div><p class="note">74933을 그대로 누르는 게 아니다. 강 선배 명함의 숫자판과 함께 봐야 한다.</p>' },
    'E1-04': { ev: true, code: 'E1-04', name: '시설 점검표', short: '00:00 전기 차단 예정, 서명 없음', desc: '<table><tr><th>구역</th><th>예정 작업</th><th>담당 확인</th></tr><tr><td>A-08</td><td>비상등 교체</td><td>완료</td></tr><tr><td>B-08</td><td>00:00 전기 차단 시험</td><td>서명 없음</td></tr><tr><td>C-08</td><td>소방 회선 검사</td><td>취소</td></tr></table><p class="note">자정에 이 층 전기를 끄는 “시험”이 예정돼 있었다. 그런데 담당자 서명이 없다.</p>' },
    'E1-05': { ev: true, code: 'E1-05', name: '정전 예약 라벨', short: '어제 18:26 강 선배 컴퓨터로 예약', desc: '<div class="paper">00:00 전기 차단 → 06:00 복구\n대상: 8층 B회로\n예약한 컴퓨터: <b>강(전산팀) 업무용 PC</b>\n예약 시각: 어제 18:26</div><p class="note">정전은 사고가 아니었다. 어제 저녁, 강 선배의 컴퓨터로 미리 예약돼 있었다.</p>' },
    'E1-06': { ev: true, code: 'E1-06', name: '강 선배의 사원증', short: '23:48 8층 서버실에 있었음', desc: '<div class="paper">강 · 전산팀 · 어제부로 출입 권한 회수\n마지막 사용: 23:48 · 8층 서버실</div><p class="note">서버실 바닥에, 내가 보라는 듯 세워져 있었다. 어제 회사에서 잘린 사람의 카드다.</p>' },
    'E1-07': { ev: true, code: 'E1-07', name: '삭제 예약 화면', short: '내 번호로 06:00 삭제 예약', desc: '<div class="screen-text red">물류센터 화재 원본 자료 · 영구 삭제 41.8% 진행 후 멈춤\n실행자: 19-0426-071\n06:00 자동으로 다시 시작</div><p class="note">내가 한 적 없는 삭제가 내 번호로 걸려 있다.</p>' },
  },

  rooms: {
    office: {
      name: '8층 · 경영지원팀 사무실',
      mood: { dark: 0.38, vignette: 0.85 },
      exits: [{ to: 'copy', label: '복사실' }, { to: 'pantry', label: '휴게실' }, { to: 'hall', label: '비상 복도' }],
      art: [
        { t: 'room', wall: '#1b2130', floor: '#111318', panels: true },
        { t: 'ceilingLight', x: 300, y: 30, on: false }, { t: 'ceilingLight', x: 1000, y: 30, on: false },
        { t: 'emergency', x: 760, y: 40 },
        { t: 'window', x: 1190, y: 110, w: 330, h: 300 },
        { t: 'clock', x: 860, y: 170, r: 44, w: 100, h: 100, spot: { id: 'clock', x: 812, y: 122, w: 96, h: 96, label: '벽시계', look: '<p>초침이 12를 막 넘었다. <b class="mono">00:00</b>. 복도 쪽 비상등만 붉게 깜빡인다.</p>' } },
        { t: 'door', x: 70, y: 190, w: 190, h: 450, label: '경영지원팀', lamp: 'red', color: '#36404f', glass: true,
          spot: { id: 'exitDoor', label: '잠긴 출입문', give: ['E1-01'], look: '<p>카드 리더는 내 사원증을 읽고도 문을 열지 않는다. 그 아래 테이프로 급히 붙인 종이가 있다.</p><div class="paper">이 계정은 조사 중이므로 퇴실할 수 없습니다.\n전기를 살리려면: <b>배전반 B구역 / 이 층의 끝자리 번호</b></div><p>회사에 이런 규칙은 없다. 누군가 오늘 밤을 위해 붙여 둔 것이다. 복도 끝 배전반에는 B-01부터 B-12까지 차단기가 있었던 것 같다.</p>',
            use: { badge: { html: '<p>삑. 리더가 번호를 읽는다. <span class="say">“조사 중인 계정입니다.”</span> 붉은 불만 한 번 더 깜빡일 뿐이다.</p>' } } } },
        { t: 'desk', x: 380, y: 500, w: 560, drawers: true },
        { t: 'monitor', x: 520, y: 330, w: 250, h: 140, color: '#ff8a8a', bg: '#1a0707', lines: ['06:00 영구 삭제 예약', '대상: 화재 원본 자료', '실행자: 19-0426-071'],
          spot: { id: 'myMonitor', label: '내 모니터', look: '<div class="screen-text red">오전 6시, 물류센터 화재 원본 자료를 영구 삭제합니다.\n삭제 실행자: 19-0426-071</div><p>키보드를 눌러도 반응이 없다. 취소하려면 서버실에 직접 가야 할 것 같다.</p>' } },
        { t: 'shape', x: 790, y: 518, w: 140, h: 90, fill: 'transparent', spot: { id: 'drawer', label: '잠긴 책상 서랍', puzzle: 'drawer', after: '<p>열린 서랍은 비어 있다. 육각 키와 명함은 이미 챙겼다.</p>' } },
        { t: 'chair', x: 600, y: 560, color: '#232833' },
        { t: 'desk', x: 1000, y: 520, w: 420 },
        { t: 'monitor', x: 1110, y: 380, w: 180, h: 110, on: false },
        { t: 'paper', x: 1320, y: 470, w: 70, h: 44, r: -6, spot: { id: 'parkDesk', label: '박 과장 책상', pad: 20, look: '<p>박 과장 책상은 이상할 만큼 깨끗하다. 메모지 한 장만 남아 있다.</p><div class="paper">오늘 야근: 19-0426-071 (혼자)\n버릴 서버 목록 정리\n※ 내일 아침 감사팀 보고 예정</div><p class="note">오늘 밤 사무실에 나 혼자 남도록 정해 둔 것처럼 보인다.</p>' } },
        { t: 'plant', x: 300, y: 470 },
        { t: 'cabinet', x: 1460, y: 420, w: 110, h: 220, n: 3 },
      ],
    },

    copy: {
      name: '8층 · 복사실',
      mood: { dark: 0.42, vignette: 0.85 },
      exits: [{ to: 'office', label: '사무실' }, { to: 'pantry', label: '휴게실' }, { to: 'hall', label: '비상 복도' }],
      art: [
        { t: 'room', wall: '#202634', floor: '#14161b' },
        { t: 'emergency', x: 120, y: 50 },
        { t: 'printer', x: 560, y: 330, w: 420, h: 310, jam: true,
          spot: { id: 'printer', label: '멈춘 복합기', give: ['E1-03'], look: '<p>복합기가 정전 직전에 멈춘 종이를 반쯤 물고 있다. 아직 따뜻하다. 천천히 당겨 꺼낸다.</p><div class="paper">23:41 출력 · 출력자: 강(전산팀)\n서버실 비밀번호(원래 숫자): <b>74933</b></div><p>가장자리에 연필로 <b>“B구역, 우리가 있는 층”</b>이라고 적혀 있다. 강 선배는 어제 회사를 그만뒀다고 들었는데, 오늘 밤 여기 있었다.</p>' } },
        { t: 'shelf', x: 1080, y: 200, w: 380, h: 440, rows: 4, boxes: true, spot: { id: 'paperShelf', label: '용지 선반', look: '<p>A4 박스가 가득하다. 맨 아래 칸에 파쇄된 종이 봉투가 끼어 있다. 읽을 수 있는 글자는 “원본”과 “06:00”뿐이다.</p>' } },
        { t: 'box', x: 200, y: 520, w: 180, h: 120, color: '#3a4252', label: '파쇄함', spot: { id: 'shredder', label: '파쇄함', look: '<p>파쇄함은 오늘 비워졌다. 누군가 퇴근 전에 일부러 정리한 모양이다.</p>' } },
      ],
    },

    pantry: {
      name: '8층 · 휴게실',
      mood: { dark: 0.35, vignette: 0.85 },
      exits: [{ to: 'office', label: '사무실' }, { to: 'copy', label: '복사실' }, { to: 'hall', label: '비상 복도' }],
      art: [
        { t: 'room', wall: '#22283a', floor: '#15171c' },
        { t: 'window', x: 120, y: 120, w: 360, h: 280 },
        { t: 'fridge', x: 640, y: 230, w: 220, h: 410, note: true,
          spot: { id: 'fridge', label: '냉장고 점검표', give: ['E1-04'], look: '<p>냉장고는 비상 전원으로 윙윙거린다. 자석 밑에 오늘 날짜 시설 점검표가 끼워져 있다.</p><table><tr><th>구역</th><th>예정 작업</th><th>담당 확인</th></tr><tr><td>A-08</td><td>비상등 교체</td><td>완료</td></tr><tr><td>B-08</td><td>00:00 전기 차단 시험</td><td>서명 없음</td></tr><tr><td>C-08</td><td>소방 회선 검사</td><td>취소</td></tr></table>' } },
        { t: 'counter', x: 940, y: 470, w: 520, h: 170 },
        { t: 'shape', x: 1040, y: 400, w: 90, h: 70, fill: '#2a2f3b', rx: 10, spot: { id: 'pot', label: '커피 포트 메모', pad: 16, look: '<div class="paper">(시설팀 메모) 오늘 밤 정전 시험은 <b>8층 B회로만</b>.\n근데 누가 신청했는지 모르겠음?</div><p>건물 전체 사고가 아니다. 이 층, 이 회로만 꺼졌다.</p>' } },
        { t: 'sofa', x: 120, y: 520, w: 360, color: '#2d2640' },
      ],
    },

    hall: {
      name: '8층 · 비상 복도',
      mood: (g) => (g.solved('breaker') ? { dark: 0.08, vignette: 0.55 } : { dark: 0.5, vignette: 0.9 }),
      exits: [{ to: 'office', label: '사무실' }, { to: 'copy', label: '복사실' }, { to: 'pantry', label: '휴게실' }],
      art: (g) => [
        { t: 'room', wall: '#1c2230', floor: '#121419', tiles: true },
        { t: 'ceilingLight', x: 240, y: 30, on: g.solved('breaker') }, { t: 'ceilingLight', x: 760, y: 30, on: g.solved('breaker') }, { t: 'ceilingLight', x: 1240, y: 30, on: g.solved('breaker') },
        { t: 'exitSign', x: 1420, y: 120 },
        { t: 'panel', x: 200, y: 240, w: 230, h: 320, hazard: !g.flag('panelOpen'), open: g.flag('panelOpen'), lit: g.solved('breaker'), label: '비상 배전반', lamp: g.solved('breaker') ? '#3dff8a' : '#ff4848',
          spot: { id: 'panel', label: '비상 배전반',
            onLook: (g) => {
              if (!g.flag('panelOpen')) { g.say({ title: '비상 배전반', html: '<p>덮개가 육각 볼트로 잠겨 있다. 맞는 공구가 필요하다.</p>' }); return false; }
              if (!g.solved('breaker')) { g.puzzle('breaker'); return false; }
              if (!g.has('E1-05') && !g.flag('used:E1-05')) { g.give('E1-05', true); g.say({ title: '배전반 예약 모듈', html: '<p>배전반 안쪽, 예약 장치에 라벨이 붙어 있다.</p><div class="paper">00:00 전기 차단 → 06:00 복구\n대상: 8층 B회로\n예약한 컴퓨터: <b>강(전산팀) 업무용 PC</b>\n예약 시각: 어제 18:26</div><p>정전은 사고가 아니었다. 어제 저녁에 미리 예약돼 있었다.</p>', got: ['E1-05'] }); return false; }
              g.say({ title: '비상 배전반', html: '<p>B-08이 초록불을 켜고 있다. 복도와 서버실 쪽 전원이 살아났다.</p>' });
              return false;
            },
            use: { hexkey: { set: 'panelOpen', take: 'hexkey', puzzle: 'breaker' } } } },
        { t: 'door', x: 820, y: 200, w: 230, h: 440, label: '서버실', color: '#2b3340', lamp: g.solved('serverPad') ? 'green' : 'red',
          spot: { id: 'serverDoor', label: '서버실 문', goto: 'server', need: (g) => g.solved('serverPad'), locked: (g) => (g.solved('breaker') ? '<p>문 옆 키패드가 다섯 칸을 깜빡이며 기다린다.</p>' : '<p>방화문은 굳게 잠겨 있다. 옆 키패드도 꺼져 있다.</p>') } },
        { t: 'keypad', x: 1110, y: 380, w: 80, h: 116, on: g.solved('breaker'),
          spot: { id: 'serverPadSpot', label: '서버실 키패드', pad: 14, puzzle: 'serverPad', need: (g) => g.solved('breaker'), locked: '<p>화면이 꺼져 있다. 이 층의 전원부터 살려야 한다.</p>', after: '<p>초록불. 서버실 문이 열려 있다.</p>' } },
        { t: 'shape', x: 1260, y: 300, w: 120, h: 340, fill: '#252b38', rx: 4 },
        { t: 'sign', x: 1240, y: 250, w: 160, text: '계단 · 7F' },
      ],
    },

    server: {
      name: '8층 · 원본 서버실',
      mood: { dark: 0.2, vignette: 0.75, tint: '#3dff8a' },
      exits: [{ to: 'hall', label: '복도로' }],
      art: [
        { t: 'room', wall: '#141a22', floor: '#0e1014', tiles: true },
        { t: 'rack', x: 80, y: 160, w: 170, h: 480, label: 'R-01' }, { t: 'rack', x: 280, y: 160, w: 170, h: 480, label: 'R-02' },
        { t: 'rack', x: 1150, y: 160, w: 170, h: 480, label: '원본', leds: '#f5b14c',
          spot: { id: 'sentinel', label: '원본 서버', look: '<p>화재 원본 자료가 들어 있는 서버. 노란 불이 깜빡인다. 06:00에 이 안의 자료가 지워진다. 바닥 쪽에서 무언가 반짝인다.</p>' } },
        { t: 'rack', x: 1350, y: 160, w: 170, h: 480, label: 'R-04' },
        { t: 'shape', x: 1190, y: 600, w: 70, h: 40, fill: '#e8ebf1', rx: 4,
          spot: { id: 'kcard', label: '랙 아래 사원증', pad: 20, give: ['E1-06'], look: '<p>원본 서버 바닥에 사원증 하나가 일부러 보이게 세워져 있다. 강 선배의 것이다.</p><div class="paper">강 · 전산팀 · 어제부로 출입 권한 회수\n마지막 사용: 23:48 · 8층 서버실</div><p>잃어버린 게 아니다. 내가 찾으라고 둔 것이다.</p>' } },
        { t: 'console', x: 560, y: 470, w: 440, h: 170,
          spot: { id: 'console', label: '관리 콘솔', give: ['E1-07'], look: '<p>관리 화면에 삭제 작업이 떠 있다. 정전 때문에 41.8%에서 멈췄다.</p><div class="screen-text red">물류센터 화재 원본 자료 · 영구 삭제\n실행자: 19-0426-071\n06:00 자동으로 다시 시작</div><p>여기서는 취소할 수 없다. 관리자 권한이 필요하다고 나온다. 6시까지 다른 방법을 찾아야 한다.</p>' } },
        { t: 'board', x: 560, y: 120, w: 440, h: 260, lines: ['① 정전은 왜? — ?', '② 강 선배 카드 — ?', '③ 내 이름의 삭제 — ?', '결론: ______'],
          spot: { id: 'board', label: '사건 화이트보드', puzzle: 'deduce', need: (g) => g.hadAll(['E1-05', 'E1-06', 'E1-07']),
            locked: (g) => `<p>화이트보드에 세 줄을 적으려 한다. 아직 근거가 부족하다. (${g.count(['E1-05', 'E1-06', 'E1-07'])}/3)</p><p class="note">정전은 누가 예약했나? 강 선배 카드는 어디 있나? 삭제는 누구 이름으로 걸려 있나?</p>` } },
      ],
    },
  },

  puzzles: {
    drawer: {
      type: 'keypad', len: 4, answer: '0426',
      loc: '8층 · 내 책상', title: '책상 서랍 번호 자물쇠',
      prompt: '<p>서랍은 네 자리 번호로 잠겨 있다. 목에 건 사원증에 답이 있을 것 같다.</p>',
      wrong: { '1904': '입사 연도가 아니라 들어온 날이다.', '0710': '번호를 거꾸로 읽은 것 같다.' },
      hints: ['사원증(소지품)을 눌러 보세요. 강 선배가 해 준 말이 적혀 있습니다.', '사원번호 19-0426-071의 가운데 네 자리가 입사한 월과 일입니다.', '정답은 0426입니다.'],
      reward: ['hexkey', 'E1-02'],
      okText: '<p>딸깍. 서랍 안에 내가 넣지 않은 물건 두 개가 있다. 비상용 육각 키, 그리고 강 선배의 명함. 명함 뒷면에는 숫자판 두 개가 그려져 있다.</p><div class="compare"><div><b>계산기</b><pre>7 8 9\n4 5 6\n1 2 3\n  0</pre></div><div><b>전화기</b><pre>1 2 3\n4 5 6\n7 8 9\n  0</pre></div></div><blockquote>숫자를 읽지 말고 자리를 옮겨. 서버실 비밀번호는 복사실에 남겼어. — 강</blockquote><p>강 선배는 전산팀 개발자다. 어제 갑자기 회사에서 잘렸다고 들었다. 그런 사람이 오늘 밤 내 서랍에 이걸 넣어 두었다.</p>',
    },
    breaker: {
      type: 'dial', loc: '8층 · 비상 배전반', title: '수동 복구할 회로',
      prompt: '<p>덮개를 열자 A·B·C 세 줄의 차단기가 나온다. 잘못 올리면 서버실 전원까지 끊긴다는 경고가 붙어 있다.</p><p class="note">출입문 안내문, 복사기 종이, 휴게실 점검표가 모두 같은 차단기를 가리킨다.</p>',
      cols: [{ label: '구역', opts: ['A', 'B', 'C'] }, { label: '번호', opts: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'] }],
      seps: ['-'], answer: ['B', '08'],
      check: (v) => (v[0] !== 'B' ? '출입문 안내는 B구역을 지목했다.' : '구역은 맞다. “대상 층 끝자리”와 “우리가 있는 층”을 떠올려 보자.'),
      hints: ['출입문 안내문, 복사기 종이의 연필 메모, 휴게실 점검표를 모두 보세요.', '구역은 B. 번호는 지금 있는 층(8층)의 끝자리이며, 점검표에도 같은 회로가 있습니다.', '정답은 B-08입니다.'],
      okTitle: 'B-08 복구', okText: '<p>B-08을 올리자 복도 불이 차례로 들어온다. 출입문은 여전히 잠겨 있지만, 서버실 문 옆 키패드가 켜졌다.</p><p class="note">배전반 안쪽에 라벨 같은 게 붙어 있다. 다시 살펴보자.</p>',
    },
    serverPad: {
      type: 'keypad', len: 5, answer: '14399',
      loc: '8층 · 서버실 키패드', title: '서버실 다섯 자리 잠금',
      prompt: '<p>서버실 키패드는 전화기처럼 1이 맨 위에 있다. 다섯 칸이 깜빡인다. 복사기 종이의 원래 숫자는 계산기 자판 기준이었다.</p><div class="compare"><div><b>원래 숫자의 자판 (계산기)</b><pre>7 8 9\n4 5 6\n1 2 3\n  0</pre></div><div><b>지금 누를 자판 (전화기)</b><pre>1 2 3\n4 5 6\n7 8 9\n  0</pre></div></div>',
      wrong: { '74933': '원래 숫자를 그대로 넣었다. 명함에는 “자리를 옮겨”라고 적혀 있었다.' },
      hints: ['복사기 종이의 원래 숫자(다섯 자리)와 강 선배의 명함을 함께 보세요.', '숫자 값이 아니라 위치를 옮깁니다. 계산기 왼쪽 위의 7은 전화기 같은 자리의 1이 됩니다.', '7→1, 4→4, 9→3, 3→9, 3→9. 정답은 14399입니다.'],
      okText: '<p>초록불이 켜지고 서버실 문이 열린다. 서버 팬 소리가 밀려온다.</p>',
    },
    deduce: {
      type: 'verify', loc: '8층 · 서버실 사건 보드', title: '첫 번째 결론',
      prompt: '<p>콘솔 옆 화이트보드에 오늘 밤 일을 정리한다. 강 선배 명함 뒷면, 숫자판 아래에 작은 글씨가 하나 더 있었다.</p><blockquote>“기록 하나만 보고 믿지 마. 서로 다른 곳에서 나온 기록 두 개가 같은 말을 할 때만 사실이야.”</blockquote><p>오늘 밤 정전은 무엇이었을까? 확실히 말할 수 있는 만큼만 적는다.</p><p class="note">이제부터 결론은 이렇게 적습니다: ① 결론을 고르고 ② 그걸 증명하는, <b>서로 다른 곳에서 나온 증거 두 장</b>을 고릅니다.</p>',
      claims: [
        { v: 'accident', label: '낡은 설비 때문에 우연히 일어난 사고다', why: '사고라면 시각을 미리 정해 둘 수 없다. 어떤 기록에는 “00:00”이 미리 적혀 있었다.' },
        { v: 'plan', label: '누군가 미리 계획해 둔 정전이다' },
        { v: 'k', label: '강 선배가 직접 전기를 껐다', why: '강 선배의 컴퓨터가 쓰인 건 맞다. 하지만 강 선배 본인이 했다는 기록은 아직 없다. 확실한 만큼만 적자.' },
      ],
      answer: 'plan',
      pairs: [['E1-05', 'E1-04'], ['E1-05', 'E1-01'], ['E1-04', 'E1-01']],
      notes: { 'E1-07': '삭제 예약은 6시 삭제에 관한 기록이다. 정전과는 따로 봐야 한다.', 'E1-02': '명함은 서버실 비밀번호에 관한 것이다.', 'E1-03': '복사기 종이는 서버실 비밀번호에 관한 것이다.', 'E1-06': '강 선배 카드는 정전이 언제 정해졌는지 말해 주지 않는다.' },
      hints: ['정전이 “미리 정해져 있었다”는 걸 보여 주는 기록을 찾으세요. 00:00이 미리 적힌 종이와 라벨이 있습니다.', '배전반 안쪽 라벨(E1-05), 휴게실 점검표(E1-04), 출입문 안내문(E1-01)은 서로 다른 곳에서 나왔습니다.', '결론은 “누군가 미리 계획해 둔 정전”. 증거는 E1-05와 E1-04를 고르세요.'],
      finish: true,
    },
  },

  objectives: [
    { text: '잠긴 출입문 살펴보기', done: (g) => g.hadAll(['E1-01']), hint: ['왼쪽의 붉은 불이 켜진 출입문을 눌러 보세요.'] },
    { text: '책상 서랍 열기', done: (g) => g.solved('drawer'), hint: ['내 책상 오른쪽 서랍이 네 자리 번호로 잠겨 있습니다.', '소지품의 사원증을 눌러 보세요.'] },
    { text: '복사실과 휴게실에서 흔적 찾기', done: (g) => g.hadAll(['E1-03', 'E1-04']), hint: ['아래쪽 이동 버튼으로 복사실과 휴게실에 가 보세요.', '복사실은 멈춘 복합기, 휴게실은 냉장고를 보세요.'] },
    { text: '복도 배전반에서 끊긴 회로 복구하기', done: (g) => g.solved('breaker'), hint: ['비상 복도의 배전반은 육각 볼트로 잠겨 있습니다.', '소지품의 육각 키를 “들고 쓰기”로 든 뒤 배전반을 누르세요.'] },
    { text: '서버실 키패드 열기', done: (g) => g.solved('serverPad'), hint: ['전원이 살아난 키패드는 다섯 자리를 원합니다.', '복사기 종이의 숫자와 강 선배 명함을 함께 보세요.'] },
    { text: '서버실에서 단서를 모아 화이트보드에 결론 적기', done: (g) => g.solved('deduce'), hint: ['배전반 안쪽(복구 후 다시 누르기), 서버실 랙 아래, 관리 콘솔을 조사하세요.', '세 기록을 모으면 서버실 화이트보드에 결론을 적을 수 있습니다. 결론에는 서로 다른 곳에서 나온 증거 두 장이 필요합니다.'] },
  ],

  ending: {
    title: '계획된 정전',
    seal: '4180',
    html: '<p>서버실 비상 레버를 당기자 아래층 계단문이 열린다. 그때 천장 스피커에서 녹음된 목소리가 짧게 흘러나온다. 강 선배다.</p><blockquote>“미안하다. 너를 이 일에 끌어들였어. 6시에 지워지는 건 몇 년 전 물류센터 화재의 진짜 기록이야. 그게 사라지면, 지운 사람은 네가 돼. 아래층에 증거가 더 있어. 그리고… 내 말도 그냥 믿지는 마.”</blockquote><p>강 선배가 나를 이용한 건 분명하다. 그런데 동시에, 이걸 막을 길도 남겨 놓았다.</p>',
    learned: ['오늘 밤 정전은 사고가 아니라, 어제 저녁 강 선배의 컴퓨터로 <b>미리 예약된</b> 것이다.', '6시에 지워질 자료는 <b>몇 년 전 물류센터 화재의 원본 기록</b>이고, 지운 사람은 <b>내 사원번호</b>로 남게 돼 있다.', '어제 잘린 강 선배가 오늘 밤 서버실에 왔었고, 나에게 단서를 남겼다.'],
    summary: '정전은 강 선배 컴퓨터로 미리 예약된 것이었다. 6시에 화재 원본이 내 이름으로 지워진다.',
  },
});
