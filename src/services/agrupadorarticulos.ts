import { Articulo } from "../model/Articulo";

export class AgrupadorArticulos {
  public readonly articulos: Articulo[];
  public readonly terminoPrincipal: string;

  constructor(articulos: Articulo[], terminoPrincipal: string) {
    if (!articulos || articulos.length === 0) {
      throw new Error("El agrupador debe contener al menos un artículo.");
    }

    if (!terminoPrincipal.trim()) {
      throw new Error("El término principal no puede estar vacío.");
    }

    this.articulos = articulos;
    this.terminoPrincipal = terminoPrincipal.trim();
  }
}
