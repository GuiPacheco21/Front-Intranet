import React from 'react';
import { Link } from 'react-router-dom';
import { FaMoneyBillWave, FaRegFileAlt, FaChartLine, FaTags, FaCalendarAlt, FaTasks } from 'react-icons/fa'; // Importando ícones do react-icons
import './Financeiro.css'; // CSS para o financeiro


const Financeiro = () => {
  return (
    <div className="financeiro-container">
            
      <div className="card-container">
        <div className="card">
          <div className="card-body">
            <div className="icon"><FaMoneyBillWave /></div>
            <h5 className="card-title">Cadastro de Entrada</h5>
            <p className="card-text">Registre suas entradas de forma rápida e fácil.</p>
            <Link to="/financeiro/cadastro-entrada" className="btn btn-primary">Acessar</Link>
          </div>
        </div>
        
        <div className="card">
          <div className="card-body">
            <div className="icon"><FaRegFileAlt /></div>
            <h5 className="card-title">Cadastro de Saída</h5>
            <p className="card-text">Controle suas despesas com eficiência.</p>
            <Link to="/financeiro/cadastro-saida" className="btn btn-primary">Acessar</Link>
          </div>
        </div>

        <div className="card">
          <div className="card-body">
            <div className="icon"><FaTags /></div>
            <h5 className="card-title">Categorias Personalizadas</h5>
            <p className="card-text">Organize suas finanças em categorias.</p>
            <Link to="/financeiro/categorias" className="btn btn-primary">Acessar</Link>
          </div>
        </div>

        <div className="card">
          <div className="card-body">
            <div className="icon"><FaChartLine /></div>
            <h5 className="card-title">Planejamento Orçamentário</h5>
            <p className="card-text">Planeje suas finanças e alcance seus objetivos.</p>
            <Link to="/financeiro/planejamento" className="btn btn-primary">Acessar</Link>
          </div>
        </div>

        <div className="card">
          <div className="card-body">
            <div className="icon"><FaCalendarAlt /></div>
            <h5 className="card-title">Relatórios Financeiros</h5>
            <p className="card-text">Gere relatórios detalhados sobre suas finanças.</p>
            <Link to="/financeiro/relatorios" className="btn btn-primary">Acessar</Link>
          </div>
        </div>

        <div className="card">
          <div className="card-body">
            <div className="icon"><FaTasks /></div>
            <h5 className="card-title">Transações Recorrentes</h5>
            <p className="card-text">Gerencie suas transações que ocorrem regularmente.</p>
            <Link to="/financeiro/transacoes-recorrentes" className="btn btn-primary">Acessar</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Financeiro;
