"use client";

import { useEffect } from "react";
import Image from "next/image";
import styles from "./RecetaModal.module.css";

export default function RecetaModal({ plato, cerrar }) {
  useEffect(() => {
    const alPresionar = (e) => {
      if (e.key === "Escape") cerrar();
    };

    const overflowOriginal = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", alPresionar);

    return () => {
      document.body.style.overflow = overflowOriginal;
      window.removeEventListener("keydown", alPresionar);
    };
  }, [cerrar]);

  return (
    <div className={styles.fondo} onClick={cerrar}>
      <div
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby="receta-titulo"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className={styles.cerrar}
          onClick={cerrar}
          aria-label="Cerrar receta"
        >
          ×
        </button>

        <div className={styles.imagen}>
          <Image
            src={plato.imagen}
            alt={plato.nombre}
            fill
            sizes="(max-width: 700px) 100vw, 720px"
            className={styles.foto}
          />
          <span className={styles.categoria}>{plato.categoria}</span>
        </div>

        <div className={styles.cuerpo}>
          <h3 id="receta-titulo">{plato.nombre}</h3>

          <div className={styles.datos}>
            <span>⏱ {plato.tiempo}</span>
            <span>🍽 {plato.porciones}</span>
          </div>

          <h4>Ingredientes</h4>
          <ul className={styles.ingredientes}>
            {plato.ingredientes.map((ingrediente) => (
              <li key={ingrediente}>{ingrediente}</li>
            ))}
          </ul>

          <h4>Preparación</h4>
          <ol className={styles.pasos}>
            {plato.preparacion.map((paso, indice) => (
              <li key={indice}>
                <span>{indice + 1}</span>
                <p>{paso}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}
