import { Before, Given, Then, When } from 'cucumber';
import { expect } from 'chai';
import { browser, element, by , protractor, ElementFinder } from 'protractor';
import { CreateRewardAppPage } from '../pages/candylandApp.po';

let CreateRewardPage: CreateRewardAppPage;
Before( () => {
  // initializing page objects instance
  CreateRewardPage = new CreateRewardAppPage();
});

// Verifying that the relevant input text fields are present.
Given(/^6_that I am on the reward creation page$/, async () => {
  await CreateRewardPage.navigateToRewardCreate();
});

Then(/^6_The relevant text input fields are present.$/, async () => {
  const ec = protractor.ExpectedConditions;
  // waiting for relevant text input fields to load
  // waiting for header to load
  await browser.wait(ec.presenceOf(element.all(by.css('input[ng-reflect-type="text"]')).get(0)), 5000);
  // waiting for voucher code type field to load
  await browser.wait(ec.presenceOf(element.all(by.css('input[ng-reflect-type="text"]')).get(1)), 5000);
  // waiting for description field to load
  await browser.wait(ec.presenceOf(element.all(by.css('textarea')).get(0)), 5000);
  // waiting for the t&c field to load
  await browser.wait(ec.presenceOf(element.all(by.css('textarea')).get(1)), 5000);
  // asserting the presence of the relevant text input fields
  expect(await element.all(by.css('input[ng-reflect-type="text"]')).get(0).isPresent()).to.equal(true);
  expect(await element.all(by.css('input[ng-reflect-type="text"]')).get(1).isPresent()).to.equal(true);
  expect(await element.all(by.css('textarea')).get(0).isPresent()).to.equal(true);
  expect(await element.all(by.css('textarea')).get(1).isPresent()).to.equal(true);
});

// Verifying the number of options in reward type.
Given(/^7_that I am on the reward creation page.$/, async () => {
  await CreateRewardPage.navigateToRewardCreate();
});

When(/^7_I click on reward type.$/, async () => {
  const ec = protractor.ExpectedConditions;
  // waiting for reward type field
  await browser.wait(ec.elementToBeClickable(element.all(by.css('div.mat-select-trigger')).get(0)), 6000 );
  await element.all(by.css('div.mat-select-trigger')).get(0).click();
});

Then(/^7_I should see eight options.$/, async () => {
  // asserting the number of options
  expect(await element.all(by.css('span.mat-option-text')).count()).to.equal(8);
});

// Verifying the number of options in categories.
Given(/^8_that I am on the reward creation page.$/, async () => {
  await CreateRewardPage.navigateToRewardCreate();
});

When(/^8_I click on categories.$/, async () => {
  const ec = protractor.ExpectedConditions;
  // waiting for category field
  await browser.wait(ec.elementToBeClickable(element.all(by.css('div.mat-select-trigger')).get(1)), 6000 );
  await element.all(by.css('div.mat-select-trigger')).get(1).click();
});

Then(/^8_I should see eight options.$/, async () => {
  // asserting the number of options
  expect(await element.all(by.css('span.mat-option-text')).count()).to.equal(8);
});

// Verifying the number of options in redemption types.
Given(/^9_that I am on the reward creation page.$/, async () => {
  await CreateRewardPage.navigateToRewardCreate();
});

When(/^9_I click on redemption type.$/, async () => {
  const ec = protractor.ExpectedConditions;
  // waiting for category field
  await browser.wait(ec.elementToBeClickable(element.all(by.css('div.mat-select-trigger')).get(2)), 6000 );
  await element.all(by.css('div.mat-select-trigger')).get(2).click();
});

Then(/^9_I should see four options.$/, async () => {
  // asserting the number of options
  expect(await element.all(by.css('span.mat-option-text')).count()).to.equal(4);
});

// Verifiying that there is an upload field when clicking on the option user upload
Given(/^10_that I am on the survey creation page.$/, async () => {
  await CreateRewardPage.navigateToRewardCreate();
  await browser.sleep(3000);
  // making the position header absolute so it will not obstruct element
  await browser.executeScript('document.querySelector("div.page-header.full-with").style.position = "absolute"');
  // browser.sleep(3000);
});

When(/^10_I click on the user upload button.$/, async () => {
  const ec = protractor.ExpectedConditions;
  // waiting for user upload radio button to load
  // await browser.actions().sendKeys(protractor.Key.HOME).perform();
  await browser.wait(ec.elementToBeClickable(element.all(by.className('mat-radio-ripple mat-ripple')).get(4)), 6000);
  // getting the element finder for the radio button for user upload
  const elementRadioButton: ElementFinder = element.all(by.css('div.mat-radio-outer-circle')).get(4);
  browser.executeScript('arguments[0].scrollIntoView(true);', elementRadioButton.getWebElement()).then(function anon(): void {
    elementRadioButton.click();
  });
});

Then(/^10_There should be an upload field.$/, async () => {
  const ec = protractor.ExpectedConditions;
  // waiting for the file upload field to be present
  await browser.wait(ec.presenceOf(element.all(by.css('input[type=file]')).get(1)), 5000);
  // asserting for the presence of the file upload field
  expect(await element.all(by.css('input[type=file]')).get(1).isPresent()).to.be.equal(true);
});

// Verifiying that the slider functionality is working for voucher limits per campaign
Given(/^11_that I am on the survey creation page.$/, async () => {
  await CreateRewardPage.navigateToRewardCreate();
});

When(/^11_I click on the slider .$/, async () => {
  const ec = protractor.ExpectedConditions;
  // waiting for the slider to load for voucher limits per campaign
  await browser.wait(ec.elementToBeClickable(element.all(by.css('input[type=checkbox]')).get(1)), 6000);
  // clicking on the slider
  await element.all(by.className('mat-slide-toggle-thumb-container')).get(0).click();
});

Then(/^11_I should be type a value in the voucher field and select the frequency.$/, async () => {
  const ec = protractor.ExpectedConditions;
  // waiting for number field for voucher limits per campaign to load
  await browser.wait(ec.presenceOf(element.all(by.css('input[type=number]')).get(1)), 6000);
  // doing on the assertion on the disable attr of the number field
  expect(await element.all(by.css('input[type=number]')).get(2).getAttribute('disabled')).to.be.equal(null);
});

// Verifiying that the slider functionality is working for issuance limits per user
Given(/^12_that I am on the survey creation page.$/, async () => {
  await CreateRewardPage.navigateToRewardCreate();
});

When(/^12_I click on the slider .$/, async () => {
  const ec = protractor.ExpectedConditions;
  // waiting for the slider to load for voucher limits per campaign
  await browser.wait(ec.elementToBeClickable(element.all(by.css('input[type=checkbox]')).get(2)), 6000);
  // clicking on the slider
  await element.all(by.className('mat-slide-toggle-thumb-container')).get(1).click();
});

Then(/^12_I should be able to type a value in the times field and select the frequency.$/, async () => {
  const ec = protractor.ExpectedConditions;
  // waiting for number field for voucher limits per campaign to load
  await browser.wait(ec.presenceOf(element.all(by.css('input[type=number]')).get(2)), 6000);
  // doing on the assertion on the disable attr of the number field
  expect(await element.all(by.css('input[type=number]')).get(3).getAttribute('disabled')).to.be.equal(null);
});

// Verifiying that the slider functionality is working for redemption limits per user
Given(/^13_that I am on the survey creation page.$/, async () => {
  await CreateRewardPage.navigateToRewardCreate();
});

When(/^13_I click on the slider .$/, async () => {
  const ec = protractor.ExpectedConditions;
  // waiting for the slider to load for voucher limits per campaign
  await browser.wait(ec.elementToBeClickable(element.all(by.css('input[type=checkbox]')).get(3)), 6000);
  // clicking on the slider
  await element.all(by.className('mat-slide-toggle-thumb-container')).get(2).click();
});

Then(/^13_I should be able to type a value in the times field and select the frequency.$/, async () => {
  const ec = protractor.ExpectedConditions;
  await browser.wait(ec.presenceOf(element.all(by.css('input[type=number]')).get(4)), 6000);
  // doing on the assertion on the disable attr of the number field
  expect(await element.all(by.css('input[type=number]')).get(4).getAttribute('disabled')).to.be.equal(null);
});
