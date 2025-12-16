# **INFORME TÉCNICO: SELECCIÓN DE TEST RUNNER Y BIBLIOTECA DE ASERCIONES PARA PROYECTO BUN (TYPESCRIPT)**

## **1. INTRODUCCIÓN**

Este informe documenta el proceso de selección de herramientas para testing en un proyecto desarrollado con **Bun** y **TypeScript**. El objetivo es identificar la combinación óptima de test runner, biblioteca de aserciones y herramienta CLI.
     
---

## **2. ANÁLISIS COMPARATIVO**

### **2.1 Evaluación de Bibliotecas de aserciones**

*   **Estilo BDD**: Se sigue el estilo BDD que se asemeja más al lenguaje natural `expect(x).to.be.true` y no TDD `assert(x)`
*   **Se requiere una librería externa**

#### **Análisis Detallado por Opción**

##### **bun:test**
*   **Estilo BDD**: Sí: mantiene parte del estilo de Jest usando `expect` [fuente](https://bun.com/docs/test/writing-tests).
*   **Se requiere una librería externa**: No, ya viene integrado en el runtime de Bun.

##### **Chai**
*   **Estilo BDD**: Sí, y además permite usar aserciones del estilo TDD. Es decir, puede usar `expect`/`should` y `assert` [fuente](https://www.chaijs.com/guide/styles/#expect)
*   **Se requiere una librería externa**: Sí, requiere la instalación de la librería `chai`.

##### **node:assert**
*   **Estilo BDD**: No, solo cuenta con `assert`; no sigue el estilo `expect`. [fuente](https://bun.com/reference/node/assert)
*   **Se requiere una librería externa**: No, ya viene integrado en el runtime de Bun.

##### **Jest**
*   **Estilo BDD**: Sí, usa el estilo `expect` [fuente](https://jestjs.io/docs/expect)
*   **Se requiere una librería externa**: Sí, requiere la instalación de la librería `jest`.

---

### **2.2 Evaluación de Test Runner**

*   **Velocidad**: Tiempo de ejecución para tests simples (ms)
*   **Se requiere una librería externa**
*   **Estilo BDD**: Se usa declaración de tests jerárquicos y agrupados, de tal manera que sea más lejible. 
#### **Análisis Detallado por Opción**

##### **bun describe/it**
*   **Velocidad**: Muy rápido [fuente](https://github.com/EvHaus/test-runner-benchmarks).
*   **Se requiere una librería externa**: No, ya viene integrado en el runtime de Bun.
*   **Estilo BDD**: Sí, usando `describe` e `it` [fuente](https://bun.com/docs/test/writing-tests).

##### **vitest describe/it**
*   **Velocidad**: Muy rápido gracias a Vite [fuente](https://github.com/EvHaus/test-runner-benchmarks).
*   **Se requiere una librería externa**: Sí, requiere la instalación de la librería `vitest`.
*   **Estilo BDD**: Sí, usando `describe` e `it` [fuente](https://vitest.dev/api/).

##### **jest describe/it**
*   **Velocidad**: Bastante más lento que Bun Test y Vitest [fuente](https://dev.to/kcsujeet/your-tests-are-slow-you-need-to-migrate-to-bun-9hh). La transpilación completa antes de la ejecución provoca una sobrecarga alta.
*   **Se requiere una librería externa**: Sí, requiere la instalación de la librería `jest`.
*   **Estilo BDD**: Sí, usando `describe` e `it` [fuente](https://jestjs.io/docs/api).

##### **mocha describe/it**
*   **Velocidad**: Más rápido que Jest, comparable a Vitest [fuente](https://www.reddit.com/r/javascript/comments/10x6rtn/use_mocha_instead_of_jest_and_boost_your_tests/).
*   **Se requiere una librería externa**: Sí, requiere la instalación de la librería `mocha`.
*   **Estilo BDD**: Sí, usando `describe` e `it` [fuente](https://mochajs.org/#interfaces).

##### **ava test**
*   **Velocidad**: Buen rendimiento por concurrencia nativa [fuente](https://dev.to/kcsujeet/your-tests-are-slow-you-need-to-migrate-to-bun-9hh).
*   **Se requiere una librería externa**: Sí, requiere la instalación de la librería `ava`.
*   **Estilo BDD**: No, ya que su naturaleza paralela requiere que los tests sean completamente independientes, y agrupar tests promueve el usar variables compartidas [fuente](https://github.com/avajs/ava/blob/main/docs/01-writing-tests.md).

---

### **2.3 Elección de Herramienta CLI**

*   **Está incluido en el runtime de Bun**

#### **Análisis Detallado por Opción**

#### **Bun CLI (`bun test`)**
*   **Está integrado en el runtime de Bun**: Si, Bun tiene una orden propia `bun test` que permite ejecutar tests.

#### **Jest CLI**
*   **Está integrado en el runtime de Bun**: No, Jest es una herramienta externa en la que se basa `Bun test` pero que requiere instalación adicional. 

#### **Mocha / Ava CLI**
*   **Está integrado en el runtime de Bun**: No, Mocha y Ava son herramientas externas que requieren la instalación adicional. 

---

## **4. CONCLUSIÓN FINAL**

### **4.1 Elección Principal**

**✅ Test Runner: Bun:test (integrado)**  
**✅ Biblioteca de aserciones: Bun:test (integrado)**
**✅ CLI: `bun test` (integrado)**

Se ha elegido este test runner, la biblioteca de aserciones y la CLI priorizando la experiencia de desarrollo y, sobre todo, la inegración de las herramientas en el runtime de Bun. De esta forma contaremos con una integración continua más rápida y menos costosa.

***