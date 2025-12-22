import type { Articulo } from "../model/Articulo";

class ArticuloDuplicadoError extends Error {
    constructor() {
        super("El artículo ya existe en la colección");
        this.name = "ArticuloDuplicadoError";
    }
}

export class Coleccion {
    private articulosDesordenados: Map<string, Articulo>;

    constructor(articulo: Articulo) {
        this.articulosDesordenados = new Map<string, Articulo>();
        this.articulosDesordenados.set(articulo.titulo, articulo);
    }

    get articulos(): ReadonlyMap<string, Articulo> {
        return this.articulosDesordenados;
    }

    agregarArticulo(articulo: Articulo): void {
        if (this.articulosDesordenados.has(articulo.titulo)) {
            throw new ArticuloDuplicadoError();
        }
        this.articulosDesordenados.set(articulo.titulo, articulo);
    }
}

