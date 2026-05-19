const express = require('express');
const cors = require('cors');
require('dotenv').config();

const alunoRoutes = require('./routes/alunoRoutes');
const empresaRoutes = require('./routes/empresaRoutes');

const app = express();

app.use(cors());
app.use(express.json());

// Rotas
app.use('/api/alunos', alunoRoutes);
app.use('/api/empresas', empresaRoutes);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
