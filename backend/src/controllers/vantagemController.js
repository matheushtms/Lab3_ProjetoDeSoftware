const prisma = require('../prismaClient');
const { sendResgateEmailToAluno, sendResgateEmailToEmpresa } = require('../services/emailService');

const getVantagens = async (req, res) => {
  const { empresaId } = req.query;
  try {
    const filter = empresaId ? { empresaId: Number(empresaId) } : {};
    const vantagens = await prisma.vantagem.findMany({
      where: filter,
      include: {
        empresa: {
          select: { nomeFantasia: true }
        },
        resgates: true
      }
    });
    res.json(vantagens);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar vantagens' });
  }
};

const resgatarVantagem = async (req, res) => {
  const { alunoId, vantagemId } = req.body;

  if (!alunoId || !vantagemId) {
    return res.status(400).json({ error: 'Faltam dados para o resgate.' });
  }

  try {
    // Buscar aluno
    const aluno = await prisma.aluno.findUnique({
      where: { id: Number(alunoId) }
    });

    if (!aluno) {
      return res.status(404).json({ error: 'Aluno não encontrado.' });
    }

    // Buscar vantagem
    const vantagem = await prisma.vantagem.findUnique({
      where: { id: Number(vantagemId) },
      include: {
        empresa: true
      }
    });

    if (!vantagem) {
      return res.status(404).json({ error: 'Vantagem não encontrada.' });
    }

    if (aluno.saldo < vantagem.custo) {
      return res.status(400).json({ error: 'Saldo insuficiente para resgatar esta vantagem.' });
    }

    // Verificar se já resgatou
    const resgateExistente = await prisma.resgate.findFirst({
      where: {
        alunoId: Number(alunoId),
        vantagemId: Number(vantagemId)
      }
    });

    if (resgateExistente) {
      return res.status(400).json({ error: 'Você já resgatou esta vantagem.' });
    }

    // Gerar codigo aleatório
    const codigoResgate = 'RESG-' + Math.random().toString(36).substring(2, 8).toUpperCase();

    // Iniciar transação
    const resgate = await prisma.$transaction(async (tx) => {
      // Debitar do aluno
      await tx.aluno.update({
        where: { id: Number(alunoId) },
        data: { saldo: { decrement: vantagem.custo } }
      });

      // Registrar resgate
      const novoResgate = await tx.resgate.create({
        data: {
          alunoId: Number(alunoId),
          vantagemId: Number(vantagemId),
          codigo: codigoResgate
        }
      });

      return novoResgate;
    });

    // Enviar emails em segundo plano (sem travar a resposta)
    sendResgateEmailToAluno(
      aluno.email,
      aluno.nome,
      vantagem.titulo,
      vantagem.empresa.nomeFantasia,
      codigoResgate
    ).catch(err => console.error('Erro ao enviar email de resgate para o aluno:', err));

    sendResgateEmailToEmpresa(
      vantagem.empresa.email,
      vantagem.empresa.nomeFantasia,
      aluno.nome,
      aluno.email,
      vantagem.titulo,
      codigoResgate
    ).catch(err => console.error('Erro ao enviar email de resgate para a empresa:', err));

    res.status(201).json(resgate);
  } catch (error) {
    console.error('Erro no resgate:', error);
    res.status(500).json({ error: 'Erro ao realizar o resgate da vantagem.' });
  }
};

const criarVantagem = async (req, res) => {
  const { empresaId, titulo, descricao, custo, imagem } = req.body;

  if (!empresaId || !titulo || !descricao || !custo) {
    return res.status(400).json({ error: 'Preencha todos os campos obrigatórios.' });
  }

  try {
    const empresa = await prisma.empresaParceira.findUnique({
      where: { id: Number(empresaId) }
    });

    if (!empresa) {
      return res.status(404).json({ error: 'Empresa não encontrada.' });
    }

    const novaVantagem = await prisma.vantagem.create({
      data: {
        empresaId: Number(empresaId),
        titulo,
        descricao,
        custo: Number(custo),
        imagem
      }
    });

    res.status(201).json(novaVantagem);
  } catch (error) {
    console.error('Erro ao criar vantagem:', error);
    res.status(500).json({ error: 'Erro ao criar a vantagem.' });
  }
};

const editarVantagem = async (req, res) => {
  const { id } = req.params;
  const { titulo, descricao, custo, imagem } = req.body;

  if (!titulo || !descricao || !custo) {
    return res.status(400).json({ error: 'Preencha todos os campos obrigatórios.' });
  }

  try {
    const vantagem = await prisma.vantagem.findUnique({
      where: { id: Number(id) }
    });

    if (!vantagem) {
      return res.status(404).json({ error: 'Vantagem não encontrada.' });
    }

    const vantagemAtualizada = await prisma.vantagem.update({
      where: { id: Number(id) },
      data: {
        titulo,
        descricao,
        custo: Number(custo),
        imagem
      }
    });

    res.json(vantagemAtualizada);
  } catch (error) {
    console.error('Erro ao atualizar vantagem:', error);
    res.status(500).json({ error: 'Erro ao atualizar a vantagem.' });
  }
};

const deletarVantagem = async (req, res) => {
  const { id } = req.params;

  try {
    const vantagem = await prisma.vantagem.findUnique({
      where: { id: Number(id) },
      include: { resgates: true }
    });

    if (!vantagem) {
      return res.status(404).json({ error: 'Vantagem não encontrada.' });
    }

    if (vantagem.resgates && vantagem.resgates.length > 0) {
      return res.status(400).json({ error: 'Não é possível excluir uma vantagem que já foi resgatada por alunos.' });
    }

    await prisma.vantagem.delete({
      where: { id: Number(id) }
    });

    res.status(204).send();
  } catch (error) {
    console.error('Erro ao deletar vantagem:', error);
    res.status(500).json({ error: 'Erro ao deletar a vantagem.' });
  }
};

module.exports = {
  getVantagens,
  resgatarVantagem,
  criarVantagem,
  editarVantagem,
  deletarVantagem
};
