export function removeEmptyElements(html: string): string {
    let result = html;
    let previousResult = '';

    // Keep removing empty elements until no more changes
    while (result !== previousResult) {
        previousResult = result;

        // More specific patterns for empty elements
        const emptyPatterns = [
            // Empty divs with specific classes
            /<div[^>]*class="[^"]*text-element[^"]*"[^>]*>\s*<\/div>/g,
            /<div[^>]*class="[^"]*gjs-container-component[^"]*"[^>]*>\s*<\/div>/g,
            /<div[^>]*class="[^"]*gjs-row-component[^"]*"[^>]*>\s*<\/div>/g,
            /<div[^>]*class="[^"]*gjs-col[^"]*"[^>]*>\s*<\/div>/g,
            /<div[^>]*class="[^"]*gjs-heading-container[^"]*"[^>]*>\s*<\/div>/g,

            // Generic empty div (but more careful)
            ///<div(?:\s+[^>]*)?>\s*<\/div>/g,
            /<h1(?:\s+[^>]*)?>\s*<\/h1>/g,
            /<h2(?:\s+[^>]*)?>\s*<\/h2>/g,
            /<h3(?:\s+[^>]*)?>\s*<\/h3>/g,
            /<h4(?:\s+[^>]*)?>\s*<\/h4>/g,
            /<h5(?:\s+[^>]*)?>\s*<\/h5>/g,
            /<h6(?:\s+[^>]*)?>\s*<\/h6>/g,
            /<p(?:\s+[^>]*)?>\s*<\/p>/g,
            /<a(?:\s+[^>]*)?>\s*<\/a>/g,

            // Empty sections, articles, spans that might be containers
            /<section(?:\s+[^>]*)?>\s*<\/section>/g,
            /<article(?:\s+[^>]*)?>\s*<\/article>/g,
            /<span(?:\s+[^>]*)?>\s*<\/span>/g,

            // Empty paragraphs
            /<p(?:\s+[^>]*)?>\s*<\/p>/g
        ];

        // Apply all patterns
        emptyPatterns.forEach(pattern => {
            result = result.replace(pattern, '');
        });

        // Clean up whitespace and empty lines
        result = result
            .replace(/>\s+</g, '><')
            .replace(/\n\s*\n/g, '\n')
            .trim();
    }

    return result;
}