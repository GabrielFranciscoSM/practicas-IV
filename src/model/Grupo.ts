import { Articulo } from "./Articulo";

export class Grupo {
  public readonly articulos: Articulo[];

constructor(public articulos: Articulo[]) {}

  public static errorGrupoVacio(): string {
    throw new Error("El grupo debe contener al menos un artículo.");
  }
}
