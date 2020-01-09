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
  EngagementAppPage,
  CreateHitThePinataAppPage,
  ElementApp,
  LoginAppPage,
} from '../pages/candylandApp.po';

// Ensure that hit the pinata engagement type option is present.
Given(/^1_I am on engagement page$/, async () => {
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
  await browser.sleep(3000);
  // await browser.executeScript('WalkMeAPI.stopFlow()');
});

Given(/^1_I click on the create new button$/, async () => {
  const ec = protractor.ExpectedConditions;
  // waiting for the create new button to load
  await browser.wait(ec.elementToBeClickable(ElementApp.clButton()), 6000);
  // clicking on the create new button
  await ElementApp.clButton().click();
});

When(/^1_I Click on the game option.$/, async () => {
  const ec = protractor.ExpectedConditions;
  // waiting for the game option to load
  await browser.wait(ec.elementToBeClickable(EngagementAppPage.engagementTypeOptions().get(1)), 6000);
  // clicking on the game option
  await EngagementAppPage.engagementTypeOptions().get(1).click();
});

Then(/^1_The hit the pinata game should be present.$/, async () => {
  const ec = protractor.ExpectedConditions;
  // waiting for the game engagement options to load
  await browser.wait(ec.elementToBeClickable(EngagementAppPage.gamePinataOptions()), 6000);
  // doing an assertion on the presence of the element and the text of the option
  expect(await EngagementAppPage.gamePinataOptions().isDisplayed()).to.equal(true);
  expect(await EngagementAppPage.gamePinataName().getText()).to.contain('Hit the pinata');
});

// Ensure that selecting the hit the pinata option and clicking next navigates to template creation.

Given(/^2_I am on engagement page$/, async () => {
  await EngagementAppPage.navigateToEngagement();
  await browser.sleep(3000);
  // await browser.executeScript('WalkMeAPI.stopFlow()');
  // await browser.executeScript('document.getElementById("walkme-player").remove()');
});

Given(/^2_I click on the create new button$/, async () => {
  const ec = protractor.ExpectedConditions;
  // waiting for the create new button to load
  await browser.wait(ec.elementToBeClickable(ElementApp.clButton()), 6000);
  // clicking on the create new button
  await ElementApp.clButton().click();
});

Given(/^2_I Click on the game option.$/, async () => {
  const ec = protractor.ExpectedConditions;
  // waiting for the game option to load
  await browser.wait(ec.elementToBeClickable(EngagementAppPage.engagementTypeOptions().get(1)), 6000);
  // clicking on the game option
  await EngagementAppPage.engagementTypeOptions().get(1).click();
});

Given(/^2_I click on hit the pinata option$/, async () => {
  const ec = protractor.ExpectedConditions;
  // waiting for the game engagement options to load
  await browser.wait(ec.elementToBeClickable(EngagementAppPage.gamePinataOptions()), 6000);
  // clicking on the hit the pinata option
  await EngagementAppPage.gamePinataOptions().click();
});

When(/^2_I click next$/, async () => {
  await ElementApp.matFlatButtonArray().get(2).click();
  await browser.sleep(3000);
});

Then(/^2_I should be navigated to the hit the pinata page.$/, async () => {
  expect(await browser.getCurrentUrl()).to.contain('new-pinata');
});

// Ensure that hit the pinata page have relevant elements

Given(/^3_I am on the hit the pinata creation page.$/, async () => {
  await CreateHitThePinataAppPage.navigateToHitThePinata();
  await browser.sleep(3000);
  // await browser.executeScript('WalkMeAPI.stopFlow()');
});

Then(/^3_I should see the relevant elements for hit the pinata creation page.$/, async () => {
  const ec = protractor.ExpectedConditions;
  // waiting for the relevant text fields to load
  // waiting for header field to load
  await browser.wait(ec.presenceOf(ElementApp.inputTextArray().get(0)), 6000);
  // waiting for headline field to load
  await browser.wait(ec.presenceOf(ElementApp.inputTextArray().get(1)), 6000);
  // waiting for sub-headline field to load
  await browser.wait(ec.presenceOf(ElementApp.inputTextArray().get(2)), 6000);
  // waiting for button text to load
  await browser.wait(ec.presenceOf(ElementApp.inputTextArray().get(3)), 6000);
  // doing an assertion on the elements present
  // header field
  expect(await ElementApp.inputTextArray().get(0).isDisplayed()).to.equal(true);
  // headline field
  expect(await ElementApp.inputTextArray().get(1).isDisplayed()).to.equal(true);
  // sub-headline field
  expect(await ElementApp.inputTextArray().get(2).isDisplayed()).to.equal(true);
  // button text field
  expect(await ElementApp.inputTextArray().get(3).isDisplayed()).to.equal(true);
});
