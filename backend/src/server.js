const express = require('express');
const cors = require('cors');
require('dotenv').config();

const alunoRoutes = require('./routes/alunoRoutes');
const empresaRoutes = require('./routes/empresaRoutes');
const professorRoutes = require('./routes/professorRoutes');
const transacaoRoutes = require('./routes/transacaoRoutes');
const vantagemRoutes = require('./routes/vantagemRoutes');

const app = express();

app.use(cors());
app.use(express.json());

// Rotas
app.use('/api/alunos', alunoRoutes);
app.use('/api/empresas', empresaRoutes);
app.use('/api/professores', professorRoutes);
app.use('/api/transacoes', transacaoRoutes);
app.use('/api/vantagens', vantagemRoutes);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
