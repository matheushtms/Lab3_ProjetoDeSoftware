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

const sendResgateEmailToAluno = async (alunoEmail, alunoNome, vantagemTitulo, empresaNome, codigo) => {
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${codigo}`;
  
  const mailOptions = {
    from: `"Sistema de Moedas" <${process.env.EMAIL_USER}>`,
    to: alunoEmail,
    subject: 'Comprovante de Resgate de Vantagem 🎁',
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
        <h2 style="color: #9C27B0;">Parabéns, ${alunoNome}!</h2>
        <p>Você resgatou com sucesso a vantagem: <strong>${vantagemTitulo}</strong> oferecida por <strong>${empresaNome}</strong>.</p>
        
        <div style="margin: 20px 0; padding: 15px; background-color: #f5f5f5; border-radius: 8px; text-align: center;">
          <p style="font-size: 18px; margin-bottom: 10px;">Seu Código de Resgate:</p>
          <h1 style="color: #333; letter-spacing: 2px;">${codigo}</h1>
          <p style="font-size: 14px; color: #666; margin-top: 15px;">Apresente este QR Code no estabelecimento:</p>
          <img src="${qrCodeUrl}" alt="QR Code ${codigo}" style="margin-top: 10px;" />
        </div>
        
        <br/>
        <p>Aproveite sua vantagem e continue se destacando!</p>
        <p>Atenciosamente,</p>
        <p><strong>Equipe do Sistema de Moedas Universitárias</strong></p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Email de resgate enviado com sucesso para ${alunoEmail}`);
  } catch (error) {
    console.error(`Erro ao enviar email de resgate para ${alunoEmail}:`, error);
  }
};

module.exports = {
  sendCoinTransferEmailToAluno,
  sendCoinTransferEmailToProfessor,
  sendResgateEmailToAluno
};
