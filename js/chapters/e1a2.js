/* Episode 1 · Act 2 기록 — 00:34 7층 기록보관 구역 */
MO.chapter({
  id: 'e1a2', ep: 1, act: 2,
  epTitle: 'Episode 1. 야근', title: 'Act 2. 기록',
  kicker: '00:34 · 7층 기록보관 구역', tagline: '같은 번호가 두 곳에 있다',
  bgm: 'assets/audio/ep1-act2.mp3',
  premise: '카드 기록과 CCTV는 정확해 보이지만 같은 번호가 동시에 두 장소에 나타난다. 서로 독립된 기록을 모아 기록 자체를 심문한다.',
  intro: `
    <p>계단문이 닫히자 위층 팬 소리도 끊긴다. 7층에는 문서보관실, 시설관리실, 야간 휴게실, 보안실이 긴 복도를 사이에 두고 떨어져 있다.</p>
    <p>천장 스피커에서 박 과장의 녹음 안내가 반복된다.</p>
    <blockquote>“전산 장애 시 카드 기록을 최종본으로 간주하십시오. CCTV와 수기 기록은 참고 자료입니다.”</blockquote>
    <p>K의 말과 정반대다. 어느 쪽도 먼저 믿지 않고, <b>서로 다른 장소에서 만들어진 기록</b>부터 모아야 한다.</p>`,
  start: 'lobby',
  startItems: [],

  items: {
    film: { name: '투명 카메라 도면', icon: '🎞️', desc: '<p>CCTV 공사철에서 빼낸 투명 필름. 카메라 위치가 점(●)으로 인쇄돼 있다.</p><div class="paper">카메라 도면 · NORTH ↑\n●  ·  ●\n·  ·  ·\n●  ·  ●</div><p class="note">다른 도면 위에 겹쳐 볼 수 있을 것 같다.</p>' },
    'E2-01': { ev: true, code: 'E2-01', name: '윤서진 인사 원장', desc: '<div class="paper">윤서진 · 내부감사 · 18-0514-263\n공식 인사본: 자진 퇴사\n수기 원장: <b>조치 미종결 / 원본 별도 이관</b></div><p class="note">두 문구가 충돌한다. 폐기된 사람에게 원본 이관 기록이 남은 것은 이상하다.</p>' },
    'E2-04': { ev: true, code: 'E2-04', name: '야간 순찰 수기', desc: '<div class="paper">23:48 · 8층 서버실 앞에서 K 명찰 발견, 사람 없음\n00:02 · 8층 UPS 카메라에 경영지원팀 직원 1명 확인\n00:05 · 지하 출입 경보는 울리지 않음\n기록자: 오민재\n\n(커피 얼룩 밑) 보안 서버 시각은 벽시계보다 <b>3분 빠름</b></div>' },
    'E2-05': { ev: true, code: 'E2-05', name: 'K 카드 물리 모순', desc: '<p>같은 사원번호를 표시하는 서로 다른 카드 일련번호가 8층과 지하에 동시에 존재했다. 복제된 것은 플라스틱이 아니라 시스템이 읽는 신원 값이다.</p>' },
    'E2-06': { ev: true, code: 'E2-06', name: '내 카드 물리 모순', desc: '<p>00:02 나는 8층 UPS 앞에 있었지만 같은 사원번호가 지하 리더에 쓰였다. 영상 원본 해시와 UPS 점검기 사진 시각이 일치한다.</p>' },
    'E2-07': { ev: true, code: 'E2-07', name: '기록 생성 시각 모순', desc: '<p>CCTV 파일이 만들어지고 3분 뒤 카드 로그가 과거 시각으로 반영됐다. 원인과 결과의 순서가 뒤집혔다.</p>' },
  },

  rooms: {
    lobby: {
      name: '7층 · 비상계단 로비',
      mood: { dark: 0.3, vignette: 0.8 },
      exits: [{ to: 'facility', label: '시설관리실' }, { to: 'pantry', label: '야간 휴게실' }],
      art: (g) => [
        { t: 'room', wall: '#1d2331', floor: '#121419', tiles: true },
        { t: 'ceilingLight', x: 650, y: 30, on: true, color: '#ffd9a8' },
        { t: 'exitSign', x: 80, y: 110, text: '7F' },
        { t: 'shape', x: 760, y: 70, w: 80, h: 40, fill: '#2a2f3b', rx: 20, spot: { id: 'speaker', label: '천장 스피커', look: '<blockquote>“전산 장애 시 카드 기록을 최종본으로 간주하십시오. CCTV와 수기 기록은 참고 자료입니다.”</blockquote><p>박 과장 목소리다. 같은 문장이 30초마다 반복된다.</p>' } },
        { t: 'door', x: 120, y: 210, w: 200, h: 430, label: '문서보관실', color: '#46392d', lamp: g.solved('extension') ? 'green' : 'red',
          spot: { id: 'archiveDoor', label: '문서보관실 문', goto: 'archive', need: (g) => g.solved('extension'), locked: '<p>철제문이다. 옆의 도어폰으로 당직자 내선을 연결해야 열린다.</p>' } },
        { t: 'board', x: 390, y: 230, w: 300, h: 230, cork: true, pins: 2,
          spot: { id: 'roster', label: '당직표 · 내선표', look: '<p>도어폰 옆에 23:30에 갱신된 당직표와 낡은 내선표가 나란히 붙어 있다.</p><table><tr><th>당직표</th><th>시간</th><th>당직자</th></tr><tr><td>A조</td><td>22:00–23:30</td><td>김현수</td></tr><tr><td>B조</td><td>23:30–01:00</td><td>오민재</td></tr><tr><td>C조</td><td>01:00–02:30</td><td>윤재희</td></tr></table><table><tr><th>시설 내선표</th><th>구역 코드</th><th>내선</th></tr><tr><td>오민재</td><td>7F-FAC-A</td><td>724</td></tr><tr><td>오민재</td><td>7F-FAC-B</td><td>731</td></tr><tr><td>김현수</td><td>7F-FAC-A</td><td>718</td></tr><tr><td>윤재희</td><td>7F-FAC-C</td><td>744</td></tr></table><p class="note">이름만 맞는 오래된 내선은 미끼다. 지금 시각의 조와 구역 코드까지 맞아야 한다.</p>' } },
        { t: 'keypad', x: 720, y: 330, w: 80, h: 116, spot: { id: 'doorphone', label: '도어폰', pad: 14, puzzle: 'extension', after: '<p>통화 연결음 뒤로 문서보관실 문이 열려 있다.</p>' } },
        { t: 'clock', x: 980, y: 170, r: 40, spot: { id: 'eclock', x: 936, y: 126, w: 88, h: 88, label: '비상시계', look: '<p>비상시계는 <b class="mono">00:34</b>. 배터리로 돌아가는 아날로그 시계라 서버 시각과는 무관하다.</p>' } },
        { t: 'door', x: 1180, y: 210, w: 230, h: 430, label: '보안실', color: '#2b3340', lamp: g.solved('secPad') ? 'green' : 'red',
          spot: { id: 'secDoor', label: '보안실 문', goto: 'security', need: (g) => g.solved('secPad'), locked: '<p>보안실 문은 별도 키패드로 잠겨 있다.</p>' } },
        { t: 'keypad', x: 1430, y: 340, w: 80, h: 116, spot: { id: 'secPadSpot', label: '보안실 키패드', pad: 14, puzzle: 'secPad', after: '<p>보안실 문이 열려 있다.</p>' } },
      ],
    },

    archive: {
      name: '7층 · 문서보관실',
      mood: { dark: 0.25, vignette: 0.8 },
      exits: [{ to: 'lobby', label: '계단 로비' }],
      art: [
        { t: 'room', wall: '#251f1b', floor: '#15120f' },
        { t: 'ceilingLight', x: 650, y: 30, color: '#ffe2b8' },
        { t: 'shelf', x: 80, y: 120, w: 420, h: 520, rows: 5, label: '퇴직자',
          spot: { id: 'retiree', label: '퇴직자 서가', give: ['E2-01'], look: '<p>퇴직자 서가에서 윤서진의 인사 원장을 찾았다.</p><div class="paper">윤서진 · 내부감사 · 18-0514-263\n공식 인사본: 자진 퇴사\n수기 원장: <b>조치 미종결 / 원본 별도 이관</b></div><p>두 문구는 충돌한다. 아직 어느 쪽이 진짜인지 알 수 없다.</p>' } },
        { t: 'shelf', x: 560, y: 120, w: 420, h: 520, rows: 5 },
        { t: 'cabinet', x: 1060, y: 300, w: 200, h: 340, n: 4,
          spot: { id: 'cctvFile', label: 'CCTV 공사철', give: ['film'], look: '<p>공사 서류철 사이에 투명 필름 한 장이 끼워져 있다. 카메라 방향과 위치가 점으로 인쇄된 도면이다.</p><div class="paper">카메라 도면 · NORTH ↑\n●  ·  ●\n·  ·  ·\n●  ·  ●</div><p class="note">혼자서는 숫자가 없다. 다른 도면 위에 올려야 의미가 생긴다.</p>' } },
        { t: 'box', x: 1320, y: 520, w: 200, h: 120, label: '폐기 예정' },
      ],
    },

    facility: {
      name: '7층 · 시설관리실',
      mood: { dark: 0.3, vignette: 0.8 },
      exits: [{ to: 'lobby', label: '계단 로비' }, { to: 'pantry', label: '야간 휴게실' }],
      art: [
        { t: 'room', wall: '#1e2a2a', floor: '#121616' },
        { t: 'ceilingLight', x: 600, y: 30 },
        { t: 'panel', x: 120, y: 200, w: 240, h: 360, label: '7F 배전반', lamp: '#3dff8a',
          spot: { id: 'panelNote', label: '배전반 문', look: '<p>배전반 문에 매직으로 적혀 있다.</p><div class="paper">조명 도면은 설치면(천장 위)에서 본 그림이다.\n방에서 볼 때는 <b>좌우를 뒤집어</b> 읽을 것.</div>' } },
        { t: 'board', x: 470, y: 180, w: 380, h: 280,
          spot: { id: 'lightMap', label: '비상 조명 배치도', puzzle: 'mapflip', need: (g) => g.has('film') || g.solved('mapflip'), locked: '<div class="paper">비상 조명 배치도 · 설치면 기준\n2  5  8\n9  1  6\n4  7  0</div><p>숫자가 아홉 개라 어느 것을 읽어야 할지 모르겠다. 위치를 골라 줄 다른 도면이 있으면 좋겠다.</p>',
            use: { film: { puzzle: 'mapflip' } }, after: '<p>카메라 도면을 겹쳐 읽은 결과를 기억해 두었다. 이제 보안실 키패드로.</p>' } },
        { t: 'workbench', x: 980, y: 480, w: 460, tools: true, spot: { id: 'toolbench', label: '공구대', look: '<p>순찰용 무전기 충전대. 한 칸이 비어 있다. 오민재가 들고 나간 모양이다.</p>' } },
      ],
    },

    pantry: {
      name: '7층 · 야간 휴게실',
      mood: { dark: 0.3, vignette: 0.8 },
      exits: [{ to: 'lobby', label: '계단 로비' }, { to: 'facility', label: '시설관리실' }],
      art: [
        { t: 'room', wall: '#2a2333', floor: '#151318' },
        { t: 'window', x: 1060, y: 120, w: 420, h: 300 },
        { t: 'counter', x: 160, y: 460, w: 640, h: 180 },
        { t: 'shape', x: 260, y: 360, w: 180, h: 100, fill: '#c8ccd4', rx: 6 },
        { t: 'paper', x: 300, y: 330, w: 110, h: 60, r: -4, spot: { id: 'patrol', label: '순찰 일지', pad: 30, give: ['E2-04'], look: '<p>순찰자가 쓰는 종이 일지가 전자레인지 위에 펼쳐져 있다. 네트워크와 무관한 수기 기록이다.</p><div class="paper">23:48 · 8층 서버실 앞에서 K 명찰 발견, 사람 없음\n00:02 · 8층 UPS 카메라에 경영지원팀 직원 1명 확인\n00:05 · 지하 출입 경보는 울리지 않음\n기록자: 오민재</div><p>커피 얼룩 밑에 “보안 서버 시각은 벽시계보다 <b>3분 빠름</b>”이라고 덧붙어 있다.</p>' } },
        { t: 'sofa', x: 900, y: 520, w: 420, color: '#3a2f2a' },
        { t: 'cup', x: 560, y: 400, color: '#e8ebf1', sleeve: '#2a3a6a' },
      ],
    },

    security: {
      name: '7층 · 보안실',
      mood: { dark: 0.15, vignette: 0.7, tint: '#4fb3ff' },
      exits: [{ to: 'lobby', label: '계단 로비' }],
      art: (g) => [
        { t: 'room', wall: '#151b26', floor: '#0e1116' },
        { t: 'screens', x: 120, y: 90, w: 900, h: 380, cols: 4, rows: 3,
          spot: { id: 'monitors', label: '모니터 열두 대', look: '<p>카드 로그와 영상 인덱스가 나란히 떠 있다. 따로 보면 그럴듯하지만 순찰 수기와 붙이면 세 종류의 모순이 생긴다.</p><table><tr><th>대상</th><th>전산 기록</th><th>독립 기록</th></tr><tr><td>K 카드</td><td>23:49 지하 1층 출입</td><td>23:48 원본 카드가 8층에 있음</td></tr><tr><td>내 카드</td><td>00:02 지하 1층 출입</td><td>00:02 내가 8층 UPS 앞에 있음</td></tr><tr><td>파일 시각</td><td>CCTV 작성 00:11 / 카드 반영 00:14</td><td>보안 서버가 벽시계보다 3분 빠름</td></tr></table>' } },
        { t: 'console', x: 160, y: 500, w: 360, h: 140, spot: { id: 'kCheck', label: 'K 카드 검증 단말', puzzle: 'kCheck', need: (g) => g.has('E2-04'), locked: '<p>전산 기록만으로는 비교할 기준이 없다. 네트워크와 무관한 독립 기록이 필요하다.</p>' } },
        { t: 'console', x: 600, y: 500, w: 360, h: 140, spot: { id: 'meCheck', label: '내 카드 검증 단말', puzzle: 'meCheck', need: (g) => g.has('E2-04'), locked: '<p>영상 원본과 비교할 독립 기록이 필요하다.</p>' } },
        { t: 'console', x: 1040, y: 500, w: 360, h: 140, spot: { id: 'timeCheck', label: '파일 시각 검증 단말', puzzle: 'timeCheck', need: (g) => g.has('E2-04'), locked: '<p>두 시각 차이를 해석할 보정값이 없다.</p>' } },
        { t: 'board', x: 1100, y: 110, w: 380, h: 300, lines: ['K 카드: ' + (g.solved('kCheck') ? '복제 카드' : '?'), '내 카드: ' + (g.solved('meCheck') ? '00:02 동시 출현' : '?'), '파일 시각: ' + (g.solved('timeCheck') ? '3분 차이' : '?'), '공통 행위: ____'],
          spot: { id: 'board2', label: '사건 보드', puzzle: 'board', need: (g) => g.hadAll(['E2-05', 'E2-06', 'E2-07']), locked: (g) => `<p>세 모순을 각각 검증해야 하나의 결론으로 묶을 수 있다. (${g.count(['E2-05', 'E2-06', 'E2-07'])}/3)</p>` } },
      ],
    },
  },

  puzzles: {
    extension: {
      type: 'keypad', len: 3, answer: '731',
      loc: '7층 · 문서보관실 도어폰', title: '현재 당직자 연결 번호',
      prompt: '<p>도어폰이 세 자리 내선을 요구한다. 지금 시각은 00:34.</p>',
      wrong: { '724': '오민재는 맞지만 A 구역 내선이다. 지금은 몇 조인가?', '718': '김현수의 당직은 23:30에 끝났다.', '744': '윤재희는 01:00부터다.' },
      hints: ['로비의 당직표·내선표와 비상시계를 함께 보세요.', '00:34는 B조(23:30–01:00) 시간이고 당직자는 오민재입니다. 오민재 내선이 두 개입니다.', '구역 코드 B까지 맞는 7F-FAC-B, 정답은 731입니다.'],
      okText: '<p>잡음 섞인 연결음 끝에 철제문 잠금이 풀린다.</p>',
    },
    mapflip: {
      type: 'keypad', len: 4, answer: '2408',
      loc: '7층 · 시설관리실', title: '두 도면 겹치기',
      prompt: '<p>투명 카메라 도면을 조명 배치도 위에 올린다. 카메라 점(●)이 닿는 칸의 숫자를 <b>북동쪽(오른쪽 위)부터 시계 방향</b>으로 읽는다. 배전반 문에는 “좌우를 뒤집어 읽을 것”이라고 적혀 있었다.</p><p class="note">읽은 네 자리는 보안실 키패드 번호다. 여기서 맞는지 확인해 두자.</p>',
      pre: [{ type: 'overlay', overlayLabel: '필름 겹치기', layers: [
        { name: '조명 배치도 (설치면)', grid: [['2', '5', '8'], ['9', '1', '6'], ['4', '7', '0']], flippable: true },
        { name: '투명 카메라 도면', film: true, mask: true, grid: [['●', '.', '●'], ['.', '.', '.'], ['●', '.', '●']] },
      ] }],
      wrong: { '8042': '설치면 그대로 읽었다. 방에서 보는 방향으로 뒤집어야 한다.', '8024': '시작 위치나 방향을 다시 보자.' },
      hints: ['조명 배치도는 천장 위에서 본 그림입니다. “좌우 뒤집기”를 누른 뒤 필름을 겹치세요.', '뒤집으면 윗줄이 8 5 2, 아랫줄이 0 7 4가 됩니다. 카메라 점은 네 모서리에 닿습니다.', '오른쪽 위 2 → 오른쪽 아래 4 → 왼쪽 아래 0 → 왼쪽 위 8. 정답은 2408입니다.'],
      okTitle: '도면 판독', okText: '<p>네 숫자가 또렷해졌다. <b class="mono">2408</b>. 보안실 문 키패드에 넣으면 될 것이다.</p>',
    },
    secPad: {
      type: 'keypad', len: 4, answer: '2408',
      loc: '7층 · 보안실 앞', title: '보안실 잠금',
      prompt: '<p>잠금 화면에 문구가 떠 있다.</p><div class="screen-text">카메라 배치와 조명 설치면을 교차하라.</div>',
      hints: ['문서보관실의 카메라 도면과 시설관리실의 조명 배치도가 필요합니다.', '조명 배치도를 조사한 뒤 카메라 도면을 들고 다시 눌러 겹쳐 보세요.', '정답은 2408입니다.'],
      okText: '<p>보안실 문이 열린다. 모니터 불빛이 복도로 쏟아진다.</p>',
    },
    kCheck: {
      type: 'phrase', loc: '7층 · 보안실 / K 카드 검증', title: 'K 카드 모순의 원인',
      prompt: '<p>23:48 K의 원본 카드는 8층 서버실 바닥에 있었다(순찰 수기). 1분 뒤 같은 번호가 지하 리더에 찍혔다. 엘리베이터 운행 기록상 1분 이동은 불가능하다.</p><p>사람의 순간이동보다 가정이 가장 적은 설명은?</p>',
      tiles: ['복제', '분실', '카드', '시계', '오류', '순간이동'],
      answer: [['복제', '카드']],
      check: (w) => (w.includes('시계') ? '시계 오차 3분으로는 층을 바꿀 수 없다.' : w.includes('분실') ? '원본 카드는 8층에 그대로 있었다.' : '같은 번호가 두 물리 매체에 있다는 뜻의 말을 찾아보자.'),
      hints: ['사람이 아니라 카드 번호가 둘입니다.', '원본과 같은 번호를 가진 두 번째 카드를 무엇이라 부를까요?', '“복제” + “카드”입니다.'],
      reward: ['E2-05'], okText: '<p>리더 원시값의 카드 일련번호는 다르지만 표시 사원번호만 같다. 복제된 것은 플라스틱이 아니라 시스템이 읽는 신원 값이다.</p>',
    },
    meCheck: {
      type: 'dial', loc: '7층 · 보안실 / 내 카드 검증', title: '동시 출현 시각',
      prompt: '<p>UPS 카메라 원본 프레임에 내가 비상 키를 들고 8층 복도에 서 있다. 화면 속 아날로그 시계도 함께 찍혀 위치가 고정된다.</p><p>지하 리더가 내 번호를 읽은 바로 그 시각은?</p>',
      cols: [{ label: '시', opts: ['23', '00', '01'] }, { label: '분 (10)', opts: ['0', '1', '2', '3', '4', '5'] }, { label: '분 (1)', opts: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'] }],
      seps: [':', ''], answer: ['00', '0', '2'],
      hints: ['모니터 열두 대의 표와 순찰 수기를 비교하세요.', '내 카드 행에서 8층 영상과 지하 카드 로그의 시각이 같습니다.', '정답은 00:02입니다.'],
      reward: ['E2-06'], okText: '<p>영상 원본의 프레임 해시와 UPS 점검기 사진 시각이 일치한다. 지하 기록보다 독립 근거가 두 개다.</p>',
    },
    timeCheck: {
      type: 'keypad', len: 1, answer: '3',
      loc: '7층 · 보안실 / 생성 시각 검증', title: '기록 생성 시각 차이',
      prompt: '<p>CCTV 파일 헤더는 00:11, 카드 서버 반영은 00:14. 수기에는 보안 서버가 벽시계보다 일정하게 빠르다고 적혀 있다.</p><p>두 시각의 차이가 보정값과 정확히 같다면, 카드 기록은 영상을 본 뒤 다시 쓰였을 수 있다. 차이는 몇 분인가?</p>',
      hints: ['분 단위끼리 뺍니다.', '14에서 11을 빼세요.', '정답은 3입니다.'],
      reward: ['E2-07'], okText: '<p>카드 로그가 먼저 생기고 영상이 뒤따른 것이 아니다. 영상 파일이 만들어진 뒤 그 시각에 맞춰 카드 기록이 반영됐다.</p>',
    },
    board: {
      type: 'phrase', loc: '7층 · 보안실 사건 보드', title: 'Act 2 공통 결론',
      prompt: '<p>서로 다른 두 사람의 번호가 동시에 복제됐고, 카드 로그는 CCTV가 만들어진 뒤 과거 시각으로 반영됐다. 보드의 빈칸은 범인 이름이 아니라 세 모순이 공통으로 가리키는 <b>행위</b>를 요구한다.</p>',
      tiles: ['윤서진의', 'K의', '기록', '시스템', '조작', '오류', '장애'],
      answer: [['기록', '조작']],
      check: (w) => (w.some((x) => x.endsWith('의')) ? '인물 이름은 정답이 아니다. 행위를 적자.' : w.includes('오류') || w.includes('장애') ? '오류라면 시각이 정확히 보정값만큼 맞춰질 리 없다.' : '값과 시각이 사후에 바뀌었다. 무엇이 바뀌었나?'),
      hints: ['K나 윤서진 같은 인물명은 정답이 아닙니다.', '여러 시스템의 값과 시각이 사후에 바뀌었습니다.', '“기록” + “조작”입니다.'],
      finish: true,
    },
  },

  objectives: [
    { text: '문서보관실 문 열기', done: (g) => g.solved('extension'), hint: ['도어폰 옆 당직표와 내선표, 비상시계를 보세요.', '지금 시각의 당직 조와 구역 코드가 모두 맞는 내선을 고르세요.'] },
    { text: '문서보관실·휴게실에서 독립 기록 모으기', done: (g) => g.has('film') && g.has('E2-04'), hint: ['문서보관실의 서가와 서류철, 야간 휴게실의 전자레인지 위를 보세요.'] },
    { text: '보안실 문 열기', done: (g) => g.solved('secPad'), hint: ['시설관리실의 조명 배치도에 카메라 도면을 들고 써 보세요.', '배전반 문 메모: 좌우를 뒤집어 읽을 것.'] },
    { text: '보안실에서 세 모순 검증하기', done: (g) => g.hadAll(['E2-05', 'E2-06', 'E2-07']), hint: ['모니터 표를 먼저 읽고, 아래쪽 단말 세 대를 하나씩 검증하세요.', '순찰 수기(E2-04)가 있어야 비교할 수 있습니다.'] },
    { text: '사건 보드에 공통 결론 적기', done: (g) => g.solved('board'), hint: ['보안실 오른쪽 위 사건 보드를 누르세요.'] },
  ],

  ending: {
    title: '기록 조작',
    html: '<p>모니터가 검증 결과를 받아들이자 지하 화물 엘리베이터가 원격 호출된다. 스피커로 K의 녹음이 이어진다.</p><blockquote>“복제된 건 카드가 아니라 사원번호야. 누군가의 이름을 지우고 다른 번호를 덮는 게 MIRROR의 첫 기능이었어.”</blockquote><p>윤서진의 이름이 원장에 남아 있지만, 그가 조작자라는 증거는 없다. 사람을 고르는 대신 조작된 기록의 구조만 확정한다.</p>',
    branch: '7314',
    summary: '세 종류의 교차 검증으로 사원번호 복제와 기록 시각 재작성을 확인했다. 이제 지하에서 복제 매체와 승인 주체를 찾아야 한다.',
  },
});
