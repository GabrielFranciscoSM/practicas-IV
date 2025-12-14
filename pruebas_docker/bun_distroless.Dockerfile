# Stage 1: Instalar dependencias como usuario no privilegiado
FROM docker.io/oven/bun:debian AS builder

RUN useradd -m -u 1001 testuser

WORKDIR /home/testuser/app
RUN chown -R 1001:1001 /home/testuser

COPY --chown=1001:1001 package.json bun.lock ./

USER 1001

RUN bun install --frozen-lockfile

# Stage 2: Imagen distroless (sin shell, mínima)
FROM docker.io/oven/bun:distroless AS final

WORKDIR /app

COPY --from=builder /home/testuser/app/node_modules ./node_modules
COPY --from=builder /home/testuser/app/package.json ./package.json

WORKDIR /app/test

ENTRYPOINT ["bun", "test"]
