const prisma = require('../prismaClient');

const getEmpresas = async (req, res) => {
  try {
    const empresas = await prisma.empresaParceira.findMany();
    res.json(empresas);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar empresas' });
  }
};

const getEmpresaById = async (req, res) => {
  const { id } = req.params;
  try {
    const empresa = await prisma.empresaParceira.findUnique({
      where: { id: Number(id) },
    });
    if (empresa) {
      res.json(empresa);
    } else {
      res.status(404).json({ error: 'Empresa não encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar empresa' });
  }
};

const createEmpresa = async (req, res) => {
  const { nomeFantasia, cnpj, email, telefone, senha, endereco, setor, responsavel } = req.body;
  try {
    const novaEmpresa = await prisma.empresaParceira.create({
      data: {
        nomeFantasia,
        cnpj,
        email,
        telefone,
        senha,
        endereco,
        setor,
        responsavel,
      },
    });
    res.status(201).json(novaEmpresa);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar empresa. Verifique se o CNPJ ou Email já existem.' });
  }
};

const updateEmpresa = async (req, res) => {
  const { id } = req.params;
  const { nomeFantasia, cnpj, email, telefone, senha, endereco, setor, responsavel } = req.body;
  try {
    const empresaAtualizada = await prisma.empresaParceira.update({
      where: { id: Number(id) },
      data: {
        nomeFantasia,
        cnpj,
        email,
        telefone,
        senha,
        endereco,
        setor,
        responsavel,
      },
    });
    res.json(empresaAtualizada);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar empresa' });
  }
};

const deleteEmpresa = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.empresaParceira.delete({
      where: { id: Number(id) },
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar empresa' });
  }
};

const getResgatesEmpresa = async (req, res) => {
  const { id } = req.params;
  try {
    const resgates = await prisma.resgate.findMany({
      where: {
        vantagem: {
          empresaId: Number(id),
        },
      },
      include: {
        aluno: {
          select: {
            nome: true,
            email: true,
          },
        },
        vantagem: {
          select: {
            titulo: true,
            custo: true,
          },
        },
      },
      orderBy: {
        data: 'desc',
      },
    });

    const resgatesFormatados = resgates.map((r) => ({
      id: r.id,
      aluno: r.aluno.nome,
      email: r.aluno.email,
      vantagem: r.vantagem.titulo,
      custo: r.vantagem.custo,
      data: r.data,
      cupom: r.codigo,
      utilizado: false,
    }));

    res.json(resgatesFormatados);
  } catch (error) {
    console.error('Erro ao buscar resgates da empresa:', error);
    res.status(500).json({ error: 'Erro ao buscar resgates da empresa' });
  }
};

module.exports = {
  getEmpresas,
  getEmpresaById,
  createEmpresa,
  updateEmpresa,
  deleteEmpresa,
  getResgatesEmpresa,
};

