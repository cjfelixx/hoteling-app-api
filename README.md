# DataHouse Hoteling-app
## Table of Contents

- [Project Definition of Done](#project-definition-of-done)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Features](#features)
- [User stories](#user-stories)
- [Approach](#approach)

## Project Definition of Done

- Code is written
- Code is documented
- Unit tests are passed
- Functional tests are passed

<!-- - [Authentication](#authentication)
- [Authorization](#authorization)
- [Logging](#logging)
- [Custom Mongoose Plugins](#custom-mongoose-plugins)
- [Linting](#linting) -->

## Getting started

### Installation

***Using Postgresql (MAC)***

To start Posgtres server:

```bash
brew services start postgresql
```

To stop the Posgtres server:

```bash
brew services stop postgresql 
```

If Postgres start, connect:

```bash
psql postgres
```

***Using Postgresql (Windows)***

TBA

***Using mssql (Windows)***

- Run SQL server on Putty

```bash
putty -load "Jumpbox Access"
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

## Features

- Let user connect to their google/outlook calendar
- 3-teir database architecture
- Admin & User capabilities
- Login
- Map
	- Last priority
- Cancel reservations
- A user cannot overlap reservation on the same day.
- Form
- Onboarding procedures
- Database
	- Tables between users and admins
- Mobile friendly
- Notification
	- Via Outlook

## Project Structure

```text
src\
 |--config\         # Environment variables and configuration related things
 |--controllers\    # Route controllers (controller layer)
 |--docs\           # Swagger files
 |--middlewares\    # Custom express middlewares
 |--models\         # Data models (data layer). Create, delete edit data. It is where all the request and response from server logic is handled
 |--routes\         # Routes: return response from the server
 |--services\       # Business logic (service layer): data is transformed to meet database model's requirements before sending to server.
 |--utils\          # Utility classes and functions
 |--validations\    # Request data validation schemas
 |--app.js          # Express app
 |--index.js        # App entry point
```

## User stories

### All

- As any `user`, I should be able to access the web app and to the login page, so that I can log into my account.

### Guest

- As a `guest`, I want to be able to `register` or `login`, so that I can access features within the app.
- As a `guest`, I want to confirm my valid `email` address, so that I can gain access to the application.
- As a `guest`, I want to be able to submit my `email` credentials, so I can still `login` if my password is lost.

### User

- As a `user`, I can log in my account on the sign in webpage, so that I can access the app.
- As a `user`, I want to be able to `logout`, so that my authentication session cannot be used by others
- As a `user`, I want to be able to **edit** my own `user` record, so I can keep my information current.
- As a `user`, I can view information about workspaces, so that I can see what workspaces are good for me.
- As a `user`, I can schedule available spaces on the reservation form webpage, so that I am able to work in the workspace.
As a `user`, I can view/edit/cancel reservation on my personal dashboard webpage, so I can keep my reservation current.
- As a `user`, I can report damages on the spaces, so that I can let the owner know there is something wrong with the workspace(s).

### Admin (User + Admin)

- As an `admin`, I want to be able to **view** `users` (*with age but no password*), so I know users of the system and their age
- As an `admin`, I can approve/reject single/multiple reservation(s) on the dashboard webpage, so that I can keep the schedule current.
- As an `admin`, I can configure reservation limitations on the dashboard webpage, so that I can manage the traffic of the reservations.
- As an `admin`, I should get a notification of a workspace reservation request, so that I know who reserves.
- As an `admin`, I can search/add/view/edit/delete accounts, so I can manage users in the system.
- As an `admin`, I can search/add/view/edit/delete permissions, so I can manage permissions in the system.
- As an `admin`, I want to be able to **remove** any `role` record from any user, so I can manage users and keep the system current.
- As an `admin`, I can view reservation schedules in the dashboard webpage, so that I know manage the reservations.
- As an `admin`, I can schedule available spaces on the reservation form webpage, so that I know which workspaces are available.

### Systems Administrator

- As a `sysadmin`, I want to be able to automatically check app health, so I can automate scaling and recovery
- As a `sysadmin`, I want the app to log all events, so that I can optionally add alerts if acceptable thresholds are exceeded
- As a `sysadmin`, I want to be able to deny protected access to any user or individual token, so I can prevent unauthorized access
- As a `sysadmin`, I want to be able to disable client features that may have issues, so I can maintain app stability
- As a `sysadmin`, I want to identify actions a support user performs on behalf of users, so I can audit and explain data

### Developer

- As a `developer`, I want to be able to flag new functionalities, so we can safely build/deploy and test out new features.

## Approach

### What I used to create the app

- Reactjs (Front-End)
- Expressjs (Back-end)
- Nodejs (Back-end)
- MSSQL server (Database)
- Postman (REST API development)
- Javascript (programming language)
- Gitlab (Version Control)
- AWS

### Onboarding procedures

- Input the following
	- email (work)
	- password
	- first name
	- last name
	- phone number (optional)
	- select role (employee or admin)

### Practices considered

- [Discipline Agile Delivery](https://kendis-io.medium.com/disciplined-agile-delivery-dad-cf0d1b6ffb13)
- CI/CD
- Scrum
- Kanban
- [Personal Extreme programming](https://www.alpha-epsilon.de/programming/2017/12/06/personal-extreme-programming/)
- Version Control

### Useful Notes

- [Valuable diagrams](https://drawio-app.com/uml-diagrams/)
- [Draw database](https://dbdiagram.io/home)
- [Figma](https://www.figma.com/)
- [Connecting to PostgreSQL](https://stackabuse.com/using-postgresql-with-nodejs-and-node-postgres)

### Jamie's Notes

- Jamie is admin
- Automatic accept workspaces
- SSO sounds good
- Its okay see other people
- Nice to have social distancing feature
