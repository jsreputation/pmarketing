// jest.config.js
const { pathsToModuleNameMapper } = require('ts-jest/utils');
// In the following statement, replace `./tsconfig` with the path to your `tsconfig` file
// which contains the path mapping (ie the `compilerOptions.paths` option):
const { compilerOptions } = require('./tsconfig');

module.exports = {
  preset: '../../jest.preset.js',
  testEnvironment: 'node',
  moduleNameMapper: pathsToModuleNameMapper(
    compilerOptions.paths /*, { prefix: '<rootDir>/' } */
  ),
  globals: {
    'ts-jest': {
      tsConfig: '<rootDir>/projects/whistler/tsconfig.spec.json',
    },
  },
  displayName: 'whistler',
};
