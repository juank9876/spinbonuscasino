import { fetchAgeVerification, fetchCookies, fetchRobots, fetchSitemap, fetchSiteSettings } from "@/api-fetcher/fetcher";

export default async function ApiKeyPage() {
    const apiKey = process.env.API_KEY;
    const [robots, sitemap, settings, cookies, ageVerification] = await Promise.all([
        fetchRobots(),
        fetchSitemap(),
        fetchSiteSettings(),
        fetchCookies(),
        fetchAgeVerification(),
    ]);
    return (
        <main className="p-6 flex-1">
            <h1>Bienvenido a la página secreta</h1>
            <p>Esta página solo es accesible desde la URL con la API key correcta.</p>
            <p>API Key: {apiKey}</p>

            <div className="flex flex-col gap-2">
                <h2>Global Settings</h2>

            </div>
        </main>
    );
}