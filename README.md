# Fastify Prisma API

API completa desenvolvida com Fastify, Prisma ORM e Swagger para documentação, utilizando PostgreSQL como banco de dados.

## Tecnologias

- Node.js
- TypeScript
- Fastify
- Prisma ORM
- PostgreSQL (via Docker)
- Zod (validação e documentação)
- Swagger UI

## Requisitos

- Node.js (v18+)
- NPM ou Yarn ou PNPM
- Docker e Docker Compose

## Configuração do Ambiente

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/fastify-prisma-api.git
cd fastify-prisma-api
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure as variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto com o seguinte conteúdo:

```env
# Environment variables
NODE_ENV=development
SERVER_PORT=3333

# Database
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/fastify_prisma_db"

# Auth
JWT_SECRET="sua_chave_secreta_aqui"
```

### 4. Inicie o banco de dados PostgreSQL com Docker

```bash
docker-compose up -d
```

### 5. Execute as migrações do Prisma

```bash
npx prisma migrate dev --name init
```

### 6. Gere o cliente Prisma

```bash
npx prisma generate
```

## Executando a aplicação

### Modo de desenvolvimento

```bash
npm run dev
```

### Modo de produção

```bash
npm run build
npm start
```

## Documentação da API

Após iniciar a aplicação, acesse a documentação Swagger:

```
http://localhost:3333/docs
```

## Estrutura do Projeto

```
📦 fastify-prisma-api
 ┣ 📂 prisma
 ┃ ┗ 📜 schema.prisma       # Schema do Prisma
 ┣ 📂 src
 ┃ ┣ 📂 http
 ┃ ┃ ┣ 📂 routes
 ┃ ┃ ┃ ┣ 📂 categories      # Rotas de categoria
 ┃ ┃ ┃ ┗ 📂 products        # Rotas de produto
 ┃ ┃ ┗ 📜 error-handler.ts  # Manipulador de erros
 ┃ ┣ 📂 lib
 ┃ ┃ ┗ 📜 prisma.ts         # Cliente Prisma
 ┃ ┣ 📜 env.ts              # Variáveis de ambiente
 ┃ ┗ 📜 server.ts           # Configuração do servidor
 ┣ 📜 .env                  # Variáveis de ambiente
 ┣ 📜 docker-compose.yml    # Configuração Docker
 ┣ 📜 package.json          # Dependências
 ┗ 📜 tsconfig.json         # Configuração TypeScript
```

## Endpoints

A API oferece os seguintes endpoints:

### Categorias

- **GET** `/categories` - Lista todas as categorias
- **GET** `/categories/:id` - Obtém uma categoria por ID
- **POST** `/categories` - Cria uma nova categoria
- **PUT** `/categories/:id` - Atualiza uma categoria existente
- **DELETE** `/categories/:id` - Remove uma categoria

### Produtos

- **GET** `/products` - Lista todos os produtos
- **GET** `/products/:id` - Obtém um produto por ID
- **POST** `/products` - Cria um novo produto
- **PUT** `/products/:id` - Atualiza um produto existente
- **DELETE** `/products/:id` - Remove um produto

## Scripts disponíveis

- `npm run dev` - Inicia o servidor em modo de desenvolvimento
- `npm run build` - Compila o TypeScript para JavaScript
- `npm start` - Executa a versão compilada
- `npm run prisma:generate` - Gera o cliente Prisma
- `npm run prisma:migrate` - Executa as migrações do banco de dados
- `npm run prisma:studio` - Abre o Prisma Studio para visualizar o banco de dados

## Variáveis de Ambiente

| Variável | Descrição | Valor padrão |
|----------|-----------|--------------|
| NODE_ENV | Ambiente de execução | development |
| SERVER_PORT | Porta do servidor | 3333 |
| DATABASE_URL | URL de conexão com o banco de dados | postgresql://postgres:postgres@localhost:5432/fastify_prisma_db |
| JWT_SECRET | Chave secreta para JWT | (precisa ser definida) |

## Problemas comuns

### Erro de conexão com o banco de dados

Verifique se:
- O Docker está em execução
- O container do PostgreSQL está ativo (`docker ps`)
- As credenciais no `.env` estão corretas

### Porta já em uso

Se a porta 3333 já estiver em uso, altere a variável `SERVER_PORT` no arquivo `.env`.

### Erro na execução das migrações

Se encontrar erros nas migrações, tente:
```bash
npx prisma migrate reset
npx prisma migrate dev --name init
```

## Contribuição

Sinta-se à vontade para contribuir com este projeto. Abra uma issue ou envie um pull request!

## Licença

Este projeto está licenciado sob a licença MIT.