import Image from "next/image";
import styles from "./Lugares.module.css";
import { lugares } from "../data/lugaresData";

export default function Lugares() {
  return (
    <section id="lugares" className={styles.placesSection}>
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <div>
            <span className={styles.eyebrow}>
              Lugares reales de la provincia
            </span>
            <h2>Lugares Turísticos Destacados</h2>
          </div>
        </div>

        <div className={styles.placesGrid}>
          {lugares.map((lugar, index) => (
            <article className={styles.placeCard} key={lugar.nombre}>
              <div className={styles.cardImage}>
                <Image
                  src={lugar.imagen}
                  alt={lugar.nombre}
                  fill
                  sizes="(max-width: 700px) 100vw, (max-width: 1050px) 50vw, 33vw"
                  className={styles.coverImage}
                />

                <span className={styles.cardNumber}>
                  {String(index + 1).padStart(2, "0")}
                </span>

                <span className={styles.cardType}>{lugar.tipo}</span>
              </div>

              <div className={styles.cardContent}>
                <span className={styles.cardZone}> {lugar.zona}</span>
                <p>{lugar.descripcion}</p>

                <div className={styles.cardFooter}>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(lugar.ubicacion)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.locationLink}
                    aria-label={`Ver ubicación de ${lugar.nombre} en Google Maps`}
                  >
                    <span aria-hidden="true">📍</span>
                    Ver ubicación en Maps
                    <span aria-hidden="true">↗</span>
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
