import Image from "next/image";
import styles from "./Actividades.module.css";
import { actividades } from "../data/actividadesData";

export default function Actividades() {
  return (
    <section className={styles.activitiesSection}>
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <span className={styles.eyebrow}>Vive la experiencia</span>

          <h2>Fiestas tradicionales de Celendín</h2>

          <p>
            Conoce algunas de las actividades religiosas, culturales y
            tradicionales que forman parte de las fiestas.
          </p>
        </div>

        <div className={styles.activitiesGrid}>
          {actividades.map((actividad) => (
            <article className={styles.activityCard} key={actividad.titulo}>
              <div className={styles.activityImage}>
                <Image
                  src={actividad.imagen}
                  alt={actividad.titulo}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className={styles.coverImage}
                />
              </div>

              <div className={styles.activityContent}>
                <div className={styles.activityTop}>
                  <span className={styles.activityNumber}>
                    {actividad.numero}
                  </span>
                </div>

                <h3>{actividad.titulo}</h3>

                <p>{actividad.descripcion}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
