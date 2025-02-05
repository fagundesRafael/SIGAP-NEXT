// app/layout.js

import "./globals.css";

export const metadata = {
  title: "SIGAP",
  description: "Aplicação SIGAP",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body className="flex flex-col min-h-screen">
        <main className="flex-grow">{children}</main>
      </body>
    </html>
  );
}
