import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { body, validationResult } from 'express-validator';

const router = express.Router();
const JWT_SECRET = 'projetointegrador123';

router.post('/login', [
    body('email').isEmail().withMessage('Email inválido'),
    body('senha').isLength({ min: 6 }).withMessage('Senha deve ter pelo menos 6 caracteres'),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // Adicionando log para visualizar os erros de validação
        console.error("Erros de validação:", errors.array());
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, senha } = req.body;

    try {
        const [results] = await req.db.query('SELECT * FROM users WHERE email = ?', [email]);

        // Se não encontrar o usuário, retorna 401
        if (results.length === 0) {
            return res.status(401).json({ message: 'Email ou senha incorretos' });
        }

        const usuario = results[0];
        const match = await bcrypt.compare(senha, usuario.senha);

        // Se a senha não corresponder, retorna 401
        if (!match) {
            return res.status(401).json({ message: 'Email ou senha incorretos' });
        }

        const token = jwt.sign({ id: usuario.id, nome: usuario.nome }, JWT_SECRET, { expiresIn: '1h' });
        res.json({ token, id: usuario.id, nome: usuario.nome });
    } catch (err) {
        console.error("Erro ao consultar o banco de dados:", err.message);
        return res.status(500).json({ message: 'Erro ao consultar o banco de dados' });
    }
});

export default router;
