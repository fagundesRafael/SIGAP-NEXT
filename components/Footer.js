// components/Footer.js
export default function Footer() {
  return (
    <footer className="flex flex-col items-center gap-2 rounded-md w-full text-white bg-c_deep_black p-4 m-1 text-center  border border-gray-500 shadow">
      <img className="w-4 animate-glow" src="/sigap_padlock.png" alt="" />
      <img className="w-16 animate-glow" src="/sigap.png" alt="footer-logo" />
      <p className="text-[10px]">
        SISTEMA INTEGRADO DE GESTÃO DE APREENSÕES POLICIAIS
      </p>
      <div className="text-xs text-c_logo_red">
      <p>Todos os direitos reservados</p>
      <p>created by: fagundesrafael</p>
      </div>
    </footer>
  );
}
