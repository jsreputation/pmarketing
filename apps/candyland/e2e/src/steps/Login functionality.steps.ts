import {
  Before,
  Given,
  Then,
  When,
} from 'cucumber';
import {
  browser,
  protractor,
} from 'protractor';
import { expect } from 'chai';
import * as browserLogs from 'protractor-browser-logs';

import {
  ElementApp,
  LoginAppPage,
  DashboardAppPage,
} from '../pages/candylandApp.po';

// initializing log variable
let logs: any ;

Before( () => {
  // initalizing logging feature
  logs = browserLogs(browser);
  logs.ignore(logs.DEBUG);
  logs.ignore(logs.INFO);
});

// Login with correct credentials
Given(/^31_I am on the login page$/, async () => {
  await DashboardAppPage.navigateToDashboard();
  browser.waitForAngularEnabled(false);
  // clearing session token in local storage
  await browser.executeScript('window.localStorage.clear();');
  await LoginAppPage.navigateToLogin();
  await browser.waitForAngularEnabled(false);
});

When(/^31_I enter the right credentials$/, async () => {
  const ec = protractor.ExpectedConditions;
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
});
Then(/^31_I am able to login successfully$/, async () => {
  // able to log in successfully and redirect to dashboard
  expect(await browser.getCurrentUrl()).to.contain('dashboard');
});

// Login with incorrect username
Given(/^32_I am on the login page$/, async () => {
  await DashboardAppPage.navigateToDashboard();
  // clearing session token in local storage
  await browser.executeScript('window.localStorage.clear();');
  await LoginAppPage.navigateToLogin();
  await browser.waitForAngularEnabled(false);
});

When(/^32_I entered the incorrect username with the valid p\/w$/, async () => {
  const ec = protractor.ExpectedConditions;
  // Waiting for account id field to load
  await browser.wait(ec.elementToBeClickable(ElementApp.inputArray().first()), 5000);
  // entering correct account id
  await ElementApp.inputArray().first().sendKeys(LoginAppPage.getAccountId());
  // entering incorrect useraccount
  await ElementApp.inputArray().get(1).sendKeys('test0101');
  // entering correct pw
  await ElementApp.inputArray().get(2).sendKeys(LoginAppPage.getPassword());
  // pressing the enter key on the accountID field to log in
  await ElementApp.inputArray().first().sendKeys(protractor.Key.ENTER);
});

Then(/^32_I am not able to login.$/, async () => {
  // placing an assertion on the error message displayed containing 401 in the console window
  await logs.expect(/401/);
});

// Login with incorrect p/w
Given(/^33_I am on the login page.$/, async () => {
  await LoginAppPage.navigateToLogin();
  // clearing session token in local storage
  await browser.executeScript('window.localStorage.clear();');
  await LoginAppPage.navigateToLogin();
  await browser.waitForAngularEnabled(false);
});

When(/^33_I entered the correct email and invalid p\/w$/, async () => {
  const ec = protractor.ExpectedConditions;
  // Waiting for account id field to load
  await browser.wait(ec.elementToBeClickable(ElementApp.inputArray().first()), 5000);
  // entering correct account id
  await ElementApp.inputArray().first().sendKeys(LoginAppPage.getAccountId());
  // entering correct testUserAccount
  await ElementApp.inputArray().get(1).sendKeys(LoginAppPage.getUserAccount());
  // entering incorrect pw
  await ElementApp.inputArray().get(2).sendKeys('test0101');
  // pressing the enter key on the accountID field to log in
  await ElementApp.inputArray().first().sendKeys(protractor.Key.ENTER);
});

Then(/^33_I am not able to login.$/, async () => {
  // asserting the console log to throw a 401 message
  await logs.expect(/401/);
});

// Login with incorrect accountId

Given(/^34_I am on the login page.$/, async () => {
  await LoginAppPage.navigateToLogin();
  // clearing session token in local storage
  await browser.executeScript('window.localStorage.clear();');
  await LoginAppPage.navigateToLogin();
  await browser.waitForAngularEnabled(false);
});

When(/^34_I entered the correct email and p\/w with invalid accountId$/, async () => {
  const ec = protractor.ExpectedConditions;
  // Waiting for account id field to load
  await browser.wait(ec.elementToBeClickable(ElementApp.inputArray().first()), 5000);
  // entering incorrect account id
  await ElementApp.inputArray().first().sendKeys('300');
  // entering correct testUserAccount
  await ElementApp.inputArray().get(1).sendKeys(LoginAppPage.getUserAccount());
  // entering correct pw
  await ElementApp.inputArray().get(2).sendKeys(LoginAppPage.getPassword());
  // pressing the enter key on the accountID field to log in
  await ElementApp.inputArray().first().sendKeys(protractor.Key.ENTER);
});

Then(/^34_I am not able to login.$/, async () => {
  // asserting the console log to throw a 401 message
  await logs.expect(/401/);
});

// Verifying presence of message prompt to user.
Given(/^35_I am on the login page.$/, async () => {
  await DashboardAppPage.navigateToDashboard();
  // clearing session token in local storage
  await browser.executeScript('window.localStorage.clear();');
  await LoginAppPage.navigateToLogin();
  await browser.waitForAngularEnabled(false);
});

When(/^35_I entered the correct email and invalid p\/w$/, async () => {
  const ec = protractor.ExpectedConditions;
  // Waiting for account id field to load
  await browser.wait(ec.elementToBeClickable(ElementApp.inputArray().first()), 5000);
  // entering correct account id
  await ElementApp.inputArray().first().sendKeys(LoginAppPage.getAccountId());
  // entering correct testUserAccount
  await ElementApp.inputArray().get(1).sendKeys(LoginAppPage.getUserAccount());
  // entering incorrect pw
  await ElementApp.inputArray().get(2).sendKeys('test0101');
  // pressing the enter key on the accountID field to log in
  await ElementApp.inputArray().first().sendKeys(protractor.Key.ENTER);
});

Then(/^35_I see the message prompt for invalid login$/, async () => {
  // asserting for the message prompt
  await logs.expect('The email or password is incorrect! Http failure response for https://api-dev1.uat.whistler.perxtech.io/iam/users/sign_in: 401 OK');
});
