import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const isAuthenticated = () => {
    return localStorage.getItem('authToken') !== null; // Verifica se o token está presente
  };

  // Se o usuário não estiver logado, não exibe a Navbar
  if (!isAuthenticated()) {
    return null; // Não renderiza a Navbar se não estiver autenticado
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
      <div className="container-fluid justify-content-center">
        <Link className="navbar-brand" to="/">
          <img 
            src="/src/assets/logo-Photoroom.png"
            alt="Logo"
            style={{ width: '50px'}}
          />
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link nav-custom" to="/">Dashboard</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link nav-custom" to="/financeiro">Financeiro</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link nav-custom" to="/clientes">Clientes</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link nav-custom" to="/noticias">Notícias</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
