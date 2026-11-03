import Image from "next/image";
import styles from "./Introduccion.module.css";

export default function Introduccion() {
  return (
    <section id="tradicion" className={styles.introduction}>
      <div className={styles.container}>
        <div className={styles.introductionGrid}>
          <div className={styles.introductionContent}>
            <span className={styles.eyebrow}>Tradición celendina</span>

            <h2>Una celebración que une generaciones</h2>

            <p>
              Las Fiestas Patronales de Celendín representan uno de los
              encuentros religiosos y culturales más importantes de la
              provincia. Durante estas fechas, las calles reciben a visitantes,
              familias y comunidades que participan en las diferentes
              actividades.
            </p>

            <p>
              Las procesiones, las bandas musicales, la gastronomía, las ferias
              y las presentaciones artísticas convierten la celebración en una
              muestra viva de la identidad celendina.
            </p>

            <div className={styles.features}>
              <div>
                <strong>Fe</strong>
                <span>Devoción y encuentro</span>
              </div>

              <div>
                <strong>Cultura</strong>
                <span>Música y tradición</span>
              </div>

              <div>
                <strong>Familia</strong>
                <span>Unión de la comunidad</span>
              </div>
            </div>
          </div>

          <div className={styles.introductionImage}>
            <Image
              src="/images/fiestas/cristi.jpg"
              alt="Plaza de Armas de Celendín"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className={styles.coverImage}
            />

            <div className={styles.imageInformation}>
              <span></span>

              <div>
                <small>Celebración</small>
                <strong>Celendín, Cajamarca</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
