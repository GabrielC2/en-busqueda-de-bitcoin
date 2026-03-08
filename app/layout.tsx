import './globals.css'

export const metadata = {
  title: 'En Búsqueda de Bitcoin — Juego Educativo',
  description: 'Aprende Bitcoin de forma divertida con cómics interactivos y juegos de búsqueda de objetos',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  )
}
