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

  if (indice === -1) notFound();

  const plato = platos[indice];
  const anterior = platos[(indice - 1 + platos.length) % platos.length];
  const siguiente = platos[(indice + 1) % platos.length];

  return <Receta plato={plato} anterior={anterior} siguiente={siguiente} />;
}
