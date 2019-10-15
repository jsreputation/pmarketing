import { Given, Then, When } from 'cucumber';
import { expect } from 'chai';
import { browser, element, by , protractor } from 'protractor';
import { EngagementAppPage } from '../pages/candylandApp.po';
import * as path from 'path' ;

let PageEngagement: EngagementAppPage;
// Verifying successful creation of hit the pinata engagment
Given(/^8_I am on engagement page$/, async () => {
  PageEngagement = new EngagementAppPage();
  await PageEngagement.navigateToEngagement();
});

Given(/^8_I click on the create new button$/, async () => {
  const ec = protractor.ExpectedConditions;
  // waiting for the create new button to load
  await browser.wait(ec.elementToBeClickable(element(by.css('cl-button'))), 6000);
  // clicking on the create new button
  await element(by.css('cl-button')).click();
});

Given(/^8_I click on the game option.$/, async () => {
  const ec = protractor.ExpectedConditions;
  // waiting for the game option to load
  await browser.wait(ec.elementToBeClickable(element.all(by.css('cl-type-item')).get(1)), 6000);
  // clicking on the game option
  await element.all(by.css('cl-type-item')).get(1).click();
});

Given(/^8_I select hit the pinata option$/, async () => {
  const ec = protractor.ExpectedConditions;
  // waiting for the game engagement options to load
  await browser.wait(ec.elementToBeClickable(element.all(by.css('cl-game')).get(1)), 6000);
  // clicking on the hit the pinata option
  await element.all(by.css('cl-game')).get(1).click();
});

Given(/^8_I click on the next button$/, async () => {
  await element.all(by.css('cl-button')).get(2).click();
  await browser.sleep(3000);
});

Given(/^8_I enter a test string in the headline message and sub-headline message$/, async () => {
  const ec = protractor.ExpectedConditions;
  // waiting for headline field to load
  await browser.wait(ec.presenceOf(element.all(by.css('input[type=text]')).get(1)), 6000);
  // waiting for sub-headline field to load
  await browser.wait(ec.presenceOf(element.all(by.css('input[type=text]')).get(2)), 6000);
  // inputing a test string in the headline field
  await element.all(by.css('input[type=text]')).get(1).clear();
  await element.all(by.css('input[type=text]')).get(1).sendKeys('E2ETestString0001');
  // inputing a test string in the sub-headline field
  await element.all(by.css('input[type=text]')).get(2).clear();
  await element.all(by.css('input[type=text]')).get(2).sendKeys('E2ETestString0002');
});

Given(/^8_I upload a background image.$/, async () => {
  const FileToUpload = './testArtifacts/testimg.png';
  const absolutePath = path.resolve(__dirname, FileToUpload);
  const ec = protractor.ExpectedConditions;
  // waiting for the upload field to load
  await browser.wait(ec.presenceOf(element(by.css('input[type=file]'))), 6000);
  // uploading test img file into field
  await element(by.css('input[type=file]')).sendKeys(absolutePath);
  await browser.sleep(3000);
});

Given(/^8_I click on the save button.$/, async () => {
  const ec = protractor.ExpectedConditions;
  // waiting for the save button to load
  await browser.wait(ec.elementToBeClickable(element.all(by.css('cl-button')).get(1)), 6000);
  // clicking on the save button
  await element.all(by.css('cl-button')).get(1).click();
});

When(/^8_I click on an option in the engagment dialog box$/, async () => {
  const ec = protractor.ExpectedConditions;
  // Wait for engagement tab to appear
  await browser.wait(ec.presenceOf(element(by.css('cl-confirm-modal'))), 6000);
  // clicking on the launch now button
  await element.all(by.css('cl-button')).get(2).click();
  await browser.sleep(3000);
});

Then(/^8_I should see the game created.$/, async () => {
  const ec = protractor.ExpectedConditions;
  // waiting for the card to be loaded
  await browser.wait(ec.presenceOf(element.all(by.css('p.engagement-item-name.linkable')).get(0)), 6000);
  // doing an assertion on the text string of the card
  expect(await element.all(by.css('p.engagement-item-name.linkable')).get(0).getText()).to.contain('hit the pinata');
});
