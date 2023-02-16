# customers-api

This is a good TypeScript Project using the NestJS framwork. This project can be used as a Starter Kit 

# Here we have
✅ A progressive Node.js framework (NestJS)

✅ TypeScript using a scalable architecture

✅ Caching(Redis client based, ioredis package)

✅ Advanced HTTP Client(Axios)

✅ Testing(Jest)

✅ Linter(ESLint)

✅ Code formatter(Prettier)

✅ OpenAPI Specifications Documentation(Swagger)

✅ Docker

✅ Keycloak authentication

## Production setup using Docker Compose

### Requirements
+ [Docker](https://www.docker.com/)
+ [Docker Compose(V2)](https://docs.docker.com/compose/compose-v2/)
    
### Steps
1. Enter in the [deploy folder](./deploy/)
2. Create a file named `.env`(you can use [.env.example](./deploy/.env.example) as base to create your own)
3. Run `docker-compose up -d`

### Helpful

1. In production environments you may change the [docker-compose file](./deploy/docker-compose.yaml) to use an image tag instead building it directly

2. If you wanna build the docker image directly, just be in the [project root folder](./) and run `docker build -f deploy/Dockerfile .`

3. To build the production image you just need docker in the machine because the [Dockerfile](./deploy/Dockerfile) automatically install node and the dependencies itself inside the container.


## Development enviroment setup

### Requirements
+ A [Node.js](https://nodejs.org/) version compatible with the project(the tested version is the [**16.19**](https://nodejs.org/ca/blog/release/v16.19.0/))
+ [Yarn - the package manager](https://yarnpkg.com/)
+ [Docker](https://www.docker.com/)
+ [Docker Compose(V2)](https://docs.docker.com/compose/compose-v2/)
+ [Redis](https://redis.io/)

### Helpful

1. You can see all the available scripts to run in the [package.json](./package.json) file
2. You can start a Redis container for development by being in the [project root folder](./) and running `docker compose up -d` in the terminal

### Running the API
1. Run `yarn` in the terminal to install the dependencies
2. Create a file named `.env`(you can use [.env.example](./.env.example) as base to create your own)
3. Run `yarn start:debug` in the terminal to start the API in the debug mode

### Running tests
1. Run `yarn` in the terminal to install the dependencies
2. Run `yarn test` in the terminal



## Helpful about the project

+ You can access the API Docs in the path `/api-docs`
+ You can get the API Docs JSON in the OpenAPI Schema in the path `/api-docs-json`

## People

The original author of this project is [João Amorim](https://github.com/jpamorimdev)

## License

[MIT](LICENSE)

## Learn More

To learn more about NestJS, take a look at the following resource:

- [NestJS Documentation](https://docs.nestjs.com/) - learn about NestJS