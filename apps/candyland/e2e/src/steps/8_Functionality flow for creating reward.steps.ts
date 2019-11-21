import { Before, Given, Then, When } from 'cucumber';
import { expect } from 'chai';
import { browser, protractor, ElementFinder } from 'protractor';
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
  await browser.wait(ec.presenceOf(CreateRewardPage.headerField()), 5000);
  // waiting for voucher code type field to load
  await browser.wait(ec.presenceOf(CreateRewardPage.voucherCodeField()), 5000);
  // waiting for description field to load
  await browser.wait(ec.presenceOf(CreateRewardPage.textField().get(0)), 5000);
  // waiting for the t&c field to load
  await browser.wait(ec.presenceOf(CreateRewardPage.textField().get(1)), 5000);
  // asserting the presence of the relevant text input fields
  expect(await CreateRewardPage.headerField().isPresent()).to.equal(true);
  expect(await CreateRewardPage.voucherCodeField().isPresent()).to.equal(true);
  expect(await CreateRewardPage.textField().get(0).isPresent()).to.equal(true);
  expect(await CreateRewardPage.textField().get(1).isPresent()).to.equal(true);
});

// Verifying the number of options in reward type.
Given(/^7_that I am on the reward creation page.$/, async () => {
  await CreateRewardPage.navigateToRewardCreate();
});

When(/^7_I click on reward type.$/, async () => {
  const ec = protractor.ExpectedConditions;
  // waiting for reward type field
  await browser.wait(ec.elementToBeClickable(CreateRewardPage.selectField().get(0)), 6000 );
  await CreateRewardPage.selectField().get(0).click();
});

Then(/^7_I should see eight options.$/, async () => {
  // asserting the number of options
  expect(await CreateRewardPage.rewardOptions().count()).to.equal(8);
});

// Verifying the number of options in categories.
Given(/^8_that I am on the reward creation page.$/, async () => {
  await CreateRewardPage.navigateToRewardCreate();
});

When(/^8_I click on categories.$/, async () => {
  const ec = protractor.ExpectedConditions;
  // waiting for category field
  await browser.wait(ec.elementToBeClickable(CreateRewardPage.selectField().get(1)), 6000 );
  await CreateRewardPage.selectField().get(1).click();
});

Then(/^8_I should see eight options.$/, async () => {
  // asserting the number of options
  expect(await CreateRewardPage.rewardOptions().count()).to.equal(8);
});

// Verifying the number of options in redemption types.
Given(/^9_that I am on the reward creation page.$/, async () => {
  await CreateRewardPage.navigateToRewardCreate();
});

When(/^9_I click on redemption type.$/, async () => {
  const ec = protractor.ExpectedConditions;
  // waiting for redemption type
  await browser.wait(ec.elementToBeClickable(CreateRewardPage.selectField().get(2)), 6000 );
  await CreateRewardPage.selectField().get(2).click();
});

Then(/^9_I should see four options.$/, async () => {
  const ec = protractor.ExpectedConditions;
  // waiting for option field to load
  await browser.wait(ec.presenceOf(CreateRewardPage.rewardOptions().get(0)), 6000 );
  // asserting the number of options
  expect(await CreateRewardPage.rewardOptions().count()).to.equal(4);
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
  await browser.wait(ec.elementToBeClickable(CreateRewardPage.loadRadioButton()), 6000);
  // getting the element finder for the radio button for user upload
  const elementRadioButton: ElementFinder = CreateRewardPage.radioButton();
  await browser.executeScript('arguments[0].scrollIntoView(true);', elementRadioButton.getWebElement()).then(function anon(): void {
    elementRadioButton.click();
  });
});

Then(/^10_There should be an upload field.$/, async () => {
  const ec = protractor.ExpectedConditions;
  // waiting for the file upload field to be present
  await browser.wait(ec.presenceOf(CreateRewardPage.fileUploadField()), 5000);
  // asserting for the presence of the file upload field
  expect(await CreateRewardPage.fileUploadField().isPresent()).to.be.equal(true);
});

// Verifiying that the slider functionality is working for voucher limits per campaign
Given(/^11_that I am on the survey creation page.$/, async () => {
  await CreateRewardPage.navigateToRewardCreate();
  await browser.sleep(3000);
  await browser.executeScript('document.getElementById("walkme-player").remove();');
});

When(/^11_I click on the slider .$/, async () => {
  const ec = protractor.ExpectedConditions;
  // waiting for the slider to load for voucher limits per campaign
  await browser.wait(ec.elementToBeClickable(CreateRewardPage.checkboxField().get(1)), 6000);
  // clicking on the slider
  await CreateRewardPage.slider().get(0).click();
  await browser.sleep(3000);
});

Then(/^11_I should be type a value in the voucher field and select the frequency.$/, async () => {
  const ec = protractor.ExpectedConditions;
  // waiting for number field for voucher limits per campaign to load
  await browser.wait(ec.presenceOf(CreateRewardPage.numberField().get(1)), 6000);
  // doing on the assertion on the disable attr of the number field
  expect(await CreateRewardPage.numberField().get(2).getAttribute('disabled')).to.be.equal(null);
});

// Verifiying that the slider functionality is working for issuance limits per user
Given(/^12_that I am on the survey creation page.$/, async () => {
  await CreateRewardPage.navigateToRewardCreate();
  await browser.sleep(3000);
  await browser.executeScript('document.getElementById("walkme-player").remove();');
});

When(/^12_I click on the slider .$/, async () => {
  const ec = protractor.ExpectedConditions;
  // waiting for the slider to load for voucher limits per campaign
  await browser.wait(ec.elementToBeClickable(CreateRewardPage.checkboxField().get(2)), 6000);
  // clicking on the slider
  await CreateRewardPage.slider().get(1).click();
  await browser.sleep(3000);
});

Then(/^12_I should be able to type a value in the times field and select the frequency.$/, async () => {
  const ec = protractor.ExpectedConditions;
  // waiting for number field for voucher limits per campaign to load
  await browser.wait(ec.presenceOf(CreateRewardPage.numberField().get(2)), 6000);
  // doing on the assertion on the disable attr of the number field
  expect(await CreateRewardPage.numberField().get(3).getAttribute('disabled')).to.be.equal(null);
});

// Verifiying that the slider functionality is working for redemption limits per user
Given(/^13_that I am on the survey creation page.$/, async () => {
  await CreateRewardPage.navigateToRewardCreate();
  await browser.sleep(3000);
  await browser.executeScript('document.getElementById("walkme-player").remove();');
});

When(/^13_I click on the slider .$/, async () => {
  const ec = protractor.ExpectedConditions;
  // waiting for the slider to load for redemption limits per campaign
  await browser.wait(ec.elementToBeClickable(CreateRewardPage.checkboxField().get(3)), 6000);
  // clicking on the slider
  await CreateRewardPage.slider().get(2).click();
  await browser.sleep(3000);
});

Then(/^13_I should be able to type a value in the times field and select the frequency.$/, async () => {
  const ec = protractor.ExpectedConditions;
  await browser.wait(ec.presenceOf(CreateRewardPage.numberField().get(4)), 6000);
  // doing on the assertion on the disable attr of the number field
  expect(await CreateRewardPage.numberField().get(4).getAttribute('disabled')).to.be.equal(null);
});
