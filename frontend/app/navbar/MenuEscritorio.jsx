import EnlaceMenu from "./EnlaceMenu";
import styles from "./MenuEscritorio.module.css";

export default function MenuEscritorio({ enlaces, pathname, cerrarMenu }) {
  return (
    <nav className={styles.menuEscritorio}>
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
