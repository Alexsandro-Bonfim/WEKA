// Importa o módulo 'DataTypes' do Sequelize, usado para definir tipos de dados das colunas.
const { DataTypes } = require('sequelize');

// Importa a instância configurada do Sequelize, que estabelece a conexão com o banco de dados.
const sequelize = require('../config/config');

// Importa o modelo 'User' para estabelecer uma relação entre o usuário e o registro de reciclagem.
const User = require('./user');

// Define um modelo de tabela chamado 'Recycle' com os campos especificados.
const Recycle = sequelize.define('Recycle', {
  
  // Campo 'type' que armazena o tipo de e-waste reciclado.
  // Tipo STRING e obrigatório.
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  // Campo 'weight' que armazena o peso do e-waste reciclado.
  // Tipo FLOAT e obrigatório.
  weight: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },

  // Campo 'pointsEarned' que armazena os pontos ganhos para o item reciclado.
  // Tipo INTEGER e obrigatório.
  pointsEarned: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

// Define a relação entre 'Recycle' e 'User', indicando que cada item reciclado pertence a um usuário específico.
Recycle.belongsTo(User);

// Define a relação inversa, indicando que um usuário pode ter vários registros de reciclagem.
User.hasMany(Recycle);

// Exporta o modelo 'Recycle' para ser utilizado em outras partes da aplicação.
module.exports = Recycle;
