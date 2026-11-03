import styles from "./Presentacion.module.css";
import { caracteristicas } from "../data/caracteristicasData";

export default function Presentacion() {
  return (
    <section className={styles.presentacion}>
      <span>Una cocina llena de tradición</span>

      <h2>Sabores que cuentan nuestra historia</h2>

      <p>
        La gastronomía de Celendín reúne productos de los campos andinos,
        técnicas familiares y preparaciones que se disfrutan durante todo el
        año.
      </p>

      <div className={styles.caracteristicas}>
        {caracteristicas.map((item) => (
          <article className={styles.caracteristica} key={item.titulo}>
            <div className={styles.icono}>{item.icono}</div>

            <h3>{item.titulo}</h3>

            <p>{item.texto}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
