import { Given, Then, When } from 'cucumber';
import { expect } from 'chai';
import { browser, element, by , protractor, ProtractorExpectedConditions } from 'protractor';
import { CreateCampaignAppPage, LoginAppPage  } from '../pages/candylandApp.po';

const ec: ProtractorExpectedConditions = protractor.ExpectedConditions;
let CreateCampaignPage: CreateCampaignAppPage;
let LoginApp: LoginAppPage;

// Inputting the url link leads to the webpage
Given(/^1_I am on the launch page with the url generated$/, async () => {
  CreateCampaignPage = new CreateCampaignAppPage();
  await CreateCampaignPage.navigateToCreateCampaign();
  // await browser.executeScript('WalkMeAPI.stopFlow()');
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
  await element.all(by.css('cl-button')).get(1).click();
  // clicking on the launch button
  await browser.wait(ec.elementToBeClickable(element.all(by.css('cl-button')).get(1)), 6000);
  await element.all(by.css('cl-button')).get(1).click();
  await browser.sleep(3000);
});

When(/^1_Navigating to the webpage with the url generated$/, async () => {
  // getting the url on the launch engagement dialog box
  await browser.wait(ec.presenceOf(element.all(by.css('input[type=text]')).get(2)), 6000);
  const urlString = await element.all(by.css('input[type=text]')).get(2).getAttribute('value');
  await browser.get(urlString);
  await browser.sleep(3000);
});

Then(/^1_I should get a http 200 response$/, async () =>  {
  // doing an assertion on  the current url
  expect(await browser.getCurrentUrl()).to.contain('whistler');
});

// Doing on the assertions on the url link generated
Given(/^2_I am on the launch page with the url generated$/, async () => {
  CreateCampaignPage = new CreateCampaignAppPage();
  await CreateCampaignPage.navigateToCreateCampaign();
  // await browser.executeScript('WalkMeAPI.stopFlow()');
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
  await element.all(by.css('cl-button')).get(1).click();
  // clicking on the launch button
  await browser.wait(ec.elementToBeClickable(element.all(by.css('cl-button')).get(1)), 6000);
  await element.all(by.css('cl-button')).get(1).click();
  await browser.sleep(3000);
});

Then(/^2_I should see the tenant id in the url link generated.$/, async () => {
  LoginApp = new LoginAppPage();
  // waiting for the url link field to load
  await browser.wait(ec.presenceOf(element.all(by.css('input[type=text]')).get(2)), 6000);
  // doing the assertion on the url link
  expect(await element.all(by.css('input[type=text]')).get(2).getAttribute('value')).to.contain(LoginApp.getAccountId());

});

// Ensure that instant reward page have relevant elements
Given(/^3_I am on the blackcomb page$/, async () => {
  CreateCampaignPage = new CreateCampaignAppPage();
  await CreateCampaignPage.navigateToCreateCampaign();
  // await browser.executeScript('WalkMeAPI.stopFlow()');
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
  await element.all(by.css('cl-button')).get(1).click();
  // clicking on the launch button
  await browser.wait(ec.elementToBeClickable(element.all(by.css('cl-button')).get(1)), 6000);
  await element.all(by.css('cl-button')).get(1).click();
  await browser.wait(ec.presenceOf(element.all(by.css('input[type=text]')).get(2)), 6000);
  const urlString = await element.all(by.css('input[type=text]')).get(2).getAttribute('value');
  await browser.get(urlString);
  await browser.sleep(3000);
});

Then(/^3_I should see the relevant elements of the blackcomb$/, async () => {
  // waiting for the survey card to load
  await browser.wait(ec.presenceOf(element(by.css('mat-card'))), 6000);
  // doing an assertion on the presence of the card
  expect(await element(by.css('mat-card')).isDisplayed()).to.equal(true);
});

// Ensure that instant reward page have relevant elements
Given(/^4_I am on the blackcomb page$/, async () => {
  CreateCampaignPage = new CreateCampaignAppPage();
  await CreateCampaignPage.navigateToCreateCampaign();
  // await browser.executeScript('WalkMeAPI.stopFlow()');
  // waiting for the search bar to load
  await browser.wait(ec.elementToBeClickable(element.all(by.css('input[type=text]')).get(1)), 6000);
  // entering search criteria for survey in search bar
  await element.all(by.css('input[type=text]')).get(1).sendKeys('Survey 1');
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
  await element.all(by.css('cl-button')).get(1).click();
  // clicking on the launch button
  await browser.wait(ec.elementToBeClickable(element.all(by.css('cl-button')).get(1)), 6000);
  await element.all(by.css('cl-button')).get(1).click();
  await browser.wait(ec.presenceOf(element.all(by.css('input[type=text]')).get(2)), 6000);
  const urlString = await element.all(by.css('input[type=text]')).get(2).getAttribute('value');
  await browser.get(urlString);
  await browser.sleep(3000);
});

When(/^4_I do nothing$/, () => {});

Then(/^4_I should see the correct survey options reflected to blackcomb.$/, async () => {
  // waiting for the survey card to load
  await browser.wait(ec.presenceOf(element(by.css('mat-card'))), 6000);
  // doing an assertion on the number of questions in the survey
  expect(await element.all(by.css('div.question')).count()).to.equal(1);
});

// Ensure that url link works on a new window
Given(/^5_I am on the campaign review page$/, async () => {
  CreateCampaignPage = new CreateCampaignAppPage();
  await CreateCampaignPage.navigateToCreateCampaign();
  // await browser.executeScript('WalkMeAPI.stopFlow()');
  // waiting for the search bar to load
  await browser.wait(ec.elementToBeClickable(element.all(by.css('input[type=text]')).get(1)), 6000);
  // entering search criteria for survey in search bar
  await element.all(by.css('input[type=text]')).get(1).sendKeys('Survey 1');
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
  await element.all(by.css('cl-button')).get(1).click();
});

When(/^5_I clear all session tokens from tbe browser$/, async () => {
  // clearing session token in local storage
  await browser.executeScript('window.localStorage.clear();');
});

Then(/^5_I access blackcomb with the url generated.$/, async () => {
  // clicking on the launch button
  await browser.wait(ec.elementToBeClickable(element.all(by.css('cl-button')).get(1)), 5000);
  await element.all(by.css('cl-button')).get(1).click();
  await browser.wait(ec.presenceOf(element.all(by.css('input[type=text]')).get(2)), 6000);
  const urlString = await element.all(by.css('input[type=text]')).get(2).getAttribute('value');
  // await browser.close();
  await browser.get(urlString);
  await browser.sleep(3000);
  // waiting for the survey card to load
  await browser.wait(ec.presenceOf(element(by.css('mat-card'))), 6000);
  // doing an assertion on the presence of the card
  expect(await element(by.css('mat-card')).isDisplayed()).to.equal(true);
});
