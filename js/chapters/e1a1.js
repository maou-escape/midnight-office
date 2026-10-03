/* 장면 1 · 00:00 8층 경영지원팀 — 정전 */
MO.part({
  id: 'e1a1', ep: 1, time: '00:00', place: '8층 경영지원팀', title: '정전',
  bgm: 'assets/audio/ep1-act1.mp3',
  intro: `
    <p class="note">퇴근 직전 맡은 폐기 서버 목록 대조. 오늘 밤 사무실에 남은 사람은 나 하나다.</p>
    <p>벽시계의 초침이 자정을 넘는 순간 천장 조명이 한 줄씩 꺼졌다. 복합기 모터가 낮게 식고, 출입문 카드 리더만 붉은 불을 토했다.</p>
    <p>박 과장이 퇴근하며 남긴 말이 떠오른다.</p>
    <blockquote>“폐기 서버 목록만 원본 대장하고 맞춰. 이상한 건 건드리지 말고, 끝나면 내 책상에 올려놔.”</blockquote>
    <p>그런데 내 모니터에는 목록 대신 처음 보는 문장이 떠 있다. 전화는 먹통이다. 비상등 아래로 내 책상, 복사실, 휴게실, 출입문이 각기 다른 어둠 속에 놓여 있다. <b>한곳만 보고서는 이 상황을 설명할 수 없다.</b></p>
    <p class="note">조작 · 화면 속 물건을 눌러 조사합니다. 소지품을 누르고 “들고 쓰기”를 고른 뒤 조사 지점을 누르면 물건을 씁니다. 찾은 기록은 🗂️ 증거 파일에 쌓이고 밤새 계속 쓰입니다. 막히면 ? 버튼, 조사 지점이 안 보이면 ⚙ 설정에서 “조사 지점 항상 표시”를 켜세요.</p>`,
  start: 'office',
  startItems: ['badge'],

  items: {
    badge: { name: '내 사원증', icon: '🪪', desc: `<div class="paper">경영지원팀 · 사원번호 <b>19-0426-071</b></div><p>숫자를 쓰다듬자 K가 퇴사 전에 했던 말이 떠오른다.</p><blockquote>“회사는 입사일은 기억해도 사람은 기억하지 않아. 네 번호 가운데가 네가 들어온 달과 일이야.”</blockquote>` },
    hexkey: { name: '비상 육각 키', icon: '🔧', desc: '<p>배전반 덮개를 여는 육각 키. K의 명함과 함께 서랍에 들어 있었다.</p>' },
    'E1-01': { ev: true, code: 'E1-01', name: '출입문 감사 보류문', desc: '<div class="paper">감사 보류 계정은 원본 서버 확인 전까지 퇴실 불가.\n수동 해제 회로: <b>배전반 B구역 / 대상 층 끝자리</b></div><p class="note">회사 규정 양식이 아니다. 누군가 오늘 밤만을 위해 만든 안내다.</p>' },
    'E1-02': { ev: true, code: 'E1-02', name: 'K의 명함', desc: '<p>뒷면에 숫자판 두 개가 손으로 그려져 있다.</p><div class="compare"><div><b>계산기</b><pre>7 8 9\n4 5 6\n1 2 3\n  0</pre></div><div><b>전화기</b><pre>1 2 3\n4 5 6\n7 8 9\n  0</pre></div></div><blockquote>숫자를 읽지 말고 자리를 옮겨라. 서버실 코드는 복사실에 남겼다. — K</blockquote>' },
    'E1-03': { ev: true, code: 'E1-03', name: 'SENTINEL 출력 로그', desc: '<div class="paper">23:41 · USER K · SENTINEL ORIGINAL ARCHIVE\n작업: 폐기 예약표 / 서버실 잠금 원문 <b>74933</b>\n출력 매수: 1 · 회수 상태: 미확인\n\n(가장자리 연필 메모) B구역, 우리가 있는 층</div><p class="note">74933은 그대로 입력할 번호가 아니다. K의 명함 도식과 함께 봐야 한다.</p>' },
    'E1-04': { ev: true, code: 'E1-04', name: '배전 점검표', desc: '<table><tr><th>구역</th><th>예정 작업</th><th>담당 확인</th></tr><tr><td>A-08</td><td>비상등 교체</td><td>완료</td></tr><tr><td>B-08</td><td>00:00 원격 차단 시험</td><td>서명 없음</td></tr><tr><td>C-08</td><td>소방 회선 검사</td><td>취소</td></tr></table><p class="note">00:00 원격 차단 시험에만 담당자 서명이 없다.</p>' },
    'E1-05': { ev: true, code: 'E1-05', name: '정전 예약표', desc: '<div class="paper">00:00 차단 → 06:00 복구\n대상: 8F-B / 등록 단말: <b>K-DEV-04</b>\n등록 시각: 전날 18:26</div><p class="note">정전은 전날 K의 개발 단말에서 미리 예약됐다.</p>' },
    'E1-06': { ev: true, code: 'E1-06', name: 'K의 원본 사원증', desc: '<div class="paper">K · 개발책임자 · 권한 회수 처리\n카드 상태: 원본 / 마지막 물리 사용 23:48</div><p class="note">잃어버린 것이 아니라 내가 발견하도록 세워 둔 모양새다.</p>' },
    'E1-07': { ev: true, code: 'E1-07', name: 'MIRROR 삭제 예약', desc: '<div class="screen-text red">MIRROR / ORIGINAL ARCHIVE PURGE  41.80%\n실행 계정: 19-0426-071\n자동 재개: 06:00\n승인 서비스: MIRROR-SVC</div><p class="note">내가 승인한 적 없는 삭제가 내 번호로 예약돼 있다.</p>' },
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
          spot: { id: 'exitDoor', label: '잠긴 출입문', give: ['E1-01'], look: '<p>카드 리더는 내 사원증을 읽고도 문을 열지 않는다. 액정 아래 투명 테이프로 급히 붙인 출력물이 있다.</p><div class="paper">감사 보류 계정은 원본 서버 확인 전까지 퇴실 불가.\n수동 해제 회로: <b>배전반 B구역 / 대상 층 끝자리</b></div><p>회사 규정에 이런 절차는 없다. 복도 끝 배전반에는 B-01부터 B-12까지 작은 차단기가 있다는 기억이 난다.</p>',
            use: { badge: { html: '<p>삑. 리더가 번호를 읽는다. <span class="say">AUDIT HOLD · 19-0426-071</span> 붉은 불만 한 번 더 깜빡일 뿐이다.</p>' } } } },
        { t: 'desk', x: 380, y: 500, w: 560, drawers: true },
        { t: 'monitor', x: 520, y: 330, w: 250, h: 140, color: '#ff8a8a', bg: '#1a0707', lines: ['AUDIT HOLD', 'USER 19-0426-071', 'ORIGINAL ARCHIVE', 'PURGE · 06:00'],
          spot: { id: 'myMonitor', label: '내 모니터', look: '<div class="screen-text red">AUDIT HOLD · USER 19-0426-071\nORIGINAL ARCHIVE PURGE · 06:00</div><p>폐기 서버 목록 대신 내 사원번호가 떠 있다. 키보드를 눌러도 반응이 없다.</p>' } },
        { t: 'shape', x: 790, y: 518, w: 140, h: 90, fill: 'transparent', spot: { id: 'drawer', label: '잠긴 책상 서랍', puzzle: 'drawer', after: '<p>열린 서랍은 비어 있다. 육각 키와 명함은 이미 챙겼다.</p>' } },
        { t: 'chair', x: 600, y: 560, color: '#232833' },
        { t: 'desk', x: 1000, y: 520, w: 420 },
        { t: 'monitor', x: 1110, y: 380, w: 180, h: 110, on: false },
        { t: 'paper', x: 1320, y: 470, w: 70, h: 44, r: -6, spot: { id: 'parkDesk', label: '박 과장 책상', pad: 20, look: '<p>박 과장 책상은 지나치게 깨끗하다. 메모지 한 장만 남아 있다.</p><div class="paper">폐기 서버 목록 → 원본 대장 대조\n담당: 19-0426-071 (야근)\n※ 결과는 내일 아침 내 책상에</div><p class="note">처음부터 나를 오늘 밤 여기 남기려던 것처럼 보인다.</p>' } },
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
          spot: { id: 'printer', label: '멈춘 복합기', give: ['E1-03'], look: '<p>복합기는 정전 직전에 멈춘 종이를 반쯤 물고 있다. 토너 냄새가 아직 따뜻하다. 용지를 천천히 당기자 마지막 출력 작업이 드러난다.</p><div class="paper">23:41 · USER K · SENTINEL ORIGINAL ARCHIVE\n작업: 폐기 예약표 / 서버실 잠금 원문 <b>74933</b>\n출력 매수: 1 · 회수 상태: 미확인</div><p>용지 가장자리에는 연필로 <b>“B구역, 우리가 있는 층”</b>이라고 적혀 있다.</p>' } },
        { t: 'shelf', x: 1080, y: 200, w: 380, h: 440, rows: 4, boxes: true, spot: { id: 'paperShelf', label: '용지 선반', look: '<p>A4 박스가 가득하다. 맨 아래 칸에 파쇄된 종이 봉투가 끼어 있다. 읽을 수 있는 글자는 “ORIGINAL”과 “06:00”뿐이다.</p>' } },
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
          spot: { id: 'fridge', label: '냉장고 점검표', give: ['E1-04'], look: '<p>냉장고는 비상 전원으로 윙윙거린다. 자석 밑에 오늘 날짜의 시설 점검표가 끼워져 있다.</p><table><tr><th>구역</th><th>예정 작업</th><th>담당 확인</th></tr><tr><td>A-08</td><td>비상등 교체</td><td>완료</td></tr><tr><td>B-08</td><td>00:00 원격 차단 시험</td><td>서명 없음</td></tr><tr><td>C-08</td><td>소방 회선 검사</td><td>취소</td></tr></table>' } },
        { t: 'counter', x: 940, y: 470, w: 520, h: 170 },
        { t: 'shape', x: 1040, y: 400, w: 90, h: 70, fill: '#2a2f3b', rx: 10, spot: { id: 'pot', label: '커피 포트 메모', pad: 16, look: '<div class="paper">정전은 전 층이 아니라 <b>8층 B회로만</b>.\n시험이라더니 서명한 사람이 없다?</div><p>건물 사고가 아니라 누군가 실행한 시험이다.</p>' } },
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
              if (!g.has('E1-05') && !g.flag('used:E1-05')) { g.give('E1-05', true); g.say({ title: '배전반 예약 모듈', html: '<p>배전반 안쪽 예약 모듈에 사람이 직접 붙인 라벨이 있다.</p><div class="paper">00:00 차단 → 06:00 복구\n대상: 8F-B / 등록 단말: <b>K-DEV-04</b>\n등록 시각: 전날 18:26</div><p>정전은 우연이 아니었다.</p>', got: ['E1-05'] }); return false; }
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
        { t: 'rack', x: 1150, y: 160, w: 170, h: 480, label: 'SNTL', leds: '#f5b14c',
          spot: { id: 'sentinel', label: 'SENTINEL 랙', look: '<p>SENTINEL 원본 아카이브. 접근 등이 노랗게 깜빡인다. 아래쪽에서 무언가 반짝인다.</p>' } },
        { t: 'rack', x: 1350, y: 160, w: 170, h: 480, label: 'R-04' },
        { t: 'shape', x: 1190, y: 600, w: 70, h: 40, fill: '#e8ebf1', rx: 4,
          spot: { id: 'kcard', label: '랙 아래 사원증', pad: 20, give: ['E1-06'], look: '<p>SENTINEL 랙 바닥에 K의 원본 사원증이 일부러 보이게 세워져 있다.</p><div class="paper">K · 개발책임자 · 권한 회수 처리\n카드 상태: 원본 / 마지막 물리 사용 23:48</div>' } },
        { t: 'console', x: 560, y: 470, w: 440, h: 170,
          spot: { id: 'console', label: '관리 콘솔', give: ['E1-07'], look: '<p>콘솔에는 내 계정으로 예약된 작업이 41.80%에서 멈춰 있다.</p><div class="screen-text red">MIRROR / ORIGINAL ARCHIVE PURGE\n실행 계정: 19-0426-071\n자동 재개: 06:00\n승인 서비스: MIRROR-SVC</div><p>내가 승인한 적 없는 삭제다. K의 원본 카드와 내 사원번호가 한 화면에서 서로 다른 방식으로 쓰이고 있다.</p>' } },
        { t: 'board', x: 560, y: 120, w: 440, h: 260, lines: ['① 정전 — ?', '② K 원본 카드 — ?', '③ 삭제 예약 — ?', '결론: ______'],
          spot: { id: 'board', label: '사건 화이트보드', puzzle: 'deduce', need: (g) => g.hadAll(['E1-05', 'E1-06', 'E1-07']),
            locked: (g) => `<p>화이트보드에 세 줄을 적으려 한다. 아직 근거가 부족하다. (${g.count(['E1-05', 'E1-06', 'E1-07'])}/3)</p><p class="note">정전은 누가 예약했나? K의 카드는 어디에 있나? 삭제는 누구 이름으로 걸려 있나?</p>` } },
      ],
    },
  },

  puzzles: {
    drawer: {
      type: 'keypad', len: 4, answer: '0426',
      loc: '8층 · 내 책상', title: '책상 서랍 번호 자물쇠',
      prompt: '<p>서랍은 네 자리 번호로 잠겨 있다. 목에 건 사원증에 답이 있을 것 같다.</p>',
      wrong: { '1904': '입사 연도가 아니라 들어온 날이다.', '0710': '번호를 거꾸로 읽은 것 같다.' },
      hints: ['사원증(소지품)을 눌러 보세요. K가 한 말이 적혀 있습니다.', '사원번호 19-0426-071의 가운데 네 자리가 입사한 월과 일입니다.', '정답은 0426입니다.'],
      reward: ['hexkey', 'E1-02'],
      okText: '<p>딸깍. 서랍 안에는 비상용 육각 키와 K의 낡은 명함이 있다. 명함 뒷면에는 숫자판 두 개가 손으로 그려져 있다.</p><div class="compare"><div><b>계산기</b><pre>7 8 9\n4 5 6\n1 2 3\n  0</pre></div><div><b>전화기</b><pre>1 2 3\n4 5 6\n7 8 9\n  0</pre></div></div><blockquote>숫자를 읽지 말고 자리를 옮겨라. 서버실 코드는 복사실에 남겼다. — K</blockquote>',
    },
    breaker: {
      type: 'dial', loc: '8층 · 비상 배전반', title: '수동 복구할 회로',
      prompt: '<p>덮개를 열자 A·B·C 세 줄의 차단기가 나타난다. 잘못 올리면 서버실 비상 전원까지 끊긴다는 경고등이 켜져 있다.</p><p class="note">세 장소의 기록이 공통으로 가리키는 차단기 하나를 고르세요.</p>',
      cols: [{ label: '구역', opts: ['A', 'B', 'C'] }, { label: '번호', opts: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'] }],
      seps: ['-'], answer: ['B', '08'],
      check: (v) => (v[0] !== 'B' ? '출입문 안내는 B구역을 지목했다.' : '구역은 맞다. “대상 층 끝자리”와 “우리가 있는 층”을 떠올려 보자.'),
      hints: ['출입문 안내문, 복사실 출력 로그의 연필 메모, 휴게실 점검표를 모두 보세요.', '구역은 B. 번호는 지금 있는 층(8층)의 끝자리이며, 점검표에도 같은 회로가 있습니다.', '정답은 B-08입니다.'],
      okTitle: 'B-08 복구', okText: '<p>B-08을 올리자 복도 비상등이 차례로 살아난다. 출입문은 여전히 잠겼지만 서버실 키패드에 불이 들어온다.</p><p class="note">배전반 안쪽에 무언가 붙어 있다. 다시 살펴보자.</p>',
    },
    serverPad: {
      type: 'keypad', len: 5, answer: '14399',
      loc: '8층 · 서버실 키패드', title: '서버실 다섯 자리 잠금',
      prompt: '<p>키패드는 전화기 배열이다. 다섯 칸이 깜빡인다.</p><div class="compare"><div><b>원문이 놓인 계산기</b><pre>7 8 9\n4 5 6\n1 2 3\n  0</pre></div><div><b>지금 누를 전화기</b><pre>1 2 3\n4 5 6\n7 8 9\n  0</pre></div></div>',
      wrong: { '74933': '원문을 그대로 넣었다. 명함은 “자리를 옮겨라”라고 했다.' },
      hints: ['복사실 출력 로그의 잠금 원문(다섯 자리)과 K의 명함을 함께 보세요.', '숫자 값이 아니라 위치를 옮깁니다. 계산기 왼쪽 위의 7은 전화기 같은 자리의 1이 됩니다.', '7→1, 4→4, 9→3, 3→9, 3→9. 정답은 14399입니다.'],
      okText: '<p>초록불이 켜지고 방화문이 열린다. 냉각팬 소리가 어둠 속에서 파도처럼 밀려온다.</p>',
    },
    deduce: {
      type: 'verify', loc: '8층 · 서버실 사건 보드', title: '첫 번째 결론',
      prompt: '<p>콘솔 옆 화이트보드. K의 목소리가 머릿속에서 반복된다. <span class="say">“서로 독립된 두 개가 같은 말을 할 때만 사실로 적어.”</span></p><p>오늘 밤의 정전은 무엇이었나. 지금 확정할 수 있는 만큼만 적는다.</p>',
      claims: [
        { v: 'accident', label: '노후 설비 때문에 일어난 사고다', why: '사고라면 날짜와 시각을 미리 정해 둘 수 없다. 기록 어딘가에 “00:00”이 미리 적혀 있었다.' },
        { v: 'plan', label: '누군가 미리 계획해 둔 정전이다' },
        { v: 'k', label: 'K가 직접 일으킨 정전이다', why: 'K의 단말이 쓰인 것은 맞다. 하지만 K 본인이 실행했다는 독립 기록은 아직 없다. 확정할 수 있는 만큼만 적자.' },
      ],
      answer: 'plan',
      pairs: [['E1-05', 'E1-04'], ['E1-05', 'E1-01'], ['E1-04', 'E1-01']],
      notes: { 'E1-07': '삭제 예약은 06:00 삭제에 관한 기록이다. 정전과는 따로 봐야 한다.', 'E1-02': '명함은 서버실 코드에 관한 것이다.', 'E1-03': '출력 로그는 서버실 잠금 원문에 관한 것이다.', 'E1-06': 'K의 카드는 정전이 언제 정해졌는지 말해 주지 않는다.' },
      hints: ['정전이 “미리 정해져 있었다”는 걸 보여 주는 기록을 찾으세요. 시각 00:00이 적힌 종이와 라벨이 있습니다.', '배전반 안쪽 라벨(E1-05), 휴게실 점검표(E1-04), 출입문 안내문(E1-01)은 서로 다른 곳에서 나왔습니다.', '결론은 “누군가 미리 계획해 둔 정전”. 증거는 E1-05와 E1-04를 고르세요.'],
      finish: true,
    },
  },

  objectives: [
    { text: '잠긴 출입문 살펴보기', done: (g) => g.hadAll(['E1-01']), hint: ['왼쪽의 붉은 불이 켜진 출입문을 눌러 보세요.'] },
    { text: '책상 서랍 열기', done: (g) => g.solved('drawer'), hint: ['내 책상 오른쪽 서랍이 네 자리 번호로 잠겨 있습니다.', '소지품의 사원증을 눌러 K의 말을 다시 읽어 보세요.'] },
    { text: '복사실과 휴게실에서 흔적 찾기', done: (g) => g.hadAll(['E1-03', 'E1-04']), hint: ['아래쪽 이동 버튼으로 복사실과 휴게실에 가 보세요.', '복사실은 멈춘 복합기, 휴게실은 냉장고를 보세요.'] },
    { text: '복도 배전반에서 끊긴 회로 복구하기', done: (g) => g.solved('breaker'), hint: ['비상 복도의 배전반은 육각 볼트로 잠겨 있습니다.', '소지품의 육각 키를 “들고 쓰기”로 든 뒤 배전반을 누르세요.'] },
    { text: '서버실 키패드 열기', done: (g) => g.solved('serverPad'), hint: ['전원이 살아난 키패드는 다섯 자리를 원합니다.', '복사실 출력 로그의 원문과 K의 명함을 함께 보세요.'] },
    { text: '서버실 단서를 모아 첫 번째 결론 적기', done: (g) => g.solved('deduce'), hint: ['배전반 안쪽(복구 후 다시 누르기), 서버실 랙 아래, 관리 콘솔을 조사하세요.', '세 기록을 모으면 서버실 화이트보드에 결론을 적을 수 있습니다. 결론에는 서로 다른 곳에서 나온 증거 두 장이 필요합니다.'] },
  ],

  ending: {
    title: '계획된 정전',
    seal: '4180',
    html: '<p>서버실 비상 레버를 당기자 아래층으로 가는 계단문이 열린다. 스피커에서 잡음 섞인 K의 목소리가 아주 짧게 흘러나온다.</p><blockquote>“여기까지 왔다면, 기록 하나를 믿지 마. 나도 믿지 마. 서로 독립된 두 개가 같은 말을 할 때만 사실로 적어.”</blockquote><p>K는 나를 이용했다. 동시에 원본 삭제를 막을 기회도 남겼다. 두 사실은 서로를 지우지 않는다.</p>',
    summary: '정전은 전날 K 단말에서 예약된 계획이었다. 내 번호로 원본 삭제가 06:00에 재개된다.',
  },
});
