import { Before, Given, Then, When } from 'cucumber';
import { expect } from 'chai';
import { browser, element, by , protractor } from 'protractor';
import { CreateCampaignAppPage } from '../pages/candylandApp.po';

let  CreateCampaignPage: CreateCampaignAppPage;

Before( () => {
  // initializing page objects instance
  CreateCampaignPage = new CreateCampaignAppPage();
});
// Ensure that survey template is present under the campaign page
Given(/^5_I am on the campaign creation page$/, async () => {
  await CreateCampaignPage.navigateToCreateCampaign();
});

When(/^5_I search for survey template in the search bar$/, async () => {
  const ec = protractor.ExpectedConditions;
  // waiting for search bar to load
  await browser.wait(ec.elementToBeClickable(element.all(by.css('input[type=text]')).get(1)), 6000);
  // entering search criteria for survey in search bar
  await element.all(by.css('input[type=text]')).get(1).sendKeys('Survey');
  await browser.sleep(3000);
});

Then(/^5_I should see the survey template.$/, async () => {
  // wait for cards to load
  const ec = protractor.ExpectedConditions;
  await browser.wait(ec.elementToBeClickable(element.all(by.css('div.engagement-item')).first()), 5000);
  // asserting the presence of the card and title of the card
  expect(await element.all(by.css('div.engagement-item')).first().isDisplayed()).to.be.equal(true);
  expect(await  element.all(by.css('p.engagement-item-type')).first().getText()).to.contain('survey');
});

// Verifying that the relevant input text fields are present.
Given(/^6_that I am on the campaign creation page$/, async () => {
  const ec = protractor.ExpectedConditions;
  await CreateCampaignPage.navigateToCreateCampaign();
  // selecting survey engagement
  await browser.wait(ec.elementToBeClickable(element.all(by.css('div.engagement-item')).first()), 5000);
  // asserting the presence of the card and title of the card
  await element.all(by.css('div.engagement-item')).first().click();
  // clicking on the next button
  await element.all(by.css('cl-button')).get(1).click();
  await browser.sleep(3000);

});

When(/^6_I do nothing.$/, () => {});

Then(/^6_The relevant text input fields are present for campaign rewards and limits page.$/, async () => {
  const ec = protractor.ExpectedConditions;
  // waiting for campaign header field to load
  await browser.wait(ec.elementToBeClickable(element.all(by.css('input[type=text]')).get(0)), 6000);
  // asserting the presence of the text input fields
  // asserting presence of campaign header field
  expect(await element.all(by.css('input[type=text]')).get(0).isPresent()).to.equal(true);
  // asserting presence of campaign response limit field
  expect(await element.all(by.css('input[type=text]')).get(1).isPresent()).to.equal(true);
});

// Verifying the add rewards button.
Given(/^7_that I am on the campaign creation page.$/, () => {
  // Adding this step to ensure scenario modularity later
});

When(/^7_I do nothing.$/, () => {});

Given(/^7_I should see the add rewards button on campaign creation page.$/, async () => {
  const ec = protractor.ExpectedConditions;
  // waiting for add reward button to load
  await browser.wait(ec.presenceOf(element.all(by.css('cl-button')).get(3)), 6000);
  // asserting for the presence of the button
  expect(await element.all(by.css('cl-button')).get(3).isDisplayed()).to.be.equal(true);
});

// Verifying the elements present when clicking add rewards.
Given(/^8_that I am on the campaign creation page.$/, () => {
  // Adding this step to ensure scenario modularity later
});

When(/^8_I click on add rewards.$/, async () => {
  await element.all(by.css('cl-button')).get(3).click();
  await browser.sleep(3000);
});

Then(/^8_I should see the necessary elements present like the search bar and appropriate title.$/, async () => {
  const ec = protractor.ExpectedConditions;
  // waiting for search bar for select rewards to load
  await browser.wait(ec.elementToBeClickable(element.all(by.css('input[type=text]')).get(2)), 6000);
  // asserting for the presence of the search bar
  expect(await element.all(by.css('input[type=text]')).get(2).isPresent()).to.equal(true);
  // asserting the title of the the rewards dialog box
  expect(await element(by.css('p.dialog-content-title')).getText()).to.contain('Select Rewards');
});

// Verifying that functionality of add rewards button.
Given(/^9_that I am on the campaign creation page.$/, async () => {
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
  // clicking on the next button
  await element.all(by.css('cl-button')).get(1).click();
});

Given(/^9_I select add rewards button$/, async () => {
  const ec = protractor.ExpectedConditions;
  // waiting for add reward button to load
  await browser.wait(ec.elementToBeClickable(element.all(by.css('button.btn.mat-flat-button')).get(3)), 6000);
  // clicking on the add reward button
  element.all(by.css('button.btn.mat-flat-button')).get(3).click();
});
Given(/^9_I select a reward./, async () => {
  // waiting for the row to load
  const ec = protractor.ExpectedConditions;
  await browser.wait(ec.presenceOf(element.all(by.css('tr[role=row]')).get(1)), 6000);
  // selecting the reward
  element.all(by.css('tr[role=row]')).get(1).click();
});
When(/^9_I select the add reward button$/, async () => {
  // selecting the add reward button
  await element.all('cl-button').get(5).click();
  await browser.sleep(3000);
});

Then(/^9_I should see reward added to rewards list.$/, async () => {
  // wait for rows to load
  const ec = protractor.ExpectedConditions;
  // waiting for add reward button to load
  await browser.wait(ec.presenceOf(element.all(by.css('p.reward-item-name')).get(0)), 6000);
  // doing an assertion based on the rows
  expect(await element.all(by.css('p.reward-item-name')).count()).to.equal(4);
});

// Verifiying functionality of include probablity box
Given(/^10_that I am on the campaign creation page.$/, async () => {
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
  // clicking on the next button
  await element.all(by.css('cl-button')).get(1).click();
});

When(/^10_I click on the include probability box$/, () => {
  // do nothing since this is by default ticked.
});

Then(/^10_I should be able to input interger string in the probability field$/, async () => {
  // waiting for the number fields to be loaded
  const ec = protractor.ExpectedConditions;
  await browser.wait(ec.elementToBeClickable(element.all(by.css('input[type=number]')).get(0)), 8000);
  // asserting the presence of the interger fields
  expect(await element.all(by.css('input[type=number]')).get(0).isPresent()).to.be.equal(true);
  expect(await element.all(by.css('input[type=number]')).get(1).isPresent()).to.be.equal(true);
  expect(await element.all(by.css('input[type=number]')).get(2).isPresent()).to.be.equal(true);
});

// Verifiying that the presence of include probablity box
Given(/^11_that I am on the campaign creation page.$/, async () => {
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
  // clicking on the next button
  await element.all(by.css('cl-button')).get(1).click();
});

When(/^11_I do nothing .$/, () => {});

Then(/^11_I should see include probablity box.$/, async () => {
  const ec = protractor.ExpectedConditions;
  // waiting for the probabilty box to load
  await browser.wait(ec.presenceOf(element.all(by.css('div.mat-checkbox-inner-container')).get(0)), 8000);
  // doing an assertion on the presence of the probability checkbox
  expect(await element.all(by.css('div.mat-checkbox-inner-container')).get(0).isPresent()).to.be.equal(true);
});

// Verifiying that the functionality of the next button
Given(/^12_that I am on the campaign creation page.$/, async () => {
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
  // clicking on the next button
  await element.all(by.css('cl-button')).get(1).click();
});

When(/^12_I click on the next button on campaign creation page$/, async () => {
  // clicking on the next button
  await element.all(by.css('cl-button')).get(1).click();
});

Then(/^12_I should see be in the campaign info form.$/, async () => {
  const ec = protractor.ExpectedConditions;
  // waiting for campaign info form
  await browser.wait(ec.presenceOf(element.all(by.css('mat-expansion-panel-header')).get(0)), 5000);
  // doing an assertion on the presence of the element
  expect(await element.all(by.css('mat-expansion-panel-header')).get(0).isPresent()).to.equal(true);
  expect(await element.all(by.css('mat-expansion-panel-header')).get(0).getText()).to.contain('Campaign Info');
});
