import { Articulo } from "./Articulo";

export class Coleccion {
  public readonly articulos: Articulo[];

  constructor(articulos: Articulo[]) {
    if (!articulos || articulos.length === 0) {
      throw new Error("La colección debe contener al menos un artículo.");
    }

    this.articulos = articulos;
  }
}