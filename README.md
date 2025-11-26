# Practicas IV

**Cliente:** Estudiante de TFG, tutores o investigadores

**Problema:** Los estudiantes de TFG y otros investigadores acumulan una gran cantidad de artículos científicos que necesitan organizar y contrastar para sus trabajos. La organización manual de estos documentos es un proceso ineficiente y tedioso, ya que requiere una lectura profunda de los artículos y tener que compararlos todos entre sí, para agruparlos por similitud. Incluso mediante la organización manual, esta puede ser mala si hay muchos articulos que organizar.

**Intuición de la solución:** Usar técnicas de NLP como TF-IDF y k-mean clustering para agrupar documentos similares de forma automática. Para obtener los papers existen archivos públicos como ArXiv, que además ofrecen muchos papers en html.

**[Verificación de configuración](doc_adicional/doc_adicional.md)**

## Historias de usuario

### Metodologías previas a las HU
Para empatizar con el cliente/usuarios, se han seguid las metodologías *User Journey* y *Personas*, y se han generado las consiguiente documentación: [User Journey](./docs/user_journey.md), [Personas](./docs/personas.md).

### Historias de Usuario

En el archivo [historias de usuario](./docs/historias_de_usuario.md) se lista la historia de usuario, numerada convenientemente.

Esta historia de usuario se plantea en el issue #3.

### Milestones y productos mínimamente viables

Tras haber completado los archivos anteriores, se crean los [Productos mínimamente viables](./docs/productos_mínimamente_viables.md). 

## Lenguaje y Runtime usados

Para el desarrollo de este proyecto se ha elegiod usar Typescript con el runtime Bun, por motivos como:
- Rapidez en arranque, instalación de paquetes y tareas de bundling/transpilado en muchos benchmarks.
- Integración de gestor de dependencias y de tareas de calidad 
- Uso de las buenas prácticas (package.json, bun.lock, tsconfig.json)

Una justificación más detallada se encuentra [Aquí](/docs/Justificacion_gestores.md)

## Desarrollo

### Quick start

1. Instala dependencias con `bun install`.

### Testing

1. Haz una comprovación rápida con `bun check`
2. Ejecuta la batería de pruebas con `bun test` (incluye `Articulo`, `Coleccion`, `Grupo` y `ColeccionOrdenada`).

#### Descripción de la clase que se va a testear

> < Descripción >