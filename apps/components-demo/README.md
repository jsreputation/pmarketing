# ComponentsDemo

This project is currently a WIP as a functional self-documenting app of the components exposed from @perx/core library.

## Dependencies
* node 10.14 or greater
* yarn
* angular cli  

## Data source
There is no mock data currently available, and as such we will be using existing staging data. This means you will need to go to `localhost:4201/login` to obtain a access token and do the following:

> run appauth server using the hsbc-staging credentials using user `0004`

## Development server

Run `yarn start` for a dev server. Navigate to `http://localhost:4201/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `yarn build` to build the project. The build artifacts will be stored in the `dist/` directory. Use `yarn build:components-demo:prod` for a production build.

## Running unit tests

Run `yarn test` to execute the unit tests via [Karma](https://karma-runner.github.io).

