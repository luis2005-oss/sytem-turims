import LoginForm from "./LoginForm";
import styles from "./login.module.css";

export const metadata = {
  title: "Acceso administrador",
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return (
    <main className={styles.pagina}>
      <section className={styles.tarjeta}>
        <span className={styles.etiqueta}>Panel privado</span>
        <h1>Acceso administrador</h1>
        <p>Ingresa con tu cuenta para gestionar el sitio.</p>

        <LoginForm />
      </section>
    </main>
  );
}
