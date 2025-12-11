import { describe, it, expect, beforeAll } from "bun:test";
import { scrapeTitulo, scrapeParagraphs } from "../src/services/ArticuloScraper";
import { Articulo } from "../src/model/Articulo";

describe("scrapeTitulo - Extracción de título de un Artículo Arxiv desde el tag <h1 class='ltx_title ltx_title_document'>", () => {

    describe("Dados datos HTML válidos con el h1 esperado, debe extraer el título correctamente aplicando normalización de espacios", () => {

        let htmlMultilineTitle: string;
        let htmlOriginal: string;
        let htmlCarácteresEspeciales: string;

        beforeAll(async () => {
            htmlMultilineTitle = await Bun.file("data/test_multiline_title.html").text();
            htmlOriginal = await Bun.file("data/GeneralEconomics1.html").text();
            htmlCarácteresEspeciales = await Bun.file("data/test_special_chars.html").text();
        });

        it("debería extraer el título completo de un artículo ArXiv real desde el h1.ltx_title_document", () => {
            const titulo = scrapeTitulo(htmlOriginal);

            expect(titulo).not.toBeNull();
            expect(titulo).toBe("Polarization by Design How Elites Could Shape Mass Preferences as AI Reduces Persuasion Costs");
        });

        it("debería extraer el título sin caracteres especiales Unicode (guiones, ampersands, dos puntos, comillas)", () => {
            const titulo = scrapeTitulo(htmlCarácteresEspeciales);

            expect(titulo).not.toBeNull();
            expect(titulo).toBe("Título con Acentos Análisis Económico Diseño Estrategia");
        });

        it("debería normalizar títulos multilínea colapsando saltos de línea y espacios múltiples en un solo espacio", () => {
            const titulo = scrapeTitulo(htmlMultilineTitle);

            expect(titulo).not.toBeNull();
            expect(titulo).toBe("Linea 1 Linea 2 Linea 3");
        });
    });

    describe("Con datos inválidos debería lanzar errores descriptivos", () => {
        let htmlNoTitle: string;
        let htmlEmptyTitle: string;
        let htmlStrangeCharsOnly: string;

        beforeAll(async () => {
            htmlNoTitle = await Bun.file("data/test_no_title.html").text();
            htmlEmptyTitle = await Bun.file("data/test_empty_title.html").text();
            htmlStrangeCharsOnly = await Bun.file("data/test_strange_chars_only.html").text();
        });

        it("debería lanzar un error cuando no existe el tag <h1 class='ltx_title ltx_title_document'>", () => {
            expect(() => scrapeTitulo(htmlNoTitle)).toThrowError("No se encontró el título del artículo");
        });

        it("debería lanzar un error cuando el h1.ltx_title_document existe pero está vacío", () => {
            expect(() => scrapeTitulo(htmlEmptyTitle)).toThrowError("El título está vacío");
        });

        it("debería de lanzar un error cuando el título contine únicamente carácteres extraños", () => {
            expect(() => scrapeTitulo(htmlStrangeCharsOnly)).toThrowError("El título está vacío");
        });
    });
});

describe("scrapeParagraphs - Extracción de párrafos de un Artículo Arxiv", () => {

    describe("Dados datos HTML válidos con párrafos, debe extraer el texto limpio de cada párrafo", () => {

        let htmlOriginal: string;
        let htmlNestedHtml: string;
        let htmlCarácteresEspeciales: string;

        beforeAll(async () => {
            htmlOriginal = await Bun.file("data/GeneralEconomics1.html").text();
            htmlNestedHtml = await Bun.file("data/test_nested_html.html").text();
            htmlCarácteresEspeciales = await Bun.file("data/test_special_chars.html").text();
        });

        it("debería extraer múltiples párrafos de un artículo ArXiv real como un array de strings", () => {
            const paragraphs = scrapeParagraphs(htmlOriginal);

            expect(paragraphs).toBeArray();
            expect(paragraphs.length).toBeGreaterThan(0);
            expect(paragraphs[0]).toContain("democracies");
        });

        it("debería eliminar tags HTML internos (links, spans, cite, math) preservando solo el texto visible", () => {
            const paragraphs = scrapeParagraphs(htmlNestedHtml);

            expect(paragraphs).toBeArray();
            expect(paragraphs.length).toBe(3);

            expect(paragraphs[0]).toContain("links");
            expect(paragraphs[0]).toContain("bold text");
            expect(paragraphs[0]).not.toContain("<a");
            expect(paragraphs[0]).not.toContain("<strong");
            expect(paragraphs[1]).not.toContain("<math");
            expect(paragraphs[2]).toContain("footnote");
            expect(paragraphs[2]).not.toContain("<span");
        });

        it("debería eliminar caracteres especiales Unicode (símbolos) en el texto de los párrafos", () => {
            const paragraphs = scrapeParagraphs(htmlCarácteresEspeciales);

            expect(paragraphs).toBeArray();
            expect(paragraphs.length).toBeGreaterThan(0);

            expect(paragraphs[0]).not.toContain("©");
            expect(paragraphs[0]).not.toContain("™");
            expect(paragraphs[0]).not.toContain("€");
            expect(paragraphs[1]).not.toContain("²");
        });

        it("debería normalizar espacios múltiples y saltos de línea dentro de cada párrafo", () => {
            const paragraphs = scrapeParagraphs(htmlNestedHtml);

            expect(paragraphs).toBeArray();

            paragraphs.forEach((p: string) => {
                expect(p).not.toContain("\n");
                expect(p).not.toMatch(/\s{2,}/);
            });
        });
    });

    describe("Con datos HTML sin párrafos válidos, debería lanzar errores descriptivos", () => {
        let htmlNoParagraphs: string;
        let htmlStrangeCharsOnly: string;

        beforeAll(async () => {
            htmlNoParagraphs = await Bun.file("data/test_no_paragraphs.html").text();
            htmlStrangeCharsOnly = await Bun.file("data/test_strange_chars_only.html").text();
        });

        it("debería lanzar un error cuando no existen párrafos", () => {
            expect(() => scrapeParagraphs(htmlNoParagraphs)).toThrowError("No se encontraron párrafos en el artículo");
        });

        it("debería lanzar un error cuando el input es un string vacío", () => {
            expect(() => scrapeParagraphs("")).toThrowError("No se encontraron párrafos en el artículo");
        });

        it("debería lanzar un error cuando el input es un string con solo caracteres especiales", () => {
            expect(() => scrapeParagraphs(htmlStrangeCharsOnly)).toThrowError("No se encontraron párrafos en el artículo");
        });
    });
});

describe("Articulo - Construcción de un artículo desde HTML de ArXiv", () => {

    let htmlOriginal: string;

    beforeAll(async () => {
        htmlOriginal = await Bun.file("data/GeneralEconomics1.html").text();
    });

    it("debería crear un artículo con título y contenido extraídos de un HTML real de ArXiv", () => {

        const articulo = new Articulo(htmlOriginal);

        expect(articulo.titulo).toBe("Polarization by Design How Elites Could Shape Mass Preferences as AI Reduces Persuasion Costs");
        expect(articulo.contenido).toContain("democracies");
    });
});
