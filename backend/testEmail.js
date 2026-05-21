require('dotenv').config();
const { sendCoinTransferEmailToAluno } = require('./src/services/emailService');

async function run() {
  console.log("Testing email...");
  await sendCoinTransferEmailToAluno("matheusht100@gmail.com", "Test Aluno", "Test Professor", 100, "Test");
  console.log("Done.");
}

run();
