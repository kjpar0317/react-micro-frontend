# 🚀 React Micro-frontend (MFE) Project Guide

이 문서는 AI 어시스턴트(Antigravity)가 이 프로젝트의 아키텍처를 이해하고 우수한 코드를 작성하기 위한 최상위 지침서입니다.

---

## 🏗️ Project Overview

이 프로젝트는 **React 19**, **Vite**, **TanStack Router**를 기반으로 하며, **Nx** 모노레포 환경에서 **Module Federation**을 통해 여러 마이크로 프런트엔드 애플리케이션을 통합합니다. 패키지 매니저는 **pnpm**을 사용하며, 전역적으로 **TypeScript**와 **Biome**을 통해 코드 품질을 관리합니다.

### Application Structure (`apps/`)
- `apps/host`: 공통 쉘 애플리케이션 (Common Host)
- `apps/remote-main`: 로그인, 대시보드 등 통합 공통 앱
- `apps/remote-billing`: 빌링 서비스 앱
- `apps/remote-wired`: 유선 서비스 앱
- `apps/remote-wireless`: 무선 서비스 앱

### Library Structure (`libs/shared/`)
- `libs/shared/ui` (`@shared/ui`): Tailwind CSS + Radix UI 기반 공통 컴포넌트
- `libs/shared/hooks` (`@shared/hooks`): 공통 React Hooks
- `libs/shared/utils` (`@shared/utils`): 범용 유틸리티 및 헬퍼
- `libs/shared/types` (`@shared/types`): 프로젝트 전반의 공통 Type Definition

## 📂 Agent Directory Structure

`.agent/` 디렉토리는 AI 어시스턴트가 프로젝트 전반에 걸쳐 일관된 품질을 유지하도록 돕는 가이드입니다.

- **`GEMINI.md` (본 문서)**: 프로젝트 전체 아키텍처 및 핵심 규칙 정의.
- **`skills/`**: 기술 도메인별 상세 구현 가이드.

## 🎯 Core Principles & Rules (pnpm + TypeScript 기반)

1.  **TypeScript First**: 모든 코드는 TypeScript로 작성하며, `tsconfig.base.json`의 `strict: true` 옵션을 준수합니다.
2.  **Path Aliases**: 라이브러리 참조 시 `@shared/` 접두사가 붙은 별칭을 사용합니다 (예: `import { Button } from '@shared/ui'`).
3.  **Shared Types**: 마이크로 앱 간 중복되는 인터페이스나 타입은 `libs/shared/types`에서 관리합니다.
4.  **Usage of pnpm**: 패키지 관리는 `pnpm`을 통해 수행하며, 워크스페이스 의존성을 공유합니다.
5.  **Biome for Quality**: ESLint/Prettier 대신 Biome을 사용하여 빠른 린트와 포맷팅을 수행합니다.

## 🛠️ How to Use Skills

- **기본 기술 스택**: `skills/basic/SKILL.md` (React 19, Query 등)
- **MFE 연동**: `skills/remote-app/SKILL.md` (Module Federation 설정)
- **구조 및 생성**: `skills/project-structure/SKILL.md` (Nx pnpm 명령어 및 구조 가이드)
