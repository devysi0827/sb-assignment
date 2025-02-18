# 실행 환경
```
npm i
npm run dev
```

# 평가 기준
- 구현의 완성도
- 효율성
- 가독성

# 폴더 구조
```
src/
 ├── shared/            # 도메인과 관계없이 공통적으로 사용되는 유틸리티, 컴포넌트, 라이브러리
 │
 ├── entities/          # 최소 단위의 데이터 및 UI (비즈니스 로직 없음)
 │    ├── entity/       # 도메인과 관련된 최소 반복 컴포넌트
 │    │    ├── model/   # 타입 또는 로직
 │    │    ├── ui/      # UI
 │
 ├── features/          # 특정 도메인별 비즈니스 로직을 포함한 기능 단위
 │    ├── feature/      # 특정 기능
 │    │    ├── model/   # 상태 관리(store.ts) / 비즈니스 로직(useHook.ts) / 타입(type.ts)
 │    │    ├── api/     # (필요 시) API 요청 정의
 │    │    ├── ui/      # UI
 │
 ├── pages/             # UI만 포함하는 페이지 구성
 ├── app/               # App Global 상태들 관리  
 ├── App.tsx           # 라우팅 관리
 ├── main.tsx           # 앱 진입점
 ```


# TBD
- import 순서 정리