/* Episode 1 · Act 4 원본 — 03:52 4층 감사 전용 구역 */
(function () {
  const sideRoom = (name, wall, extra) => ({
    name, mood: { dark: 0.22, vignette: 0.8 },
    exits: [{ to: 'hub', label: '원형 복도' }],
    art: [{ t: 'room', wall, floor: '#111316' }, { t: 'ceilingLight', x: 650, y: 30, color: '#e6ecff' }, ...extra],
  });

  MO.chapter({
    id: 'e1a4', ep: 1, act: 4,
    epTitle: 'Episode 1. 야근', title: 'Act 4. 원본',
    kicker: '03:52 · 4층 감사 전용 구역', tagline: '다섯 방의 원본이 함께 말하는 것',
    bgm: 'assets/audio/ep1-act4.mp3',
    premise: '회사 공식본, K의 고백, 윤서진의 보관 기록은 서로 다른 이해관계를 가진다. 다섯 장소의 수정 불가능한 자료가 함께 말하는 사실만 골라 사고를 복원한다.',
    intro: `
      <p>승강기 밖에는 창문 없는 원형 복도가 있다. 화재 수신기실, 영상 복원실, 인사 원본실, 회계 보관실, 통신 보존실이 서로 다른 키로 잠겨 있다.</p>
      <p>윤서진이 벽에 남긴 문장이 손전등 빛에 드러난다.</p>
      <blockquote>진술은 방향을 제시한다. 원본은 시각을 고정한다.<br>독립 기록 둘이 만나는 지점만 사실로 쓴다.</blockquote>
      <p>한 방의 자료만 보고는 결론을 내릴 수 없도록 설계된 공간이다.</p>`,
    start: 'hub',

    items: {
      'E4-01': { ev: true, code: 'E4-01', name: '화재 수신기 원지', desc: '<div class="paper">02:11:40 · 연기 센서 C-17 예비\n02:12:18 · 연기 센서 C-17 확정\n02:13:02 · 본사 회선 ACK 수신\n02:13:05 · 현장 경종 출력 차단</div><p class="note">네트워크에 연결되지 않은 독립 프린터의 감열지. 02:12 화재 확정, 02:13 본사 응답 직후 경종이 차단됐다.</p>' },
      'E4-02': { ev: true, code: 'E4-02', name: '수정 전 영상', desc: '<p>성운물류센터 작업자들이 경종 없이 연기를 발견하고 뛰기 시작한다. 02:15 현장 관리자가 수동 경보 버튼을 누르지만 회선은 이미 본사에서 잠겨 있다.</p><div class="screen-text">원본 프레임 해시: WORM 원장과 일치\n수정 이력: 03:04 · MIRROR-SVC · 02:12–02:20 구간 은폐</div>' },
      'E4-03': { ev: true, code: 'E4-03', name: '윤서진 인사 원본', desc: '<p>자진 퇴사가 아니라 강제 대기발령이었음을 보여 주는 카본 원본과 자필 이관서.</p><blockquote>나는 자진 퇴사하지 않는다. 원본을 WORM R-17에 이관한다. 이 문장이 사라지면 인사 원장과 봉인 해시를 비교하라.</blockquote>' },
      'E4-04': { ev: true, code: 'E4-04', name: '외주비 위장 전표', desc: '<div class="paper">계정: 외주 유지보수비 (C-17)\n실제 수령: 사고 관계자 8명\n결재: <b>박 과장</b>\n비고: 합의 문구 외부 노출 금지</div>' },
      'E4-05': { ev: true, code: 'E4-05', name: '본사 경보 차단 통화', desc: '<div class="paper">02:13:04 · 박 과장: “현장 경종부터 막아. 사고 확정 전까지 본사 승인 없이 울리면 안 돼.”\n02:13:09 · 관제 직원: “이미 연기 확정입니다.”\n02:13:12 · 박 과장: “기록은 점검으로 돌려. 내가 승인할게.”</div><p class="note">목소리만으로는 편집 의혹이 남지만, 독립된 화재 수신기 원지의 시각과 결과가 일치한다.</p>' },
    },

    rooms: {
      hub: {
        name: '4층 · 감사 자료실 원형 복도',
        mood: { dark: 0.3, vignette: 0.85 },
        exits: [
          { to: 'alarm', label: '화재 수신기실' }, { to: 'video', label: '영상 복원실' }, { to: 'personnel', label: '인사 원본실' },
          { to: 'ledger', label: '회계 보관실' }, { to: 'comms', label: '통신 보존실' },
        ],
        art: (g) => [
          { t: 'room', wall: '#1d2027', floor: '#111316', tiles: true },
          { t: 'ceilingLight', x: 680, y: 30, on: true, color: '#e6ecff' },
          ...[['화재', 'E4-01', 'alarm'], ['영상', 'E4-02', 'video'], ['인사', 'E4-03', 'personnel'], ['회계', 'E4-04', 'ledger'], ['통신', 'E4-05', 'comms']].map(([n, ev, to], i) => ({ t: 'door', x: 60 + i * 300, y: 250, w: 150, h: 390, label: n, color: '#323845', lamp: g.has(ev) ? 'green' : 'red', spot: { id: 'door-' + to, label: n + ' 문', goto: to } })),
          { t: 'text', x: 800, y: 150, text: '진술은 방향을 제시한다 · 원본은 시각을 고정한다', fill: '#9aa3b5', size: 26, mono: false },
          { t: 'shape', x: 1380, y: 120, w: 180, h: 110, fill: '#20252f', rx: 8, spot: { id: 'verdict', label: '최종 검증대', puzzle: 'verdict', need: (g) => g.hadAll(['E4-01', 'E4-02', 'E4-03', 'E4-04', 'E4-05']),
            locked: (g) => `<p>검증대 화면에 다섯 칸이 있다. 다섯 방의 원본을 모두 올려야 시간축이 완성된다.</p><div class="screen-text">${['화재 수신기 원지', '수정 전 영상', '인사 원본', '외주비 전표', '경보 차단 통화'].map((n, i) => `${g.has('E4-0' + (i + 1)) ? '✓' : '·'} ${n}`).join('\n')}</div>` } },
          { t: 'text', x: 1470, y: 190, text: 'VERIFY', fill: '#3dff8a', size: 20 },
        ],
      },
      alarm: sideRoom('4층 · 화재 수신기실', '#2a1d1d', [
        { t: 'panel', x: 460, y: 180, w: 680, h: 300, color: '#5a2b2b', inner: '#2a1414', label: '화재 수신기 · 독립 감열 프린터',
          spot: { id: 'alarmBox', label: '원지 보관함', puzzle: 'alarmTime', after: '<p>유리관 안의 원지는 이미 사진으로 남겼다.</p>' } },
        { t: 'paper', x: 700, y: 520, w: 200, h: 110, spot: { id: 'thermal', label: '감열지 원지', pad: 10, look: '<div class="paper">02:11:40 · 연기 센서 C-17 예비\n02:12:18 · 연기 센서 C-17 확정\n02:13:02 · 본사 회선 ACK 수신\n02:13:05 · 현장 경종 출력 차단</div><p>보관함 잠금은 화재를 처음 감지한 때가 아니라, <b>본사 회선이 신호를 받아 현장 경보가 차단되기 시작한 분</b>을 요구한다.</p>' } },
      ]),
      video: sideRoom('4층 · 영상 복원실', '#161b26', [
        { t: 'screens', x: 140, y: 110, w: 760, h: 360, cols: 3, rows: 2 },
        { t: 'console', x: 980, y: 420, w: 480, h: 200, spot: { id: 'videoConsole', label: '복원 콘솔', puzzle: 'videoCmd', after: '<p>복원된 영상은 저장장치에 다시 봉인했다.</p>' } },
        { t: 'monitor', x: 1000, y: 150, w: 440, h: 190, lines: ['RECOVER  일반 삭제 파일', 'MIRROR   작성자·시각 재작성 이력', 'RENDER   영상 프레임 손상', 'UNLOCK   암호화 컨테이너'], spot: { id: 'cmdList', label: '명령 목록', look: '<p>수정본 영상은 02:12부터 8분이 비어 있다. 파일 헤더에는 서명이 하나뿐이다.</p><table><tr><th>명령</th><th>대상 서명</th></tr><tr><td>RECOVER</td><td>일반 삭제 파일</td></tr><tr><td>MIRROR</td><td>작성자·시각 재작성 이력</td></tr><tr><td>RENDER</td><td>영상 프레임 손상</td></tr><tr><td>UNLOCK</td><td>암호화 컨테이너</td></tr></table><p class="note">이 파일은 프레임 손상이 아니라 작성자와 시각이 다시 쓰인 흔적을 가진다.</p>' } },
      ]),
      personnel: sideRoom('4층 · 인사 원본실', '#24201a', [
        { t: 'shelf', x: 100, y: 140, w: 420, h: 500, rows: 5 },
        { t: 'board', x: 620, y: 140, w: 420, h: 300, spot: { id: 'codeTable', label: '인사 처분 코드표', look: '<table><tr><th>처분명</th><th>본인 서명</th><th>업무</th><th>출입 권한</th><th>기간</th></tr><tr><td>자진 퇴사</td><td>필요</td><td>종료</td><td>회수</td><td>즉시</td></tr><tr><td>권고 사직</td><td>필요</td><td>유지</td><td>유지</td><td>30일</td></tr><tr><td>정직</td><td>불필요</td><td>배제</td><td>유지</td><td>1~3개월</td></tr><tr><td>강제 대기발령</td><td>불필요</td><td>배제</td><td>정지</td><td>조사 종료까지</td></tr><tr><td>징계 해고</td><td>불필요</td><td>종료</td><td>회수</td><td>즉시</td></tr></table>' } },
        { t: 'cabinet', x: 1120, y: 300, w: 240, h: 340, n: 4, spot: { id: 'carbon', label: '카본지 보관함', puzzle: 'p42', after: '<p>카본 원본과 자필 이관서는 챙겼다.</p>' } },
      ]),
      ledger: sideRoom('4층 · 회계 보관실', '#1a2420', [
        { t: 'shelf', x: 100, y: 140, w: 600, h: 500, rows: 4, boxes: true },
        { t: 'paper', x: 820, y: 220, w: 160, h: 200, r: -3, spot: { id: 'incident', label: '사고 원지', pad: 10, look: '<div class="paper">사고 원지\n현장: <b>C-17</b>\n사고일: 11-17\n관계자: 8명</div>' } },
        { t: 'paper', x: 1030, y: 230, w: 160, h: 200, r: 4, spot: { id: 'contracts', label: '외주 계약철', pad: 10, look: '<table><tr><th>업체 코드</th><th>업무</th><th>실체 확인</th></tr><tr><td>A-02</td><td>청소</td><td>정상</td></tr><tr><td>C-17</td><td>설비</td><td>실체 없음</td></tr><tr><td>C-71</td><td>운송</td><td>정상</td></tr></table><p class="note">비슷한 C-71은 숫자 순서를 바꾼 미끼다.</p>' } },
        { t: 'vault', x: 1260, y: 300, w: 240, h: 240, label: '전표함', spot: { id: 'voucherSafe', label: '전표 보관함', puzzle: 'ledgerCode', after: '<p>위장 전표 묶음은 챙겼다.</p>' } },
      ]),
      comms: sideRoom('4층 · 통신 보존실', '#1b1d2a', [
        { t: 'rack', x: 120, y: 160, w: 220, h: 480, leds: '#4fb3ff' },
        { t: 'console', x: 520, y: 400, w: 560, h: 220, spot: { id: 'tape', label: '통화 보존 장치', puzzle: 'callTime', after: '<p>02:13 통화는 이미 사본을 떠 두었다.</p>' } },
        { t: 'monitor', x: 560, y: 150, w: 480, h: 190, color: '#9fd3ff', bg: '#06101a', lines: ['CALL ARCHIVE · 2025-11-17', '검색: 시각(분)을 지정해 재생', '01:58 ··· 02:05 ··· 02:13 ··· 02:20'] },
      ]),
    },

    puzzles: {
      alarmTime: {
        type: 'dial', loc: '4층 · 화재 수신기 원지 보관함', title: '본사 경보 개입 시각',
        prompt: '<p>보관함은 시·분 두 자리씩을 요구한다. 화재를 처음 감지한 때가 아니라, <b>본사가 개입한 순간</b>이다.</p>',
        cols: [{ label: '시', opts: ['01', '02', '03'] }, { label: '분', opts: Array.from({ length: 60 }, (_, i) => String(i).padStart(2, '0')), start: 0 }],
        seps: [':'], answer: ['02', '13'],
        check: (v) => (v[0] === '02' && (v[1] === '11' || v[1] === '12') ? '그건 현장 센서가 연기를 감지한 시각이다.' : '감열지 원지를 다시 읽어 보자.'),
        hints: ['예비·확정 센서 시각은 현장 감지입니다.', '“본사 회선 ACK 수신” 줄을 찾으세요.', '정답은 02:13입니다.'],
        reward: ['E4-01'], okText: '<p>유리관이 열린다. 원지는 네트워크와 연결되지 않은 독립 프린터가 찍었다. 현장 화재는 02:12에 확정됐고, 본사 응답 직후 경종이 꺼졌다.</p>',
      },
      videoCmd: {
        type: 'choice', loc: '4층 · 영상 복원실', title: '영상 이력 복원 명령',
        prompt: '<p>WORM 장치에 어떤 복원 명령을 보낼까.</p>',
        options: [
          { v: 'RECOVER', label: 'RECOVER', sub: '일반 삭제 파일 복구', why: '파일은 지워지지 않았다. 내용이 다시 쓰였다.' },
          { v: 'MIRROR', label: 'MIRROR', sub: '작성자·시각 재작성 이력 복원' },
          { v: 'RENDER', label: 'RENDER', sub: '영상 프레임 손상 복구', why: '프레임은 멀쩡하다. 문제는 메타데이터다.' },
          { v: 'UNLOCK', label: 'UNLOCK', sub: '암호화 컨테이너 해제', why: '암호화된 파일이 아니다.' },
        ],
        answer: 'MIRROR',
        hints: ['빈 프레임 자체보다 메타데이터가 바뀐 것이 핵심입니다.', '명령 목록에서 “작성자·시각 재작성 이력” 줄을 고르세요.', '정답은 MIRROR입니다.'],
        reward: ['E4-02'], okText: '<p>복원된 화면에서 성운물류센터 작업자들이 경종 없이 연기를 발견하고 뛰기 시작한다. 02:15, 현장 관리자가 수동 경보 버튼을 누르지만 회선은 이미 본사에서 잠겨 있다.</p><div class="screen-text">수정 이력: 03:04 · MIRROR-SVC · 02:12–02:20 구간 은폐</div>',
      },
      p42: {
        type: 'choice', loc: '4층 · 인사 원본실', title: '윤서진의 실제 인사 조치',
        prompt: '<p>윤서진의 공식 인사 출력은 “자진 퇴사”다. 하지만 카본지 압흔에는 다른 문장이 남아 있다.</p><div class="paper">조치 코드 P-4? (끝자리 번짐)\n본인 서명: <b>없음</b>\n회사 명령: 업무 배제 / 출입 권한 정지 / 조사 종료일까지 대기</div><p>벽의 처분 코드표와 맞춰 실제 처분명을 고르세요.</p>',
        options: [
          { v: 'quit', label: '자진 퇴사', why: '자진 퇴사에는 본인 서명이 필요하다. 압흔에는 서명이 없다.' },
          { v: 'advise', label: '권고 사직', why: '권고 사직은 서명이 필요하고 업무도 유지된다.' },
          { v: 'suspend', label: '정직', why: '정직은 출입 권한을 정지하지 않는다.' },
          { v: 'standby', label: '강제 대기발령' },
          { v: 'fire', label: '징계 해고', why: '해고라면 “조사 종료일까지 대기”할 이유가 없다.' },
        ],
        answer: 'standby',
        hints: ['서명 없음, 업무 배제, 출입 정지, 조사 종료까지 — 네 조건을 코드표의 열과 하나씩 맞춰 보세요.', '서명이 불필요하고 출입 권한까지 정지되는 처분은 하나뿐입니다.', '정답은 강제 대기발령입니다.'],
        reward: ['E4-03'], okText: '<p>카본 원본 아래 윤서진의 자필 이관서가 있다.</p><blockquote>나는 자진 퇴사하지 않는다. 원본을 WORM R-17에 이관한다. 이 문장이 사라지면 인사 원장과 봉인 해시를 비교하라.</blockquote><p>자필 문장만이 아니라 R-17 봉인 명세와 인사 카본이 같은 사실을 독립적으로 지지한다.</p>',
      },
      ledgerCode: {
        type: 'dial', loc: '4층 · 회계 보관실', title: '위장 전표 현장 코드',
        prompt: '<p>사고 관계자에게 지급된 돈은 외주 유지보수비로 처리돼 있다. 전표함은 <b>사고 원지와 실체 없는 계약에 동시에 등장하는 코드</b>로 열린다.</p>',
        cols: [{ label: '문자', opts: ['A', 'B', 'C'] }, { label: '번호', opts: ['02', '07', '11', '17', '27', '71'] }],
        seps: ['-'], answer: ['C', '17'],
        check: (v) => (v.join('-') === 'C-71' ? 'C-71은 숫자 순서를 바꾼 미끼다. 실체가 있는 정상 업체다.' : v.join('-') === 'A-02' ? '청소 업체는 정상이다.' : '사고 원지와 계약철을 나란히 놓아 보자.'),
        hints: ['사고 원지의 현장 코드를 먼저 확인하세요.', '같은 코드이면서 “실체 없음”인 계약을 찾으세요.', '정답은 C-17입니다.'],
        reward: ['E4-04'], okText: '<p>C-17 묶음에는 같은 금액의 지급 확인서 여덟 장과 박 과장의 결재가 있다.</p><div class="paper">계정: 외주 유지보수비\n실제 수령: 사고 관계자 8명\n결재: 박 과장\n비고: 합의 문구 외부 노출 금지</div>',
      },
      callTime: {
        type: 'dial', loc: '4층 · 통신 보존실', title: '통화 녹음 찾기',
        prompt: '<p>통신 보존 장치는 사고 당일의 내선 통화를 분 단위로 찾아 재생한다. 본사가 경보에 개입한 바로 그 분을 찾으면 된다.</p>',
        cols: [{ label: '시', opts: ['01', '02', '03'] }, { label: '분', opts: Array.from({ length: 60 }, (_, i) => String(i).padStart(2, '0')) }],
        seps: [':'], answer: ['02', '13'], okLabel: '재생',
        failText: '잡음만 흐른다. 이 시각에는 통화가 없었다.',
        hints: ['화재 수신기실 원지에 본사가 응답한 시각이 있습니다.', '본사 회선 ACK 수신 시각을 분 단위로 맞추세요.', '02:13입니다.'],
        reward: ['E4-05'], okText: '<div class="paper">02:13:04 · 박 과장: “현장 경종부터 막아. 사고 확정 전까지 본사 승인 없이 울리면 안 돼.”\n02:13:09 · 관제 직원: “이미 연기 확정입니다.”\n02:13:12 · 박 과장: “기록은 점검으로 돌려. 내가 승인할게.”</div><p>목소리만으로는 편집 의혹이 남는다. 하지만 독립된 화재 수신기 원지의 시각과 명령 결과가 정확히 일치한다.</p>',
      },
      verdict: {
        type: 'phrase', loc: '4층 · 원본 교차 검증대', title: 'Act 4 검증 방식',
        prompt: '<p>다섯 장소의 원본을 시간축에 놓는다.</p><blockquote>02:12 현장 화재 확정 → 02:13 박 과장 지시 뒤 경종 차단 → MIRROR가 영상과 기록 시각을 재작성 → 합의금은 외주비로 위장 → 윤서진은 강제 대기발령을 받고 원본을 보존</blockquote><p>이 결론은 누군가의 진술을 믿어서가 아니라, 무엇으로 얻었는가?</p>',
        tiles: ['진술', '원본', '고백', '검증', '추정', '신뢰'],
        answer: [['원본', '검증']],
        check: (w) => (w.includes('진술') || w.includes('고백') ? '진술은 방향만 알려 줬다. 사실을 고정한 건 다른 것이다.' : w.includes('추정') || w.includes('신뢰') ? '믿거나 짐작한 것이 아니다.' : '수정 전 자료를 서로 맞대 확인했다.'),
        hints: ['사람 이름이나 범인 지목이 아닙니다.', '수정 전 자료를 서로 교차해 사실을 고정했습니다.', '“원본” + “검증”입니다.'],
        finish: true,
      },
    },

    objectives: [
      { text: '다섯 방에서 원본 자료 모으기', done: (g) => g.hadAll(['E4-01', 'E4-02', 'E4-03', 'E4-04', 'E4-05']), hint: ['복도의 다섯 문 위 표시등이 초록으로 바뀌면 그 방의 원본을 확보한 것입니다.', '통신 보존실은 화재 수신기실에서 알아낸 시각이 있어야 녹음을 찾을 수 있습니다.'] },
      { text: '최종 검증대에서 결론 내리기', done: (g) => g.solved('verdict'), hint: ['원형 복도 오른쪽 위 검증대를 누르세요.'] },
    ],

    ending: {
      title: '원본 검증',
      html: '<p>검증대가 여섯 사실을 봉인 패키지로 만든다. 화면 한쪽에는 책임 관계가 분리되어 표시된다.</p><table><tr><th>K</th><td>MIRROR 개발, 계정 도용, 원본 접근 유도</td></tr><tr><th>박 과장</th><td>경보 차단, 정책 변경 승인, 비용 위장</td></tr><tr><th>윤서진</th><td>원본 보존, 강제 대기발령</td></tr><tr><th>나</th><td>책임 전가 대상 계정</td></tr></table><p>누구도 완전한 선인이나 단일한 악인으로 줄여지지 않는다. 이제 이 기록을 회사 밖으로 보내야 한다.</p>',
      branch: '6621',
      summary: '다섯 장소의 수정 불가능한 자료를 교차해 사고, 경보 차단, 기록 은폐, 비용 위장, 인사 조치, 인물별 책임을 고정했다.',
    },
  });
})();
