import { prisma } from "../lib/prisma.js";

const recursos = {
  "centros-turisticos": {
    model: "centroTuristico",
    titulo: "nombre",
    campos: ["nombre", "tipo", "zona", "ubicacion", "descripcion", "imagenUrl", "imagenPublicId", "publicado"],
    obligatorios: ["nombre", "tipo", "ubicacion", "descripcion"],
  },
  recetas: {
    model: "receta",
    titulo: "nombre",
    campos: ["nombre", "categoria", "descripcion", "tiempoPreparacion", "porciones", "ingredientes", "preparacion", "imagenUrl", "imagenPublicId", "publicado"],
    obligatorios: ["nombre", "categoria", "descripcion"],
  },
  fiestas: {
    model: "fiesta",
    titulo: "nombre",
    campos: ["nombre", "fecha", "lugar", "descripcion", "imagenUrl", "imagenPublicId", "publicado"],
    obligatorios: ["nombre", "descripcion"],
  },
  historia: {
    model: "historia",
    titulo: "titulo",
    campos: ["titulo", "categoria", "resumen", "contenido", "imagenUrl", "imagenPublicId", "publicado"],
    obligatorios: ["titulo", "contenido"],
  },
};

function obtenerRecurso(tipo) {
  return recursos[tipo] ? { tipo, ...recursos[tipo] } : null;
}

function crearSlug(texto) {
  return String(texto)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function prepararDatos(body, recurso, esActualizacion = false) {
  const datos = {};

  for (const campo of recurso.campos) {
    if (Object.prototype.hasOwnProperty.call(body, campo)) {
      datos[campo] = body[campo];
    }
  }

  if (!esActualizacion) {
    for (const campo of recurso.obligatorios) {
      if (datos[campo] === undefined || datos[campo] === null || datos[campo] === "") {
        const error = new Error(`El campo "${campo}" es obligatorio.`);
        error.status = 400;
        throw error;
      }
    }
  }

  if (datos[recurso.titulo] !== undefined) {
    datos.slug = crearSlug(datos[recurso.titulo]);
    if (!datos.slug) {
      const error = new Error("El título debe contener letras o números.");
      error.status = 400;
      throw error;
    }
  }

  if (datos.publicado !== undefined && typeof datos.publicado !== "boolean") {
    const error = new Error('El campo "publicado" debe ser verdadero o falso.');
    error.status = 400;
    throw error;
  }

  if (recurso.tipo === "recetas") {
    for (const campo of ["ingredientes", "preparacion"]) {
      if (datos[campo] !== undefined && !Array.isArray(datos[campo])) {
        const error = new Error(`El campo "${campo}" debe ser una lista.`);
        error.status = 400;
        throw error;
      }
    }
    if (datos.porciones !== undefined) {
      datos.porciones = Number(datos.porciones);
      if (!Number.isInteger(datos.porciones) || datos.porciones < 1) {
        const error = new Error("Las porciones deben ser un número entero mayor que cero.");
        error.status = 400;
        throw error;
      }
    }
  }

  return datos;
}

function responderError(res, error) {
  console.error("[contenido] Error en operación de base de datos:", error);

  if (error.code === "P2002") {
    return res.status(409).json({ error: "Ya existe un registro con ese nombre o título." });
  }
  if (error.code === "P2025") {
    return res.status(404).json({ error: "No se encontró el contenido solicitado." });
  }
  return res.status(error.status || 500).json({
    error: error.status
      ? error.message
      : process.env.NODE_ENV !== "production"
        ? error.message || "Error desconocido al procesar el contenido."
        : "Ocurrió un error al procesar el contenido.",
  });
}

export async function listarContenido(req, res) {
  const recurso = obtenerRecurso(req.params.tipo);
  if (!recurso) return res.status(404).json({ error: "Módulo no válido." });

  try {
    const busqueda = String(req.query.buscar || "").trim();
    const where = busqueda
      ? { [recurso.titulo]: { contains: busqueda, mode: "insensitive" } }
      : {};

    const registros = await prisma[recurso.model].findMany({
      where,
      orderBy: { updatedAt: "desc" },
    });
    return res.json({ data: registros });
  } catch (error) {
    return responderError(res, error);
  }
}

export async function obtenerContenido(req, res) {
  const recurso = obtenerRecurso(req.params.tipo);
  const id = Number(req.params.id);
  if (!recurso) return res.status(404).json({ error: "Módulo no válido." });
  if (!Number.isInteger(id) || id < 1) return res.status(400).json({ error: "Identificador no válido." });

  try {
    const registro = await prisma[recurso.model].findUnique({ where: { id } });
    if (!registro) return res.status(404).json({ error: "No se encontró el contenido solicitado." });
    return res.json({ data: registro });
  } catch (error) {
    return responderError(res, error);
  }
}

export async function crearContenido(req, res) {
  const recurso = obtenerRecurso(req.params.tipo);
  if (!recurso) return res.status(404).json({ error: "Módulo no válido." });

  try {
    const datos = prepararDatos(req.body, recurso);
    const registro = await prisma[recurso.model].create({ data: datos });
    return res.status(201).json({ message: "Contenido creado correctamente.", data: registro });
  } catch (error) {
    return responderError(res, error);
  }
}

export async function actualizarContenido(req, res) {
  const recurso = obtenerRecurso(req.params.tipo);
  const id = Number(req.params.id);
  if (!recurso) return res.status(404).json({ error: "Módulo no válido." });
  if (!Number.isInteger(id) || id < 1) return res.status(400).json({ error: "Identificador no válido." });

  try {
    const datos = prepararDatos(req.body, recurso, true);
    if (!Object.keys(datos).length) return res.status(400).json({ error: "No se recibieron campos para actualizar." });
    const registro = await prisma[recurso.model].update({ where: { id }, data: datos });
    return res.json({ message: "Contenido actualizado correctamente.", data: registro });
  } catch (error) {
    return responderError(res, error);
  }
}

export async function eliminarContenido(req, res) {
  const recurso = obtenerRecurso(req.params.tipo);
  const id = Number(req.params.id);
  if (!recurso) return res.status(404).json({ error: "Módulo no válido." });
  if (!Number.isInteger(id) || id < 1) return res.status(400).json({ error: "Identificador no válido." });

  try {
    await prisma[recurso.model].delete({ where: { id } });
    return res.json({ message: "Contenido eliminado correctamente." });
  } catch (error) {
    return responderError(res, error);
  }
}
