const config = require('./protractor.conf').config;
// the following config is for circle ci to run the tests
config.capabilities = {
  browserName: 'chrome',
  chromeOptions: {
    args: ['--headless', '--no-sandbox']
  }
};

config.cucumberOpts = {
  format: 'json:e2e/src/resultsOutput/result.json',
  require: [
    './src/steps/**/*.steps.ts',
    './src/features/'
  ],
  tags: [],
  ui:       'bdd',
  reporter: 'dot',
  strict: true,
  timeout: 35000,
  bail:true,
  dryRun: false,
  compiler: []
};

exports.config = config;
