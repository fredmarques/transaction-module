# Transaction Module (POC)

A simple module to handle transactions

## Install

To install project depencies:
````
  npm install
````

If you have a postgres running in your local host:
````
npm db:migrate && npm db:seed
````

To use a Postgres Docker image instance instead of a local Postgres:

*assmuing you have docker and docker-compose installed*
````
docker-compose up pg
````

## Tests

This project uses Jest as its test framework. Running it is simple as
`````
  npm run test
`````

## Project's architecture

* All files with *.spec.js* extension are specification tests ensuring data contract and validations
* All files with *.test.js* extension are functional tests

````
├── README.md
├── data
│   └── postgres                        // postgres local database persistance files
├── docker-compose.yml
├── dockerfile
├── jsconfig.json
├── package-lock.json
├── package.json
├── server                              // all sequelize migrations and seeds
│   ├── migrations
│   └── seeders
├── src                                
│   ├── app.js                          // http server app ready to be started
│   ├── business                        // business logic.
│   ├── commons                         // constants and helpers
│   ├── configs                         // all project relevant settings
│   ├── controllers                     // thin layer to handle incoming request and dispatch it to business layer
│   ├── domain                          // all domain entities used in this project (avoids primitive types)
│   ├── index.js                        // application entry
│   ├── models                          // database models
│   └── routes                          // server routers
├── test                                  
│   ├── Balance.test.js
│   └── Transaction.test.js
└── yarn.lock
````
## Tech

Core tech used in this project: 

* Express: for creating our webserver
* Joi: validates all domain entities using business constraints
* Postgres: a SQL database to handle our tranasction level operations 
* Sequelize: a simple ORM to create and manage Postgres database and it's entities
* Jest: test runner and assertions
* Supertest: lib for testing our webserver routes

## Using Docker and docke compose

````
docker-compose up
````

*Don't forget to run **npm run db:migrate** and **npm run db:seed** before with docker-compose up pg*


## Environment variables

````
 PG_USERNAME: Postgres user          (defaults to: pagarme_user)
 PG_PASSWORD: Postgres password      (defaults to: senha_secreta)
 PG_DATABASE: Postgres databade      (defaults to: pegarme)
 PG_HOST: Postgres host              (defaults to:localhost)
 PG_URL: Postgres url                (defaults to: postgresql://localhost:5432/pagarme)
 PORT: Server port                   (defaults to 8000)
````   


## Considerations

* Although this project uses a client's table, it does not handles client CRUD. Assumes clients comes from other services
* Business logic and validations are not exhausting
