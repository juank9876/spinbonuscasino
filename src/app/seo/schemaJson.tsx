// app/components/SEOJsonLD.tsx

interface SchemaJsonProps {
    jsonLD?: string | object | object[] | null;
}

export function SchemaJson({ jsonLD }: SchemaJsonProps) {
    if (!jsonLD) return null;

    let cleanData: any = jsonLD;
    //console.log(cleanData)
    // Si es un objeto con wrapper "schema", extraer el contenido
    if (typeof jsonLD === 'object' && !Array.isArray(jsonLD) && 'schema' in jsonLD) {
        cleanData = (jsonLD as any).schema;
    }

    // Si es un string, intentar parsearlo
    if (typeof cleanData === 'string') {
        try {
            // Intentar parsear si es JSON stringificado

            cleanData = JSON.parse(cleanData);
        } catch {
            // Si falla el parse, puede que sea un string con HTML escapado
            // Intentar extraer el JSON del string
            const match = cleanData.match(/\{[\s\S]*\}/);
            if (match) {
                try {
                    // Limpiar comentarios de JavaScript antes de parsear
                    // Eliminar comentarios de bloque /* ... */
                    let jsonWithoutComments = match[0].replace(/\/\*[\s\S]*?\*\//g, '');

                    // Eliminar comentarios de línea // pero preservando strings
                    // Procesar línea por línea para evitar eliminar // dentro de strings
                    jsonWithoutComments = jsonWithoutComments
                        .split('\n')
                        .map((line: string) => {
                            // Buscar // que no esté dentro de comillas
                            let inString = false;
                            let stringChar = '';
                            let result = '';

                            for (let i = 0; i < line.length; i++) {
                                const char = line[i];
                                const prevChar = i > 0 ? line[i - 1] : '';

                                // Detectar inicio/fin de string
                                if ((char === '"' || char === "'") && prevChar !== '\\') {
                                    if (!inString) {
                                        inString = true;
                                        stringChar = char;
                                    } else if (char === stringChar) {
                                        inString = false;
                                    }
                                }

                                // Si encontramos // fuera de un string, cortamos la línea
                                if (!inString && char === '/' && i + 1 < line.length && line[i + 1] === '/') {
                                    break;
                                }

                                result += char;
                            }

                            return result;
                        })
                        .join('\n');

                    cleanData = JSON.parse(jsonWithoutComments);
                } catch (e) {
                    // Si todo falla, retornar null
                    console.log('No se pudo parsear el JSON', e)
                    return null
                }
            } else {
                console.log('No se pudo parsear el JSON')
                return null;
            }
        }
    }

    // Convertir a JSON string limpio
    const jsonString = JSON.stringify(cleanData);

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: jsonString }}
        />
    );
}