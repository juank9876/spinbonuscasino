"use client";

import { useState } from "react";
import { MethodType } from "@/api-fetcher/fetcher";

interface ApiButtonsProps {
    baseUrl: string;
    query: string;
    methodTypes: MethodType[];
}

export function ApiButtons({ baseUrl, query, methodTypes }: ApiButtonsProps) {
    const [data, setData] = useState<any>(null);

    const fetchApi = async (method: MethodType) => {
        const res = await fetch(`${baseUrl}${query}&method=${method}`, { next: { revalidate: 3 }, cache: 'no-store' });
        const json = await res.json();
        setData(json);
    };

    // Función para colorear JSON
    const syntaxHighlight = (json: any) => {
        if (!json) return null;
        const str = JSON.stringify(json, null, 2)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(
                /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|\d+)/g,
                (match) => {
                    let cls = "text-gray-700"; // default
                    if (/^"/.test(match)) {
                        cls = /:$/.test(match) ? "text-blue-500" : "text-green-600"; // key / string
                    } else if (/true|false/.test(match)) cls = "text-purple-500";
                    else if (/null/.test(match)) cls = "text-gray-400";
                    else cls = "text-red-500"; // numbers
                    return `<span class="${cls}">${match}</span>`;
                }
            );
        return str;
    };

    return (
        <div className="flex flex-col gap-4 mt-4 max-w-screen overflow-x-hidden">
            <div className="flex gap-2 flex-wrap">
                {methodTypes.map((method) => (
                    <button
                        key={method}
                        onClick={() => fetchApi(method)}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        {method}
                    </button>
                ))}
            </div>

            {data && (
                <div className="mt-4 text-xs w-full overflow-x-auto">
                    <pre
                        className="bg-gray-100 p-4 rounded min-w-[600px]  whitespace-pre-wrap break-words"
                        dangerouslySetInnerHTML={{ __html: syntaxHighlight(data) as string }}
                    />
                </div>
            )}
        </div>
    );
}