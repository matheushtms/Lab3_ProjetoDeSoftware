const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendCoinTransferEmailToAluno = async (alunoEmail, alunoNome, professorNome, valor, motivo) => {
  const mailOptions = {
    from: `"Sistema de Moedas" <${process.env.EMAIL_USER}>`,
    to: alunoEmail,
    subject: 'Você recebeu novas moedas! 🪙',
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
        <h2 style="color: #4CAF50;">Olá, ${alunoNome}!</h2>
        <p>Você acabou de receber <strong>${valor} moedas</strong> do professor <strong>${professorNome}</strong>.</p>
        <p><strong>Motivo:</strong> ${motivo}</p>
        <br/>
        <p>Continue com o excelente trabalho!</p>
        <p>Atenciosamente,</p>
        <p><strong>Equipe do Sistema de Moedas Universitárias</strong></p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Email de recebimento enviado com sucesso para ${alunoEmail}`);
  } catch (error) {
    console.error(`Erro ao enviar email para ${alunoEmail}:`, error);
  }
};

const sendCoinTransferEmailToProfessor = async (professorEmail, professorNome, alunoNome, valor, motivo) => {
  const mailOptions = {
    from: `"Sistema de Moedas" <${process.env.EMAIL_USER}>`,
    to: professorEmail,
    subject: 'Comprovante de envio de moedas 📤',
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
        <h2 style="color: #2196F3;">Olá, ${professorNome}!</h2>
        <p>Seu envio de <strong>${valor} moedas</strong> para o aluno <strong>${alunoNome}</strong> foi realizado com sucesso.</p>
        <p><strong>Motivo registrado:</strong> ${motivo}</p>
        <br/>
        <p>Obrigado por reconhecer o mérito dos seus alunos!</p>
        <p>Atenciosamente,</p>
        <p><strong>Equipe do Sistema de Moedas Universitárias</strong></p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Email de comprovante enviado com sucesso para ${professorEmail}`);
  } catch (error) {
    console.error(`Erro ao enviar email para ${professorEmail}:`, error);
  }
};

module.exports = {
  sendCoinTransferEmailToAluno,
  sendCoinTransferEmailToProfessor,
};
