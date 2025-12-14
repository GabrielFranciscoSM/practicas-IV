# Stage 1: Instalar dependencias como usuario no privilegiado
FROM docker.io/oven/bun:debian AS builder

RUN useradd -m -u 1001 testuser

WORKDIR /home/testuser/app
RUN chown -R 1001:1001 /home/testuser

COPY --chown=1001:1001 package.json bun.lock ./

USER 1001

RUN bun install --frozen-lockfile

# Stage 2: Imagen final optimizada
FROM docker.io/oven/bun:debian AS final

RUN useradd -m -u 1001 testuser

WORKDIR /app

COPY --from=builder --chown=1001:1001 /home/testuser/app/node_modules ./node_modules
COPY --from=builder --chown=1001:1001 /home/testuser/app/package.json ./

USER 1001

WORKDIR /app/test

ENTRYPOINT ["bun", "test"]
