import Image from "next/image";
import Link from "next/link";
import styles from "./Logo.module.css";

export default function Logo({ onClick }) {
  return (
    <Link
      href="/"
      className={styles.logoLink}
      aria-label="Ir al inicio"
      onClick={onClick}
    >
      <Image
        src="/images/logo/logocelendin.png"
        alt="Logo Turismo Celendín"
        width={170}
        height={130}
        priority
        className={styles.logoImagen}
      />
    </Link>
  );
}
