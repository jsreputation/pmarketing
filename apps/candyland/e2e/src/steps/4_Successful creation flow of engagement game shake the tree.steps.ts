import {
  Given,
  Then,
  When,
} from 'cucumber';
import {
  browser,
  protractor,
  ProtractorExpectedConditions,
} from 'protractor';
import { expect } from 'chai';
import * as moment from 'moment';

import {
  EngagementAppPage,
  CreateShakeTheTreeAppPage,
  ElementApp,
  LoginAppPage,
} from '../pages/candylandApp.po';

const ec: ProtractorExpectedConditions = protractor.ExpectedConditions;

// Getting the current day, month , year
const now = moment().format();

// Successful creation of engagement game shake the tree - launch now
Given(/^27_I am on the engagment page.$/, async () => {
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

  await EngagementAppPage.navigateToEngagement();
  await browser.waitForAngularEnabled(false);
  await browser.sleep(3000);
});

Given(/^27_I click on create new button.$/, async () => {
  await ElementApp.matFlatButtonPrimary().click();
});

Given(/^27_I click on games button.$/, async () => {
  // clicking on the games option
  await CreateShakeTheTreeAppPage.shakeTreeTypeOptions().click();
});

Given(/^27_I click on shake the tree.$/, () => {});

Given(/^27_I click on the next button.$/, async () => {
  // clicking on the next button
  await ElementApp.matFlatButtonPrimaryArray().get(1).click();
});

Given(/^27_I type the test string$/, async () => {
  // waiting for main headline field to load
  await browser.wait(ec.presenceOf(ElementApp.inputTextArray().get(1)), 6000);
  // typing test string in the main headline text field
  await ElementApp.inputTextArray().get(0).clear();
  await ElementApp.inputTextArray().get(0).sendKeys('Test - launch now');
});

Given(/^27_I press save button$/, async () => {
  // clicking on the save button
  await CreateShakeTheTreeAppPage.shakeTreeSaveButton().click();
});

When(/^27_I press launch now button$/, async () => {
  // clicking on the launch now button
  await CreateShakeTheTreeAppPage.launchNowButton().click();
});

Then(/^27_Game is present under the engagment category .$/, async () => {
  // Verifying that the latest card has the correct item name
  await browser.wait(ec.presenceOf(EngagementAppPage.engagementItemArray().first()), 6000);
  expect(await EngagementAppPage.itemInfo().getText()).to.contain('Test - launch now');
  // Verifying the current date of transaction
  await browser.wait(ec.presenceOf(CreateShakeTheTreeAppPage.transactionDate()), 6000);
  expect(await CreateShakeTheTreeAppPage.transactionDate().
    getText()).to.equal(moment(now).format('MMM DD, YYYY'));
});

// Successful creation of engagement game shake the tree - launch later
Given(/^28_I am on the engagment page.$/, async () => {
  await EngagementAppPage.navigateToEngagement();
  await browser.sleep(3000);
});

Given(/^28_I click on create new button.$/, async () => {
  await ElementApp.matFlatButtonPrimary().click();
});

Given(/^28_I click on games button.$/, async () => {
  await CreateShakeTheTreeAppPage.shakeTreeTypeOptions().click();
});

Given(/^28_I click on shake the tree.$/, () => {});

Given(/^28_I click on the next button.$/, async () => {
  await ElementApp.matFlatButtonPrimaryArray().get(1).click();
});

Given(/^28_I type the test string$/, async () => {
  // waiting for main headline field to load
  await browser.wait(ec.presenceOf(ElementApp.inputTextArray().get(1)), 6000);
  // typing test string in the main headline text field
  await ElementApp.inputTextArray().get(0).clear();
  await ElementApp.inputTextArray().get(0).sendKeys('Test - launch later');
});

Given(/^28_I press save button$/, async () => {
  await CreateShakeTheTreeAppPage.shakeTreeSaveButton().click();
  await browser.sleep(3000);
});

When(/^28_I press launch later button$/, async () => {
  await CreateShakeTheTreeAppPage.launchLaterBtn().click();
});

Then(/^28_Game is present under the engagment category .$/, async () => {
  // Verifying that the latest card has the correct item name
  await browser.wait(ec.presenceOf(EngagementAppPage.engagementItemArray().first()), 6000);
  expect(await EngagementAppPage.itemInfo().getText()).to.contain('Test - launch later');
  // Verifying the current date of transaction
  await browser.wait(ec.presenceOf(CreateShakeTheTreeAppPage.transactionDate()), 6000);
  expect(await CreateShakeTheTreeAppPage.transactionDate().
    getText()).to.equal(moment(now).format('MMM DD, YYYY'));
});

// Dialog box present when save button is pressed
Given(/^29_I am on the shake a tree game creation page$/, async () => {
  await CreateShakeTheTreeAppPage.navigateToShakeTheTree();
});

When(/^29_I press the save button$/, async () => {
  await CreateShakeTheTreeAppPage.shakeTreeSaveButton().click();
  await browser.sleep(3000);
});

Then(/^29_The file dialog box is present.$/, async () => {
  expect(await ElementApp.clConfirmDialog().isPresent()).to.equal(true);
});

// Dialog box has 2 options present when save button is pressed.
Given(/^30_I am on the shake a tree game creation page$/, async () => {
  await CreateShakeTheTreeAppPage.navigateToShakeTheTree();
});

When(/^30_I press the save button$/, async () => {
  await CreateShakeTheTreeAppPage.shakeTreeSaveButton().click();
});

Then(/^30_Both options are present.$/, async () => {
  // doing an assertion on the presence of both elements in the dialog
  // waiting for the dialog element to load
  await browser.wait(ec.presenceOf(ElementApp.clConfirmDialog()), 6000);
  expect(await ElementApp.clButtonArray().get(1).isPresent()).to.equal(true);
  expect(await ElementApp.clButtonArray().get(2).isPresent()).to.equal(true);
});
