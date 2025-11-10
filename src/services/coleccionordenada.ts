import { Grupo } from "../model/Grupo";

export class ColeccionOrdenada {
  public readonly grupos: Grupo[];

  constructor(readonly grupos: Grupo[]) {}

  public static errorSinGrupos(): string {
    throw new Error("El agrupador debe contener al menos un grupo.");
  }

  public static errorCantidadArticulosDistinta(): string {
    throw new Error("El número total de artículos agrupados debe coincidir con el número total de artículos en la colección.");
  }
}
