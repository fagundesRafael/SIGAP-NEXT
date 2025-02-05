// app/layout.js
import "./globals.css";
import ClientWrapper from "../components/ClientWrapper";
import AuthProvider from "../components/AuthProvider";

export const metadata = {
  title: "SIGAP",
  description: "Aplicação SIGAP",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body className="flex flex-col min-h-screen">
        <AuthProvider>
          <ClientWrapper>{children}</ClientWrapper>
        </AuthProvider>
      </body>
    </html>
  );
}
