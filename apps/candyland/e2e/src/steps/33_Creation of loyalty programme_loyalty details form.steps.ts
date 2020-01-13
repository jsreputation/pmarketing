import {
  Given,
  Then,
  When,
} from 'cucumber';
import { browser, protractor, ProtractorExpectedConditions } from 'protractor';
import { ElementApp, LoginAppPage, LoyaltyAppPage } from '../pages/candylandApp.po';
import { expect } from 'chai';
import * as path from 'path';

const ec: ProtractorExpectedConditions = protractor.ExpectedConditions;

// Ensure that the relevant text fields are present
Given(/^5_I am on the loyalty creation page - loyalty details form.$/, async () => {
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

  await LoyaltyAppPage.navigateToNewLoyalty();
  await browser.sleep(3000);
});

Then(/^5_I should see the relevant text fields present.$/, async () => {
  // waiting for the relevant header field to load
  await browser.wait(ec.presenceOf(ElementApp.inputTextArray().get(0)), 6000);
  // waiting for the relevant points name field to load
  await browser.wait(ec.presenceOf(ElementApp.inputTextArray().get(1)), 6000);
  // asserting the presence of the header field
  expect(await ElementApp.inputTextArray().get(0).isDisplayed()).to.equal(true);
  // asserting the presence of the points name field
  expect(await ElementApp.inputTextArray().get(1).isDisplayed()).to.equal(true);
});

// Ensure that null value not accepted when transaction amount checkbox is ticked
Given(/^6_I am on the loyalty creation page - loyalty details form.$/, async () => {
  await LoyaltyAppPage.navigateToNewLoyalty();
  await browser.sleep(3000);
});

When(/^6_I click on the transaction amount checkbox.$/, async () => {
  // waiting for the transaction amount checkbox to load
  await browser.wait(ec.presenceOf(ElementApp.matCheckboxArray().get(0)), 6000);
  // click on the transaction amount checkbox
  await ElementApp.matCheckboxArray().get(0).click();
  browser.sleep(3000);
});

Given(/^6_I input a null value in the transaction amount.$/, async () => {
  // waiting for the transaction amount input to load
  await browser.wait(ec.presenceOf(ElementApp.inputNumberArray().get(0)), 6000);
  // clicking on the transaction amount input
  await ElementApp.inputNumberArray().get(0).click();
  // clicking on another field
  await ElementApp.inputTextArray().get(1).click();
  await browser.sleep(3000);
});

Then(/^6_I see the error message for transaction amount.$/, async () => {
  await browser.wait(ec.presenceOf(ElementApp.matError()), 6000 );
  expect(await ElementApp.matError().getText()).to.contain('Required field');
});

// Ensure functionality of file upload field
Given(/^7_I am on the loyalty creation page - loyalty details form.$/, async () => {
  await LoyaltyAppPage.navigateToNewLoyalty();
  await browser.sleep(3000);
});

When(/^7_I upload a jpg file in the file upload field$/, async () => {
  // creating var for url path
  const FileToUpload = './testArtifacts/testimg.png';
  const absolutePath = path.resolve(__dirname, FileToUpload);
  // upload the file to the upload image section
  await ElementApp.inputFileArray().get(0).sendKeys(absolutePath);
});

Then(/^7_I can see the file uploaded.$/, async () => {
  // doing an assertion based on the attribute of the img obj
  expect(await ElementApp.imageWrap().getAttribute('alt')).to.be.contain('upload');
});

// Ensure that there are assertions for the file upload field
Given(/^8_I am on the loyalty creation page - loyalty details form.$/, async () => {
  await LoyaltyAppPage.navigateToNewLoyalty();
  await browser.sleep(3000);
});

When(/^8_I upload a file that that does not have accepted format$/, async () => {
  // creating var for url path
  const FileToUpload = './testArtifacts/testfile.xyz';
  const absolutePath = path.resolve(__dirname, FileToUpload);
  // upload the file to the upload image section
  await ElementApp.inputFileArray().get(0).sendKeys(absolutePath);
});

Then(/^8_I should see an error message$/, async () => {
  // doing an assertion on the error message
  expect(await ElementApp.errorUploadMessage().getText()).to.contain('Only .JPG, .PNG or .GIF are supported.');
});

// Ensure that the user joining method field is essential
Given(/^9_I am on the loyalty creation page - loyalty details form.$/, async () => {
  await LoyaltyAppPage.navigateToNewLoyalty();
  await browser.sleep(3000);
});

When(/^9_I uncheck all the the checkboxes for user joining method.$/, async () => {
  // waiting for the by invite checkbox to load
  await browser.wait(ec.presenceOf(ElementApp.matCheckboxArray().get(2)), 6000);
  // clicking on the by invite checkbox
  await ElementApp.matCheckboxArray().get(2).click();
  // clicking on another field
  await ElementApp.inputTextArray().get(1).click();
  browser.sleep(3000);
});

Then(/^9_I should see the error message for user joining method.$/, async () => {
  // doing an assertion on the error message
  expect(await ElementApp.matError().getText()).to.contain('At least one option must be selected.');
});

// Ensure that the select audience dropdown field is present
Given(/^10_I am on the loyalty creation page - loyalty details form.$/, async () => {
  await LoyaltyAppPage.navigateToNewLoyalty();
  await browser.sleep(3000);
});

When(/^10_I do nothing$/, () => {});

Then(/^10_I should see the drop down field for audience.$/, async () => {
  // waiting for the drop down field to load
  await browser.wait(ec.presenceOf(ElementApp.matSelect().get(0)), 6000);
  // asserting the presence of the drop down field
  expect(await ElementApp.matSelect().get(0).isDisplayed()).to.equal(true);
});
