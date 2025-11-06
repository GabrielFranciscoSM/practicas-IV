import { Grupo } from "../model/Grupo";

export class AgrupadorArticulos {
  public readonly grupos: Grupo[];

  constructor(grupos: Grupo[]) {
    this.grupos = grupos;
  }

  public static errorSinGrupos(): string {
    return "El agrupador debe contener al menos un grupo.";
  }

  public static errorCantidadArticulosDistinta(): string {
    return "El número total de artículos agrupados debe coincidir con el número total de artículos en la colección.";
  }
}
