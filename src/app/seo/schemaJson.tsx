// app/components/SEOJsonLD.tsx
"use client";

interface SchemaJsonProps {
    jsonLD?: string;
}

export function SchemaJson({ jsonLD }: SchemaJsonProps) {
    if (!jsonLD) return null;

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: jsonLD }}
        />
    );
}