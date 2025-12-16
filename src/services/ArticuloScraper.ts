const TITLE_REGEX = /<h1[^>]*class=["'][^"']*ltx_title[^"']*ltx_title_document[^"']*["'][^>]*>([\s\S]*?)<\/h1>/i;
const PARAGRAPH_REGEX = /<p[^>]*class=["'][^"']*ltx_p[^"']*["'][^>]*>([\s\S]*?)<\/p>/gi;

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
    const match = html.match(TITLE_REGEX);

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
    PARAGRAPH_REGEX.lastIndex = 0;
    const matches = [...html.matchAll(PARAGRAPH_REGEX)];

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

    const cleaned = text
        .replace(/<[^>]*>|[\p{P}\p{Sm}]/gu, " ")
        .replace(/\s+/g, " ")
        .trim();

    return cleaned;
}
