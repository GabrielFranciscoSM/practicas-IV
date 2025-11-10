import { Articulo } from "./Articulo";

export class Coleccion {
  public readonly articulos: Articulo[];

  constructor(public articulos: Articulo[]) {}

  public static errorColeccionVacia(): string {
    throw new Error("La colección debe contener al menos un artículo.");
  }
}
