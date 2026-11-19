// Migra los contenidos estáticos actuales al catálogo administrable.
// Los registros existentes no se sobrescriben: permite ejecutar este script varias veces.
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { runInNewContext } from "node:vm";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const raiz = resolve(dirname(fileURLToPath(import.meta.url)), "../../");

function cargarExportacion(ruta, nombre) {
  const contenido = readFileSync(resolve(raiz, ruta), "utf8")
    .replace(/export\\s+const\\s+/g, "const ");
  const contexto = {};
  runInNewContext(`${contenido}\\nglobalThis.__resultado = ${nombre};`, contexto);
  return contexto.__resultado;
}

try {
  const lugares = cargarExportacion("frontend/app/turismo/data/lugaresData.js", "lugares");
  const recetas = cargarExportacion("frontend/app/gastronomia/data/platosdata.js", "platos");

  const centros = lugares.map((lugar) => ({
    nombre: lugar.nombre,
    slug: lugar.nombre.normalize("NFD").replace(/[\\u0300-\\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""),
    tipo: lugar.tipo,
    zona: lugar.zona,
    ubicacion: lugar.ubicacion,
    descripcion: lugar.descripcion,
    imagenUrl: lugar.imagen,
    publicado: true,
  }));

  const platos = recetas.map((plato) => ({
    nombre: plato.nombre,
    slug: plato.slug,
    categoria: plato.categoria,
    descripcion: plato.descripcion,
    tiempoPreparacion: plato.tiempo,
    porciones: Number(String(plato.porciones || "").match(/\\d+/)?.[0]) || null,
    ingredientes: plato.ingredientes,
    preparacion: plato.preparacion,
    imagenUrl: plato.imagen,
    publicado: true,
  }));

  const resultadoCentros = await prisma.centroTuristico.createMany({ data: centros, skipDuplicates: true });
  const resultadoRecetas = await prisma.receta.createMany({ data: platos, skipDuplicates: true });

  console.log(`Centros turísticos incorporados: ${resultadoCentros.count}`);
  console.log(`Recetas incorporadas: ${resultadoRecetas.count}`);
  console.log("Los registros ya existentes se conservaron sin sobrescribir cambios.");
} catch (error) {
  console.error("No se pudo migrar el contenido inicial:", error);
  process.exitCode = 1;
} finally {
  await prisma.$disconnect();
}
