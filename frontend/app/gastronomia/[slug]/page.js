import { notFound } from "next/navigation";
import Receta from "../components/Receta";
import { platos as listaPlatos } from "../data/platosdata";

// Los platos no traen "slug" en sus datos, así que se genera a partir del
// nombre: "Caldo Verde" -> "caldo-verde" (URL: /gastronomia/caldo-verde)
function crearSlug(texto) {
  return texto
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const platos = listaPlatos.map((plato) => ({
  ...plato,
  slug: crearSlug(plato.nombre),
}));

export function generateStaticParams() {
  return platos.map((plato) => ({ slug: plato.slug }));
}

export default async function RecetaPage({ params }) {
  const { slug } = await params;
  const indice = platos.findIndex((p) => p.slug === slug);
  let plato = indice >= 0 ? platos[indice] : null;

  try {
    const listaRespuesta = await fetch(`${process.env.BACKEND_URL || "http://localhost:4000"}/api/public/contenido/recetas`, { cache: "no-store" });
    if (listaRespuesta.ok) {
      const lista = await listaRespuesta.json();
      if (lista.total > 0) {
        const respuesta = await fetch(`${process.env.BACKEND_URL || "http://localhost:4000"}/api/public/contenido/recetas/${slug}`, { cache: "no-store" });
        if (!respuesta.ok) notFound();
        const registro = (await respuesta.json()).data;
        plato = {
          ...registro,
          imagen: registro.imagenUrl || "/images/gastronomia/caldo verde.jpg",
          ingredientes: Array.isArray(registro.ingredientes) ? registro.ingredientes : [],
          preparacion: Array.isArray(registro.preparacion) ? registro.preparacion : [],
        };
      }
    }
  } catch (error) {
    if (error?.digest?.startsWith("NEXT_NOT_FOUND")) throw error;
  }

  if (!plato) notFound();

  const anterior = indice >= 0 ? platos[(indice - 1 + platos.length) % platos.length] : plato;
  const siguiente = indice >= 0 ? platos[(indice + 1) % platos.length] : plato;
  return <Receta plato={plato} anterior={anterior} siguiente={siguiente} />;
}
