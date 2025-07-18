"use client";
import Script from "next/script";
import { useEffect } from "react";

export function BrandlistyScript({ apiKey, listId, boton = "Visit now", limit = "10" }: { apiKey: string, listId: string, boton?: string, limit?: string }) {
    useEffect(() => {
        if (document.getElementById("brandlisty-script")) return;
        const script = document.createElement("script");
        script.src = "https://intercms.dev/assets/js/brandlisty-processor.js";
        script.id = "brandlisty-script";
        script.async = true;
        document.body.appendChild(script);
        console.log("BrandlistyScript loaded");
        return () => {
            script.remove();
        };
    }, []);

    console.log("Brandlisty", apiKey, listId, boton, limit);
    return (
        <Script
            id="show-banner"
            dangerouslySetInnerHTML={{
                __html: `document.getElementById('brandlisty-script')`,
            }}
        />
    )
}