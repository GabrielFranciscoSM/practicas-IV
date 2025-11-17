import { Grupo } from "../model/Grupo";

export class ColeccionOrdenadaSinGruposError extends Error {
  constructor(cantidadGrupos: number) {
    super(
      `La colección ordenada debe contener al menos un grupo. Grupos recibidos: ${cantidadGrupos}`
    );
    this.name = "ColeccionOrdenadaSinGruposError";
  }
}

export class ColeccionOrdenadaCantidadArticulosDistintaError extends Error {
  constructor(totalEnGrupos: number, totalColeccion: number) {
    super(
      `El número total de artículos agrupados (${totalEnGrupos}) debe coincidir con el número total de artículos en la colección (${totalColeccion}).`
    );
    this.name = "ColeccionOrdenadaCantidadArticulosDistintaError";
  }
}

export class ColeccionOrdenada {

  constructor(readonly grupos: Grupo[]) {}

}
