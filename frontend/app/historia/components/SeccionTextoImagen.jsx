import Image from "next/image";
import styles from "./sectionTextoImagen.module.css";

export default function SeccionTextoImagen({
  titulo,
  parrafos,
  imagen,
  reverse = false,
  fondoGris = false,
}) {
  const { alt, ...restoImagen } = imagen;

  const bloque = (
    <div className={reverse ? styles.gridReverse : styles.grid}>
      {reverse && (
        <div className={styles.imageBox}>
          <Image alt={alt} {...restoImagen} />
        </div>
      )}

      <div>
        <h2>{titulo}</h2>
        {parrafos.map((texto, indice) => (
          <p key={indice}>{texto}</p>
        ))}
      </div>

      {!reverse && (
        <div className={styles.imageBox}>
          <Image alt={alt} {...restoImagen} />
        </div>
      )}
    </div>
  );

  if (fondoGris) {
    return (
      <section className={styles.sectionGray}>
        <div className={styles.container}>{bloque}</div>
      </section>
    );
  }

  return <section className={styles.container}>{bloque}</section>;
}
