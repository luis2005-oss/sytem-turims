import styles from "./TimeLine.module.css";
import { momentos } from "../data/momentosData";

export default function Timeline() {
  return (
    <section className={styles.timelineSection}>
      <div className={styles.container}>
        <div className={styles.timelineGrid}>
          <div className={styles.timelineHeading}>
            <span className={styles.eyebrow}>Momentos especiales</span>

            <h2>Así se vive la celebración</h2>

            <p>
              Cada actividad fortalece la fe, la identidad y la unión de la
              comunidad celendina.
            </p>
          </div>

          <div className={styles.timeline}>
            {momentos.map((momento, index) => (
              <article className={styles.timelineItem} key={momento.titulo}>
                <span className={styles.timelineNumber}>
                  {String(index + 1).padStart(2, "0")}
                </span>

                <div>
                  <h3>{momento.titulo}</h3>
                  <p>{momento.descripcion}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
