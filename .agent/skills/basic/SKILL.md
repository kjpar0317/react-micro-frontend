---
name: React Micro-frontend Development
description: React 19, Vite, TanStack Router 및 Java 기반의 마이크로 프런트엔드 아키텍처 개발 가이드 (pnpm)
---

# React Micro-frontend Development

이 문서는 React 19, Vite, TanStack Router, 그리고 Java(Spring Boot) 기반의 마이크로 프런트엔드(MFE) 아키텍처를 이해하고 개발하기 위한 필수 기술 스택 및 지침을 정의합니다. 모든 패키지 관리는 `pnpm`을 사용합니다.

## 1. Frontend Core (UI & Library)

### React 19 (Beta/Stable)
*   **use API**: 데이터 페칭 및 프로미스 처리 방식 이해.
*   **Actions**: `<form>`과 함께 사용하는 비동기 트랜잭션 관리.
*   **Ref as a prop**: `forwardRef` 없이 컴포넌트를 설계하는 현대적인 방식.
*   **Tailwind & Radix UI**: `libs/shared/ui`에서 제공하는 공용 UI 컴포넌트를 우선적으로 활용합니다.
*   **Biome**: ESLint/Prettier 대신 Biome을 사용하여 빠른 린트 및 포맷팅을 수행합니다.

### Vite & Module Federation
*   **Module Federation**: `@originjs/vite-plugin-federation` 설정을 통한 Remote/Host 앱 구성 및 런타임 통합.
*   **Shared Dependency**: 공통 라이브러리(React, Router 등)의 싱글톤 관리.

## 2. Routing & State Management

### TanStack Router
*   **Type-Safe Routing**: 전체 앱의 경로를 타입으로 관리하여 런타임 에러 방지.
*   **Search Params Validation**: Zod를 활용한 쿼리 스트링 타입 검증 및 안정성 확보.

### TanStack Query (React Query)
*   **Data Synchronization**: Java 백엔드와의 효율적인 데이터 동기화 및 캐싱 전략.
*   **Suspense Integration**: `useSuspenseQuery`를 통한 React 19의 최신 렌더링 기능 활용.

## 3. Monorepo & Infrastructure

### Nx (Build System)
*   **Workspace Layout**: `apps/`와 `libs/`를 명확히 구분하여 설계.
*   **Affected Commands**: `pnpm nx affected --target=build` 등을 활용하여 효율적인 CI/CD 구성.

---

## 💡 학습 로드맵

1.  **초급**: React 19 기본 문법 및 Vite를 이용한 단일 앱 빌드.
2.  **중급**: Nx 모노레포 구성 및 pnpm을 이용한 워크스페이스 관리.
3.  **고급**: Module Federation을 통한 앱 간 결합 및 공유 UI 라이브러리(Tailwind+Radix) 연동.