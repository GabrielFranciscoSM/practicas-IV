# **INFORME TÉCNICO: SELECCIÓN DE TEST RUNNER Y BIBLIOTECA DE ASERCIONES PARA PROYECTO BUN (TYPESCRIPT)**

## **1. INTRODUCCIÓN**

Este informe documenta el proceso de selección de herramientas para testing en un proyecto desarrollado con **Bun** y **TypeScript**. El objetivo es identificar la combinación óptima de test runner y biblioteca de aserciones que cumpla con los requisitos de rendimiento, compatibilidad y mantenibilidad, siguiendo una metodología estructurada basada en principios **FIRST** (Fast, Isolated, Repeatable, Self-validating, Timely) y criterios adicionales de integración continua y compatibilidad con el ecosistema Bun.
     
---

## **2. ANÁLISIS COMPARATIVO**

### **2.1 Opciones Evaluadas**

#### **Test Runners Considerados:**
1. **Bun Test (Integrado)** - Test runner nativo de Bun
2. **Vitest** - Test runner moderno basado en Vite
3. **Jest** - Framework de testing estándar de la industria
4. **Mocha** - Combinación clásica de test runner y aserciones
5. **Ava** - Test runner concurrente moderno

#### **Bibliotecas de aserciones evaluadas:**
1. **Bun expect (Integrado)** - API compatible con Jest incluida en Bun
2. **Chai** - Biblioteca de aserciones flexible (BDD/TDD)
3. **Node assert** - Módulo de aserciones estándar de Node.js
4. **Jest expect** - Biblioteca de aserciones completa de Jest

### **2.2 Evaluación de Test Runner**

*   **Velocidad**: Tiempo de ejecución para tests simples (ms)
*   **Cold Start**: Tiempo desde ejecución hasta primer test (ms)
*   **Paralelización de tests**: ¿Se pueden ejecutar los tests de forma paralela? (sí/no)

#### **Análisis Detallado por Opción**

##### **1. Bun Test (Integrado)**
*   **Velocidad**: Muy rápido, ya que está programado en Rust y tiene integración nativa con Bun. Ejecución paralela nativa sin sobrecarga de transpilación [fuente](https://github.com/EvHaus/test-runner-benchmarks).
*   **Cold Start**: ~35 ms [fuente](https://medium.com/@connect.hashblock/migrating-node-workloads-to-bun-performance-benchmarks-tradeoffs-a6bc04762f36).
*   **Paralelización**: Paralelo entre archivos por defecto, secuencial dentro de cada archivo. Se pueden configurar los tests dentro de los archivos para que se ejecuten concurrentemente [fuente](https://bun.com/docs/test)

##### **2. Vitest**
*   **Velocidad**: Muy rápido gracias a Vite [fuente](https://github.com/EvHaus/test-runner-benchmarks).
*   **Cold Start**: Bueno, pero no óptimo para Bun; requiere la inicialización de Vite.
*   **Paralelización**: Cuenta por defecto con paralelización [fuente](https://vitest.dev/guide/parallelism)

##### **3. Jest**
*   **Velocidad**: Bastante más lento que Bun Test y Vitest [fuente](https://dev.to/kcsujeet/your-tests-are-slow-you-need-to-migrate-to-bun-9hh). La transpilación completa antes de la ejecución provoca una sobrecarga alta.
*   **Cold Start**: Lento [fuente](https://stackoverflow.com/questions/72478765/jest-takes-a-long-time-to-even-begin-to-execute-tests). La compilación JIT y la carga de módulos generan cuellos de botella.
*   **Paralelización**: Cuenta con paralelización por defecto [fuente](https://jestjs.io/docs/configuration)

##### **4. Mocha**
*   **Velocidad**: Más rápido que Jest, comparable a Vitest [fuente](https://www.reddit.com/r/javascript/comments/10x6rtn/use_mocha_instead_of_jest_and_boost_your_tests/).
*   **Cold Start**: Lento. Requiere la carga de múltiples módulos y complementos.
*   **Paralelización**: En las últimas versiones permite paralelización, pero con incompatibilidades con algunas características [fuente](https://mochajs.org/next/features/parallel-mode/)

##### **5. Ava**
*   **Velocidad**: Buen rendimiento por concurrencia nativa [fuente](https://dev.to/kcsujeet/your-tests-are-slow-you-need-to-migrate-to-bun-9hh).
*   **Cold Start**: Lento. Arquitectura multi-proceso genera overhead significativo en Bun.
*   **Paralelización**: Automáticamente activa la paralelización de tests [fuente](https://github.com/avajs/ava?tab=readme-ov-file#parallel-runs-in-ci)


### **2.3 Evaluación de Bibliotecas de aserciones**

*   **Velocidad**: Tiempo de ejecución para tests simples (ms)
*   **Cold Start**: Tiempo desde ejecución hasta primer test (ms)
*   **Estilo BDD**: Se sigue el estilo BDD

#### **Análisis Detallado por Opción**

##### **Bun expect**
*   **Velocidad**: 0 ms de sobrecarga por aserción (ejecución nativa). Optimizado específicamente para el entorno de ejecución de Bun.
*   **Cold Start**: Incluido en el runtime de Bun (0 ms adicional). No requiere carga de módulos externos.
*   **Estilo BDD**: Sí: mantiene parte del estilo de Jest.

##### **Chai**
*   **Velocidad**: Capa de abstracción que puede generar sobrecarga en aserciones complejas.
*   **Cold Start**: Carga la librería completa. Requiere la inicialización de complementos para funcionalidades avanzadas.
*   **Estilo BDD**: Sí, y además permite usar aserciones del estilo TDD.

##### **Node assert**
*   **Velocidad**: Módulo estándar con una sobrecarga mínima.
*   **Cold Start**: Disponible sin carga adicional en Node.js.
*   **Estilo BDD**: Solo cuenta con `assert`; no sigue el estilo `expect`/`should`.

##### **Jest expect**
*   **Velocidad**: Alta sobrecarga por transpilación y capas de abstracción.
*   **Cold Start**: Requiere inicialización de todo el ecosistema Jest.
*   **Estilo BDD**: Sí, lo sigue.

---

## **4. CONCLUSIÓN FINAL**

### **4.1 Elección Principal**

**✅ Test Runner: Bun Test (Integrado)**  
**✅ Biblioteca de aserciones: Bun expect (integrado)**

Se ha elegido este test runner y la biblioteca de aserciones priorizando la experiencia de desarrollo y, sobre todo, la velocidad de ejecución de los tests. De esta forma contaremos con una integración continua más rápida y menos costosa.
