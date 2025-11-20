export class Articulo {
  public readonly info: Map<string, Date>;
  public readonly texto: string;

  constructor(titulo: string, fecha: Date, texto: string) {
    if (!titulo.trim()) throw new Error("El título no puede estar vacío.");
    if (!texto.trim()) throw new Error("El texto del artículo no puede estar vacío.");

    this.info = new Map([[titulo.trim(), fecha]]);
    this.texto = texto.trim();
  }
}