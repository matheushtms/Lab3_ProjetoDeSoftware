require('dotenv').config({ path: require('path').resolve(__dirname, './.env') });
const { sendResgateEmailToAluno, sendResgateEmailToEmpresa } = require('./src/services/emailService');

async function testResgateEmails() {
  const testAlunoEmail = "matheushtmalta@gmail.com";
  const testEmpresaEmail = "contato@rupremium.com.br";
  const studentName = "Matheus Henrique Malta";
  const advantageTitle = "Almoço Grátis Premium no R.U.";
  const companyName = "Restaurante Universitário Premium";
  const redemptionCode = "RESG-TEST99";

  console.log("=== Testando Envio de E-mails de Resgate ===");
  
  console.log(`1. Enviando e-mail de cupom para o Aluno (${testAlunoEmail})...`);
  await sendResgateEmailToAluno(
    testAlunoEmail,
    studentName,
    advantageTitle,
    companyName,
    redemptionCode
  );

  console.log(`2. Enviando e-mail de notificação para a Empresa (${testEmpresaEmail})...`);
  await sendResgateEmailToEmpresa(
    testEmpresaEmail,
    companyName,
    studentName,
    testAlunoEmail,
    advantageTitle,
    redemptionCode
  );

  console.log("=== Teste Finalizado! ===");
}

testResgateEmails().catch(console.error);
