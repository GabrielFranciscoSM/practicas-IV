# Toma de decisiones sobre lenguaje y gestores

En este documento se desarrolla el proceso de toma de decisiones informadas sobre el lenguaje elegido, teniendo en cuenta la conversación sobre este en el objetivo 2; y de los gestores de dependencias y tareas. En particular, se documenta la elcción de un runtime para el lenguaje.

## 1: Elección de lenguaje de programación

Para este proyecto, la elección del lenguaje de programación partió de la evaluación realizada en el objetivo 2 [#8](https://github.com/GabrielFranciscoSM/practicas-IV/issues/8), donde se consideraron **Go** y **TypeScript** como las principales alternativas. Ambas opciones son excelentes para construir aplicaciones robustas, y su principal ventaja compartida frente a JavaScript tradicional es el **tipado estático**, que reduce errores en tiempo de ejecución y mejora la mantenibilidad del código.

1.  **Análisis de Alternativas**:
    *   **Go (Golang)**:
        *   *Pros*: Es un lenguaje compilado, conocido por su excepcional rendimiento, su simplicidad y su robusto modelo de concurrencia.
        *   *Cons*: Aunque su ecosistema para backend es sólido, no es tan maduro como el de JavaScript/TypeScript.
    *   **TypeScript**:
        *   *Pros*: Al ser un superconjunto de JavaScript, tiene acceso al inmenso ecosistema de `npm`. Ofrece una gran flexibilidad y el tipado estático aporta seguridad y mejora la experiencia de desarrollo (autocompletado, refactorización).
        *   *Cons*: Requiere un paso de transpilación a JavaScript, aunque las herramientas modernas lo hacen casi transparente.

2.  **Decisión**: **TypeScript**.

3.  **Razonamiento**: Aunque Go es una opción muy potente por su rendimiento, se eligió TypeScript por la flexibilidad de su ecosistema y la familiaridad con el lenguaje. La capacidad de TypeScript para ser utilizado tanto en backend como en frontend lo convierte en una opción estratégica a largo plazo. Los beneficios del tipado estático sobre JavaScript son claros, y la elección de TypeScript permite mantener esos beneficios dentro del ecosistema de JavaScript.

## 2: Elección del runtime para typescript

Al haber elegido Typescript, es necesario elegir un runtime.

1.  **Consideración inicial**: **Node.js** es el runtime "clásico" y más ampliamente usado y aceptado.

2.  **Análisis de Alternativas**:
    *   **Node.js**:
        *   *Pros*: Es el runtime más maduro y estable, con un ecosistema de paquetes inmenso y el respaldo de una comunidad masiva. Es la opción estándar y más segura para garantizar la máxima compatibilidad.
        *   *Cons*: Su rendimiento es inferior en comparación con alternativas más modernas. Requiere herramientas externas para tareas clave como la ejecución de TypeScript (`ts-node`) el testing, lo que aumenta la complejidad de la configuración.
    *   **Deno**:
        *   *Pros*: Ofrece un entorno de ejecución seguro por defecto (sandboxed) y una cadena de herramientas moderna integrada (formateador, linter, test runner). Tiene soporte de primera clase para TypeScript.
        *   *Cons*: Su ecosistema es más pequeño y, aunque tiene una capa de compatibilidad con `npm`, no siempre es perfecta. Su adopción en la industria es menor que la de Node.js.
    *   **Bun**:
        *   *Pros*: **Rendimiento excepcional**. Está diseñado para ser extremadamente rápido en el arranque, la instalación de dependencias y la ejecución de código. Es una **herramienta todo-en-uno** que integra runtime, gestor de paquetes, bundler y test runner, simplificando enormemente el setup del proyecto. Ofrece una alta compatibilidad con las APIs de Node.js, facilitando el uso del ecosistema `npm`.
        *   *Cons*: Es el runtime más joven, lo que implica un mayor riesgo de encontrar bugs o enfrentarse a cambios en futuras versiones. Su comunidad, aunque en rápido crecimiento, es más pequeña que la de Node.js.

3.  **Decisión**: **Bun**.

4.  **Razonamiento**: La elección de **Bun** se basa en dos pilares fundamentales: **rendimiento** y **simplicidad en la experiencia de desarrollo**.

    Desde el punto de vista del rendimiento, los benchmarks y las pruebas prácticas demuestran que Bun reduce significativamente los tiempos de espera en tareas cotidianas como la instalación de dependencias, la ejecución de tests y el arranque de la aplicación. Esta velocidad se traduce directamente en un ciclo de desarrollo más ágil y productivo.

    El factor decisivo es que Bun es una herramienta **"todo-en-uno"**. A diferencia de Node.js, que requiere configurar varias herramientas por separado (gestor de paquetes, ejecutor de TypeScript, etc.), Bun lo integra todo en un solo lugar. Esto simplifica enormemente la configuración y evita conflictos entre herramientas.

    Aunque Bun es una tecnología más joven en comparación con la robustez probada de Node.js, para un proyecto de esta escala, los beneficios de una herramienta unificada y de alto rendimiento superan el riesgo. La promesa de un flujo de trabajo más rápido y con menos fricción fue el argumento final para su adopción.

## 3: Elección del Gestor de Dependencias

La elección del runtime influyó directamente en la del gestor de dependencias.

1.  **Consideraciones iniciales**: En un ecosistema tradicional con Node.js, las principales opciones para la gestión de dependencias son:
    *   **`npm`**: Es el gestor de paquetes que viene por defecto con Node.js. Es el más extendido y compatible, aunque no siempre el más rápido.
    *   **`pnpm`**: Se centra en la eficiencia. Es muy rápido y ahorra mucho espacio en disco al no duplicar paquetes entre proyectos.
    *   **`yarn`**: Nació como una alternativa para mejorar la velocidad y seguridad de `npm`. Es una opción muy robusta y popular en la industria.

2.  **Análisis de Alternativas**: Al haber elegido Bun como runtime, su gestor de dependencias integrado se convirtió en el candidato principal. Usar `npm` o `pnpm` con el runtime de Bun era posible, pero habría eliminado una de las ventajas clave de la herramienta: su integración nativa.

3.  **Decisión**: **Bun**.

4.  **Razonamiento**: Se ha elegido Bun como gestor de dependencias por **consistencia y rendimiento**. El comando `bun install` es extremadamente rápido y se integra a la perfección con el resto del ecosistema Bun. Esto evita la necesidad de gestionar una herramienta adicional y mantiene un flujo de trabajo unificado y simple.

## 4: Elección del Gestor de Tareas

Finalmente, se necesitaba una forma de ejecutar scripts para tareas como iniciar la aplicación, correr tests o realizar builds.

1.  **Consideración inicial**: En el ecosistema JavaScript, la gestión de tareas se realiza habitualmente mediante los scripts definidos en el archivo `package.json`. Estos scripts se ejecutan con el gestor de paquetes (`npm run <tarea>`, `yarn <tarea>`, etc.).

2.  **Análisis de Alternativas**: Dado que ya se había elegido Bun como runtime y gestor de dependencias, la opción natural era usar su propio ejecutor de tareas: `bun run`. La alternativa sería invocar scripts de otra manera, lo cual no tendría sentido en este contexto.

3.  **Decisión**: **Bun**.

4.  **Razonamiento**: La elección de Bun como gestor de tareas es una consecuencia lógica de las decisiones anteriores. Usar `bun run` para ejecutar los scripts del `package.json` mantiene la **coherencia** de la cadena de herramientas. Además, `bun run` es también más rápido que sus equivalentes de `npm` o `yarn`, lo que contribuye a un ciclo de desarrollo más ágil.

## Pila Tecnológica Final

El proceso de decisión secuencial ha dado como resultado la siguiente pila tecnológica:

*   **Lenguaje**: **TypeScript**
*   **Runtime**: **Bun**
*   **Gestor de Dependencias**: **Bun**
*   **Gestor de Tareas**: **Bun**

Esta pila se eligió para priorizar el rendimiento, la experiencia de desarrollo y una cadena de herramientas simplificada, asumiendo el compromiso de usar un ecosistema más joven frente a la madurez consolidada de Node.js.
