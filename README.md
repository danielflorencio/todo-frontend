## Todo-list em React

Este é um projeto de um simples projeto de lista de tarefas desenvolvido em React, criado como parte do desafio técnico para o processo seletivo de desenvolvedor júnior. 

O objetivo deste projeto é avaliar a compreensão básica do React, a capacidade de criar interfaces de usuário, e a integração com recursos externos, como APIs. 

Este projeto conta com persistência de dados e autenticação JWT, e foi desenvolvido para ser utilizado junto de uma API externa.

No meu caso, eu decidi criar a minha própria API.

Tanto a API quanto o banco de dados estão rodando numa mesma instância EC2 da AWS...

E só para que fique claro, este projeto ainda está longe de estar completo. 

Por questões de tempo, não pude refatorar algumas coisas que sei que poderiam estar melhor no código, nem realizar o deploy do frontend da aplicação, já que sei que alguns bugs de configuração no projeto irão demorar um certo tempo para poderem ser consertados, porém, sei que pude demonstrar bastante certas habilidades.

Desde podendo fazer o CRUD completo da aplicação no frontend, quanto no backend, e realizando o deploy do backend em um ambiente Linux na plataforma da Amazon.

Sem mais enrolação, vamos às informações relevantes: 

### Funcionalidades

- Interface Básica: Uma interface simples com um cabeçalho que exibe o título "Painel de Tarefas" e uma área onde as tarefas são exibidas.
- Adicionar Tarefa: Os usuários podem adicionar tarefas por meio de um campo de entrada de texto, especificando a prioridade da tarefa (Alta, Média ou Baixa).
- Lista de Tarefas: As tarefas são exibidas em uma lista, classificadas por prioridade (decrescente). As tarefas concluídas têm um estilo diferente
- Remover Tarefa: Os usuários podem remover tarefas não concluídas clicando em um botão de remoção ao lado de cada tarefa.
- Editar Tarefa: Os usuários podem editar tarefas clicando em um botão de edição ao lado de cada tarefa. Isso permite que eles atualizem o texto da tarefa.
- Filtros de Tarefas: Filtros permitem aos usuários visualizar tarefas concluídas ou não concluídas, bem como filtrar tarefas por prioridade.
- Responsividade: A interface é responsiva e se adapta a dispositivos móveis e desktops.
- Persistência de Dados: As tarefas são mantidas mesmo após o usuário sair e voltar à aplicação através de uma API Node JS externa hospedada numa instância EC2 da AWS.
- Controle de Acesso de Usuário: Os usuários podem fazer login na aplicação. Suas tarefas e estados são restaurados após o login. Isso inclui autenticação via JWT.

## Como rodar o projeto

1. Em um terminal com Git instalado, clone este repositório:


``git clone https://github.com/danielflorencio/todo-frontend.git``

2. Navegue até o diretório do projeto:

``cd todo-frontend``

3. Considerando que você já tenha o NPM instalado na sua máquina, instale as dependências:

``npm install``


4. Inicie o servidor de desenvolvimento:

``npm run dev``

5. Abra o seu Browser e digite a seguinte URL:

``http://localhost:5173/sign-up``

## A partir de agora é só usar a aplicação.

É importante notar, que você precisa se cadastrar para poder acessar as funcionalidades. 

Então, quando visualizar a página de sign-up, você deve realizar o cadastro, depois utilizar os mesmos dados do cadastro na página de login.

### Informações extras

Se por via de curiosidades você tiver ficado curioso para dar uma olhada na API, aqui está o link do repositório: 

https://github.com/danielflorencio/todo-backend 

API realizada utilizando TypeScript, Node Js, Express JS, e utilizando o PostgreSQL como banco de dados. 

PS.: O Código que está em produção na AWS teve algumas alterações e não está exatamente igual no repositório, por questões de variáveis de ambiente, CORS, configurações de ambiente de produção e entre outras. 
