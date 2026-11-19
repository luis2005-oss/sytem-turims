import Image from "next/image";
import styles from "./ContenidoPublicado.module.css";

export default async function ContenidoPublicado({ tipo, titulo }) {
  let registros = [];
  try {
    const respuesta = await fetch(`${process.env.BACKEND_URL || "http://localhost:4000"}/api/public/contenido/${tipo}`, { cache: "no-store" });
    if (respuesta.ok) registros = (await respuesta.json()).data || [];
  } catch {}

  if (!registros.length) return null;

  return (
    <section className={styles.seccion}>
      <div className={styles.encabezado}>
        <span>Contenido actualizado por el administrador</span>
        <h2>{titulo}</h2>
      </div>
      <div className={styles.grid}>
        {registros.map((registro) => (
          <article className={styles.tarjeta} key={registro.id}>
            {(registro.imagenUrl) && (
              <div className={styles.imagen}>
                <Image src={registro.imagenUrl} alt={registro.nombre || registro.titulo} fill sizes="(max-width: 700px) 100vw, 33vw" unoptimized />
              </div>
            )}
            <div className={styles.texto}>
              <h3>{registro.nombre || registro.titulo}</h3>
              {registro.fecha && <small>{registro.fecha}</small>}
              {registro.lugar && <small>{registro.lugar}</small>}
              {registro.resumen && <p>{registro.resumen}</p>}
              <p>{registro.descripcion || registro.contenido}</p>
              {Array.isArray(registro.ingredientes) && registro.ingredientes.length > 0 && (
                <details><summary>Ver ingredientes y preparación</summary>
                  <strong>Ingredientes</strong>
                  <ul>{registro.ingredientes.map((item, i) => <li key={i}>{item}</li>)}</ul>
                  <strong>Preparación</strong>
                  <ol>{(registro.preparacion || []).map((item, i) => <li key={i}>{item}</li>)}</ol>
                </details>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
