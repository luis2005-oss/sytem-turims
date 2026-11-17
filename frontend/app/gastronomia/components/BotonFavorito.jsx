"use client";
import { useFavoritos } from "../hooks/useFavoritos";
import styles from "./BotonesReceta.module.css";

export default function BotonFavorito({ slug, variante = "completo" }) {
  const { esFavorito, alternar } = useFavoritos();
  const activo = esFavorito(slug);
  const etiqueta = activo ? "Quitar de favoritos" : "Agregar a favoritos";

  const clases = [
    styles.boton,
    variante === "icono" ? styles.icono : "",
    activo ? styles.activo : "",
  ].join(" ");

  return (
    <button
      type="button"
      className={clases}
      onClick={() => alternar(slug)}
      aria-pressed={activo}
      aria-label={etiqueta}
      title={etiqueta}
    >
      <span aria-hidden="true">{activo ? "★" : "☆"}</span>
      {variante === "completo" && (
        <span className={styles.texto}>
          {activo ? "En favoritos" : "Favorito"}
        </span>
      )}
    </button>
  );
}