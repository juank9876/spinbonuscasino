export function limitCharacters(text: string, limit: number): string {
    if (!text) return '';
    if (text.length <= limit) return text;

    return text.slice(0, limit) + '...';
}