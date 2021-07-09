# MSSQL API Template

A RESTful API using Node.js, Express, and SQL Server.

## Getting Started

### Installation

Clone the repo:

```bash
git clone https://github.com/dannytan/suggestion-box-api.git
cd suggestion-box-api
```

Install Yarn if not installed on machine already:

```bash
npm install --global yarn
```

Install the dependencies:

```bash
yarn install
```

Set the environment variables:

```bash
cp .env.example .env

# open .env and modify the environment variables (if needed)
```

### Commands

Running locally:

```bash
yarn dev
```

Running in production:

```bash
yarn start
```

Database Migrations:

```bash
# generate new migration file
yarn migrate:make <name_of_migration>

# update database by running the latest migrations
yarn migrate:latest

# run the next migration that has not yet been run
yarn migrate:up

# undo the last migration that was run
yarn migrate:down

#  rollback the last batch of migrations
yarn migrate:rollback

#  rollback all the completed migrations
yarn migrate:rollback --all

#  list both completed and pending migrations
yarn migrate:list
```

Testing:

```bash
# run all tests
yarn test

# run all tests in watch mode
yarn test:watch

# run test coverage
yarn coverage
```

Docker:

```bash
# run docker container in development mode
yarn docker:dev

# run docker container in production mode
yarn docker:prod

# run all tests in a docker container
yarn docker:test
```

Linting:

```bash
# run ESLint
yarn lint

# fix ESLint errors
yarn lint:fix

# run prettier
yarn prettier

# fix prettier errors
yarn prettier:fix
```

## License

[MIT](LICENSE)
