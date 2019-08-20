# [NestJS](https://nestjs.com) BOILERPLATE

## Description

This is back-end template based on NestJS framework.

### Features

- Authentication/Authorization (JWT)
- Swagger API templates
- Logger based on Winston
- Environment config service
- TypeORM

### Environment Configuration

Config service read all environment variables from `.env` file.
Copy `.env.example` to `.env` for configure your app in Dev mode. For example use

```bash
cp .env.example .env
```

For production mode use `export` command.

### Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

### Test

Tests will be added ASAP

### Road map

There are some of features coming:

- Registration with e-mail confirmation based on SendGrid API
- Tests
- Dockerfile, docker-compose and docker-swarm configurations
- Code documentation templates
