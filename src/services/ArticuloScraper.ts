function cleanText(text: string): string {
    let cleaned = text.replace(/<[^>]*>/g, " ");

    cleaned = cleaned.replace(/[^a-zA-ZáéíóúüñÁÉÍÓÚÜÑ0-9\s]/g, " ");

    cleaned = cleaned.replace(/\s+/g, " ");

    cleaned = cleaned.trim();

    return cleaned;
}
