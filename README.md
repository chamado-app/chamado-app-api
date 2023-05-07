# 🛸 Chamado.app [Web Service]

Another service desk application.

This project is intended to be used as a basis for studies and in the construction of a Course Completion Work, of the Technology in Systems Analysis and Development course.

## 📦 Prerequisites

- Node.js ^18 or ^16 or ^14.19
- Yarn 1.21.1

## 🛬 Cloning

```sh
git clone git@gitlab.com:chamado.app/web-service.git
# or
git clone https://gitlab.com/chamado.app/web-service.git
```

```sh
cd web-service
```

## 🏃 Running

To run the project you need to have installed [docker](https://docs.docker.com/engine/install/) and [docker-compose](https://docs.docker.com/compose/install/)

> In newer versions of docker it may be necessary to install [docker buildx](https://docs.docker.com/build/architecture/).

```sh
# Install dependencies for IDEs to work properly
yarn install
```

```bash
# Development
# Copy the .env.example file to .env and customize the environment variables.
# Define database user and password
cp .env.example .env

# Makes docker container up
make up

# Makes docker container down
make down

# Makes production docker image
make build
```

## 🧪 Testing

```bash
# unit tests
yarn run test

# e2e tests
yarn run test:e2e

# test coverage
yarn run test:ci
```

<!-- ## ✏️ Contributing

For more information about code patterns and rules for development, see the [CONTRIBUTING](./CONTRIBUTING.md) file. -->
