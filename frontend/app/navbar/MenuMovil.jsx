import EnlaceMenu from "./EnlaceMenu";
import styles from "./MenuMovil.module.css";

export default function MenuMovil({ enlaces, pathname, abierto, cerrarMenu }) {
  return (
    <nav
      className={`${styles.menuMovil} ${abierto ? styles.menuMovilAbierto : ""}`}
    >
      {enlaces.map((enlace) => (
        <EnlaceMenu
          key={enlace.href}
          enlace={enlace}
          pathname={pathname}
          cerrarMenu={cerrarMenu}
        />
      ))}
    </nav>
  );
}
