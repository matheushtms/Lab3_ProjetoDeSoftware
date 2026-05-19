#  Sistema de Moeda Estudantil

<p align="center">
  <img src="https://joaopauloaramuni.github.io/image/logo_ES_vertical.png" alt="Logo Engenharia de Software" width="150px"/>
</p>

<p align="justify">
  O <strong>Sistema de Moeda Estudantil</strong> é uma aplicação desenvolvida com o objetivo de incentivar o reconhecimento do mérito acadêmico por meio de uma moeda virtual. Professores podem distribuir moedas aos alunos como forma de recompensa por desempenho, participação e comportamento, enquanto os alunos podem acumular e trocar essas moedas por benefícios e vantagens exclusivas oferecidas por empresas parceiras.
</p>

<p align="justify">
  O sistema permite o cadastro e autenticação de alunos, professores e empresas, além do gerenciamento completo de saldo, histórico de transações e resgate de vantagens. As empresas parceiras têm a autonomia de cadastrar produtos ou serviços com um custo específico em moedas, que ficam disponíveis para aquisição pelos alunos diretamente na plataforma.
</p>

---

##  Tecnologias Utilizadas

O projeto foi estruturado seguindo as melhores práticas de desenvolvimento de software, utilizando o ecossistema Java e ferramentas modernas de modelagem:
* **Back-end:** Java com Spring Boot
* **Persistência de Dados:** JPA / Hibernate (ORM)
* **Banco de Dados:** MySQL
* **Arquitetura:** MVC (Model-View-Controller) / Padrão Repository

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

##  Estratégia de Acesso ao Banco de Dados

Para o Sistema de Moeda Estudantil, a estratégia de acesso ao banco de dados adotada foi baseada em **ORM (Object-Relational Mapping)**, utilizando **JPA/Hibernate** no back-end com Spring Boot. Essa abordagem permite que as entidades do sistema sejam representadas por classes Java, enquanto os registros são armazenados de forma transparente em tabelas do banco de dados relacional **MySQL**.

### Benefícios da abordagem ORM:
* **Produtividade:** Reduz drasticamente a necessidade de SQL manual para operações básicas.
* **Manutenibilidade:** Melhora a organização do código e mantém maior alinhamento entre a modelagem de domínio e a persistência.
* **Desacoplamento:** O acesso aos dados foi estruturado utilizando o padrão **Repository/DAO**, responsável por isolar as operações de persistência (cadastro, busca, atualização e exclusão).

### Arquitetura de Camadas:
A aplicação foi organizada em camadas bem definidas seguindo a arquitetura MVC:
1. **Controller:** Recebe as requisições do front-end e gerencia os endpoints REST.
2. **Service:** Concentra as regras de negócio e validações do sistema.
3. **Repository:** Realiza de fato a comunicação e consultas junto ao banco de dados.

As classes de domínio, como `Aluno`, `EmpresaParceira` e `Instituicao`, foram totalmente mapeadas com anotações do JPA.

### Configuração:
A conexão com o MySQL é gerenciada através do arquivo `application.properties`, onde são fornecidos os dados de ambiente (URL, usuário e senha) junto à estratégia de geração automática de tabelas `ddl-auto=update`. Dessa forma, o Hibernate cria e atualiza o esquema do banco dinamicamente com base nas entidades mapeadas ao iniciar a aplicação.

---

##  Como Executar o Projeto

### Pré-requisitos
* Java 17 ou superior instalado
* MySQL Server ativo
* Maven ou Gradle configurado

### Passos para execução
1. Clone o repositório:
   ```bash
   git clone [https://github.com/seu-usuario/Lab3_ProjetoDeSoftware.git](https://github.com/seu-usuario/Lab3_ProjetoDeSoftware.git)
