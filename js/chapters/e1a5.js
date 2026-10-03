/* Episode 1 · Act 5 퇴근 — 05:20 5층 중앙통제실 */
MO.chapter({
  id: 'e1a5', ep: 1, act: 5,
  epTitle: 'Episode 1. 야근', title: 'Act 5. 퇴근',
  kicker: '05:20 · 5층 중앙통제실', tagline: '06:00 삭제 재개까지 40분',
  bgm: 'assets/audio/ep1-act5.mp3',
  premise: '06:00 삭제 재개까지 40분. 회사 공식본, K의 자료, 윤서진의 원본을 비교해 빠진 책임이 없는 전송 패키지를 만들고 두 외부 보관처로 동시에 보낸다.',
  intro: `
    <p>5층 중앙통제실 인증문 앞. 창밖 하늘 끝이 아주 조금 밝아지기 시작했다.</p>
    <p>인증문 화면이 앞선 네 층에서 남긴 분기 기록을 불러온다. 지금까지의 밤이 하나의 번호가 된다.</p>
    <p class="note">앞선 막을 하지 않았어도 인증문에 네 기록이 모두 표시됩니다.</p>`,
  start: 'authDoor',

  items: {
    'E5-01': { ev: true, code: 'E5-01', name: '회사 공식 보고서', desc: '<div class="paper">화재 → 센서 오작동\n8명 지급 → 정기 유지보수\n윤서진 → 자진 퇴사\n결재: 박 과장 · 작성 프로그램: MIRROR REPORTER\n근거 원본: 폐기 완료로 표시</div><p class="note">첨부 해시 어느 것도 WORM 원본과 일치하지 않는다. 비교 대상이지만 사실의 기준은 될 수 없다.</p>' },
    'E5-02': { ev: true, code: 'E5-02', name: 'K 책임 검증표', desc: '<p>“K는 내부고발 자료를 남겼으나 MIRROR 개발과 계정 도용 책임이 있다.” 선의와 책임을 함께 기록했다.</p>' },
    'E5-03': { ev: true, code: 'E5-03', name: '윤서진 조치 검증표', desc: '<p>“윤서진은 수정 전 원본을 WORM R-17에 보존했으며 강제 대기발령을 받았다.” 동기 추정은 뺐다.</p>' },
    'E5-04': { ev: true, code: 'E5-04', name: '사원번호 복제 검증표', desc: '<p>“19-0426-071은 행위자가 아니라 사원번호 복제와 책임 전가의 대상.”</p>' },
    'E5-05': { ev: true, code: 'E5-05', name: '비용 위장 검증표', desc: '<p>8건의 사고 관계자 지급을 외주비로 위장하고 박 과장이 결재한 사실을 원시 전표로 검증한 표.</p>' },
    'E5-06': { ev: true, code: 'E5-06', name: '외부 전송 영수증', desc: '<div class="screen-text">외부 감사기관 WORM 보관함 · 수신 완료 05:47:31\n언론사 봉인 보관함 · 수신 완료 05:47:33\n패키지 해시 · 양측 일치 / 회사 회수 권한 · 없음</div>' },
  },

  rooms: {
    authDoor: {
      name: '5층 · 중앙통제실 인증문',
      mood: { dark: 0.25, vignette: 0.8 },
      exits: [{ to: 'control', label: '중앙통제실', need: (g) => g.solved('auth'), locked: '<p>인증문이 닫혀 있다.</p>' }],
      art: (g) => [
        { t: 'room', wall: '#1b1f2a', floor: '#111318', tiles: true },
        { t: 'window', x: 80, y: 120, w: 360, h: 300, dawn: true },
        { t: 'door', x: 620, y: 170, w: 360, h: 470, label: '중앙통제실', color: '#2b3340', lamp: g.solved('auth') ? 'green' : 'red',
          spot: { id: 'controlDoor', label: '중앙통제실 문', goto: 'control', need: (g) => g.solved('auth'), locked: '<p>문 옆 인증 화면을 먼저 통과해야 한다.</p>' } },
        { t: 'monitor', x: 1090, y: 220, w: 300, h: 200, lines: ['BRANCH RECORDS', 'ACT 1 · 4180', 'ACT 2 · 7314', 'ACT 3 · 9042', 'ACT 4 · 6621', 'AUTH ____'],
          spot: { id: 'authScreen', label: '분기 인증 화면', puzzle: 'auth', after: '<p>인증 완료. 통제실 문이 열려 있다.</p>' } },
      ],
    },

    control: {
      name: '5층 · 중앙통제실',
      mood: { dark: 0.12, vignette: 0.7, tint: '#4fb3ff' },
      exits: [{ to: 'elevator', label: '1층행 엘리베이터', need: (g) => g.solved('package'), locked: '<p>패키지를 외부로 보내기 전에는 이 층을 떠날 수 없다.</p>' }],
      art: (g) => [
        { t: 'room', wall: '#141a24', floor: '#0d1015' },
        { t: 'screens', x: 120, y: 70, w: 1360, h: 220, cols: 6, rows: 2 },
        { t: 'text', x: 800, y: 320, text: '남은 시간 00:39:12 · 외부 감사기관 연결됨 · 언론사 보관함 연결 대기', fill: '#ff8a8a', size: 20 },
        { t: 'console', x: 60, y: 420, w: 280, h: 180, spot: { id: 'official', label: '회사 공식본 열람대', give: ['E5-01'], look: '<p>공식 사고 보고서가 열린다.</p><div class="paper">화재 → “센서 오작동”\n8명 지급 → “정기 유지보수”\n윤서진 → “자진 퇴사”\n결재: 박 과장 · 작성: MIRROR REPORTER\n근거 원본: 폐기 완료로 표시</div><p>첨부 해시 어느 것도 WORM 원본과 일치하지 않는다. 비교 대상이지만 사실의 기준은 될 수 없다.</p>' } },
        { t: 'console', x: 360, y: 420, w: 280, h: 180, spot: { id: 'kv', label: 'K 자료 검증대', puzzle: 'kVerify', after: '<p>K 책임 검증표를 패키지에 넣었다.</p>' } },
        { t: 'console', x: 660, y: 420, w: 280, h: 180, spot: { id: 'yv', label: '윤서진 자료 검증대', puzzle: 'yVerify', after: '<p>윤서진 조치 검증표를 패키지에 넣었다.</p>' } },
        { t: 'console', x: 960, y: 420, w: 280, h: 180, spot: { id: 'cv', label: '출입 신원 검증대', puzzle: 'cardVerify', after: '<p>사원번호 복제 검증표를 패키지에 넣었다.</p>' } },
        { t: 'vault', x: 1290, y: 400, w: 220, h: 220, label: '회계 전송함', spot: { id: 'invoice', label: '회계 전송함', puzzle: 'invoice', after: '<p>비용 위장 검증표를 패키지에 넣었다.</p>' } },
        { t: 'shape', x: 660, y: 640, w: 280, h: 60, fill: '#2a2f3b', rx: 10, spot: { id: 'pack', label: '패키지 조립대', puzzle: 'package', need: (g) => g.hadAll(['E5-01', 'E5-02', 'E5-03', 'E5-04', 'E5-05']),
          locked: (g) => `<p>여섯 사실의 봉인 태그를 만들려면 다섯 자료가 모두 필요하다. (${g.count(['E5-01', 'E5-02', 'E5-03', 'E5-04', 'E5-05'])}/5)</p><p class="note">어느 하나만 전송하면 다른 책임이 빠진다.</p>`, after: '<p>패키지는 이미 두 곳으로 전송됐다.</p>' } },
      ],
    },

    elevator: {
      name: '1층 · 출입문 로비',
      mood: { dark: 0.05, vignette: 0.6 },
      exits: [],
      art: [
        { t: 'room', wall: '#2a2f3a', floor: '#181a1f', tiles: true },
        { t: 'window', x: 200, y: 90, w: 1200, h: 470, dawn: true, buildings: 12 },
        { t: 'door', x: 700, y: 200, w: 200, h: 440, color: '#1b3a2c', glass: true, frame: '#3a4252' },
        { t: 'keypad', x: 940, y: 380, w: 90, h: 130, lamp: '#f5b14c', spot: { id: 'exitConsole', label: '출입문 최종 콘솔', pad: 16, puzzle: 'leave' } },
      ],
    },
  },

  puzzles: {
    auth: {
      type: 'keypad', len: 4, answer: '4341',
      loc: '5층 · 중앙통제실 인증문', title: '분기 인증',
      prompt: '<div class="screen-text">ACT 1 · 4180\nACT 2 · 7314\nACT 3 · 9042\nACT 4 · 6621</div><p>화면 아래 규칙: <b>n번째 액트 기록에서 n번째 숫자</b>를 취해 액트 순서대로 이어 붙인다.</p>',
      wrong: { '4790': '각 기록의 첫 숫자만 읽었다.', '0241': '각 기록의 마지막 숫자만 읽었다.' },
      hints: ['ACT 1은 첫째 숫자, ACT 2는 둘째 숫자를 고릅니다.', '4180의 1번째는 4, 7314의 2번째는 3, 9042의 3번째는 4입니다.', '6621의 4번째는 1. 정답은 4341입니다.'],
      okText: '<p>인증문이 열린다. 통제실 전면에 세 개의 보고서가 동시에 떠오른다. 회사 공식본은 “시설 오작동과 작업자 과실”, K 자료는 “MIRROR 오용”, 윤서진 원본은 “경보 차단과 사후 은폐”를 강조한다.</p><p>어느 하나만 보내면 다른 책임이 빠진다.</p>',
    },
    kVerify: {
      type: 'phrase', loc: '5층 · K 자료 검증대', title: 'K에게 남길 핵심 책임',
      prompt: '<p>K의 자료는 박 과장의 지시와 원본 보존 필요성을 자세히 적었지만, 한 문장을 지웠다.</p><div class="screen-text">삭제된 발급 원장: 작업 단말 K-DEV-04\n삭제된 정책 이력: MIRROR 최초 작성자 K\n남은 문장: “승인은 시스템이 자동 실행했다.”</div><p>자동 실행도 누군가 설계한 정책이다. K가 MIRROR를 설계·구현한 책임을 적는다.</p>',
      tiles: ['개발', '면책', '책임', '선의', '도용', '고발'],
      answer: [['개발', '책임']],
      check: (w) => (w.includes('면책') || w.includes('선의') ? '선의는 기록하되, 책임을 지우지는 않는다.' : w.includes('도용') ? '계정 도용도 사실이지만, 이 화면은 자동 정책의 기원을 묻는다.' : 'MIRROR 최초 작성자가 K라는 기록을 보자.'),
      hints: ['계정 도용도 사실이지만, 이 화면은 자동 정책이 어디서 왔는지 묻습니다.', 'MIRROR 최초 작성자가 K라는 기록을 보세요.', '“개발” + “책임”입니다.'],
      reward: ['E5-02'], okText: '<p>패키지에 “K는 내부고발 자료를 남겼으나 MIRROR 개발과 계정 도용 책임이 있다”가 추가된다.</p>',
    },
    yVerify: {
      type: 'phrase', loc: '5층 · 윤서진 자료 검증대', title: '윤서진이 검증 가능하게 한 행동',
      prompt: '<p>윤서진의 자료는 자신의 처분과 원본 이관을 기록했지만, 그가 직접 보지 못한 K의 동기까지 짐작한다. 추정은 빼고, R-17 명세와 자필 이관서가 <b>함께 보여 주는 윤서진의 행동</b>만 남긴다.</p>',
      tiles: ['강제', '원본', '대기발령', '보존', '폭로', '삭제'],
      answer: [['원본', '보존']],
      check: (w) => (w.includes('대기발령') ? '강제 대기발령은 윤서진이 당한 조치다. 그가 한 행동을 적자.' : w.includes('폭로') ? '윤서진은 공개하지 못했다. 남겨 두었을 뿐이다.' : '수정 전 자료를 WORM에 남긴 행동이다.'),
      hints: ['강제 대기발령은 윤서진이 당한 조치입니다.', '질문은 그가 자료에 한 행동을 묻습니다.', '“원본” + “보존”입니다.'],
      reward: ['E5-03'], okText: '<p>추정 문장은 빠지고 “윤서진은 수정 전 원본을 WORM R-17에 보존했으며 강제 대기발령을 받았다”만 남는다.</p>',
    },
    cardVerify: {
      type: 'phrase', loc: '5층 · 출입 신원 검증대', title: '출입 기록의 조작 대상',
      prompt: '<p>회사 공식본은 지하 출입자를 내 사원번호로 확정했다. 그러나 카드 일련번호, 8층 원본 영상, 발급 감사 원장은 <b>사람이 아니라 번호가 복제됐음</b>을 보여 준다. 전송문에 조작 대상을 정확히 쓴다.</p>',
      tiles: ['카드', '사원번호', '얼굴', '복제', '분실', '도난'],
      answer: [['사원번호', '복제']],
      check: (w) => (w.includes('카드') ? '카드 일련번호는 서로 달랐다. 같았던 것은 다른 값이다.' : w.includes('분실') || w.includes('도난') ? '내 카드는 내내 내 목에 걸려 있었다.' : '서로 다른 카드가 같은 직원 식별값을 표시했다.'),
      hints: ['내가 두 장소에 있었던 것이 아닙니다.', '서로 다른 카드 일련번호가 같은 직원 식별값을 표시했습니다.', '“사원번호” + “복제”입니다.'],
      reward: ['E5-04'], okText: '<p>전송문에 “19-0426-071은 행위자가 아니라 사원번호 복제와 책임 전가의 대상”이라는 문장이 추가된다.</p>',
    },
    invoice: {
      type: 'keypad', len: 3, answer: '883',
      loc: '5층 · 회계 전송함', title: '회계 전송함 비밀번호',
      prompt: '<p>위장 전표 여덟 장의 지급 상태를 확인한다. 일곱 장은 개인 수령, 마지막 한 장은 세 명의 공동 계좌로 나뉘었다.</p><table><tr><th>확인 항목</th><th>원시값</th></tr><tr><td>전표 서류 수</td><td>8장</td></tr><tr><td>지급 처리 건수</td><td>8건</td></tr><tr><td>마지막 공동계좌 수령자</td><td>3명</td></tr></table><p>비밀번호 규칙: <b>서류 수 / 지급 처리 건수 / 공동계좌 수령자 수</b>를 차례로 이어 쓴다.</p>',
      wrong: { '8710': '실제 수령 인원으로 다시 셌다. 규칙은 원시값 세 개를 그대로 쓰는 것이다.' },
      hints: ['첫 숫자는 전표 서류 8장입니다.', '두 번째는 지급 처리 8건입니다.', '마지막 공동계좌 수령자는 3명. 정답은 883입니다.'],
      reward: ['E5-05'], okText: '<p>전송함 내부 대조표에는 원시 필드 8·8·3이 그대로 남아 있다. 박 과장의 결재와 실제 수령 자료가 함께 패키지에 들어간다.</p>',
    },
    package: {
      type: 'keypad', len: 6, answer: '743543',
      loc: '5층 · 외부 전송 패키지 조립대', title: '누락 방지 봉인 코드',
      prompt: '<p>여섯 사실의 봉인 태그가 한 줄씩 나타난다. 각 태그에서 <b>굵게 강조된 숫자</b>만 순서대로 읽어 누락 방지 코드를 만든다. 사실의 순서는 바꾸지 않는다.</p><table><tr><th>순서</th><th>검증 사실</th><th>봉인 태그</th></tr><tr><td>1</td><td>화재 확정 · 경보 차단</td><td class="mono">C-1<b style="color:var(--accent-2)">7</b></td></tr><tr><td>2</td><td>MIRROR 기록 은폐</td><td class="mono">M-0<b style="color:var(--accent-2)">4</b></td></tr><tr><td>3</td><td>윤서진 강제 대기발령</td><td class="mono">P-<b style="color:var(--accent-2)">3</b>2</td></tr><tr><td>4</td><td>K 개발 · 도용 책임</td><td class="mono">K-<b style="color:var(--accent-2)">5</b>1</td></tr><tr><td>5</td><td>사원번호 책임 전가</td><td class="mono">U-0<b style="color:var(--accent-2)">4</b></td></tr><tr><td>6</td><td>합의금 비용 위장</td><td class="mono">L-<b style="color:var(--accent-2)">3</b>8</td></tr></table>',
      hints: ['각 행에서 굵은(노란) 숫자는 하나뿐입니다.', '위에서부터 7, 4, 3으로 시작합니다.', '전체 정답은 743543입니다.'],
      reward: ['E5-06'], okTitle: '이중 외부 전송',
      okText: '<p>봉인 코드가 승인되자 두 목적지 표시등이 동시에 켜진다.</p><div class="screen-text">외부 감사기관 WORM 보관함 · 수신 완료 05:47:31\n언론사 봉인 보관함 · 수신 완료 05:47:33\n패키지 해시 · 양측 일치\n회사 회수 권한 · 없음</div><p>06:00 삭제가 실행돼도 회사 밖의 두 독립 원본은 남는다. K도, 윤서진도, 나도 혼자서는 내용을 바꿀 수 없다.</p><p class="note">이제 1층으로 내려가자.</p>',
    },
    leave: {
      type: 'phrase', loc: '1층 · 출입문 최종 콘솔', title: '마지막 행동',
      prompt: '<p>엘리베이터가 1층에 닿는다. 유리문 너머 새벽 첫 버스가 젖은 도로를 지나간다. 출입 콘솔에는 처음 박 과장이 맡긴 업무명이 그대로 남아 있다.</p><div class="screen-text">업무: 폐기 서버 목록 대조\n상태: 원본 검증 및 외부 보존 완료\n사용자 행동 선택: ______</div><p>사건은 완전히 끝나지 않을 것이다. 감사도 조사도 이제 시작이다. 그래도 이 건물에서 오늘 밤 해야 할 행동은 하나 남았다.</p>',
      tiles: ['잔류', '퇴근', '자수', '삭제', '복귀'],
      answer: [['퇴근']],
      check: (w) => (w.includes('잔류') || w.includes('복귀') ? '목표는 새벽까지 건물에 남는 것이 아니다.' : w.includes('자수') ? '나는 책임 전가의 대상이었지 행위자가 아니었다.' : '이 막의 제목을 떠올려 보자.'),
      hints: ['목표는 새벽까지 건물에 남는 것이 아닙니다.', '이 막의 제목과 같습니다.', '정답은 “퇴근”입니다.'],
      finish: true,
    },
  },

  objectives: [
    { text: '분기 인증 통과하기', done: (g) => g.solved('auth'), hint: ['인증 화면의 규칙: n번째 기록에서 n번째 숫자.'] },
    { text: '다섯 자료를 검증해 패키지에 넣기', done: (g) => g.hadAll(['E5-01', 'E5-02', 'E5-03', 'E5-04', 'E5-05']), hint: ['통제실 아래쪽 단말 다섯 개를 하나씩 조사하세요.', '각 검증대는 “선의와 책임을 함께, 추정은 빼고”라는 원칙으로 적습니다.'] },
    { text: '봉인 코드로 외부 전송하기', done: (g) => g.solved('package'), hint: ['통제실 맨 아래 가운데 패키지 조립대를 누르세요.'] },
    { text: '1층 출입문에서 마지막 행동 고르기', done: (g) => g.solved('leave'), hint: ['아래쪽 “1층행 엘리베이터” 버튼으로 내려가 출입 콘솔을 누르세요.'] },
  ],

  ending: {
    title: '퇴근',
    html: '<p>사원증을 찍자 이번에는 초록불이 켜진다. 문이 열리고 축축한 새벽 공기가 얼굴을 스친다.</p><p>휴대전화가 신호를 되찾자 발신자 없는 파일 하나가 도착한다.</p><div class="screen-text">Episode_2.xlsx\n“삭제된 셀은 비어 있는 것이 아니다.”</div><p>뒤에서 건물 8층 조명이 다시 켜진다. 06:00. 하지만 원본은 이미 두 곳에 남았다. 나는 누구의 편도 아닌, <b>검증된 기록의 편</b>에 서서 건물을 나선다.</p>',
    branch: '5590',
    summary: '회사 공식본, K의 자료, 윤서진의 원본을 교차해 책임 누락 없는 패키지를 만들고 두 외부 보관처에 보냈다. 마침내 퇴근한다.',
  },
});
