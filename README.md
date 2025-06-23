📚가계부 프로젝트

```
📁 파일 구조
household-book-main/
└─ household-book-main/
   ├─ public/
   │  └─ locales/
   │     ├─ ko/
   │     ├─ en/
   │     ├─ ja/
   │     ├─ fr/
   │     └─ es/
   ├─ src/
   │  ├─ app/
   │  │  ├─ [locale]/
   │  │  │  ├─ layout.tsx
   │  │  │  └─ page.tsx
   │  │  ├─ intro/
   │  │  │  ├─ AnimatedEmojiIntro.tsx
   │  │  │  └─ MoneyChargeBar.tsx
   │  │  ├─ globals.css
   │  │  ├─ layout.tsx
   │  │  └─ page.tsx
   │  ├─ components/
   │  │  ├─ BalanceCard.tsx
   │  │  ├─ chart/
   │  │  │  └─ PieChart.tsx
   │  │  ├─ common/
   │  │  │  ├─ ConfirmModal.tsx
   │  │  │  ├─ CustomDateInput.tsx
   │  │  │  └─ LanguageSelector.tsx
   │  │  ├─ data/
   │  │  │  ├─ DataManager.tsx
   │  │  │  └─ DateFilter.tsx
   │  │  ├─ icons/
   │  │  │  └─ CalendarIcon.tsx
   │  │  ├─ Skeleton/
   │  │  │  ├─ HomeSkeleton.tsx
   │  │  │  └─ SkeletonBox.tsx
   │  │  ├─ transaction/
   │  │  │  ├─ TransactionForm.tsx
   │  │  │  ├─ TransactionItem.tsx
   │  │  │  └─ TransactionList.tsx
   │  │  └─ Home.tsx
   │  ├─ features/
   │  │  └─ finance/
   │  │     └─ financeSlice.ts
   │  ├─ store/
   │  │  └─ store.ts
   │  ├─ types/
   │  │  ├─ BalanceCardTypes.ts
   │  │  ├─ ConfirmModalTypes.ts
   │  │  ├─ DataManagerTypes.ts
   │  │  ├─ DateFilterTypes.ts
   │  │  ├─ PieChartTypes.ts
   │  │  └─ TransactionTypes.ts
   │  └─ i18n.ts
   ├─ package.json
   ├─ README.md
   └─ tsconfig.json

🛠️ 사용 라이브러리 및 기술 스택
Next.js: React 기반 프레임워크, app 디렉토리 구조 사용
React 19
Redux Toolkit, React-Redux: 상태 관리
Tailwind CSS: 반응형 및 커스텀 스타일링
GSAP: 인트로 애니메이션
react-datepicker, date-fns/locale: 날짜 선택 및 다국어 날짜 포맷
i18next, react-i18next, next-i18next: 다국어(i18n) 지원
chart.js, react-chartjs-2, chartjs-plugin-datalabels: 파이 차트 시각화
TypeScript: 타입 안정성
localStorage:
브라우저의 로컬스토리지를 활용하여 Redux 상태를 자동 저장/복원, 데이터 영속성 및 백업/복원 기능 제공

🏗️ 컴포넌트 구조 및 주요 흐름
Home.tsx
전체 페이지의 메인 컴포넌트.
언어 선택(LanguageSelector), 날짜 필터(DateFilter), 잔액 카드(BalanceCard), 데이터 관리(DataManager), 트랜잭션 폼(TransactionForm), 트랜잭션 리스트(TransactionList) 등으로 구성.
로딩 시 Skeleton UI(HomeSkeleton) 표시.
BalanceCard
현재 잔액, 수입/지출 합계, 파이 차트(PieChart) 표시.
DataManager
데이터 내보내기/가져오기(로컬 JSON 파일) 기능.
TransactionForm
트랜잭션(수입/지출) 등록 폼.
금액 입력 시 앞자리 0 자동 제거, 날짜/카테고리/설명 입력 지원.
TransactionList/TransactionItem
트랜잭션 내역 리스트 및 개별 아이템.
수정/삭제/확인 모달(ConfirmModal) 제공.
공통 컴포넌트
LanguageSelector: 언어 선택 드롭다운
DateFilter: 연/월 선택, react-datepicker + 다국어
CustomDateInput: 커스텀 날짜 인풋
ConfirmModal: 삭제 등 확인 모달
SkeletonBox, HomeSkeleton: 로딩 스켈레톤 UI
인트로/애니메이션
AnimatedEmojiIntro, MoneyChargeBar: GSAP 기반 인트로/프로그레스 애니메이션

🗂️ 상태 관리 구조
Redux Toolkit
src/features/finance/financeSlice.ts
트랜잭션 추가/수정/삭제, 전체 상태(setAll) 관리
잔액(balance) 자동 계산
src/store/store.ts
Redux store 설정
상태 변경 시 localStorage에 자동 저장(브라우저 환경에서만)

다국어(i18n) 적용
i18next, react-i18next, next-i18next
src/i18n.ts에서 각 언어별 리소스(ko, en, ja, fr, es) 등록
public/locales/ 하위에 각 언어별 common.json 파일로 번역문 관리
컴포넌트에서 useTranslation("common") 훅으로 번역 사용
날짜 관련은 date-fns/locale과 react-datepicker의 locale 옵션으로 처리

🎨 UI/UX 및 반응형
Tailwind CSS
flex-row, flex-col, gap, md:items-center 등으로 반응형 레이아웃 구현
데스크탑/모바일에서 필터, 폼, 리스트 등 레이아웃 자동 전환
인풋, 버튼, 카드 등 일관된 스타일 적용
스켈레톤/로딩/인트로
데이터 로딩 시 Skeleton UI(HomeSkeleton, SkeletonBox)
인트로 애니메이션(AnimatedEmojiIntro, MoneyChargeBar)
시각적 피드백 및 UX 강화

💡 커밋 메시지 컨벤션
feat: 기능 추가/UX 개선
refactor: 코드 구조 개선/타입 분리
style: 스타일만 변경
예시:
feat: 스켈레톤 UI 및 인트로 애니메이션 추가
refactor: 컴포넌트 타입 분리 및 구조 개선
style: DateFilter, LanguageSelector 스타일 통일

⚙️ 실행 방법

yarn install
yarn dev

# 또는

npm install
npm run dev

📚 개발 기록 & TIL

- [TIL(개발 일지) 모음](https://tkddyd0817.tistory.com/117)
  개발 과정에서의 트러블슈팅, 시행착오, 해결 방법, 팁 등을 정리한 문서입니다.

  - 주요 트러블슈팅 예시
    - 다국어(i18n) 적용 시 next-i18next와 react-i18next 설정 충돌 해결
    - Redux 상태와 localStorage 동기화 시 데이터 초기화 문제
    - Tailwind 반응형 레이아웃에서 모바일/데스크탑 UI 깨짐 현상
    - react-datepicker의 다국어 날짜 포맷 적용 오류
    - chart.js 파이차트에서 데이터 라벨이 겹치는 문제 해결
```
