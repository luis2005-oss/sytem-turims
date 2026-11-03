"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./login.module.css";

export default function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [pendiente, setPendiente] = useState(false);

  async function enviar(evento) {
    evento.preventDefault();
    setError("");
    setPendiente(true);

    const datos = new FormData(evento.currentTarget);

    try {
      // /api/* se reenvía al backend (ver rewrites en next.config)
      const respuesta = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: datos.get("email"),
          password: datos.get("password"),
        }),
      });

      const resultado = await respuesta.json().catch(() => ({}));

      if (!respuesta.ok) {
        setError(resultado.error || "No se pudo iniciar sesión.");
        setPendiente(false);
        return;
      }

      router.replace("/admin");
      router.refresh();
    } catch {
      setError("No se pudo conectar con el servidor.");
      setPendiente(false);
    }
  }

  return (
    <form onSubmit={enviar} className={styles.formulario}>
      <label htmlFor="email">Correo</label>
      <input
        id="email"
        name="email"
        type="email"
        autoComplete="username"
        required
      />

      <label htmlFor="password">Contraseña</label>
      <input
        id="password"
        name="password"
        type="password"
        autoComplete="current-password"
        required
      />

      {error && (
        <p className={styles.error} role="alert">
          {error}
        </p>
      )}

      <button type="submit" disabled={pendiente}>
        {pendiente ? "Ingresando..." : "Ingresar"}
      </button>
    </form>
  );
}
