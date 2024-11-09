// src/Components/financeiro/PlanejamentoOrcamentario.jsx

import React, { useState } from 'react';

const PlanejamentoOrcamentario = () => {
  const [orcamento, setOrcamento] = useState({ categoria: '', limite: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica de planejamento orçamentário
  };

  return (
    <div>
      <h3>Planejamento Orçamentário</h3>
      <form onSubmit={handleSubmit}>
        <select onChange={(e) => setOrcamento({ ...orcamento, categoria: e.target.value })}>
          <option value="servico">Serviço</option>
          <option value="comissao">Comissão</option>
          <option value="venda">Venda</option>
          <option value="despesas_operacionais">Despesas Operacionais</option>
        </select>
        <input type="number" placeholder="Limite" onChange={(e) => setOrcamento({ ...orcamento, limite: e.target.value })} />
        <button type="submit">Definir Limite</button>
      </form>
    </div>
  );
};

export default PlanejamentoOrcamentario;
