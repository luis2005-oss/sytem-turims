"use client";
import Image from "next/image";
import Link from "next/link";
import { platos } from "../data/platosdata";
import { useFavoritos } from "../hooks/useFavoritos";
import BotonFavorito from "./BotonFavorito";
import styles from "./ListaFavoritos.module.css";

export default function ListaFavoritos() {
  const { favoritos } = useFavoritos();
  const lista = platos.filter((p) => favoritos.includes(p.slug));

  return (
    <main className={styles.pagina}>
      <div className={styles.contenedor}>
        <header className={styles.encabezado}>
          <span>Tu colección</span>
          <h1 className={styles.titulo}>Mis recetas favoritas</h1>
          <p>Las recetas que guardaste para volver a prepararlas.</p>
        </header>

        {lista.length === 0 ? (
          <div className={styles.vacio}>
            <p>Aún no tienes recetas favoritas.</p>
            <Link href="/gastronomia" className={styles.botonReceta}>
              Explorar platos
            </Link>
          </div>
        ) : (
          <div className={styles.grid}>
            {lista.map((plato) => (
              <article className={styles.tarjeta} key={plato.slug}>
                <div className={styles.imagenContenedor}>
                  <Image
                    src={plato.imagen}
                    alt={plato.nombre}
                    fill
                    sizes="(max-width: 600px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className={styles.imagen}
                  />
                  <BotonFavorito slug={plato.slug} variante="icono" />
                </div>

                <div className={styles.contenido}>
                  <h2>{plato.nombre}</h2>
                  {plato.lugar && (
                    <p className={styles.lugar}>📍 {plato.lugar}</p>
                  )}
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
        )}

        <div className={styles.volver}>
          <Link href="/gastronomia" className={styles.botonVolver}>
            ← Volver a la gastronomía
          </Link>
        </div>
      </div>
    </main>
  );
}