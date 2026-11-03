import Image from "next/image";
import styles from "./Hero.module.css";

export default function Hero({ src, alt, titulo, subtitulo }) {
  return (
    <section className={styles.hero}>
      <div className={styles.overlay}></div>

      <Image src={src} alt={alt} fill priority className={styles.heroImage} />

      <div className={styles.heroContent}>
        <h1>{titulo}</h1>
        <span>{subtitulo}</span>
      </div>
    </section>
  );
}
