const API_ALUNOS = "/api/alunos";
const API_EMPRESAS = "/api/empresas";
const API_INSTITUICOES = "/api/instituicoes";

// ==================== INSTITUIÇÕES ====================
async function carregarInstituicoes() {
  const select = document.getElementById("instituicaoId");
  if (!select) return;

  try {
    const response = await fetch(API_INSTITUICOES);
    if (!response.ok) {
      throw new Error("Erro ao carregar instituições.");
    }

    const instituicoes = await response.json();

    select.innerHTML = '<option value="">Selecione a instituição</option>';

    instituicoes.forEach((inst) => {
      const option = document.createElement("option");
      option.value = inst.id;
      option.textContent = inst.nome;
      select.appendChild(option);
    });
  } catch (error) {
    console.error(error);
    alert("Não foi possível carregar as instituições.");
  }
}

// ==================== ALUNOS ====================
async function carregarAlunos() {
  const tbody = document.getElementById("listaAlunos");
  if (!tbody) return;

  try {
    const response = await fetch(API_ALUNOS);
    if (!response.ok) {
      throw new Error("Erro ao carregar alunos.");
    }

    const alunos = await response.json();
    tbody.innerHTML = "";

    alunos.forEach((aluno) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${aluno.id ?? ""}</td>
        <td>${aluno.nome ?? ""}</td>
        <td>${aluno.email ?? ""}</td>
        <td>${aluno.cpf ?? ""}</td>
        <td>${aluno.curso ?? ""}</td>
        <td>${aluno.instituicao?.nome ?? ""}</td>
        <td>
          <div class="actions">
            <button class="small-btn edit" onclick='editarAluno(${JSON.stringify(aluno)})'>Editar</button>
            <button class="small-btn delete" onclick="excluirAluno(${aluno.id})">Excluir</button>
          </div>
        </td>
      `;
      tbody.appendChild(tr);
    });
  } catch (error) {
    console.error(error);
    alert("Não foi possível carregar os alunos.");
  }
}

async function salvarAluno(event) {
  event.preventDefault();

  const id = document.getElementById("alunoId").value;
  const instituicaoId = document.getElementById("instituicaoId").value;

  if (!instituicaoId) {
    alert("Selecione uma instituição.");
    return;
  }

  const aluno = {
    nome: document.getElementById("nome").value,
    email: document.getElementById("email").value,
    cpf: document.getElementById("cpf").value,
    rg: document.getElementById("rg").value,
    endereco: document.getElementById("endereco").value,
    curso: document.getElementById("curso").value,
    instituicaoId: Number(instituicaoId)
  };

  const metodo = id ? "PUT" : "POST";
  const url = id ? `${API_ALUNOS}/${id}` : API_ALUNOS;

  try {
    const response = await fetch(url, {
      method: metodo,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(aluno)
    });

    if (!response.ok) {
      const erroTexto = await response.text();
      throw new Error(erroTexto || "Erro ao salvar aluno.");
    }

    document.getElementById("formAluno").reset();
    document.getElementById("alunoId").value = "";
    document.getElementById("instituicaoId").value = "";
    carregarAlunos();
  } catch (error) {
    console.error(error);
    alert("Erro ao salvar aluno.");
  }
}

function editarAluno(aluno) {
  document.getElementById("alunoId").value = aluno.id ?? "";
  document.getElementById("nome").value = aluno.nome ?? "";
  document.getElementById("email").value = aluno.email ?? "";
  document.getElementById("cpf").value = aluno.cpf ?? "";
  document.getElementById("rg").value = aluno.rg ?? "";
  document.getElementById("endereco").value = aluno.endereco ?? "";
  document.getElementById("curso").value = aluno.curso ?? "";
  document.getElementById("instituicaoId").value = aluno.instituicao?.id ?? "";
}

async function excluirAluno(id) {
  if (!confirm("Deseja realmente excluir este aluno?")) return;

  try {
    const response = await fetch(`${API_ALUNOS}/${id}`, {
      method: "DELETE"
    });

    if (!response.ok) {
      throw new Error("Erro ao excluir aluno.");
    }

    carregarAlunos();
  } catch (error) {
    console.error(error);
    alert("Erro ao excluir aluno.");
  }
}

// ==================== EMPRESAS ====================
async function carregarEmpresas() {
  const tbody = document.getElementById("listaEmpresas");
  if (!tbody) return;

  try {
    const response = await fetch(API_EMPRESAS);
    if (!response.ok) {
      throw new Error("Erro ao carregar empresas.");
    }

    const empresas = await response.json();
    tbody.innerHTML = "";

    empresas.forEach((empresa) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${empresa.id ?? ""}</td>
        <td>${empresa.nome ?? ""}</td>
        <td>${empresa.email ?? ""}</td>
        <td>${empresa.cnpj ?? ""}</td>
        <td>
          <div class="actions">
            <button class="small-btn edit" onclick='editarEmpresa(${JSON.stringify(empresa)})'>Editar</button>
            <button class="small-btn delete" onclick="excluirEmpresa(${empresa.id})">Excluir</button>
          </div>
        </td>
      `;
      tbody.appendChild(tr);
    });
  } catch (error) {
    console.error(error);
    alert("Não foi possível carregar as empresas.");
  }
}

async function salvarEmpresa(event) {
  event.preventDefault();

  const id = document.getElementById("empresaId").value;

  const empresa = {
    nome: document.getElementById("nome").value,
    email: document.getElementById("email").value,
    cnpj: document.getElementById("cnpj").value,
    descricao: document.getElementById("descricao").value
  };

  const metodo = id ? "PUT" : "POST";
  const url = id ? `${API_EMPRESAS}/${id}` : API_EMPRESAS;

  try {
    const response = await fetch(url, {
      method: metodo,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(empresa)
    });

    if (!response.ok) {
      const erroTexto = await response.text();
      throw new Error(erroTexto || "Erro ao salvar empresa.");
    }

    document.getElementById("formEmpresa").reset();
    document.getElementById("empresaId").value = "";
    carregarEmpresas();
  } catch (error) {
    console.error(error);
    alert("Erro ao salvar empresa.");
  }
}

function editarEmpresa(empresa) {
  document.getElementById("empresaId").value = empresa.id ?? "";
  document.getElementById("nome").value = empresa.nome ?? "";
  document.getElementById("email").value = empresa.email ?? "";
  document.getElementById("cnpj").value = empresa.cnpj ?? "";
  document.getElementById("descricao").value = empresa.descricao ?? "";
}

async function excluirEmpresa(id) {
  if (!confirm("Deseja realmente excluir esta empresa?")) return;

  try {
    const response = await fetch(`${API_EMPRESAS}/${id}`, {
      method: "DELETE"
    });

    if (!response.ok) {
      throw new Error("Erro ao excluir empresa.");
    }

    carregarEmpresas();
  } catch (error) {
    console.error(error);
    alert("Erro ao excluir empresa.");
  }
}

// ==================== INICIALIZAÇÃO ====================
window.addEventListener("DOMContentLoaded", () => {
  const formAluno = document.getElementById("formAluno");
  if (formAluno) {
    formAluno.addEventListener("submit", salvarAluno);
    carregarInstituicoes();
    carregarAlunos();
  }

  const formEmpresa = document.getElementById("formEmpresa");
  if (formEmpresa) {
    formEmpresa.addEventListener("submit", salvarEmpresa);
    carregarEmpresas();
  }
});