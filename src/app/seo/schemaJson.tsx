// app/components/SEOJsonLD.tsx

interface SchemaJsonProps {
    jsonLD?: string | object | object[] | null;
}

export function SchemaJson({ jsonLD }: SchemaJsonProps) {
    if (!jsonLD) return null;

    let cleanData: any = jsonLD;

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
                    cleanData = JSON.parse(match[0]);
                } catch {
                    // Si todo falla, retornar null
                    return null;
                }
            } else {
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