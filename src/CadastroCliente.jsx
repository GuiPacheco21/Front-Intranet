import React, { useState } from 'react';
import './cadastro.css'; // Adicione um CSS específico para a tela de cadastro se necessário

const CadastroCliente = () => {
  const [nome, setNome] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [endereco, setEndereco] = useState("");
  const [contrato, setContrato] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await fetch("http://localhost:3000/clientes/cadastrar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nome, cnpj, endereco, contrato }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Erro ao cadastrar cliente");
      }

      setSuccess("Cadastro realizado com sucesso!");
      // Aqui você pode redirecionar ou limpar os campos, se necessário
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h1>Cadastro de Cliente</h1>
        {error && <div className="error">{error}</div>}
        {success && <div className="success">{success}</div>}
        <div className="input-field">
          <input
            type="text"
            placeholder="Nome"
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </div>
        <div className="input-field">
          <input
            type="text"
            placeholder="CNPJ"
            onChange={(e) => setCnpj(e.target.value)}
            required
          />
        </div>
        <div className="input-field">
          <input
            type="text"
            placeholder="Endereço"
            onChange={(e) => setEndereco(e.target.value)}
            required
          />
        </div>
        <div className="input-field">
          <input
            type="text"
            placeholder="Contrato"
            onChange={(e) => setContrato(e.target.value)}
            required
          />
        </div>
        <button>Cadastrar</button>
      </form>
    </div>
  );
};

export default CadastroCliente;
