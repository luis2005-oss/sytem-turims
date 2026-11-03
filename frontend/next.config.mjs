const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:4000";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  outputFileTracingRoot: process.cwd(),

  // El navegador llama a /api/... y Next lo reenvía al backend (Express).
  // Así la cookie de sesión es del mismo dominio y no hay problemas de CORS.
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${BACKEND_URL}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
