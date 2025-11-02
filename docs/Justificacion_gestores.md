# Justificación de la elección de lenguaje, runtime y gestores de dependencias/tareas

## Resumen

Para este proyecto se ha elegido TypeScript como lenguaje y Bun como runtime y gestor principal (dependencias y tareas). A continuación se justifica esta decisión siguiendo criterios objetivos (estándares, buenas prácticas, deuda técnica y criterios como seguridad, rendimiento y coste de mantenimiento), y comparando brevemente con alternativas maduras (Node.js + npm/pnpm/yarn, Deno). Donde haga falta se indican mitigaciones para la deuda técnica.

## Estándares y buenas prácticas aplicados

- Seguir los estándares del ecosistema JavaScript/TypeScript: uso de package.json, lockfile (para reproducibilidad), versionado semántico (semver) y herramientas de CI que fijen versiones.
- Separar responsabilidades: Bun como runtime/build-tool, TypeScript para chequeo de tipos, linters y pruebas automatizadas.
- Evitar deuda técnica mediante pinado de versiones.

## Elección de Bun como runtime

He elegido Bun por los siguientes motivos:

- Rendimiento: Bun ha demostrado ser muy rápido en arranque, instalación de paquetes y tareas de bundling/transpilado en muchos benchmarks. 
- Integración: Bun integra gestor de paquetes, bundler, y runtime con soporte nativo para TypeScript/JS, lo que simplifica la cadena de herramientas y disminuye la configuración necesaria.
- Menos tooling externo: para tareas comunes (instalar, ejecutar scripts, transpilar) no hace falta encadenar tantas herramientas externas, lo que reduce superficie de configuración.

### Comparación breve con alternativas

- Node.js + npm/pnpm/yarn: Muy maduro y con el ecosistema más amplio. Si se requiere compatibilidad con paquetes nativos muy específicos o herramientas que solo soportan Node, Node sigue siendo la opción segura. pnpm ofrece ventajas de disco y velocidad de instalación sobre npm en muchos casos.
- Deno: También es moderno y seguro por diseño, pero su ecosistema y compatibilidad con paquetes npm legacy es más limitado.

### Riesgos y mitigaciones

- Riesgo: Bun es relativamente más joven que Node; algunas bibliotecas muy específicas pueden no estar completamente probadas contra Bun.

## Gestor de dependencias y de tareas: Bun vs npm/pnpm/yarn

### Razones objetivas para usar Bun como gestor en este proyecto

- Velocidad de instalación: Bun instala paquetes muy rápido en la práctica, lo que reduce tiempo en CI y en máquina local.
- Flujo integrado: un solo binario (`bun`) gestiona instalación, ejecución de scripts y ejecución del runtime. Menos piezas disminuyen la complejidad operativa.
- Soporte TS integrado: permite ejecutar TypeScript directamente en muchos flujos

### Comparativa objetiva

- npm: más compatible y con mayor adopción; buena opción si se prioriza máxima compatibilidad.
- pnpm: sobresale en consumo de disco y velocidad con proyectos grandes/muchos monorepos; si el repo crece y usa muchos paquetes, pnpm puede ser preferible.
- yarn: maduro, con características propias; actualmente menos diferencia relevante frente a npm/pnpm para este caso.

### Decisión práctica

- Para este proyecto pequeño/mediano, Bun ofrece beneficios claros (menor tiempo de desarrollo) y reduce la cantidad de herramientas. 

## Deuda técnica y mantenimiento

- A favor: al unificar herramientas (runtime + gestor) se reduce la complejidad de configuración y la superficie de errores, lo que típicamente reduce deuda técnica inicial.
- En contra: apostar por una tecnología más joven puede introducir deuda si su mantenimiento o compatibilidad futura es incierta.

## Seguridad y criterios objetivos

- Seguridad: Bun se está desarrollando activamente; pero su ecosistema es más pequeño.
- Rendimiento: Bun suele ofrecer mejoras en tiempo de arranque, instalación y ejecución de bundles. 
- Mantenimiento: menos herramientas = menos puntos de fallo.

## Conclusión

Bun es una elección adecuada para este proyecto por su rendimiento, integración y simplificación del flujo de trabajo, especialmente en proyectos pequeños/medianos con pocas dependencias. Hay riesgos por ser una tecnología más joven, pero manteniendo una versión estable y realizando los tests necesarios se puede paliar. Si en el futuro el proyecto crece mucho o aparecen incompatibilidades, las decisiones pueden revisarse (por ejemplo migrar a Node + pnpm) sin un coste prohibitivo siempre que se hayan seguido las buenas prácticas mencionadas.


