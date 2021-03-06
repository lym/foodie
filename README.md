# Foodie
Foodie lets people create, share, discover and keep track of amazing
recipes.

[![Build Status](https://travis-ci.org/lym/foodie.svg?branch=master)](https://travis-ci.org/lym/foodie)

[![Coverage Status](https://coveralls.io/repos/github/lym/foodie/badge.svg?branch=develop)](https://coveralls.io/github/lym/foodie?branch=develop)

## Features
- Login/Logout
- Create, read, edit and delete recipes.
- Create, read recipe instructions
- Search recipes

## Development Environment Setup
- Set up the API server by following the instructions [here](https://github.com/lym/yummy-recipes-api#development-environment-setup)

- Clone this repository
- Change working directory to project directory
- Install the project dependencies with `$ npm install`
- Run the tests with
```
  $ nyc mocha --full-trace --require mock-local-storage --require \
  src/__tests__/setup.js src/__tests__/*.spec.js
```
- start the development server with `$ npm start`
