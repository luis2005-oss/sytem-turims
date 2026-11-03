import { SignJWT, jwtVerify } from "jose";

export const COOKIE_SESION = "admin_session";
export const DURACION_SEGUNDOS = 60 * 60 * 8; // 8 horas

function clave() {
  const secreto = process.env.SESSION_SECRET;
  if (!secreto || secreto.length < 32) {
    throw new Error("SESSION_SECRET debe tener al menos 32 caracteres");
  }
  return new TextEncoder().encode(secreto);
}

export async function firmarToken(adminId) {
  return new SignJWT({ sub: String(adminId) })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${DURACION_SEGUNDOS}s`)
    .sign(clave());
}

export async function verificarToken(token) {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, clave(), {
      algorithms: ["HS256"],
    });
    return payload;
  } catch {
    return null;
  }
}
