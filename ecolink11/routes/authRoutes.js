// Importa o módulo 'express' para trabalhar com o framework
const express = require('express');
// Importa o controller de autenticação, onde estão os métodos de login e registro
const authController = require('../controllers/authController');
// Cria uma nova instância do roteador do Express
const router = express.Router();

// Define uma rota POST para o endpoint '/register', que chama o método 'register' do authController
router.post('/register', authController.register);

// Define uma rota POST para o endpoint '/login', que chama o método 'login' do authController
router.post('/login', authController.login);

// Exporta o roteador para que possa ser utilizado em outras partes do projeto
module.exports = router;
