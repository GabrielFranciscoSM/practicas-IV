import { scrapeTitulo, scrapeParagraphs } from "../utils/ArticuloScraper";

export class Articulo {
    public readonly titulo: string;
    public readonly contenido: string;

    constructor(html: string) {
        this.titulo = scrapeTitulo(html);
        this.contenido = scrapeParagraphs(html).join("\n\n");
    }
}
