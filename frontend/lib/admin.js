import { cookies } from "next/headers";

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:4000";

/** Pregunta al backend quién es el admin logueado. Devuelve el admin o null. */
export async function obtenerAdmin() {
  const almacen = await cookies();
  const token = almacen.get("admin_session")?.value;
  if (!token) return null;

  try {
    const respuesta = await fetch(`${BACKEND_URL}/api/auth/me`, {
      headers: { cookie: `admin_session=${token}` },
      cache: "no-store",
    });

    if (!respuesta.ok) return null;

    const datos = await respuesta.json();
    return datos.admin ?? null;
  } catch {
    return null;
  }
}
