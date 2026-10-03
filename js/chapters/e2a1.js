/* Episode 2 · Act 1 첨부 파일 — 06:07 회사 건너편 24시간 카페 */
MO.chapter({
  id: 'e2a1', ep: 2, act: 1,
  epTitle: 'Episode 2. 인수인계', title: 'Act 1. 첨부 파일',
  kicker: '06:07 · 24시간 카페 창가 7번', tagline: '열리지 않는 Episode_2.xlsx',
  bgm: 'assets/audio/ep2-act1.mp3',
  premise: '모르는 번호가 보낸 Episode_2.xlsx는 열리지 않는다. 테이블 위에는 번호 카드, 봉인된 봉투, 출처를 알 수 없는 열쇠가 놓여 있다. 이번 사건에 필요한 정보는 모두 이 테이블 안에 있다.',
  intro: `
    <p>오전 6시 7분. 회사 건너편 24시간 카페.</p>
    <p>지난밤 나는 회사 기록의 작성자와 시각을 몰래 바꾸는 시스템 <b>MIRROR</b>를 밝혀냈다. 누명을 썼던 전 조사관 윤서진의 기록은 되찾았지만, 시스템을 만든 사람과 조작된 사건의 수는 아직 모른다.</p>
    <p>그때 모르는 번호가 파일 하나를 보냈다. <b class="mono">Episode_2.xlsx</b>. 첨부 파일은 열리지 않는다. 휴대전화 카메라로 테이블을 비추자 몇 군데에 붉은 번호가 떠오른다.</p>
    <blockquote>“앞 사건의 답을 묻지 않습니다. 이 테이블에 남긴 것만으로 나를 찾으세요.”</blockquote>
    <p class="note">Episode 1을 하지 않아도 진행할 수 있습니다. 소지품 두 개를 차례로 누르면(하나를 “들고 쓰기” 한 뒤 다른 하나를 누르면) 조합할 수 있습니다.</p>`,
  start: 'table',
  startItems: ['phone'],

  items: {
    phone: { name: '#12 휴대전화', icon: '📱', desc: (g) => `<p>방금 도착한 <b class="mono">Episode_2.xlsx</b>. ${g.solved('circuit') ? '복구 키 신호가 닿았다. 이제 파일이 키워드를 묻는다.' : '파일을 누르면 “외부 복구 장치를 연결하십시오”라는 문구만 뜬다.'}</p>`,
      action: { label: '첨부 파일 열기', run: (g) => {
        if (g.solved('keyword')) return { title: 'Episode_2.xlsx', html: '<p>파일은 이미 열렸다. 셀은 비어 있고, 첫 시트에 “봉투 2를 여세요”라는 문장만 있다.</p>' };
        if (!g.solved('circuit')) return { title: 'Episode_2.xlsx', html: '<div class="screen-text red">외부 복구 장치를 연결하십시오.\n(규격: 구형 카드 리더)</div>' };
        return { puzzle: 'keyword' };
      } } },
    reader: { name: '#18 낡은 카드 리더', icon: '🔌', desc: '<p>커넥터 규격이 휴대전화와 맞는다. 안쪽에 복구 키 칩이 꽂혀 있다. 회로판 덮개가 열려 있어 연결하려면 손을 봐야 할 것 같다.</p>' },
    letter: { name: '#07 발신인 없는 편지', icon: '✉️', desc: '<div class="paper">기록관리실 인수 예정자에게.\n문장의 들여쓰기와 행간은 실수가 아닙니다.\n\n원본을 인계할 때는 표시된 이름보다 안쪽 기록을 먼저 보세요.\n기록을 수정한 사람은 원래 작성자와 다를 수 있습니다.\n다음 인수자는 사원번호가 생기기 전부터 지정돼 있었습니다.\n책임의 계보가 이어지는 곳에 두 번째 봉투가 있습니다.\n\n구멍 난 판을 겹칠 때는 번호가 바로 서야 합니다.\n— 원본을 남긴 사람</div>' },
    sleeve: { name: '#03 천공된 컵 슬리브', icon: '☕', desc: '<p>컵 슬리브에 3×3 칸 크기로 구멍 네 개가 뚫려 있고, 구멍마다 ①②③④ 번호가 작게 찍혀 있다. 아래에 종이를 겹치라는 표시가 있다.</p>' },
    msg10: { name: '#10 겹쳐 읽은 메시지', icon: '🔎', desc: '<p>슬리브의 구멍 사이로 네 글자만 남는다. <b>인 · 수 · 인 · 계</b></p>' },
    card42: { name: '#42 자석 봉인', icon: '🧲', desc: '<p>A→B→C 봉인을 통과해 봉투 2를 연 황동 자석.</p>' },
    card114: { name: '#114 최유리의 기록 띠', icon: '🎗️', desc: '<p>RM-CYR-114. 네 조각의 종이와 열쇠 순서를 잇는 색인 띠.</p>' },
    card62: { name: '#62 책임 저울 봉인', icon: '⚖️', desc: '<p>원본 기록과 덮어쓴 기록을 나눠 균형을 맞춘 봉인 추.</p>' },
    'E-01': { ev: true, code: 'E-01', name: '생성 시점', short: '2018.11.03 생성', desc: '<p>파일 속성: 생성 <b class="mono">2018.11.03</b>. 표시된 작성자(나)의 입사보다 1년 빠르다.</p>' },
    'E-02': { ev: true, code: 'E-02', name: '표시 작성자', short: '작성자 19-0426-071', desc: '<p>현재 작성자 표시는 <b class="mono">19-0426-071</b>. 내 사원번호다.</p>' },
    'E-03': { ev: true, code: 'E-03', name: '원본 꼬리표', short: '삭제 흔적 아래 RM-CYR-114', desc: '<p>삭제 흔적 아래에 <b class="mono">RM-CYR-114</b>가 남아 있다.</p>' },
    'E-04': { ev: true, code: 'E-04', name: '인사 색인', short: 'CYR-114 = 최유리', desc: '<p>인사 색인: <b class="mono">CYR-114</b>는 기록관리 담당자 최유리의 식별자다.</p>' },
    'E-05': { ev: true, code: 'E-05', name: '복구 로그', short: 'OWNER MASKED → 19-0426-071', desc: '<div class="screen-text">OWNER MASKED → 19-0426-071\n변경 필드: 작성자(Owner) 1개\n본문·생성일: 변경 없음</div><p class="note">파일 전체가 아니라 작성자 필드만 교체됐다.</p>' },
    'E-06': { ev: true, code: 'E-06', name: '음성 메모', short: '“다음 사람이 찾아야 해요”', desc: '<blockquote>“내 이름이면 지워져요. 다음 사람이 찾아야 해요.”</blockquote>' },
  },

  rooms: {
    table: {
      name: '24시간 카페 · 창가 7번 테이블',
      mood: { dark: 0.05, vignette: 0.55 },
      exits: [{ to: 'counter', label: '카운터' }],
      art: (g) => [
        { t: 'room', wall: '#2b2420', floor: '#1a1512', floorY: 600 },
        { t: 'window', x: 60, y: 60, w: 760, h: 420, dawn: true, buildings: 9,
          spot: { id: 'annex', label: '창밖 회사 별관', look: '<p>길 건너 회사 별관은 불이 꺼져 있다. 지하 주차장 입구 셔터만 반쯤 열려 있다.</p>' } },
        { t: 'ceilingLight', x: 980, y: 20, color: '#ffd9a8' },
        { t: 'table', x: 360, y: 640, w: 900, h: 220, top: '#7a5638' },
        { t: 'phone', x: 470, y: 560, on: true, r: -8 },
        { t: 'shape', x: 470, y: 560, w: 70, h: 110, fill: 'transparent', spot: { id: 'phoneSpot', label: '휴대전화', onLook: (g) => { g.say({ title: '#12 휴대전화', html: g._item('phone').desc(g) + '<p class="note">소지품의 휴대전화를 눌러 파일을 열 수 있다.</p>' }); return false; } } },
        { t: 'cup', x: 640, y: 560, sleeve: g.has('sleeve') || g.flag('used:sleeve') ? '#efe9da' : '#9b6b43' },
        { t: 'shape', x: 630, y: 550, w: 80, h: 80, fill: 'transparent', spot: { id: 'cupSpot', label: '종이컵', give: ['sleeve'], look: '<p>마시다 만 아메리카노. 컵 슬리브에 붉은 번호 <b class="mono">03</b>이 떠 있다. 슬리브를 벗기자 작은 구멍 네 개가 보인다.</p>', show: (g) => !g.has('sleeve') && !g.flag('used:sleeve') } },
        { t: 'envelope', x: 760, y: 570, w: 120, h: 70, r: 6, color: '#a3262a', label: '07',
          when: !g.has('letter') && !g.flag('used:letter'),
          spot: { id: 'env1', label: '봉투 1', give: ['letter'], look: '<p>첫 봉투 안에 발신인 없는 편지가 들어 있다. 붉은 번호 <b class="mono">07</b>.</p>', show: (g) => !g.has('letter') && !g.flag('used:letter') } },
        { t: 'envelope', x: 920, y: 560, w: 130, h: 80, r: -4, color: '#7a1d20', label: '2', when: g.solved('keyword'),
          spot: { id: 'env2', label: '봉투 2 · 자석 걸쇠', show: (g) => g.solved('keyword'), puzzle: 'maze', after: '<p>봉투 2는 열려 있다. 안의 증거 카드는 챙겼다.</p>' } },
        { t: 'box', x: 1080, y: 520, w: 150, h: 100, color: '#3a2c22', label: '추리 상자', when: g.solved('maze'),
          spot: { id: 'mysteryBox', label: '추리 상자', show: (g) => g.solved('maze'), puzzle: 'accuse', after: '<p>최유리의 인물 카드 뒤가 갈라져 있다.</p>' } },
        { t: 'envelope', x: 1240, y: 560, w: 130, h: 80, r: 8, color: '#5a1418', label: '3', when: g.solved('accuse'),
          spot: { id: 'env3', label: '봉투 3 · 책임 저울', show: (g) => g.solved('accuse'), puzzle: 'balance', after: '<p>저울 잠금은 풀렸다.</p>' } },
        { t: 'vault', x: 1360, y: 400, w: 160, h: 150, label: '열쇠함', when: g.solved('balance'),
          spot: { id: 'keyBox', label: '네 열쇠 보관함', show: (g) => g.solved('balance'), puzzle: 'decoder' } },
      ],
    },

    counter: {
      name: '24시간 카페 · 카운터',
      mood: { dark: 0.05, vignette: 0.55 },
      exits: [{ to: 'table', label: '창가 테이블' }],
      art: [
        { t: 'room', wall: '#2f2620', floor: '#1a1512', floorY: 620 },
        { t: 'shelf', x: 120, y: 90, w: 520, h: 300, rows: 3 },
        { t: 'counter', x: 80, y: 430, w: 1100, h: 190, top: '#5b4030', color: '#2a1f18' },
        { t: 'shape', x: 760, y: 340, w: 150, h: 90, fill: '#c8ccd4', rx: 8, spot: { id: 'kiosk', label: '주문 키오스크', give: ['E-06'], look: '<p>키오스크 화면에 “음성 주문 메모 1건”이 남아 있다. 재생하자 지친 여자 목소리가 흘러나온다.</p><blockquote>“창가 7번에 놓인 봉투, 손대지 말아 주세요. 내 이름이면 지워져요. 다음 사람이 찾아야 해요.”</blockquote><p>녹음 시각 06:07. 남긴 사람 이름은 비어 있다.</p>' } },
        { t: 'box', x: 300, y: 360, w: 180, h: 70, color: '#8a6244', label: '분실물', spot: { id: 'lost', label: '분실물 바구니', give: ['reader'], look: '<p>분실물 바구니 맨 위에 낡은 카드 리더가 있다. 붉은 번호 <b class="mono">18</b>이 붙어 있다.</p><p>직원: “새벽에 오신 분이 창가 손님 거라고 맡기고 가셨어요.”</p>', show: (g) => !g.has('reader') && !g.flag('used:reader') } },
        { t: 'chair', x: 1240, y: 480, color: '#3a2c22' },
        { t: 'board', x: 980, y: 110, w: 420, h: 220, lines: ['MENU', '아메리카노 · 4,000', '카페라테 · 4,500', '오늘의 쿠키 · 2,000'],
          spot: { id: 'staff', label: '카페 직원', look: '<p>직원은 하품을 참으며 말한다.</p><blockquote>“창가 테이블이요? 아무도 아무것도 두고 간 사람은 없었는데… 아, 분실물 바구니에 하나 맡기고 가셨어요. 키오스크에 음성 메모도 남기셨고요.”</blockquote>' } },
      ],
    },
  },

  puzzles: {
    circuit: {
      type: 'circuit', loc: '휴대전화 + 카드 리더', title: '복구 키 접속 회로',
      prompt: '<p>리더 회로판을 휴대전화에 맞대자 끊긴 회로 아홉 칸이 나타난다. 왼쪽 PHONE에서 오른쪽 READER까지, 퓨즈 <b>①→②→③→④</b>를 순서대로 모두 지나게 이어야 한다. × 퓨즈를 지나면 타 버린다.</p>',
      tiles: [
        { shape: 'corner', fuse: '2', r: 0 }, { shape: 'straight', fuse: '3', r: 90 }, { shape: 'corner', fuse: '', r: 0 },
        { shape: 'corner', fuse: '1', r: 90 }, { shape: 'tee', fuse: 'x', r: 0 }, { shape: 'corner', fuse: '4', r: 180 },
        { shape: 'corner', fuse: '', r: 270 }, { shape: 'straight', fuse: 'x', r: 0 }, { shape: 'corner', fuse: '', r: 90 },
      ],
      start: 3, end: 5, order: '1234', startLabel: 'PHONE', endLabel: 'READER',
      hints: ['출발은 왼쪽 가운데, 도착은 오른쪽 가운데입니다. 가운데 줄의 갈림길(×)은 지나면 안 됩니다.', '①에서 위로 올라가 윗줄(②, ③)을 지난 뒤 오른쪽 위에서 아래로 내려와 ④로 갑니다.', '①은 왼쪽·위, ②는 아래·오른쪽, ③은 가로, 오른쪽 위는 왼쪽·아래, ④는 위·오른쪽으로 이어지게 돌리세요.'],
      reward: ['E-05'],
      okTitle: '회로 연결', okText: '<p>복구 키 신호가 휴대전화까지 닿는다. 화면에 짧은 로그가 스친다.</p><div class="screen-text">OWNER MASKED → 19-0426-071\n변경 필드: 작성자(Owner) 1개</div><p>파일은 마지막으로 “이 문서가 무엇인지” 묻는다. 휴대전화에서 첨부 파일을 다시 열어 보자.</p>',
    },
    grille: {
      type: 'grille', loc: '컵 슬리브 + 편지', title: '천공판 겹쳐 읽기',
      prompt: '<p>편지 위에 슬리브를 올린다. 판을 움직이고 돌려서 ①부터 ④까지 구멍에 뜻이 통하는 낱말이 나오게 하세요.</p>',
      grid: [
        ['원', '본', '을', '인', '계', '할'],
        ['때', '는', '인', '기', '수', '록'],
        ['보', '다', '안', '쪽', '을', '먼'],
        ['저', '보', '세', '인', '계', '요'],
        ['다', '음', '인', '수', '자', '는'],
      ],
      holes: [[0, 0, 1], [2, 0, 2], [1, 2, 3], [2, 2, 4]],
      x: 2, y: 1, r: 0, word: '인수인계', startX: 0, startY: 0, startR: 90,
      hints: ['편지 끝에 “번호가 바로 서야 한다”고 적혀 있습니다. 먼저 판을 0°로 돌리세요.', '0°에서 ①은 왼쪽 위, ②는 오른쪽 위, ③④는 아랫줄에 있습니다. 판을 오른쪽으로 두 칸, 아래로 한 칸 옮겨 보세요.', '구멍으로 “인·수·인·계”가 읽히면 됩니다.'],
      reward: ['msg10'],
      okTitle: '천공판 해독', okText: '<p>①부터 ④까지 읽자 <b>인 · 수 · 인 · 계</b>가 된다. 파일의 키워드일 것이다.</p>',
      onSolve: (g) => { g.take('sleeve'); g.take('letter'); },
    },
    keyword: {
      type: 'phrase', loc: 'Episode_2.xlsx', title: '첨부 파일 키워드',
      prompt: '<div class="screen-text">복구 키 확인됨.\n이 문서는 무엇입니까? (네 글자)</div>',
      tiles: ['인', '수', '계', '인', '승', '기', '록', '원'],
      answer: [['인', '수', '인', '계']], placeholder: '글자를 순서대로 누르세요',
      check: (w) => (w.length !== 4 ? '네 글자여야 한다.' : '파일이 열리지 않는다. 겹쳐 읽은 종이에 남은 네 글자를 그대로 넣자.'),
      hints: ['컵 슬리브와 편지를 조합해 보세요.', '천공판 구멍으로 읽은 네 글자입니다.', '“인수인계”입니다.'],
      reward: ['E-01', 'E-02'],
      okTitle: 'Episode_2.xlsx 봉인 해제', okText: '<p>키워드를 받아들이자 엑셀 창 대신 파일 속성 두 줄이 뜬다.</p><div class="screen-text">생성: 2018.11.03\n작성자: 19-0426-071</div><p>내 입사보다 1년 빠른 파일에 내 번호가 작성자로 찍혀 있다. 그리고 첫 시트에 단 한 문장.</p><blockquote>“표시된 작성자를 믿지 마세요. 봉투 2를 여세요.”</blockquote><p>테이블 위에 아까는 없던 두 번째 봉투가 놓여 있다.</p>',
    },
    maze: {
      type: 'maze', loc: '봉투 2 · 외부 잠금', title: '멈추지 않는 자석',
      prompt: '<p>봉투 2의 철제 걸쇠에 자석 미로가 달려 있다. 자석은 한 칸씩 움직이지 않고 <b>벽이나 장애물 앞까지 미끄러진다</b>. A→B→C 봉인을 순서대로 지나 EXIT에 도착해야 한다.</p>',
      start: 20, exit: 4, walls: [3, 5, 6, 13, 21],
      seals: [{ id: 'A', at: 10 }, { id: 'B', at: 2 }, { id: 'C', at: 19 }], order: ['A', 'B', 'C'],
      hints: ['첫 이동은 위쪽입니다. 시작점 오른쪽은 막혀 있습니다.', 'A에서 오른쪽으로 밀면 가운데 장애물 앞에 멈춥니다. 거기서 위로 밀어 B를 지나세요.', '위, 오른쪽, 위, 아래, 오른쪽, 위. 마지막 위쪽 이동에서 C와 EXIT를 함께 지납니다.'],
      reward: ['card42', 'E-03', 'E-04'],
      okTitle: '자석 봉인 해제', okText: '<p>세 봉인의 홈이 한 줄로 맞물리며 봉투가 열린다. 안에는 증거 카드 두 장과 네 사람의 인물 카드가 든 작은 상자가 있다.</p><div class="paper">E-03 원본 꼬리표: 삭제 흔적 아래 RM-CYR-114\nE-04 인사 색인: CYR-114 = 기록관리 담당 최유리</div><p>상자 뚜껑에 적혀 있다. “작성자, 방법, 남긴 이유를 모두 맞히고 그 판단을 잇는 증거 네 장을 제출하세요.”</p>',
    },
    accuse: {
      type: 'accuse', wide: true, loc: '추리 상자', title: '사라진 작성자',
      prompt: '<div class="cards4"><div class="pcard"><em>19 · 감사팀 · 2019년 입사</em><b>나</b><small>“내 번호지만, 이 파일이 만들어질 때 나는 이 회사에 없었다.”</small></div><div class="pcard"><em>K · MIRROR 개발 책임자</em><b>K</b><small>“기록관리 접두어 RM은 개발팀이 쓰는 코드가 아니야.”</small></div><div class="pcard"><em>P · 감사팀 전임 책임자</em><b>박 과장</b><small>“CYR은 암호화 규격이야. 사람 이름일 리 없어.”</small></div><div class="pcard"><em>CY · 기록관리 담당 · 퇴사</em><b>최유리</b><small>“내 이름을 남기면 파일째 없어져요.”</small></div></div>',
      fields: [
        { key: 'author', label: '누가 만들었나', answer: 'choi', why: '생성 당시 회사에 있었고 CYR-114와 연결되는 인물을 찾자.', options: [{ v: 'me', label: '나' }, { v: 'k', label: 'K' }, { v: 'park', label: '박 과장' }, { v: 'choi', label: '최유리' }] },
        { key: 'method', label: '어떻게 이름을 숨겼나', answer: 'owner', why: '복구 로그는 파일 전체가 아니라 작성자 필드만 바뀌었다고 말한다.', options: [{ v: 'clock', label: 'PC 시간을 2018년으로 변경' }, { v: 'owner', label: '작성자 필드를 다른 번호로 덮어쓰기' }, { v: 'leak', label: '암호를 외부로 유출' }, { v: 'scan', label: '종이 문서를 다시 스캔' }] },
        { key: 'motive', label: '왜 남겼나', answer: 'warn', why: '음성 메모의 “다음 사람”이 동기를 설명한다.', options: [{ v: 'frame', label: '나에게 죄를 뒤집어씌우기' }, { v: 'warn', label: '다음 대체 책임자에게 경고하기' }, { v: 'press', label: '언론에 회사를 폭로하기' }, { v: 'hide', label: '회계 비리를 숨기기' }] },
      ],
      evidence: ['E-01', 'E-02', 'E-03', 'E-04', 'E-05', 'E-06'],
      answerEv: ['E-03', 'E-04', 'E-05', 'E-06'],
      evWhy: '논리는 맞지만 제출한 증거가 작성자·방법·동기를 모두 직접 증명하지 못한다.',
      hints: ['표시된 작성자(나)의 입사 시점과 파일 생성 시점을 먼저 비교하세요. 카운터 키오스크의 음성 메모도 증거입니다.', 'RM-CYR-114의 가운데 세 글자와 인사 색인을 연결하세요.', '최유리 / 작성자 필드 덮어쓰기 / 다음 대체 책임자에게 경고. 증거는 E-03·E-04(작성자), E-05(방법), E-06(동기).'],
      reward: ['card114'],
      okTitle: '지목 일치', okText: '<p>네 장의 증거를 상자에 넣자 최유리의 인물 카드 뒤가 갈라진다. 안에서 색인 띠와 네 조각으로 찢긴 종이가 떨어진다.</p><blockquote>“당신의 번호를 쓴 건 누명을 씌우려던 게 아닙니다. 나를 지운 시스템이 아직 태어나지 않은 사람의 번호까지는 지울 수 없었으니까.”</blockquote><p>내 사원번호는 범인의 서명이 아니라 <b>미래로 보내는 주소</b>였다. 테이블 끝에 세 번째 봉투가 보인다.</p>',
    },
    balance: {
      type: 'balance', loc: '봉투 3 · 내부 잠금', title: '책임의 무게',
      prompt: '<p>봉투 바닥의 양팔 저울이 잠금을 붙잡고 있다. 여섯 봉인을 <b>원본(최유리가 직접 남긴 것)</b>과 <b>덮어쓴 기록(시스템이 다른 이름으로 만든 것)</b>으로 나누고, 양쪽 무게까지 같게 맞춰야 한다.</p>',
      left: '왼쪽 · 원본 / 남긴 기록', right: '오른쪽 · 덮어쓴 / 복제 기록',
      seals: [
        { id: 'rm', label: 'RM-CYR-114', note: '원본 꼬리표', w: 7 },
        { id: 'voice', label: 'VOICE 06:07', note: '남겨 둔 음성', w: 3 },
        { id: 'seal', label: 'ENVELOPE CY', note: '최유리의 봉인', w: 1 },
        { id: 'owner', label: 'OWNER MASKED', note: '덮어쓴 필드', w: 5 },
        { id: 'hero', label: '19-0426-071', note: '대체 작성자', w: 4 },
        { id: 'mirror', label: 'MIRROR COPY', note: '복제 기록', w: 2 },
      ],
      answerL: ['rm', 'voice', 'seal'],
      hints: ['왼쪽은 최유리가 직접 남긴 것, 오른쪽은 시스템이 다른 이름으로 만든 것입니다.', '왼쪽: RM-CYR-114, VOICE 06:07, ENVELOPE CY. 양쪽 홈의 합도 같아야 합니다.', '왼쪽 7+3+1 = 오른쪽 5+4+2 = 11.'],
      reward: ['card62'],
      okTitle: '책임 저울 해제', okText: '<p>원본 세 장과 복제 기록 세 장이 갈라지자 저울 아래에서 작은 열쇠함이 올라온다. 안에는 찢긴 경로 조각 네 장과 열쇠 여섯 개가 들어 있다.</p>',
    },
    decoder: {
      wide: true, loc: '네 열쇠 보관함', title: '네 개의 열쇠',
      prompt: '<p>열쇠함 안에는 찢긴 경로 조각 네 장과 열쇠 여섯 개가 있다. 열쇠 머리에는 도형이, 뒷면에는 숫자가 새겨져 있다.</p><div class="screen-text">◆ 3   ○ 0   ▲ 7   ■ 1   ★ 9   ✕ 4</div>',
      steps: [
        { type: 'fragments', label: '경로 조각 맞추기', prompt: '<p>조각을 이어 START에서 END까지 하나의 경로로 만든다. 글씨가 모두 바로 서야 한다.</p>',
          pieces: [{ text: 'START ─ ◆', note: 'PIECE 1' }, { text: '◆ ─ ○', note: 'PIECE 2' }, { text: '○ ─ ▲', note: 'PIECE 3' }, { text: '▲ ─ ■ END', note: 'PIECE 4' }],
          startOrder: [2, 0, 3, 1], startRot: [90, 180, 270, 90], answer: [0, 1, 2, 3], okText: '경로가 하나로 이어졌다: START → ◆ → ○ → ▲ → ■ → END' },
        { type: 'keypad', label: '분기 코드', len: 4, answer: '3071', prompt: '<p>경로가 지나간 도형 순서대로 열쇠를 꽂고, 뒷면 숫자를 읽어 입력한다. 경로에 없는 열쇠는 함정이다.</p><div class="screen-text">복원된 경로: START → ◆ → ○ → ▲ → ■ → END</div>',
          wrong: { '3079': '★는 경로에 없다.', '3074': '✕는 경로에 없다.' } },
      ],
      hints: ['START 조각은 맨 왼쪽, END 조각은 맨 오른쪽입니다. 조각을 골라 ↻로 글씨를 바로 세우세요.', '조각 순서는 PIECE 1→2→3→4, 회전은 모두 0°입니다.', '◆3 ○0 ▲7 ■1 → 3071.'],
      finish: true,
    },
  },

  objectives: [
    { text: '테이블과 카운터에서 붉은 번호 카드 모으기', done: (g) => g.count(['reader', 'letter', 'sleeve']) === 3, hint: ['테이블의 종이컵, 첫 봉투, 그리고 카운터의 분실물 바구니를 보세요.'] },
    { text: '휴대전화와 카드 리더를 연결하기', done: (g) => g.solved('circuit'), hint: ['휴대전화를 “들고 쓰기”로 든 뒤 소지품의 카드 리더를 누르세요.'] },
    { text: '편지와 컵 슬리브로 키워드 찾기', done: (g) => g.solved('grille'), hint: ['컵 슬리브를 들고 편지를 누르세요.'] },
    { text: '첨부 파일 열기', done: (g) => g.solved('keyword'), hint: ['소지품의 휴대전화를 누르고 “첨부 파일 열기”를 고르세요.'] },
    { text: '봉투 2의 자석 미로 풀기', done: (g) => g.solved('maze'), hint: ['테이블 위 붉은 봉투 2를 누르세요.'] },
    { text: '추리 상자에서 진짜 작성자 지목하기', done: (g) => g.solved('accuse'), hint: ['카운터 키오스크에 음성 메모(E-06)가 있습니다.', '수첩(✎)에서 모은 증거 여섯 장을 다시 읽어 보세요.'] },
    { text: '봉투 3의 책임 저울 맞추기', done: (g) => g.solved('balance'), hint: ['원본과 덮어쓴 기록으로 나누고, 홈 개수의 합을 같게 맞추세요.'] },
    { text: '네 열쇠로 분기 코드 열기', done: (g) => g.solved('decoder'), hint: ['열쇠함을 누르세요. 경로 조각부터 맞춥니다.'] },
  ],

  ending: {
    title: '분기 3071 — 별관 B1 문서수발실',
    html: '<p>코드가 들어가자 첨부 파일의 마지막 시트가 펼쳐진다. 셀은 하나도 없다. 대신 카페에서 회사 별관까지 이어지는 지하 통로 도면과, 오전 6시 30분에 붉게 표시된 문 하나가 나타난다.</p><div class="screen-text">CASE 07 / ORIGINAL STATUS: READY\nTARGET: 19-0426-071\nLOCATION: ANNEX B1 · DOCUMENT DISPATCH</div><p>최유리는 과거의 작성자였고, 나는 다음 작성자로 지정돼 있었다. 파일 제목의 “Episode 2”는 두 번째 보고서가 아니라 <b>두 번째 인수인계자</b>라는 뜻이었다.</p><p>카페 유리창 너머, 불 꺼진 회사 별관 지하에서 화물용 엘리베이터가 혼자 올라오기 시작한다.</p>',
    branch: '3071',
    summary: '파일의 실제 작성자는 기록관리 담당 최유리. 그는 자신의 이름을 지우고 아직 입사하지 않았던 내 사원번호를 작성자 자리에 덮어써, 미래의 대체 책임자만 이 파일을 추적하게 만들었다.',
  },
});

/* 조합: 휴대전화 + 카드 리더 → 회로, 컵 슬리브 + 편지 → 천공판 */
(function () {
  const ch = MO.byId.e2a1;
  ch.items.phone.combine = { reader: (g) => (g.solved('circuit') ? { html: '<p>이미 연결돼 있다.</p>' } : { puzzle: 'circuit' }) };
  ch.items.reader.combine = { phone: ch.items.phone.combine.reader };
  ch.items.sleeve.combine = { letter: (g) => ({ puzzle: 'grille' }) };
  ch.items.letter.combine = { sleeve: ch.items.sleeve.combine.letter };
  ch.puzzles.circuit.onSolve = (g) => g.take('reader');
})();
