import { Grupo } from "./model/Grupo";

export class ColeccionOrdenadaVaciaError extends Error {
    constructor(cantidadGrupos: number) {
        super(
            `El resultado de la agrupación debe contener al menos un grupo. Grupos recibidos: ${cantidadGrupos}`
        );
        this.name = "ColeccionOrdenadaVaciaError";
    }
}

export class ColeccionOrdenada {
    grupos: Grupo[];
}
