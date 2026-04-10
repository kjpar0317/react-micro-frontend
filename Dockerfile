# ================================
# Stage 1: Build
# ================================
FROM node:22-alpine AS builder

# libc6-compat: glibc 의존 네이티브 모듈 대응
RUN apk add --no-cache libc6-compat

WORKDIR /app

# pnpm 버전 고정 — 재현 가능한 빌드 보장
RUN corepack enable && corepack prepare pnpm@9.15.4 --activate

# 의존성 레이어 캐시 최적화: lockfile + package.json만 먼저 복사
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./

# 각 패키지의 package.json (소스 변경과 캐시 분리)
COPY apps/host/package.json             ./apps/host/
COPY apps/remote-billing/package.json   ./apps/remote-billing/
COPY apps/remote-wired/package.json     ./apps/remote-wired/
COPY apps/remote-wireless/package.json  ./apps/remote-wireless/
COPY libs/shared/hooks/package.json     ./libs/shared/hooks/
COPY libs/shared/types/package.json     ./libs/shared/types/
COPY libs/shared/ui/package.json        ./libs/shared/ui/
COPY libs/shared/utils/package.json     ./libs/shared/utils/

RUN pnpm install --frozen-lockfile

# 소스 전체 복사 (.dockerignore로 불필요 파일 제외)
COPY . .

ARG APP_NAME=host

# Nx 데몬 비활성화: CI/컨테이너 환경에서 불필요한 백그라운드 프로세스 방지
RUN NX_DAEMON=false pnpm nx build ${APP_NAME} --prod

# ================================
# Stage 2: Production
# ================================
# 날짜 태그 고정으로 베이스 이미지 변경에 의한 예상치 못한 동작 방지
FROM nginx:1.27-alpine

ARG APP_NAME=host

# 불필요한 기본 콘텐츠 제거
RUN rm -rf /usr/share/nginx/html/*

# 빌드 아티팩트 복사
COPY --from=builder /app/dist/apps/${APP_NAME} /usr/share/nginx/html/

# nginx 설정 복사 후 문법 검증
COPY deployment/nginx.conf /etc/nginx/conf.d/default.conf
RUN nginx -t

# 보안: nginx 워커는 이미 nobody로 실행되나
# 마스터 프로세스 root 권한 최소화를 위해 포트 변경 불필요 시 그대로 유지
# 루트리스가 필요하면 nginxinc/nginx-unprivileged 이미지 사용
RUN chown -R nginx:nginx /usr/share/nginx/html \
    && chmod -R 755 /usr/share/nginx/html

# 실행 유저 명시
USER nginx

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
    CMD wget -qO- http://localhost/ || exit 1

CMD ["nginx", "-g", "daemon off;"]