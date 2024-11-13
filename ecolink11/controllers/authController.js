// Importa o módulo 'bcryptjs' para hash de senhas.
const bcrypt = require('bcryptjs');

// Importa o módulo 'jsonwebtoken' para gerar e verificar tokens JWT.
const jwt = require('jsonwebtoken');

// Importa o modelo 'User' que representa a tabela de usuários no banco de dados.
const User = require('../models/user');

// Carrega as variáveis de ambiente definidas no arquivo .env, incluindo o segredo JWT.
require('dotenv').config();

// Função de registro de um novo usuário.
exports.register = async (req, res) => {
  
  // Extrai nome, email e senha do corpo da requisição.
  const { name, email, password } = req.body;

  try {
    // Gera um hash da senha do usuário com uma complexidade de 10 rounds.
    const hashedPassword = await bcrypt.hash(password, 10);

    // Cria um novo registro de usuário no banco de dados com a senha criptografada.
    const user = await User.create({ name, email, password: hashedPassword });

    // Responde com sucesso e retorna os dados do usuário criado.
    res.status(201).json({ message: 'Usuário criado com sucesso', user });
  } catch (error) {
    // Em caso de erro, responde com erro 500 (erro interno do servidor).
    res.status(500).json({ error: 'Erro ao registrar usuário' });
  }
};

// Função de login do usuário.
exports.login = async (req, res) => {
  
  // Extrai o email e a senha do corpo da requisição.
  const { email, password } = req.body;

  try {
    // Busca o usuário no banco de dados pelo email.
    const user = await User.findOne({ where: { email } });

    // Verifica se o usuário existe e se a senha fornecida está correta.
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    // Gera um token JWT para o usuário autenticado, com validade de 1 hora.
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Responde com sucesso e retorna o token JWT.
    res.json({ message: 'Login realizado com sucesso', token });
  } catch (error) {
    // Em caso de erro, responde com erro 500 (erro interno do servidor).
    res.status(500).json({ error: 'Erro ao fazer login' });
  }
};
