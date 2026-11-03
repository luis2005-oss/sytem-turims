import Image from "next/image";
import styles from "./Consejos.module.css";

const consejos = [
  "Lleva ropa cómoda y abrigo para los cambios de clima.",
  "Usa protector solar, gorra y lleva suficiente agua.",
  "Respeta los espacios naturales, culturales y religiosos.",
  "Consulta las rutas y condiciones antes de cada recorrido.",
];

export default function Consejos() {
  return (
    <section className={styles.tipsSection}>
      <div className={styles.container}>
        <div className={styles.tipsGrid}>
          <div className={styles.tipsImage}>
            <Image
              src="/turismo/cerro.jpg"
              alt="Montañas y naturaleza de Celendín"
              fill
              sizes="(max-width: 900px) 100vw, 50vw"
              className={styles.coverImage}
            />
          </div>

          <div className={styles.tipsContent}>
            <span className={styles.eyebrow}>Prepara tu recorrido</span>
            <h2>Disfruta Celendín de forma segura</h2>

            <p>
              Antes de salir, prepara lo necesario para recorrer la ciudad, sus
              comunidades y sus espacios naturales.
            </p>

            <div className={styles.tipsList}>
              {consejos.map((texto, indice) => (
                <div key={indice}>
                  <span>{String(indice + 1).padStart(2, "0")}</span>
                  <p>{texto}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
