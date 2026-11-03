"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import styles from "./Navbar.module.css";
import Logo from "./Logo";
import MenuEscritorio from "./MenuEscritorio";
import MenuMovil from "./MenuMovil";
import BotonMenu from "./BotonMenu";
import { enlacesDerecha } from "./navbarData";

export default function Navbar() {
  const pathname = usePathname();
  const [abierto, setAbierto] = useState(false);

  const cerrarMenu = () => setAbierto(false);
  const alternarMenu = () => setAbierto((valor) => !valor);

  return (
    <header className={styles.header}>
      <div className={styles.navbar}>
        <Logo onClick={cerrarMenu} />

        <MenuEscritorio
          enlaces={enlacesDerecha}
          pathname={pathname}
          cerrarMenu={cerrarMenu}
        />

        <BotonMenu abierto={abierto} onClick={alternarMenu} />
      </div>

      <MenuMovil
        enlaces={enlacesDerecha}
        pathname={pathname}
        abierto={abierto}
        cerrarMenu={cerrarMenu}
      />
    </header>
  );
}
