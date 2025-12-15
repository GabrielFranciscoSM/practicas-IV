# Stage 1: Descargar y comprimir Bun con UPX
FROM docker.io/alpine:3 AS compressor

RUN apk add --no-cache \
    curl \
    bash \
    ca-certificates \
    upx

ENV BUN_INSTALL=/usr/local
RUN curl -fsSL https://bun.sh/install | bash

RUN upx --best --lzma /usr/local/bin/bun


# Stage 2: Instalar dependencias
FROM docker.io/alpine:3 AS builder

RUN apk add --no-cache libstdc++

COPY --from=compressor /usr/local/bin/bun /usr/local/bin/bun

RUN adduser -D -u 1001 testuser

WORKDIR /home/testuser/app
RUN chown -R 1001:1001 /home/testuser

COPY --chown=1001:1001 package.json bun.lock ./

USER 1001
RUN bun install --frozen-lockfile


# Stage 3: Imagen final mínima
FROM docker.io/alpine:3 AS final

RUN apk add --no-cache libstdc++
RUN adduser -D -u 1001 testuser

COPY --from=compressor /usr/local/bin/bun /usr/local/bin/bun

WORKDIR /app

COPY --from=builder --chown=1001:1001 /home/testuser/app/node_modules ./node_modules
COPY --from=builder --chown=1001:1001 /home/testuser/app/package.json ./

ENV BUN_RUNTIME_TRANSPILER_CACHE_PATH=0

USER 1001
WORKDIR /app/test

ENTRYPOINT ["bun", "test"]