# Stage 1: Instalar Bun y dependencias
FROM docker.io/alpine:3 AS builder

RUN apk add --no-cache \
    curl \
    bash \
    ca-certificates \
    libstdc++

ENV BUN_INSTALL=/usr/local
RUN curl -fsSL https://bun.sh/install | bash

RUN adduser -D -u 1001 testuser

WORKDIR /home/testuser/app
RUN chown -R 1001:1001 /home/testuser

COPY --chown=1001:1001 package.json bun.lock ./
USER 1001

RUN bun install --frozen-lockfile

# Stage 2: Imagen final mínima
FROM docker.io/alpine:3 AS final

RUN apk add --no-cache libstdc++

RUN adduser -D -u 1001 testuser

COPY --from=builder /usr/local/bin/bun /usr/local/bin/bun

WORKDIR /app

COPY --from=builder --chown=1001:1001 /home/testuser/app/node_modules ./node_modules
COPY --from=builder --chown=1001:1001 /home/testuser/app/package.json ./

ENV BUN_RUNTIME_TRANSPILER_CACHE_PATH=0

USER 1001
WORKDIR /app/test

ENTRYPOINT ["bun", "test"]
