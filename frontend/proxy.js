import { NextResponse } from "next/server";

// En Next.js 16 "middleware" pasó a llamarse "proxy".
// Aquí solo se revisa si existe la cookie para redirigir rápido.
// La verificación real de la sesión la hace el backend (/api/auth/me).
export function proxy(request) {
  const { pathname } = request.nextUrl;
  const hayCookie = Boolean(request.cookies.get("admin_session")?.value);
  const enLogin = pathname === "/admin/login";

  if (!hayCookie && !enLogin) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  if (hayCookie && enLogin) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
