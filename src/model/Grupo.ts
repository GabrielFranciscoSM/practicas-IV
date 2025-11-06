import { Articulo } from "./Articulo";

export class Grupo {
  public readonly articulos: Articulo[];

  constructor(articulos: Articulo[]) {
    this.articulos = articulos;
  }

  public static errorGrupoVacio(): string {
    return "El grupo debe contener al menos un artículo.";
  }
}
