import { fetchRobots, Robots } from "@/api-fetcher/fetcher";

export async function GET() {
    const domain = process.env.NEXT_PUBLIC_DOMAIN;
    try {
        const data: Robots = await fetchRobots();

        return new Response(data.raw_content || data.content, {
            status: 200,
            headers: {
                "Content-Type": data.content_type || "text/plain",
                "Cache-Control": "public, max-age=300", // cache 5min
            },
        });
    } catch (error) {
        // fallback si la API falla
        const fallback = `User-agent: *
            Allow: /
            Sitemap: ${domain}/sitemap.xml`;

        return new Response(fallback, {
            status: 200,
            headers: {
                "Content-Type": "text/plain",
            },
        });
    }
}