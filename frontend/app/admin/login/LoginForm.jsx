"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./login.module.css";

function IconoOjo({ tachado }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="22"
      height="22"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
      {tachado && <path d="M3 3l18 18" />}
    </svg>
  );
}

export default function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [pendiente, setPendiente] = useState(false);
  const [verClave, setVerClave] = useState(false);

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
        setError(resultado.error || "Correo o contraseña incorrectos.");
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
      <div className={styles.campoClave}>
        <input
          id="password"
          name="password"
          type={verClave ? "text" : "password"}
          autoComplete="current-password"
          required
        />
        <button
          type="button"
          className={styles.ojo}
          onClick={() => setVerClave((actual) => !actual)}
          aria-label={verClave ? "Ocultar contraseña" : "Mostrar contraseña"}
          aria-pressed={verClave}
          title={verClave ? "Ocultar contraseña" : "Mostrar contraseña"}
        >
          <IconoOjo tachado={verClave} />
        </button>
      </div>

      {error && (
        <p className={styles.error} role="alert">
          {error}
        </p>
      )}

      <button type="submit" className={styles.enviar} disabled={pendiente}>
        {pendiente ? "Ingresando..." : "Ingresar"}
      </button>
    </form>
  );
}
