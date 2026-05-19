
# Lab3_ProjetoDeSoftware


<table>
  <tr>
    <td width="800px">
      <div align="justify">
        O Sistema de Moeda Estudantil é uma aplicação desenvolvida com o objetivo de incentivar o reconhecimento do mérito acadêmico por meio de uma moeda virtual. Professores podem distribuir moedas aos alunos como forma de recompensa por desempenho, participação e comportamento, enquanto os alunos podem acumular e trocar essas moedas por benefícios oferecidos por empresas parceiras.
O sistema permite o cadastro e autenticação de alunos, professores e empresas, além do gerenciamento de saldo, histórico de transações e resgate de vantagens. As empresas parceiras podem cadastrar produtos ou serviços com um custo em moedas, que podem ser adquiridos pelos alunos através do sistema.
      </div>
    </td>
    <td>
      <div>
        <img src="https://joaopauloaramuni.github.io/image/logo_ES_vertical.png" alt="Logo do Projeto" width="120px"/>
      </div>
    </td>
  </tr> 
</table>


---

## Diagrama de caso de uso
<img width="1536" height="1024" alt="Diagrama de caso uso" src="https://github.com/user-attachments/assets/6b762dcb-455e-4633-ab89-600931402a2d" />

---

## Diagrama de classes
<img width="1536" height="1024" alt="Diagrama de classes" src="https://github.com/user-attachments/assets/3162eea2-5037-43a8-bd1a-22820321694e" />

---
## Diagrama de componentes
<img width="2450" height="1632" alt="_Diagrama de componentes_" src="https://github.com/user-attachments/assets/9605afa2-4f30-4ba1-b84f-7f2c6522c864" />

---
## Histórias do Usuário
<img width="1129" height="1393" alt="Historia de usuario" src="https://github.com/user-attachments/assets/73d73090-b94d-4b65-8ae2-5170b67e746d" />

---
## Estratégia de acesso ao banco de dados
Para o Sistema de Moeda Estudantil, a estratégia de acesso ao banco de dados adotada foi baseada em ORM (Object-Relational Mapping), utilizando JPA/Hibernate no back-end com Spring Boot. Essa abordagem permite que as entidades do sistema sejam representadas por classes Java, enquanto os registros são armazenados em tabelas do banco de dados relacional MySQL.

O uso de ORM facilita o desenvolvimento porque reduz a necessidade de SQL manual, melhora a organização do código e mantém maior alinhamento entre a modelagem do sistema e a implementação. Além disso, o acesso aos dados foi estruturado com o padrão Repository/DAO, responsável por concentrar as operações de persistência, como cadastro, busca, atualização e exclusão de registros.

Na prática, a aplicação foi organizada em camadas seguindo a arquitetura MVC. A camada de Controller recebe as requisições do front-end, a camada de Service aplica as regras de negócio, e a camada de Repository realiza a comunicação com o banco de dados. As classes de domínio, como Aluno, EmpresaParceira e Instituicao, foram mapeadas com anotações do JPA para representar as tabelas do banco.

A configuração da conexão com o MySQL foi feita no arquivo application.properties, informando a URL do banco, usuário, senha e a estratégia de geração automática de tabelas com ddl-auto=update. Dessa forma, ao iniciar a aplicação, o Hibernate cria e atualiza as tabelas conforme as entidades do projeto.

Essa estratégia foi escolhida por oferecer simplicidade, manutenção facilitada, boa organização do código e facilidade de evolução para as próximas funcionalidades do sistema.

---
## Modelo ER
<img width="1536" height="1024" alt="Moselo ER" src="https://github.com/user-attachments/assets/96501363-f093-49a4-921b-d764b916581f" />


