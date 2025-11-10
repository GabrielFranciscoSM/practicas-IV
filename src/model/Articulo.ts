export class Articulo {
  public readonly titulo: string;
  public readonly fecha: Date;
  public readonly texto: string;

  constructor(titulo: string, fecha: Date, texto: string) {
    this.titulo = titulo;
    this.fecha = fecha;
    this.texto = texto;
  }

  public static errorTituloVacio(): string {
    throw new Error("El título no puede estar vacío.");
  }

  public static errorTextoVacio(): string {
    throw new Error("El texto del artículo no puede estar vacío.");
  }

  public static errorFechaPosterior(): string {
    throw new Error("La fecha no puede ser posterior a la actual.");
  }

}
