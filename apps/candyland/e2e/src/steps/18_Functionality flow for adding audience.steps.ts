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
  AudienceAppPage,
  ElementApp,
  LoginAppPage,
} from '../pages/candylandApp.po';

// Ensure functionality of the add user button.
Given(/^4_I am on the audience page.$/, async () => {
  const ec = protractor.ExpectedConditions;
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
  await AudienceAppPage.navigateToAudience();
});

When(/^4_I click on the add user button.$/, async () => {
  const ec = protractor.ExpectedConditions;
  // wait for add user button to load
  await browser.wait(ec.presenceOf(ElementApp.clButton()), 6000);
  // clicking on the add user button
  await ElementApp.clButton().click();
});

Then(/^4_I should see the add audience dialog box.$/, async () => {
  const ec = protractor.ExpectedConditions;
  // waiting for the create user dialog box to load
  await browser.wait(ec.presenceOf(ElementApp.matTabBody()), 6000);
  // asserting the presence of the create user dialog box
  expect(await ElementApp.matTabBody().isDisplayed()).to.equal(true);
});

// Verifying that the essential fields are present.

Given(/^5_that I am on add audience dialog box.$/, async () => {
  const ec = protractor.ExpectedConditions;
  await AudienceAppPage.navigateToAudience();
  await browser.wait(ec.presenceOf(ElementApp.clButton()), 6000);
  // clicking on the add user button
  await ElementApp.clButton().click();
  await browser.sleep(3000);
});

Then(/^5_The essential fields are present for add audience engagement dialog.$/, async () => {
  // waiting for the required fields to load
  const ec = protractor.ExpectedConditions;
  // first name field
  await browser.wait(ec.presenceOf(ElementApp.inputTextArray().get(1)), 8000);
  // last name field
  await browser.wait(ec.presenceOf(ElementApp.inputTextArray().get(2)), 8000);
  // email address field
  await browser.wait(ec.presenceOf(ElementApp.inputEmail()), 8000);
  // mobile number field
  await browser.wait(ec.presenceOf(ElementApp.inputTel()), 8000);
  // asserting the presence of the fields
  // first name field
  expect(await ElementApp.inputTextArray().get(1).isDisplayed()).to.equal(true);
  // last name field
  expect(await ElementApp.inputTextArray().get(2).isDisplayed()).to.equal(true);
  // email address field
  expect(await ElementApp.inputEmail().isDisplayed()).to.equal(true);
  // mobile number field
  expect(await ElementApp.inputTel().isDisplayed()).to.equal(true);
});

// Verifying the number of options for add to audience list dropdown.
Given(/^6_that I am on add audience dialog box.$/, async () => {
  // await browser.executeScript('WalkMeAPI.stopFlow()');
  const ec = protractor.ExpectedConditions;
  await AudienceAppPage.navigateToAudience();
  await browser.wait(ec.presenceOf(ElementApp.clButton()), 6000);
  // clicking on the add user button
  await ElementApp.clButton().click();
  await browser.sleep(3000);
});

When(/^6_I click on the add to audience list.$/, async () => {
  const ec = protractor.ExpectedConditions;
  // waiting for the add audience list form to be loaded
  await browser.wait(ec.elementToBeClickable(AudienceAppPage.audienceList()), 6000);
  // cicking on the add audience list field
  await AudienceAppPage.audienceList().click();
  await browser.sleep(3000);
});

Then(/^6_The number of options is correct.$/, async () => {
  // asserting the number of options
  expect(await ElementApp.spanMatOptionText().count()).to.equal(3);
});

// Verifying the assertion of the email address field.
Given(/^7_that I am on add audience dialog box.$/, async () => {
  const ec = protractor.ExpectedConditions;
  await AudienceAppPage.navigateToAudience();
  await browser.wait(ec.presenceOf(ElementApp.clButton()), 6000);
  // clicking on the add user button
  await ElementApp.clButton().click();
  await browser.sleep(3000);
});

When(/^7_I input a non email address$/, async () => {
  const ec = protractor.ExpectedConditions;
  // email address field
  await browser.wait(ec.presenceOf(ElementApp.inputEmail()), 8000);
  // input non email address in the email address field
  await ElementApp.inputEmail().sendKeys('test.com');
  // clicking on the first name field to elicit the error message
  await ElementApp.inputTextArray().get(1).click();
});

Then(/^7_I should see a error message.$/, async () => {
  const ec = protractor.ExpectedConditions;
  // waiting for error message to load
  await browser.wait(ec.presenceOf(ElementApp.matError()), 6000);
  // doing an assertion on the presence and the error message contents
  expect(await ElementApp.matError().isDisplayed()).is.equal(true);
  expect(await ElementApp.matError().getText()).to.contain('Wrong format of email');
});

// Verifying the assertion of the essential fields.

Given(/^8_that I am on add audience dialog box.$/, async () => {
  const ec = protractor.ExpectedConditions;
  await AudienceAppPage.navigateToAudience();
  await browser.wait(ec.presenceOf(ElementApp.clButton()), 6000);
  // clicking on the add user button
  await ElementApp.clButton().click();
  await browser.sleep(3000);
});

When(/^8_I input null values for the essential fields$/, async () => {
  const ec = protractor.ExpectedConditions;
  // waiting for first name field to load
  await browser.wait(ec.presenceOf(ElementApp.inputTextArray().get(1)), 8000);
  // clearing any possible values for the first name field
  await ElementApp.inputTextArray().get(1).clear();
  await ElementApp.inputTextArray().get(1).click();
  // clicking on another field
  await ElementApp.inputTextArray().get(2).click();
});

Then(/^8_I should see a error message.$/, async () => {
  const ec = protractor.ExpectedConditions;
  // waiting for the error message to load
  await browser.wait(ec.presenceOf(ElementApp.matError()), 6000);
  // doing an assertion on the presence and the error message contents
  expect(await ElementApp.matError().isDisplayed()).is.equal(true);
  expect(await ElementApp.matError().getText()).to.contain('Required field');
});
