export function formatDate(dateString: string): string {
    const date = new Date(dateString)
    const locale = process.env.LOCALE || 'en-US'
    return new Intl.DateTimeFormat(locale, {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    }).format(date)
}