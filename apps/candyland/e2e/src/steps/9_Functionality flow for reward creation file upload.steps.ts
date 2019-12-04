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
import * as path from 'path' ;

import {
  CreateRewardAppPage,
  LoginAppPage,
  ElementApp,
} from '../pages/candylandApp.po';

const ec: ProtractorExpectedConditions = protractor.ExpectedConditions;

// Verifiying file upload field for reward creation
Given(/^14_that I am on reward creation page$/, async () => {
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
  await CreateRewardAppPage.navigateToRewardCreate();
});

When(/^14_I do nothing$/, () => {});

Then(/^14_I should see the file upload field.$/, async () => {
  // clear default image
  await browser.wait(ec.presenceOf(CreateRewardAppPage.imageClear()), 5000);
  await CreateRewardAppPage.imageClear().click();

  await browser.wait(ec.presenceOf(ElementApp.inputFile()), 5000);
  expect(await ElementApp.inputFile().isPresent()).to.equal(true);
});

// Verifiying file upload field functionality
Given(/^15_that I am on reward creation page$/, async () => {
  await CreateRewardAppPage.navigateToRewardCreate();
});

When(/^15_I upload a file$/, async () => {
  // clear default image
  await browser.wait(ec.presenceOf(CreateRewardAppPage.imageClear()), 5000);
  await CreateRewardAppPage.imageClear().click();

  const FileToUpload = './testArtifacts/testimg.png';
  const absolutePath = path.resolve(__dirname, FileToUpload); // __dirname when inplementing circle ci later
  // upload the file to the reward img upload section
  await ElementApp.inputFile().sendKeys(absolutePath);
  await browser.sleep(3000);
});

Then(/^15_File uploaded successfully.$/, async () => {
  expect(await ElementApp.imageWrap().getAttribute('alt')).to.contain('upload');
});

// Verifiying file upload assertions
Given(/^16_that I am on reward creation page$/, async () => {
  await CreateRewardAppPage.navigateToRewardCreate();
});

When(/^16_I upload a file with an inappropriate format$/, async () => {
  // clear default image
  await browser.wait(ec.presenceOf(CreateRewardAppPage.imageClear()), 5000);
  await CreateRewardAppPage.imageClear().click();

  const FileToUpload = './testArtifacts/testfile.xyz';
  const absolutePath = path.resolve(__dirname, FileToUpload); // __dirname when inplementing circle ci later
  // upload the file to the reward img upload section
  await ElementApp.inputFile().sendKeys(absolutePath);
  await browser.sleep(3000);
});

Then(/^16_File uploaded unsuccessfully.$/, async () => {
  // doing an assertion on the error message
  expect(await ElementApp.errorUploadMessage().getText()).to.contain('Only .JPG, .PNG or .GIF are supported.');
});

// This scenario is not valid for now
// Scenario: Verifiying file upload functionality for user upload codes
Given(/^17_that I am on reward creation page$/, async () => {
  await CreateRewardAppPage.navigateToRewardCreate();
  browser.sleep(3000);
  // making the position header absolute so it will not obstruct element
  await browser.executeScript('document.querySelector("div.page-header.full-with").style.position = "absolute"');
});

Given(/^17_I select user upload option for unique codes$/, async () => {
  // waiting for user upload radio button to load
  await browser.wait(ec.elementToBeClickable(CreateRewardAppPage.radioPrimaryButton()), 6000);
  // getting the element finder for the radio button for user upload
  const elementRadioButton: ElementFinder = CreateRewardAppPage.radioButton();
  await browser.wait(ec.elementToBeClickable(CreateRewardAppPage.radioButton()), 6000);
  await browser.executeScript('arguments[0].scrollIntoView(true);', elementRadioButton.getWebElement()).then(function anon(): void {
    elementRadioButton.click();
  });

});

When(/^17_I upload a file$/, async () => {
  const FileToUpload = './testArtifacts/pru-event-reward-test.csv';
  const absolutePath = path.resolve(__dirname, FileToUpload); // __dirname when inplementing circle ci later
  // upload the file to the user upload voucher upload section
  await CreateRewardAppPage.uploadSection().sendKeys(absolutePath);
  await browser.sleep(3000);
});

Then(/^17_File uploaded successfully.$/, async () => {
  // making an assertion based on the file name
  expect(await ElementApp.spanUploadFile().getText()).to.contain('pru-event-reward-test');
});

// This scenario is not valid for now
// Verifiying file upload assertion for user upload codes
Given(/^18_that I am on reward creation page$/, async () => {
  await CreateRewardAppPage.navigateToRewardCreate();
  browser.sleep(3000);
  // making the position header absolute so it will not obstruct element
  await browser.executeScript('document.querySelector("div.page-header.full-with").style.position = "absolute"');
});

Given(/^18_I select user upload option for unique codes$/, async () => {
  // waiting for user upload radio button to load
  await browser.wait(ec.elementToBeClickable(CreateRewardAppPage.loadRadioButton()), 6000);
  // getting the element finder for the radio button for user upload
  const elementRadioButton: ElementFinder = CreateRewardAppPage.radioButton();
  await browser.wait(ec.elementToBeClickable(CreateRewardAppPage.radioButton()), 6000);
  await browser.executeScript('arguments[0].scrollIntoView(true);', elementRadioButton.getWebElement()).then(function anon(): void {
    elementRadioButton.click();
  });
});

When(/^18_I upload a non csv file$/, async () => {
  const FileToUpload = './testArtifacts/testfile.xyz';
  const absolutePath = path.resolve(__dirname, FileToUpload); // __dirname when inplementing circle ci later
  // wait for file upload to load
  await browser.wait(ec.elementToBeClickable(ElementApp.inputFileArray().get(1)), 6000);
  // upload the file to the user upload voucher upload section
  await ElementApp.inputFileArray().get(1).sendKeys(absolutePath);
  await browser.sleep(3000);
});

Then(/^18_File uploaded unsuccessfully.$/, async () => {
  // doing an assertion on the error message
  expect(await CreateRewardAppPage.errorMessage().getText()).to.contain('Only .csv are supported.');
});
