import { fetchRobots, Robots } from "@/api-fetcher/fetcher";

export async function GET() {
    try {
        const data: Robots = await fetchRobots();

        return new Response(data.raw_content || data.content, {
            status: 200,
            headers: {
                "Content-Type": data.content_type || "text/plain",
                "Cache-Control": "public, max-age=3600", // cache 1h
            },
        });
    } catch (error) {
        // fallback si la API falla
        const fallback = `User-agent: *
Allow: /
Sitemap: https://tu-dominio.com/sitemap.xml`;

        return new Response(fallback, {
            status: 200,
            headers: {
                "Content-Type": "text/plain",
            },
        });
    }
}