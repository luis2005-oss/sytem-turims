import Image from "next/image";
import styles from "./Cta.module.css";

export default function Cta() {
  return (
    <section className={styles.cta}>
      <Image
        src="/images/turismo/cascada-la-novia.jpg"
        alt=""
        fill
        sizes="100vw"
        className={styles.ctaImage}
      />

      <div className={styles.ctaOverlay} />

      <div className={styles.ctaContent}>
        <span>Vive una experiencia inolvidable</span>
        <h2>Celendín te Espera</h2>

        <p>
          Descubre sus paisajes, comparte con su gente y conoce las tradiciones
          que hacen especial a esta provincia.
        </p>
      </div>
    </section>
  );
}
