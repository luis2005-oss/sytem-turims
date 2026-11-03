import Image from "next/image";
import Link from "next/link";
import styles from "./Receta.module.css";

export default function Receta({ plato, anterior, siguiente }) {
  return (
    <main className={styles.contenedor}>
      <div className={styles.barra}>
    
        <span className={styles.categoria}>{plato.categoria}</span>
      </div>

      <header className={styles.encabezado}>
        <h1 className={styles.titulo}>{plato.nombre}</h1>
        <p className={styles.descripcion}>{plato.descripcion}</p>
      </header>

      <div className={styles.contenido}>
        <div className={styles.imagenContenedor}>
          <Image
            src={plato.imagen}
            alt={plato.nombre}
            fill
            sizes="(max-width: 768px) 100vw, 40vw"
            className={styles.imagen}
            priority
          />
        </div>

        <div className={styles.detalle}>
          <section className={styles.bloque}>
            <h2>Ingredientes</h2>
            <ul>
              {plato.receta.ingredientes.map((ingrediente) => (
                <li key={ingrediente}>{ingrediente}</li>
              ))}
            </ul>
          </section>

          <section className={styles.bloque}>
            <h2>Preparación</h2>
            <ol>
              {plato.receta.pasos.map((paso, i) => (
                <li key={i}>{paso}</li>
              ))}
            </ol>
          </section>
        </div>
      </div>

      <nav className={styles.pie}>
        <Link
          href={`/gastronomia/${anterior.slug}`}
          className={styles.botonLateral}
          title={anterior.nombre}
        >
          ← <span className={styles.textoNav}>Anterior</span>
        </Link>

        <Link href="/gastronomia" className={styles.regresarAbajo}>
          Volver a la gastronomía
        </Link>

        <Link
          href={`/gastronomia/${siguiente.slug}`}
          className={styles.botonSiguiente}
          title={siguiente.nombre}
        >
          <span className={styles.textoNav}>Siguiente</span> →
        </Link>
      </nav>
    </main>
  );
}