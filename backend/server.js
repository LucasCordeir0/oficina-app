const db = require('./database/db');

const express = require('express');

const app = express();

app.use (express.json());

app.get('/', (req, res) => {
    res.send('Servidor da Oficina app está rodando');

});

app.post('/clientes', (req, res) => {
  const { nome, telefone } = req.body;

  if (!nome || !telefone) {
    return res.status(400).json({ error: 'Nome e telefone são obrigatórios' });
  }

  const sql = `INSERT INTO clientes (nome, telefone) VALUES (?, ?)`;

  db.run(sql, [nome, telefone], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    res.status(201).json({
      id: this.lastID,
      nome,
      telefone
    });
  });
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});