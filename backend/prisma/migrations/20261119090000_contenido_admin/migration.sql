-- CreateTable
CREATE TABLE "CentroTuristico" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "zona" TEXT,
    "ubicacion" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "imagenUrl" TEXT,
    "imagenPublicId" TEXT,
    "publicado" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CentroTuristico_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Receta" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "categoria" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "tiempoPreparacion" TEXT,
    "porciones" INTEGER,
    "ingredientes" JSONB NOT NULL DEFAULT '[]',
    "preparacion" JSONB NOT NULL DEFAULT '[]',
    "imagenUrl" TEXT,
    "imagenPublicId" TEXT,
    "publicado" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Receta_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Fiesta" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "fecha" TEXT,
    "lugar" TEXT,
    "descripcion" TEXT NOT NULL,
    "imagenUrl" TEXT,
    "imagenPublicId" TEXT,
    "publicado" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Fiesta_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Historia" (
    "id" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "categoria" TEXT,
    "resumen" TEXT,
    "contenido" TEXT NOT NULL,
    "imagenUrl" TEXT,
    "imagenPublicId" TEXT,
    "publicado" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Historia_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CentroTuristico_slug_key" ON "CentroTuristico"("slug");
CREATE INDEX "CentroTuristico_publicado_idx" ON "CentroTuristico"("publicado");
CREATE INDEX "CentroTuristico_nombre_idx" ON "CentroTuristico"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "Receta_slug_key" ON "Receta"("slug");
CREATE INDEX "Receta_publicado_idx" ON "Receta"("publicado");
CREATE INDEX "Receta_nombre_idx" ON "Receta"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "Fiesta_slug_key" ON "Fiesta"("slug");
CREATE INDEX "Fiesta_publicado_idx" ON "Fiesta"("publicado");
CREATE INDEX "Fiesta_nombre_idx" ON "Fiesta"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "Historia_slug_key" ON "Historia"("slug");
CREATE INDEX "Historia_publicado_idx" ON "Historia"("publicado");
CREATE INDEX "Historia_titulo_idx" ON "Historia"("titulo");
