import { Articulo } from "./Articulo";

export class Grupo {
  public readonly articulos: Articulo[];

  public readonly terminoPrincipal: string;

  constructor(articulos: Articulo[], terminoPrincipal: string) {
    if (!articulos || articulos.length === 0) {
      throw new Error("El grupo debe contener al menos un artículo.");
    }

    if (!terminoPrincipal.trim()) {
      throw new Error("El término principal no puede estar vacío.");
    }

    this.articulos = articulos;
    this.terminoPrincipal = terminoPrincipal.trim();
  }
}