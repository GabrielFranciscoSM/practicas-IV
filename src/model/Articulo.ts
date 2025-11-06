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
    return "El título no puede estar vacío.";
  }

  public static errorTextoVacio(): string {
    return "El texto del artículo no puede estar vacío.";
  }

  public static errorFechaPosterior(): string {
    return "La fecha no puede ser posterior a la actual.";
  }

}
