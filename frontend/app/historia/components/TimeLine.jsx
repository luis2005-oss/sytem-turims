import styles from "./TimeLine.module.css";
import { timelineData } from "../data/timelineData";

export default function Timeline() {
  return (
    <section className={styles.timelineSection}>
      <div className={styles.container}>
        <h2 className={styles.center}>Línea del Tiempo</h2>

        <div className={styles.timeline}>
          {timelineData.map((item) => (
            <div className={styles.card} key={item.titulo}>
              <span>{item.periodo}</span>
              <h3>{item.titulo}</h3>
              <p>{item.texto}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
