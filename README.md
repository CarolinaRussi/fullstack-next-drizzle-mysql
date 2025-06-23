Projeto de Empresa e Licenças

Projeto fullstack baseado em Next.js 13+ com App Router, utilizando MySQL rodando via Docker e o ORM Drizzle para manipulação do banco.

### Tecnologias Utilizadas

- Next.js 13+ (App Router) — Framework React para frontend e backend juntos.
- MySQL — Banco de dados relacional, rodando em container Docker.
- Docker & Docker Compose — Para orquestração e execução do banco localmente.
- Drizzle ORM — ORM leve para TypeScript/JavaScript, facilitando queries e migrations.
- mysql2 — Driver Node.js para conexão com MySQL.

### Como rodar o projeto localmente

## Pré-requisitos:

- Docker e Docker Compose instalados e rodando na máquina local.
- Node.js (preferencialmente LTS, ex: v18 ou superior) instalado para rodar o Next.js.
- npm ou yarn — gerenciador de pacotes para instalar dependências.

## 1. Clone o projeto

git clone https://github.com/seu-usuario/fullstack-next-drizzle-mysql.git
cd fullstack-next-drizzle-mysql

## 2. Copie o arquivo de exemplo .env.example para .env e configure as variáveis (se necessario)

## 3. Suba o container do banco MySQL com Docker Compose pelo terminal com o comando:

docker-compose up -d

## 4. Instale as dependências do projeto com o comando:

npm install

# ou yarn

## 5. Rode os comandos para aplicar migrations (via Drizzle):

npm run migrate

# ou yarn

## 6. Inicie o servidor Next.js

npm run dev

# ou yarn

Pronto!
Abra [http://localhost:3000](http://localhost:3000) no navegador e já pode começar a usar.