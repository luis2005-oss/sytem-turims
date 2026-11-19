import { Router } from "express";
import { crearFirmaSubida } from "../controllers/cloudinary.controller.js";
import { requireAdmin } from "../middleware/requireAdmin.js";

const router = Router();
router.use(requireAdmin);
router.post("/signature", crearFirmaSubida);

export default router;
