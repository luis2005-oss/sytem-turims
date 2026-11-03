import { prisma } from "../lib/prisma.js";
import { COOKIE_SESION, verificarToken } from "../lib/token.js";

// Protege cualquier ruta que solo deba usar el administrador.
export async function requireAdmin(req, res, next) {
  const payload = await verificarToken(req.cookies?.[COOKIE_SESION]);

  if (!payload) {
    return res.status(401).json({ error: "No autorizado." });
  }

  const admin = await prisma.admin.findUnique({
    where: { id: Number(payload.sub) },
    select: { id: true, nombre: true, email: true },
  });

  if (!admin) {
    return res.status(401).json({ error: "No autorizado." });
  }

  req.admin = admin;
  next();
}
