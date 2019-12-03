import {
  Given,
  Then,
  When,
} from 'cucumber';
import {
  browser,
  protractor,
  ElementFinder,
  ProtractorExpectedConditions,
} from 'protractor';
import { expect } from 'chai';

import {
  CreateRewardAppPage,
  ElementApp,
  LoginAppPage,
} from '../pages/candylandApp.po';

const ec: ProtractorExpectedConditions = protractor.ExpectedConditions;

// Verifying that the relevant input text fields are present.
Given(/^6_that I am on the reward creation page$/, async () => {
  // login process
  await LoginAppPage.navigateToLogin();
  // Waiting for account id field to load
  await browser.wait(ec.elementToBeClickable(ElementApp.inputArray().first()), 5000);
  // entering correct account id
  await ElementApp.inputArray().first().sendKeys(LoginAppPage.getAccountId());
  // entering correct testUserAccount
  await ElementApp.inputArray().get(1).sendKeys(LoginAppPage.getUserAccount());
  // entering correct pw
  await LoginAppPage.pwField().sendKeys(LoginAppPage.getPassword());
  // pressing the enter key on the accountID field to log in
  await LoginAppPage.accountIDField().sendKeys(protractor.Key.ENTER);
  await browser.sleep(3000);

  await CreateRewardAppPage.navigateToRewardCreate();
});

Then(/^6_The relevant text input fields are present.$/, async () => {
  // waiting for relevant text input fields to load
  // waiting for header to load
  await browser.wait(ec.presenceOf(CreateRewardAppPage.headerField()), 5000);
  // waiting for description field to load
  await browser.wait(ec.presenceOf(CreateRewardAppPage.textField().get(0)), 5000);
  // waiting for the t&c field to load
  await browser.wait(ec.presenceOf(CreateRewardAppPage.textField().get(1)), 5000);
  // asserting the presence of the relevant text input fields
  expect(await CreateRewardAppPage.headerField().isPresent()).to.equal(true);
  expect(await CreateRewardAppPage.textField().get(0).isPresent()).to.equal(true);
  expect(await CreateRewardAppPage.textField().get(1).isPresent()).to.equal(true);
});

// Verifying the number of options in reward type.
Given(/^7_that I am on the reward creation page.$/, async () => {
  await CreateRewardAppPage.navigateToRewardCreate();
});

When(/^7_I click on reward type.$/, async () => {
  // waiting for reward type field
  await browser.wait(ec.elementToBeClickable(ElementApp.matSelectTrigger().get(0)), 6000 );
  await ElementApp.matSelectTrigger().get(0).click();
});

Then(/^7_I should see eight options.$/, async () => {
  // asserting the number of options
  expect(await ElementApp.spanMatOptionText().count()).to.equal(8);
});

// Verifying the number of options in categories.
Given(/^8_that I am on the reward creation page.$/, async () => {
  await CreateRewardAppPage.navigateToRewardCreate();
});

When(/^8_I click on categories.$/, async () => {
  // waiting for category field
  await browser.wait(ec.elementToBeClickable(ElementApp.matSelectTrigger().get(1)), 6000 );
  await ElementApp.matSelectTrigger().get(1).click();
});

Then(/^8_I should see eight options.$/, async () => {
  // asserting the number of options
  expect(await ElementApp.spanMatOptionText().count()).to.equal(8);
});

// Verifying the number of options in redemption types.
Given(/^9_that I am on the reward creation page.$/, async () => {
  await CreateRewardAppPage.navigateToRewardCreate();
});

When(/^9_I click on redemption type.$/, async () => {
  // waiting for redemption type
  await browser.wait(ec.elementToBeClickable(ElementApp.matSelectTrigger().get(2)), 6000 );
  await ElementApp.matSelectTrigger().get(2).click();
});

Then(/^9_I should see four options.$/, async () => {
  // waiting for option field to load
  await browser.wait(ec.presenceOf(ElementApp.spanMatOptionText().get(0)), 6000 );
  // asserting the number of options
  expect(await ElementApp.spanMatOptionText().count()).to.equal(4);
});

// This scenario is not valid for now
// Verifiying that there is an upload field when clicking on the option user upload
Given(/^10_that I am on the reward creation page.$/, async () => {
  await CreateRewardAppPage.navigateToRewardCreate();
  await browser.sleep(3000);
  // making the position header absolute so it will not obstruct element
  await browser.executeScript('document.querySelector("div.page-header.full-with").style.position = "absolute"');
  // browser.sleep(3000);
});

When(/^10_I click on the user upload button.$/, async () => {
  // waiting for user upload radio button to load
  // await browser.actions().sendKeys(protractor.Key.HOME).perform();
  await browser.wait(ec.elementToBeClickable(CreateRewardAppPage.loadRadioButton()), 6000);
  // getting the element finder for the radio button for user upload
  const elementRadioButton: ElementFinder = CreateRewardAppPage.radioButton();
  await browser.executeScript('arguments[0].scrollIntoView(true);', elementRadioButton.getWebElement()).then(function anon(): void {
    elementRadioButton.click();
  });
});

Then(/^10_There should be an upload field.$/, async () => {
  // waiting for the file upload field to be present
  await browser.wait(ec.presenceOf(ElementApp.inputFileArray().get(1)), 5000);
  // asserting for the presence of the file upload field
  expect(await ElementApp.inputFileArray().get(1).isPresent()).to.be.equal(true);
});

// This scenario is not valid for now
// Verifiying that the slider functionality is working for voucher limits per campaign
Given(/^11_that I am on the reward creation page.$/, async () => {
  await CreateRewardAppPage.navigateToRewardCreate();
  await browser.sleep(3000);
  await browser.executeScript('document.getElementById("walkme-player").remove();');
});

When(/^11_I click on the slider .$/, async () => {
  // waiting for the slider to load for voucher limits per campaign
  await browser.wait(ec.elementToBeClickable(CreateRewardAppPage.checkboxField().get(1)), 6000);
  // clicking on the slider
  await CreateRewardAppPage.slider().get(0).click();
  await browser.sleep(3000);
});

Then(/^11_I should be type a value in the voucher field and select the frequency.$/, async () => {
  // waiting for number field for voucher limits per campaign to load
  await browser.wait(ec.presenceOf(ElementApp.inputNumberArray().get(1)), 6000);
  // doing on the assertion on the disable attr of the number field
  expect(await ElementApp.inputNumberArray().get(2).getAttribute('disabled')).to.be.equal(null);
});

// This scenario is not valid for now
// Verifiying that the slider functionality is working for issuance limits per user
Given(/^12_that I am on the reward creation page.$/, async () => {
  await CreateRewardAppPage.navigateToRewardCreate();
  await browser.sleep(3000);
  await browser.executeScript('document.getElementById("walkme-player").remove();');
});

When(/^12_I click on the slider .$/, async () => {
  // waiting for the slider to load for voucher limits per campaign
  await browser.wait(ec.elementToBeClickable(CreateRewardAppPage.checkboxField().get(2)), 6000);
  // clicking on the slider
  await CreateRewardAppPage.slider().get(1).click();
  await browser.sleep(3000);
});

Then(/^12_I should be able to type a value in the times field and select the frequency.$/, async () => {
  // waiting for number field for voucher limits per campaign to load
  await browser.wait(ec.presenceOf(ElementApp.inputNumberArray().get(2)), 6000);
  // doing on the assertion on the disable attr of the number field
  expect(await ElementApp.inputNumberArray().get(3).getAttribute('disabled')).to.be.equal(null);
});

// This scenario is not valid for now
// Verifiying that the slider functionality is working for redemption limits per user
Given(/^13_that I am on the reward creation page.$/, async () => {
  await CreateRewardAppPage.navigateToRewardCreate();
  await browser.sleep(3000);
  await browser.executeScript('document.getElementById("walkme-player").remove();');
});

When(/^13_I click on the slider .$/, async () => {
  // waiting for the slider to load for redemption limits per campaign
  await browser.wait(ec.elementToBeClickable(CreateRewardAppPage.checkboxField().get(3)), 6000);
  // clicking on the slider
  await CreateRewardAppPage.slider().get(2).click();
  await browser.sleep(3000);
});

Then(/^13_I should be able to type a value in the times field and select the frequency.$/, async () => {
  await browser.wait(ec.presenceOf(ElementApp.inputNumberArray().get(4)), 6000);
  // doing on the assertion on the disable attr of the number field
  expect(await ElementApp.inputNumberArray().get(4).getAttribute('disabled')).to.be.equal(null);
});
