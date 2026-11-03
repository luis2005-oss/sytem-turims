import Image from "next/image";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={styles.hero}>
      <Image
        src="/images/portadas/fiestas-portada.jpg"
        alt="Iglesia principal de Celendín"
        fill
        priority
        sizes="100vw"
        className={styles.heroImage}
      />

      <div className={styles.heroOverlay} />
      <div className={styles.heroGlow} />

      <div className={styles.heroContent}>
        <span className={styles.heroTag}>
          Tradición • Cultura • Celebración
        </span>

        <h1>Fiestas</h1>

        <p>
          Celendín celebra durante todo el año festividades religiosas,
          carnavales, ferias y eventos culturales que mantienen vivas sus
          tradiciones y reúnen a toda la comunidad.
        </p>

        <div className={styles.heroButtons}>
          <a href="#tradicion" className={styles.primaryButton}>
            Conocer la tradición
          </a>
        </div>
      </div>
    </section>
  );
}
