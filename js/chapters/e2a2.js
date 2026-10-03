/* Episode 2 · Act 2 명단 — 06:12 본사 별관 지하 문서수발실 */
MO.chapter({
  id: 'e2a2', ep: 2, act: 2,
  epTitle: 'Episode 2. 인수인계', title: 'Act 2. 명단',
  kicker: '06:12 · 별관 지하 문서수발실', tagline: '이름이 지워진 일곱 상자',
  bgm: 'assets/audio/ep1-act2.mp3',
  premise: '이름이 지워진 인수인계 상자 일곱 개. 사건마다 원래 승인자와 대신 책임을 떠안은 사람이 있다. 회사가 사람을 고른 규칙, 그리고 나보다 먼저 명단에 올랐던 여덟 번째 이름을 찾아야 한다.',
  intro: `
    <p>오전 6시 12분. 본사 별관 지하 문서수발실.</p>
    <p>외부 감사기관은 자료를 받았지만, 회사는 이미 “퇴직 직원과 내부 침입자의 공모”라는 반박문을 준비했다. 최유리의 파일만으로는 부족하다.</p>
    <p>윤서진이 손전등으로 수발실 안을 훑는다.</p>
    <blockquote>윤서진 · “회사는 최유리 한 사람이 만든 조작이라고 밀어붙일 겁니다. 사건과 사람을 물리 원본으로 다시 연결해야 해요.”</blockquote>
    <p>사건 연표, 상자 이관 대장, 장기 보존 배치도가 서로 다른 곳에 흩어져 있다. <b>세 자료가 같은 상자를 가리킬 때만</b> 봉인을 복원할 수 있다.</p>
    <p class="note">최유리는 HANDOVER 명단을 남긴 기록관리 담당자이고, 나는 오전 6시 30분에 확정될 다음 대체 책임자로 표시돼 있다.</p>`,
  start: 'dispatch',

  items: {
    R205: { ev: true, code: '#205', name: '사건 연표 색인', desc: '<div class="paper">사건 연표 원본 · 2018년\nCASE 05 · 2018.08.02 · 광주 분류장\nCASE 06 · 2018.11.03 · 성운물류센터\nCASE 07 · 2019.04.26 · 본사 원본 서버</div><p>여백 메모(최유리): “성운 직전 사건의 상자에서 전체 명단이 시작된다.”</p>' },
    R204: { ev: true, code: '#204', name: '상자 이관 대장', desc: '<div class="paper">상자 이관 대장 · CASE 05\n원위치: <b>Q-04</b>\n이관 사유: 법무 보존 전환\n신규 행: <b>R</b>\n슬롯 번호: 원위치 숫자 유지</div><p class="note">도장이 번져 최종 상자 표기는 보이지 않는다.</p>' },
    R208: { ev: true, code: '#208', name: '장기 보존 배치도', desc: '<div class="paper">장기 보존 선반 배치 규칙\n행 문자 = 보존 사유 · 두 자리 숫자 = 이관 전 슬롯\nR · 법무·감사 장기 보존\nP · 인사 원본\nW · 쓰기 금지 매체\n표기 예: 신규 행 P + 원슬롯 12 → <b>P12</b></div>' },
    R406: { ev: true, code: '#406', name: '대체 책임자 명단', desc: '<p>R04 봉인 상자에서 나온 일곱 사건의 사건 카드·승인 카드·대체 카드 묶음.</p>' },
    R612: { ev: true, code: '#612', name: '일곱 사건 연결표', desc: '<table><tr><th>사건</th><th>원래 승인자</th><th>대체 책임자</th></tr><tr><td>A</td><td>강민호</td><td>오지은</td></tr><tr><td>B</td><td>백현수</td><td>이선우</td></tr><tr><td>C</td><td>문재혁</td><td>김미정</td></tr><tr><td>D</td><td>한도경</td><td>박주원</td></tr><tr><td>E</td><td>서동훈</td><td>정하린</td></tr><tr><td>F</td><td>박기태</td><td>최유리</td></tr><tr><td>G</td><td>조성원</td><td>나</td></tr></table>' },
    R613: { ev: true, code: '#613', name: 'HANDOVER 선택 규칙', desc: '<p>HANDOVER는 <b>즉시 소명할 수 없는 사람</b>을 골라 책임을 옮겼다. 퇴직 임박, 감사 보류, 장기 휴직, 야간 고립.</p>' },
    R782: { ev: true, code: '#782', name: '대체 책임자 원본 명단', desc: '<div class="paper">대체 순번 07 · 18-0514-263 · 윤서진 · 감사 보류 / 강제 대기발령 → 실행 중단\n대체 순번 08 · 19-0426-071 · 나 · 야간 단독 근무 → 06:30 확정 예정</div>' },
  },

  rooms: {
    dispatch: {
      name: '별관 B1 · 문서수발실',
      mood: { dark: 0.3, vignette: 0.85 },
      exits: [{ to: 'storage', label: '장기 보존 선반' }, { to: 'lightroom', label: '라이트박스 작업실' }],
      art: [
        { t: 'room', wall: '#22262c', floor: '#14161a', tiles: true },
        { t: 'emergency', x: 120, y: 40 },
        { t: 'cabinet', x: 120, y: 260, w: 260, h: 380, n: 4, spot: { id: 'chrono', label: '사건 연표함', give: ['R205'], look: '<div class="paper">사건 연표 원본 · 2018년\nCASE 05 · 2018.08.02 · 광주 분류장\nCASE 06 · 2018.11.03 · 성운물류센터\nCASE 07 · 2019.04.26 · 본사 원본 서버</div><p>색인은 사고 발생 순서만 남기고 상자 위치를 별도 이관 대장으로 분리했다. 여백 메모: <span class="say">“성운 직전 사건의 상자에서 전체 명단이 시작된다.”</span></p>' } },
        { t: 'counter', x: 520, y: 430, w: 560, h: 210, top: '#4a505d', color: '#2a2f3b' },
        { t: 'paper', x: 700, y: 360, w: 180, h: 80, r: -3, spot: { id: 'transfer', label: '반출입 창구 대장', pad: 20, give: ['R204'], look: '<p>광주 분류장 상자는 감사 착수 전 임시 보관대에서 장기 보존대로 옮겨졌다.</p><div class="paper">상자 이관 대장 · CASE 05\n원위치: <b>Q-04</b>\n이관 사유: 법무 보존 전환\n신규 행: <b>R</b>\n슬롯 번호: 원위치 숫자 유지</div><p class="note">도장이 번져 최종 상자 표기는 보이지 않는다. 배치도 규칙에 적용해야 한다.</p>' } },
        { t: 'shelf', x: 1180, y: 180, w: 340, h: 460, rows: 4, boxes: true, spot: { id: 'disposal', label: '폐기 대기 선반', look: '<p>같은 크기의 상자 일곱 개가 놓여 있지만 날짜 라벨은 모두 뜯겨 있다. 이 상자들은 미끼다. 원본 명단은 장기 보존 선반으로 옮겨졌다.</p>' } },
        { t: 'shape', x: 960, y: 300, w: 70, h: 130, fill: '#3a3f4b', rx: 30, spot: { id: 'yoon', label: '윤서진', look: '<blockquote>윤서진 · “MIRROR 사본은 원본 한 개로 셉니다. 연결 하나는 서로 다른 물리 원본 두 개가 일치할 때만 확정해요. 제가 대기발령을 받기 전에 세운 규칙이에요.”</blockquote>' } },
      ],
    },

    storage: {
      name: '별관 B1 · 장기 보존 선반',
      mood: { dark: 0.3, vignette: 0.85 },
      exits: [{ to: 'dispatch', label: '문서수발실' }, { to: 'lightroom', label: '라이트박스 작업실' }],
      art: (g) => [
        { t: 'room', wall: '#1f2328', floor: '#121418' },
        { t: 'shelf', x: 60, y: 140, w: 360, h: 500, rows: 4, boxes: true, label: 'P행' },
        { t: 'shelf', x: 470, y: 140, w: 420, h: 500, rows: 4, boxes: true, label: 'R행', spot: { id: 'rRow', label: 'R행 상자들', puzzle: 'r04', after: '<p>R04 상자는 열려 있다.</p>' } },
        { t: 'shelf', x: 940, y: 140, w: 360, h: 500, rows: 4, boxes: true, label: 'W행' },
        { t: 'board', x: 1350, y: 160, w: 200, h: 260, spot: { id: 'rackmap', label: '배치도', give: ['R208'], look: '<div class="paper">장기 보존 선반 배치 규칙\n행 문자 = 보존 사유 · 두 자리 숫자 = 이관 전 슬롯\nR · 법무·감사 장기 보존\nP · 인사 원본\nW · 쓰기 금지 매체\n표기 예: 신규 행 P + 원슬롯 12 → <b>P12</b></div><p>찢긴 라벨 조각이 남은 상자는 R행 01부터 09 사이에 있다.</p>' } },
      ],
    },

    lightroom: {
      name: '별관 B1 · 라이트박스 작업실',
      mood: { dark: 0.15, vignette: 0.75 },
      exits: [{ to: 'dispatch', label: '문서수발실' }, { to: 'storage', label: '장기 보존 선반' }],
      art: (g) => [
        { t: 'room', wall: '#1c2026', floor: '#111316' },
        { t: 'ceilingLight', x: 640, y: 30 },
        { t: 'board', x: 80, y: 120, w: 520, h: 330, cork: true, pins: 7,
          spot: { id: 'caseBoard', label: '사건 보드', puzzle: 'board', need: (g) => g.has('R406'), locked: '<p>빈 코르크판에 일곱 칸이 그려져 있다. 연결할 사건 카드가 아직 없다.</p>', after: '<p>일곱 사건이 실로 이어져 있다.</p>' } },
        { t: 'board', x: 680, y: 120, w: 360, h: 230, lines: ['HANDOVER 선택 규칙', g.solved('rule') ? '= 즉시 소명 불가' : '= ?'],
          spot: { id: 'ruleBoard', label: '규칙 칠판', puzzle: 'rule', need: (g) => g.solved('board'), locked: '<p>일곱 사건을 먼저 연결해야 공통점을 볼 수 있다.</p>' } },
        { t: 'lightbox', x: 640, y: 420, w: 520, h: 210, spot: { id: 'lightbox', label: '라이트박스', puzzle: 'layers', need: (g) => g.solved('rule'), locked: '<p>라이트박스 위에 종이 세 장이 흩어져 있다. 잘린 명단, 출력 대기열, 복사기 압력 지도. 무엇을 찾아야 할지 먼저 알아야 한다.</p>' } },
        { t: 'console', x: 1220, y: 440, w: 320, h: 190, spot: { id: 'branchPad', label: '반출 단말', puzzle: 'branch', need: (g) => g.solved('layers'), locked: '<p>반출 단말은 분기 기록을 요구한다. 아직 조립할 재료가 없다.</p>' } },
      ],
    },
  },

  puzzles: {
    r04: {
      loc: '별관 B1 · 장기 보존 R행', title: '명단 상자 찾기',
      prompt: '<p>R행 01부터 09 사이 어딘가에 명단 상자가 있다. 세 자료가 같은 상자를 가리켜야 한다.</p>',
      steps: [
        { type: 'dial', label: '상자 표기', cols: [{ label: '행', opts: ['P', 'Q', 'R', 'W'] }, { label: '슬롯', opts: ['01', '02', '03', '04', '05', '06', '07', '08', '09'] }], answer: ['R', '04'],
          check: (v) => (v[1] === '05' ? '사건 번호 05를 상자 번호로 쓴 것이 아니다.' : v[0] === 'Q' ? 'Q-04는 이관 전 위치다.' : '이관 대장과 배치도 규칙을 합쳐 보자.'), okText: 'R04 상자를 꺼냈다. 찢긴 봉인 띠가 감겨 있다.' },
        { type: 'fragments', label: '봉인 띠 복원', prompt: '<p>봉인 띠는 START에서 END까지 이어진다. 이웃한 조각의 연결 기호가 같아야 하고, 글씨가 모두 바로 서야 한다.</p>',
          pieces: [{ text: '▲ R ●', note: 'ROW' }, { text: '■ 4 END', note: 'SLOT' }, { text: 'START · ▲', note: '봉인 시작' }, { text: '● 0 ■', note: 'TRANSFER' }],
          startOrder: [1, 3, 0, 2], startRot: [90, 270, 180, 90], answer: [2, 0, 3, 1] },
      ],
      hints: ['연표에서 성운물류센터 바로 앞 사건(CASE 05)을, 이관 대장에서 그 상자의 원위치와 신규 행을 확인하세요.', '배치도 규칙: 신규 행 문자 + 이전 슬롯 숫자 → R + 04. 봉인 띠는 START부터 기호를 이어 가세요.', '상자는 R04. 띠 순서는 봉인 시작 – R – 0 – 4, 모두 0°.'],
      reward: ['R406'],
      okTitle: 'R04 봉인 복원', okText: '<p>상자 안에는 사건 카드, 승인 카드, 대체 카드가 서로 다른 묶음으로 보관돼 있다. 이름은 지워졌지만 인물 코드와 시각은 남아 있다.</p><blockquote>“연결 하나는 서로 다른 물리 원본 두 개가 일치할 때만 확정할 것. MIRROR 사본은 원본 한 개로 센다.”</blockquote><p class="note">라이트박스 작업실의 사건 보드로 가져가자.</p>',
    },
    board: {
      type: 'board', wide: true, loc: '라이트박스 작업실 · 사건 보드', title: '일곱 사건 연결',
      prompt: '<p>사건마다 <b>같은 사건 문자·날짜·시각</b>을 가진 승인 단서 1장과 대체 단서 1장을 고르고(MIRROR COPY 제외), 코드표에서 두 사람의 이름을 찾는다.</p>',
      src: { pay: '결재 원본', hr: '인사 원본', in: '출입 원장' },
      owners: [['강민호', 'KM'], ['백현수', 'BH'], ['문재혁', 'MJ'], ['한도경', 'HD'], ['서동훈', 'SD'], ['박기태', 'PK'], ['조성원', 'JS']],
      targets: [['오지은', 'OJ'], ['이선우', 'LS'], ['김미정', 'GM'], ['박주원', 'PJ'], ['정하린', 'JH'], ['최유리', 'CY'], ['나', 'ME-071'], ['윤서진', 'YSJ']],
      cases: [
        { id: 'A', date: '2017.02.11', time: '23:48', place: '대전 제2창고', title: '닫힌 방화문', text: '야간 재고 이송 중 방화문이 닫혀 작업자 두 명이 고립됐다. 최종 보고서는 계약 종료를 앞둔 직원의 이름으로 바뀌었다.', owner: '강민호', oc: 'KM', target: '오지은', tc: 'OJ', tag: '계약 종료 12일 전', src: ['pay', 'hr'] },
        { id: 'B', date: '2017.09.24', time: '02:17', place: '성남 연구동', title: '멈춘 냉각 설비', text: '무인 냉각 설비가 17분 동안 멈췄다. 감사가 시작되자 접근이 차단된 직원이 단독 조작자로 기록됐다.', owner: '백현수', oc: 'BH', target: '이선우', tc: 'LS', tag: '감사 보류 대상', src: ['in', 'hr'] },
        { id: 'C', date: '2018.01.08', time: '04:32', place: '인천 냉동고', title: '꺼진 온도 경보', text: '온도 경보가 꺼져 보관 물품이 손상됐다. 장기 휴직 중이던 직원의 출입 코드가 뒤늦게 생성됐다.', owner: '문재혁', oc: 'MJ', target: '김미정', tc: 'GM', tag: '장기 휴직 중', src: ['pay', 'in'] },
        { id: 'D', date: '2018.05.19', time: '01:06', place: '울산 배관실', title: '해제된 압력 밸브', text: '압력 차단 밸브가 원격으로 해제됐다. 퇴직을 며칠 앞둔 현장 직원에게 관리 책임이 넘어갔다.', owner: '한도경', oc: 'HD', target: '박주원', tc: 'PJ', tag: '계약 종료 8일 전', src: ['pay', 'hr'] },
        { id: 'E', date: '2018.08.02', time: '22:41', place: '광주 분류장', title: '뒤바뀐 위험 화물', text: '위험 화물이 일반 라인으로 잘못 이송됐다. 사고 책임은 감사 보류 중인 직원에게 입력됐다.', owner: '서동훈', oc: 'SD', target: '정하린', tc: 'JH', tag: '감사 보류 대상', src: ['in', 'hr'] },
        { id: 'F', date: '2018.11.03', time: '03:14', place: '성운물류센터', title: '차단된 화재 경보', text: '화재 신호와 수동 경보가 본사에서 차단되고 영상까지 다시 쓰였다. 퇴직 처리된 최유리의 살아 있는 계정 토큰이 책임자로 쓰였다.', owner: '박기태', oc: 'PK', target: '최유리', tc: 'CY', tag: '퇴직 처리 · 계정 토큰 생존', src: ['pay', 'in'] },
        { id: 'G', date: '2019.04.26', time: '00:02', place: '본사 원본 서버', title: '다시 쓰인 여섯 이름', text: 'HANDOVER 배치가 앞선 여섯 사건의 담당자 필드를 한꺼번에 다시 썼다. 야간에 홀로 서버를 지키던 내가 다음 대체 책임자로 지정됐다.', owner: '조성원', oc: 'JS', target: '나', tc: 'ME-071', tag: '야간 단독 근무 · 원본 접근', src: ['in', 'hr'] },
      ],
      hints: ['카드 위쪽 배지가 카드 종류입니다. 현재 사건과 문자·날짜·시각이 같은 “승인 단서”와 “대체 단서”를 한 장씩 고르세요.', '같은 사건 문자라도 MIRROR COPY는 복제 사본이라 고르면 안 됩니다. 다른 사건 문자 카드도 섞여 있습니다.', '카드의 코드를 코드표에서 찾아 이름을 고르세요. 예: CASE A는 KM 강민호 → OJ 오지은.'],
      reward: ['R612'],
      okTitle: '일곱 사건 연결 완료', okText: '<p>일곱 개의 실이 코르크판 위에서 하나의 모양을 이룬다. 원래 승인자는 모두 결재 권한이 있는 사람들이었고, 대체 책임자들은 모두 무언가를 할 수 없는 상태였다.</p><p class="note">옆 칠판에서 공통 규칙을 정리하자.</p>',
    },
    rule: {
      loc: '라이트박스 작업실 · 규칙 칠판', title: 'HANDOVER 선택 규칙',
      prompt: '<table><tr><th>대체 책임자</th><th>당시 상태</th></tr><tr><td>오지은</td><td>계약 종료 12일 전</td></tr><tr><td>이선우</td><td>감사 보류 대상</td></tr><tr><td>김미정</td><td>장기 휴직 중</td></tr><tr><td>박주원</td><td>계약 종료 8일 전</td></tr><tr><td>정하린</td><td>감사 보류 대상</td></tr><tr><td>최유리</td><td>퇴직 처리 · 계정 토큰 생존</td></tr><tr><td>나</td><td>야간 단독 근무 · 원본 접근</td></tr></table>',
      steps: [
        { type: 'checks', label: '공통 상태 유형 고르기', prompt: '<p>공통 결론을 지지하는 상태 유형을 모두 고르세요. 원래 승인자의 특징이나 단순한 현장 연관성은 뺍니다.</p>',
          options: [
            { v: 'exit', label: '퇴직·계약 종료 임박', sub: '연락망과 권한이 곧 끊긴다.' },
            { v: 'audit', label: '감사 보류·강제 대기', sub: '시스템과 사무실 접근이 차단된다.' },
            { v: 'leave', label: '장기 휴직·연락 두절', sub: '즉시 출석해 반박하기 어렵다.' },
            { v: 'isolated', label: '야간 단독·고립 근무', sub: '동료 증언을 확보하기 어렵다.' },
            { v: 'onsite', label: '현장 상주', sub: '사건과 가까웠다는 이유만 강조한다.' },
            { v: 'authority', label: '결재 권한 보유', sub: '원래 승인자의 공통점에 가깝다.' },
          ],
          answer: ['exit', 'audit', 'leave', 'isolated'], extraText: '원래 승인자의 권한이나 현장 연관성이 섞였다. 대체자가 반박하지 못하게 만든 상태만 고르자.', okText: '네 상태가 하나의 약점으로 모인다.' },
        { type: 'phrase', label: '규칙 한 줄로 쓰기', prompt: '<p>네 상태가 공통으로 막는 행동을 구절로 적는다.</p>',
          tiles: ['즉시', '소명', '불가', '결재', '권한', '현장', '가능'], answer: [['즉시', '소명', '불가'], ['소명', '불가']],
          check: (w) => (w.includes('결재') || w.includes('권한') ? '그건 원래 승인자 쪽 특징이다.' : '지목된 직후 대체자들이 무엇을 할 수 없었나?') },
      ],
      hints: ['대체자가 현장에 있었는지가 아니라, 지목된 직후 무엇을 할 수 없었는지 비교하세요.', '퇴직 임박, 감사 보류, 장기 휴직, 야간 고립. 네 가지 모두 곧바로 나타나 반박하기 어렵게 만듭니다.', '네 유형을 고른 뒤 “즉시 소명 불가”를 적으세요.'],
      reward: ['R613'],
      okTitle: '규칙 확정', okText: '<p><b>HANDOVER는 즉시 소명할 수 없는 사람을 고른다.</b> 서로 다른 일곱 사건이 같은 규칙을 증명한다.</p><p>그런데 연결표의 대체 순번은 01부터 08까지 있는데, 사건은 일곱 개뿐이다. 잘려 나간 행이 하나 있다. 라이트박스로.</p>',
    },
    layers: {
      wide: true, loc: '라이트박스', title: '삭제된 행 복원',
      prompt: '<p>잘려 나간 여덟 번째 행의 흔적이 종이 세 장에 나뉘어 남았다. 겹치면 복사기 압력 자국이 하나로 보일 것이다.</p>',
      steps: [
        { type: 'layers', label: '종이 세 장 겹치기',
          sheets: [{ name: '잘린 명단', text: '18 - ____ - 263', x: -18, y: 12, r: 90 }, { name: '출력 대기열', text: 'PRINT YSJ · ____ 14', x: 20, y: -14, r: 270 }, { name: '복사기 압력 지도', text: '05 ____ · ORIGINAL', x: -12, y: -20, r: 180 }],
          composite: '<div style="text-align:center;line-height:1.5">18 − <b style="color:#e5484d">05</b> <b style="color:#e5484d">14</b> − 263<br><small>PRINT YSJ · 원본 압흔 일치</small></div>', okText: '압흔이 하나로 겹쳤다.' },
        { type: 'phrase', label: '붉은 획 읽기', prompt: '<div class="paper">겹친 판독: 18 − <b>05</b> <b>14</b> − 263\n출력 코드: YSJ</div><p>붉게 복원된 가운데 획을 <b>왼쪽부터</b> 고르세요.</p>',
          tiles: ['18', '05', '14', '263', '51'], answer: [['05', '14']], check: () => '겹쳤을 때 가운데에서 붉게 이어지는 두 획만, 왼쪽부터.' },
        { type: 'choice', label: '인사 원본 대조', prompt: '<p>사번 18-0514-263. 출력 코드 YSJ에 해당하는 사람은?</p>',
          options: [{ v: '윤서진', label: '윤서진', sub: '내부감사 · 2018년 입사' }, { v: '최유리', label: '최유리', sub: '기록관리 · 퇴사', why: '최유리의 식별자는 CYR-114였다.' }, { v: '나', label: '나', sub: '19-0426-071', why: '내 번호는 19로 시작한다.' }],
          answer: '윤서진' },
      ],
      hints: ['각 종이 네 모서리의 ＋가 하나로 보이게 하세요. 0이 아니라 세 종이의 값이 서로 같으면 됩니다.', '1번 종이를 기준으로 2·3번의 좌우·상하·회전 값을 똑같이 맞추세요.', '가운데 획은 05와 14, YSJ는 윤서진입니다.'],
      reward: ['R782'],
      okTitle: '여덟 번째 행', okText: '<div class="paper">대체 순번 07 · 18-0514-263 · 윤서진\n상태: 감사 보류 / 강제 대기발령 → <b>실행 중단</b>\n\n대체 순번 08 · 19-0426-071 · 나\n상태: 야간 단독 근무 / 원본 서버 접근 가능 → <b>06:30 확정 예정</b></div><p>윤서진이 강제 대기발령을 받으며 계획이 멈추자, 그 다음 대체자로 내가 선택됐다.</p>',
    },
    branch: {
      type: 'keypad', len: 4, answer: '5148',
      loc: '라이트박스 작업실 · 반출 단말', title: '분기 기록 조립',
      prompt: '<p>반출 단말은 복원된 사번과 다음 대체 순번으로 만든 네 자리 코드를 요구한다.</p><table><tr><th>복원된 행</th><td>18-0514-263 · 중앙키 0514</td></tr><tr><th>규칙</th><td>중앙키의 맨 앞 0은 검증용이므로 뺀다 → 뒤에 <b>다음 대체 순번</b>을 붙인다</td></tr></table>',
      wrong: { '5147': '07은 윤서진의 순번이다. 다음 순번은?', '0514': '중앙키만 넣었다. 다음 대체 순번을 붙여야 한다.' },
      hints: ['사번 전체가 아니라 가운데 네 자리와 대체 순번만 씁니다.', '0514에서 앞의 0을 빼면 514가 남습니다.', '514 뒤에 다음 대체 순번 8. 정답은 5148입니다.'],
      finish: true,
    },
  },

  objectives: [
    { text: '연표·이관 대장·배치도 세 자료 모으기', done: (g) => g.hadAll(['R205', 'R204', 'R208']), hint: ['문서수발실의 연표함과 창구 대장, 장기 보존 선반의 배치도를 보세요.'] },
    { text: '명단 상자를 찾아 봉인 띠 복원하기', done: (g) => g.solved('r04'), hint: ['장기 보존 선반의 R행 상자들을 누르세요.', '이관 대장의 신규 행 + 원위치 숫자.'] },
    { text: '사건 보드에서 일곱 사건 연결하기', done: (g) => g.solved('board'), hint: ['라이트박스 작업실 왼쪽 위 사건 보드를 누르세요.'] },
    { text: 'HANDOVER 선택 규칙 찾기', done: (g) => g.solved('rule'), hint: ['사건 보드 옆 칠판을 누르세요.'] },
    { text: '라이트박스에서 잘린 행 복원하기', done: (g) => g.solved('layers'), hint: ['라이트박스 위 종이 세 장의 ＋ 표시를 맞추세요.'] },
    { text: '반출 단말에 분기 기록 넣기', done: (g) => g.solved('branch'), hint: ['오른쪽 아래 반출 단말을 누르세요.'] },
  ],

  ending: {
    title: '대체 책임자 원본 확보',
    html: '<p>HANDOVER는 범인을 찾지 않았다. 퇴직, 감사 보류, 장기 휴직, 야간 고립처럼 <b>즉시 소명할 수 없는 사람</b>을 골라 책임을 옮겼다.</p><p>그때 암호화 통화가 연결된다. 화면에는 K라는 한 글자만 보인다.</p><blockquote>K · “명단만 공개하면 회사는 최유리가 조작했다고 할 거야. HANDOVER가 실제로 계정을 바꾼 실행 기록이 필요해.”</blockquote><p>다음 장소는 본사 인사 데이터센터의 폐기 예정 백업 장치다. <span class="note">— Act 3 「대체자」에서 계속</span></p>',
    branch: '5148',
    summary: '잘려 나간 여덟 번째 행은 윤서진의 사원번호 18-0514-263. 윤서진이 강제 대기발령되며 계획이 중단되자 그 다음 대체자로 내가 선택됐다.',
  },
});
