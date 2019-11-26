import { Given, Then, When } from 'cucumber';
import { expect } from 'chai';
import { browser, protractor } from 'protractor';
import { EngagementAppPage, ElementApp } from '../pages/candylandApp.po';
import * as path from 'path' ;

let PageEngagement: EngagementAppPage;
const Element = ElementApp;
// Verifying successful creation of hit the pinata engagment
Given(/^8_I am on engagement page$/, async () => {
  PageEngagement = new EngagementAppPage();
  await PageEngagement.navigateToEngagement();
});

Given(/^8_I click on the create new button$/, async () => {
  const ec = protractor.ExpectedConditions;
  // waiting for the create new button to load
  await browser.wait(ec.elementToBeClickable(PageEngagement.engagementCreateNewButton()), 6000);
  // clicking on the create new button
  await Element.clButton().click();
});

Given(/^8_I click on the game option.$/, async () => {
  const ec = protractor.ExpectedConditions;
  // waiting for the game option to load
  await browser.wait(ec.elementToBeClickable(PageEngagement.engagementTypeOptions().get(1)), 6000);
  // clicking on the game option
  await PageEngagement.engagementTypeOptions().get(1).click();
});

Given(/^8_I select hit the pinata option$/, async () => {
  const ec = protractor.ExpectedConditions;
  // waiting for the game engagement options to load
  await browser.wait(ec.elementToBeClickable(PageEngagement.gameOptions()), 6000);
  // clicking on the hit the pinata option
  await PageEngagement.gameOptions().click();
});

Given(/^8_I click on the next button$/, async () => {
  await PageEngagement.nextLaunchNowButton().click();
  await browser.sleep(3000);
});

Given(/^8_I enter a test string in the headline message and sub-headline message$/, async () => {
  const ec = protractor.ExpectedConditions;
  // waiting for headline field to load
  await browser.wait(ec.presenceOf(Element.inputTextArray().get(1)), 6000);
  // waiting for sub-headline field to load
  await browser.wait(ec.presenceOf(Element.inputTextArray().get(2)), 6000);
  // inputing a test string in the headline field
  await Element.inputTextArray().get(1).clear();
  await Element.inputTextArray().get(1).sendKeys('E2ETestString0001');
  // inputing a test string in the sub-headline field
  await Element.inputTextArray().get(2).clear();
  await Element.inputTextArray().get(2).sendKeys('E2ETestString0002');
});

Given(/^8_I upload a background image.$/, async () => {
  const FileToUpload = './testArtifacts/testimg.png';
  const absolutePath = path.resolve(__dirname, FileToUpload);
  const ec = protractor.ExpectedConditions;
  // waiting for the upload field to load
  await browser.wait(ec.presenceOf(Element.inputFile()), 6000);
  // uploading test img file into field
  await Element.inputFile().sendKeys(absolutePath);
  await browser.sleep(3000);
});

Given(/^8_I click on the save button.$/, async () => {
  const ec = protractor.ExpectedConditions;
  // waiting for the save button to load
  await browser.wait(ec.elementToBeClickable(PageEngagement.saveButton()), 6000);
  // clicking on the save button
  await PageEngagement.saveButton().click();
});

When(/^8_I click on an option in the engagment dialog box$/, async () => {
  const ec = protractor.ExpectedConditions;
  // Wait for engagement tab to appear
  await browser.wait(ec.presenceOf(PageEngagement.confirmModal()), 6000);
  // clicking on the launch now button
  await PageEngagement.nextLaunchNowButton().click();
  await browser.sleep(3000);
});

Then(/^8_I should see the game created.$/, async () => {
  const ec = protractor.ExpectedConditions;
  // waiting for the card to be loaded
  await browser.wait(ec.presenceOf(PageEngagement.engagementCreated()), 6000);
  // doing an assertion on the text string of the card
  expect(await PageEngagement.engagementCreated().getText()).to.contain('hit the pinata');
});
