# Stage 1: Instalar Bun y dependencias
FROM docker.io/debian:stable AS builder

RUN apt-get update && apt-get install -y --no-install-recommends \
    curl \
    unzip \
    ca-certificates

ENV BUN_INSTALL=/usr/local
RUN curl -fsSL https://bun.sh/install | bash

RUN useradd -m -u 1001 testuser
WORKDIR /home/testuser/app
RUN chown -R 1001:1001 /home/testuser

COPY --chown=1001:1001 package.json bun.lock ./

USER 1001

RUN bun install --frozen-lockfile

# Stage 2: Imagen final mínima
FROM docker.io/debian:stable AS final

RUN useradd -m -u 1001 testuser
COPY --from=builder /usr/local/bin/bun /usr/local/bin/bun

WORKDIR /app

COPY --from=builder --chown=1001:1001 /home/testuser/app/node_modules ./node_modules
COPY --from=builder --chown=1001:1001 /home/testuser/app/package.json ./

USER 1001

WORKDIR /app/test

ENTRYPOINT ["bun", "test"]
