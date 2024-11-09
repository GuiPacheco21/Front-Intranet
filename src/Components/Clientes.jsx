import React, { useState } from "react";
import { Form, Button, Container, Row, Col, ListGroup, Alert } from "react-bootstrap";
import "./Clientes.css";

const Clientes = () => {
  const [nome, setNome] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [endereco, setEndereco] = useState("");
  const [tempoContrato, setTempoContrato] = useState("");
  const [clientes, setClientes] = useState([]);
  const [showAlert, setShowAlert] = useState(false);

  const handleAddCliente = () => {
    if (nome && cnpj.length === 14 && endereco && tempoContrato) {
      const novoCliente = { nome, cnpj, endereco, tempoContrato: parseInt(tempoContrato) };
      setClientes([...clientes, novoCliente]);
      setNome("");
      setCnpj("");
      setEndereco("");
      setTempoContrato("");
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 2000); // Alerta desaparece em 2 segundos
    } else {
      alert("Por favor, preencha todos os campos corretamente.");
    }
  };

  return (
    <Container className="clientes-container mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <h2 className="text-center mb-4">Adicionar novo cliente</h2>
          {showAlert && <Alert variant="success">Cliente adicionado!</Alert>}
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
                  const cnpj = e.target.value.replace(/\D/g, '');
                  setCnpj(cnpj);
                }}
                required
                maxLength="14"
                minLength="14"
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
                  <strong>Nome:</strong> {cliente.nome}, <strong>CNPJ:</strong> {cliente.cnpj},{" "}
                  <strong>Endereço:</strong> {cliente.endereco},{" "}
                  <strong>Tempo de Contrato:</strong> {cliente.tempoContrato} anos
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
