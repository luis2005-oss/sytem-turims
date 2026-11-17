import { notFound } from "next/navigation";
import Receta from "../components/Receta";
import { platos } from "../data/platosdata";

export function generateStaticParams() {
  return platos.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const plato = platos.find((p) => p.slug === slug);
  if (!plato) return {};
  return {
    title: `${plato.nombre} | Gastronomía de Celendín`,
    description: plato.descripcion,
  };
}

export default async function RecetaPage({ params }) {
  const { slug } = await params;
  const i = platos.findIndex((p) => p.slug === slug);
  if (i === -1) notFound();

  const anterior = platos[(i - 1 + platos.length) % platos.length];
  const siguiente = platos[(i + 1) % platos.length];

  return (
    <Receta plato={platos[i]} anterior={anterior} siguiente={siguiente} />
  );
}