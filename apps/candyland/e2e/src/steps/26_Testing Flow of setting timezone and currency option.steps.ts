import { Given, Then, When } from 'cucumber';
import { expect } from 'chai';
import { browser, element, by , protractor, ProtractorExpectedConditions } from 'protractor';
import { GeneralSettingsAppPage, EngagementAppPage, LoginAppPage } from '../pages/candylandApp.po';

const ec: ProtractorExpectedConditions = protractor.ExpectedConditions;
let generalSettingsApp: GeneralSettingsAppPage;
let EngagementPage: EngagementAppPage;
let LoginApp: LoginAppPage;

// Ensure the options for timezone is correct
Given(/^1_I am on general setting page$/, async () => {
  // initializing the variable generalSettingsApp
  generalSettingsApp = new GeneralSettingsAppPage();
  await generalSettingsApp.navigateToGeneralSettings();
});

When(/^1_I click on the timezone dropdown list$/, async () => {
  // waiting for the timezone
  await browser.wait(ec.presenceOf(element.all(by.css('div.mat-form-field-flex')).get(0)), 6000);
  // clicking on the dropdownlist
  await element.all(by.css('div.mat-select-arrow-wrapper')).get(0).click();
  await browser.sleep(3000);
});

Then(/^1_The number of options should be correct for timezone.$/, async () => {
  // doing an assertion based on the number of options present
  expect(await element.all(by.css('span.mat-option-text')).count()).to.equal(29);
});

// Ensure the options for currency field is correct
Given(/^2_I am on general setting page$/, async () => {
  // initializing the variable generalSettingsApp
  generalSettingsApp = new GeneralSettingsAppPage();
  await generalSettingsApp.navigateToGeneralSettings();
});

When(/^2_I click on the currency dropdown list$/, async () => {
  // waiting for the currency field
  await browser.wait(ec.presenceOf(element.all(by.css('div.mat-form-field-flex')).get(1)), 6000);
  // clicking on the dropdownlist
  await element.all(by.css('div.mat-select-arrow-wrapper')).get(1).click();
  await browser.sleep(3000);

});

Then(/^2_The number of options should be correct for currency.$/, async () => {
  // doing an assertion based on the number of options present
  expect(await element.all(by.css('span.mat-option-text')).count()).to.equal(17);
});

// Ensure that the settings for timezone and currency remain constant after navigating to another tab
Given(/^3_I am on general setting page$/, async () => {
  // initializing the variable generalSettingsApp
  generalSettingsApp = new GeneralSettingsAppPage();
  await generalSettingsApp.navigateToGeneralSettings();
});

Given(/^3_I select an option for timezone$/, async () => {
  // waiting for the timezone
  await browser.wait(ec.presenceOf(element.all(by.css('div.mat-form-field-flex')).get(0)), 6000);
  // clicking on the dropdownlist
  await element.all(by.css('div.mat-select-arrow-wrapper')).get(0).click();
  await browser.sleep(3000);
  // selecting the vietnam timezone
  await element.all(by.css('span.mat-option-text')).get(15).click();
});

Given(/^3_I select an option for currency$/, async () => {
  // waiting for the currency field
  await browser.wait(ec.presenceOf(element.all(by.css('div.mat-form-field-flex')).get(1)), 6000);
  // clicking on the dropdownlist
  await element.all(by.css('div.mat-select-arrow-wrapper')).get(1).click();
  await browser.sleep(3000);
  // selecting the vietnam currency
  await element.all(by.css('span.mat-option-text')).get(16).click();
});

Given(/^3_I click on the engagement tab$/, async () => {
  EngagementPage = new EngagementAppPage();
  await EngagementPage.engagementTabOption().click();
});

When(/^3_I click on the setting tab$/, async () => {
  await element.all(by.css('h3')).get(6).click();
  await browser.sleep(3000);
});

Then(/^3_I should see that the settings remains unchanged.$/, async () => {
  // waiting for fields to load
  // timezone with vietnam timezone
  await browser.wait(ec.presenceOf(element.all(by.css('div.mat-select-value')).get(0)), 6000);
  // currency with vietnam currency
  await browser.wait(ec.presenceOf(element.all(by.css('div.mat-select-value')).get(1)), 6000);
  // doing an assertion on the text values of timezone and currency
  expect(await element.all(by.css('div.mat-select-value')).get(0).getText()).to.contain('(GMT+7:00) Vietnam Standard Time');
  expect(await element.all(by.css('div.mat-select-value')).get(1).getText()).to.contain('Vietnam VND');

});

// Ensure that the settings for timezone and currency remain constant after re-login
Given(/^4_I am on general setting page$/, async () => {
  // initializing the variable generalSettingsApp
  generalSettingsApp = new GeneralSettingsAppPage();
  await generalSettingsApp.navigateToGeneralSettings();
});

Given(/^4_I select an option for timezone$/, async () => {
  // waiting for the timezone
  await browser.wait(ec.presenceOf(element.all(by.css('div.mat-form-field-flex')).get(0)), 6000);
  // clicking on the dropdownlist
  await element.all(by.css('div.mat-select-arrow-wrapper')).get(0).click();
  await browser.sleep(3000);
  // selecting the vietnam timezone
  await element.all(by.css('span.mat-option-text')).get(15).click();
});

Given(/^4_I select an option for currency$/, async () => {
  // waiting for the currency field
  await browser.wait(ec.presenceOf(element.all(by.css('div.mat-form-field-flex')).get(1)), 6000);
  // clicking on the dropdownlist
  await element.all(by.css('div.mat-select-arrow-wrapper')).get(1).click();
  await browser.sleep(3000);
  // selecting the vietnam currency
  await element.all(by.css('span.mat-option-text')).get(16).click();
});

Given(/^4_I logout of candyland$/, async () => {
  LoginApp = new LoginAppPage();
  await browser.executeScript('window.localStorage.clear();');
  await LoginApp.navigateToLogin();
});

Given(/^4_I re-login$/, async () => {
  // Waiting for account id field to load
  await browser.wait(ec.elementToBeClickable(LoginApp.accountIDField()), 5000);
  // entering correct account id
  await LoginApp.accountIDField().sendKeys(LoginApp.getAccountId());
  // entering correct testUserAccount
  await LoginApp.userAccountField().sendKeys(LoginApp.getUserAccount());
  // entering correct pw
  await LoginApp.pwField().sendKeys(LoginApp.getPassword());
  // pressing the enter key on the accountID field to log in
  await LoginApp.accountIDField().sendKeys(protractor.Key.ENTER);
  await browser.sleep(3000);
});

When(/^4_I click on the settings button.$/, async () => {
  await element.all(by.css('h3')).get(6).click();
});

Then(/^4_I should see that the settings remains unchanged.$/, async () => {
  // waiting for fields to load
  // timezone with vietnam timezone
  await browser.wait(ec.presenceOf(element.all(by.css('div.mat-select-value')).get(0)), 6000);
  // currency with vietnam currency
  await browser.wait(ec.presenceOf(element.all(by.css('div.mat-select-value')).get(0)), 6000);
  // doing an assertion on the text values of timezone and currency
  expect(await element.all(by.css('div.mat-select-value')).get(0).getText()).to.contain('(GMT+7:00) Vietnam Standard Time');
  expect(await element.all(by.css('div.mat-select-value')).get(1).getText()).to.contain('Vietnam VND');
});
