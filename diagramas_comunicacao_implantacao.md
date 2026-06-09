# 📐 Diagramas do Sistema & Envio de Cupons por E-mail (com QR Code)

Este documento detalha os novos **Diagramas de Comunicação** e **Diagramas de Implantação** para o ecossistema do **Sistema de Moeda Estudantil**, bem como a arquitetura e validação da **implementação do envio de cupons por e-mail com QR Code**.

---

## 🔗 1. Diagrama de Comunicação (Interaction/Communication Diagram)

O diagrama a seguir representa as interações estruturadas entre os objetos e componentes do sistema durante o caso de uso de **Resgate de Vantagem**. As mensagens são numeradas em ordem cronológica de execução.

```mermaid
flowchart TD
    %% Nós
    Aluno(["👤 :Aluno"])
    FrontUI["💻 :AlunoDashboard (UI)"]
    Router["🚀 :vantagemRoutes (Router)"]
    Controller["⚙️ :vantagemController (Control)"]
    Prisma["💎 :prismaClient (ORM)"]
    EmailServ["✉️ :emailService (Service)"]
    Nodemailer["📧 :NodemailerTransporter"]

    %% Conexões de Comunicação
    Aluno ---|1: clicarResgatarVantagem| FrontUI
    FrontUI ---|1.1: POST /api/vantagens/resgatar| Router
    Router ---|1.2: resgatarVantagem(req, res)| Controller
    Controller ---|1.3: findUnique(alunoId)| Prisma
    Controller ---|1.4: findUnique(vantagemId)| Prisma
    Controller ---|1.5: $transaction(debitarSaldo, registrarResgate)| Prisma
    Controller ---|1.6: sendResgateEmailToAluno(...) e sendResgateEmailToEmpresa(...)| EmailServ
    EmailServ ---|1.6.1: generateQRCodeUrl & sendMail()| Nodemailer
```

### Explicação dos Passos:
1. **`1: clicarResgatarVantagem`**: O Aluno interage com a interface do dashboard de vantagens.
2. **`1.1: POST /api/vantagens/resgatar`**: A UI realiza uma chamada HTTP POST para a rota do backend.
3. **`1.2: resgatarVantagem`**: O roteador do Express encaminha os dados ao controlador do sistema.
4. **`1.3 / 1.4: findUnique`**: O controlador consulta o banco de dados via Prisma para checar se o aluno e a vantagem existem e validar se o aluno tem saldo suficiente.
5. **`1.5: $transaction`**: Caso validado, executa uma transação atômica que debita as moedas do aluno e insere o registro na tabela `Resgate` gerando o código alfanumérico.
6. **`1.6: sendResgateEmailToAluno/Empresa`**: O controlador aciona o serviço assíncrono de e-mails.
7. **`1.6.1: generateQRCodeUrl`**: O serviço gera a URL do QR Code e usa o Nodemailer para despachar o e-mail via SMTP.

---

## 🏗️ 2. Diagrama de Implantação (Deployment Diagram)

O diagrama de implantação descreve a topologia física da infraestrutura de hardware (nós) e os artefatos de software executados em cada máquina.

```mermaid
flowchart TD
    subgraph ClientNode ["💻 Dispositivo Cliente (Navegador)"]
        Browser["🌐 Web Browser (Chrome/Firefox/Safari)"]
        subgraph FrontArtifact ["📦 Artefato Frontend"]
            ReactApp["⚛️ React SPA App (Vite, TS, Tailwind CSS)"]
        end
        Browser -.->|Executa em memória| ReactApp
    end

    subgraph AppServerNode ["🖥️ Servidor de Aplicação (Express Backend)"]
        NodeJS["🟢 Node.js Runtime Environment"]
        subgraph BackArtifact ["📦 Artefato Backend API"]
            ExpressApp["🚀 Express.js Application Server"]
            PrismaClient["💎 Prisma ORM Client"]
        end
        NodeJS -.->|Executa| ExpressApp
        ExpressApp --> PrismaClient
    end

    subgraph DBServerNode ["🗄️ Servidor de Banco de Dados (MySQL)"]
        MySQLNode["🐬 MySQL Database Server"]
        subgraph DBSchema ["💾 Schema banco_app"]
            Tables["Tabelas: Aluno, Professor, EmpresaParceira, Vantagem, Resgate, Transacao"]
        end
        MySQLNode -.->|Hospeda| Tables
    end

    subgraph ExternalServices ["☁️ Serviços Cloud Externos"]
        SMTPGmail["✉️ Servidor SMTP (Gmail TLS/SSL)"]
        QRServer["🖼️ API QR Code (api.qrserver.com)"]
    end

    %% Protocolos e Portas
    Browser ===|HTTPS (JSON API / Porta 3001)| ExpressApp
    PrismaClient ===|TCP/IP (MySQL Connection / Porta 3306)| MySQLNode
    ExpressApp ===|SMTP (Portas 465/587)| SMTPGmail
    Browser ===|HTTPS (Visualização Imagem / Porta 443)| QRServer
```

---

## 📧 3. Implementação do Caso de Uso: Envio de Cupons por E-mail com QR Code

O caso de uso de resgate de vantagens (troca) gera um cupom com um código alfanumérico e um **QR Code único gerado automaticamente** para apresentação na empresa.

### Onde está localizado no código?
* **Roteamento**: A requisição de resgate é enviada para `POST /api/vantagens/resgatar` no arquivo [vantagemRoutes.js](file:///c:/Users/matheus.soares/Desktop/Lab3_ProjetoDeSoftware/backend/src/routes/vantagemRoutes.js).
* **Processamento e Debito de Saldo**: O método `resgatarVantagem` do controlador [vantagemController.js](file:///c:/Users/matheus.soares/Desktop/Lab3_ProjetoDeSoftware/backend/src/controllers/vantagemController.js) processa a transação e faz a chamada assíncrona dos e-mails.
* **Geração de QR Code e Envio**: As funções `sendResgateEmailToAluno` e `sendResgateEmailToEmpresa` estão implementadas em [emailService.js](file:///c:/Users/matheus.soares/Desktop/Lab3_ProjetoDeSoftware/backend/src/services/emailService.js).

### Como o QR Code é gerado?
No arquivo [emailService.js](file:///c:/Users/matheus.soares/Desktop/Lab3_ProjetoDeSoftware/backend/src/services/emailService.js#L171), o sistema utiliza a API do `qrserver.com` para gerar dinamicamente a imagem do QR Code a partir do código único do cupom gerado:
```javascript
const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(codigo)}`;
```
Essa imagem é inserida no corpo HTML do e-mail do aluno em uma tag `<img>` renderizada no cliente de e-mail de forma direta e responsiva:
```html
<img src="${qrCodeUrl}" alt="QR Code ${safeCodigo}" style="display: block; width: 150px; height: 150px; margin: 14px auto 0; border-radius: 14px; border: 10px solid #ffffff;" />
```

---

## 🧪 4. Scripts e Testes Automatizados de E-mail

Para demonstrar o funcionamento e validar a integração de e-mail com QR Code em tempo de desenvolvimento, você pode executar o script de teste criado em [testResgateEmail.js](file:///c:/Users/matheus.soares/Desktop/Lab3_ProjetoDeSoftware/backend/testResgateEmail.js):

```bash
cd backend
node testResgateEmail.js
```

**Resultado de execução com sucesso:**
```text
=== Testando Envio de E-mails de Resgate ===
1. Enviando e-mail de cupom para o Aluno (matheushtmalta@gmail.com)...
Email de resgate enviado com sucesso para matheushtmalta@gmail.com
2. Enviando e-mail de notificação para a Empresa (contato@rupremium.com.br)...
Email de notificacao de resgate enviado com sucesso para contato@rupremium.com.br
=== Teste Finalizado! ===
```
