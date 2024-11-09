import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CadastroSaida.css'; // Estilização específica para o Cadastro de Saída

const CadastroSaida = () => {
  const navigate = useNavigate();
  const [data, setData] = useState('');
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');
  const [categoria, setCategoria] = useState('');
  const [nomeFornecedor, setNomeFornecedor] = useState('');
  const [errors, setErrors] = useState({});
  const [saldo, setSaldo] = useState(0);

  const categorias = ["Compra", "Serviço", "Despesa", "Outros"];

  const validateForm = () => {
    const newErrors = {};
    if (!data) newErrors.data = "Data é obrigatória.";
    if (!descricao) newErrors.descricao = "Descrição é obrigatória.";
    if (!valor || valor <= 0) newErrors.valor = "Valor deve ser um número positivo.";
    if (!categoria) newErrors.categoria = "Categoria é obrigatória.";
    if (!nomeFornecedor) newErrors.nomeFornecedor = "Nome do fornecedor é obrigatório.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Retorna true se não houver erros
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      const valorNumerico = parseFloat(valor);
      setSaldo(prevSaldo => prevSaldo - valorNumerico); // Subtrai o valor do saldo
      // Aqui você pode adicionar a lógica para salvar a saída
      console.log({
        data,
        descricao,
        valor: valorNumerico,
        categoria,
        nomeFornecedor,
      }); // Exemplo de log para verificação
      navigate('/financeiro'); // Navega para a página do financeiro após salvar
    }
  };

  return (
    <div className="cadastro-saida-container">
      <h2>Cadastro de Saída</h2>
      <form onSubmit={handleSubmit} className="cadastro-saida-form">
        <div className="form-group">
          <label htmlFor="data">Data:</label>
          <input
            type="date"
            id="data"
            value={data}
            onChange={(e) => setData(e.target.value)}
            className={`form-control ${errors.data ? 'is-invalid' : ''}`}
            required
          />
          {errors.data && <div className="invalid-feedback">{errors.data}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="descricao">Descrição:</label>
          <input
            type="text"
            id="descricao"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            className={`form-control ${errors.descricao ? 'is-invalid' : ''}`}
            required
            placeholder="Digite uma descrição"
          />
          {errors.descricao && <div className="invalid-feedback">{errors.descricao}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="valor">Valor:</label>
          <input
            type="number"
            id="valor"
            value={valor}
            onChange={(e) => setValor(e.target.value)}
            className={`form-control ${errors.valor ? 'is-invalid' : ''}`}
            required
            min="0"
            step="0.01"
            placeholder="R$ 0,00"
          />
          {errors.valor && <div className="invalid-feedback">{errors.valor}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="categoria">Categoria:</label>
          <select
            id="categoria"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
            className={`form-control ${errors.categoria ? 'is-invalid' : ''}`}
            required
          >
            <option value="">Selecione uma categoria</option>
            {categorias.map((cat, index) => (
              <option key={index} value={cat}>{cat}</option>
            ))}
          </select>
          {errors.categoria && <div className="invalid-feedback">{errors.categoria}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="nomeFornecedor">Nome do Fornecedor:</label>
          <input
            type="text"
            id="nomeFornecedor"
            value={nomeFornecedor}
            onChange={(e) => setNomeFornecedor(e.target.value)}
            className={`form-control ${errors.nomeFornecedor ? 'is-invalid' : ''}`}
            required
            placeholder="Nome do fornecedor"
          />
          {errors.nomeFornecedor && <div className="invalid-feedback">{errors.nomeFornecedor}</div>}
        </div>

        <div className="button-group">
          <button type="submit" className="btn btn-primary">Salvar</button>
          <button type="button" className="btn btn-secondary" onClick={() => navigate('/financeiro')}>
            Cancelar
          </button>
        </div>
      </form>

      {/* Exibição do saldo atualizado */}
      <div className="saldo-container">
        <h3>Saldo Total: R$ {saldo.toFixed(2)}</h3>
      </div>
    </div>
  );
};

export default CadastroSaida;
