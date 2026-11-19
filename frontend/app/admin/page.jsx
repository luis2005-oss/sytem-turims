import { redirect } from "next/navigation";
import { obtenerAdmin } from "../../lib/admin";
import AdminContenido from "./AdminContenido";

export const metadata = {
  title: "Panel de administración",
  robots: { index: false, follow: false },
};

export default async function AdminPage() {
  const admin = await obtenerAdmin();
  if (!admin) redirect("/admin/login");
  return <AdminContenido admin={admin} />;
}
