import { prisma } from "../lib/prisma.js";

const recursos = {
  "centros-turisticos": { model: "centroTuristico", titulo: "nombre" },
  recetas: { model: "receta", titulo: "nombre" },
  fiestas: { model: "fiesta", titulo: "nombre" },
  historia: { model: "historia", titulo: "titulo" },
};

export async function listarContenidoPublicado(req, res) {
  const recurso = recursos[req.params.tipo];
  if (!recurso) return res.status(404).json({ error: "Módulo no válido." });

  try {
    const [registros, total] = await Promise.all([
      prisma[recurso.model].findMany({
        where: { publicado: true },
        orderBy: { updatedAt: "desc" },
      }),
      prisma[recurso.model].count(),
    ]);
    return res.json({ data: registros, total });
  } catch {
    return res.status(500).json({ error: "No se pudo consultar el contenido." });
  }
}

export async function obtenerContenidoPublicado(req, res) {
  const recurso = recursos[req.params.tipo];
  if (!recurso) return res.status(404).json({ error: "Módulo no válido." });

  try {
    const registro = await prisma[recurso.model].findFirst({
      where: { slug: req.params.slug, publicado: true },
    });
    if (!registro) return res.status(404).json({ error: "Contenido no encontrado." });
    return res.json({ data: registro });
  } catch {
    return res.status(500).json({ error: "No se pudo consultar el contenido." });
  }
}
