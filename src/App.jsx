import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './Components/Dashboard';
import Financeiro from './Components/Financeiro/Financeiro';
import CadastroEntrada from './Components/Financeiro/CadastroEntrada';
import CadastroSaida from './Components/Financeiro/CadastroSaida';
import Relatorios from './Components/Financeiro/Relatorios';
import TransacoesRecorrentes from './Components/Financeiro/TransacoesRecorrentes';
import PlanejamentoOrcamentario from './Components/Financeiro/PlanejamentoOrcamentario';
import CategoriasPersonalizadas from './Components/Financeiro/CategoriasPersonalizadas';
import Clientes from './Components/Clientes';
import Noticias from './Components/Noticias';
import Login from './Components/Login/Login';
import PrivateRoute from './Components/PrivateRoute'; // Importando a PrivateRoute
import Navbar from './Components/Navbar';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Verifica se o token está presente ao carregar o App
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []); // Verifica uma vez ao montar o componente

  return (
    <Router>
      {/* A Navbar deve ser renderizada apenas quando o usuário estiver autenticado */}
      {isAuthenticated && <Navbar />}
      
      <Routes>
        {/* Rota pública para login */}
        <Route path="/login" element={<Login />} />

        {/* Rota principal para o Dashboard (protegida pela PrivateRoute) */}
        <Route path="/dashboard" element={<PrivateRoute element={Dashboard} />} />

        {/* Outras rotas privadas */}
        <Route path="/financeiro" element={<PrivateRoute element={Financeiro} />} />
        <Route path="/financeiro/cadastro-entrada" element={<PrivateRoute element={CadastroEntrada} />} />
        <Route path="/financeiro/cadastro-saida" element={<PrivateRoute element={CadastroSaida} />} />
        <Route path="/financeiro/relatorios" element={<PrivateRoute element={Relatorios} />} />
        <Route path="/financeiro/transacoes-recorrentes" element={<PrivateRoute element={TransacoesRecorrentes} />} />
        <Route path="/financeiro/planejamento-orcamentario" element={<PrivateRoute element={PlanejamentoOrcamentario} />} />
        <Route path="/financeiro/categorias" element={<PrivateRoute element={CategoriasPersonalizadas} />} />
        <Route path="/clientes" element={<PrivateRoute element={Clientes} />} />
        <Route path="/noticias" element={<PrivateRoute element={Noticias} />} />

        {/* Redireciona para o login se a rota não for encontrada */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
