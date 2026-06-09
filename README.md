#  Sistema de Moeda Estudantil

<p align="center">
  <img src="https://joaopauloaramuni.github.io/image/logo_ES_vertical.png" alt="Logo Engenharia de Software" width="150px"/>
</p>

<p align="center">
  <strong>Plataforma web gamificada para incentivo do mérito acadêmico através do reconhecimento por moeda virtual.</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Material--UI-0081CB?style=for-the-badge&logo=material-ui&logoColor=white" alt="Material UI" />
  <br/>
  <img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/Express.js-404D59?style=for-the-badge&logo=express" alt="Express" />
  <img src="https://img.shields.io/badge/Prisma-398279?style=for-the-badge&logo=Prisma&logoColor=white" alt="Prisma ORM" />
  <img src="https://img.shields.io/badge/MySQL-00000F?style=for-the-badge&logo=mysql&logoColor=white" alt="MySQL" />
</p>

---

##  Visão Geral

<p align="justify">
  O <strong>Sistema de Moeda Estudantil</strong> é uma aplicação desenvolvida com o objetivo de incentivar o reconhecimento do mérito acadêmico por meio de uma moeda virtual. Professores podem distribuir moedas aos alunos como forma de recompensa por desempenho, participação e comportamento, enquanto os alunos podem acumular e trocar essas moedas por benefícios e vantagens exclusivas oferecidas por empresas parceiras.
</p>

<p align="justify">
  O sistema permite o cadastro e autenticação de alunos, professores e empresas, além do gerenciamento completo de saldo, histórico de transações e resgate de vantagens. As empresas parceiras têm a autonomia de cadastrar produtos ou serviços com um custo específico em moedas, que ficam disponíveis para aquisição pelos alunos diretamente na plataforma.
</p>

---

##  Tecnologias Utilizadas

O projeto foi reestruturado seguindo as melhores práticas modernas de desenvolvimento full-stack web, composto por um ecossistema robusto e altamente responsivo:

### 💻 Front-end
* **Core:** [React](https://react.dev/) com [TypeScript](https://www.typescriptlang.org/)
* **Build Tool:** [Vite](https://vite.dev/) (Rápido e otimizado)
* **Estilização:** [Tailwind CSS v4](https://tailwindcss.com/) & [Material UI (MUI)](https://mui.com/)
* **Componentes:** [Radix UI](https://www.radix-ui.com/) para acessibilidade e interações fluidas
* **Animações:** [Motion (Framer Motion)](https://motion.dev/)
* **Notificações:** [Sonner](https://sonner.emilkowal.ski/)

### ⚙️ Back-end
* **Ambiente:** [Node.js](https://nodejs.org/) com [Express.js](https://expressjs.com/)
* **ORM:** [Prisma ORM](https://www.prisma.io/) (Mapeamento de banco de dados com tipagem automática)
* **Banco de Dados:** [MySQL](https://www.mysql.com/)
* **Serviço de E-mail:** [Nodemailer](https://nodemailer.com/) (Envio de cupons de resgate e notificações automáticas)

---

##  Modelagem e Arquitetura do Sistema

###  Diagrama de Casos de Uso
O diagrama abaixo mapeia os atores do sistema (Aluno, Professor e Empresa) e suas respectivas interações dentro do ecossistema de moedas virtuais.
<p align="center">
  <img width="100%" alt="Diagrama de caso uso" src="https://github.com/user-attachments/assets/6b762dcb-455e-4633-ab89-600931402a2d" />
</p>

###  Diagrama de Classes
Representação das classes do sistema, seus atributos, métodos e os relacionamentos essenciais para o funcionamento do negócio.
<p align="center">
  <img width="100%" alt="Diagrama de classes" src="https://github.com/user-attachments/assets/3162eea2-5037-43a8-bd1a-22820321694e" />
</p>

###  Diagrama de Componentes
Visão arquitetural demonstrando a organização dos módulos do sistema e a forma como se comunicam.
<p align="center">
  <img width="100%" alt="Diagrama de componentes" src="https://github.com/user-attachments/assets/9605afa2-4f30-4ba1-b84f-7f2c6522c864" />
</p>

###  Modelo Entidade-Relacionamento (ER)
Estrutura de dados desenhada para o banco de dados relacional, mapeando tabelas, chaves primárias e estrangeiras.
<p align="center">
  <img width="100%" alt="Modelo ER" src="https://github.com/user-attachments/assets/96501363-f093-49a4-921b-d764b916581f" />
</p>

---

##  Histórias do Usuário
Detalhamento dos requisitos do sistema sob a perspectiva das necessidades dos usuários finais.
<p align="center">
  <img width="80%" alt="Histórias de Usuário" src="https://github.com/user-attachments/assets/73d73090-b94d-4b65-8ae2-5170b67e746d" />
</p>

---

###  Diagrama de Sequência Geral

<<<<<<< HEAD
#### 1. Fluxo de Autenticação e Login
```mermaid
sequenceDiagram
    autonumber
    actor Usuario as Usuário (Aluno/Prof/Empresa)
    participant Front as Frontend (LoginPage.tsx)
    participant Router as Backend Router (Express)
    participant Ctrl as Controllers (aluno/prof/empresaController)
    database DB as Prisma / MySQL

    Usuario->>Front: Seleciona perfil, insere Email e Senha
    Usuario->>+Front: Clica em "Entrar" (Síncrono)
    
    alt Perfil selecionado: Aluno
        Front->>+Router: GET /api/alunos
        Router->>+Ctrl: getAlunos(req, res)
        Ctrl->>+DB: prisma.aluno.findMany()
        DB-->>-Ctrl: Retorna array de alunos
        Ctrl-->>-Router: Retorna JSON
        Router-->>-Front: 200 OK (Array de Alunos JSON)
    else Perfil selecionado: Professor
        Front->>+Router: GET /api/professores
        Router->>+Ctrl: getProfessores(req, res)
        Ctrl->>+DB: prisma.professor.findMany()
        DB-->>-Ctrl: Retorna array de professores
        Ctrl-->>-Router: Retorna JSON
        Router-->>-Front: 200 OK (Array de Professores JSON)
    else Perfil selecionado: Empresa Parceira
        Front->>+Router: GET /api/empresas
        Router->>+Ctrl: getEmpresas(req, res)
        Ctrl->>+DB: prisma.empresaParceira.findMany()
        DB-->>-Ctrl: Retorna array de empresas
        Ctrl-->>-Router: Retorna JSON
        Router-->>-Front: 200 OK (Array de Empresas JSON)
    end
=======
## Fluxo de Autenticação e Entrada no Sistema
<img width="753" height="583" alt="image" src="https://github.com/user-attachments/assets/d546edbe-e523-40c6-aa7e-df521f5a64f3" />

##Fluxo de Distribuição de Moedas (Professor ➔ Aluno)
>>>>>>> 71444fba6b507e2a836b7e970634ddb3074fc8cf

<img width="1150" height="633" alt="image" src="https://github.com/user-attachments/assets/26110abe-1cb6-4c90-97fc-0fd355d634ec" />

<<<<<<< HEAD
    alt Credenciais Válidas
        Front-->>Usuario: Redireciona para o Dashboard específico
    else Credenciais Inválidas
        Front-->>-Usuario: Exibe alerta "Email não encontrado ou senha incorreta!"
    end
```

#### 2. Fluxo de Distribuição de Moedas (Professor ➔ Aluno)
```mermaid
sequenceDiagram
    autonumber
    actor Prof as Professor
    participant Front as Frontend (ProfessorDashboard.tsx)
    participant Router as Backend Router (Express)
    participant Ctrl as TransacaoController (transacaoController.js)
    database DB as Prisma / MySQL
    queue Nodemailer as emailService (Nodemailer)
    actor Aluno as Aluno (Notificado)

    Prof->>Front: Seleciona Aluno, insere Valor e Motivo
    Prof->>+Front: Clica em "Enviar Moedas" (Síncrono)
    Front->>+Router: POST /api/transacoes/enviar (JSON body)
    Router->>+Ctrl: enviarMoedas(req, res)
    
    Note over Ctrl: Valida dados básicos (campos vazios, valor <= 0)

    Ctrl->>+DB: Buscar dados do Professor (prisma.professor.findUnique)
    DB-->>-Ctrl: Registro do Professor
    
    Ctrl->>+DB: Buscar dados do Aluno (prisma.aluno.findUnique)
    DB-->>-Ctrl: Registro do Aluno

    alt Professor ou Aluno não existem
        Ctrl-->>-Router: 404 Not Found
        Router-->>-Front: 404 Not Found
        Front-->>-Prof: Exibe mensagem de erro
    else Sucesso na validação

        rect rgb(30, 41, 59)
            Note over Ctrl, DB: Execução da Transação no Banco ($transaction)
            Ctrl->>+DB: tx.aluno.update (Incrementa saldo do Aluno)
            DB-->>-Ctrl: Confirmação
            Ctrl->>+DB: tx.transacao.create (Registra histórico da transação)
            DB-->>-Ctrl: Confirmação e dados criados
        end

        Note over Ctrl, Nodemailer: Processamento Assíncrono de E-mails
        par Notificar Aluno
            Ctrl->Nodemailer: sendCoinTransferEmailToAluno(...) (Assíncrono)
            Nodemailer->Aluno: Envia e-mail de recebimento (Assíncrono)
        and Notificar Professor
            Ctrl->Nodemailer: sendCoinTransferEmailToProfessor(...) (Assíncrono)
            Nodemailer->Prof: Envia e-mail de confirmação de envio (Assíncrono)
        end

        Ctrl-->>-Router: 201 Created (Objeto Transação)
        Router-->>-Front: 201 Created (Objeto Transação)
        Front-->>-Prof: Exibe notificação de sucesso via Sonner
    end
```

#### 3. Fluxo de Resgate de Vantagens (Aluno ➔ Empresa)
```mermaid
sequenceDiagram
    autonumber
    actor Aluno as Aluno
    participant Front as Frontend (AlunoDashboard.tsx)
    participant Router as Backend Router (Express)
    participant Ctrl as VantagemController (vantagemController.js)
    database DB as Prisma / MySQL
    queue Nodemailer as emailService (Nodemailer)
    actor Empresa as Empresa Parceira (Notificada)

    Aluno->>Front: Visualiza a Vitrine de Vantagens
    Aluno->>+Front: Clica em "Resgatar" na Vantagem desejada (Síncrono)
    Front->>+Router: POST /api/vantagens/resgatar (JSON body)
    Router->>+Ctrl: resgatarVantagem(req, res)

    Ctrl->>+DB: Buscar dados do Aluno
    DB-->>-Ctrl: Retorna Aluno (saldo atual)
    Ctrl->>+DB: Buscar Vantagem e Empresa Parceira
    DB-->>-Ctrl: Retorna Vantagem e dados da Empresa

    alt Saldo do Aluno < Custo da Vantagem
        Ctrl-->>-Router: 400 Bad Request (Saldo insuficiente)
        Router-->>-Front: 400 Bad Request
        Front-->>-Aluno: Exibe "Saldo insuficiente para resgatar..."
    else Já resgatou a vantagem anteriormente
        Ctrl->>+DB: Buscar se já existe resgate (findFirst)
        DB-->>-Ctrl: Resgate existente encontrado
        Ctrl-->>-Router: 400 Bad Request (Já resgatou)
        Router-->>-Front: 400 Bad Request
        Front-->>-Aluno: Exibe "Você já resgatou esta vantagem."
    else Saldo Suficiente e Válido
        Note over Ctrl: Gerar código único alfanumérico (ex: RESG-F8A2D9)
        
        rect rgb(30, 41, 59)
            Note over Ctrl, DB: Execução da Transação no Banco ($transaction)
            Ctrl->>+DB: tx.aluno.update (Decrementa saldo do Aluno)
            DB-->>-Ctrl: Confirmação
            Ctrl->>+DB: tx.resgate.create (Cria cupom com o código alfanumérico)
            DB-->>-Ctrl: Retorna dados do Resgate
        end

        Note over Ctrl, Nodemailer: Processamento Assíncrono de E-mails
        par Notificar Aluno
            Ctrl->Nodemailer: sendResgateEmailToAluno(...) (Assíncrono)
            Nodemailer->Aluno: Envia e-mail com cupom gerado (Assíncrono)
        and Notificar Empresa
            Ctrl->Nodemailer: sendResgateEmailToEmpresa(...) (Assíncrono)
            Nodemailer->Empresa: Envia e-mail com dados do resgate e código do cupom (Assíncrono)
        end

        Ctrl-->>-Router: 201 Created (Objeto Resgate com Código)
        Router-->>-Front: 201 Created
        Front->>Front: Atualiza saldo local e exibe cupom resgatado
        Front-->>-Aluno: Notificação de resgate efetuado com sucesso
    end
```

#### 4. Fluxo de Gerenciamento de Vantagens (Empresa)
```mermaid
sequenceDiagram
    autonumber
    actor Empresa as Empresa Parceira
    participant Front as Frontend (EmpresaDashboard.tsx)
    participant Router as Backend Router (Express)
    participant Ctrl as VantagemController (vantagemController.js)
    database DB as Prisma / MySQL

    Empresa->>Front: Preenche formulário (Título, Descrição, Custo, Imagem)
    Empresa->>+Front: Clica em "Salvar Vantagem" (Síncrono)
    Front->>+Router: POST /api/vantagens (JSON body)
    Router->>+Ctrl: criarVantagem(req, res)

    Ctrl->>+DB: Buscar se Empresa existe (prisma.empresaParceira.findUnique)
    DB-->>-Ctrl: Registro da Empresa

    alt Empresa não encontrada
        Ctrl-->>-Router: 404 Not Found
        Router-->>-Front: 404 Not Found
        Front-->>-Empresa: Exibe erro de empresa inválida
    else Empresa existente
        Ctrl->>+DB: prisma.vantagem.create (Insere nova Vantagem no MySQL)
        DB-->>-Ctrl: Retorna a nova Vantagem criada
        Ctrl-->>-Router: 201 Created (Vantagem JSON)
        Router-->>-Front: 201 Created
        Front->>Front: Atualiza a lista local de vantagens da empresa
        Front-->>-Empresa: Exibe aviso de vantagem cadastrada com sucesso!
    end
```
=======
##Fluxo de Resgate de Vantagens (Aluno ➔ Empresa)

<img width="884" height="571" alt="image" src="https://github.com/user-attachments/assets/7e81d643-709f-4dcd-b57d-7b168880edf2" />

##Fluxo de Gerenciamento de Vantagens (Empresa Parceira)

<img width="971" height="493" alt="image" src="https://github.com/user-attachments/assets/c76185f8-8a73-4d13-bd6d-8544879d7173" />
>>>>>>> 71444fba6b507e2a836b7e970634ddb3074fc8cf




##  Estratégia de Acesso ao Banco de Dados

Para o Sistema de Moeda Estudantil, a estratégia de acesso ao banco de dados foi construída com foco em **segurança, robustez e performance**. Adotou-se o modelo **ORM (Object-Relational Mapping)** utilizando o **Prisma ORM** acoplado ao banco de dados relacional **MySQL**.

### Principais Vantagens da Abordagem adotada com Prisma:
* **Segurança e Tipagem:** O Prisma gera automaticamente tipos TypeScript mapeados diretamente no banco de dados, prevenindo consultas incorretas ou bugs em tempo de desenvolvimento.
* **Manutenibilidade:** O arquivo unificado `schema.prisma` simplifica o gerenciamento das entidades (`Aluno`, `Professor`, `Transacao`, `EmpresaParceira`, `Vantagem`, `Resgate`) e seus respectivos relacionamentos de forma intuitiva.
* **Migrações e Deploy Ágil:** Operações de evolução de esquema são controladas diretamente, facilitando a replicação do ambiente de banco de dados local ou em produção.

### Arquitetura de Camadas do Back-end:
A aplicação backend foi desenhada de forma desacoplada e modular, garantindo facilidade de expansão futura:
1. **Routes (`src/routes`):** Define os endpoints HTTP expostos da API REST e direciona as requisições.
2. **Controllers (`src/controllers`):** Valida os parâmetros de entrada HTTP e responde de forma padronizada.
3. **Services (`src/services`):** Concentra a lógica de negócio principal (ex: validação de saldo ao realizar transferência de moedas, lógica de resgate de cupons de vantagens e despacho de e-mails automáticos via Nodemailer).
4. **Prisma Client (`src/prismaClient.js`):** Instância unificada responsável por realizar consultas de alta performance no banco de dados.

### Configuração de Banco de Dados:
A conexão é gerenciada através de variáveis de ambiente no arquivo `.env` localizado na raiz da pasta `backend`. A propriedade `DATABASE_URL` aponta diretamente para a instância do MySQL, permitindo inicializar as tabelas de forma limpa e automática ao rodar a ferramenta Prisma CLI.

---

##  Como Executar o Projeto

###  Pré-requisitos
Antes de começar, você precisará ter instalado em sua máquina:
* [Node.js](https://nodejs.org/) (Versão 18 ou superior recomendada)
* [MySQL Server](https://dev.mysql.com/downloads/mysql/) ativo
* Gerenciador de pacotes **NPM** (ou PNPM/Yarn de sua preferência)

---

###  Passos para Inicialização

#### 1. Clonar o repositório
Abra o terminal e execute o comando:
```bash
git clone https://github.com/matheushtms/Lab3_ProjetoDeSoftware.git
cd Lab3_ProjetoDeSoftware
```

---

#### 2. Configurando e Executando o Back-end

1. Navegue até o diretório do backend:
   ```bash
   cd backend
   ```
2. Instale as dependências necessárias:
   ```bash
   npm install
   ```
3. Crie e configure o arquivo `.env` na raiz do diretório `backend`. Você pode utilizar o seguinte modelo (ajuste os valores conforme as credenciais do seu MySQL):
   ```env
   # Credenciais de conexão do MySQL
   DATABASE_URL="mysql://root:SUA_SENHA@127.0.0.1:3306/banco_app"
   PORT=3001

   # Configurações para envio de e-mails (Nodemailer)
   EMAIL_USER="seu-email-gmail@gmail.com"
   EMAIL_PASS="sua-senha-de-aplicativo"
   ```
4. Sincronize o banco de dados e crie as tabelas automaticamente usando o Prisma:
   ```bash
   npx prisma db push
   ```
5. Inicie o servidor em modo de desenvolvimento:
   ```bash
   npm run dev
   ```
   > [!NOTE]
   > O servidor backend iniciará e estará escutando requisições na porta **3001** (`http://localhost:3001`).

---

#### 3. Configurando e Executando o Front-end

1. Abra uma nova janela de terminal e navegue até a pasta do frontend:
   ```bash
   cd front
   ```
2. Instale as dependências do projeto:
   ```bash
   npm install
   ```
3. Inicie o servidor de desenvolvimento do Vite:
   ```bash
   npm run dev
   ```
   > [!NOTE]
   > O front-end estará pronto para acesso direto no seu navegador em `http://localhost:5173`.

---

##  Interface e Experiência do Usuário

A plataforma apresenta painéis interativos adaptados para cada tipo de usuário com recursos como:
* **Painel do Aluno:** Consulta de saldo atualizado em tempo real, visualização detalhada do extrato de recebimentos, vitrine interativa de vantagens e resgate imediato de cupons com geração automática de código único.
* **Painel do Professor:** Envio instantâneo de moedas com escolha de valor e justificativa personalizada, e extrato completo das moedas enviadas.
* **Painel da Empresa:** Gerenciamento da vitrine de vantagens (cadastro, edição e exclusão de benefícios) e validação de cupons resgatados por alunos.
* **Design Moderno:** Temas claro/escuro integrados (Light/Dark Mode) utilizando animações fluidas via Framer Motion para uma experiência de usuário excepcional.
