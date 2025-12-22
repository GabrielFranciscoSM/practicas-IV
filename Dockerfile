# Stage 1: Instalar Bun y dependencias
FROM docker.io/alpine:latest AS builder

RUN apk add --no-cache \
    curl \
    bash \
    ca-certificates \
    libstdc++

ENV BUN_INSTALL=/usr/local
RUN curl -fsSL https://bun.sh/install | bash

WORKDIR /app
COPY package.json bun.lock ./

RUN bun install --frozen-lockfile

# Stage 2: Imagen final mínima
FROM docker.io/alpine:latest AS final

RUN apk add --no-cache libstdc++

COPY --from=builder /usr/local/bin/bun /usr/local/bin/bun

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./

ENV BUN_RUNTIME_TRANSPILER_CACHE_PATH=0
WORKDIR /app/test

ENTRYPOINT ["bun", "test"]