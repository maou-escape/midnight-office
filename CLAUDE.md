# Midnight Office · 작업 안내 (Claude Code용)

1인용 방탈출 웹게임. 예전에 만든 글 선택형 「Midnight Office」 Episode 1(5막)·Episode 2(Act 1·2)를 방 조사형으로 리메이크했다. 빌드 과정 없는 정적 사이트이며 GitHub Pages로 배포한다.

- 저장소: https://github.com/maou-escape/midnight-office
- 플레이 주소: https://maou-escape.github.io/midnight-office/
- 배포: `main` 브랜치에 push하면 1~2분 뒤 Pages에 반영된다.

## 개인정보 규칙 (반드시 지킬 것)

- 커밋 작성자 이메일은 noreply 주소만 쓴다. 이 저장소에서 처음 작업할 때 아래를 실행한다.
  ```
  git config user.name "nohchann3607-del"
  git config user.email "302767362+nohchann3607-del@users.noreply.github.com"
  ```
- 실명, 직장명, 개인 gmail 주소를 코드·문서·커밋 메시지에 넣지 않는다.

## 파일 구성

| 경로 | 내용 |
| --- | --- |
| `index.html` | 화면 뼈대와 스크립트 불러오기 |
| `css/style.css` | 전체 스타일. Episode 2는 `body[data-ep="2"]`로 초록 강조색 |
| `js/art.js` | 방 배경을 SVG로 그리는 소품 모음 (좌표 1600×900) |
| `js/engine.js` | 저장, 방 이동, 조사 지점, 소지품·조합, 퍼즐 창, 힌트, 수첩, 엔딩, 소리 |
| `js/puzzles.js` | 퍼즐 장치: keypad, dial, choice, checks, phrase, overlay, circuit, maze, balance, fragments, grille, layers, accuse, board, view |
| `js/chapters/e1a1.js` … `e2a2.js` | 막별 데이터 (방, 소품, 조사 지점, 물건, 퍼즐, 목표, 엔딩) |
| `js/boot.js` | 시작 |
| `assets/audio/*.mp3` | 원작 배경음악 (128kbps로 다시 인코딩). Episode 2 Act 2는 원작대로 `ep1-act2.mp3`를 쓴다 |
| `tools/playtest.js` | 모든 막을 화면 버튼으로 엔딩까지 진행하는 자동 테스트 |

## 데이터 작성법

- 방의 `art` 배열 소품에 `spot: {...}`을 붙이면 그 소품 영역이 조사 지점이 된다. 소품 없는 지점은 `spots` 배열에 좌표로 둔다.
- 조사 지점 동작: `look`(글) + `give`(물건 지급), `goto`(방 이동), `puzzle`(장치 열기), `use: {물건id: 결과}`(물건 사용), `need`/`locked`(조건과 잠김 문구), `show`(보이는 조건), `onLook`(직접 처리).
- 결과 객체: `{ html, give, take, set, puzzle, goto, then }`.
- 퍼즐은 `type` 하나 또는 `steps: [...]`(차례로 푸는 여러 단계), 보조 화면은 `pre: [...]`. 힌트는 반드시 3단계.
- 물건 조합은 `items.X.combine = { Y: (g) => 결과 }`, 소지품 버튼 동작은 `items.X.action`.
- 저장 키는 `midnight-office-remake-v1`. 저장 형태를 바꾸면 이전 저장도 열리는지 확인한다.
- 퍼즐 정답을 바꾸면 그 퍼즐의 `hints` 3단계, 관련 문서 문구, `tools/playtest.js`의 풀이도 함께 고친다.

## 퍼즐과 정답 (스포일러)

| 막 | 장치 | 정답 |
| --- | --- | --- |
| E1 A1 | 책상 서랍 | 0426 |
| | 배전반 (육각 키 사용) | B-08 |
| | 서버실 키패드 | 14399 (계산기 → 전화기 자리 변환) |
| | 사건 보드 | 계획된 정전 |
| E1 A2 | 도어폰 | 731 |
| | 조명 배치도 + 카메라 도면 (좌우 뒤집어 겹치기) | 2408 |
| | 보안실 키패드 | 2408 |
| | K 카드 / 내 카드 / 시각 차이 | 복제 카드 / 00:02 / 3 |
| | 사건 보드 | 기록 조작 |
| E1 A3 | 화물 통제판 | 318 |
| | UV 검사기 (K 줄 뒤집기) | 6117 |
| | 코어 스위치 | 31704 |
| | 비밀 서랍 | R-17 |
| | R-17 봉인함 | MIRROR |
| | 반출 기록대 | 의도적 유도 |
| E1 A4 | 화재 수신기 / 통화 보존 | 02:13 / 02:13 |
| | 영상 복원 명령 | MIRROR |
| | 인사 처분 | 강제 대기발령 |
| | 전표함 | C-17 |
| | 검증대 | 원본 검증 |
| E1 A5 | 분기 인증 | 4341 |
| | K / 윤서진 / 출입 신원 | 개발 책임 / 원본 보존 / 사원번호 복제 |
| | 회계 전송함 / 패키지 | 883 / 743543 |
| | 출입 콘솔 | 퇴근 |
| E2 A1 | 회로 (휴대전화+리더) | ① 왼·위, ② 아래·오른, ③ 가로, 오른쪽 위 왼·아래, ④ 위·오른 |
| | 천공판 (슬리브+편지) | 0°, 오른쪽 2칸·아래 1칸 → 인수인계 |
| | 첨부 파일 키워드 | 인수인계 |
| | 자석 미로 | 위·오른·위·아래·오른·위 |
| | 추리 상자 | 최유리 / 작성자 필드 덮어쓰기 / 다음 대체 책임자에게 경고 / E-03·04·05·06 |
| | 책임 저울 | 왼쪽 RM·VOICE·ENVELOPE, 오른쪽 OWNER·19-0426-071·MIRROR |
| | 열쇠함 | 조각 1→2→3→4 정방향, 3071 |
| E2 A2 | 명단 상자 / 봉인 띠 | R04 / 봉인 시작–R–0–4 |
| | 사건 보드 | A 강민호→오지은 … G 조성원→나 |
| | 선택 규칙 | 퇴직·감사·휴직·고립 / 즉시 소명 불가 |
| | 라이트박스 | 세 장 값 맞추기 → 05·14 → 윤서진 |
| | 반출 단말 | 5148 |

원작 대비 바로잡은 곳: E1 A2 조명 배치도는 원작 그림으로는 좌우 반전 시 8042가 되어 정답 2408과 맞지 않았다. 그래서 도면 숫자를 바꿨다. E1 A3 UV는 원작대로면 세 번째 칸이 비어 정답 6117이 나오지 않았다. 그래서 K 줄을 `· 1 · ·`로 바꿨다.

## 검증

사용자는 토큰 절약을 위해 검증을 직접 하는 것을 선호한다. 큰 수정 뒤에만, 요청받았을 때 아래를 실행한다.

```
python3 -m http.server 8766        # 다른 터미널에서
npm i -D playwright && npx playwright install chromium   # 처음 한 번
node tools/playtest.js             # MUTE=1 소리 끔, ONLY=e1a2 한 막만, SHOTS=폴더 엔딩 캡처
```
