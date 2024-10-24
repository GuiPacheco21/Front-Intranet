import request from 'supertest';
import express from 'express';
import userRoutes from './userRoutes'; // Certifique-se de que está importando o arquivo correto

const app = express();
app.use(express.json());

// Mock do banco de dados
const mockDb = {
  query: jest.fn(),
};

// Middleware para adicionar o mock ao req.db
app.use((req, res, next) => {
  req.db = mockDb;
  next();
});

app.use('/api', userRoutes); // Altere o prefixo de acordo com sua rota

describe('POST /api/users', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deve criar um usuário e retornar 201', async () => {
    // Simulando a resposta do banco de dados para incluir o id
    mockDb.query.mockResolvedValue([{ insertId: 1 }]); // Simulando que um usuário foi inserido com o ID 1

    const response = await request(app)
      .post('/api/users')
      .send({ nome: 'Novo Usuário', email: 'novo@example.com', senha: 'senha123' });
    
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id'); // Verifica se a propriedade 'id' está presente
    expect(response.body.nome).toBe('Novo Usuário');
    expect(response.body.email).toBe('novo@example.com'); // Verifica se o email está correto
  });

  it('deve retornar 400 se o email já estiver em uso', async () => {
    // Simulando que o email já está em uso
    mockDb.query.mockResolvedValue([[{ id: 1, email: 'novo@example.com' }]]); // Simulando um usuário existente

    const response = await request(app)
      .post('/api/users')
      .send({ nome: 'Novo Usuário', email: 'novo@example.com', senha: 'senha123' });
    
    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Email já está em uso');
  });

  it('deve retornar 400 se os dados forem inválidos', async () => {
    const response = await request(app)
      .post('/api/users')
      .send({ nome: 'Usu', email: 'email-invalido', senha: '123' }); // Dados inválidos

    expect(response.status).toBe(400);
    expect(response.body.errors).toBeDefined(); // Verifica se há erros
  });
});
