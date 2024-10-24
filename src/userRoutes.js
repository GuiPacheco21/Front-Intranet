import express from 'express';
import { body, validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';

const router = express.Router();

// Criar usuário
router.post('/users', [
    body('nome')
        .isLength({ min: 4 }).withMessage('Nome deve ter pelo menos 4 caracteres')
        .custom(value => {
            if (!/^[A-Z]/.test(value)) {
                throw new Error('A primeira letra do nome deve ser maiúscula');
            }
            return true;
        }),
    body('email').isEmail().withMessage('Email inválido'),
    body('senha').isLength({ min: 6 }).withMessage('Senha deve ter pelo menos 6 caracteres')
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { nome, email, senha } = req.body;
    const hashedPassword = await bcrypt.hash(senha, 10);

    try {
        const [existingUser] = await req.db.query('SELECT * FROM users WHERE email = ?', [email]); // Alterado aqui
        if (existingUser.length > 0) {
            return res.status(400).json({ message: 'Email já está em uso' });
        }

        const [results] = await req.db.query('INSERT INTO users (nome, email, senha) VALUES (?, ?, ?)', [nome, email, hashedPassword]); // Alterado aqui
        res.status(201).json({ id: results.insertId, nome, email });
    } catch (err) {
        return res.status(500).json({ message: 'Erro ao criar usuário', err });
    }
});

// Buscar todos os usuários
router.get('/users', async (req, res) => {
    try {
        const [results] = await req.db.query('SELECT id, nome, email FROM users'); // Alterado aqui
        res.json(results);
    } catch (err) {
        return res.status(500).json({ message: 'Erro ao buscar usuários', err });
    }
});

// Buscar usuário por ID
router.get('/users/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [results] = await req.db.query('SELECT id, nome, email FROM users WHERE id = ?', [id]); // Alterado aqui
        if (results.length === 0) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }
        res.json(results[0]);
    } catch (err) {
        return res.status(500).json({ message: 'Erro ao buscar usuário', err });
    }
});

// Atualizar usuário
router.put('/users/:id', [
    body('nome').notEmpty().withMessage('Nome é obrigatório'),
    body('email').isEmail().withMessage('Email inválido'),
], async (req, res) => {
    const { id } = req.params;
    const { nome, email, senha } = req.body;

    const updates = [];
    const values = [];

    if (nome) {
        updates.push('nome = ?');
        values.push(nome);
    }
    if (email) {
        updates.push('email = ?');
        values.push(email);
    }
    if (senha) {
        const hashedPassword = await bcrypt.hash(senha, 10);
        updates.push('senha = ?');
        values.push(hashedPassword);
    }

    if (updates.length === 0) {
        return res.status(400).json({ message: 'Nada a atualizar' });
    }

    values.push(id); // Adiciona o ID ao final para a cláusula WHERE

    try {
        await req.db.query(`UPDATE users SET ${updates.join(', ')} WHERE id = ?`, values); // Alterado aqui
        res.json({ message: 'Usuário atualizado com sucesso' });
    } catch (err) {
        return res.status(500).json({ message: 'Erro ao atualizar usuário', err });
    }
});

// Deletar usuário
router.delete('/users/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await req.db.query('DELETE FROM users WHERE id = ?', [id]); // Alterado aqui
        res.json({ message: 'Usuário deletado com sucesso' });
    } catch (err) {
        return res.status(500).json({ message: 'Erro ao deletar usuário', err });
    }
});

export default router;
