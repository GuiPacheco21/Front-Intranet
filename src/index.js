import express from 'express';
import mysql from 'mysql2/promise'; 
import authRoutes from './auth.js';
import userRoutes from './userRoutes.js';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 3000;

// Conexão com o banco de dados
const db = await mysql.createConnection({
    host: 'localhost',         
    user: 'root',              
    password: 'root',
    database: 'sistemaintranet'
});

// Middleware
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173', // Permite apenas requisições deste domínio
}));

// Middleware para adicionar a conexão do banco de dados às requisições
app.use((req, res, next) => {
    req.db = db; // Adiciona a conexão do banco de dados
    next();
});

// Rotas
app.use('/auth', authRoutes); // authRoutes já usa req.db
app.use('/api', userRoutes);

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
