import Image from "next/image";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={styles.hero}>
      <Image
        src="/images/portadas/chicharron-portada.jpg"
        alt="Portada de la gastronomía de Celendín"
        fill
        priority
        sizes="100vw"
        className={styles.heroImagen}
      />

      <div className={styles.heroOverlay} />

      <div className={styles.heroContenido}>
        <span className={styles.etiqueta}>Sabores de nuestra tierra</span>

        <h1>
          Gastronomía de
          <strong> Celendín</strong>
        </h1>

        <p>
          Descubre una cocina llena de tradición, ingredientes naturales y
          recetas que forman parte de la identidad de Celendín y Cajamarca.
        </p>

        <a href="#platos" className={styles.boton}>
          Conocer los platos
        </a>
      </div>
    </section>
  );
}
