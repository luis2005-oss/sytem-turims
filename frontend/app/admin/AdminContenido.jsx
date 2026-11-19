"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import BotonSalir from "./BotonSalir";
import styles from "./admin.module.css";

const MODULOS = {
  "centros-turisticos": {
    titulo: "Centros turísticos",
    singular: "centro turístico",
    campos: [
      ["nombre", "Nombre", "text", true],
      ["tipo", "Tipo de lugar", "text", true],
      ["zona", "Zona o sector", "text"],
      ["ubicacion", "Ubicación", "text", true],
      ["descripcion", "Descripción", "textarea", true],
      ["imagenUrl", "URL de imagen", "url"],
    ],
  },
  recetas: {
    titulo: "Recetas",
    singular: "receta",
    campos: [
      ["nombre", "Nombre del plato", "text", true],
      ["categoria", "Categoría", "text", true],
      ["descripcion", "Descripción", "textarea", true],
      ["tiempoPreparacion", "Tiempo de preparación", "text"],
      ["porciones", "Porciones", "number"],
      ["ingredientes", "Ingredientes (uno por línea)", "list"],
      ["preparacion", "Preparación (un paso por línea)", "list"],
      ["imagenUrl", "URL de imagen", "url"],
    ],
  },
  fiestas: {
    titulo: "Fiestas",
    singular: "fiesta",
    campos: [
      ["nombre", "Nombre de la celebración", "text", true],
      ["fecha", "Fecha o temporada", "text"],
      ["lugar", "Lugar", "text"],
      ["descripcion", "Descripción", "textarea", true],
      ["imagenUrl", "URL de imagen", "url"],
    ],
  },
  historia: {
    titulo: "Historia",
    singular: "artículo histórico",
    campos: [
      ["titulo", "Título", "text", true],
      ["categoria", "Categoría", "text"],
      ["resumen", "Resumen", "textarea"],
      ["contenido", "Contenido", "textarea", true],
      ["imagenUrl", "URL de imagen", "url"],
    ],
  },
};

const VACIO = { publicado: false };

export default function AdminContenido({ admin }) {
  const router = useRouter();
  const [modulo, setModulo] = useState("centros-turisticos");
  const [registros, setRegistros] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [formulario, setFormulario] = useState(null);
  const [guardando, setGuardando] = useState(false);
  const [subiendoImagen, setSubiendoImagen] = useState(false);

  const config = MODULOS[modulo];
  const totalPublicados = useMemo(() => registros.filter((item) => item.publicado).length, [registros]);

  async function cargar() {
    setCargando(true);
    setError("");
    try {
      const query = busqueda.trim() ? `?buscar=${encodeURIComponent(busqueda.trim())}` : "";
      const respuesta = await fetch(`/api/admin/contenido/${modulo}${query}`, { cache: "no-store" });
      const datos = await respuesta.json();
      if (!respuesta.ok) throw new Error(datos.error || "No se pudo cargar el contenido.");
      setRegistros(datos.data || []);
    } catch (err) {
      setError(err.message || "Error de conexión con el servidor.");
    } finally {
      setCargando(false);
    }
  }

  useEffect(() => {
    cargar();
  }, [modulo, busqueda]);

  async function subirImagen(archivo) {
    if (!archivo) return;
    if (!archivo.type.startsWith("image/")) {
      setError("Selecciona un archivo de imagen válido.");
      return;
    }
    if (archivo.size > 8 * 1024 * 1024) {
      setError("La imagen no debe superar los 8 MB.");
      return;
    }

    setSubiendoImagen(true);
    setError("");
    try {
      const firmaRespuesta = await fetch("/api/admin/cloudinary/signature", { method: "POST" });
      const firma = await firmaRespuesta.json();
      if (!firmaRespuesta.ok) throw new Error(firma.error || "No se pudo preparar la subida.");

      const datos = new FormData();
      datos.append("file", archivo);
      datos.append("api_key", firma.apiKey);
      datos.append("timestamp", String(firma.timestamp));
      datos.append("folder", firma.folder);
      datos.append("signature", firma.signature);

      const subida = await fetch(`https://api.cloudinary.com/v1_1/${firma.cloudName}/image/upload`, {
        method: "POST",
        body: datos,
      });
      const imagen = await subida.json();
      if (!subida.ok) throw new Error(imagen.error?.message || "Cloudinary no pudo subir la imagen.");

      setFormulario((actual) => ({
        ...actual,
        imagenUrl: imagen.secure_url,
        imagenPublicId: imagen.public_id,
      }));
      setMensaje("Imagen subida correctamente a Cloudinary.");
    } catch (err) {
      setError(err.message || "No se pudo subir la imagen.");
    } finally {
      setSubiendoImagen(false);
    }
  }

  function abrirNuevo() {
    setFormulario({ id: null, ...VACIO });
    setMensaje("");
  }

  function abrirEdicion(item) {
    setFormulario({ ...item });
    setMensaje("");
  }

  function cambiarCampo(campo, valor) {
    setFormulario((actual) => ({ ...actual, [campo]: valor }));
  }

  async function guardar(evento) {
    evento.preventDefault();
    setGuardando(true);
    setError("");
    setMensaje("");

    const payload = { ...formulario };
    delete payload.id;
    if (modulo === "recetas") {
      for (const campo of ["ingredientes", "preparacion"]) {
        if (typeof payload[campo] === "string") {
          payload[campo] = payload[campo].split("\n").map((linea) => linea.trim()).filter(Boolean);
        }
      }
      if (payload.porciones === "" || payload.porciones == null) delete payload.porciones;
      else payload.porciones = Number(payload.porciones);
    }

    try {
      const editando = Boolean(formulario.id);
      const respuesta = await fetch(
        editando
          ? `/api/admin/contenido/${modulo}/${formulario.id}`
          : `/api/admin/contenido/${modulo}`,
        {
          method: editando ? "PATCH" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        },
      );
      const datos = await respuesta.json();
      if (!respuesta.ok) throw new Error(datos.error || "No se pudo guardar.");
      setFormulario(null);
      setMensaje(datos.message || "Cambios guardados.");
      await cargar();
    } catch (err) {
      setError(err.message || "Error al guardar.");
    } finally {
      setGuardando(false);
    }
  }

  async function eliminar(item) {
    if (!window.confirm(`¿Seguro que deseas eliminar "${item.nombre || item.titulo}"?`)) return;
    setError("");
    setMensaje("");
    try {
      const respuesta = await fetch(`/api/admin/contenido/${modulo}/${item.id}`, { method: "DELETE" });
      const datos = await respuesta.json();
      if (!respuesta.ok) throw new Error(datos.error || "No se pudo eliminar.");
      setMensaje(datos.message || "Contenido eliminado.");
      await cargar();
    } catch (err) {
      setError(err.message || "Error al eliminar.");
    }
  }

  async function alternarPublicacion(item) {
    try {
      const respuesta = await fetch(`/api/admin/contenido/${modulo}/${item.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ publicado: !item.publicado }),
      });
      const datos = await respuesta.json();
      if (!respuesta.ok) throw new Error(datos.error || "No se pudo cambiar la publicación.");
      await cargar();
    } catch (err) {
      setError(err.message || "Error al actualizar.");
    }
  }

  return (
    <main className={styles.pagina}>
      <div className={styles.contenedorAdmin}>
        <header className={styles.encabezadoAdmin}>
          <div>
            <span className={styles.etiqueta}>Administración · Celendín</span>
            <h1>Bienvenido, {admin.nombre}</h1>
            <p>Gestiona la información que se muestra en el sitio turístico.</p>
          </div>
          <BotonSalir />
        </header>

        <section className={styles.resumenAdmin}>
          <div><span>Módulo actual</span><strong>{config.titulo}</strong></div>
          <div><span>Registros encontrados</span><strong>{registros.length}</strong></div>
          <div><span>Publicados</span><strong>{totalPublicados}</strong></div>
        </section>

        <nav className={styles.modulosAdmin} aria-label="Módulos de contenido">
          {Object.entries(MODULOS).map(([key, item]) => (
            <button key={key} type="button" className={modulo === key ? styles.moduloActivo : ""} onClick={() => { setModulo(key); setFormulario(null); setMensaje(""); setError(""); }}>
              {item.titulo}
            </button>
          ))}
        </nav>

        <section className={styles.gestionAdmin}>
          <div className={styles.gestionCabecera}>
            <div><h2>{config.titulo}</h2><p>Agrega, modifica o controla la publicación del contenido.</p></div>
            <button type="button" className={styles.botonPrimario} onClick={abrirNuevo}>+ Nuevo registro</button>
          </div>

          <input className={styles.busquedaAdmin} value={busqueda} onChange={(e) => setBusqueda(e.target.value)} placeholder={`Buscar en ${config.titulo.toLowerCase()}...`} />

          {mensaje && <p className={styles.mensajeAdmin}>{mensaje}</p>}
          {error && <p className={styles.errorAdmin}>{error}</p>}

          {formulario && (
            <form className={styles.formAdmin} onSubmit={guardar}>
              <div className={styles.gestionCabecera}>
                <h3>{formulario.id ? "Editar contenido" : `Agregar ${config.singular}`}</h3>
                <button type="button" className={styles.botonCerrar} onClick={() => setFormulario(null)}>Cerrar</button>
              </div>
              <div className={styles.camposAdmin}>
                {config.campos.map(([campo, etiqueta, tipo, requerido]) => {
                  const valor = campo === "ingredientes" || campo === "preparacion"
                    ? Array.isArray(formulario[campo]) ? formulario[campo].join("\n") : formulario[campo] || ""
                    : formulario[campo] ?? "";
                  return (
                    <label key={campo} className={tipo === "textarea" || tipo === "list" ? styles.campoCompleto : ""}>
                      <span>{etiqueta}{requerido ? " *" : ""}</span>
                      {tipo === "textarea" || tipo === "list" ? (
                        <textarea required={Boolean(requerido)} rows={tipo === "list" ? 4 : 5} value={valor} onChange={(e) => cambiarCampo(campo, e.target.value)} />
                      ) : (
                        <input required={Boolean(requerido)} type={tipo} min={tipo === "number" ? "1" : undefined} value={valor} onChange={(e) => cambiarCampo(campo, e.target.value)} />
                      )}
                    </label>
                  );
                })}
              </div>
              <div className={styles.subidaImagenAdmin}>
                <label>
                  <span>Subir imagen a Cloudinary</span>
                  <input type="file" accept="image/*" disabled={subiendoImagen} onChange={(e) => subirImagen(e.target.files?.[0])} />
                </label>
                <small>{subiendoImagen ? "Subiendo imagen..." : "Formatos de imagen admitidos. Tamaño máximo: 8 MB."}</small>
                {formulario.imagenUrl && <div className={styles.previsualizacionImagen}>
                  <img src={formulario.imagenUrl} alt="Vista previa del contenido" />
                  <button type="button" onClick={() => setFormulario((actual) => ({ ...actual, imagenUrl: "", imagenPublicId: "" }))}>Quitar imagen</button>
                </div>}
              </div>
              <label className={styles.checkPublicar}><input type="checkbox" checked={Boolean(formulario.publicado)} onChange={(e) => cambiarCampo("publicado", e.target.checked)} /> Publicar en el sitio web</label>
              <button className={styles.botonPrimario} type="submit" disabled={guardando}>{guardando ? "Guardando..." : "Guardar contenido"}</button>
            </form>
          )}

          {cargando ? <p className={styles.estadoAdmin}>Cargando registros...</p> : registros.length === 0 ? (
            <p className={styles.estadoAdmin}>Todavía no hay registros en este módulo. Puedes agregar el primero.</p>
          ) : (
            <div className={styles.tablaContenedor}>
              <table className={styles.tablaAdmin}>
                <thead><tr><th>Contenido</th><th>Estado</th><th>Actualizado</th><th>Acciones</th></tr></thead>
                <tbody>
                  {registros.map((item) => (
                    <tr key={item.id}>
                      <td><strong>{item.nombre || item.titulo}</strong><small>{item.slug}</small></td>
                      <td><span className={item.publicado ? styles.estadoPublicado : styles.estadoBorrador}>{item.publicado ? "Publicado" : "Borrador"}</span></td>
                      <td>{new Date(item.updatedAt).toLocaleDateString("es-PE")}</td>
                      <td><div className={styles.accionesAdmin}>
                        <button type="button" onClick={() => abrirEdicion(item)}>Editar</button>
                        <button type="button" onClick={() => alternarPublicacion(item)}>{item.publicado ? "Ocultar" : "Publicar"}</button>
                        <button type="button" className={styles.botonEliminar} onClick={() => eliminar(item)}>Eliminar</button>
                      </div></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
