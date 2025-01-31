# API Pedidos

Este é um serviço de gerenciamento de pedidos com funcionalidades como criação de pedidos, validação de estoque, e integração com banco de dados **PostgreSQL**. A aplicação foi implementada utilizando **Node.js** e **NestJS**, e utiliza **Docker** para a containerização dos serviços.

### Atenção: Endpoints que não precisam de autenticação products e users.

## Tecnologias Usadas

- **Node.js** (versão estável)
- **NestJS** (framework para Node.js)
- **PostgreSQL** (banco de dados relacional)
- **Docker** (para containerização dos serviços)
- **PrismaORM** (para ORM com PostgreSQL)
- **JWT** (para autenticação via token)

## Pré-requisitos

- **Docker** e **Docker Compose** instalados
- **Node.js** e **npm** instalados (caso queira rodar a aplicação sem Docker)
- **PostgreSQL** em funcionamento (no caso de não usar Docker)

## Como Rodar o Projeto

Este projeto pode ser executado utilizando **Docker** para facilitar a configuração dos serviços. Siga os passos abaixo para rodar a aplicação no seu ambiente local.

### Passo 1: Clone o Repositório

Clone o repositório para o seu ambiente local:

```bash
git clone https://github.com/Douglas-00/Api-Pedidos.git
cd Api-Pedidos
```

### Passo 2: aplicação depende de algumas variáveis de ambiente. Crie um arquivo .env na raiz do projeto com os seguintes valores:

```bash
DATABASE_URL="postgresql://root:password@db:5432/order"
JWT_SECRET="secret"
JWT_EXPIRATION_TIME="3600"
```

### Passo 3: Subir os Containers com Docker Compose

Com o arquivo .env configurado, você pode iniciar os serviços com o Docker Compose. Este comando irá construir a imagem da aplicação e iniciar os containers:

```bash
docker-compose up --build -d
```

### Passo 4: Executar Migration, criar tabelas.

```bash
npx prisma migrate dev
```

### Passo 5: Executar Migration, criar tabelas.

```bash
docker-compose exec app npx prisma migrate dev

```

### Passo 6: Testar a Aplicação.

Com a aplicação rodando, você pode testar os endpoints da API utilizando o Postman ou qualquer outra ferramenta de sua preferência.

### Passo 7: Link para a Documentação da API.

```bash
http://localhost:3000/api/pedidos

```

### Passo 8: Testes Unitários.

```bash
npm run test

```
