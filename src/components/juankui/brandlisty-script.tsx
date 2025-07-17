"use client";
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

    return (
        <div
            className="h-[100px] w-full"
            id="brandlisty-widget"
            data-apikey={apiKey}
            data-listid={listId}
            data-boton={boton}
            data-limit={limit}
        />
    )
}