import { Articulo } from "./Articulo";

export class ColeccionVaciaError extends Error {
  constructor(cantidadArticulos: number) {
    super(
      `La colección debe contener al menos un artículo. Artículos recibidos: ${cantidadArticulos}`
    );
    this.name = "ColeccionVaciaError";
  }
}

export class Coleccion {
    articulos: Articulo[];
}
