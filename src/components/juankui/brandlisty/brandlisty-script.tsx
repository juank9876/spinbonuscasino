'use client'
import { CustomHTMLRenderer } from "@/app/seo/customScripts";
import { useEffect, useState } from "react";

/*export function BrandlistyScript({ apiKey, listId, boton = "Visit now", limit = "10" }: { apiKey: string, listId: string, boton?: string, limit?: string }) {
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
}*/
export function BrandlistyScript () {

    const [script, setScript] = useState<string>("");
    useEffect(() => {
        const loadScript = async () => {
            try {
                const res = await fetch("/api/brandlisty");
                const jsText = await res.text();

                setScript(jsText);
            } catch (err) {
                console.error("Error al cargar el script:", err);
            }
        };

        loadScript();
    }, [script])

    return (
        <CustomHTMLRenderer
            content={script}
            isScript={true}
        />
    )
}