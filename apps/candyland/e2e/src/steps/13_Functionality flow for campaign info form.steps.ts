import { Before, Given, Then, When } from 'cucumber';
import { expect } from 'chai';
import { browser, element, by , protractor, ElementFinder } from 'protractor';
import { CreateCampaignAppPage } from '../pages/candylandApp.po';
import * as path from 'path' ;

let  CreateCampaignPage: CreateCampaignAppPage;

Before( () => {
  // initializing page objects instance
  CreateCampaignPage = new CreateCampaignAppPage();
});

// Verifying that the relevant input text fields are present.
Given(/^13_that I am on the campaign info page$/, async () => {
  const ec = protractor.ExpectedConditions;
  await CreateCampaignPage.navigateToCreateCampaign();
  // waiting for the search bar to load
  await browser.wait(ec.elementToBeClickable(element.all(by.css('input[type=text]')).get(1)), 6000);
  // entering search criteria for survey in search bar
  await element.all(by.css('input[type=text]')).get(1).sendKeys('Survey');
  // selecting first element
  await browser.wait(ec.elementToBeClickable(element.all(by.css('div.engagement-item')).first()), 5000);
  // asserting the presence of the card and title of the card
  await element.all(by.css('div.engagement-item')).first().click();
  // clicking on the next button on select engagement page
  await element.all(by.css('cl-button')).get(1).click();
  // clicking on the next button on the rewards and limits page
  await element.all(by.css('cl-button')).get(1).click();
  browser.sleep(3000);
});

When(/^13_I do nothing$/, () => {});

Then(/^13_The relevant text input fields are present.$/, async () => {
  const ec = protractor.ExpectedConditions;
  // waiting for the relevant fields to load
  await browser.wait(ec.presenceOf(element.all(by.css('div.mat-select-trigger')).get(1)), 6000);
  // doing an assertion on the presence of the elements
  // doing an assertion on the capaign goal field
  expect (await element.all(by.css('div.mat-select-trigger')).get(1).isPresent()).to.be.equal(true);
  // doing an assertion on the camapaign header
  expect (await element.all(by.css('input[type=text]')).get(0).isPresent()).to.be.equal(true);
});

// Verifying the number of options for channel .
Given(/^14_that I am on the campaign info page.$/, async () => {
  const ec = protractor.ExpectedConditions;
  await CreateCampaignPage.navigateToCreateCampaign();
  // waiting for the search bar to load
  await browser.wait(ec.elementToBeClickable(element.all(by.css('input[type=text]')).get(1)), 6000);
  // entering search criteria for survey in search bar
  await element.all(by.css('input[type=text]')).get(1).sendKeys('Survey');
  // selecting first element
  await browser.wait(ec.elementToBeClickable(element.all(by.css('div.engagement-item')).first()), 5000);
  // asserting the presence of the card and title of the card
  await element.all(by.css('div.engagement-item')).first().click();
  // clicking on the next button on select engagement page
  await element.all(by.css('cl-button')).get(1).click();
  // clicking on the next button on the rewards and limits page
  await element.all(by.css('cl-button')).get(1).click();
  browser.sleep(3000);
});

Then(/^14_I should see two options.$/, async () => {
  // doing a assertion based on the number of child elements
  expect(await element.all(by.css('mat-radio-group')).get(1).getAttribute('childElementCount')).to.contain('2');
});

// Verifying the number of options for campaign goal .
Given(/^15_that I am on the campaign info page.$/, async () => {
  const ec = protractor.ExpectedConditions;
  await CreateCampaignPage.navigateToCreateCampaign();
  // waiting for the search bar to load
  await browser.wait(ec.elementToBeClickable(element.all(by.css('input[type=text]')).get(1)), 6000);
  // entering search criteria for survey in search bar
  await element.all(by.css('input[type=text]')).get(1).sendKeys('Survey');
  // selecting first element
  await browser.wait(ec.elementToBeClickable(element.all(by.css('div.engagement-item')).first()), 5000);
  // asserting the presence of the card and title of the card
  await element.all(by.css('div.engagement-item')).first().click();
  // clicking on the next button on select engagement page
  await element.all(by.css('cl-button')).get(1).click();
  await browser.sleep(3000);
  // clicking on the next button on the rewards and limits page
  await browser.wait(ec.elementToBeClickable(element.all(by.css('cl-button')).get(1)), 6000);
  await element.all(by.css('cl-button')).get(1).click();
});

When(/^15_I click on the campaign goal$/, async () => {
  const ec = protractor.ExpectedConditions;
  // const urlDebugging = await browser.getCurrentUrl();
  // console.log('The current url is ' + urlDebugging);
  // waiting for campaign goal to load
  await browser.wait(ec.elementToBeClickable(element.all(by.css('mat-select')).get(1)), 8000);
  await element.all(by.css('mat-select')).get(1).click();
});

Then(/^15_I should see five options.$/, async () => {
  const ec = protractor.ExpectedConditions;
  // waiting for the options to load
  await browser.wait(ec.elementToBeClickable(element.all(by.css('div.mat-select-value')).get(1)), 6000);
  expect(await element.all(by.css('span.mat-option-text')).count()).to.equal(5);
});

// Verifying that functionality of audience upload form
// might be deprecated.
Given(/^16_that I am on the campaign info page.$/, async () => {
  const ec = protractor.ExpectedConditions;
  await CreateCampaignPage.navigateToCreateCampaign();
  // waiting for the search bar to load
  await browser.wait(ec.elementToBeClickable(element.all(by.css('input[type=text]')).get(1)), 6000);
  // entering search criteria for survey in search bar
  await element.all(by.css('input[type=text]')).get(1).sendKeys('Survey');
  // selecting first element for survey engagment
  await browser.wait(ec.elementToBeClickable(element.all(by.css('div.engagement-item')).first()), 5000);
  await element.all(by.css('div.engagement-item')).first().click();
  // clicking on the next button on select engagement page
  await element.all(by.css('cl-button')).get(1).click();
  await browser.sleep(3000);
  // clicking on the next button on the rewards and limits page
  await browser.wait(ec.elementToBeClickable(element.all(by.css('cl-button')).get(1)), 6000);
  await element.all(by.css('cl-button')).get(1).click();
  // await element.all(by.css('cl-button')).get(1).click();
});

When(/^16_I upload a csv file$/, async () => {
  const ec = protractor.ExpectedConditions;
  const FileToUpload = './testArtifacts/pru-event-reward-test.csv';
  const absolutePath = path.resolve(__dirname, FileToUpload); // __dirname when inplementing circle ci later
  // waiting for the upload an audience list radio button to be loaded
  const elementUploadField: ElementFinder = element(by.css('input[type=file]'));
  await browser.wait(ec.elementToBeClickable(element(by.xpath('//*[@id="mat-radio-5"]/label/div[1]/div[1]'))), 8000);
  // clicking on the upload an audience list radio button
  await element.all(by.xpath('//*[@id="mat-radio-5"]/label/div[1]/div[1]')).click();
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
  expect(await element(by.css('span.upload-file-file-name')).getText()).to.contain('pru-event-reward-test.csv');
});

// Verifying that functionality of launch button
Given(/^17_that I am on the campaign review page.$/, async () => {
  const ec = protractor.ExpectedConditions;
  await CreateCampaignPage.navigateToCreateCampaign();
  // waiting for the search bar to load
  await browser.wait(ec.elementToBeClickable(element.all(by.css('input[type=text]')).get(1)), 6000);
  // entering search criteria for survey in search bar
  await element.all(by.css('input[type=text]')).get(1).sendKeys('Survey');
  // selecting first element
  await browser.wait(ec.elementToBeClickable(element.all(by.css('div.engagement-item')).first()), 5000);
  // asserting the presence of the card and title of the card
  await element.all(by.css('div.engagement-item')).first().click();
  // clicking on the next button on select engagement page
  await element.all(by.css('cl-button')).get(1).click();
  // clicking on the next button on the rewards and limits page
  await element.all(by.css('cl-button')).get(1).click();
  browser.sleep(3000);
  // clicking the next button on the campaign details package
  await browser.wait(ec.elementToBeClickable(element.all(by.css('cl-button')).get(1)), 6000);
  // await element.all(by.css('cl-button')).get(1).click();
  browser.sleep(3000);
});

When(/^17_I click on the launch button.$/, async () => {
  // clicking on the launch button
  const ec = protractor.ExpectedConditions;
  await browser.wait(ec.elementToBeClickable(element.all(by.css('cl-button')).get(1)), 6000);
  await element.all(by.css('cl-button')).get(1).click();
  await browser.sleep(3000);
  await element.all(by.css('cl-button')).get(1).click();
});

Then(/^17_I should see url link for campaign.$/, async () => {
  const ec = protractor.ExpectedConditions;
  // waiting for field to load
  await browser.wait(ec.presenceOf(element.all(by.css('input[type=text]')).get(2)), 10000);
  // applying an assertion on url field element not null
  expect(await element.all(by.css('input[type=text]')).get(2).getAttribute('ng-reflect-value')).to.be.not.equal(null);

});

// Verifiying that the relevant elements in the campaign review page

Given(/^18_that I am on the campaign review page.$/, async () => {
  const ec = protractor.ExpectedConditions;
  await CreateCampaignPage.navigateToCreateCampaign();
  // waiting for the search bar to load
  await browser.wait(ec.elementToBeClickable(element.all(by.css('input[type=text]')).get(1)), 6000);
  // entering search criteria for survey in search bar
  await element.all(by.css('input[type=text]')).get(1).sendKeys('Survey');
  // selecting first element
  await browser.wait(ec.elementToBeClickable(element.all(by.css('div.engagement-item')).first()), 5000);
  // asserting the presence of the card and title of the card
  await element.all(by.css('div.engagement-item')).first().click();
  // clicking on the next button on select engagement page
  await element.all(by.css('cl-button')).get(1).click();
  // clicking on the next button on the rewards and limits page
  await element.all(by.css('cl-button')).get(1).click();
  // clicking the next button on the campaign details package
  await element.all(by.css('cl-button')).get(1).click();
  browser.sleep(3000);
});

When(/^18_I do nothing .$/, () => {});

Then(/^18_I should see the relevant elements on the campaign review page.$/, async () => {
  // placing an assertion on the presence of the engagement template
  expect(await element.all(by.css('div.engagement-item')).last().isPresent()).to.equal(true);
});
