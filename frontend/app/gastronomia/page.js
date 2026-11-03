import styles from "./gastronomia.module.css";

import Hero from "./components/Hero";
import Presentacion from "./components/Presentacion";
import Platos from "./components/Platos";
import Invitacion from "./components/Invitacion";

export const metadata = {
  title: "Gastronomía de Celendín",
  description:
    "Conoce los platos típicos, productos regionales y dulces tradicionales de Celendín y Cajamarca.",
};

export default function GastronomiaPage() {
  return (
    <main className={styles.pagina}>
      <Hero />
      <Presentacion />
      <Platos />
      <Invitacion />
    </main>
  );
}