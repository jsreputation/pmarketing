import {
  Given,
  Then,
  When,
} from 'cucumber';
import {
  browser,
  protractor,
  ElementFinder,
} from 'protractor';
import { expect } from 'chai';
import * as path from 'path' ;

import {
  CreateCampaignAppPage,
  EngagementAppPage,
  ElementApp,
  LoginAppPage,
} from '../pages/candylandApp.po';

// Verifying that the relevant input text fields are present.
Given(/^13_that I am on the campaign info page$/, async () => {
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

  await CreateCampaignAppPage.navigateToCreateCampaign();
  // waiting for the search bar to load
  await browser.wait(ec.elementToBeClickable(ElementApp.inputTextArray().get(1)), 6000);
  // entering search criteria for survey in search bar
  await ElementApp.inputTextArray().get(1).sendKeys('Survey');
  // selecting first element
  await browser.wait(ec.elementToBeClickable(EngagementAppPage.engagementItemArray().first()), 5000);
  // asserting the presence of the card and title of the card
  await EngagementAppPage.engagementItemArray().first().click();
  // clicking on the next button on select engagement page
  await ElementApp.clButtonArray().get(1).click();
  // clicking on the next button on the rewards and limits page
  await ElementApp.clButtonArray().get(1).click();
  browser.sleep(3000);
});

When(/^13_I do nothing$/, () => {});

Then(/^13_The relevant text input fields are present.$/, async () => {
  const ec = protractor.ExpectedConditions;
  // waiting for the relevant fields to load
  await browser.wait(ec.presenceOf(ElementApp.matSelectTrigger().get(1)), 6000);
  // doing an assertion on the presence of the elements
  // doing an assertion on the capaign goal field
  expect (await ElementApp.matSelectTrigger().get(1).isPresent()).to.be.equal(true);
  // doing an assertion on the camapaign header
  expect (await ElementApp.inputTextArray().get(0).isPresent()).to.be.equal(true);
});

// Verifying the number of options for channel .
Given(/^14_that I am on the campaign info page.$/, async () => {
  const ec = protractor.ExpectedConditions;
  await CreateCampaignAppPage.navigateToCreateCampaign();
  // waiting for the search bar to load
  await browser.wait(ec.elementToBeClickable(ElementApp.inputTextArray().get(1)), 6000);
  // entering search criteria for survey in search bar
  await ElementApp.inputTextArray().get(1).sendKeys('Survey');
  // selecting first element
  await browser.wait(ec.elementToBeClickable(EngagementAppPage.engagementItemArray().first()), 5000);
  // asserting the presence of the card and title of the card
  await EngagementAppPage.engagementItemArray().first().click();
  // clicking on the next button on select engagement page
  await ElementApp.clButtonArray().get(1).click();
  // clicking on the next button on the rewards and limits page
  await ElementApp.clButtonArray().get(1).click();
  browser.sleep(3000);
});

Then(/^14_I should see two options.$/, async () => {
  // doing a assertion based on the number of child elements
  expect(await ElementApp.matRadioGroup().get(1).getAttribute('childElementCount')).to.contain('2');
});

// Verifying the number of options for campaign goal .
Given(/^15_that I am on the campaign info page.$/, async () => {
  const ec = protractor.ExpectedConditions;
  await CreateCampaignAppPage.navigateToCreateCampaign();
  // waiting for the search bar to load
  await browser.wait(ec.elementToBeClickable(ElementApp.inputTextArray().get(1)), 6000);
  // entering search criteria for survey in search bar
  await ElementApp.inputTextArray().get(1).sendKeys('Survey');
  // selecting first element
  await browser.wait(ec.elementToBeClickable(EngagementAppPage.engagementItemArray().first()), 5000);
  // asserting the presence of the card and title of the card
  await EngagementAppPage.engagementItemArray().first().click();
  // clicking on the next button on select engagement page
  await ElementApp.clButtonArray().get(1).click();
  await browser.sleep(3000);
  // clicking on the next button on the rewards and limits page
  await browser.wait(ec.elementToBeClickable(ElementApp.clButtonArray().get(1)), 6000);
  await ElementApp.clButtonArray().get(1).click();
});

When(/^15_I click on the campaign goal$/, async () => {
  const ec = protractor.ExpectedConditions;
  // const urlDebugging = await browser.getCurrentUrl();
  // console.log('The current url is ' + urlDebugging);
  // waiting for campaign goal to load
  await browser.wait(ec.elementToBeClickable(ElementApp.matSelect().get(2)), 8000);
  await ElementApp.matSelect().get(2).click();
});

Then(/^15_I should see five options.$/, async () => {
  const ec = protractor.ExpectedConditions;
  // waiting for the options to load
  await browser.wait(ec.elementToBeClickable(ElementApp.matSelectValueArray().get(2)), 6000);
  expect(await ElementApp.spanMatOptionText().count()).to.equal(5);
});

// Verifying that functionality of audience upload form
// This scenario is not valid for now
Given(/^16_that I am on the campaign info page.$/, async () => {
  const ec = protractor.ExpectedConditions;
  await CreateCampaignAppPage.navigateToCreateCampaign();
  // waiting for the search bar to load
  await browser.wait(ec.elementToBeClickable(ElementApp.inputTextArray().get(1)), 6000);
  // entering search criteria for survey in search bar
  await ElementApp.inputTextArray().get(1).sendKeys('Survey');
  // selecting first element for survey engagment
  await browser.wait(ec.elementToBeClickable(EngagementAppPage.engagementItemArray().first()), 5000);
  await EngagementAppPage.engagementItemArray().first().click();
  // clicking on the next button on select engagement page
  await ElementApp.clButtonArray().get(1).click();
  await browser.sleep(3000);
  // clicking on the next button on the rewards and limits page
  await browser.wait(ec.elementToBeClickable(ElementApp.clButtonArray().get(1)), 6000);
  await ElementApp.clButtonArray().get(1).click();
  // await ElementApp.clButtonArray().get(1).click();
});

When(/^16_I upload a csv file$/, async () => {
  const ec = protractor.ExpectedConditions;
  const FileToUpload = './testArtifacts/pru-event-reward-test.csv';
  const absolutePath = path.resolve(__dirname, FileToUpload); // __dirname when inplementing circle ci later
  // waiting for the upload an audience list radio button to be loaded
  const elementUploadField: ElementFinder = ElementApp.inputFile();
  await browser.wait(ec.elementToBeClickable(CreateCampaignAppPage.campaignMatRadioAudience()), 8000);
  // clicking on the upload an audience list radio button
  await CreateCampaignAppPage.campaignMatRadioAudience().click();
  await browser.sleep(3000);
  // wait for file upload file to upload
  // scrolling to get field in view and uploading field
  await browser.executeScript('arguments[0].scrollIntoView(true);', elementUploadField.getWebElement()).then(function uploadFile(): void {
    elementUploadField.sendKeys(absolutePath);
  });
  await browser.sleep(3000);
});

Then(/^16_I should see file successfully updated.$/, async () => {
  // doing an assertion on the file name uploaded
  expect(await ElementApp.spanUploadFile().getText()).to.contain('pru-event-reward-test.csv');
});

// Verifying that functionality of launch button
Given(/^17_that I am on the campaign review page.$/, async () => {
  const ec = protractor.ExpectedConditions;
  await CreateCampaignAppPage.navigateToCreateCampaign();
  // waiting for the search bar to load
  await browser.wait(ec.elementToBeClickable(ElementApp.inputTextArray().get(1)), 6000);
  // entering search criteria for survey in search bar
  await ElementApp.inputTextArray().get(1).sendKeys('Survey');
  // selecting first element
  await browser.wait(ec.elementToBeClickable(EngagementAppPage.engagementItemArray().first()), 5000);
  // asserting the presence of the card and title of the card
  await EngagementAppPage.engagementItemArray().first().click();
  // clicking on the next button on select engagement page
  await ElementApp.clButtonArray().get(1).click();
  // clicking on the next button on the rewards and limits page
  await ElementApp.clButtonArray().get(1).click();
  browser.sleep(3000);
  // clicking the next button on the campaign details package
  await browser.wait(ec.elementToBeClickable(ElementApp.clButtonArray().get(1)), 6000);
  // await ElementApp.clButtonArray().get(1).click();
  await browser.sleep(3000);
});

When(/^17_I click on the launch button.$/, async () => {
  // clicking on the launch button
  const ec = protractor.ExpectedConditions;
  await browser.wait(ec.elementToBeClickable(ElementApp.clButtonArray().get(1)), 6000);
  await ElementApp.clButtonArray().get(1).click();
  await browser.sleep(3000);
  await ElementApp.clButtonArray().get(1).click();
});

Then(/^17_I should see url link for campaign.$/, async () => {
  const ec = protractor.ExpectedConditions;
  // waiting for field to load
  await browser.wait(ec.presenceOf(ElementApp.inputTextArray().get(2)), 10000);
  // applying an assertion on url field element not null
  expect(await ElementApp.inputTextArray().get(2).getAttribute('ng-reflect-value')).to.be.not.equal(null);

});

// Verifiying that the relevant elements in the campaign review page

Given(/^18_that I am on the campaign review page.$/, async () => {
  const ec = protractor.ExpectedConditions;
  await CreateCampaignAppPage.navigateToCreateCampaign();
  // waiting for the search bar to load
  await browser.wait(ec.elementToBeClickable(ElementApp.inputTextArray().get(1)), 6000);
  // entering search criteria for survey in search bar
  await ElementApp.inputTextArray().get(1).sendKeys('Survey');
  // selecting first element
  await browser.wait(ec.elementToBeClickable(EngagementAppPage.engagementItemArray().first()), 5000);
  // asserting the presence of the card and title of the card
  await EngagementAppPage.engagementItemArray().first().click();
  // clicking on the next button on select engagement page
  await ElementApp.clButtonArray().get(1).click();
  // clicking on the next button on the rewards and limits page
  await ElementApp.clButtonArray().get(1).click();
  // clicking the next button on the campaign details package
  await ElementApp.clButtonArray().get(1).click();
  browser.sleep(3000);
});

When(/^18_I do nothing .$/, () => {});

Then(/^18_I should see the relevant elements on the campaign review page.$/, async () => {
  // placing an assertion on the presence of the engagement template
  expect(await EngagementAppPage.engagementItemArray().last().isPresent()).to.equal(true);
});
