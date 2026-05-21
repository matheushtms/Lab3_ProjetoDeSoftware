const prisma = require('../prismaClient');

const getProfessores = async (req, res) => {
  try {
    const professores = await prisma.professor.findMany();
    res.json(professores);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar professores' });
  }
};

const getProfessorById = async (req, res) => {
  const { id } = req.params;
  try {
    const professor = await prisma.professor.findUnique({
      where: { id: Number(id) },
    });
    if (professor) {
      res.json(professor);
    } else {
      res.status(404).json({ error: 'Professor não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar professor' });
  }
};

const createProfessor = async (req, res) => {
  const { nome, email, cpf, departamento, senha } = req.body;
  try {
    const novoProfessor = await prisma.professor.create({
      data: {
        nome,
        email,
        cpf,
        departamento,
        senha,
        saldo: 1000 // saldo inicial de 1000 moedas
      },
    });
    res.status(201).json(novoProfessor);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar professor. Verifique se o CPF ou Email já existem.' });
  }
};

module.exports = {
  getProfessores,
  getProfessorById,
  createProfessor,
};
