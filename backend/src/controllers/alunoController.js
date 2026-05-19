const prisma = require('../prismaClient');

const getAlunos = async (req, res) => {
  try {
    const alunos = await prisma.aluno.findMany();
    res.json(alunos);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar alunos' });
  }
};

const getAlunoById = async (req, res) => {
  const { id } = req.params;
  try {
    const aluno = await prisma.aluno.findUnique({
      where: { id: Number(id) },
    });
    if (aluno) {
      res.json(aluno);
    } else {
      res.status(404).json({ error: 'Aluno não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar aluno' });
  }
};

const createAluno = async (req, res) => {
  const { nome, email, cpf, dataNascimento, senha, rg, endereco, instituicao, curso } = req.body;
  try {
    const novoAluno = await prisma.aluno.create({
      data: {
        nome,
        email,
        cpf,
        dataNascimento: dataNascimento ? new Date(dataNascimento) : null,
        senha,
        rg,
        endereco,
        instituicao,
        curso,
      },
    });
    res.status(201).json(novoAluno);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar aluno. Verifique se o CPF ou Email já existem.' });
  }
};

const updateAluno = async (req, res) => {
  const { id } = req.params;
  const { nome, email, cpf, dataNascimento, senha, rg, endereco, instituicao, curso } = req.body;
  try {
    const alunoAtualizado = await prisma.aluno.update({
      where: { id: Number(id) },
      data: {
        nome,
        email,
        cpf,
        dataNascimento: dataNascimento ? new Date(dataNascimento) : undefined,
        senha,
        rg,
        endereco,
        instituicao,
        curso,
      },
    });
    res.json(alunoAtualizado);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar aluno' });
  }
};

const deleteAluno = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.aluno.delete({
      where: { id: Number(id) },
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar aluno' });
  }
};

module.exports = {
  getAlunos,
  getAlunoById,
  createAluno,
  updateAluno,
  deleteAluno,
};
