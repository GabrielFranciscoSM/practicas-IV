# Toma de decisiones sobre lenguaje y gestores

En este documento se desarrolla el proceso de toma de decisiones informadas de los gestores de dependencias y tareas. En particular, se documenta la elcción de un runtime para el lenguaje.

## 2: Elección del runtime para typescript

Al haber elegido Typescript, es necesario elegir un runtime.

1. **Requisitos**: Un runtime adecuado debería de contar con estas cualidades:
    - Tener cierta antigüedad que ofrezca madurez al runtime para disminuir bugs o errores espontáneos.
    - Tener actualizaciones actuales para prevenir fallos de seguridad y poder integrarse con otras herramientas
    - Facilidad de testeo para los siguientes objetivos e integración de tests con CI CD
    - Rapidez en ejecución y otras tareas asociadas

2.  **Análisis de Alternativas** (evaluación: cumple o no los requisitos):

    * **`Node.js`**
        - Cumple los criterios de madurez y actualizaciones (es el runtime más establecido y recibe mantenimiento activo). Ofrece compatibilidad y facilidad de testeo mediante el ecosistema de herramientas (aunque requiere integrar herramientas adicionales para TypeScript y testing). En cuanto a rapidez, no destaca frente a alternativas más nuevas, pero su equilibrio entre estabilidad y soporte lo hace cumplir los requisitos generales.

    * **`Deno`**
        - Cumple en aspectos de seguridad y facilidad de testeo (herramientas integradas y soporte nativo de TypeScript), y recibe actualizaciones activas. Sin embargo, no cumple completamente el requisito de madurez y ecosistema amplio: su adopción y disponibilidad de paquetes y herramientas externas es menor que la de Node.js, lo que puede limitar la compatibilidad en ciertos proyectos.

    * **`Bun`**
        - Cumple claramente los requisitos de rapidez y experiencia de desarrollo (es muy rápido y ofrece una cadena de herramientas integrada). No obstante, falla en el requisito de antigüedad/madurez: es un runtime más joven con un ecosistema y comunidad en crecimiento, lo que incrementa el riesgo de encontrar bugs o cambios en APIs. Si la prioridad es rendimiento y simplicidad de la cadena de herramientas, Bun cumple; si la prioridad es madurez y máxima compatibilidad, no cumple completamente.

## 3: Elección del Gestor de Dependencias

El gestor de dependencias facilitará la definición de los paquetes necesarios y sus versiones, y ayudará a resolver conflictos entre estos.

1. **requisitos**: Un gestor de dependencias adecuado debe de tener:
    - Velocidad de instalación para tener una buena experiencia de desarrollo
    - Eficiencia de uso de disco, principalmente para proyectos más grandes, pero a tener en cuenta
    - Seguridad, preferiblemente que pueda "auditar" paquetes problemáticos.
    - Reproducibilidad, es decir, una manera de saber y compartir exactamente los paquetes usados en el proyecto.

2.  **Consideraciones iniciales**: En un ecosistema tradicional (o híbrido) con TypeScript, conviene comparar las opciones siguiendo los requisitos clave (velocidad, eficiencia en disco, seguridad y reproducibilidad). A continuación se resumen las características prácticas de cada alternativa:

    *   **`npm`**: Estándar de facto. Muy compatible con el ecosistema y con el menor coste de onboarding para colaboradores. Ofrece `package-lock.json`, `npm ci` y `npm audit`, pero suele ser más lento en instalaciones y genera mayor duplicación en `node_modules`. Recomendado cuando la prioridad es compatibilidad y mínima fricción.

    *   **`pnpm`**: Diseñado para eficiencia: store global que evita duplicados e instalaciones muy rápidas. Excelente para proyectos grandes y CI. Precaución: algunas herramientas antiguas pueden asumir un `node_modules` plano; en esos casos hay que ajustar configuraciones o usar `node-linker`.

    *   **`yarn`** (Berry): Ofrece opciones avanzadas como Plug'n'Play (sin `node_modules`) que mejoran rendimiento y seguridad. Berry introduce nuevas configuraciones que pueden requerir adaptación de IDEs o herramientas; si se prefiere compatibilidad, Yarn permite volver a `node_modules` mediante `nodeLinker`.

    *   **`Bun`**: Enfoque todo-en-uno (runtime, gestor de paquetes, bundler y test runner) con rendimiento muy alto en instalaciones y arranque. Guarda lockfile (`bun.lockb`). Es más joven que las alternativas, por lo que conviene fijar versiones en CI, añadir pruebas de compatibilidad con paquetes npm y preparar un plan de contingencia si surge alguna incompatibilidad.

    *   **`Deno`**: No sigue el modelo npm: usa imports por URL, `deno.cache` y `deno.lock` en lugar de `package.json` y `node_modules`. Es TS-first y aporta un modelo de seguridad por permisos (`--allow-*`). Ideal para proyectos que quieran evitar el ecosistema `node_modules` y priorizar seguridad y bundles autónomos (`deno compile`). No obstante, su integración con paquetes npm y monorepos requiere adaptaciones y puede introducir fricción si se depende fuertemente del ecosistema npm.

## 4: Elección del Gestor de Tareas

Para ejecutar scripts que faciliten la experiencia de desarrollo es necesario elegir un gestor de tareas adecuado.

1. **requisitos**:
    - Paralelismo y control de concurrencia: para aprovechar máquinas CI y reducir tiempos de ejecución en tareas independientes.
    - Archivo de configuración claro y versionable que permita definir scripts sencillos y complejos.
    - Compatibilidad con CI, preferentemente con más de una plataforma (para el objetivo 6)

1.  **Consideración inicial**:

    *   **`npm/pnpm`** No tiene paralelismo nativo, habría que instalar un paquete a parte. Usa el archivo package.json. Existe la orden npm-ci que falicita la integración con CI

    *   **`Nx`**: Tiene un archivo de configuración nx.json para configurar la herramienta con aspectos como el paralelismo, directorio caché,... Buena integración CI con github, gitlab y otras plataformas.

    *   **`Turborepo`**: Tiene un archivo de configuración turbo.json para configurar el paralelismo, las tareas, las dependencias. Tiene buena integración con diferentes plataformas de CI, y facilita el deswarrollo en local y en remoto.

    *   **`Deno`**: Tiene un archivo de configuración deno.json dónde se puede configurar las tasks, sus dependencias y despcripciones, paralelismo... Además, deno como runtime es compatible con CI.

    *   **`Bun`**: Bun usa directamente el archivo package.json, por lo tanto no se pueden configurar task que dependan de otras (obviando las tasks pre- y post-), paralelismo,... Aunque se han planteado mejoras en este respecto, no existe una implementación actual. Se facilita la integración con github actions, y existe una imagen oficial de docker.

    *   **`Make`**: Herramienta clásica y muy extendida para automatizar tareas mediante un `Makefile`. Es portable (disponible en la mayoría de entornos Unix-like), soporta paralelismo con `-j` y permite definir dependencias entre tareas. No es específica para JavaScript/TypeScript, por lo que hay que implementar convenciones propias para integrarla con workflows modernos y CI.

    *   **`Task`** (https://github.com/go-task/task): Un runner moderno de tareas basado en YAML (`Taskfile.yml`) que ofrece sintaxis clara, dependencias entre tareas, ejecución paralela y buena integrabilidad con CI. Es más explícito y mantenible que scripts complejos en `package.json`. 

## Toma de decisones

*  **Decisión Runtime**: **Bun**.
*  **Decisión dependency manager**: **Bun**.
*  **Decisión task runner**: **Bun**.

## Pila Tecnológica Final

El proceso de decisión ha dado como resultado la siguiente pila tecnológica:

*   **Lenguaje**: **TypeScript**
*   **Runtime**: **Bun**
*   **Gestor de Dependencias**: **Bun**
*   **Gestor de Tareas**: **Bun**

Esta pila se eligió para priorizar el rendimiento, la experiencia de desarrollo y una cadena de herramientas simplificada, asumiendo el compromiso de usar un ecosistema más joven frente a la madurez consolidada de Node.js.