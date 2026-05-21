const prisma = require('../prismaClient');
const { sendCoinTransferEmailToAluno, sendCoinTransferEmailToProfessor } = require('../services/emailService');

const enviarMoedas = async (req, res) => {
  const { professorId, alunoId, valor, motivo } = req.body;

  if (!professorId || !alunoId || !valor || !motivo) {
    return res.status(400).json({ error: 'Preencha todos os campos.' });
  }

  if (valor <= 0) {
    return res.status(400).json({ error: 'O valor deve ser maior que zero.' });
  }

  try {
    // Buscar dados do professor
    const professor = await prisma.professor.findUnique({
      where: { id: Number(professorId) }
    });

    if (!professor) {
      return res.status(404).json({ error: 'Professor não encontrado.' });
    }

    if (professor.saldo < valor) {
      return res.status(400).json({ error: 'Saldo insuficiente.' });
    }

    // Buscar dados do aluno
    const aluno = await prisma.aluno.findUnique({
      where: { id: Number(alunoId) }
    });

    if (!aluno) {
      return res.status(404).json({ error: 'Aluno não encontrado.' });
    }

    // Usar transaction para garantir integridade
    const transacao = await prisma.$transaction(async (tx) => {
      // Deduz do professor
      const professorAtualizado = await tx.professor.update({
        where: { id: Number(professorId) },
        data: { saldo: { decrement: Number(valor) } }
      });

      // Credita no aluno
      const alunoAtualizado = await tx.aluno.update({
        where: { id: Number(alunoId) },
        data: { saldo: { increment: Number(valor) } }
      });

      // Cria a transação
      const novaTransacao = await tx.transacao.create({
        data: {
          professorId: Number(professorId),
          alunoId: Number(alunoId),
          valor: Number(valor),
          motivo
        }
      });

      return novaTransacao;
    });

    // Enviar emails
    await sendCoinTransferEmailToAluno(aluno.email, aluno.nome, professor.nome, valor, motivo);
    await sendCoinTransferEmailToProfessor(professor.email, professor.nome, aluno.nome, valor, motivo);

    res.status(201).json(transacao);

  } catch (error) {
    console.error('Erro na transferência:', error);
    res.status(500).json({ error: 'Erro ao realizar a transferência de moedas.' });
  }
};

const getExtratoProfessor = async (req, res) => {
  const { id } = req.params;
  try {
    const transacoes = await prisma.transacao.findMany({
      where: { professorId: Number(id) },
      include: {
        aluno: {
          select: { nome: true, email: true }
        }
      },
      orderBy: { data: 'desc' }
    });
    res.json(transacoes);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar extrato do professor.' });
  }
};

const getExtratoAluno = async (req, res) => {
  const { id } = req.params;
  try {
    const transacoes = await prisma.transacao.findMany({
      where: { alunoId: Number(id) },
      include: {
        professor: {
          select: { nome: true, email: true, departamento: true }
        }
      },
      orderBy: { data: 'desc' }
    });
    res.json(transacoes);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar extrato do aluno.' });
  }
};

module.exports = {
  enviarMoedas,
  getExtratoProfessor,
  getExtratoAluno
};
