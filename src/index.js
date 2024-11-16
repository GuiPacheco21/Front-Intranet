import express from 'express';
import mysql from 'mysql2/promise'; 
import authRoutes from './auth.js';
import userRoutes from './userRoutes.js';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 3000;

let db;  // Declarar a variável db fora do try/catch

// Função assíncrona para configurar a conexão com o banco
async function initializeDbConnection() {
    try {
        db = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'root',
            database: 'sistemaintranet'
        });
        console.log('Conexão com o banco de dados estabelecida');
    } catch (error) {
        console.error('Erro ao conectar ao banco de dados:', error);
        process.exit(1);  // Finaliza o processo caso não consiga conectar ao banco
    }
}

// Inicializa a conexão com o banco
initializeDbConnection();

// Opções do CORS
const corsOptions = {
    origin: ['http://localhost:5173', 'http://localhost:5174'],
    methods: 'GET,POST,PUT,DELETE',  // Se necessário, adicione os métodos HTTP que você deseja permitir
    credentials: true,  // Caso você precise enviar cookies ou cabeçalhos de autenticação
};

// Middleware
app.use(express.json());
app.use(cors(corsOptions));

// Middleware para adicionar a conexão do banco de dados às requisições
app.use((req, res, next) => {
    req.db = db;  // Adiciona a conexão do banco de dados à requisição
    next();
});

// Rotas
app.use('/auth', authRoutes);  // authRoutes já deve usar req.db
app.use('/api', userRoutes);   // userRoutes pode acessar req.db

// Inicializa o servidor após a conexão com o banco de dados
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
