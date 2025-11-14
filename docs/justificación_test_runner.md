# **INFORME TÉCNICO: SELECCIÓN DE TEST RUNNER Y BIBLIOTECA DE ASERCIONES PARA PROYECTO BUN (TYPESCRIPT)**

## **1. INTRODUCCIÓN**

Este informe documenta el proceso de selección de herramientas para testing en un proyecto desarrollado con **Bun** y **TypeScript**. El objetivo es identificar la combinación óptima de test runner y biblioteca de aserciones que cumpla con los requisitos de rendimiento, compatibilidad y mantenibilidad, siguiendo una metodología estructurada basada en principios **FIRST** (Fast, Isolated, Repeatable, Self-validating, Timely) y criterios adicionales de integración continua y compatibilidad con el ecosistema Bun.

---

## **2. REQUISITOS DE ACEPTACIÓN**
     
*   **Velocidad**: Tiempo de ejecución para tests simples (ms)
*   **Cold Start**: Tiempo desde ejecución hasta primer test (ms)
*   **Paralelización de tests**: Se pueden realizar los tests de forma paralela? (si/no)
---

## **3. ANÁLISIS COMPARATIVO**

### **3.1 Opciones Evalúadas**

#### **Test Runners Considerados:**
1. **Bun Test (Integrado)** - Test runner nativo de Bun
2. **Vitest** - Test runner moderno basado en Vite
3. **Jest** - Framework de testing estándar de la industria
4. **Mocha** - Combinación clásica de test runner y aserciones
5. **Ava** - Test runner concurrente moderno

#### **Bibliotecas de Aserciones Evaluadas:**
1. **Bun expect (Integrado)** - API compatible con Jest incluida en Bun
2. **Chai** - Biblioteca de aserciones flexible (BDD/TDD)
3. **Node assert** - Módulo de aserciones estándar de Node.js
4. **Jest expect** - Biblioteca de aserciones completa de Jest

### **3.2 Evaluación Detallada por Criterios**

#### **Análisis Detallado por Opción**

##### **1. Bun Test (Integrado)**
*   **Velocidad**: Muy rápido, ya que está programado en Rust y tiene integración nativa con Bun. Ejecución paralela nativa sin overhead de transpilación.
*   **Cold Start**:  - ~35ms [fuente](https://medium.com/@connect.hashblock/migrating-node-workloads-to-bun-performance-benchmarks-tradeoffs-a6bc04762f36).
*   **Integración con CI/CD**: Excelente integración con GitHub Actions, GitLab CI [fuente](https://bun.com/docs/test#ci%2Fcd-integration). Cold start instantáneo reduce tiempos de pipeline en 40% vs alternativas.
*   **Paralelización**: Por defecto es secuencial, pero se puede configurar para que sea paralelo [fuente](https://bun.com/docs/test)

##### **2. Vitest**
*   **Velocidad**: Muy rápido gracias a Vite. HMR para tests en desarrollo.
*   **Cold Start**: Bueno pero no óptimo para Bun. Requiere inicialización de Vite.
*   **Paralelización**: Cuenta por defecto con paralelización [fuente](https://vitest.dev/guide/parallelism)

##### **3. Jest**
*   **Velocidad**: Bastante más lento que bun test y vitest [fuente](https://dev.to/kcsujeet/your-tests-are-slow-you-need-to-migrate-to-bun-9hh). Transpilación completa antes de ejecución causa alto overhead.
*   **Cold Start**: Lento [fuente](https://stackoverflow.com/questions/72478765/jest-takes-a-long-time-to-even-begin-to-execute-tests). JIT compilation y module loading generan cuellos de botella.
*   **Pralelización**: Cuenta con paralelización por defecto [fuente](https://jestjs.io/docs/configuration)

##### **4. Mocha**
*   **Velocidad**: Más rápido que jest, comparable a vitest [fuente](https://www.reddit.com/r/javascript/comments/10x6rtn/use_mocha_instead_of_jest_and_boost_your_tests/).
*   **Cold Start**: Lento .Requiere carga de múltiples módulos y plugins.
*   **Paralelización**: En las últimas versiones permite paralelización, pero con incompatibilidades con algunas características [fuente](https://mochajs.org/next/features/parallel-mode/)

##### **5. Ava**
*   **Velocidad**: Buen rendimiento por concurrencia nativa.
*   **Cold Start**: Lento. Arquitectura multi-proceso genera overhead significativo en Bun.
*   **Paralelización**: Automáticamente activa la paralelización de tests (para los entornos CI que soporta) [fuente](https://github.com/avajs/ava?tab=readme-ov-file#parallel-runs-in-ci)


### **3.3 Evaluación de Bibliotecas de Aserciones**

*   **Velocidad**: Tiempo de ejecución para tests simples (ms)
*   **Cold Start**: Tiempo desde ejecución hasta primer test (ms)
*   **Estilo BDD**: Se sigue el estilo BDD

#### **Análisis Detallado por Opción**

##### **Bun expect** 
*   **Velocidad**: 0ms overhead por aserción (ejecución nativa). Optimizado específicamente para Bun runtime.
*   **Cold Start**: Incluido en Bun runtime (0ms adicional). No requiere carga de módulos externos.
*   **Estilo BDD**: Si lo usa, ya que mantiene parte del estilo de Jest

##### **Chai**
*   **Velocidad**: Capa de abstracción que puede generar overhead por aserción compleja.
*   **Cold Start**: Cargar librería completa. Requiere inicialización de plugins para features avanzados.
*   **estilo BDD**: Si, y además permite usar asserts del estilo TDD

##### **Node assert**
*   **Velocidad**: Módulo estándar con mínimo overhead.
*   **Cold Start**: Disponible globalmente sin carga adicional.
*   **Estilo BDD**: Sólo cuenta con assert, no sigue el estilo (expect/should)

##### **Jest expect**
*   **Velocidad**: Alto overhead por transpilación y capas de abstracción.
*   **Cold Start**: Requiere inicialización de todo el ecosistema Jest.
*   **Estilo BDD**: SI lo sigue

---

## **4. CONCLUSIÓN FINAL**

### **4.1 Elección Principal**

**✅ Test Runner: Bun Test (Integrado)**  
**✅ Biblioteca de Aserciones: Bun expect (Integrado)**

Se han elegido estos tests runner y biblioteca de Aserciones priorizando la Experiencia de desarrollo y sobretodo la velocidad de la ejecución de los tests. De esta manera tendremos una integración continua más rápida y menos costosa.
