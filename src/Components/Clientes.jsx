import React, { useState, useEffect } from "react";
import { Form, Button, Container, Row, Col, ListGroup, Alert } from "react-bootstrap";
import axios from 'axios';

// Função para formatar o CNPJ no formato correto
const formatarCNPJ = (cnpj) => {
  cnpj = cnpj.replace(/\D/g, ''); // Remove tudo que não é número
  if (cnpj.length <= 14) {
    return cnpj.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, '$1.$2.$3/$4-$5');
  }
  return cnpj;
};

const Clientes = () => {
  const [nome, setNome] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [endereco, setEndereco] = useState("");
  const [tempoContrato, setTempoContrato] = useState("");
  const [clientes, setClientes] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  // Função para carregar os clientes ao montar o componente
  useEffect(() => {
    axios.get('http://localhost:5000/clientes')
      .then(response => setClientes(response.data))
      .catch(error => console.error("Erro ao buscar clientes:", error));
  }, []);

  // Função para adicionar um novo cliente
  const handleAddCliente = async () => {
    // Verificação dos campos obrigatórios
    if (!nome || !cnpj || !endereco || !tempoContrato) {
      setAlertMessage("Por favor, preencha todos os campos.");
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
      return;
    }

    // Verificação do comprimento do CNPJ (deve ser 18 caracteres no formato)
    if (cnpj.replace(/\D/g, '').length !== 14) {
      setAlertMessage("CNPJ deve ter 14 caracteres.");
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
      return;
    }

    // Verificação do tempo de contrato (deve ser um número maior que 0)
    if (isNaN(tempoContrato) || tempoContrato <= 0) {
      setAlertMessage("Tempo de contrato deve ser um número maior que zero.");
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
      return;
    }

    // Formatar o CNPJ para o formato correto antes de enviar
    const cnpjFormatado = formatarCNPJ(cnpj);

    const novoCliente = {
      nome,
      cnpj: cnpjFormatado,  // CNPJ com a formatação correta
      endereco,
      tempoContrato: parseInt(tempoContrato)
    };

    console.log("Enviando para o servidor:", novoCliente);  // Verifique os dados enviados

    try {
      const response = await axios.post('http://localhost:5000/clientes', novoCliente);

      // Atualiza a lista de clientes local com o novo cliente
      setClientes([...clientes, response.data]);

      // Limpa os campos após a submissão
      setNome("");
      setCnpj("");
      setEndereco("");
      setTempoContrato("");

      setAlertMessage("Cliente adicionado com sucesso!");
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000); // Esconde o alerta após 3 segundos
    } catch (error) {
      console.error("Erro ao adicionar cliente:", error.response?.data || error.message);

      // Mensagem de erro detalhada
      setAlertMessage(`Erro ao adicionar cliente: ${error.response?.data?.message || error.message}`);
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
    }
  };

  return (
    <Container className="clientes-container mt-5" style={{ paddingTop: '80px' }}>
      <Row className="justify-content-center">
        <Col md={6}>
          <h2 className="text-center mb-4">Adicionar novo cliente</h2>
          {showAlert && <Alert variant="danger">{alertMessage}</Alert>}
          <Form onSubmit={(e) => e.preventDefault()}>
            <Form.Group controlId="nome">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="cnpj">
              <Form.Label>CNPJ</Form.Label>
              <Form.Control
                type="text"
                value={cnpj}
                onChange={(e) => {
                  const valor = e.target.value.replace(/\D/g, ''); // Remove qualquer coisa não numérica
                  const cnpjFormatado = formatarCNPJ(valor); // Formata o CNPJ
                  setCnpj(cnpjFormatado);
                }}
                required
                maxLength="18"
                minLength="18"
              />
            </Form.Group>
            <Form.Group controlId="endereco">
              <Form.Label>Endereço</Form.Label>
              <Form.Control
                type="text"
                value={endereco}
                onChange={(e) => setEndereco(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="tempoContrato">
              <Form.Label>Tempo de Contrato (anos)</Form.Label>
              <Form.Control
                type="number"
                value={tempoContrato}
                onChange={(e) => setTempoContrato(e.target.value)}
                required
                min="1"
              />
            </Form.Group>
            <Button variant="primary" className="w-100 mt-3" onClick={handleAddCliente}>
              Adicionar Cliente
            </Button>
          </Form>
          <div className="clientes-list mt-4">
            <h3 className="text-center">Lista de Clientes</h3>
            <ListGroup>
              {clientes.map((cliente, index) => (
                <ListGroup.Item key={index}>
                  <strong>Nome:</strong> {cliente.nome}, <strong>CNPJ:</strong> {cliente.cnpj}, <strong>Endereço:</strong> {cliente.endereco}, <strong>Tempo de Contrato:</strong> {cliente.tempoContrato} anos
                </ListGroup.Item>
              ))}
            </ListGroup>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Clientes;
