import { createHash } from "node:crypto";

function firmaCloudinary(parametros, secreto) {
  const cadena = Object.keys(parametros)
    .filter((clave) => parametros[clave] !== undefined && parametros[clave] !== null && parametros[clave] !== "")
    .sort()
    .map((clave) => `${clave}=${parametros[clave]}`)
    .join("&");
  return createHash("sha1").update(cadena + secreto).digest("hex");
}

export function crearFirmaSubida(req, res) {
  const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = process.env;
  if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_API_KEY || !CLOUDINARY_API_SECRET) {
    return res.status(503).json({ error: "Falta configurar Cloudinary en el backend." });
  }

  const timestamp = Math.floor(Date.now() / 1000);
  const parametros = {
    folder: "celendin-turismo",
    timestamp,
  };

  return res.json({
    cloudName: CLOUDINARY_CLOUD_NAME,
    apiKey: CLOUDINARY_API_KEY,
    timestamp,
    folder: parametros.folder,
    signature: firmaCloudinary(parametros, CLOUDINARY_API_SECRET),
  });
}
