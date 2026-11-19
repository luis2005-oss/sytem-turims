import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import authRoutes from "./routes/auth.routes.js";
import contenidoRoutes from "./routes/contenido.routes.js";
import cloudinaryRoutes from "./routes/cloudinary.routes.js";
import publicRoutes from "./routes/public.routes.js";

const app = express();

app.set("trust proxy", 1);

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
  }),
);
app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());

app.get("/api/health", (req, res) => res.json({ ok: true }));
app.use("/api/auth", authRoutes);
app.use("/api/admin/contenido", contenidoRoutes);
app.use("/api/admin/cloudinary", cloudinaryRoutes);
app.use("/api/public/contenido", publicRoutes);

app.use((req, res) => res.status(404).json({ error: "Ruta no encontrada." }));

export default app;
