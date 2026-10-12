"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "./Platos.module.css";
import { platos } from "../data/platosdata";
import RecetaModal from "./RecetaModal";

export default function Platos() {
  const [platoActivo, setPlatoActivo] = useState(null);

  const cerrarReceta = () => setPlatoActivo(null);

  return (
    <section id="platos" className={styles.seccionPlatos}>
      <div className={styles.encabezado}>
        <span>Platos y productos regionales</span>

        <h2>Gastronomía Tradicional</h2>

        <p>
          Conoce algunas de las preparaciones y productos más apreciados en
          Celendín y la región Cajamarca.
        </p>
      </div>

      <div className={styles.grid}>
        {platos.map((plato) => (
          <article className={styles.tarjeta} key={plato.nombre}>
            <div className={styles.imagenContenedor}>
              <Image
                src={plato.imagen}
                alt={plato.nombre}
                fill
                className={styles.imagen}
              />

              <span className={styles.categoria}>{plato.categoria}</span>
            </div>

            <div className={styles.contenido}>
              <h3>{plato.nombre}</h3>

              <p>{plato.descripcion}</p>

              <button
                type="button"
                className={styles.botonReceta}
                onClick={() => setPlatoActivo(plato)}
              >
                Ver receta
              </button>
            </div>
          </article>
        ))}
      </div>

      {platoActivo && <RecetaModal plato={platoActivo} cerrar={cerrarReceta} />}
    </section>
  );
}
