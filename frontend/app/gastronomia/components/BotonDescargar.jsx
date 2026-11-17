"use client";
import styles from "./BotonesReceta.module.css";

export default function BotonDescargar({ plato }) {
  const descargar = () => {
    const texto =
      `${plato.nombre}\n` +
      `${plato.descripcion}\n\n` +
      `INGREDIENTES\n` +
      plato.receta.ingredientes.map((i) => `- ${i}`).join("\n") +
      `\n\nPREPARACIÓN\n` +
      plato.receta.pasos.map((p, n) => `${n + 1}. ${p}`).join("\n") +
      `\n`;

    const url = URL.createObjectURL(
      new Blob([texto], { type: "text/plain;charset=utf-8" })
    );
    const a = document.createElement("a");
    a.href = url;
    a.download = `${plato.slug}.txt`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <button
      type="button"
      className={styles.boton}
      onClick={descargar}
      aria-label="Descargar receta"
      title="Descargar receta"
    >
      <span aria-hidden="true">⬇</span>
      <span className={styles.texto}>Descargar</span>
    </button>
  );
}