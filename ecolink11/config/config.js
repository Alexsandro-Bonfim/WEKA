// Importa o módulo 'Sequelize' para manipulação e conexão com o banco de dados.
const { Sequelize } = require('sequelize');

// Carrega as variáveis de ambiente definidas no arquivo .env, incluindo as credenciais do banco de dados.
require('dotenv').config();

// Cria uma nova instância do Sequelize, utilizando as credenciais do banco de dados armazenadas nas variáveis de ambiente.
const sequelize = new Sequelize(
  process.env.DB_NAME, // Nome do banco de dados.
  process.env.DB_USER, // Nome de usuário do banco de dados.
  process.env.DB_PASS, // Senha do banco de dados.
  {
    host: process.env.DB_HOST, // Host onde o banco de dados está rodando.
    dialect: 'mysql', // Tipo de banco de dados (MySQL, neste caso).
  }
);

// Exporta a instância do Sequelize para que possa ser usada em outras partes da aplicação.
module.exports = sequelize;
