API de Desafio CompanyHero - Documentação

API de CompanyHero
==========

Sistema de recomendação de musica
-----------------------

Sistema de recomendação de musica é projetado para obter playlist de musicas depedendo do clima da cidade fornecida. Este documento descreve o funcionamento do sistema, as abordagens utilizadas.

Documentação detalhada local
----------------------------

Para o maior aproveitamento desta documentação, é recomendado usar a biblioteca compodoc para a leitura e exploração do projeto.


## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

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

O UserController é o componente responsável por receber requisições HTTP e direcioná-las ao serviço apropriado. Ele possui um endpoint getMusicRecommended que recebe uma requisição GET com um parâmetro UserInput. O controlador utiliza o UserServoce para processar a requisição e retornar as informações das playlists de musica.

### Serviços

O UserService é o componente central que gerencia a lógica de negócio do sistema. Ele é responsável por chamar a API de Weather e pegar o clima da cidade e a API do spotify para recomendar a playlist a partir do clima fornecida pela Weather.

### Transporte

O WeatherService é o componente responsável por chama a API de Weather e resgatar a partir da cidade fornecida o clima atual da cidade, usando o module weather para exportar o service.

O SpotifyService é o componente responsável por chama a API de Spotify e resgatar a partir do clima forncedio a playlist de musica, usando o module spotify para exportar o service.


Justifique a escolha do padrão de API para o serviço
---------------------

A abordagem utilizada foi o padrão de projeto recomendado pelo framework NestJs : https://nestjs.com/

Além disso, a estrutura modular do sistema permite a fácil manutenção e atualização dos componentes, garantindo que o sistema possa ser adaptado a novas regras e requisitos conforme necessário.

Justifique o uso de serviços de terceiros
---------------------

utilizado https://openweathermap.org/api para pegar o clima da cidade fornecida

uitlizado https://developer.spotify.com/ para pegar a playlist das musicas


### Endpoints

1.  **GET /user/:cityName**

    Retorna a playlist de musica a partir do clima da cidade fornecida.

    *   Parâmetros:
        *   cityName: Nome da cidade
    *   Resposta:
        *  {
    "name": "Honky Chateau",
    "uri": "https://open.spotify.com/album/2ei2X6ghPnw7YRwQtAH075"
  },
  {
    "name": "Rock Danger, Vol. 1",
    "uri": "https://open.spotify.com/album/10NgAPEXrO27p2uhmuZgyu"
  },
  {
    "name": "primavera pop",
    "uri": "https://open.spotify.com/album/0Vcd3Sy7RgcDwoSQe1cVwx"
  },
  {
    "name": "Off the Wall",
    "uri": "https://open.spotify.com/album/2ZytN2cY4Zjrr9ukb2rqTP"
  },
  {
    "name": "best pop 00s",
    "uri": "https://open.spotify.com/album/5E6En1DV5ccimVjSDYyYl4"
  }


Swagger
---------

https://companyhero.onrender.com/swagger

Conclusão
---------

Em conclusão, o código apresentado implementa um sistema de busca a partir do clima da cidade fornecida, a playlist de musicas do spotify
