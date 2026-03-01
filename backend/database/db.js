const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Caminho do banco
const dbPath = path.resolve(__dirname, 'oficina.db');

// Criando conexão
const db = new sqlite3.Database(dbPath, (err) =>{
    if (err){
        console.error('Erro ao conectar ao banco:', err.message);
    } else {
        console.log('Conectado ao banco SQLite');
    }
});

module.exports = db;