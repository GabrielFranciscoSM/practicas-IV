import { Articulo } from "./Articulo";

export class Coleccion {
  public readonly articulos: Articulo[];

  constructor(articulos: Articulo[]) {
    this.articulos = articulos;
  }

  public static errorColeccionVacia(): string {
    return "La colección debe contener al menos un artículo.";
  }
}
