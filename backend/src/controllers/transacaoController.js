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

    // Professor tem moedas ilimitadas, portanto não descontamos do saldo dele
    // e nem verificamos if (professor.saldo < valor)

    // Buscar dados do aluno
    const aluno = await prisma.aluno.findUnique({
      where: { id: Number(alunoId) }
    });

    if (!aluno) {
      return res.status(404).json({ error: 'Aluno não encontrado.' });
    }

    // Usar transaction para garantir integridade
    const transacao = await prisma.$transaction(async (tx) => {
      // O professor tem saldo ilimitado, não precisamos dar decrement
      // Apenas creditamos no aluno


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

    // Enviar emails em segundo plano (sem travar a resposta)
    // sendCoinTransferEmailToAluno(aluno.email, aluno.nome, professor.nome, valor, motivo)
    //   .catch(err => console.error('Erro ao enviar email para o aluno:', err));
    // sendCoinTransferEmailToProfessor(professor.email, professor.nome, aluno.nome, valor, motivo)
    //   .catch(err => console.error('Erro ao enviar email para o professor:', err));

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

    const resgates = await prisma.resgate.findMany({
      where: { alunoId: Number(id) },
      include: {
        vantagem: {
          include: {
            empresa: {
              select: { nomeFantasia: true }
            }
          }
        }
      },
      orderBy: { data: 'desc' }
    });

    const extratoTransacoes = transacoes.map(t => ({
      id: `t_${t.id}`,
      tipo: 'recebimento',
      motivo: t.motivo,
      valor: t.valor,
      data: t.data,
      professor: t.professor
    }));

    const extratoResgates = resgates.map(r => ({
      id: `r_${r.id}`,
      tipo: 'resgate',
      motivo: `Resgate de Vantagem: ${r.vantagem.titulo}`,
      valor: -r.vantagem.custo,
      data: r.data,
      empresa: r.vantagem.empresa.nomeFantasia,
      codigo: r.codigo,
      vantagemId: r.vantagemId
    }));

    const extrato = [...extratoTransacoes, ...extratoResgates].sort((a, b) => new Date(b.data) - new Date(a.data));

    res.json(extrato);
  } catch (error) {
    console.error('Erro ao buscar extrato do aluno:', error);
    res.status(500).json({ error: 'Erro ao buscar extrato do aluno.' });
  }
};

module.exports = {
  enviarMoedas,
  getExtratoProfessor,
  getExtratoAluno
};
