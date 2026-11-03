import bcrypt from "bcryptjs";
import { prisma } from "../lib/prisma.js";
import {
  COOKIE_SESION,
  DURACION_SEGUNDOS,
  firmarToken,
} from "../lib/token.js";

const MAX_INTENTOS = 5;
const VENTANA_MINUTOS = 15;

// Hash falso para que el tiempo de respuesta sea parecido exista o no el correo
// (evita descubrir qué correos están registrados).
const HASH_FALSO = bcrypt.hashSync("hash-falso", 12);

const opcionesCookie = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
  path: "/",
};

export async function login(req, res) {
  const email = String(req.body?.email ?? "")
    .trim()
    .toLowerCase()
    .slice(0, 254);
  const password = String(req.body?.password ?? "").slice(0, 200);

  if (!email || !password) {
    return res
      .status(400)
      .json({ error: "Ingresa tu correo y tu contraseña." });
  }

  const ip = req.ip || "desconocida";
  const desde = new Date(Date.now() - VENTANA_MINUTOS * 60 * 1000);

  // Bloqueo temporal si hay demasiados fallos recientes por correo o por IP
  const fallos = await prisma.loginIntento.count({
    where: { createdAt: { gte: desde }, OR: [{ email }, { ip }] },
  });

  if (fallos >= MAX_INTENTOS) {
    return res.status(429).json({
      error: `Demasiados intentos. Vuelve a probar en ${VENTANA_MINUTOS} minutos.`,
    });
  }

  const admin = await prisma.admin.findUnique({ where: { email } });
  const coincide = await bcrypt.compare(
    password,
    admin ? admin.password : HASH_FALSO,
  );

  if (!admin || !coincide) {
    await prisma.loginIntento.create({ data: { email, ip } });
    return res.status(401).json({ error: "Correo o contraseña incorrectos." });
  }

  // Acceso correcto: limpia intentos fallidos y registros viejos
  await prisma.loginIntento.deleteMany({
    where: { OR: [{ email }, { ip }, { createdAt: { lt: desde } }] },
  });

  const token = await firmarToken(admin.id);

  res.cookie(COOKIE_SESION, token, {
    ...opcionesCookie,
    maxAge: DURACION_SEGUNDOS * 1000,
  });

  return res.json({
    admin: { id: admin.id, nombre: admin.nombre, email: admin.email },
  });
}

export function logout(req, res) {
  res.clearCookie(COOKIE_SESION, opcionesCookie);
  return res.json({ ok: true });
}

export function me(req, res) {
  return res.json({ admin: req.admin });
}
