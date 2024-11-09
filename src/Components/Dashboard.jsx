import React from 'react';
import { Line, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, registerables } from 'chart.js';
import './Dashboard.css';

ChartJS.register(...registerables);

function Dashboard() {
  const chamadosData = {
    labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho'],
    datasets: [
      {
        label: 'Chamados Resolvidos',
        data: [50, 45, 60, 70, 80, 90],
        backgroundColor: 'rgba(75, 192, 192, 0.7)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 2,
      },
      {
        label: 'Chamados Abertos',
        data: [60, 50, 70, 65, 90, 95],
        backgroundColor: 'rgba(255, 99, 132, 0.7)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 2,
      },
    ],
  };

  const tempoChamadosData = {
    labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho'],
    datasets: [
      {
        label: 'Tempo Médio por Chamado (minutos)',
        data: [30, 25, 35, 20, 40, 30],
        backgroundColor: 'rgba(54, 162, 235, 0.7)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 2,
      },
    ],
  };

  return (
    <div className="container-fluid dashboard-container">
      <h1 className="dashboard-header">Painel de Controle</h1>
      <div className="row">
        {/* Resumo Financeiro */}
        <div className="col-lg-4 col-md-6 mb-4">
          <div className="card dashboard-card">
            <div className="card-header">Faturamento do Mês</div>
            <div className="card-body">
              <h5 className="card-title">R$ 50.000</h5>
              <p className="card-text">Total faturado no mês atual.</p>
            </div>
          </div>
        </div>

        <div className="col-lg-4 col-md-6 mb-4">
          <div className="card dashboard-card">
            <div className="card-header">Despesas</div>
            <div className="card-body">
              <h5 className="card-title">R$ 10.000</h5>
              <p className="card-text">Total de despesas no mês atual.</p>
            </div>
          </div>
        </div>

        <div className="col-lg-4 col-md-6 mb-4">
          <div className="card dashboard-card">
            <div className="card-header">Saldo Atual</div>
            <div className="card-body">
              <h5 className="card-title">R$ 40.000</h5>
              <p className="card-text">Saldo líquido no momento.</p>
            </div>
          </div>
        </div>

        {/* Clientes */}
        <div className="col-lg-6 col-md-6 mb-4">
          <div className="card dashboard-card">
            <div className="card-header">Total de Clientes</div>
            <div className="card-body">
              <h5 className="card-title">150</h5>
              <p className="card-text">Número total de clientes cadastrados.</p>
            </div>
          </div>
        </div>

        <div className="col-lg-6 col-md-6 mb-4">
          <div className="card dashboard-card">
            <div className="card-header">Clientes Ativos</div>
            <div className="card-body">
              <h5 className="card-title">120</h5>
              <p className="card-text">Número de clientes ativos.</p>
            </div>
          </div>
        </div>

        {/* Projetos */}
        <div className="col-lg-4 col-md-6 mb-4">
          <div className="card dashboard-card">
            <div className="card-header">Projetos em Andamento</div>
            <div className="card-body">
              <h5 className="card-title">5</h5>
              <p className="card-text">Número de projetos em andamento.</p>
            </div>
          </div>
        </div>

        <div className="col-lg-4 col-md-6 mb-4">
          <div className="card dashboard-card">
            <div className="card-header">Projetos Concluídos</div>
            <div className="card-body">
              <h5 className="card-title">10</h5>
              <p className="card-text">Número total de projetos finalizados.</p>
            </div>
          </div>
        </div>

        {/* Notícias */}
        <div className="col-lg-4 col-md-6 mb-4">
          <div className="card dashboard-card">
            <div className="card-header">Últimas Notícias de Tecnologia</div>
            <div className="card-body">
              <ul className="list-unstyled">
                <li>- Nova versão do React lançada</li>
                <li>- Wi-Fi 7: O que esperar da nova geração</li>
                <li>- Tendências em automação para 2024</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Gráficos */}
      <div className="row mt-4">
        {/* Gráfico de Chamados Abertos x Resolvidos */}
        <div className="col-lg-6 col-md-12 mb-4">
          <div className="card dashboard-card">
            <div className="card-header">Chamados por Mês</div>
            <div className="card-body">
              <Line data={chamadosData} />
            </div>
          </div>
        </div>

        {/* Gráfico de Tempo Médio por Chamado */}
        <div className="col-lg-6 col-md-12 mb-4">
          <div className="card dashboard-card">
            <div className="card-header">Tempo Médio por Chamado</div>
            <div className="card-body">
              <Bar data={tempoChamadosData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
