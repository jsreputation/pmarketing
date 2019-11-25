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
import * as path from 'path' ;

import {
  CreateCampaignAppPage,
  EngagementAppPage,
  ElementApp,
} from '../pages/candylandApp.po';

// Successful end to end flow for survey campaign creation
Given(/^19_I am on the campaign creation page.$/, async () => {
  await CreateCampaignAppPage.navigateToCreateCampaign();
});

Given(/^19_I click on the survey engagement.$/, async () => {
  const ec = protractor.ExpectedConditions;
  // waiting for the search bar to load
  await browser.wait(ec.elementToBeClickable(ElementApp.inputTextArray().get(1)), 6000);
  // entering search criteria for survey in search bar
  await ElementApp.inputTextArray().get(1).sendKeys('Survey');
  // selecting first element for survey engagment
  await browser.wait(ec.elementToBeClickable(EngagementAppPage.engagementItemArray().first()), 5000);
});

Given(/^19_I click next on select engagement page.$/, async () => {
  // clicking on the next button on select engagement page
  await ElementApp.clButtonArray().get(1).click();
});

Given(/^19_I click on the include probability checkbox$/, async () => {
  const ec = protractor.ExpectedConditions;
  // waiting for include probability checkbox to load
  await browser.wait(ec.elementToBeClickable(ElementApp.matCheckboxArray().get(0)), 8000);
  // unchecking the probability box
  await ElementApp.matCheckboxInnerContainer().get(0).click();
});

Given(/^19_I click next on rewards and limits$/, async () => {
  // clicking on the next button on rewards and limits page
  await ElementApp.clButtonArray().get(1).click();
});

Given(/^19_I select sms for channel$/, async () => {
  // waiting for sms radio button to load
  const ec = protractor.ExpectedConditions;
  await browser.wait(ec.elementToBeClickable(CreateCampaignAppPage.campaignMatRadioSms()), 6000);
  // clicking on the sms radio button
  await CreateCampaignAppPage.campaignMatRadioSms().click();
  await browser.sleep(3000);
});

Given(/^19_I enter a test string for the content field$/, async () => {
  const ec = protractor.ExpectedConditions;
  // waiting for content field to load
  await browser.wait(ec.presenceOf(ElementApp.inputTextArray().get(2)), 6000);
  // entering test string in content field.
  await ElementApp.inputTextArray().get(2).sendKeys('This is a test string');
});

Given(/^19_I upload an audience list$/, async () => {
  const ec = protractor.ExpectedConditions;
  const FileToUpload = './testArtifacts/pru-event-reward-test.csv';
  const absolutePath = path.resolve(__dirname, FileToUpload); // __dirname when inplementing circle ci later
  // waiting for the upload an audience list radio button to be loaded
  await browser.wait(ec.elementToBeClickable(ElementApp.matRadioButton().get(38)), 8000);
  // clicking on the upload an audience list radio button
  await ElementApp.matRadioButton().get(38).click();
  // wait for file upload file to upload
  await browser.wait(ec.elementToBeClickable(ElementApp.inputFile()), 6000);
  await ElementApp.inputFile().sendKeys(absolutePath);
  await browser.sleep(3000);
});

Given(/^19_I click on next on campaign details.$/, async () => {
  // click on the next button on the campaign details page
  await ElementApp.clButtonArray().get(1).click();
});

When(/^19_I click on the launch button.$/, async () => {
  // click on the next button on the launch page
  await ElementApp.clButtonArray().get(1).click();
});

Then(/^19_I can see the success dialog box with the url link .$/, async () => {
  const ec = protractor.ExpectedConditions;
  // waiting for field to load
  await browser.wait(ec.elementToBeClickable(ElementApp.inputTextArray().get(2)), 8000);
  // applying an assertion on url field element not null
  expect(await ElementApp.inputTextArray().get(2).getAttribute('ng-reflect-value')).to.be.not.equal(null);
});
