import React, { useState } from 'react';
import { FaUser, FaLock } from 'react-icons/fa';
import styles from './Login.module.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

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

      localStorage.setItem('authToken', data.token);
      // Redireciona o usuário após o login bem-sucedido
      window.location.href = '/dashboard'; // Exemplo de redirecionamento

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
