import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async rewrites() {
    return [
      {
        source: `/${process.env.API_KEY}`, // /apilokilla123
        destination: "/apikey", // apunta a la página real
      },
      {
        source: '/api/brandlisty',
        destination: 'https://intercms.dev/assets/js/brandlisty-processor.js',
      },
    ];
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'intercms.dev', // Allows all hostnames
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com', // Allows all hostnames
      },

      //Eliminar esto en produccion para evitar vulnerabilidades, aunque va a dar error si no se configura
      //aqui las urls de las imagenes
      {
        protocol: 'https',
        hostname: '**', // Allows all hostnames
      },
      {
        protocol: 'http',
        hostname: '**', // Allows all hostnames
      },
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    qualities: [75, 90, 100],
  },
};

export default nextConfig;
