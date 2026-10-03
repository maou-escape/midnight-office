/* 장면 6 · 06:07 건너편 24시간 카페 — 첨부 파일 */
MO.part({
  id: 'e2a1', ep: 2, time: '06:07', place: '건너편 24시간 카페', title: '첨부 파일',
  bgm: 'assets/audio/ep2-act1.mp3',
  intro: `
    <p>오전 6시 7분. 회사 길 건너 24시간 카페. 파일이 말한 창가 7번 테이블에는 아무도 없다. 마시다 만 커피와 빨간 봉투만 놓여 있다.</p>
    <p>휴대전화의 <b class="mono">인수인계.xlsx</b>는 눌러도 열리지 않는다. “외부 장치를 연결하세요”라는 말만 뜬다.</p>
    <p>“당신이 다음 차례예요.” 누가 보냈을까. 왜 나일까. 첫 봉투 겉면에 손글씨가 있다.</p>
    <blockquote>“나는 직접 만날 수 없어요. 이 테이블에 남긴 것만으로 나를 찾아 주세요.”</blockquote>
    <p class="note">물건 두 개를 합쳐 쓰려면, 하나를 “들고 쓰기”로 든 뒤 다른 하나를 누르세요.</p>`,
  goal: '<ul><li>열리지 않는 파일 <b>인수인계.xlsx</b>를 연다.</li><li>이 파일을 보낸 사람이 누구인지, 왜 나에게 보냈는지 알아낸다.</li></ul>',
  people: [
    { name: '최유리', role: '예전 기록관리팀 직원. 몇 년 전 화재 뒤 회사를 떠났다. (이 장면에서 정체가 밝혀진다)', card: false },
  ],
  terms: [
    { name: '떠넘기기 명단', role: '회사가 사고가 날 때마다 책임을 뒤집어씌울 직원을 미리 골라 적어 둔 명단.' },
  ],
  start: 'table',
  startItems: ['phone'],

  items: {
    phone: { name: '휴대전화', icon: '📱', desc: (g) => `<p>방금 받은 <b class="mono">인수인계.xlsx</b>. ${g.solved('circuit') ? '카드 리더를 연결했다. 이제 파일이 비밀 낱말을 묻는다.' : '열면 “외부 장치(카드 리더)를 연결하세요”라는 말만 뜬다.'}</p>`,
      action: { label: '파일 열기', run: (g) => {
        if (g.solved('keyword')) return { title: '인수인계.xlsx', html: '<p>파일은 이미 열렸다. 첫 시트에는 “두 번째 봉투를 여세요” 한 줄뿐이다.</p>' };
        if (!g.solved('circuit')) return { title: '인수인계.xlsx', html: '<div class="screen-text red">외부 장치를 연결하세요.\n(오래된 카드 리더)</div>' };
        return { puzzle: 'keyword' };
      } } },
    reader: { name: '낡은 카드 리더', icon: '🔌', desc: '<p>휴대전화에 꽂을 수 있는 오래된 카드 리더. 안쪽 회로판 덮개가 열려 있어서, 연결하려면 선을 이어 줘야 할 것 같다.</p>' },
    letter: { name: '이름 없는 편지', icon: '✉️', desc: '<div class="paper">이 파일을 받은 당신에게.\n\n파일에 적힌 작성자 이름을 믿지 마세요.\n나는 이 회사에서 한 번 지워진 사람이에요.\n당신도 곧 그렇게 될 거예요.\n\n편지 아랫부분의 글자판 위에 구멍 난 컵 홀더를 올려 보세요.\n구멍 옆 번호가 똑바로 서야 해요.</div><p class="note">편지 아래쪽에는 글자가 바둑판처럼 빽빽하게 적혀 있다.</p>' },
    sleeve: { name: '구멍 난 컵 홀더', icon: '☕', desc: '<p>종이컵 홀더에 구멍 네 개가 뚫려 있고, 구멍마다 ①②③④ 번호가 작게 찍혀 있다. 무언가 위에 겹쳐 쓰라는 것 같다.</p>' },
    msg10: { name: '구멍으로 읽은 낱말', icon: '🔎', desc: '<p>컵 홀더 구멍으로 네 글자가 보인다. <b>인 · 수 · 인 · 계</b></p>' },
    card42: { name: '자석 열쇠', icon: '🧲', desc: '<p>두 번째 봉투의 자물쇠를 연 자석.</p>' },
    card114: { name: '최유리의 기록 꼬리표', icon: '🎗️', desc: '<p>RM-CYR-114. 기록관리팀 최유리가 만든 기록에 붙던 꼬리표.</p>' },
    card62: { name: '저울 추', icon: '⚖️', desc: '<p>세 번째 봉투의 저울 잠금을 푼 추.</p>' },
    'E-01': { ev: true, code: 'E-01', name: '파일 만든 날', short: '2018.11.03, 화재 당일', desc: '<p>파일을 만든 날: <b class="mono">2018.11.03</b>. 성운물류센터 화재 당일이다. 나는 그때 아직 입사 전이었다(입사 2019.04.26).</p>' },
    'E-02': { ev: true, code: 'E-02', name: '표시된 작성자', short: '작성자: 19-0426-071(나)', desc: '<p>파일 작성자 칸: <b class="mono">19-0426-071</b>. 내 번호다. 나는 이 파일을 만든 적이 없다.</p>' },
    'E-03': { ev: true, code: 'E-03', name: '지워진 이름의 흔적', short: '작성자 칸 밑에 RM-CYR-114', desc: '<p>작성자 칸을 긁어내자 밑에 원래 꼬리표가 남아 있다. <b class="mono">RM-CYR-114</b>.</p>' },
    'E-04': { ev: true, code: 'E-04', name: '직원 꼬리표 목록', short: 'CYR-114 = 기록관리팀 최유리', desc: '<p>회사 직원 꼬리표 목록: RM은 기록관리팀, <b class="mono">CYR-114</b>는 <b>최유리</b>.</p>' },
    'E-05': { ev: true, code: 'E-05', name: '파일 변경 기록', short: '작성자 칸 하나만 바뀜', desc: '<div class="screen-text">변경된 칸: 작성자 1개 (원래 이름 → 19-0426-071)\n내용 · 만든 날: 바뀌지 않음</div><p class="note">파일 내용은 그대로이고, 작성자 칸만 다른 번호로 덮어썼다.</p>' },
    'E-06': { ev: true, code: 'E-06', name: '키오스크 음성 메모', short: '“다음 사람이 찾아야 해요”', desc: '<blockquote>“창가 7번 봉투, 손대지 말아 주세요. 내 이름이 남으면 지워져요. 다음 사람이 찾아야 해요.”</blockquote>' },
  },

  rooms: {
    table: {
      name: '24시간 카페 · 창가 7번 테이블',
      mood: { dark: 0.05, vignette: 0.55 },
      exits: [{ to: 'counter', label: '카운터' }],
      art: (g) => [
        { t: 'room', wall: '#2b2420', floor: '#1a1512', floorY: 600 },
        { t: 'window', x: 60, y: 60, w: 760, h: 420, dawn: true, buildings: 9,
          spot: { id: 'annex', label: '창밖 회사 건물', look: '<p>길 건너 회사 본관 8층에 다시 불이 켜져 있다. 옆 별관 건물은 깜깜하다. 별관 지하 주차장 셔터만 반쯤 올라가 있다.</p>' } },
        { t: 'ceilingLight', x: 980, y: 20, color: '#ffd9a8' },
        { t: 'table', x: 360, y: 640, w: 900, h: 220, top: '#7a5638' },
        { t: 'phone', x: 470, y: 560, on: true, r: -8 },
        { t: 'shape', x: 470, y: 560, w: 70, h: 110, fill: 'transparent', spot: { id: 'phoneSpot', label: '휴대전화', onLook: (g) => { g.say({ title: '휴대전화', html: g._item('phone').desc(g) + '<p class="note">소지품의 휴대전화를 눌러 파일을 열 수 있다.</p>' }); return false; } } },
        { t: 'cup', x: 640, y: 560, sleeve: g.has('sleeve') || g.flag('used:sleeve') ? '#efe9da' : '#9b6b43' },
        { t: 'shape', x: 630, y: 550, w: 80, h: 80, fill: 'transparent', spot: { id: 'cupSpot', label: '마시다 만 커피', give: ['sleeve'], look: '<p>누군가 마시다 두고 간 아메리카노. 아직 조금 따뜻하다. 컵 홀더를 빼 보니 작은 구멍 네 개가 뚫려 있다.</p>', show: (g) => !g.has('sleeve') && !g.flag('used:sleeve') } },
        { t: 'envelope', x: 760, y: 570, w: 120, h: 70, r: 6, color: '#a3262a', label: '1',
          when: !g.has('letter') && !g.flag('used:letter'),
          spot: { id: 'env1', label: '첫 번째 봉투', give: ['letter'], look: '<p>첫 봉투 안에 보낸 사람 이름 없는 편지가 들어 있다.</p>', show: (g) => !g.has('letter') && !g.flag('used:letter') } },
        { t: 'envelope', x: 920, y: 560, w: 130, h: 80, r: -4, color: '#7a1d20', label: '2', when: g.solved('keyword'),
          spot: { id: 'env2', label: '두 번째 봉투 (자석 자물쇠)', show: (g) => g.solved('keyword'), puzzle: 'maze', after: '<p>두 번째 봉투는 열려 있다.</p>' } },
        { t: 'box', x: 1080, y: 520, w: 150, h: 100, color: '#3a2c22', label: '인물 상자', when: g.solved('maze'),
          spot: { id: 'mysteryBox', label: '인물 상자', show: (g) => g.solved('maze'), puzzle: 'accuse', after: '<p>최유리의 카드 뒤가 갈라져 있다.</p>' } },
        { t: 'envelope', x: 1240, y: 560, w: 130, h: 80, r: 8, color: '#5a1418', label: '3', when: g.solved('accuse'),
          spot: { id: 'env3', label: '세 번째 봉투 (저울 자물쇠)', show: (g) => g.solved('accuse'), puzzle: 'balance', after: '<p>저울 자물쇠는 풀렸다.</p>' } },
        { t: 'vault', x: 1360, y: 400, w: 160, h: 150, label: '열쇠함', when: g.solved('balance'),
          spot: { id: 'keyBox', label: '열쇠함', show: (g) => g.solved('balance'), puzzle: 'decoder' } },
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
        { t: 'shape', x: 760, y: 340, w: 150, h: 90, fill: '#c8ccd4', rx: 8, spot: { id: 'kiosk', label: '주문 키오스크', give: ['E-06'], look: '<p>키오스크에 “음성 메모 1건”이 남아 있다. 눌러 보니 지친 여자 목소리가 나온다.</p><blockquote>“창가 7번 봉투, 손대지 말아 주세요. 내 이름이 남으면 지워져요. 다음 사람이 찾아야 해요.”</blockquote><p>남긴 시각 05:52. 이름은 비어 있다. 내가 오기 15분 전에 다녀간 사람이다.</p>' } },
        { t: 'box', x: 300, y: 360, w: 180, h: 70, color: '#8a6244', label: '분실물', spot: { id: 'lost', label: '분실물 바구니', give: ['reader'], look: '<p>분실물 바구니 맨 위에 낡은 카드 리더가 있다.</p><p>직원: “아, 그거요. 새벽에 오신 여자분이 창가 손님 오시면 드리라고 맡기고 가셨어요.”</p>', show: (g) => !g.has('reader') && !g.flag('used:reader') } },
        { t: 'chair', x: 1240, y: 480, color: '#3a2c22' },
        { t: 'board', x: 980, y: 110, w: 420, h: 220, lines: ['MENU', '아메리카노 · 4,000', '카페라테 · 4,500', '오늘의 쿠키 · 2,000'],
          spot: { id: 'staff', label: '카페 직원', look: '<p>직원이 하품을 참으며 말한다.</p><blockquote>“창가 자리 손님이요? 한 15분 전쯤 오셨다가 금방 가셨어요. 모자를 푹 눌러써서 얼굴은 못 봤고요. 분실물 바구니에 뭘 맡기고, 키오스크에 메모도 남기셨어요.”</blockquote>' } },
      ],
    },
  },

  puzzles: {
    circuit: {
      type: 'circuit', loc: '휴대전화 + 카드 리더', title: '카드 리더 선 잇기',
      prompt: '<p>카드 리더 회로판을 열자 끊긴 선 조각 아홉 칸이 보인다. 왼쪽 휴대전화(PHONE)에서 오른쪽 리더(READER)까지, 퓨즈 <b>①→②→③→④</b>를 순서대로 다 지나도록 칸을 돌려 이어야 한다. × 퓨즈를 지나면 타 버린다.</p>',
      tiles: [
        { shape: 'corner', fuse: '2', r: 0 }, { shape: 'straight', fuse: '3', r: 90 }, { shape: 'corner', fuse: '', r: 0 },
        { shape: 'corner', fuse: '1', r: 90 }, { shape: 'tee', fuse: 'x', r: 0 }, { shape: 'corner', fuse: '4', r: 180 },
        { shape: 'corner', fuse: '', r: 270 }, { shape: 'straight', fuse: 'x', r: 0 }, { shape: 'corner', fuse: '', r: 90 },
      ],
      start: 3, end: 5, order: '1234', startLabel: 'PHONE', endLabel: 'READER',
      hints: ['출발은 왼쪽 가운데, 도착은 오른쪽 가운데입니다. 가운데 × 칸은 지나면 안 됩니다.', '①에서 위로 올라가 윗줄(②, ③)을 지나, 오른쪽 위에서 아래로 내려와 ④로 갑니다.', '① 왼쪽·위, ② 아래·오른쪽, ③ 가로, 오른쪽 위 칸 왼쪽·아래, ④ 위·오른쪽.'],
      reward: ['E-05'],
      okTitle: '연결됨', okText: '<p>리더에 불이 들어오고 휴대전화와 연결된다. 화면에 파일의 변경 기록이 잠깐 스친다.</p><div class="screen-text">변경된 칸: 작성자 1개 (원래 이름 → 19-0426-071)</div><p>누군가 작성자 칸에 내 번호를 덮어썼다. 휴대전화로 파일을 다시 열어 보자. 이번엔 비밀 낱말을 묻는다.</p>',
    },
    grille: {
      type: 'grille', loc: '컵 홀더 + 편지', title: '구멍으로 글자 읽기',
      prompt: '<p>편지 아래쪽 글자판 위에 컵 홀더를 올린다. 홀더를 움직이고 돌려서, 구멍 ①②③④로 뜻이 통하는 낱말이 보이게 하자.</p>',
      grid: [
        ['원', '본', '을', '인', '계', '할'],
        ['때', '는', '인', '기', '수', '록'],
        ['보', '다', '안', '쪽', '을', '먼'],
        ['저', '보', '세', '인', '계', '요'],
        ['다', '음', '인', '수', '자', '는'],
      ],
      holes: [[0, 0, 1], [2, 0, 2], [1, 2, 3], [2, 2, 4]],
      x: 2, y: 1, r: 0, word: '인수인계', startX: 0, startY: 0, startR: 90,
      hints: ['편지에 “번호가 똑바로 서야 한다”고 적혀 있었습니다. 먼저 홀더를 0°로 돌리세요.', '0°일 때 ①은 왼쪽 위, ②는 오른쪽 위, ③④는 아랫줄입니다. 홀더를 오른쪽으로 두 칸, 아래로 한 칸 옮겨 보세요.', '구멍으로 “인·수·인·계”가 읽히면 됩니다.'],
      reward: ['msg10'],
      okTitle: '읽었다', okText: '<p>①부터 ④까지 읽자 <b>인 · 수 · 인 · 계</b>. 파일 이름과 같다. 비밀 낱말일 것이다.</p>',
      onSolve: (g) => { g.take('sleeve'); g.take('letter'); },
    },
    keyword: {
      type: 'phrase', loc: '인수인계.xlsx', title: '비밀 낱말',
      prompt: '<div class="screen-text">카드 리더 확인됨.\n이 문서는 무엇입니까? (네 글자)</div>',
      tiles: ['인', '수', '계', '인', '승', '기', '록', '원'],
      answer: [['인', '수', '인', '계']], placeholder: '글자를 순서대로 누르세요',
      check: (w) => (w.length !== 4 ? '네 글자여야 한다.' : '열리지 않는다. 컵 홀더 구멍으로 읽은 네 글자를 그대로 넣자.'),
      hints: ['컵 홀더와 편지를 합쳐 써 보세요.', '구멍으로 읽은 네 글자입니다.', '“인수인계”입니다.'],
      reward: ['E-01', 'E-02'],
      okTitle: '파일이 열렸다', okText: '<p>파일 정보가 먼저 뜬다.</p><div class="screen-text">만든 날: 2018.11.03\n작성자: 19-0426-071</div><p>성운물류센터 화재 당일이다. 나는 그때 이 회사에 들어오기도 전이었다. 그런데 작성자는 나로 돼 있다. 첫 시트에는 한 줄뿐이다.</p><blockquote>“작성자 칸을 믿지 마세요. 두 번째 봉투를 여세요.”</blockquote><p>테이블 위, 아까는 없던 두 번째 봉투가 보인다. 커피잔 밑에 깔려 있었다.</p>',
    },
    maze: {
      type: 'maze', loc: '두 번째 봉투', title: '미끄러지는 자석',
      prompt: '<p>두 번째 봉투의 쇠 걸쇠에 작은 자석 판이 달려 있다. 자석은 한 칸씩 움직이지 않고, <b>벽이나 막힌 칸에 닿을 때까지 쭉 미끄러진다</b>. A → B → C 순서로 지나서 EXIT에 닿으면 열린다.</p>',
      start: 20, exit: 4, walls: [3, 5, 6, 13, 21],
      seals: [{ id: 'A', at: 10 }, { id: 'B', at: 2 }, { id: 'C', at: 19 }], order: ['A', 'B', 'C'],
      hints: ['처음엔 위로 미세요. 시작점 오른쪽은 막혀 있습니다.', 'A에서 오른쪽으로 밀면 가운데 막힌 칸 앞에 멈춥니다. 거기서 위로 밀어 B를 지나세요.', '위, 오른쪽, 위, 아래, 오른쪽, 위. 마지막에 위로 밀면 C와 EXIT를 한 번에 지납니다.'],
      reward: ['card42', 'E-03', 'E-04'],
      okTitle: '두 번째 봉투', okText: '<p>걸쇠가 풀리고 봉투가 열린다. 안에 쪽지 두 장과 작은 인물 상자가 들어 있다.</p><div class="paper">① 작성자 칸을 긁어 보면 원래 꼬리표가 나와요: RM-CYR-114\n② 회사 직원 꼬리표 목록: RM = 기록관리팀, CYR-114 = 최유리</div><p>인물 상자 뚜껑: “이 파일을 정말 만든 사람, 이름을 숨긴 방법, 남긴 이유를 맞히고 증거 네 장을 넣어 주세요.”</p>',
    },
    accuse: {
      type: 'accuse', wide: true, loc: '인물 상자', title: '이 파일을 만든 사람',
      prompt: '<p>상자 안에 인물 카드 네 장. 카드마다 그 사람이 남긴 말이 적혀 있다.</p><div class="cards4"><div class="pcard"><em>경영지원팀 · 2019.04.26 입사</em><b>나</b><small>“작성자는 내 번호지만, 파일을 만든 날 나는 아직 입사 전이었다.”</small></div><div class="pcard"><em>전산팀 개발자</em><b>강 선배</b><small>“RM으로 시작하는 꼬리표는 기록관리팀 거야. 우리 전산팀 건 아니야.”</small></div><div class="pcard"><em>경영지원팀 과장</em><b>박 과장</b><small>“CYR? 그냥 암호 이름이겠지. 사람 이름일 리 없어.”</small></div><div class="pcard"><em>기록관리팀 · 화재 뒤 퇴사</em><b>최유리</b><small>“내 이름을 남기면, 파일째 지워져요.”</small></div></div>',
      fields: [
        { key: 'author', label: '누가 만들었나', answer: 'choi', why: '그날 회사에 있었고, 꼬리표 CYR-114와 이어지는 사람을 찾자.', options: [{ v: 'me', label: '나' }, { v: 'k', label: '강 선배' }, { v: 'park', label: '박 과장' }, { v: 'choi', label: '최유리' }] },
        { key: 'method', label: '어떻게 자기 이름을 숨겼나', answer: 'owner', why: '파일 변경 기록은 작성자 칸 하나만 바뀌었다고 말한다.', options: [{ v: 'clock', label: '컴퓨터 날짜를 2018년으로 바꿨다' }, { v: 'owner', label: '작성자 칸에 다른 사람 번호를 덮어썼다' }, { v: 'leak', label: '비밀번호를 밖으로 빼돌렸다' }, { v: 'scan', label: '종이 문서를 다시 스캔했다' }] },
        { key: 'motive', label: '왜 남겼나', answer: 'warn', why: '키오스크 음성 메모의 “다음 사람”이 이유를 말해 준다.', options: [{ v: 'frame', label: '나에게 누명을 씌우려고' }, { v: 'warn', label: '다음에 희생될 사람에게 미리 알리려고' }, { v: 'press', label: '언론에 회사를 폭로하려고' }, { v: 'hide', label: '회계 비리를 숨기려고' }] },
      ],
      evidence: ['E-01', 'E-02', 'E-03', 'E-04', 'E-05', 'E-06'],
      answerEv: ['E-03', 'E-04', 'E-05', 'E-06'],
      evWhy: '생각은 맞다. 하지만 넣은 증거가 “누가·어떻게·왜”를 모두 보여 주지 못한다.',
      hints: ['파일 만든 날과 내 입사일을 먼저 비교하세요. 카운터 키오스크의 음성 메모도 증거입니다.', '꼬리표 RM-CYR-114와 직원 꼬리표 목록을 이으면 이름이 나옵니다.', '최유리 / 작성자 칸 덮어쓰기 / 다음 희생자에게 알리기. 증거는 E-03·E-04(누가), E-05(어떻게), E-06(왜).'],
      reward: ['card114'],
      okTitle: '최유리', okText: '<p>증거 네 장을 넣자 최유리의 카드 뒤가 갈라진다. 안에 손으로 쓴 쪽지가 접혀 있다.</p><blockquote>“나는 최유리예요. 성운물류센터 화재 때 기록관리팀에 있었어요. 회사는 그날 경보를 끈 게 나라고 기록을 바꿨고, 나는 쫓겨났어요.</blockquote><blockquote>나가기 전에 회사 서버에서 <b>‘떠넘기기 명단’</b>을 봤어요. 사고가 날 때마다 대신 책임질 사람을 미리 적어 둔 명단이요. 거기 다음 칸에, 아직 입사도 안 한 사람의 사번이 적혀 있었어요. <b>19-0426-071.</b> 당신이요.</blockquote><blockquote>그래서 이 파일 작성자 칸에 당신 번호를 적었어요. 내 이름을 남기면 회사가 지워 버리니까. 그리고 그 번호가 ‘조사 중’으로 바뀌는 날, 파일이 자동으로 당신에게 가도록 걸어 뒀어요. 오늘이 그날이었던 거예요.”</blockquote><p>테이블 끝에 세 번째 봉투가 보인다.</p>',
    },
    balance: {
      type: 'balance', loc: '세 번째 봉투', title: '저울 자물쇠',
      prompt: '<p>세 번째 봉투 바닥에 작은 양팔 저울이 자물쇠를 붙잡고 있다. 추 여섯 개를 <b>최유리가 직접 남긴 것</b>과 <b>회사 시스템이 바꿔 쓴 것</b>으로 나누고, 양쪽 무게도 똑같이 맞춰야 한다.</p>',
      left: '왼쪽 · 최유리가 직접 남긴 것', right: '오른쪽 · 시스템이 바꿔 쓴 것',
      seals: [
        { id: 'rm', label: 'RM-CYR-114', note: '최유리 원래 꼬리표', w: 7 },
        { id: 'voice', label: '05:52 음성 메모', note: '키오스크에 남긴 말', w: 3 },
        { id: 'seal', label: '최유리 봉투', note: '이 테이블의 봉투', w: 1 },
        { id: 'owner', label: '덮어쓴 작성자 칸', note: '바뀐 칸', w: 5 },
        { id: 'hero', label: '19-0426-071', note: '대신 적힌 내 번호', w: 4 },
        { id: 'mirror', label: '미러 사본', note: '미러가 만든 복사본', w: 2 },
      ],
      answerL: ['rm', 'voice', 'seal'],
      hints: ['왼쪽은 최유리가 직접 남긴 것, 오른쪽은 시스템이 다른 이름으로 바꿔 쓴 것입니다.', '왼쪽: RM-CYR-114, 05:52 음성 메모, 최유리 봉투. 양쪽 홈(▮) 개수의 합도 같아야 합니다.', '왼쪽 7+3+1 = 오른쪽 5+4+2 = 11.'],
      reward: ['card62'],
      okTitle: '저울이 맞았다', okText: '<p>저울이 수평을 이루자 봉투 바닥에서 작은 열쇠함이 나온다. 안에는 찢긴 종이 네 조각과 열쇠 여섯 개가 있다.</p>',
    },
    decoder: {
      wide: true, loc: '열쇠함', title: '네 개의 열쇠',
      prompt: '<p>열쇠 머리에는 도형이, 뒤에는 숫자가 새겨져 있다. 찢긴 종이를 맞추면 어떤 열쇠를 어떤 순서로 써야 할지 나올 것이다.</p><div class="screen-text">◆ 3   ○ 0   ▲ 7   ■ 1   ★ 9   ✕ 4</div>',
      steps: [
        { type: 'fragments', label: '찢긴 종이 맞추기', prompt: '<p>조각을 이어 START에서 END까지 하나의 길로 만든다. 글씨가 모두 똑바로 서야 한다.</p>',
          pieces: [{ text: 'START ─ ◆', note: '조각 1' }, { text: '◆ ─ ○', note: '조각 2' }, { text: '○ ─ ▲', note: '조각 3' }, { text: '▲ ─ ■ END', note: '조각 4' }],
          startOrder: [2, 0, 3, 1], startRot: [90, 180, 270, 90], answer: [0, 1, 2, 3], okText: '길이 이어졌다: START → ◆ → ○ → ▲ → ■ → END' },
        { type: 'keypad', label: '열쇠 번호', len: 4, answer: '3071', prompt: '<p>길에 나온 도형 순서대로 열쇠를 골라, 뒤에 새겨진 숫자를 읽는다. 길에 없는 열쇠는 함정이다.</p><div class="screen-text">길: START → ◆ → ○ → ▲ → ■ → END</div>',
          wrong: { '3079': '★는 길에 없다.', '3074': '✕는 길에 없다.' } },
      ],
      hints: ['START 조각은 맨 왼쪽, END 조각은 맨 오른쪽입니다. 조각을 골라 ↻로 글씨를 바로 세우세요.', '조각 순서는 1→2→3→4, 모두 0°입니다.', '◆3 ○0 ▲7 ■1 → 3071.'],
      finish: true,
    },
  },

  objectives: [
    { text: '테이블과 카운터에서 남겨진 물건 모으기', done: (g) => g.count(['reader', 'letter', 'sleeve']) === 3, hint: ['테이블의 커피잔, 첫 번째 봉투, 그리고 카운터의 분실물 바구니를 보세요.'] },
    { text: '휴대전화에 카드 리더 연결하기', done: (g) => g.solved('circuit'), hint: ['휴대전화를 “들고 쓰기”로 든 뒤 소지품의 카드 리더를 누르세요.'] },
    { text: '편지와 컵 홀더로 비밀 낱말 찾기', done: (g) => g.solved('grille'), hint: ['컵 홀더를 들고 편지를 누르세요.'] },
    { text: '인수인계.xlsx 열기', done: (g) => g.solved('keyword'), hint: ['소지품의 휴대전화를 누르고 “파일 열기”를 고르세요.'] },
    { text: '두 번째 봉투 열기', done: (g) => g.solved('maze'), hint: ['테이블 위 빨간 두 번째 봉투를 누르세요.'] },
    { text: '이 파일을 만든 사람 찾기', done: (g) => g.solved('accuse'), hint: ['카운터 키오스크에 음성 메모(E-06)가 있습니다.', '증거 파일(🗂️)에서 E-01~E-06을 다시 읽어 보세요.'] },
    { text: '세 번째 봉투의 저울 맞추기', done: (g) => g.solved('balance'), hint: ['최유리가 남긴 것과 시스템이 바꿔 쓴 것으로 나누고, 홈 개수의 합을 같게 맞추세요.'] },
    { text: '열쇠함 열기', done: (g) => g.solved('decoder'), hint: ['열쇠함을 누르세요. 찢긴 종이부터 맞춥니다.'] },
  ],

  ending: {
    title: '다음 차례',
    seal: '3071',
    html: '<p>열쇠를 꽂자 파일의 마지막 시트가 열린다. 시트에는 표 한 줄만 있다. 최유리가 그날 몰래 찍어 둔 화면이다.</p><div class="screen-text red">떠넘기기 명단 · 8번 줄\n대상: 19-0426-071\n상태: 오늘 06:30 확정 예정\n원본 보관: 별관 지하 문서실</div><p>6시 30분이 되면, 오늘 밤 원본 삭제의 책임이 공식적으로 나에게 넘어간다. 바깥에 보낸 증거가 있어도, 회사는 “명단에 따라 처리했다”고 버틸 것이다.</p><p>휴대전화가 울린다. 처음 듣는 목소리지만, 누군지 알 것 같다.</p><blockquote>“윤서진이에요. 보내 준 자료 받았어요. 별관 지하 문서실로 와요. 그 명단 원본이 거기 있어요. 6시 30분 전에 멈춰야 해요.”</blockquote>',
    learned: ['파일을 보낸 사람은 <b>최유리</b>. 몇 년 전 화재의 책임을 뒤집어쓰고 쫓겨난 기록관리팀 직원이다.', '회사에는 사고마다 책임을 떠넘길 사람을 미리 적어 둔 <b>“떠넘기기 명단”</b>이 있다.', '그 명단 8번 줄에 <b>입사 전부터 내 번호</b>가 적혀 있었고, <b>오늘 06:30에 확정</b>된다.'],
    summary: '파일을 보낸 건 최유리. 떠넘기기 명단 8번 줄에 입사 전부터 내 번호가 있었고, 06:30에 확정된다.',
  },
});

/* 조합: 휴대전화 + 카드 리더 → 선 잇기, 컵 홀더 + 편지 → 구멍으로 읽기 */
(function () {
  const ch = MO.byId.e2a1;
  ch.items.phone.combine = { reader: (g) => (g.solved('circuit') ? { html: '<p>이미 연결돼 있다.</p>' } : { puzzle: 'circuit' }) };
  ch.items.reader.combine = { phone: ch.items.phone.combine.reader };
  ch.items.sleeve.combine = { letter: () => ({ puzzle: 'grille' }) };
  ch.items.letter.combine = { sleeve: ch.items.sleeve.combine.letter };
  ch.puzzles.circuit.onSolve = (g) => g.take('reader');
})();
