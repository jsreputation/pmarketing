import {
  Given,
  Then,
  When,
  setDefaultTimeout,
} from 'cucumber';
import {
  protractor,
  browser,
  ProtractorExpectedConditions,
} from 'protractor';
import { expect } from 'chai';

import {
  DashboardAppPage,
  ElementApp,
  EngagementAppPage,
  LoginAppPage,
} from '../pages/candylandApp.po';

const ec: ProtractorExpectedConditions = protractor.ExpectedConditions;

// setting step timeout time
setDefaultTimeout(60 * 1000);

// Engagements tab is visible to customer
Given(/^1_I am on the dashboard page.$/, async () => {
  // login process
  await LoginAppPage.navigateToLogin();
  // Waiting for account id field to load
  await browser.wait(ec.elementToBeClickable(ElementApp.inputArray().first()), 5000);
  // entering correct account id
  await ElementApp.inputArray().first().sendKeys(LoginAppPage.getAccountId());
  // entering correct testUserAccount
  await ElementApp.inputArray().get(1).sendKeys(LoginAppPage.getUserAccount());
  // entering correct pw
  await ElementApp.inputArray().get(2).sendKeys(LoginAppPage.getPassword());
  // pressing the enter key on the accountID field to log in
  await ElementApp.inputArray().first().sendKeys(protractor.Key.ENTER);
  await browser.sleep(3000);
  // await browser.executeScript('WalkMeAPI.stopFlow()');
  await DashboardAppPage.navigateToDashboard();
  await browser.sleep(3000);

});

When(/^1_I take no action.$/, () => {});

Then(/^1_I should see the engagment tab.$/, async () => {
  // doing an assertion based on the text string of the tab
  await browser.wait(ec.elementToBeClickable(ElementApp.h3Array().get(2)), 5000);
  expect(await ElementApp.h3Array().get(2).getText()).to.be.equal('Engagements');
});

// Clicking on the Engagment tabs leads to the engagment page.
Given(/^2_that I am on the dashboard page.$/, async () => {
  await DashboardAppPage.navigateToDashboard();
});

When(/^2_I click on the engagement tab.$/, async () => {
  await browser.wait(ec.elementToBeClickable(ElementApp.h3Array().get(2)), 5000);
  await ElementApp.h3Array().get(2).click();
});

Then(/^2_I will be redirected to the the engagment page.$/, async () => {
  // doing a assertion based on the url path
  await browser.wait(ec.urlContains('engagements'), 5000);
});

// Dialog present when customer clicks on create new button.

Given(/^3_that i am at the engagement page.$/, async () => {
  await EngagementAppPage.navigateToEngagement();
  await browser.sleep(3000);
  // await browser.executeScript('WalkMeAPI.stopFlow()');
});

When(/^3_I click on the create new button.$/, async () => {
  await browser.wait(ec.elementToBeClickable(ElementApp.clButton()), 6000);
  await ElementApp.clButton().click();
});

Then(/^3_the dialg box is present.$/, async () => {
  // doing on an assertion on the presence of the dialog box
  expect(await EngagementAppPage.selectEngagementTypeDialog().isPresent()).to.equal(true);
});

// The four engagment options are present.
Given(/^4_I am on the create engagement option dialog$/, async () => {
  await EngagementAppPage.navigateToEngagement();
  await ElementApp.clButton().click();
});

When(/4_I do nothing.$/, () => {});

Then(/^4_There are 4 engagement options available.$/, async () => {
  // doing an assertion on the number of elements
  expect(await EngagementAppPage.engagementTypeOptions().count()).to.be.equal(4);
});
// Client is able interact with the engagement campaign options
Given(/^5_I am on the create option dialog box.$/, async () => {
  await EngagementAppPage.navigateToEngagement();
  await ElementApp.clButton().click();
});

When(/^5_I click on the stamps option.$/, async () => {
  // selecting the stamp options
  await EngagementAppPage.engagementTypeOptions().get(2).click();
});

Then(/^5_The stamp option is highlighted.$/, async () => {
  // assertion based on text value of the text value
  expect(await EngagementAppPage.activeEngagementTypeOption().getText()).to.contain('Stamps');
});
