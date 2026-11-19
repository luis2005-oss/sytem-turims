import { Router } from "express";
import {
  listarContenidoPublicado,
  obtenerContenidoPublicado,
} from "../controllers/public.controller.js";

const router = Router();
router.get("/:tipo", listarContenidoPublicado);
router.get("/:tipo/:slug", obtenerContenidoPublicado);

export default router;
