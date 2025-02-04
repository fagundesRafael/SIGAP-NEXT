// app/layout.js
import './globals.css';
import ClientWrapper from "../components/ClientWrapper"; // Componente client para lógica de exibição

export const metadata = {
  title: 'SIGAP',
  description: 'Aplicação SIGAP',
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body className="flex flex-col min-h-screen">
        <ClientWrapper>
          {children}
        </ClientWrapper>
      </body>
    </html>
  );
}
