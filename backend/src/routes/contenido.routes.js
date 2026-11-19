import { Router } from "express";
import {
  actualizarContenido,
  crearContenido,
  eliminarContenido,
  listarContenido,
  obtenerContenido,
} from "../controllers/contenido.controller.js";
import { requireAdmin } from "../middleware/requireAdmin.js";

const router = Router();

// Todas las operaciones de gestión requieren una sesión válida de administrador.
router.use(requireAdmin);

router.get("/:tipo", listarContenido);
router.get("/:tipo/:id", obtenerContenido);
router.post("/:tipo", crearContenido);
router.patch("/:tipo/:id", actualizarContenido);
router.delete("/:tipo/:id", eliminarContenido);

export default router;
