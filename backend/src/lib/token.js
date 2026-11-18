import { createHash, randomBytes } from "node:crypto";
import { SignJWT, jwtVerify } from "jose";

// Cookie del access token (JWT corto). Se llama igual que antes.
export const COOKIE_SESION = "admin_session";
// Cookie del refresh token (texto aleatorio, largo). Su hash vive en la BD.
export const COOKIE_REFRESH = "admin_refresh";

export const DURACION_ACCESO_SEGUNDOS = 60 * 15; // 15 minutos
export const DURACION_REFRESH_SEGUNDOS = 60 * 60 * 24 * 7; // 7 días

function clave() {
  const secreto = process.env.SESSION_SECRET;
  if (!secreto || secreto.length < 32) {
    throw new Error("SESSION_SECRET debe tener al menos 32 caracteres");
  }
  return new TextEncoder().encode(secreto);
}

/** Access token: lleva el id del admin (sub) y el id de su sesión (sid). */
export async function firmarToken(adminId, sesionId) {
  return new SignJWT({ sub: String(adminId), sid: String(sesionId) })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${DURACION_ACCESO_SEGUNDOS}s`)
    .sign(clave());
}

export async function verificarToken(token) {
  if (!token || typeof token !== "string") return null;
  try {
    const { payload } = await jwtVerify(token, clave(), {
      algorithms: ["HS256"],
    });
    return payload;
  } catch {
    return null;
  }
}

/** Refresh token: 48 bytes aleatorios (no es un JWT, no se puede "leer"). */
export function generarRefreshToken() {
  return randomBytes(48).toString("base64url");
}


export function hashRefreshToken(token) {
  return createHash("sha256").update(token).digest("hex");
}
