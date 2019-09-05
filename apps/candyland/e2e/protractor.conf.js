// @ts-check
// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts


/**
 * @type { import("protractor").Config }
 */
exports.config = {
  plugins: [{
    path: require.resolve('protractor-console'),
    logLevels: ['debug','info']
  }],
  allScriptsTimeout: 30000,
  specs: [
    './src/features/**/*.feature'
  ],
  capabilities: {
    'browserName': 'chrome'
  },
  directConnect: true,
  baseUrl: 'http://localhost:4200/',
  seleniumAddress: 'http://localhost:4444/wd/hub/',
  framework: 'custom',
  frameworkPath: require.resolve('protractor-cucumber-framework'),
  cucumberOpts: {
    require: [
      './src/steps/**/*.steps.ts',
      'features/'
    ],
    tags: [],
    ui:       'bdd',
    reporter: 'dot',
    strict: true,
    format: [],
    timeout: 35000,
    bail:true,
    dryRun: false,
    compiler: []
},
  onPrepare() {
    require('ts-node').register({
      project: require('path').join(__dirname, './tsconfig.json')
    });

  }
};
