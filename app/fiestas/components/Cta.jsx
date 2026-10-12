import styles from "./Cta.module.css";

const eventos = [
  {
    mes: "Febrero / Marzo",
    titulo: "Carnaval Celendino",
    tipo: "Festividad",
    texto:
      "Corsos, comparsas, juegos con agua y coplas que llenan de color las calles y la plaza de armas.",
  },
  {
    mes: "Marzo / Abril",
    titulo: "Semana Santa",
    tipo: "Tradición",
    texto:
      "Procesiones, alfombras de flores y celebraciones religiosas que reúnen a las familias celendinas.",
  },
  {
    mes: "Mayo",
    titulo: "Fiesta de la Cruz y San Isidro Labrador",
    tipo: "Tradición",
    texto:
      "Celebraciones ligadas al calendario agrícola, con misas, música y reuniones en los caseríos.",
  },
  {
    mes: "Julio",
    titulo: "Fiesta Patronal y Semana Turística",
    tipo: "Festividad",
    texto:
      "La fiesta más esperada: Virgen del Carmen, ferias, desfiles, gastronomía y artesanía del sombrero celendino.",
  },
  {
    mes: "Julio",
    titulo: "Fiestas Patrias",
    tipo: "Festividad",
    texto:
      "Actos cívicos, desfile escolar e institucional y actividades culturales en toda la provincia.",
  },
  {
    mes: "Todo el año",
    titulo: "Turismo de naturaleza y aventura",
    tipo: "Actividad",
    texto:
      "Caminatas, paisajes andinos, visitas rurales y rutas hacia atractivos cercanos como Kuelap y Gocta (la mejor época suele ser de mayo a septiembre).",
  },
  {
    mes: "Noviembre",
    titulo: "Todos los Santos y Día de los Difuntos",
    tipo: "Tradición",
    texto:
      "Visitas a los cementerios, ofrendas y platos tradicionales en memoria de los seres queridos.",
  },
  {
    mes: "Diciembre",
    titulo: "Navidad",
    tipo: "Tradición",
    texto:
      "Novenas, pastorcitos, chocolatadas y reuniones familiares en torno a la plaza.",
  },
];

export default function Cta() {
  return (
    <section className={styles.cta} id="cronologia">
      <div className={styles.contenedor}>
        <header className={styles.encabezado}>
          <span className={styles.sobretitulo}>CALENDARIO CELENDINO</span>
          <h2 className={styles.titulo}>Cronología de Celendín</h2>
          <div className={styles.linea} />
          <p className={styles.subtitulo}>
            Festividades, tradiciones y actividades que marcan el año en la
            tierra del sombrero.
          </p>
        </header>

        <ol className={styles.timeline}>
          {eventos.map((e, i) => (
            <li
              key={e.titulo}
              className={`${styles.item} ${i % 2 === 0 ? styles.izq : styles.der}`}
            >
              <span className={styles.punto} />
              <article className={styles.tarjeta}>
                <span className={styles.mes}>{e.mes}</span>
                <h3 className={styles.nombre}>{e.titulo}</h3>
                <span
                  className={`${styles.tag} ${styles[e.tipo.toLowerCase().replace("ó", "o")]}`}
                >
                  {e.tipo}
                </span>
                <p className={styles.texto}>{e.texto}</p>
              </article>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
