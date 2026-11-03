"use client";

import Link from "next/link";
import styles from "./EnlaceMenu.module.css";

export default function EnlaceMenu({ enlace, pathname, cerrarMenu }) {
  const activo =
    pathname === enlace.href ||
    (enlace.href !== "/" && pathname.startsWith(`${enlace.href}/`));

  return (
    <Link
      href={enlace.href}
      className={`${styles.enlace} ${activo ? styles.activo : ""}`}
      onClick={cerrarMenu}
    >
      {enlace.nombre}
    </Link>
  );
}
