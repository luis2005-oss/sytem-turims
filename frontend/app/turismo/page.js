import styles from "./turismo.module.css";
import Hero from "./components/Hero";
import Presentacion from "./components/Presentacion";
import Lugares from "./components/Lugares";
import Consejos from "./components/Consejos";
import Cta from "./components/Cta";

export default function Turismo() {
  return (
    <main className={styles.page}>
      <Hero />
      <Presentacion />
      <Lugares />
      <Consejos />
      <Cta />
    </main>
  );
}