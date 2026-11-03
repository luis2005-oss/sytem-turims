import { redirect } from "next/navigation";
import { obtenerAdmin } from "../../lib/admin";
import BotonSalir from "./BotonSalir";
import styles from "./admin.module.css";

export const metadata = {
  title: "Panel de administración",
  robots: { index: false, follow: false },
};

export default async function AdminPage() {
  // Verificación real contra el backend (el proxy solo revisa que haya cookie)
  const admin = await obtenerAdmin();
  if (!admin) redirect("/admin/login");

  return (
    <main className={styles.pagina}>
      <section className={styles.panel}>
        <span className={styles.etiqueta}>Panel de administración</span>
        <h1>Hola, {admin.nombre}</h1>
        <p>Sesión iniciada como {admin.email}.</p>

        <BotonSalir />
      </section>
    </main>
  );
}
