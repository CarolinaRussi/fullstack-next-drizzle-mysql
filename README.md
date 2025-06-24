# Projeto de Empresa e Licenças

Projeto fullstack baseado em Next.js 13+ com App Router, utilizando MySQL rodando via Docker e o ORM Drizzle para manipulação do banco.

## Tecnologias Utilizadas

- Next.js 13+ (App Router) — Framework React para frontend e backend juntos.
- MySQL — Banco de dados relacional, rodando em container Docker.
- Docker & Docker Compose — Para orquestração e execução do banco localmente.
- Drizzle ORM — ORM leve para TypeScript/JavaScript, facilitando queries e migrations.
- mysql2 — Driver Node.js para conexão com MySQL.

## Como rodar o projeto localmente

### Pré-requisitos:

- [Docker](https://www.docker.com/) e [Docker Compose](https://docs.docker.com/compose/) instalados.
- [Node.js](https://nodejs.org/) LTS (v18 ou superior).
- `npm` ou `yarn` instalados.

### Passos:

1. Clone o projeto

git clone https://github.com/seu-usuario/fullstack-next-drizzle-mysql.git
cd fullstack-next-drizzle-mysql

2. Configure as variaveis de ambiente

Copie o arquivo de exemplo .env.example para .env e configure as variáveis (se necessario)

Preencha

- DATABASE_URL
- MYSQL_ROOT_PASSWORD
- MYSQL_DATABASE
- MYSQL_USER
- MYSQL_PASSWORD
- MYSQL_HOST
- MYSQL_PORT

3. Suba o container do banco MySQL com Docker Compose pelo terminal com o comando:

docker-compose up -d

4. Instale as dependências do projeto com o comando:

npm install

ou

yarn

5. Rode os comandos para aplicar migrations (via Drizzle):

npm run drizzle:push

ou

yarn drizzle:push

6. Inicie o servidor Next.js

npm run dev

ou

yarn dev

# Pronto!

Acesse no navegador:

[http://localhost:3000](http://localhost:3000)

Você já pode usar a aplicação para cadastrar empresas e licenças

# Deploy em produção

O projeto está publicado e pode ser acessado online pelo link:

[https://fullstack-next-drizzle-mysq-git-3d0efa-carolina-russis-projects.vercel.app/](https://fullstack-next-drizzle-mysq-git-3d0efa-carolina-russis-projects.vercel.app/)

### Funcionalidades

- Cadastro de empresas.

- Cadastro e gerenciamento de licenças ambientais vinculadas às empresas.

- Listagem, edição e exclusão de registros.
