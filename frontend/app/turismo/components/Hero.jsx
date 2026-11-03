import Link from "next/link";
import Image from "next/image";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={styles.hero}>
      <Image
        src="/images/portadas/portadaTurismo.jpg"
        alt="Vista turística de Celendín"
        fill
        priority
        sizes="100vw"
        className={styles.heroImage}
      />

      <div className={styles.heroOverlay} />
      <div className={styles.heroLight} />

      <div className={styles.heroContent}>
        <span className={styles.heroTag}>Cielo azul del Edén</span>

        <h1>
          Descubre
          <span>Celendín</span>
        </h1>

        <p>
          Explora plazas, iglesias, miradores, cascadas, montañas, tradiciones y
          paisajes llenos de historia.
        </p>

        <div className={styles.heroButtons}>
          <a href="#lugares" className={styles.primaryButton}>
            Ver lugares turísticos
          </a>

          <Link href="/galeria" className={styles.secondaryButton}>
            Explorar galería
          </Link>
        </div>
      </div>
    </section>
  );
}
