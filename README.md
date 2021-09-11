# Social Media With Nested Comment Tree

> Express GraphQL POSTGRES API to create and get [comments, notes, users]
> <br>Also handling Nested comments tree


### Tools

- Support [postgresql](https://www.postgresql.org/)
- Support for [graphiql](https://github.com/graphql/graphiql) an easy way exploring a GraphQL API
- Environments for `development`, `testing`, and `production`
- Linting via [eslint](https://github.com/eslint/eslint)
- Integration tests running with [Jest](https://github.com/facebook/jest)
- Built with [npm scripts](#npm-scripts)
- Examples for User, Note, Comments and nested GraphQL Queries

## Quick Intro / Purpose
This project is to query user with its nests/posts with comments 
<br> making sure that comments in depth can be handled also
<br> using graphql/postgres ... tech

```sh
# clone repository
$ git clone https://github.com/abdolrhman/social-media-in-depth-commenst-graphql
# cd into project root
$ cd social-media-in-depth-commenst-graphql
# install dependencies
$ npm i
# start application
$ npm start
```

## Table of Contents

- [Install & Use](#install-and-use)
- [Folder Structure](#folder-structure)
- [Config](#config)
  - [Connection and Database](#connection-and-database)
  - [Routes](#routes)
- [Test](#test)
  - [Setup](#setup)
- [npm scripts](#npm-scripts)
- [Deploy](#deploy)
  - [database](#database)
  - [nginx](#nginx)

## Install and Use

Start by cloning this repository

```sh
# HTTPS
$ git clone https://github.com/aichbauer/social-media-in-depth-commenst-graphql
```

then

```sh
# change directory to project root
$ cd social-media-in-depth-commenst-graphql
# install dependencies
$ npm i
# to use mysql
$ npm i mysql2 -S
# to use postgresql
$ npm i pg pg-hstore -S
```

or

```sh
# change directory to project root
$ cd social-media-in-depth-commenst-graphql
# install dependencies
$ yarn
# to use mysql
$ yarn add mysql2
# to use postgresql
$ yarn add pg pg-hstore
```

SQLite is supported out of the box as it is the default database.

## Folder Structure

This project has four main directories:

- api - for controllers, queries, mutations, models, types, services, etc.
- config - for routes, database, etc.
- db - this is only a directory for the sqlite database, the default for `NODE_ENV=development`
- test - using [Jest](https://github.com/facebook/jest)


## GraphQL

This directory holds all files that are related to GraphQL (mutations, queries, types, ...).

## Config

Holds all the server configurations.

### Connection and Database

> Note: If you use mysql make sure mysql server is running on the machine

> Note: If you use postgresql make sure postgresql server is running on the machine

These two files are the way to establish a connection to a database.

You only need to touch connection.js, default for `development` is sqlite, but it is easy as typing `mysql` or `postgres` to switch to another db.

> Note: To run a mysql db install these package with: `npm i mysql2 -S` or `yarn add mysql2`

> Note: To run a postgres db run these package with: `npm i -S pg pg-hstore` or `yarn add pg pg-hstore`

Now simple configure the keys with your credentials.

```js
{
  database: 'databasename',
  username: 'username',
  password: 'password',
  host: 'localhost',
  dialect: 'sqlite' || 'mysql' || 'postgres',
}
```

To not configure the production code.

To start the DB, add the credentials for production. Add `environment variables` by typing e.g. `export DB_USER=yourusername` before starting the API.

## Test

All test for this project uses [Jest](https://github.com/facebook/jest) and [supertest](https://github.com/visionmedia/superagent) for integration testing. So read their docs on further information.

## npm scripts

There are no automation tools or task runners like [grunt](https://gruntjs.com/) or [gulp](http://gulpjs.com/) used for this project. This project only uses npm scripts for automatization.

### npm start

This is the entry for a developer.

By default it uses a sqlite databse, if you want to migrate the sqlite database by each start, disable the `prestart` and `poststart` command. Also mind if you are using a sqlite database to delete the `drop-sqlite-db` in the prepush hook.

- runs a **nodemon watch task** for the all files in the project root
- sets the **environment variable** `NODE_ENV` to `development`
- opens the db connection for `development`
- starts the server on 127.0.0.1:2021

### npm test

This command:

- runs `npm run lint` ([eslint](http://eslint.org/)) with the [airbnb styleguide](https://github.com/airbnb/javascript) without arrow-parens rule for **better readability**
- sets the **environment variable** `NODE_ENV` to `testing`
- creates the `database.sqlite` for the test
- runs `jest --coverage` for testing with [Jest](https://github.com/facebook/jest) and the coverage
- drops the `database.sqlite` after the test

### npm run production

This command:

- sets the **environment variable** to `production`
- opens the db connection for `production`
- starts the server on 127.0.0.1:2017 or on 127.0.0.1:PORT_ENV

Before running on production you have to set the **environment vaiables**:

- DB_NAME - database name for production
- DB_USER - database username for production
- DB_PASS - database password for production
- DB_HOST - database host for production
- JWT_SECRET - secret for json web token

Optional:

- PORT - the port your API on 127.0.0.1, default to 2017

### other commands

- `npm run project clean` - clean up `controllers`, `models`, `graphql`, `config/routes` to start developing your own api
- `npm run dev` - simply starts the server without a watch task
- `npm run creates-sqlite-db` - creates the sqlite database file
- `npm run drop-sqlite-db` - deletes the sqlite database file
- `npm run lint` - linting with [eslint](http://eslint.org/)
- `npm run nodemon` - same as `npm start`
- `npm run prepush` - a hook which runs before pushing to a repository, runs `npm test` and `npm run drop-sqlite-db`
- `pretest` - runs linting before `npm test`
- `test-ci` - only runs tests, nothing in pretest, nothing in posttest, for better use with ci tools

## Deploy

This section gives an overview of how to deploy this project to a server. For this examples we use an ubuntu server.

### Database

This section gives an overview of how to set up the database (for this example we will use a postgres database).

```sh
# update package database
$ sudo apt-get update
# install all postgres required resources
$ sudo apt-get install python-psycopg2 libpq-dev postgresql postgresql-contrib
# open postgres
$ sudo -u postgres psql postgres
# set passsword for postgres user
$ \password postgres
# create a new DB
$ CREATE DATABASE db_name;
# list all dbs
$ \l
# exit psql
$ \q
```

To use postgres with this project you need to install two additional packages from npm. See next section.

### nginx

This section gives an overview of how to use ngingx as a webserver for this project.

```sh
# update package database
$ sudo apt-get update
# install all required resources for this project and nginx
$ sudo apt-get install nginx git-all
$ curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
$ sudo apt-get install -y nodejs
# install forever js
$ npm i -g forever
# now copy your project to the server
$ git clone https://example.com/your/repository
```

To use this project with `postgres` you need to install two additional packages from npm.

```sh
# cd into your project
$ cd project
# install dependencies
$ npm i
# install two new packages for postgres
$ npm i pg pg-hstore -S
# start project with forever
$ NODE_ENV=production DB_NAME=DB_NAME DB_USER=DB_USER DB_PASS=DB_PASS DB_HOST=DB_HOST DB_PORT=DB_PORT JWT_SECRET=JWT_SECRET forever start -c node ./api/api.js
```

You need to update the `config/connection.js` to use `postgres`, see [config](#config).

Now we need our `nginx` configuration to be set up. Save the following in `/etc/nginx/sites-available/project_name`. Where `project_name` is the name of your project. You need to replace everything that is written in UPPERCASE with your details.

If you do not have a domain yet just fill `_` for `PUBLIC_SERVER_NAME`. `PUBLIC_IP` is the IP of your server and `PUBLIC_PORT` is most likely `80` for `http` and `443` for `https`.

```nginx
server {
    listen PUBLIC_IP:PUBLIC_PORT;

    server_name PUBLIC_SERVER_NAME;

    location / {
        proxy_pass http://127.0.0.1:2017;
    }
}
```

Now configure `nginx` to use your config.

```sh
#stop nginx
$ sudo systemctl stop nginx
# delete symlink default config
$ sudo rm /etc/nginx/sites-enabled/default
# create new sysmlink to sites enabled
$ ln -s /etc/nginx/sites-available/project_name /etc/nginx/sites-enabled/project_name
# reload and start nginx with new configuration
$ sudo systemctl start nginx
```

Your project is now live under `http://PUBLIC_SEVER_NAME` or `http://PUBLIC_IP`.

If you now visit `http://PUBLIC_SEVER_NAME/explore` or `http://PUBLIC_IP/explore` you need a valid HTTP header to access the server.



## LICENSE

MIT © Abdulrahman
