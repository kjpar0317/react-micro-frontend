---
name: Project Structure & Scaffolding
description: Nx 모노레포 기반의 폴더 구조 정의 및 pnpm 기반의 앱/라이브러리 생성 가이드
---

# Project Structure & Scaffolding

이 문서는 프로젝트의 표준 폴더 구조를 정의하며, 새로운 마이크로 앱이나 라이브러리를 일관성 있게 생성하기 위한 지침과 명령어를 포함합니다. 패키지 매니저는 **pnpm**을 사용합니다.

## 📁 Standard Directory Layout

프로젝트는 **Nx Monorepo** 구조를 따르며, 크게 `apps/`와 `libs/`로 나뉩니다.

### 1. `apps/` (Applications)
실제로 배포 가능한 단위인 마이크로 프런트엔드 애플리케이션들이 위치합니다.
- `apps/host`: 공통 쉘 애플리케이션 (Host).
- `apps/remote-main`: 로그인, 대시보드 등 통합 공통 앱.
- `apps/remote-billing`: 빌링 서비스 앱.
- `apps/remote-wired`: 유선 서비스 앱.
- `apps/remote-wireless`: 무선 서비스 앱.

### 2. `libs/` (Libraries)
여러 앱에서 공유하거나 특정 앱의 로직을 분리한 재사용 가능한 코드들이 위치합니다.
- `libs/shared/ui`: Tailwind CSS 및 Radix UI 기반의 공통 UI 컴포넌트 라이브러리.
- `libs/shared/hooks`: 공통 React Hooks 라이브러리.
- `libs/shared/utils`: 범용 유틸리티 및 헬퍼 라이브러리.

## 🛠️ Scaffolding Commands (pnpm 기반)

사용자가 "생성해줘" 또는 특정 앱/앱 구조를 만들어 달라고 요청할 때 Antigravity는 다음 명령어를 참조하여 구조를 생성합니다.

### 마이크로 앱 (Remote) 생성
```bash
pnpm exec nx generate @nx/react:app apps/new-remote-app --bundler=vite --unitTestRunner=vitest --interactive=false
```

### 공유 라이브러리 (Library) 생성
```bash
pnpm exec nx generate @nx/react:library libs/shared/new-lib --bundler=vite --unitTestRunner=vitest --interactive=false
```

## 📐 Naming Conventions

- **App Name**: `remote-[feature]` 형식 (예: `remote-billing`).
- **Lib Name**: `shared-[type]` 형식 (예: `shared-ui`, `shared-hooks`).
- **File Name**: PascalCase (컴포넌트), camelCase (함수/변수), kebab-case (파일 경로).

---

## 🚀 "생성해줘" 요청 처리 프로세스

사용자가 특정 기능을 위한 폴더 구조 생성을 요청하면 Antigravity는 다음 단계를 수행합니다:

1.  **구조 설계**: `GEMINI.md`와 본 `SKILL.md`를 참조하여 최적의 위치(`apps/` 또는 `libs/`)를 결정합니다.
2.  **명령어 실행**: `pnpm exec nx generate` 명령어를 사용하여 표준에 맞는 보일러플레이트를 생성합니다.
3.  **UI 연동**: `libs/shared/ui`의 공용 컴포넌트 및 Tailwind 설정을 자동으로 적용합니다.
