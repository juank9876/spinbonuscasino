'use client'

import { useState, useEffect } from "react";
import { Link } from "../optionals/link";
import { cn, decodeHtmlEntities } from "@/lib/utils";
import Image from "next/image";
import { config } from "@/config/config";
import { FeaturedContent } from "@/api-fetcher/fetcher";
import { limitCharacters } from "@/utils/limitCharacters";

export function HeroCarouselClient({ featuredContent }: { featuredContent: FeaturedContent[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying || featuredContent.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featuredContent.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, featuredContent.length]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  if (!featuredContent || featuredContent.length === 0) return null;

  const currentPost = featuredContent[currentIndex];
  const thumbnailPosts = featuredContent.slice(0, 5); // Mostrar máximo 4 thumbnails

  // Imagen fallback
  const fallbackImage = 'https://fastestcdn.dev/uploads/7/68e53bdbdb0bb_1759853531.webp';

  return (
    <section className={`relative w-full ${config.components.hero.bgColor} py-6`}>
      <div className={`w-full ${config.components.layout.width} mx-auto`}>
        {/* Main Hero Slide */}
        <div className="relative w-full h-[30vh] lg:h-[40vh] overflow-hidden rounded-t-lg ">
          {/* Background Images */}
          <div className="absolute inset-0">
            {featuredContent.map((post, index) => (
              <div
                key={post.id}
                className={cn(
                  "absolute inset-0 transition-all duration-1000 ease-in-out",
                  currentIndex === index
                    ? "opacity-100 scale-100"
                    : "opacity-0 scale-105"
                )}
              >
                <Image
                  src={post.image || fallbackImage}
                  alt={post.title}
                  fill
                  priority={index === 0}
                  sizes="100vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-slate-600/30 via-black/80 to-slate-600/30" />
              </div>
            ))}
          </div>

          {/* Content */}
          <div className="relative z-10 h-full flex items-center justify-center">
            <div className="w-full max-w-[90vw] lg:max-w-[75vw] mx-auto px-4 lg:px-8">
              {/* Content Box */}
              <div className="max-w-2xl mx-auto bg-black/50 backdrop-blur-md p-8 lg:p-10 rounded-lg space-y-4 text-white">
                {/* Category Badge 
                {currentPost?.primary_category && (
                  <div className="inline-block">
                    <span className="px-3 py-1 bg-blue-600 text-white text-xs font-bold uppercase tracking-wider">
                      {currentPost?.primary_category.name}
                    </span>
                  </div>
                )}
                */}
                {/* Title */}
                <div className="flex flex-col items-start gap-5 text-sm text-gray-300">
                  <span className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight">
                    {decodeHtmlEntities(currentPost?.title)}
                  </span>
                  <span className="">
                    {decodeHtmlEntities(limitCharacters(currentPost?.description, 200))}
                  </span>
                </div>
                {/* Meta Info 
                <div className="flex flex-col items-start gap-1 text-sm text-gray-300">
                  <span className="font-bold">{currentPost?.author_name}</span>
                  <span>{new Date(currentPost.published_at).toLocaleDateString('es-ES', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })} - {new Date(currentPost.published_at).toLocaleTimeString('es-ES', {
                    hour: '2-digit',
                    minute: '2-digit'
                  })}</span>
                </div>
                */}
              </div>
            </div>
          </div>
        </div>

        {/* Thumbnail Navigation */}
        <div className="relative bg-black/95 border-t border-gray-800 rounded-b-lg mt-0">
          <div className="w-full px-4 lg:px-8 py-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {thumbnailPosts.map((post, index) => (
                <button
                  key={post.id}
                  onClick={() => goToSlide(index)}
                  className={cn(
                    "group relative overflow-hidden rounded-lg transition-all duration-300",
                    "hover:scale-105 hover:shadow-2xl",
                    currentIndex === index && "ring-2 ring-blue-600"
                  )}
                >
                  {/* Thumbnail Image */}
                  <div className="relative aspect-video overflow-hidden">
                    <Image
                      src={post.image || fallbackImage}
                      alt={post.title}
                      fill
                      sizes="(max-width: 768px) 50vw, 25vw"
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                    {/* Active Indicator */}
                    {currentIndex === index && (
                      <div className="absolute top-2 right-2">
                        <div className="w-3 h-3 bg-blue-600 rounded-full animate-pulse" />
                      </div>
                    )}
                  </div>

                  {/* Thumbnail Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
                    {/* Category 
                    {post.primary_category && (
                      <div className="mb-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400">
                          {post.primary_category.name}
                        </span>
                      </div>
                    )}
                    */}
                    {/* Title */}
                    <Link href={post.url} className="text-sm font-bold line-clamp-2 leading-tight mb-2">
                      {decodeHtmlEntities(post.title)}
                    </Link>

                    {/* Meta 
                    <div className="flex items-center gap-2 text-[10px] text-gray-400 justify-center">
                      <span>{post.author_name}</span>
                      <span>•</span>
                      <span>
                        {new Date(post.published_at).toLocaleDateString('es-ES', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric'
                        })} - {new Date(post.published_at).toLocaleTimeString('es-ES', {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </span>
                    </div>
                  */}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
