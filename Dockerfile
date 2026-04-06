# Stage 1: Build stage
FROM node:22-alpine AS builder

# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy only workspace files and lockfile first to leverage Docker cache
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./
COPY apps/host/package.json ./apps/host/
COPY apps/remote-auth/package.json ./apps/remote-auth/
COPY apps/remote-billing/package.json ./apps/remote-billing/
COPY apps/remote-main/package.json ./apps/remote-main/
COPY apps/remote-wired/package.json ./apps/remote-wired/
COPY apps/remote-wireless/package.json ./apps/remote-wireless/
COPY libs/shared/hooks/package.json ./libs/shared/hooks/
COPY libs/shared/types/package.json ./libs/shared/types/
COPY libs/shared/ui/package.json ./libs/shared/ui/
COPY libs/shared/utils/package.json ./libs/shared/utils/

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy the rest of the application code
COPY . .

# Build the specific app (Build argument)
ARG APP_NAME=host
RUN pnpm nx build ${APP_NAME} --prod

# Stage 2: Production stage
FROM nginx:alpine

ARG APP_NAME=host
WORKDIR /usr/share/nginx/html

# Remove default nginx static assets
RUN rm -rf ./*

# Copy build artifacts from builder stage
# Nx build output is typically in dist/apps/${APP_NAME}
COPY --from=builder /app/dist/apps/${APP_NAME} .

# Copy custom nginx configuration
COPY deployment/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
