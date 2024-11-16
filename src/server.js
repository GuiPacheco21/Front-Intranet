import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { check, validationResult } from 'express-validator';

const app = express();
const port = 5000;

app.use(cors()); // Permitir requisições de diferentes portas
app.use(bodyParser.json()); // Para lidar com JSON no corpo da requisição

let clientes = []; // Banco de dados fictício para armazenar clientes

// Função para remover a formatação do CNPJ
const removerFormatacaoCNPJ = (cnpj) => {
  return cnpj.replace(/\D/g, ''); // Remove qualquer coisa que não seja número
};

// Função para validar o formato do CNPJ
const validarCNPJ = (cnpj) => {
  const cnpjLimpo = removerFormatacaoCNPJ(cnpj);

  // Verifica se o CNPJ tem 14 dígitos
  if (cnpjLimpo.length !== 14) {
    return false;
  }

  // Aqui você pode adicionar uma lógica para validar o CNPJ corretamente,
  // como utilizando expressões regulares para validar o dígito verificador
  // ou utilizando alguma biblioteca como `cpf-cnpj-validator`.

  return true;
};

// Endpoint para listar os clientes
app.get('/clientes', (req, res) => {
  res.json(clientes);
});

// Endpoint para adicionar um cliente
app.post(
  '/clientes',
  [
    check('nome').notEmpty().withMessage('O nome é obrigatório'),
    check('cnpj').custom(cnpj => {
      if (!validarCNPJ(cnpj)) {
        throw new Error('CNPJ inválido');
      }
      return true;
    }),
    check('endereco').notEmpty().withMessage('O endereço é obrigatório'),
    check('tempoContrato').isInt({ gt: 0 }).withMessage('Tempo de contrato deve ser um número maior que zero')
  ],
  (req, res) => {
    // Verifica se a validação falhou
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { nome, cnpj, endereco, tempoContrato } = req.body;

    // Remover a formatação do CNPJ antes de armazenar
    const cnpjLimpo = removerFormatacaoCNPJ(cnpj);

    // Cria um novo cliente
    const novoCliente = { nome, cnpj: cnpjLimpo, endereco, tempoContrato };
    clientes.push(novoCliente); // Adiciona o cliente à "base de dados" em memória

    res.status(201).json(novoCliente); // Retorna o novo cliente criado
  }
);

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
