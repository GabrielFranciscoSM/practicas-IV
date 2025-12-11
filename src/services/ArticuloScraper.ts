class TituloNoEncontradoError extends Error {
    constructor() {
        super("No se encontró el título del artículo");
        this.name = "TituloNoEncontradoError";
    }
}

class TituloVacioError extends Error {
    constructor() {
        super("El título está vacío");
        this.name = "TituloVacioError";
    }
}

export function scrapeTitulo(html: string): string {
    const titleRegex = /<h1[^>]*class=["'][^"']*ltx_title[^"']*ltx_title_document[^"']*["'][^>]*>([\s\S]*?)<\/h1>/i;
    const match = html.match(titleRegex);

    if (!match) {
        throw new TituloNoEncontradoError();
    }

    const rawTitle = match[1] ?? "";
    const cleanedTitle = cleanText(rawTitle);

    if (!cleanedTitle) {
        throw new TituloVacioError();
    }

    return cleanedTitle;
}

function cleanText(text: string): string {
    let cleaned = text.replace(/<[^>]*>/g, " ");

    cleaned = cleaned.replace(/[^a-zA-ZáéíóúüñÁÉÍÓÚÜÑ0-9\s]/g, " ");

    cleaned = cleaned.replace(/\s+/g, " ");

    cleaned = cleaned.trim();

    return cleaned;
}
