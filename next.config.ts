import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
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
  },
};

export default nextConfig;
