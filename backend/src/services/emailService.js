const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const escapeHtml = (value) => String(value ?? '')
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;')
  .replace(/'/g, '&#039;');

const brandMark = `
  <div style="width: 78px; height: 78px; border-radius: 26px; background: linear-gradient(135deg, #ffffff 0%, #dcfce7 50%, #86efac 100%); display: inline-block; position: relative; text-align: center; box-shadow: 0 18px 36px rgba(2, 44, 34, 0.24);">
    <div style="position: absolute; left: 15px; top: 18px; width: 48px; height: 15px; border-radius: 999px; background: linear-gradient(90deg, #022c22, #166534); transform: rotate(-10deg);"></div>
    <div style="position: absolute; left: 23px; bottom: 16px; width: 32px; height: 12px; border-radius: 4px 4px 10px 10px; background: #ffffff; border: 1px solid rgba(22, 101, 52, 0.28);"></div>
    <div style="position: absolute; right: 10px; top: 12px; width: 18px; height: 18px; border-radius: 999px; background: linear-gradient(135deg, #fde68a, #f59e0b); border: 1px solid rgba(255,255,255,0.8);"></div>
    <div style="position: absolute; left: 0; right: 0; top: 28px; font-family: Arial, Helvetica, sans-serif; font-size: 27px; font-weight: 900; letter-spacing: -3px; color: #022c22;">C<span style="color: #16a34a;">E</span></div>
  </div>
`;

const detailRow = (label, value) => `
  <tr>
    <td style="padding: 12px 0; border-bottom: 1px solid #eeeeef; font-size: 12px; font-weight: 800; letter-spacing: 1.2px; text-transform: uppercase; color: #8a8f98;">${label}</td>
    <td align="right" style="padding: 12px 0; border-bottom: 1px solid #eeeeef; font-size: 14px; font-weight: 800; color: #111111;">${value}</td>
  </tr>
`;

const renderEmailShell = ({ preheader, title, subtitle, badge, children, footerNote }) => `
  <!doctype html>
  <html lang="pt-BR">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <title>${title}</title>
    </head>
    <body style="margin: 0; padding: 0; background: #e9e9eb; font-family: Arial, Helvetica, sans-serif; color: #18181b;">
      <div style="display: none; max-height: 0; overflow: hidden; opacity: 0; color: transparent;">${preheader}</div>
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background: #e9e9eb; padding: 34px 14px;">
        <tr>
          <td align="center">
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width: 680px; border-collapse: separate; border-spacing: 0;">
              <tr>
                <td style="border-radius: 26px; overflow: hidden; background: #ffffff; box-shadow: 0 26px 70px rgba(15, 23, 42, 0.18);">
                  <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                    <tr>
                      <td width="188" valign="top" style="background: linear-gradient(145deg, #4ade80 0%, #16a34a 42%, #021209 100%); padding: 34px 24px; color: #ffffff;">
                        ${brandMark}
                        <div style="margin-top: 34px; font-size: 11px; letter-spacing: 4px; font-weight: 800; text-transform: uppercase; color: rgba(255,255,255,0.72);">CoinEdu</div>
                        <div style="margin-top: 12px; font-size: 28px; line-height: 0.96; font-weight: 900; letter-spacing: -1px; text-transform: uppercase;">${badge}</div>
                        <div style="width: 42px; height: 4px; border-radius: 999px; background: #ffffff; margin-top: 22px;"></div>
                      </td>
                      <td valign="top" style="padding: 36px 38px 34px;">
                        <div style="font-size: 11px; font-weight: 800; letter-spacing: 3px; color: #16a34a; text-transform: uppercase;">Portal Universitario</div>
                        <h1 style="margin: 14px 0 8px; font-size: 28px; line-height: 1.05; letter-spacing: -0.8px; color: #111111;">${title}</h1>
                        <p style="margin: 0; font-size: 14px; line-height: 1.6; color: #5f6368;">${subtitle}</p>
                        ${children}
                        <div style="border-top: 1px solid #ececef; margin-top: 30px; padding-top: 20px;">
                          <p style="margin: 0; font-size: 13px; line-height: 1.6; color: #5f6368;">${footerNote}</p>
                          <p style="margin: 12px 0 0; font-size: 13px; font-weight: 800; color: #111111;">Equipe CoinEdu</p>
                        </div>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
  </html>
`;

const renderPointsCard = (label, value, caption) => `
  <div style="margin-top: 28px; border-radius: 22px; background: #111111; color: #ffffff; padding: 24px;">
    <div style="font-size: 12px; letter-spacing: 2px; font-weight: 800; text-transform: uppercase; color: #a7f3d0;">${label}</div>
    <div style="margin-top: 8px; font-size: 48px; line-height: 1; font-weight: 900; letter-spacing: -2px;">${value}</div>
    <div style="margin-top: 6px; font-size: 13px; color: rgba(255,255,255,0.72);">${caption}</div>
  </div>
`;

const renderReasonBlock = (label, reason) => `
  <div style="margin-top: 22px; border-left: 5px solid #16a34a; background: #f4fbf7; border-radius: 0 16px 16px 0; padding: 18px 20px;">
    <div style="font-size: 12px; font-weight: 900; letter-spacing: 1.5px; text-transform: uppercase; color: #16a34a;">${label}</div>
    <p style="margin: 8px 0 0; font-size: 15px; line-height: 1.65; color: #2f3137;">${reason}</p>
  </div>
`;

const sendCoinTransferEmailToAluno = async (alunoEmail, alunoNome, professorNome, valor, motivo) => {
  const safeAlunoNome = escapeHtml(alunoNome);
  const safeProfessorNome = escapeHtml(professorNome);
  const safeValor = escapeHtml(valor);
  const safeMotivo = escapeHtml(motivo);

  const mailOptions = {
    from: `"Portal Universitario" <${process.env.EMAIL_USER}>`,
    to: alunoEmail,
    subject: 'Notificacao: voce recebeu um novo reconhecimento academico',
    html: renderEmailShell({
      preheader: `Voce recebeu ${safeValor} pontos de reconhecimento no CoinEdu.`,
      badge: 'Reconhecimento recebido',
      title: `Ola, ${safeAlunoNome}!`,
      subtitle: 'Seu desempenho foi reconhecido e os pontos ja foram registrados no sistema.',
      footerNote: 'Continue participando das atividades academicas e acumulando reconhecimento.',
      children: `
        ${renderPointsCard('Pontos recebidos', safeValor, 'pontos de reconhecimento academico')}
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-top: 22px;">
          ${detailRow('Professor', safeProfessorNome)}
          ${detailRow('Aluno', safeAlunoNome)}
        </table>
        ${renderReasonBlock('Motivo', safeMotivo)}
      `,
    }),
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Email de recebimento enviado com sucesso para ${alunoEmail}`);
  } catch (error) {
    console.error(`Erro ao enviar email para ${alunoEmail}:`, error);
  }
};

const sendCoinTransferEmailToProfessor = async (professorEmail, professorNome, alunoNome, valor, motivo) => {
  const safeProfessorNome = escapeHtml(professorNome);
  const safeAlunoNome = escapeHtml(alunoNome);
  const safeValor = escapeHtml(valor);
  const safeMotivo = escapeHtml(motivo);

  const mailOptions = {
    from: `"Portal Universitario" <${process.env.EMAIL_USER}>`,
    to: professorEmail,
    subject: 'Comprovante de envio de reconhecimento academico',
    html: renderEmailShell({
      preheader: `Seu envio de ${safeValor} pontos para ${safeAlunoNome} foi registrado.`,
      badge: 'Comprovante de envio',
      title: `Ola, ${safeProfessorNome}!`,
      subtitle: 'Seu reconhecimento foi registrado com sucesso no CoinEdu.',
      footerNote: 'Obrigado por incentivar o merito e fortalecer a jornada dos seus alunos.',
      children: `
        ${renderPointsCard('Envio confirmado', safeValor, 'pontos enviados ao aluno')}
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-top: 22px;">
          ${detailRow('Professor', safeProfessorNome)}
          ${detailRow('Aluno', safeAlunoNome)}
          ${detailRow('Status', '<span style="color: #16a34a;">Registrado</span>')}
        </table>
        ${renderReasonBlock('Motivo registrado', safeMotivo)}
      `,
    }),
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Email de comprovante enviado com sucesso para ${professorEmail}`);
  } catch (error) {
    console.error(`Erro ao enviar email para ${professorEmail}:`, error);
  }
};

const sendResgateEmailToAluno = async (alunoEmail, alunoNome, vantagemTitulo, empresaNome, codigo) => {
  const safeAlunoNome = escapeHtml(alunoNome);
  const safeVantagemTitulo = escapeHtml(vantagemTitulo);
  const safeEmpresaNome = escapeHtml(empresaNome);
  const safeCodigo = escapeHtml(codigo);
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(codigo)}`;

  const mailOptions = {
    from: `"CoinEdu" <${process.env.EMAIL_USER}>`,
    to: alunoEmail,
    subject: 'Comprovante de resgate de vantagem',
    html: renderEmailShell({
      preheader: `Seu codigo de resgate ${safeCodigo} ja esta disponivel.`,
      badge: 'Vantagem resgatada',
      title: `Parabens, ${safeAlunoNome}!`,
      subtitle: 'Seu resgate foi confirmado. Apresente o codigo ou QR Code para utilizar a vantagem.',
      footerNote: 'Aproveite sua vantagem e continue se destacando no CoinEdu.',
      children: `
        <div style="margin-top: 28px; border-radius: 22px; background: #111111; color: #ffffff; padding: 24px;">
          <div style="font-size: 12px; letter-spacing: 2px; font-weight: 800; text-transform: uppercase; color: #a7f3d0;">Codigo de resgate</div>
          <div style="margin-top: 10px; font-size: 34px; line-height: 1; font-weight: 900; letter-spacing: 4px;">${safeCodigo}</div>
        </div>
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-top: 22px;">
          ${detailRow('Vantagem', safeVantagemTitulo)}
          ${detailRow('Empresa', safeEmpresaNome)}
        </table>
        <div style="margin-top: 22px; border-radius: 20px; background: #f7f7f8; padding: 22px; text-align: center;">
          <div style="font-size: 12px; font-weight: 900; letter-spacing: 1.5px; text-transform: uppercase; color: #16a34a;">QR Code</div>
          <img src="${qrCodeUrl}" alt="QR Code ${safeCodigo}" style="display: block; width: 150px; height: 150px; margin: 14px auto 0; border-radius: 14px; border: 10px solid #ffffff;" />
        </div>
      `,
    }),
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Email de resgate enviado com sucesso para ${alunoEmail}`);
  } catch (error) {
    console.error(`Erro ao enviar email de resgate para ${alunoEmail}:`, error);
  }
};

const sendResgateEmailToEmpresa = async (empresaEmail, empresaNome, alunoNome, alunoEmail, vantagemTitulo, codigo) => {
  const safeEmpresaNome = escapeHtml(empresaNome);
  const safeAlunoNome = escapeHtml(alunoNome);
  const safeAlunoEmail = escapeHtml(alunoEmail);
  const safeVantagemTitulo = escapeHtml(vantagemTitulo);
  const safeCodigo = escapeHtml(codigo);

  const mailOptions = {
    from: `"CoinEdu" <${process.env.EMAIL_USER}>`,
    to: empresaEmail,
    subject: 'Notificacao de resgate de vantagem',
    html: renderEmailShell({
      preheader: `Um aluno resgatou a vantagem ${safeVantagemTitulo}.`,
      badge: 'Resgate notificado',
      title: `Ola, ${safeEmpresaNome}!`,
      subtitle: 'Um aluno acabou de realizar o resgate de uma vantagem oferecida pela sua empresa.',
      footerNote: 'Valide o codigo apresentado pelo aluno para confirmar o uso da vantagem no seu estabelecimento.',
      children: `
        <div style="margin-top: 28px; border-radius: 22px; background: #111111; color: #ffffff; padding: 24px;">
          <div style="font-size: 12px; letter-spacing: 2px; font-weight: 800; text-transform: uppercase; color: #a7f3d0;">Codigo a ser validado</div>
          <div style="margin-top: 10px; font-size: 34px; line-height: 1; font-weight: 900; letter-spacing: 4px;">${safeCodigo}</div>
        </div>
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-top: 22px;">
          ${detailRow('Vantagem', safeVantagemTitulo)}
          ${detailRow('Aluno', safeAlunoNome)}
          ${detailRow('Email do Aluno', safeAlunoEmail)}
        </table>
      `,
    }),
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Email de notificacao de resgate enviado com sucesso para ${empresaEmail}`);
  } catch (error) {
    console.error(`Erro ao enviar email de notificacao para ${empresaEmail}:`, error);
  }
};

module.exports = {
  sendCoinTransferEmailToAluno,
  sendCoinTransferEmailToProfessor,
  sendResgateEmailToAluno,
  sendResgateEmailToEmpresa
};

