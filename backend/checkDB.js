const prisma = require('./src/prismaClient');

async function checkLastTx() {
  const tx = await prisma.transacao.findFirst({
    orderBy: { data: 'desc' },
    include: { aluno: true, professor: true }
  });
  console.log(`Última transação ID: ${tx.id}`);
  console.log(`Aluno: ${tx.aluno.nome} (${tx.aluno.email})`);
  console.log(`Professor: ${tx.professor.nome} (${tx.professor.email})`);
}

checkLastTx().catch(console.error).finally(() => process.exit());
