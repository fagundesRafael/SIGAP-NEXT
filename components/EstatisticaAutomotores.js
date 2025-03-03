"use client"

import { useState, useEffect, useRef } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Pie, Bar, Line } from 'react-chartjs-2';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { FaFilePdf } from 'react-icons/fa';

// Registrando os componentes do Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

export default function EstatisticaAutomotores() {
  const [veiculos, setVeiculos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [gerando, setGerando] = useState(false);

  // Refs para os gráficos para captura de PDF
  const estatisticasRef = useRef(null);

  // Dados processados para os gráficos
  const [totalApreendidosPatioCount, setTotalApreendidosPatioCount] = useState(0);
  const [statusData, setStatusData] = useState({ labels: [], data: [] });
  const [tiposData, setTiposData] = useState({ labels: [], data: [] });
  const [marcasModelosData, setMarcasModelosData] = useState({ labels: [], datasets: [] });
  const [cronologiaData, setCronologiaData] = useState({ labels: [], data: [] });

  useEffect(() => {
    async function fetchVeiculos() {
      try {
        setLoading(true);
        const res = await fetch('/api/automotores?limit=1000');
        if (!res.ok) {
          throw new Error('Falha ao buscar dados de automotores');
        }
        const data = await res.json();
        setVeiculos(data.veiculos || []);
      } catch (err) {
        console.error('Erro ao buscar veículos:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchVeiculos();
  }, []);

  useEffect(() => {
    if (veiculos.length > 0) {
      processarDados();
    }
  }, [veiculos]);

  const processarDados = () => {
    // 1. Total de automotores apreendidos no pátio
    const apreendidosNoPatio = veiculos.filter(v =>
      v.classe === 'automotor' &&
      v.status === 'apreendido' &&
      v.destino === 'pátio'
    );
    setTotalApreendidosPatioCount(apreendidosNoPatio.length);

    // 2. Gráfico de pizza por status
    const statusCount = {};
    veiculos.forEach(v => {
      if (v.classe === 'automotor') {
        statusCount[v.status] = (statusCount[v.status] || 0) + 1;
      }
    });
    setStatusData({
      labels: Object.keys(statusCount),
      data: Object.values(statusCount)
    });

    // 3. Gráfico de pizza por tipo/customTipo
    const tiposCount = {};
    veiculos.forEach(v => {
      if (v.classe === 'automotor') {
        const tipo = v.customTipo || v.tipo;
        tiposCount[tipo] = (tiposCount[tipo] || 0) + 1;
      }
    });
    setTiposData({
      labels: Object.keys(tiposCount),
      data: Object.values(tiposCount)
    });

    // 4. Gráfico de barras por marca/modelo
    const marcasModelos = {};
    veiculos.forEach(v => {
      if (v.classe === 'automotor' && v.marca) {
        if (!marcasModelos[v.marca]) {
          marcasModelos[v.marca] = {};
        }
        const modelo = v.modelo || 'Não especificado';
        marcasModelos[v.marca][modelo] = (marcasModelos[v.marca][modelo] || 0) + 1;
      }
    });

    // Preparando dados para o gráfico de barras
    const marcas = Object.keys(marcasModelos);
    const datasets = [];

    // Cores para os diferentes modelos
    const coresPadrao = [
      'rgba(255, 99, 132, 0.7)',
      'rgba(54, 162, 235, 0.7)',
      'rgba(255, 206, 86, 0.7)',
      'rgba(75, 192, 192, 0.7)',
      'rgba(153, 102, 255, 0.7)',
      'rgba(255, 159, 64, 0.7)',
      'rgba(199, 199, 199, 0.7)',
      'rgba(83, 102, 255, 0.7)',
      'rgba(40, 159, 64, 0.7)',
      'rgba(210, 199, 199, 0.7)',
    ];

    // Coletando todos os modelos únicos
    const todosModelos = new Set();
    Object.values(marcasModelos).forEach(modelos => {
      Object.keys(modelos).forEach(modelo => todosModelos.add(modelo));
    });

    // Criando um dataset para cada modelo
    Array.from(todosModelos).forEach((modelo, index) => {
      const data = marcas.map(marca => marcasModelos[marca][modelo] || 0);
      datasets.push({
        label: modelo,
        data,
        backgroundColor: coresPadrao[index % coresPadrao.length],
        borderColor: coresPadrao[index % coresPadrao.length].replace('0.7', '1'),
        borderWidth: 1,
      });
    });

    setMarcasModelosData({
      labels: marcas,
      datasets
    });

    // 5. Gráfico de linha para cronologia
    const dataRegistros = {};
    veiculos.forEach(v => {
      if (v.classe === 'automotor' && v.data) {
        const data = new Date(v.data).toLocaleDateString();
        dataRegistros[data] = (dataRegistros[data] || 0) + 1;
      }
    });

    // Ordenando as datas
    const datasOrdenadas = Object.keys(dataRegistros).sort((a, b) => new Date(a) - new Date(b));

    setCronologiaData({
      labels: datasOrdenadas,
      data: datasOrdenadas.map(data => dataRegistros[data])
    });
  };

  // Função para gerar o PDF
  const gerarPDF = async () => {
    if (!estatisticasRef.current) return;

    try {
      setGerando(true);

      // Captura o conteúdo do componente
      const canvas = await html2canvas(estatisticasRef.current, {
        scale: 1,
        useCORS: true,
        logging: false,
        backgroundColor: '#1d1d1b' // Cor de fundo igual ao bg-c_deep_black
      });

      const imgData = canvas.toDataURL('image/png');

      // Cria o PDF
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      // Adiciona título
      pdf.setTextColor(255, 255, 255);
      pdf.setFillColor(29, 29, 27); // Cor de fundo igual ao bg-c_deep_black
      pdf.rect(0, 0, pdfWidth, pdfHeight, 'F');
      pdf.setFontSize(18);
      pdf.text('Relatório de Estatísticas - Automotores', pdfWidth / 2, 15, { align: 'center' });

      // Adiciona a imagem dos gráficos
      const imgWidth = pdfWidth - 20;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      pdf.addImage(imgData, 'PNG', 10, 25, imgWidth, imgHeight);

      // Adiciona informações textuais
      const yPos = 25 + imgHeight + 10;
      pdf.setFontSize(14);
      pdf.text('Resumo das Estatísticas', pdfWidth / 2, yPos, { align: 'center' });

      pdf.setFontSize(12);
      let y = yPos + 10;

      // Total de automotores apreendidos no pátio
      pdf.text(`Total de automotores apreendidos no pátio: ${totalApreendidosPatioCount}`, 15, y);
      y += 8;

      // Distribuição por status
      pdf.text('Distribuição por Status:', 15, y);
      y += 6;
      statusData.labels.forEach((label, index) => {
        pdf.text(`- ${label}: ${statusData.data[index]}`, 20, y);
        y += 6;
      });
      y += 2;

      // Distribuição por tipo
      pdf.text('Distribuição por Tipo:', 15, y);
      y += 6;
      tiposData.labels.forEach((label, index) => {
        pdf.text(`- ${label}: ${tiposData.data[index]}`, 20, y);
        y += 6;
        // Se a lista for muito longa, adiciona uma nova página
        if (y > pdfHeight - 20 && index < tiposData.labels.length - 1) {
          pdf.addPage();
          pdf.setFillColor(29, 29, 27);
          pdf.rect(0, 0, pdfWidth, pdfHeight, 'F');
          y = 20;
        }
      });

      // Adiciona data de geração
      pdf.setFontSize(10);
      pdf.text(`Relatório gerado em: ${new Date().toLocaleString()}`, pdfWidth / 2, pdfHeight - 10, { align: 'center' });

      // Salva o PDF
      pdf.save('relatorio-automotores.pdf');
    } catch (err) {
      console.error('Erro ao gerar PDF:', err);
      alert('Erro ao gerar o PDF. Por favor, tente novamente.');
    } finally {
      setGerando(false);
    }
  };

  // Configurações dos gráficos
  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',
        labels: {
          color: 'white',
          font: {
            size: 12
          }
        }
      },
      title: {
        display: true,
        color: 'white',
        font: {
          size: 16
        }
      }
    }
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: 'white',
          font: {
            size: 12
          }
        }
      },
      title: {
        display: true,
        text: 'Distribuição por Marca e Modelo',
        color: 'white',
        font: {
          size: 16
        }
      }
    },
    scales: {
      x: {
        stacked: true,
        ticks: {
          color: 'white'
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        }
      },
      y: {
        stacked: true,
        ticks: {
          color: 'white'
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        }
      }
    }
  };

  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: 'white',
          font: {
            size: 12
          }
        }
      },
      title: {
        display: true,
        text: 'Cronologia de Registros',
        color: 'white',
        font: {
          size: 16
        }
      }
    },
    scales: {
      x: {
        ticks: {
          color: 'white'
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        }
      },
      y: {
        ticks: {
          color: 'white'
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        }
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen font-mono p-4 bg-c_deep_black text-white flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen font-mono p-4 bg-c_deep_black text-white">
        <h1 className="text-xl font-bold mb-4">Erro ao carregar estatísticas</h1>
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">Estatísticas de Automotores</h2>
        <button 
          onClick={gerarPDF} 
          disabled={gerando}
          className="flex text-xs items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white w-26 h-6 py-1 px-2 rounded-md transition-colors"
        >
          <FaFilePdf />
          {gerando ? 'Gerando PDF...' : 'Gerar Relatório PDF'}
        </button>
      </div>
      <div ref={estatisticasRef} className="space-y-6">
        <div className="flex flex-wrap justify-between border-b border-gray-700 pb-4">
          {/* Card principal*/}
          <div className="w-[30%] h-[60%] bg-c_deep_middle_black rounded-lg shadow-lg p-4 mb-2 border border-gray-700">
            <div className="flex flex-col h-full justify-center items-center">
              <h2 className="text-md font-semibold mb-1">Automotores Apreendidos no Pátio</h2>
              <div className="text-3xl font-bold text-blue-400">{totalApreendidosPatioCount}</div>
              <p className="mt-1 text-xs text-center text-gray-400">Total de veículos automotores com status "apreendido" e destino "pátio"</p>
            </div>
            
          </div>
          
          {/* Grid de gráficos */}
          {/* Gráfico de Pizza - Status */}
          <div className="w-[30%] h-[60%] bg-c_deep_middle_black rounded-lg shadow-lg p-4 mb-2 border border-gray-700">
            {statusData.labels.length > 0 && (
              <div className="h-[calc(100%-2rem)]">
                <Pie
                  data={{
                    labels: statusData.labels,
                    datasets: [
                      {
                        data: statusData.data,
                        backgroundColor: [
                          'rgba(255, 99, 132, 0.7)',
                          'rgba(54, 162, 235, 0.7)',
                          'rgba(255, 206, 86, 0.7)',
                          'rgba(75, 192, 192, 0.7)',
                        ],
                        borderColor: [
                          'rgba(255, 99, 132, 1)',
                          'rgba(54, 162, 235, 1)',
                          'rgba(255, 206, 86, 1)',
                          'rgba(75, 192, 192, 1)',
                        ],
                        borderWidth: 1,
                      },
                    ],
                  }}
                  options={{
                    ...pieOptions,
                    plugins: {
                      ...pieOptions.plugins,
                      title: {
                        ...pieOptions.plugins.title,
                        text: 'Distribuição por Status'
                      }
                    }
                  }}
                />
              </div>
            )}
          </div>

          {/* Gráfico de Pizza - Tipos */}
          <div className="w-[30%] h-[60%] bg-c_deep_middle_black rounded-lg shadow-lg p-4 mb-2 border border-gray-700">
            {tiposData.labels.length > 0 && (
              <div className="h-[calc(100%-2rem)]">
                <Pie
                  data={{
                    labels: tiposData.labels,
                    datasets: [
                      {
                        data: tiposData.data,
                        backgroundColor: [
                          'rgba(255, 99, 132, 0.7)',
                          'rgba(54, 162, 235, 0.7)',
                          'rgba(255, 206, 86, 0.7)',
                          'rgba(75, 192, 192, 0.7)',
                          'rgba(153, 102, 255, 0.7)',
                          'rgba(255, 159, 64, 0.7)',
                          'rgba(199, 199, 199, 0.7)',
                          'rgba(83, 102, 255, 0.7)',
                        ],
                        borderColor: [
                          'rgba(255, 99, 132, 1)',
                          'rgba(54, 162, 235, 1)',
                          'rgba(255, 206, 86, 1)',
                          'rgba(75, 192, 192, 1)',
                          'rgba(153, 102, 255, 1)',
                          'rgba(255, 159, 64, 1)',
                          'rgba(199, 199, 199, 1)',
                          'rgba(83, 102, 255, 1)',
                        ],
                        borderWidth: 1,
                      },
                    ],
                  }}
                  options={{
                    ...pieOptions,
                    plugins: {
                      ...pieOptions.plugins,
                      title: {
                        ...pieOptions.plugins.title,
                        text: 'Distribuição por Tipo'
                      }
                    }
                  }}
                />
              </div>
            )}
          </div>

          {/* Gráfico de Barras - Marcas e Modelos */}
          <div className="w-[30%] h-[60%] bg-c_deep_middle_black rounded-lg shadow-lg p-4 mb-2 border border-gray-700">
            {marcasModelosData.labels.length > 0 && (
              <div className="h-[calc(100%-2rem)]">
                <Bar
                  data={{
                    labels: marcasModelosData.labels,
                    datasets: marcasModelosData.datasets,
                  }}
                  options={barOptions}
                />
              </div>
            )}
          </div>

          {/* Gráfico de Linha - Cronologia */}
          <div className="w-[30%] h-[60%] bg-c_deep_middle_black rounded-lg shadow-lg p-4 mb-2 border border-gray-700">
            {cronologiaData.labels.length > 0 && (
              <div className="h-[calc(100%-2rem)]">
                <Line
                  data={{
                    labels: cronologiaData.labels,
                    datasets: [
                      {
                        label: 'Registros',
                        data: cronologiaData.data,
                        borderColor: 'rgba(75, 192, 192, 1)',
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        tension: 0.1,
                        fill: true,
                      },
                    ],
                  }}
                  options={lineOptions}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 