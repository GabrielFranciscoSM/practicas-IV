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

class ParrafosNoEncontradosError extends Error {
    constructor() {
        super("No se encontraron párrafos en el artículo");
        this.name = "ParrafosNoEncontradosError";
    }
}

export function scrapeTitulo(html: string): string {
    const titleRegex = /<h1[^>]*class=["'][^"']*ltx_title[^"']*ltx_title_document[^"']*["'][^>]*>([\s\S]*?)<\/h1>/i;
    const match = html.match(titleRegex);

    if (!match) {
        throw new TituloNoEncontradoError();
    }

    const rawTitle = match[1] ?? "";
    const cleanedTitle = removeBadCharacters(rawTitle);

    if (!cleanedTitle) {
        throw new TituloVacioError();
    }

    return cleanedTitle;
}

export function scrapeParagraphs(html: string): string[] {
    const paragraphRegex = /<p[^>]*class=["'][^"']*ltx_p[^"']*["'][^>]*>([\s\S]*?)<\/p>/gi;
    const matches = [...html.matchAll(paragraphRegex)];

    if (matches.length === 0) {
        throw new ParrafosNoEncontradosError();
    }

    const paragraphs: string[] = [];

    for (const match of matches) {
        const rawParagraph = match[1] ?? "";
        const cleanedParagraph = removeBadCharacters(rawParagraph);

        if (cleanedParagraph) {
            paragraphs.push(cleanedParagraph);
        }
    }

    if (paragraphs.length === 0) {
        throw new ParrafosNoEncontradosError();
    }

    return paragraphs;
}

function removeBadCharacters(text: string): string {
    let cleaned = text.replace(/<[^>]*>/g, " ");

    cleaned = cleaned.replace(/[\p{P}]/gu, " ");

    cleaned = cleaned.replace(/[\p{Sm}]/gu, " ");

    cleaned = cleaned.replace(/\s+/g, " ");

    cleaned = cleaned.trim();

    return cleaned;
}
