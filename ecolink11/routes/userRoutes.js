// Importando o módulo express para criar o roteador
const express = require('express');

// Importando o controller de usuário onde as funções de manipulação de dados serão definidas
const userController = require('../controllers/userController');

// Importando a função de autenticação middleware para verificar se o usuário está autenticado
const { authenticate } = require('../middleware/authMiddleware');

// Criando uma instância do roteador Express para definir as rotas
const router = express.Router();

// Definindo a rota POST para o caminho '/recycle' que usa o middleware de autenticação
// Caso o usuário esteja autenticado, a função 'recycle' do userController será chamada
router.post('/recycle', authenticate, userController.recycle);

// Exportando o roteador para ser utilizado em outros arquivos
module.exports = router;

// (Duplicado) Este comando também exporta o roteador, mas é redundante, pois já há uma exportação acima
module.exports = router;
