// src/Components/financeiro/TransacoesRecorrentes.jsx

import React, { useState } from 'react';

const TransacoesRecorrentes = () => {
  const [transacao, setTransacao] = useState({ descricao: '', valor: '', dataRecorrente: '', tipo: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica para salvar transações recorrentes
  };

  return (
    <div>
      <h3>Transações Recorrentes</h3>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Descrição" onChange={(e) => setTransacao({ ...transacao, descricao: e.target.value })} />
        <input type="number" placeholder="Valor" onChange={(e) => setTransacao({ ...transacao, valor: e.target.value })} />
        <input type="date" onChange={(e) => setTransacao({ ...transacao, dataRecorrente: e.target.value })} />
        <select onChange={(e) => setTransacao({ ...transacao, tipo: e.target.value })}>
          <option value="entrada">Entrada</option>
          <option value="saida">Saída</option>
        </select>
        <button type="submit">Salvar</button>
      </form>
    </div>
  );
};

export default TransacoesRecorrentes;
