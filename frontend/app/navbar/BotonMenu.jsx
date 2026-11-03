"use client";
import styles from "./BotonMenu.module.css";

export default function BotonMenu({ abierto, onClick }) {
  return (
    <button
      type="button"
      className={`${styles.botonMenu} ${abierto ? styles.botonMenuAbierto : ""}`}
      onClick={onClick}
      aria-label={abierto ? "Cerrar menú" : "Abrir menú"}
      aria-expanded={abierto}
    >
      <span />
      <span />
      <span />
    </button>
  );
}
