import request from 'supertest';
import express from 'express';
import authRoutes from './auth'; // Verifique se o caminho está correto
import bcrypt from 'bcryptjs';

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

app.use('/auth', authRoutes);

describe('POST /auth/login', () => {
    it('deve retornar 401 se o email não existir', async () => {
        mockDb.query.mockResolvedValue([[]]); // Simulando que não há usuários no banco de dados

        const response = await request(app)
            .post('/auth/login')
            .send({ email: 'inexistente@gmail.com', senha: 'qualquerSenha' });
        
        expect(response.status).toBe(401);
        expect(response.body.message).toBe('Email ou senha incorretos');
    });

    it('deve retornar 401 se a senha estiver incorreta', async () => {
        // Simulando que o usuário existe, mas a senha está errada
        const hashedPassword = await bcrypt.hash('maria12', 10); // A senha correta
        mockDb.query.mockResolvedValue([[{ id: 2, nome: 'Maria', email: 'maria12@gmail.com', senha: hashedPassword }]]);

        const response = await request(app)
            .post('/auth/login')
            .send({ email: 'maria12@gmail.com', senha: 'senhaErrada' });
        
        expect(response.status).toBe(401);
        expect(response.body.message).toBe('Email ou senha incorretos');
    });

    it('deve retornar 200 e um token se o login for bem-sucedido', async () => {
        const hashedPassword = await bcrypt.hash('maria12', 10); // Senha correta
        mockDb.query.mockResolvedValue([[{ id: 2, nome: 'Maria', email: 'maria12@gmail.com', senha: hashedPassword }]]);

        const response = await request(app)
            .post('/auth/login')
            .send({ email: 'maria12@gmail.com', senha: 'maria12' });
        
        expect(response.status).toBe(200); // Espera receber 200 se o login for bem-sucedido
        expect(response.body).toHaveProperty('token');
        expect(response.body.nome).toBe('Maria');
    });
});
