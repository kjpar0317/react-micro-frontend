---
name: Project Structure & Scaffolding
description: Nx 모노레포 기반의 폴더 구조 정의 및 pnpm/TypeScript 기반의 앱/라이브러리 생성 가이드
---

# Project Structure & Scaffolding

이 문서는 프로젝트의 표준 폴더 구조를 정의하며, 새로운 마이크로 앱이나 라이브러리를 일관성 있게 생성하기 위한 지침과 명령어를 포함합니다. 패키지 매니저는 **pnpm**, 언어는 **TypeScript**를 사용합니다.

## 📁 Standard Directory Layout

프로젝트는 **Nx Monorepo** 구조를 따르며, 크게 `apps/`와 `libs/`로 나뉩니다.

### 1. `apps/` (Applications)
실제로 배포 가능한 단위인 마이크로 프런트엔드 애플리케이션들이 위치합니다.
- `apps/host`: 메인 애플리케이션.
- `apps/remote-billing`: 빌링 서비스 앱.
- `apps/remote-wired`: 유선 서비스 앱.
- `apps/remote-wireless`: 무선 서비스 앱.

### 2. `libs/` (Libraries)
여러 앱에서 공유하거나 특정 앱의 로직을 분리한 재사용 가능한 코드들이 위치합니다.
- `libs/shared/ui` (`@shared/ui`): Tailwind CSS 및 Radix UI 기반의 공통 UI 컴포넌트.
- `libs/shared/hooks` (`@shared/hooks`): 공통 React Hooks 라이브러리.
- `libs/shared/utils` (`@shared/utils`): 범용 유틸리티 및 헬퍼 라이브러리.
- `libs/shared/types` (`@shared/types`): 공통 Type Definition 라이브러리.

## 🛠️ Path Aliases (TypeScript)

모든 공유 라이브러리는 `tsconfig.base.json`에 정의된 `@shared/` 접두사를 사용하여 참조합니다.
- 예: `import { sharedType } from '@shared/types';`
- 예: `import { Button } from '@shared/ui';`

## 🏗️ Scaffolding Commands

새로운 앱 또는 라이브러리 생성 시 다음 명령어를 사용합니다.

### 마이크로 앱 (Remote) 생성
```bash
pnpm exec nx generate @nx/react:app apps/[app-name] --bundler=vite --unitTestRunner=vitest --interactive=false
```

### 공유 라이브러리 (Library) 생성
```bash
pnpm exec nx generate @nx/react:library libs/shared/[lib-name] --bundler=vite --unitTestRunner=vitest --interactive=false
```

## 📐 Naming Conventions

- **App Name**: `remote-[feature]` 형식 (예: `remote-billing`).
- **Lib Name**: `@shared/[type]` 형식 (예: `@shared/ui`, `@shared/types`).
- **File Name**: PascalCase (컴포넌트), camelCase (함수/변수), kebab-case (파일 경로).

---

## 🚀 "생성해줘" 요청 처리 프로세스

사용자가 특정 기능을 위한 폴더 구조 생성을 요청하면 Antigravity는 다음 단계를 수행합니다:

1.  **구조 설계**: `GEMINI.md`와 본 `SKILL.md`를 참조하여 최적의 위치를 결정합니다.
2.  **명령어 실행**: `pnpm exec nx generate` 명령어를 사용하여 표준에 맞는 보일러플레이트를 생성합니다.
3.  **TS 설정**: `tsconfig.base.json`에 새로운 Path Alias를 등록하고, Biome 체크를 수행합니다.
