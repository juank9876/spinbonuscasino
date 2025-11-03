import { fetchFeaturedContent } from "@/api-fetcher/fetcher";
import { HeroCarouselClient } from "./hero-carousel-client";


export async function HeroCarousel() {
  const featuredContent = await fetchFeaturedContent()

  return (
    <HeroCarouselClient featuredContent={featuredContent} />
  );
};
