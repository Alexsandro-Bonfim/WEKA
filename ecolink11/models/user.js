// Importa o módulo 'DataTypes' do Sequelize, que é usado para definir os tipos de dados das colunas.
const { DataTypes } = require('sequelize');

// Importa a instância do Sequelize configurada, estabelecendo a conexão com o banco de dados.
const sequelize = require('../config/config');

// Define um modelo de tabela chamado 'User' com os campos especificados.
const User = sequelize.define('User', {
  
  // Campo 'name' que armazena o nome do usuário.
  // Tipo STRING, e não permite valores nulos (obrigatório).
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  // Campo 'email' que armazena o email do usuário.
  // Tipo STRING, obrigatório e deve ser único (sem duplicatas no banco de dados).
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },

  // Campo 'password' que armazena a senha do usuário.
  // Tipo STRING, obrigatório.
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  // Campo 'points' que armazena os pontos acumulados pelo usuário.
  // Tipo INTEGER e com valor padrão 0.
  points: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
});

// Exporta o modelo 'User' para que possa ser utilizado em outras partes da aplicação.
module.exports = User;
