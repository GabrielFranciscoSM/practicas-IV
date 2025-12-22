class TituloVacioError extends Error {
    constructor() {
        super("El título está vacío");
        this.name = "TituloVacioError";
    }
}

class ContenidoVacioError extends Error {
    constructor() {
        super("El contenido está vacío");
        this.name = "ContenidoVacioError";
    }
}

export class Articulo {
    public readonly titulo: string;
    public readonly contenido: string;

    constructor(titulo: string, contenido: string) {
        if (!titulo.trim()) {
            throw new TituloVacioError();
        }
        if (!contenido.trim()) {
            throw new ContenidoVacioError();
        }

        this.titulo = titulo;
        this.contenido = contenido;
    }
}
