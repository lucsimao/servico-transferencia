# Serviço de Transferências

[![License: MIT](https://img.shields.io/badge/License-MIT-red.svg)](https://opensource.org/licenses/MIT) [![codecov](https://codecov.io/gh/lucsimao/servico-transferencia/branch/master/graph/badge.svg?token=S02C34WGQ3)](https://codecov.io/gh/lucsimao/servico-transferencia) [![Mutation testing badge](https://img.shields.io/endpoint?style=flat&url=https%3A%2F%2Fbadge-api.stryker-mutator.io%2Fgithub.com%2Flucsimao%2Fservico-transferencia%2FPR-3)](https://dashboard.stryker-mutator.io/reports/github.com/lucsimao/servico-transferencia/PR-3)

Este projeto consiste no desafio de criação de uma api de transferência.

## Autor

- [@lucsimao](https://www.github.com/lucsimao)

# Sumário

- [Requisitos](#Requisitos)
- [Instalação](#Instalação)
- [Teste](#Teste)
- [Tecnologias](#Tecnologias)
- [Referências](#Referências)

# Requisitos

Para a utilização deste projeto, recomenda-se as seguintes tecnologias:

- [NodeJs](https://nodejs.org/en/download/)
- [Docker](https://www.docker.com/products/docker-desktop)

# Instalação

Para instalar esse projeto:

```
$ git clone https://github.com/lucsimao/servico-transferencia
```

```
  $ npm install
```

# Inicialização

- Para iniciar este projeto execute os seguintes comandos:

## Docker

```
  $ docker-compose up -d
```

## Modo desenvolvedor

Configurar o banco de dados

```
  $ docker-compose up -d database database-dashboard
  $ npm run db:schema:generate
  $ npm run db:migrate:dev
```

```
  $ npm run start:dev
```

# Test

Para executar os testes desse projeto, você deve rode os seguintes comandos:

- **Unit Tests**

  ```
  $ npm run test:unit
  ```

  or

  ```
  $ yarn test:unit
  ```

- **Functional Tests**

```
  $ docker-compose up -d database database-dashboard
  $ npm run db:schema:generate
  $ npm run db:migrate:dev
```

```
$ npm run test:functional
```

```
$ yarn test:functional
```

- **Mutation Tests**

```
$ npm run test:mutation
```

- **Lint**

```
$ npm run lint
```

- **Find Dead Code**

```
$ npm run lint:deadcode
```

- **Style Check**

```
npm run style:check
```

```
npm run style:fix
```

# Documentação

- Para acessar a o Swagger, após subir o ambiente, acesse a rota [/docs](http://localhost:3333/api/docs/)

# Features Implementadas:

- [x] Post - Transfer
- [x] Persistência de Dados
  - Postgres
- [x] Gestão de dependências via gerenciador de pacotes (npm)
- [x] Utilização de Eslint
- [x] Testes Unitários
- [x] Documentação com OpenApi
- [x] Github Actions
- [x] Graceful Shutdown
- [x] Logger
- [x] Rate Limiter
- [x] Docker Compose
- [x] Ts-Prune
- [x] Testes de Mutação

## Implementações Futuras/Pendentes

- [x] [Circuit Break](https://github.com/nodeshift/opossum)
- [x] Transporte dos Loggers para ElasticSearch. Ex: [lucsimao/node-api-template](https://github.com/lucsimao/node-api-template/blob/develop/docker-compose.yaml)
- [x] Monitoramento de Métricas com Prometheus e Grafana. Ex:[lucsimao/testlink-facade-api](https://github.com/lucsimao/testlink-facade-api/commit/9d2f702b82820613bc7cd0173a0890492122e4c3)
- [x] Criação de um fake da Api Externa

# Tecnologias

Para a construção deste projeto, foram utilizadas as seguintes tecnologias:

- [TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
- [Node.js](https://nodejs.org/)
- [Visual Studio Code](https://code.visualstudio.com/)- Text editor with following plugins installed: [DotENV](https://github.com/mikestead/vscode-dotenv), [ESLint](https://github.com/Microsoft/vscode-eslint), [GitLens](https://github.com/eamodio/vscode-gitlens) e [vscode-icons](https://github.com/vscode-icons/vscode-icons).
- [Jest](https://jestjs.io/) - Para a execução dos testes
- [Supertest](https://github.com/visionmedia/supertest) - Para testes funcionais da api
- [Nock](https://github.com/nock/nock) - Para mock de apis externas
- [ESLint](https://github.com/eslint/eslint) - Para análise estática do código do projeto.
- [Prettier](https://prettier.io/) - Para formatação automática do projeto.
- [Husky](https://github.com/typicode/husky) - Para aplicação de ci/cd no repositório local.
- [Github Actions](https://circleci.com/circleci-versus-github-actions/) - Para a aplicação do ci/cd no projeto.
- [Express](https://expressjs.com/pt-br/) - Para a API
- [Joi](https://github.com/sideway/joi) - Para validação do schema
- [Pino](https://github.com/pinojs/pino) - Para logs da aplicação
- [OpenApi](https://swagger.io/) - Para documentação
- [Docker](https://www.docker.com/) - Para virtualização
- [Stryker](https://stryker-mutator.io/docs/General/dashboard/) - Para verificação da qualidade dos testes via testes de mutação.
  Neste projeto foram utilizadas as seguintes tecnologias:
- [Joi](https://github.com/sideway/joi) - Para validação de Schema
- [Prisma](https://www.prisma.io/) - ORM para gerenciamento de banco de dados
- [TsPrune](https://github.com/nadeesha/ts-prune) - Para verificação de código morto

# Referências

Para a construção deste projeto, foram utilizadas as seguintes referências:

Repositórios

- [Repositório do Rodrigo Manguinho](https://github.com/rmanguinho/clean-ts-api) do curso [NodeJs, Typescript, TDD, DDD, Clean Architecture e SOLID](https://www.udemy.com/course/tdd-com-mango/)
- [Repositório do Waldemar Neto](https://github.com/waldemarnt/node-typescript-api) do curso [Curso de Node.js completo com Typescript, Jest, TDD, Github](https://www.youtube.com/watch?v=W2ld5xRS3cY)
- [Repositório pessoal - lucsimao - testlink-facade-api](https://github.com/lucsimao/testlink-facade-api)

Cursos/Artigos

- [Waldemar Neto - DO ZERO A PRODUÇÃO: APRENDA A CONSTRUIR UMA API NODE.JS COM TYPESCRIPT ](https://github.com/waldemarnt/node-typescript-api)
- [Glaucia Lemos - Curso Typescript Zero To Hero](https://github.com/glaucia86/curso-typescript-zero-to-hero)
- [Alura - Formação Node JS](https://cursos.alura.com.br/formacao-node-js-12)
- [NodeJS Integration Test Best Practices](https://github.com/testjavascript/nodejs-integration-tests-best-practices)
- [NodeJS Best Practices](https://github.com/goldbergyoni/nodebestpractices)
- [Javascript Testing Best Practices](https://github.com/goldbergyoni/javascript-testing-best-practices)
- [Repositório de anotações pessoal](https://github.com/lucsimao/personal-programming-good-practices)
