---
name: Remote Application Development
description: Module Federation을 사용하여 새로운 Remote Micro-frontend 앱을 개발하고 통합하는 가이드 (pnpm)
---

# Remote Application Development

이 스킬은 새로운 Remote 마이크로 프런트엔드 애플리케이션을 생성하고, Host 애플리케이션에 연결하며, 독립적으로 개발하는 과정을 다룹니다. 패키지 관리는 `pnpm`을 사용합니다.

## 1. Remote 앱 생성 (Vite 기반)

Vite와 `@originjs/vite-plugin-federation`을 사용하여 새로운 Remote 앱을 구성합니다.

### `vite.config.ts` 설정 예시
```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'remote_app',
      filename: 'remoteEntry.js',
      exposes: {
        './Button': './src/components/Button.tsx',
      },
      shared: ['react', 'react-dom', '@tanstack/react-router'],
    }),
  ],
  build: {
    modulePreload: false,
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
  },
});
```

## 2. Host 앱에서 원격 컴포넌트 연결

### `vite.config.ts` (Host)
```typescript
federation({
  name: 'host_app',
  remotes: {
    remoteApp: 'http://localhost:5001/assets/remoteEntry.js',
  },
  shared: ['react', 'react-dom'],
})
```

## 3. 개발 체크리스트

- [ ] **pnpm workspace**: `pnpm-workspace.yaml` 설정이 올바른지 확인합니다.
- [ ] **포트 관리**: 각 Remote 앱은 겹치지 않는 고유한 포트를 할당받아야 합니다.
- [ ] **Shared 의존성**: Host와 Remote 간에 React 등 핵심 라이브러리 버전이 일치하는지 확인합니다.

## 4. 유용한 명령어 (pnpm)

- `pnpm exec nx serve [app-name]`: 로컬에서 독립적으로 개발 및 테스트.
- `pnpm exec nx build [app-name]`: 프로덕션용 빌드 생성.
- `pnpm exec nx run-many --target=test`: 전체 프로젝트 테스트 수행.
