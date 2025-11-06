export class Articulo {
  public readonly titulo: string;
  public readonly fecha: Date;
  public readonly texto: string;

  constructor(titulo: string, fecha: Date, texto: string) {
    if (!titulo.trim()) throw new Error("El título no puede estar vacío.");
    if (!texto.trim()) throw new Error("El texto del artículo no puede estar vacío.");

    this.titulo = titulo.trim();
    this.fecha = fecha;
    this.texto = texto.trim();
  }
}
