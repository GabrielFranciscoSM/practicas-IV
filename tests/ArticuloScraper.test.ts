import { describe, it, expect, beforeAll } from "bun:test";
import { scrapeTitulo } from "../src/services/ArticuloScraper";

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

        it("debería extraer el título completo de un artículo ArXiv válido", () => {
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
