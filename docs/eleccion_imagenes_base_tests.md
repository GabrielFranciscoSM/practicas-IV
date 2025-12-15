# **SELECCIÓN DE IMAGEN BASE PARA CONTENEDOR DE TESTS**

## **1. Criterios de búsqueda**

Primero debemos de buscar imágenes base sobre las que construir el contenedor de tests. Para ello usaremos el siguiente criterio:

1. Imágenes actualizadas recientemente

Además, buscaremos imágenes de diferentes tipos (oficiales de bun, de alpine, de debian, etc.) para tener una variedad de opciones.

## **2. Criterios de elección**

Una vez seleccionadas las imágenes base se evaluaran en la ejecución de los tests bajo las mismas condiciones (construidas de la misma manera dentro de lo posible). Los criterios de elección son los siguientes:

1. Velocidad    -> Tiempo de ejecución de los tests
2. Tamaño       -> Tamaño de la imagen final
3. Seguridad    -> Número de vulnerabilidades conocidas

## **3. Imágenes base consideradas**

Estas son las imágenes base que se han considerado para el contenedor de tests.

1. Imagenes oficiales de Bun
    - [Basada en debian](https://hub.docker.com/layers/oven/bun/debian/images/sha256-69a60a2f7cd2ebaf35a07d0b8fbf629481409c9fcac54febd65d749178136f53)
        - último día actualizado: Hace 8 días
    - [Basada en Alpine](https://hub.docker.com/layers/oven/bun/alpine/images/sha256-978236e38a42c580098ff02ca96ccb5e2f5eaa8e19e9c6a67fa6eb8efdd5f465)
        - último día actualizado: Hace 8 días
    - [Distroless](https://hub.docker.com/layers/oven/bun/distroless/images/sha256-a233b9ff9e140f5f31bfb94ce027d86aa78602239ebe50cadca9f7cd9967ac85)
        - último día actualizado: Hace 8 días
2. Imágenes base oficiales
    - Debian
        - [Stable](https://hub.docker.com/layers/library/debian/stable/images/sha256-9160f008086391ba579c5b0248a5c91765259ef9aefcd23316fa26b261c20d33)
            - último día actualizado: Hace 5 días
        - [Slim](https://hub.docker.com/layers/library/debian/stable-slim/images/sha256-b192077674c8d7b7066bae233865d5f20fc5092ea214dc4de08726b3dc7810e9)
            - último día actualizado: Hace 6 días
    - [Alpine](https://hub.docker.com/layers/library/alpine/3/images/sha256-c78ded0fee4493809c8ca71d4a6057a46237763d952fae15ea418f6d14137f2d)
        - último día actualizado: Hace 11 días
3. Imágenes de terceros
    - [popwers/mini-bun:v1.3.3](https://hub.docker.com/r/popwers/mini-bun/tags)
        - último día actualizado: Hace 7 días

## **4. Análisis de ejecución de tests en contenedores**

Para ejecutar los tests en los contenedores se ha realizado la siguiente configuración:

- **Multistage build**: Se divide la imagen en dos etapas, una para construir la aplicación y otra para ejecutarla. De esta manera se reduce el tamaño de la imagen final.
- **User**: Se crea un usuario no root para ejecutar la aplicación.
- **Workdir**: Se establece el directorio de trabajo en `/app`.
- **Entrypoint**: Se establece el entrypoint para ejecutar los tests.
- **Descarga de bun**: Se descarga bun desde `https://bun.sh/install` donde sea necesario.
- **Desinstalar paquetes innecesarios**: Se desinstalan paquetes innecesarios para reducir el tamaño de la imagen final.
- **Mini bun**: Esta imagen usa compresión `upx --best --lzma` y el flag `BUN_RUNTIME_TRANSPILER_CACHE_PATH=0` para reducir el tamaño de la imagen final. alpine_upx.Dockerfile es una imagen propia implementada siguiendo los mismos principios que mini-bun.

### 4.1 Tamaño de imagen final

| Imagen | Tamaño |
|--------|--------|
| `alpine_upx` | **85.3 MB** |
| `mini-bun` | 88.6 MB |
| `bun:alpine` | 160 MB |
| `alpine` | 160 MB |
| `bun:distroless` | 168 MB |
| `debian:stable-slim` | 237 MB |
| `bun:debian` | 277 MB |
| `debian:stable` | 280 MB |

### 4.2 Velocidad de ejecución de tests

Tiempo de ejecución de 14 tests unitarios (promedio de 50 iteraciones):

| Imagen | Media | Desv.Est | Min | Max |
|--------|-------|----------|-----|-----|
| `alpine_upx` | **16.94ms** | ±1.12ms | 14ms | 19ms |
| `mini_bun` | **16.98ms** | ±1.56ms | 14ms | 24ms |
| `alpine` | 20.58ms | ±2.16ms | 16ms | 26ms |
| `debian_slim` | 20.58ms | ±1.89ms | 15ms | 24ms |
| `bun_alpine` | 20.68ms | ±2.59ms | 15ms | 30ms |
| `bun_debian` | 20.94ms | ±2.28ms | 16ms | 29ms |
| `debian_stable` | 21.04ms | ±2.34ms | 15ms | 27ms |
| `bun_distroless` | 21.60ms | ±4.43ms | 15ms | 42ms |

### 4.3 Análisis de seguridad (Trivy)

Escaneo realizado el 2025-12-13 con Trivy:

| Imagen base | Total | CRITICAL | HIGH | MEDIUM | LOW | Reporte |
|-------------|-------|----------|------|--------|-----|---------|
| `alpine:3` | **0** ✅ | 0 | 0 | 0 | 0 | [Ver](./reportes_seguridad_imágenes/reporte_alpine.txt) |
| `alpine_upx` | **0** ✅ | 0 | 0 | 0 | 0 | [Ver](./reportes_seguridad_imágenes/reporte_alpine_upx_impl.txt) |
| `oven/bun:alpine` | **6** | 0 | 0 | 3 | 3 | [Ver](./reportes_seguridad_imágenes/reporte_bun_alpine_impl.txt) |
| `popwers/mini-bun` | **6** | 0 | 0 | 3 | 3 | [Ver](./reportes_seguridad_imágenes/reporte_mini_bun_impl.txt) |
| `oven/bun:distroless` | **7** | 0 | 0 | 0 | 7 | [Ver](./reportes_seguridad_imágenes/reporte_bun_distroless_impl.txt) |
| `debian:stable` | **60** | 0 | 0 | 10 | 50 | [Ver](./reportes_seguridad_imágenes/reporte_debian_stable_impl.txt) |
| `debian:stable-slim` | **60** | 0 | 0 | 10 | 50 | [Ver](./reportes_seguridad_imágenes/reporte_debian_slim_impl.txt) |
| `oven/bun:debian` | **60** | 0 | 0 | 10 | 50 | [Ver](./reportes_seguridad_imágenes/reporte_bun_debian_impl.txt) |


## **5. CONCLUSIÓN**

Basándose en los tres criterios establecidos:

| Criterio | Mejor opción |
|----------|--------------|
| **Tamaño** | `alpine_upx` (85.3 MB) |
| **Velocidad** | `alpine_upx` y `mini_bun` (~17ms) |
| **Seguridad** | `alpine_upx` y `alpine` (0 vulnerabilidades) |

### Elección final

**`alpine_upx`** es la mejor opción para un contenedor de tests porque es la que menor tamaño tiene (85.3 MB), es la que menor tiempo de ejecución tiene (~17ms) y es la que menor vulnerabilidades tiene (0). Aunque comparte podio con otras imágenes, es la única en el podio para todos los criterios.
