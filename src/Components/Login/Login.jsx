import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaLock } from 'react-icons/fa';
import styles from './Login.module.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Hook do React Router para navegação

  // Verifica se o token já está presente e redireciona para /dashboard se necessário
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      navigate('/dashboard');  // Redireciona se já estiver autenticado
    }
  }, [navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    try {
      const response = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: username, senha: password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Erro ao fazer login');
      }

      // Salvando o token no localStorage
      localStorage.setItem('authToken', data.token);
      console.log("Token salvo no localStorage:", data.token); // Para depuração

      // Após salvar o token, redireciona para a página dashboard
      navigate('/dashboard'); // Redireciona para /dashboard após o login

    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className={styles.loginPage}>
      <div className={styles.container}>
        <form onSubmit={handleSubmit}>
          <h1>Acesse o sistema</h1>
          {error && <div className="error">{error}</div>}
          <div className={styles['input-field']}>
            <input
              type="email"
              placeholder="E-mail"
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <FaUser className={styles.icon} />
          </div>
          <div className={styles['input-field']}>
            <input
              type="password"
              placeholder="Senha"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <FaLock className={styles.icon} />
          </div>
          <button type="submit">Entrar</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
