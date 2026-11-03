// Crea (o actualiza) el administrador a partir de variables de entorno.
// Uso: npm run seed
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
const password = process.env.ADMIN_PASSWORD;
const nombre = process.env.ADMIN_NOMBRE?.trim() || "Administrador";

if (!email || !password) {
  console.error("Define ADMIN_EMAIL y ADMIN_PASSWORD en tu archivo .env");
  process.exit(1);
}

if (password.length < 10) {
  console.error("ADMIN_PASSWORD debe tener al menos 10 caracteres");
  process.exit(1);
}

const hash = await bcrypt.hash(password, 12);

await prisma.admin.upsert({
  where: { email },
  update: { password: hash, nombre },
  create: { email, password: hash, nombre },
});

console.log(`Administrador listo: ${email}`);
await prisma.$disconnect();
