import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["res.cloudinary.com"], // 👈 esto permite imágenes externas desde Cloudinary
  },
}
export default nextConfig;
