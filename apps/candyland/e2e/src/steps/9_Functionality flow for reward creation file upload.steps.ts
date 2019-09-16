import { Before, Given, Then, When } from 'cucumber';
import { expect } from 'chai';
import { browser, element, by , protractor, ElementFinder } from 'protractor';
import { CreateRewardAppPage } from '../pages/candylandApp.po';
import * as path from 'path' ;

let CreateRewardPage: CreateRewardAppPage;

Before( () => {
  // initializing page objects instance
  CreateRewardPage = new CreateRewardAppPage();
});

// Verifiying file upload field for reward creation
Given(/^14_that I am on reward creation page$/, async () => {
  await CreateRewardPage.navigateToRewardCreate();
});

When(/^14_I do nothing$/, () => {});

Then(/^14_I should see the file upload field.$/, async () => {
  const ec = protractor.ExpectedConditions;
  await browser.wait(ec.presenceOf(element(by.css('input[type=file]'))), 5000);
  expect(await element(by.css('input[type=file]')).isPresent()).to.equal(true);
});

// Verifiying file upload field functionality
Given(/^15_that I am on reward creation page$/, async () => {
  await CreateRewardPage.navigateToRewardCreate();
});

When(/^15_I upload a file$/, async () => {
  const FileToUpload = './testArtifacts/testimg.png';
  const absolutePath = path.resolve(__dirname, FileToUpload); // __dirname when inplementing circle ci later
  // upload the file to the reward img upload section
  await element(by.css('input[type="file"]')).sendKeys(absolutePath);
  await browser.sleep(3000);
});

Then(/^15_File uploaded successfully.$/, async () => {
  expect(await element(by.css('div.image-wrap.ng-star-inserted>img')).getAttribute('alt')).to.contain('upload');
});

// Verifiying file upload assertions
Given(/^16_that I am on reward creation page$/, async () => {
  await CreateRewardPage.navigateToRewardCreate();
});

When(/^16_I upload a file with an inappropriate format$/, async () => {
  const FileToUpload = './testArtifacts/testfile.xyz';
  const absolutePath = path.resolve(__dirname, FileToUpload); // __dirname when inplementing circle ci later
  // upload the file to the reward img upload section
  await element(by.css('input[type="file"]')).sendKeys(absolutePath);
  await browser.sleep(3000);
});

Then(/^16_File uploaded unsuccessfully.$/, async () => {
  // doing an assertion on the error message
  expect(await element(by.css('span.upload-error')).getText()).to.contain('Only .JPG or .PNG are supported.');
});

// Scenario: Verifiying file upload functionality for user upload codes
Given(/^17_that I am on reward creation page$/, async () => {
  await CreateRewardPage.navigateToRewardCreate();
  browser.sleep(3000);
  // making the position header absolute so it will not obstruct element
  await browser.executeScript('document.querySelector("div.page-header.full-with").style.position = "absolute"');
});

Given(/^17_I select user upload option for unique codes$/, async () => {
  const ec = protractor.ExpectedConditions;
  // waiting for user upload radio button to load
  await browser.wait(ec.elementToBeClickable(element.all(by.className('mat-radio-ripple mat-ripple')).get(4)), 6000);
  // getting the element finder for the radio button for user upload
  const elementRadioButton: ElementFinder = element.all(by.css('div.mat-radio-outer-circle')).get(4);
  browser.executeScript('arguments[0].scrollIntoView(true);', elementRadioButton.getWebElement()).then(function anon(): void {
    elementRadioButton.click();
  });
});

When(/^17_I upload a file$/, async () => {
  const FileToUpload = './testArtifacts/pru-event-reward-test.csv';
  const absolutePath = path.resolve(__dirname, FileToUpload); // __dirname when inplementing circle ci later
  // upload the file to the user upload voucher upload section
  await element.all(by.css('input[type="file"]')).get(1).sendKeys(absolutePath);
  await browser.sleep(3000);
});

Then(/^17_File uploaded successfully.$/, async () => {
  // making an assertion based on the file name
  expect(await element(by.css('span.upload-file-file-name')).getText()).to.contain('pru-event-reward-test');
});

// Verifiying file upload assertion for user upload codes
Given(/^18_that I am on reward creation page$/, async () => {
  await CreateRewardPage.navigateToRewardCreate();
  browser.sleep(3000);
  // making the position header absolute so it will not obstruct element
  await browser.executeScript('document.querySelector("div.page-header.full-with").style.position = "absolute"');
});

Given(/^18_I select user upload option for unique codes$/, async () => {
  const ec = protractor.ExpectedConditions;
  // waiting for user upload radio button to load
  await browser.wait(ec.elementToBeClickable(element.all(by.className('mat-radio-ripple mat-ripple')).get(4)), 6000);
  // getting the element finder for the radio button for user upload
  const elementRadioButton: ElementFinder = element.all(by.css('div.mat-radio-outer-circle')).get(4);
  browser.executeScript('arguments[0].scrollIntoView(true);', elementRadioButton.getWebElement()).then(function anon(): void {
    elementRadioButton.click();
  });
});

When(/^18_I upload a non csv file$/, async () => {
  const FileToUpload = './testArtifacts/test.xyz';
  const absolutePath = path.resolve(__dirname, FileToUpload); // __dirname when inplementing circle ci later
  // upload the file to the user upload voucher upload section
  await element.all(by.css('input[type="file"]')).get(1).sendKeys(absolutePath);
  await browser.sleep(3000);
  });

Then(/^18_File uploaded unsuccessfully.$/, async () => {
    // Need to write assertions
    return 'pending';
});
