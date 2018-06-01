const mongoose  = require('mongoose');
const dbConfig  = require('../config/db');
const util      = require('util');

// Monta URL de conexão com o MongoDB
const dbUri = util.format(
    "mongodb://%s:%s@%s:%s/%s?authSource=%s",
    dbConfig.user,
    dbConfig.password,
    dbConfig.host,
    dbConfig.port,
    dbConfig.database,
    dbConfig.authSource
);

// Conecta ao database do MongoDB
mongoose.connect(dbUri);

// Configura o tipo de promise retornada
// pelos métodos do Mongoose
mongoose.Promise = global.Promise;

// Monta o esquema
let schema = new mongoose.Schema(require('../app/models/Aluno'));

// Monta os models
const models = {
  Aluno: mongoose.model("Aluno", schema)
};

// Se houver erro de conexão, mostra no log
mongoose.connection.on(
  'error',
  console.error.bind(console, 'Erro na conexão com o banco: ')
);

// Habilita  saídas de debug no console
mongoose.set('debug', true);

// Exporta os modelos
module.exports = models;