import { NextResponse } from "next/server";

// En Next.js 16 "middleware" pasó a llamarse "proxy".
// Antes de abrir cualquier página de /admin, el proxy le pregunta al backend:
//   1) ¿el access token (cookie corta) sigue válido?  -> /api/auth/me
//   2) si no, ¿hay refresh token para renovarlo?      -> /api/auth/refresh
// Así el administrador no tiene que volver a loguearse cada 15 minutos.

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:4000";
const COOKIE_ACCESO = "admin_session";
const COOKIE_REFRESH = "admin_refresh";

async function llamarBackend(ruta, metodo, cookie) {
  try {
    return await fetch(`${BACKEND_URL}${ruta}`, {
      method: metodo,
      headers: { cookie },
      cache: "no-store",
    });
  } catch {
    return null; // backend apagado o sin conexión
  }
}

/** Devuelve { admin, setCookies }. setCookies son las cookies nuevas (o de borrado) del backend. */
async function comprobarSesion(request) {
  const acceso = request.cookies.get(COOKIE_ACCESO)?.value;
  const refresh = request.cookies.get(COOKIE_REFRESH)?.value;

  if (acceso) {
    const respuesta = await llamarBackend(
      "/api/auth/me",
      "GET",
      `${COOKIE_ACCESO}=${acceso}`,
    );
    if (respuesta?.ok) {
      const datos = await respuesta.json().catch(() => ({}));
      if (datos.admin) return { admin: datos.admin, setCookies: [] };
    }
  }

  if (refresh) {
    const respuesta = await llamarBackend(
      "/api/auth/refresh",
      "POST",
      `${COOKIE_REFRESH}=${refresh}`,
    );

    if (respuesta?.ok) {
      const datos = await respuesta.json().catch(() => ({}));
      if (datos.admin) {
        return {
          admin: datos.admin,
          setCookies: respuesta.headers.getSetCookie(),
        };
      }
    }

    // 401: el backend manda borrar las cookies que ya no sirven
    if (respuesta?.status === 401) {
      return { admin: null, setCookies: respuesta.headers.getSetCookie() };
    }
  }

  return { admin: null, setCookies: [] };
}

function anexarCookies(respuesta, setCookies) {
  for (const linea of setCookies) {
    respuesta.headers.append("set-cookie", linea);
  }
  return respuesta;
}

// La página (server component) lee las cookies de ESTA petición, así que
// hay que dejarle las nuevas para que no use el access token vencido.
function aplicarEnPeticion(request, setCookies) {
  for (const linea of setCookies) {
    const par = linea.split(";")[0];
    const igual = par.indexOf("=");
    if (igual < 1) continue;
    request.cookies.set(
      par.slice(0, igual).trim(),
      decodeURIComponent(par.slice(igual + 1)),
    );
  }
}

export async function proxy(request) {
  const enLogin = request.nextUrl.pathname === "/admin/login";
  const { admin, setCookies } = await comprobarSesion(request);

  if (!admin) {
    // Sin sesión válida: solo se puede ver el login
    const respuesta = enLogin
      ? NextResponse.next()
      : NextResponse.redirect(new URL("/admin/login", request.url));
    return anexarCookies(respuesta, setCookies);
  }

  if (enLogin) {
    // Ya tiene sesión: no tiene sentido mostrar el login
    return anexarCookies(
      NextResponse.redirect(new URL("/admin", request.url)),
      setCookies,
    );
  }

  aplicarEnPeticion(request, setCookies);
  return anexarCookies(NextResponse.next({ request }), setCookies);
}

export const config = {
  matcher: ["/admin/:path*"],
};
