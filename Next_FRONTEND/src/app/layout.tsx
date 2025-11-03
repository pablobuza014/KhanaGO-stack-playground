// src/app/layout.tsx

import "./global.css";

export const metadata = {
  title: "KhanaGo",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
      </head>
      <body className="min-h-screen bg-white text-slate-900">{children}</body>
    </html>
  );
}
