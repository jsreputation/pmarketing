import { Before, Given, Then, When } from 'cucumber';
import { expect } from 'chai';
import { browser, element, by , protractor } from 'protractor';
import { CreateCampaignAppPage } from '../pages/candylandApp.po';
import * as path from 'path' ;

let  CreateCampaignPage: CreateCampaignAppPage;

Before( () => {
  // initializing page objects instance
  CreateCampaignPage = new CreateCampaignAppPage();
});

// Successful end to end flow for survey campaign creation
Given(/^19_I am on the campaign creation page.$/, async () => {
  await CreateCampaignPage.navigateToCreateCampaign();
});

Given(/^19_I click on the survey engagement.$/, async () => {
  const ec = protractor.ExpectedConditions;
  // waiting for the search bar to load
  await browser.wait(ec.elementToBeClickable(element.all(by.css('input[type=text]')).get(1)), 6000);
  // entering search criteria for survey in search bar
  await element.all(by.css('input[type=text]')).get(1).sendKeys('Survey');
  // selecting first element for survey engagment
  await browser.wait(ec.elementToBeClickable(element.all(by.css('div.engagement-item')).first()), 5000);
});

Given(/^19_I click next on select engagement page$/, async () => {
  // clicking on the next button on select engagement page
  await element.all(by.css('cl-button')).get(1).click();
  });

Given(/^19_I click on the include probability checkbox$/, async () => {
  const ec = protractor.ExpectedConditions;
  // waiting for include probability checkbox to load
  await browser.wait(ec.presenceOf(element.all(by.css('div.mat-checkbox-inner-container')).get(0)), 8000);
  // unchecking the probability box
  await element.all(by.css('div.mat-checkbox-inner-container')).get(0).click();
});

Given(/^19_I click next on rewards and limits$/, async () => {
  // clicking on the next button on rewards and limits page
  await element.all(by.css('cl-button')).get(1).click();
});

Given(/^19_I select sms for channel$/, async () => {
  // waiting for sms radio button to load
  const ec = protractor.ExpectedConditions;
  await browser.wait(ec.elementToBeClickable(element(by.xpath('//*[@id="mat-radio-8"]/label/div[1]/div[1]'))), 6000);
  // clicking on the sms radio button
  await element(by.xpath('//*[@id="mat-radio-8"]/label/div[1]/div[1]')).click();
  await browser.sleep(3000);
});

Given(/^19_I enter a test string for the content field$/, async () => {
  const ec = protractor.ExpectedConditions;
  // waiting for content field to load
  await browser.wait(ec.presenceOf(element.all(by.css('input[type=text]')).get(2)), 6000);
  // entering test string in content field.
  await element.all(by.css('input[type=text]')).get(2).sendKeys('This is a test string');
});

Given(/^19_I upload an audience list$/, async () => {
  const ec = protractor.ExpectedConditions;
  const FileToUpload = './testArtifacts/pru-event-reward-test.csv';
  const absolutePath = path.resolve(__dirname, FileToUpload); // __dirname when inplementing circle ci later
  // waiting for the upload an audience list radio button to be loaded
  await browser.wait(ec.elementToBeClickable(element.all(by.css('mat-radio-button')).get(38)), 8000);
  // clicking on the upload an audience list radio button
  await element.all(by.css('mat-radio-button')).get(38).click();
  // wait for file upload file to upload
  await browser.wait(ec.elementToBeClickable(element(by.css('input[type=file]'))), 6000);
  await element(by.css('input[type="file"]')).sendKeys(absolutePath);
  await browser.sleep(3000);
});

Given(/^19_I click on next on campaign details.$/, async () => {
  // click on the next button on the campaign details page
  await element.all(by.css('cl-button')).get(1).click();
});

When(/^19_I click on the launch button.$/, async () => {
   // click on the next button on the launch page
  await element.all(by.css('cl-button')).get(1).click();
});

Then(/^19_I can see the success dialog box with the url link .$/, async () => {
  const ec = protractor.ExpectedConditions;
  // waiting for field to load
  await browser.wait(ec.elementToBeClickable(element.all(by.css('input[type=text]')).get(2)), 8000);
  // applying an assertion on url field element not null
  expect(await element.all(by.css('input[type=text]')).get(2).getAttribute('ng-reflect-value')).to.be.not.equal(null);
});
