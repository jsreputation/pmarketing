import {
  Given,
  Then,
  When,
} from 'cucumber';
import { browser, protractor } from 'protractor';
import { expect } from 'chai';
import * as path from 'path' ;

import {
  EngagementAppPage,
  ElementApp,
  LoginAppPage,
} from '../pages/candylandApp.po';

// Verifying successful creation of hit the pinata engagment
Given(/^8_I am on engagement page$/, async () => {
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

  await EngagementAppPage.navigateToEngagement();
});

Given(/^8_I click on the create new button$/, async () => {
  const ec = protractor.ExpectedConditions;
  // waiting for the create new button to load
  await browser.wait(ec.elementToBeClickable(ElementApp.clButton()), 6000);
  // clicking on the create new button
  await ElementApp.clButton().click();
});

Given(/^8_I click on the game option.$/, async () => {
  const ec = protractor.ExpectedConditions;
  // waiting for the game option to load
  await browser.wait(ec.elementToBeClickable(EngagementAppPage.engagementTypeOptions().get(1)), 6000);
  // clicking on the game option
  await EngagementAppPage.engagementTypeOptions().get(1).click();
});

Given(/^8_I select hit the pinata option$/, async () => {
  const ec = protractor.ExpectedConditions;
  // waiting for the game engagement options to load
  await browser.wait(ec.elementToBeClickable(EngagementAppPage.gamePinataOptions()), 6000);
  // clicking on the hit the pinata option
  await EngagementAppPage.gamePinataOptions().click();
});

Given(/^8_I click on the next button$/, async () => {
  await ElementApp.clButtonArray().get(2).click();
  await browser.sleep(3000);
});

Given(/^8_I enter a test string in the headline message and sub-headline message$/, async () => {
  const ec = protractor.ExpectedConditions;
  // waiting for headline field to load
  await browser.wait(ec.presenceOf(ElementApp.inputTextArray().get(1)), 6000);
  // waiting for sub-headline field to load
  await browser.wait(ec.presenceOf(ElementApp.inputTextArray().get(2)), 6000);
  // inputing a test string in the headline field
  await ElementApp.inputTextArray().get(1).clear();
  await ElementApp.inputTextArray().get(1).sendKeys('E2ETestString0001');
  // inputing a test string in the sub-headline field
  await ElementApp.inputTextArray().get(2).clear();
  await ElementApp.inputTextArray().get(2).sendKeys('E2ETestString0002');
});

Given(/^8_I upload a background image.$/, async () => {
  const FileToUpload = './testArtifacts/testimg.png';
  const absolutePath = path.resolve(__dirname, FileToUpload);
  const ec = protractor.ExpectedConditions;
  // waiting for the upload field to load
  await browser.wait(ec.presenceOf(ElementApp.inputFile()), 6000);
  // uploading test img file into field
  await ElementApp.inputFile().sendKeys(absolutePath);
  await browser.sleep(3000);
});

Given(/^8_I click on the save button.$/, async () => {
  const ec = protractor.ExpectedConditions;
  // waiting for the save button to load
  await browser.wait(ec.elementToBeClickable(ElementApp.clButtonArray().get((1))), 6000);
  // clicking on the save button
  await ElementApp.clButtonArray().get((1)).click();
});

When(/^8_I click on an option in the engagment dialog box$/, async () => {
  const ec = protractor.ExpectedConditions;
  // Wait for engagement tab to appear
  await browser.wait(ec.presenceOf(ElementApp.clConfirmDialog()), 6000);
  // clicking on the launch now button
  await ElementApp.clButtonArray().get(2).click();
  await browser.sleep(3000);
});

Then(/^8_I should see the game created.$/, async () => {
  const ec = protractor.ExpectedConditions;
  // waiting for the card to be loaded
  await browser.wait(ec.presenceOf(ElementApp.engagementItemArray().get(0)), 6000);
  // doing an assertion on the text string of the card
  expect(await ElementApp.engagementItemArray().get(0).getText()).to.contain('Hit the Pinata Template');
});
