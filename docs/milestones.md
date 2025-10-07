# Productos mínimamente viables

## Milestone 0 (interno): Uno o varios módulos que representen los conceptos clave suficientes para resolver las HU, siguiendo las buenas prácticas

### PMV 0

- **Entregable**: Uno o varios módulos que representen los conceptos clave suficientes para resolver las HU, siguiendo las buenas prácticas.
- **Validez**:
  - Se comprueba que las estructuras definidas son una base coherente y suficiente para resolver las HU.
  - Se comprueba que se han seguido las buenas prácticas.
- **Soporte**: Texto estructurado.

### HU asociadas

- HU1

## Milestone 1: Un módulo de procesamiento semántico de texto
### PMV 1

- **Entregable**: Dada una lista de artículos académicos, se devuelven sus representaciones semánticas.
- **Validez**:
  - Se comprueba que por cada documento exista una representación semántica.
  - Se comprueba que dos artículos parecidos tienen una representación parecida mediante la distancia del coseno.
  - Se comprueba que dos artículos diferentes tengan una representación diferente mediante la distancia del coseno.

### HU asociadas

- HU1, HU2

## Milestone 2: Un módulo de organización de documentos
### PMV 2

- **Entregable**: Dados unos artículos, se organizan automáticamente por similitud.
- **Validez**:
  - Se comprueba que la cantidad de archivos sea la misma que antes.
  - Se comprueba que sean los mismos.
  - Se validan los clústeres con diferentes métricas:
    - Suma de los cuadrados dentro del clúster
    - Coeficiente de silueta

### HU asociadas

- HU2, HU3

## Milestone 3: Una API que permita compartir un directorio de artículos organizados
### PMV 3

- **Entregable**: Si se crea un grupo, los investigadores pueden compartir la estructura de archivos y directorios.
- **Validez**:
  - Se comprueba que se generen un código y una contraseña de acceso.
  - Se comprueba que funcionen correctamente desde varios dispositivos.
  - Se comprueba que se necesita la contraseña correcta para entrar en un grupo.
- **Soporte**: Código fuente, infraestructura en la nube

### HU asociadas

- HU4
