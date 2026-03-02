const express = require('express');
const clientesRoutes = require('./routes/clientesRoutes');

const app = express();

app.use(express.json());

app.use('/clientes', clientesRoutes);

app.get('/', (req, res) => {
    res.send('Servidor da Oficina app está rodando');
});

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});