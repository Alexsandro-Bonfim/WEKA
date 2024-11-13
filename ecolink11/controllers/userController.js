// Importa o modelo 'Recycle', que representa a tabela de reciclagem no banco de dados.
const Recycle = require('../models/recycle');

// Importa o modelo 'User', que representa a tabela de usuários no banco de dados.
const User = require('../models/user');

// Exporta a função 'recycle' para registrar uma nova reciclagem e atualizar os pontos do usuário.
exports.recycle = async (req, res) => {
  
  // Extrai o tipo e o peso do e-waste do corpo da requisição.
  const { type, weight } = req.body;

  // Calcula os pontos ganhos com base no peso do e-waste (exemplo de cálculo multiplicando o peso por 10).
  const pointsEarned = Math.floor(weight * 10);

  try {
    // Cria um novo registro de reciclagem com os dados fornecidos e associa ao usuário autenticado.
    const recycle = await Recycle.create({
      type,
      weight,
      pointsEarned,
      UserId: req.user.id, // Associa o registro de reciclagem ao usuário logado (identificado pelo token JWT).
    });

    // Encontra o usuário pelo ID, que foi armazenado na requisição a partir do token JWT.
    const user = await User.findByPk(req.user.id);

    // Adiciona os pontos ganhos ao total de pontos do usuário.
    user.points += pointsEarned;

    // Salva as alterações no banco de dados.
    await user.save();

    // Envia uma resposta de sucesso com uma mensagem e o registro de reciclagem criado.
    res.json({ message: 'Reciclagem registrada e pontos adicionados!', recycle });
    
  } catch (error) {
    // Em caso de erro, responde com erro 500 (erro interno do servidor).
    res.status(500).json({ error: 'Erro ao registrar reciclagem' });
  }
};
