import { Articulo } from "./Articulo";

export class Coleccion {

  constructor(public articulos: Articulo[]) {}

  public static errorColeccionVacia(): string {
    throw new Error("La colección debe contener al menos un artículo.");
  }
}
