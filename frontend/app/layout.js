import "./globals.css";
import Navbar from "./navbar/Navbar";

export const metadata = {
  title: {
    default: "Turismo Celendín",
    template: "%s | Turismo Celendín",
  },
  description:
    "Descubre la historia, cultura, gastronomía y lugares turísticos de Celendín.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}