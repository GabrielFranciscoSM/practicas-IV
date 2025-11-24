export class TituloVacioError extends Error {
  constructor(tituloOriginal: string | undefined | null) {
    super(`El título no puede estar vacío. Valor recibido: "${tituloOriginal ?? ""}"`);
    this.name = "TituloVacioError";
  }
}

export class TextoVacioError extends Error {
  constructor(textoOriginal: string | undefined | null) {
    super(`El texto no puede estar vacío. Valor recibido: "${textoOriginal ?? ""}"`);
    this.name = "TextoVacioError";
  }
}

export class FechaPosteriorError extends Error {
  constructor(fechaOriginal: Date) {
    super(`La fecha no puede ser posterior a la actual. Valor recibido: "${fechaOriginal.toISOString()}"`);
    this.name = "FechaPosteriorError";
  }
}

export class Articulo {
    titulo: string;
    fechaPublicacion: Date;
    texto: string;
}
