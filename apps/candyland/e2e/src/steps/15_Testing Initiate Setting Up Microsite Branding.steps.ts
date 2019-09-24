import { Before, Given, Then, When } from 'cucumber';
import { expect } from 'chai';
import { browser, element, by , protractor } from 'protractor';
import { GeneralSettingsAppPage } from '../pages/candylandApp.po';

let generalSettingsApp: GeneralSettingsAppPage;

Before( () => {
  // initializing page objects instances
  generalSettingsApp = new GeneralSettingsAppPage();
});

// Ensure that setting tab is present
Then(/^1_The setting tab should be present.$/, async () => {
  const ec = protractor.ExpectedConditions;
  // waiting for settings tab to load
  await browser.wait(ec.elementToBeClickable(element.all(by.css('h3')).last()), 5000);
  // asserting the presence of the tab settings
  expect(await element.all(by.css('h3')).last().getText()).to.be.equal('Settings');
});

// Ensure that clicking on the settings tab leads to the general settings page
When(/^2_I click on the settings tab$/, async () => {
  const ec = protractor.ExpectedConditions;
  // waiting for settings tab to load
  await browser.wait(ec.elementToBeClickable(element.all(by.css('h3')).last()), 5000);
  // clicking the settings tab
  await element.all(by.css('h3')).last().click();
  await browser.sleep(3000);

});

Then(/^2_I should be navigated to the general settings page.$/, async () => {
  // asserting the url when settings tab is clicked
  expect(await browser.getCurrentUrl()).to.contain('settings');
});

// Ensure that settings page have relevant element
Given(/^3_I am on the general settings page$/, async () => {
  await generalSettingsApp.navigateToGeneralSettings();
});

Then(/^3_I should see the relevant elements for general settings page.$/, async () => {
  const ec = protractor.ExpectedConditions;
  // waiting for the timezone and currency field
  await browser.wait(ec.presenceOf(element.all(by.css('div.mat-form-field-flex')).get(0)), 6000);
  await browser.wait(ec.presenceOf(element.all(by.css('div.mat-form-field-flex')).get(1)), 6000);
  // asserting the presence of timezone field an currency field
  expect(await element.all(by.css('div.mat-form-field-flex')).get(0).isPresent()).to.equal(true);
  expect(await element.all(by.css('div.mat-form-field-flex')).get(1).isPresent()).to.equal(true);
});
