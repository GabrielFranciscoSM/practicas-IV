export class ArticuloTituloVacioError extends Error {
  constructor(tituloOriginal: string | undefined | null) {
    super(`El título no puede estar vacío. Valor recibido: "${tituloOriginal ?? ""}"`);
    this.name = "ArticuloTituloVacioError";
  }
}


export class ArticuloTextoVacioError extends Error {
  constructor(textoOriginal: string | undefined | null) {
    super(`El texto no puede estar vacío. Valor recibido: "${textoOriginal ?? ""}"`);
    this.name = "ArticuloTextoVacioError";
  }
}

export class ArticuloFechaPosteriorError extends Error {
  constructor(fechaOriginal: Date) {
    super(`La fecha no puede ser posterior a la actual. Valor recibido: "${fechaOriginal.toISOString()}"`);
    this.name = "ArticuloFechaPosteriorError";
  }
}


export class Articulo {

constructor(
  private readonly titulo: string,
  private fecha: Date,
  private texto: string
) {}

}
