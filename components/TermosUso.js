"use client"

import { useState } from 'react';
import jsPDF from 'jspdf';

export const textoTermos = {
  titulo: "Termos de Uso e Política de Privacidade - SIGAP",
  subtitulo: "Sistema Integrado de Gestão e Acompanhamento Patrimonial",
  sobre: `O SIGAP (Sistema Integrado de Gestão e Acompanhamento Patrimonial) é uma aplicação web desenvolvida para gerenciar e controlar o patrimônio apreendido ou custodiado por órgãos públicos ou empresas privadas. O sistema oferece funcionalidades abrangentes para o registro, acompanhamento, controle e geração de relatórios estatísticos sobre bens patrimoniais sob custódia institucional.`,
  
  finalidade: `A aplicação tem como finalidade principal otimizar e digitalizar os processos de gestão patrimonial, garantindo maior transparência, eficiência e segurança no tratamento das informações relacionadas aos bens sob custódia institucional.`,
  
  responsabilidadeContratual: `Os Termos de Uso aqui apresentados são estritamente direcionados ao contrato estabelecido entre a empresa fornecedora do SIGAP e a instituição contratante (Empresa ou Órgão Público). A responsabilidade pelo uso adequado do sistema e pelo cumprimento destes termos recai primariamente sobre a instituição contratante, que responde indiretamente pelos usuários por ela cadastrados e autorizados.`,
  
  responsabilidadeUsuario: `O usuário do sistema é pessoalmente responsável por:
1. Manter o sigilo e a segurança de suas credenciais de acesso (login e senha);
2. Utilizar o sistema exclusivamente para as finalidades previstas em suas atribuições profissionais;
3. Garantir a veracidade e precisão das informações inseridas no sistema;
4. Reportar imediatamente qualquer suspeita de uso indevido de sua conta;
5. Observar as políticas internas da instituição quanto ao uso do sistema.`,
  
  politicaPrivacidade: `Política de Privacidade e Proteção de Dados:
1. Coleta de Dados: O sistema coleta e armazena apenas dados estritamente necessários para sua operação;
2. Finalidade: Os dados são utilizados exclusivamente para as funções do sistema e geração de relatórios institucionais;
3. Segurança: Implementamos medidas técnicas e organizacionais para proteger os dados contra acesso não autorizado;
4. Retenção: Os dados são mantidos pelo período necessário para cumprimento das finalidades legais e contratuais;
5. Compartilhamento: As informações podem ser compartilhadas apenas mediante autorização expressa da instituição contratante ou por determinação legal.`,
  
  responsabilidadeInstitucional: `A instituição contratante é responsável por:
1. Definir e gerenciar os níveis de acesso dos usuários;
2. Garantir o uso adequado do sistema por seus colaboradores;
3. Manter atualizados os registros de usuários autorizados;
4. Notificar imediatamente sobre qualquer violação de segurança;
5. Assegurar a conformidade com as legislações aplicáveis.`,
  
  consequencias: `O descumprimento destes termos pode resultar em:
1. Suspensão ou cancelamento do acesso ao sistema;
2. Responsabilização administrativa, civil e/ou criminal do usuário;
3. Aplicação de penalidades previstas no contrato com a instituição;
4. Outras medidas legais cabíveis.`,
  
  atualizacoes: `Estes termos podem ser atualizados periodicamente, sendo responsabilidade da instituição contratante e dos usuários manterem-se informados sobre eventuais alterações.`,
  
  disposicoesFinais: `A aceitação destes termos é condição indispensável para o uso do sistema. Ao utilizar o SIGAP, o usuário e a instituição contratante declaram estar cientes e de acordo com todas as condições aqui estabelecidas.`
};

export function gerarPDFTermos() {
  const pdf = new jsPDF();
  const margemEsquerda = 20;
  const larguraMaxima = pdf.internal.pageSize.width - 40;
  let posicaoY = 20;

  // Função auxiliar para adicionar texto com quebra de linha
  const adicionarTextoComQuebra = (texto, tamanhoFonte = 12, espacamento = 7) => {
    pdf.setFontSize(tamanhoFonte);
    const linhas = pdf.splitTextToSize(texto, larguraMaxima);
    pdf.text(linhas, margemEsquerda, posicaoY);
    posicaoY += linhas.length * espacamento;
    posicaoY += 5; // Espaço extra entre seções
  };

  // Título
  pdf.setFontSize(16);
  pdf.setFont(undefined, 'bold');
  adicionarTextoComQuebra(textoTermos.titulo, 16, 10);

  // Subtítulo
  pdf.setFontSize(14);
  adicionarTextoComQuebra(textoTermos.subtitulo, 14, 8);
  posicaoY += 5;

  // Conteúdo
  pdf.setFont(undefined, 'normal');
  pdf.setFontSize(12);

  const secoes = [
    { titulo: 'Sobre o SIGAP', conteudo: textoTermos.sobre },
    { titulo: 'Finalidade', conteudo: textoTermos.finalidade },
    { titulo: 'Responsabilidade Contratual', conteudo: textoTermos.responsabilidadeContratual },
    { titulo: 'Responsabilidade do Usuário', conteudo: textoTermos.responsabilidadeUsuario },
    { titulo: 'Política de Privacidade e Proteção de Dados', conteudo: textoTermos.politicaPrivacidade },
    { titulo: 'Responsabilidade Institucional', conteudo: textoTermos.responsabilidadeInstitucional },
    { titulo: 'Consequências do Descumprimento', conteudo: textoTermos.consequencias },
    { titulo: 'Atualizações', conteudo: textoTermos.atualizacoes },
    { titulo: 'Disposições Finais', conteudo: textoTermos.disposicoesFinais }
  ];

  secoes.forEach(secao => {
    // Verifica se precisa de nova página
    if (posicaoY > pdf.internal.pageSize.height - 40) {
      pdf.addPage();
      posicaoY = 20;
    }

    // Título da seção
    pdf.setFont(undefined, 'bold');
    adicionarTextoComQuebra(secao.titulo, 12, 7);
    
    // Conteúdo da seção
    pdf.setFont(undefined, 'normal');
    adicionarTextoComQuebra(secao.conteudo, 12, 7);
  });

  // Adiciona data de geração
  pdf.setFontSize(10);
  pdf.setTextColor(100);
  pdf.text(`Documento gerado em: ${new Date().toLocaleString()}`, margemEsquerda, pdf.internal.pageSize.height - 20);

  return pdf;
}

export default function TermosUso() {
  const [downloading, setDownloading] = useState(false);

  const handleDownload = async () => {
    try {
      setDownloading(true);
      const pdf = gerarPDFTermos();
      pdf.save('termos-uso-sigap.pdf');
    } catch (error) {
      console.error('Erro ao gerar PDF:', error);
      alert('Erro ao gerar o PDF. Por favor, tente novamente.');
    } finally {
      setDownloading(false);
    }
  };

  return (
    <button
      onClick={handleDownload}
      disabled={downloading}
      className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-xs py-1 px-2 rounded transition-colors"
    >
      {downloading ? 'Baixando...' : 'Baixar Termos de Uso'}
    </button>
  );
} 