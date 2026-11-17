"use client";
import { useMemo, useSyncExternalStore } from "react";

const KEY = "favoritos-gastronomia";
const oyentes = new Set();

const leer = () => {
  try {
    return localStorage.getItem(KEY) ?? "[]";
  } catch {
    return "[]";
  }
};

const suscribir = (cb) => {
  oyentes.add(cb);
  window.addEventListener("storage", cb);
  return () => {
    oyentes.delete(cb);
    window.removeEventListener("storage", cb);
  };
};

export function useFavoritos() {
  const raw = useSyncExternalStore(suscribir, leer, () => "[]");
  const favoritos = useMemo(() => {
    try {
      return JSON.parse(raw);
    } catch {
      return [];
    }
  }, [raw]);

  const alternar = (slug) => {
    const nuevo = favoritos.includes(slug)
      ? favoritos.filter((f) => f !== slug)
      : [...favoritos, slug];
    try {
      localStorage.setItem(KEY, JSON.stringify(nuevo));
    } catch {}
    oyentes.forEach((cb) => cb());
  };

  return { favoritos, alternar, esFavorito: (slug) => favoritos.includes(slug) };
}