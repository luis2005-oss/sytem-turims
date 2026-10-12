import { notFound } from "next/navigation";
import Receta from "../components/Receta";
import { platos } from "../data/platosdata";

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