export class Articulo {

constructor(
  private readonly titulo: string,
  private fecha: Date,
  private texto: string
) {}

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
