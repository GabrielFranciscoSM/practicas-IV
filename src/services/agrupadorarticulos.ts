import { Articulo } from "../model/Articulo";

export class AgrupadorArticulos {
  public readonly articulos: Articulo[];

  constructor(articulos: Articulo[]) {
    if (!articulos || articulos.length === 0) {
      throw new Error("El agrupador debe contener al menos un artículo.");
    }

    this.articulos = articulos;
  }
}
