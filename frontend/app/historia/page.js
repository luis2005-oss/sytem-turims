import Hero from "./components/Hero";
import SeccionTextoImagen from "./components/SeccionTextoImagen";
import Timeline from "./components/TimeLine";
import Cultura from "./components/Cultura";

export default function Historia() {
  return (
    <>
      <Hero
        src="/images/portadas/portadahistoria.jpg"
        alt="Tierra del Sombrero y del Cielo Azul"
        titulo="Tierra del Sombrero y"
        subtitulo="del Cielo Azul"
      />

      <SeccionTextoImagen
        titulo="Los Orígenes de Celendín"
        parrafos={[
          "Durante la colonia, lo que hoy es la ciudad no existía como tal; era una enorme llanura llamada la Hacienda Pampa del Estero, de propiedad de la orden religiosa de los Jesuitas. Tras la expulsión de esta orden en 1767, las tierras pasaron a manos de la Corona española y luego a propietarios particulares. Para finales del siglo XVIII, la zona empezó a poblarse de familias españolas, criollas y un importante contingente de descendientes de judíos conversos (sefardíes) y portugueses que buscaban refugio en zonas apartadas de la sierra para escapar del control estricto de la Santa Inquisición de Lima.",
        ]}
        imagen={{
          src: "/images/historia/celendin-historia.jpg",
          alt: "Celendín antiguo",
          width: 600,
          height: 450,
        }}
      />

      <SeccionTextoImagen
        titulo="Fundación de la ciudad"
        parrafos={[
          "El verdadero nacimiento de Celendín ocurre gracias a la unión de sus pobladores y a la guía de un personaje clave: el obispo de Trujillo, Baltasar Jaime Martínez Compañón. 1780s El obispo Martínez Compañón visita la zona, ve el potencial del valle y diseña los primeros planos de una ciudad perfectamente simétrica, al estilo damero (como un tablero de ajedrez).",
          "1796: Los pobladores locales, liderados por el capitán Juan de Dios Burga, se organizan y logran comprar la Hacienda Pampa del Estero por 11,000 pesos para fundar formalmente su propia villa. 1802: El 19 de diciembre de 1802, el Rey Carlos IV de España firma la Real Cédula que aprueba oficialmente la fundación de la villa bajo el nombre de Amalia de Celendín.",
        ]}
        imagen={{
          src: "/images/historia/images.jpg",
          alt: "Fundación de Celendín",
          width: 600,
          height: 450,
        }}
        reverse
        fondoGris
      />

      <Timeline />
      <Cultura />
    </>
  );
}
