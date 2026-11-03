"use client";

import { useRouter } from "next/navigation";
import styles from "./admin.module.css";

export default function BotonSalir() {
  const router = useRouter();

  async function salir() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.replace("/admin/login");
    router.refresh();
  }

  return (
    <button type="button" onClick={salir} className={styles.salir}>
      Cerrar sesión
    </button>
  );
}
