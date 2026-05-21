require('dotenv').config({ path: require('path').resolve(__dirname, './src/../.env') });
const { sendCoinTransferEmailToAluno } = require('./src/services/emailService');

async function run() {
  console.log("Testing email to matheushtmalta@gmail.com...");
  await sendCoinTransferEmailToAluno("matheushtmalta@gmail.com", "Matheus", "Professor", 150, "Teste de funcionamento");
  console.log("Done.");
}

run();
