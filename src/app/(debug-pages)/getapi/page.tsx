// app/page.tsx

import { methods, MethodType } from "@/api-fetcher/fetcher";
import { ApiButtons } from "./ApiButtons";
import NotFound from "@/app/not-found";

export default function Page () {
    if (process.env.DEVMODE) {
        const apiKey = process.env.API_KEY;
        const projectId = process.env.PROJECT_ID;
        const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;
        const cms = "https://intercms.dev/api/v2/data.php?";
        const query = `api_key=${apiKey}&project_id=${projectId}`;
        const methodTypes = methods as unknown as MethodType[];
        return (
            <main className="flex flex-1 flex-col items-start justify-center gap-4 p-8">
                <h2>API KEY: <span className="text-green-500">{apiKey}</span></h2>
                <h2>PROJECT ID: <span className="text-green-500">{projectId}</span></h2>
                <h2>BASE URL: <span className="text-green-500">{cms}{query} </span></h2>
                <ApiButtons baseUrl={cms} query={query} methodTypes={methodTypes} />
            </main>
        );
    } else return <NotFound />;
}