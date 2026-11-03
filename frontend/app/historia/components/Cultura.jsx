import Image from "next/image";
import styles from "./Cultura.module.css";
import { culturaData } from "../data/culturaData";

export default function Cultura() {
  return (
    <section className={styles.container}>
      <h2 className={styles.center}>Cultura y Tradiciones</h2>

      <div className={styles.cards}>
        {culturaData.map((item) => (
          <div className={styles.infoCard} key={item.titulo}>
            <Image src={item.src} alt={item.alt} width={400} height={250} />
            <h3>{item.titulo}</h3>
            <p>{item.texto}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
