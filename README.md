API de CEP - Documentação

API de CEP
==========

Sistema de Busca de CEP
-----------------------

O sistema de busca de CEP é projetado para obter informações de endereço com base em um código postal fornecido. Este documento descreve o funcionamento do sistema, a recuperação de informações de endereço e as abordagens utilizadas.

Documentação detalhada local
----------------------------

Para o maior aproveitamento desta documentação, é recomendado usar a biblioteca compodoc para a leitura e exploração do projeto.


## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Directory structure

This application follow the following directory structure and principles:
```
root (your project root directory)
 |---> .config/        (infrastructure related files. Eg: terraform)
 |---> .github/        (github actions files)
 |---> doc/            (project additional documentation files)
 |---> db/             (database script files, case needed)
 |---> build/          (build script files eg: powershell, docker compose, bash, sh, etc)
 |---> src/            (main source files)
     |---> common      (external libraries implementations. Eg: Queues, database, caching, etc)
     |---> modules     (project source code files. Eg: domain entities, use-cases, services, etc)
     |---> nest-core   (nestjs framework related implementation files. Eg: filters, middlewares, guards, etc)
 |---> test/           (Testes unitários, testes de integração, testes funcionais, testes automatizados e etc)
```

Após isso, acesse a rota http://localhost:8080/ no navegador e explore à vontade a documentação detalhada do projeto!

Funcionamento
-------------

O sistema consiste em um conjunto de componentes, incluindo um controlador, serviços e repositórios, que trabalham em conjunto para coletar o código postal do usuário e retornar as informações de endereço correspondentes.

### Controlador

O ZipCodeController é o componente responsável por receber requisições HTTP e direcioná-las ao serviço apropriado. Ele possui um endpoint searchZipcode que recebe uma requisição GET com um parâmetro zipCode. O controlador utiliza o ZipCodeService para processar a requisição e retornar as informações de endereço.

### Serviços

O ZipCodeService é o componente central que gerencia a lógica de negócio do sistema. Ele é responsável por validar o código postal do usuário, recuperar as informações de endereço e interagir com o repositório de dados para buscar ou atualizar informações de CEP.

### Repositórios

O ZipCodeRepository é o componente responsável por gerenciar o armazenamento e recuperação de dados do sistema. Ele interage diretamente com o banco de dados e utiliza o ZipCodeSchema para definir a estrutura dos dados.

Recuperação de informações de endereço
--------------------------------------

A recuperação das informações de endereço é feita pelo ZipCodeService, que utiliza o ZipCodeRepository para buscar o endereço no banco de dados com base no código postal fornecido. Caso o endereço não seja encontrado, uma exceção BadRequestException é lançada com a mensagem "Unable to find the ZipCode".

Abordagens Utilizadas
---------------------

A abordagem utilizada para a recuperação das informações de endereço baseia-se na busca direta no banco de dados usando o código postal fornecido. Esta abordagem permite

Além disso, a estrutura modular do sistema permite a fácil manutenção e atualização dos componentes, garantindo que o sistema possa ser adaptado a novas regras e requisitos conforme necessário.

API de CEP
----------

Esta API permite gerenciar a busca de informações de endereço com base em um CEP fornecido. Através desta API, você pode buscar informações de endereço de um CEP específico.

### Endpoints

1.  **GET /zipcode/:zipCode**

    Busca as informações de endereço com base no CEP fornecido.

    *   Parâmetros:
        *   zipCode: Código postal (CEP)
    *   Resposta:
        *   200 OK: ZipCodeDTO
        *   400 Bad Request: Mensagem de erro

### Classes e serviços

*   ZipCodeController: Controlador que gerencia as rotas da API.
*   ZipCodeService: Serviço que lida com a lógica de negócios relacionada à busca de CEP.
*   ZipCodeRepository: Repositório para gerenciar a interação com o banco de dados.

Conclusão
---------

Em conclusão, o código apresentado implementa um sistema de busca de informações de endereço que permite aos usuários fornecer um CEP e obter informações detalhadas do endereço relacionado.

O ZipCodeController gerencia as requisições HTTP, enquanto o ZipCodeService lida com a lógica de negócio, incluindo a validação do CEP do usuário e a recuperação das informações de endereço.

O ZipCodeRepository é responsável pela interação com o banco de dados e a persistência dos dados do CEP, enquanto o ZipCodeSchema define a estrutura dos dados armazenados no banco de dados.

A aplicação é desenvolvida utilizando o framework Nest.js e fornece uma solução escalável, fácil de manter e oferece uma base sólida para futuras melhorias e expansões, conforme necessário.