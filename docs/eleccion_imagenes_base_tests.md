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