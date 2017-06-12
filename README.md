# @bexio/common

This project is a library that provides reusable code for [Bexio](http://www.bexio.com). It is build on top of the [Angular](https://github.com/angular/angular) framework.

## Development server

Run `npm run serve` for a dev server. Navigate to `http://localhost:4300/`. The app will automatically reload if you change any of the source files.

## Check if artifact is valid

Run `npm run validate` for a quick check if the artifacts, that will be stored in the `dist/` directory, are passing the linting and testing.

## Build the artifacts

Run `npm run build` to simply create the artifacts in a dist directory.

## Build for production

Run `npm run build-prod` to have the artifacts ready to be published to [npm](https://www.npmjs.com/). This task will execute `npm run validate` and `npm run build`.

## Deploy the artifacts to [npm](https://www.npmjs.com/)

Run `npm run deploy` to patch-increment the version and publish the artifacts to npm without the dist directory.

## Format the code

Run `npm run format` to format the typescript code according to clang-format.

## Lint the code

Run `npm run lint` to lint the typescript code according to the rules defined in the tslint.json file.

## Running unit tests

Run `npm run test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `npm run e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `npm run serve`.

## TODO's

Write all the missing tests.

## License

MIT [Bexio](http://www.bexio.com)
