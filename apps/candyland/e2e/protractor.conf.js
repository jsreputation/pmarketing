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
    // 'elementScrollBehavior': 0,
    'unexpectedAlertBehaviour':'dismiss',
    'browserName': 'chrome'
  },
  directConnect: true,
  baseUrl: 'http://localhost:4200/',
  seleniumAddress: 'http://localhost:4444/wd/hub/',
  // resultJsonOutputFile:'./src/resultsOutput/result.json',
  framework: 'custom',
  frameworkPath: require.resolve('protractor-cucumber-framework'),
  cucumberOpts: {
    require: [
      './src/steps/**/*.steps.ts',
      './src/features/'
    ],
    tags: ['@demo','@runThis','@TestCaseKey'],
    ui:       'bdd',
    reporter: 'dot',
    strict: true,
    format: 'json:./src/resultsOutput/result.json',
    timeout: 35000,
    bail:true,
    dryRun: false,
    compiler: []
},
  onPrepare() {
    let globals = require('protractor');
    let browser = globals.browser;
    // browser.manage().timeouts().implicitlyWait(50000);
    browser.driver.manage().window().maximize();
    // browser.ignoreSynchronization = true;
    require('ts-node').register({
      project: require('path').join(__dirname, './tsconfig.json')
    });

  },
  onComplete: () => {
    var reporter = require('cucumber-html-reporter');
    var options = {
      theme: 'bootstrap',
      jsonFile: './apps/candyland/e2e/src/resultsOutput/result.json',
      output: './apps/candyland/e2e/src/resultsOutput/cucumber_report.html',
      reportSuiteAsScenarios: true,
      launchReport: true,
      scenarioTimestamp: true,
      metadata: {
          "App Version":"0.3.2",
          "Test Environment": "STAGING",
          "Browser": "Chrome  78.0.3904.105",
          "Platform": "MacOS",
          "Parallel": "Scenarios",
          "Executed": "Remote"
      }
    };

    reporter.generate(options);
  }
};
