const db = require('../database/db');

exports.criarCliente = (req, res) => {

    const { nome, telefone } = req.body;

    if (!nome || !telefone) {
        return res.status(400).json({ error: 'Nome e telefone são obrigatórios' });
    }

    const sql = 'INSERT INTO clientes (nome, telefone) VALUES (?, ?)';

    db.run(sql, [nome, telefone], function(err) {

        if (err) {
            return res.status(500).json({ error: err.message });
        }

        res.status(201).json({
            id: this.lastID,
            nome,
            telefone
        });
    });
};

exports.listarClientes = (req, res) => {

    const sql = 'SELECT id, nome, telefone FROM clientes';

    db.all(sql, [], (err, rows) => {

        if (err) {
            return res.status(500).json({ error: err.message });
        }

        res.status(200).json(rows);
    });
};

exports.buscarClientePorId = (req, res) => {

    const { id } = req.params;

    const sql = 'SELECT id, nome, telefone FROM clientes WHERE id = ?';

    db.get(sql, [id], (err, row) => {

        if (err) {
            return res.status(500).json({ error: err.message });
        }

        if (!row) {
            return res.status(404).json({ error: 'Cliente não encontrado' });
        }

        res.status(200).json(row);
    });
};

exports.atualizarCliente = (req, res) => {

    const { id } = req.params;
    const { nome, telefone } = req.body;

    if (!nome || !telefone) {
        return res.status(400).json({ error: 'Nome e telefone são obrigatórios' });
    }

    const sql = 'UPDATE clientes SET nome = ?, telefone = ? WHERE id = ?';

    db.run(sql, [nome, telefone, id], function(err) {

        if (err) {
            return res.status(500).json({ error: err.message });
        }

        if (this.changes === 0) {
            return res.status(404).json({ error: 'Cliente não encontrado' });
        }

        res.status(200).json({
            message: 'Cliente atualizado com sucesso'
        });
    });
};

exports.deletarCliente = (req, res) => {

    const { id } = req.params;

    const sql = 'DELETE FROM clientes WHERE id = ?';

    db.run(sql, [id], function(err) {

        if (err) {
            return res.status(500).json({ error: err.message });
        }

        if (this.changes === 0) {
            return res.status(404).json({ error: 'Cliente não encontrado' });
        }

        res.status(200).json({
            message: 'Cliente excluído com sucesso'
        });
    });
};