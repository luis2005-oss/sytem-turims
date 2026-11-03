import Image from "next/image";
import styles from "./Presentacion.module.css";
import { experiencias } from "../data/experienciaData";

export default function Presentacion() {
  return (
    <section id="presentacion" className={styles.presentation}>
      <div className={styles.container}>
        <div className={styles.presentationGrid}>
          <div className={styles.presentationText}>
            <span className={styles.eyebrow}>
              Turismo, cultura y naturaleza
            </span>

            <h2>Una Provincia Llena de Lugares por Descubrir</h2>

            <p>
              Celendín ofrece recorridos por su centro histórico, paisajes
              naturales, cascadas, miradores y comunidades que mantienen vivas
              sus costumbres.
            </p>

            <p>
              Sus calles, templos, construcciones tradicionales y espacios
              naturales convierten cada visita en una experiencia llena de
              identidad, tranquilidad y aventura.
            </p>

            <div className={styles.presentationStats}>
              <div>
                <strong>12+</strong>
                <span>Lugares destacados</span>
              </div>

              <div>
                <strong>4</strong>
                <span>Experiencias principales</span>
              </div>

              <div>
                <strong>100%</strong>
                <span>Cultura celendina</span>
              </div>
            </div>
          </div>

          <div className={styles.presentationImage}>
            <Image
              src="/turismo/zelendin.jpg"
              alt="Paisaje panorámico de Celendín"
              fill
              sizes="(max-width: 900px) 100vw, 46vw"
              className={styles.coverImage}
            />

            <div className={styles.imageBadge}>
              <span></span>
              <div>
                <small>Destino</small>
                <strong>Celendín, Cajamarca</strong>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.experienceGrid}>
          {experiencias.map((experiencia) => (
            <article className={styles.experienceCard} key={experiencia.titulo}>
              <div className={styles.experienceIcon}>
                <Image
                  src={experiencia.icono}
                  alt={experiencia.titulo}
                  width={30}
                  height={30}
                />
              </div>

              <div>
                <h3>{experiencia.titulo}</h3>
                <p>{experiencia.texto}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
