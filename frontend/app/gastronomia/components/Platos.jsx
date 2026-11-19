import Image from "next/image";
import Link from "next/link";
import styles from "./Platos.module.css";
import { platos } from "../data/platosdata";
import BotonFavorito from "./BotonFavorito";

export default async function Platos() {
  let platosPublicados = [];
  try {
    const respuesta = await fetch(`${process.env.BACKEND_URL || "http://localhost:4000"}/api/public/contenido/recetas`, { cache: "no-store" });
    if (respuesta.ok) platosPublicados = (await respuesta.json()).data || [];
  } catch {}
  const combinados = [...platos];
  for (const receta of platosPublicados) {
    if (!combinados.some((actual) => actual.slug === receta.slug || actual.nombre === receta.nombre)) {
      combinados.push({
        ...receta,
        imagen: receta.imagenUrl || "/images/gastronomia/caldo verde.jpg",
        ingredientes: Array.isArray(receta.ingredientes) ? receta.ingredientes : [],
        preparacion: Array.isArray(receta.preparacion) ? receta.preparacion : [],
        lugar: "Celendín",
      });
    }
  }
  const lugares = [...new Set(combinados.map((p) => p.lugar || "Celendín"))];
  return (
    <section id="platos" className={styles.seccionPlatos}>
      <div className={styles.encabezado}>
        <span>Platos y productos regionales</span>

        <h2>Gastronomía Tradicional</h2>

        <p>
          Conoce algunas de las preparaciones y productos más apreciados en
          Celendín y la región Cajamarca.
        </p>

        <Link href="/gastronomia/favoritos" className={styles.verFavoritos}>
          ★ Ver mis favoritos
        </Link>
      </div>

      {lugares.map((lugar) => (
        <div className={styles.grupoLugar} key={lugar}>
          <div className={styles.grid}>
            {combinados
              .filter((p) => (p.lugar || "Celendín") === lugar)
              .map((plato) => (
                <article className={styles.tarjeta} key={plato.slug}>
                  <div className={styles.imagenContenedor}>
                    <Image
                      src={plato.imagenUrl || plato.imagen}
                      alt={plato.nombre}
                      fill
                      sizes="(max-width: 600px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className={styles.imagen}
                      unoptimized
                    />

                    <span className={styles.categoria}>{plato.categoria}</span>

                    <BotonFavorito slug={plato.slug} variante="icono" />
                  </div>

                  <div className={styles.contenido}>
                    <h3>{plato.nombre}</h3>

                    <p>{plato.descripcion}</p>

                    <Link
                      href={`/gastronomia/${plato.slug}`}
                      className={styles.botonReceta}
                    >
                      Ver receta
                    </Link>
                  </div>
                </article>
              ))}
          </div>
        </div>
      ))}
    </section>
  );
}