import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.hero}>
        <span className={styles.subtitulo}>BIENVENIDOS A</span>
        <h1> Celendín</h1>
        <div className={styles.linea}></div>
        <p>Donde la naturaleza y la tradición se encuentran.</p>
      </div>
    </main>
  );
}
