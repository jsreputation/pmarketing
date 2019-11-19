import {
  Given,
  Then,
  When,
} from 'cucumber';
import {
  browser,
  protractor,
} from 'protractor';
import { expect } from 'chai';

import {
  ElementApp,
  GeneralSettingsAppPage,
} from '../pages/candylandApp.po';

// Ensure that setting tab is present
Then(/^1_The setting tab should be present.$/, async () => {
  await browser.sleep(3000);
  await browser.executeScript('WalkMeAPI.stopFlow()');
  const ec = protractor.ExpectedConditions;
  // waiting for settings tab to load
  await browser.wait(ec.elementToBeClickable(ElementApp.h3Array().get(6)), 5000);
  // asserting the presence of the tab settings
  expect(await ElementApp.h3Array().get(6).getText()).to.be.equal('Settings');
});

// Ensure that clicking on the settings tab leads to the general settings page
When(/^2_I click on the settings tab$/, async () => {
  await browser.sleep(3000);
  await browser.executeScript('WalkMeAPI.stopFlow()');
  const ec = protractor.ExpectedConditions;
  await browser.waitForAngularEnabled(false);
  // waiting for settings tab to load
  await browser.wait(ec.elementToBeClickable(ElementApp.h3Array().get(6)), 5000);
  // clicking the settings tab
  await ElementApp.h3Array().get(6).click();
  await browser.sleep(3000);

});

Then(/^2_I should be navigated to the general settings page.$/, async () => {
  // asserting the url when settings tab is clicked
  expect(await browser.getCurrentUrl()).to.contain('settings');
});

// Ensure that settings page have relevant element
Given(/^3_I am on the general settings page$/, async () => {
  await GeneralSettingsAppPage.navigateToGeneralSettings();
  await browser.sleep(3000);
  await browser.executeScript('WalkMeAPI.stopFlow()');
});

Then(/^3_I should see the relevant elements for general settings page.$/, async () => {
  const ec = protractor.ExpectedConditions;
  // waiting for the timezone and currency field
  await browser.wait(ec.presenceOf(ElementApp.matFormFieldFlex().get(0)), 6000);
  await browser.wait(ec.presenceOf(ElementApp.matFormFieldFlex().get(1)), 6000);
  // asserting the presence of timezone field an currency field
  expect(await ElementApp.matFormFieldFlex().get(0).isPresent()).to.equal(true);
  expect(await ElementApp.matFormFieldFlex().get(1).isPresent()).to.equal(true);
});
