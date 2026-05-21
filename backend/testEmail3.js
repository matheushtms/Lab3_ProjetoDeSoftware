require('dotenv').config({ path: require('path').resolve(__dirname, './src/../.env') });
const { sendCoinTransferEmailToAluno } = require('./src/services/emailService');

async function run() {
  console.log("Testing email to matheusht180@gmail.com...");
  await sendCoinTransferEmailToAluno("matheusht180@gmail.com", "Giovanna alves", "Professor", 100, "Teste");
  console.log("Done.");
}

run();
