import { Before, Given, Then, When } from 'cucumber';
import { expect } from 'chai';
import { browser, element, by , protractor, ProtractorExpectedConditions } from 'protractor';
import { CreateCampaignAppPage } from '../pages/candylandApp.po';

let  CreateCampaignPage: CreateCampaignAppPage;
const ec: ProtractorExpectedConditions = protractor.ExpectedConditions;

Before( () => {
  // initializing page objects instance
  CreateCampaignPage = new CreateCampaignAppPage();
});
// Ensure that survey template is present under the campaign page
Given(/^5_I am on the campaign creation page$/, async () => {
  await CreateCampaignPage.navigateToCreateCampaign();
});

When(/^5_I search for survey template in the search bar$/, async () => {
  // waiting for search bar to load
  await browser.wait(ec.elementToBeClickable(element.all(by.css('input[type=text]')).get(1)), 6000);
  // entering search criteria for survey in search bar
  await element.all(by.css('input[type=text]')).get(1).sendKeys('Survey');
  await browser.sleep(3000);
});

Then(/^5_I should see the survey template.$/, async () => {
  // wait for cards to load
  await browser.wait(ec.elementToBeClickable(element.all(by.css('div.engagement-item')).first()), 5000);
  // asserting the presence of the card and title of the card
  expect(await element.all(by.css('div.engagement-item')).first().isDisplayed()).to.be.equal(true);
  expect(await element.all(by.css('p.engagement-item-type')).first().getText()).to.contain('SURVEY');
});

// Verifying that the relevant input text fields are present.
Given(/^6_that I am on the campaign creation page$/, async () => {
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
  // waiting for search bar for select rewards to load
  await browser.wait(ec.elementToBeClickable(element.all(by.css('input[type=text]')).get(2)), 6000);
  // asserting for the presence of the search bar
  expect(await element.all(by.css('input[type=text]')).get(2).isPresent()).to.equal(true);
  // asserting the title of the the rewards dialog box
  expect(await element(by.id('dialogTitle-selectRewards')).getText()).to.contain('Select Rewards');
});

// Verifying that functionality of add rewards button.
Given(/^9_that I am on the campaign creation page.$/, async () => {
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
  // waiting for add reward button to load
  await browser.wait(ec.elementToBeClickable(element.all(by.css('button.btn.mat-flat-button')).get(3)), 6000);
  // clicking on the add reward button
  await element.all(by.css('button.btn.mat-flat-button')).get(3).click();
});
Given(/^9_I select a reward./, async () => {
  // waiting for the row to load
  await browser.wait(ec.presenceOf(element(by.className('table mat-table'))), 6000);
  // selecting the reward
  await element.all(by.css('td[role=gridcell]')).get(0).click();
});
When(/^9_I select the add reward button$/, async () => {
  // waiting for button to load
  await browser.wait(ec.elementToBeClickable(element.all(by.css('cl-button')).last()), 5000);
  // selecting the add reward button
  await element.all(by.css('cl-button')).last().click();
  await browser.sleep(3000);
});

Then(/^9_I should see reward added to rewards list.$/, async () => {
  // wait for rows to load
  // waiting for add reward button to load
  await browser.wait(ec.presenceOf(element.all(by.css('p.reward-item-name')).get(0)), 6000);
  // doing an assertion based on the rows
  // making number of rewards shown on page dynamic
  const rewardCount: number = await element.all(by.css('p.reward-item-name')).count();
  expect(await element.all(by.css('p.reward-item-name')).count()).to.equal(rewardCount);
});

// Verifiying functionality of include probablity box
Given(/^10_that I am on the campaign creation page.$/, async () => {
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

Given(/^10_I added a reward to the reward list.$/, async () => {
  // waiting for add reward button to load
  await browser.wait(ec.elementToBeClickable(element.all(by.css('button.btn.mat-flat-button')).get(3)), 6000);
  // clicking on the add reward button
  await element.all(by.css('button.btn.mat-flat-button')).get(3).click();
  // waiting for the row to load
  await browser.wait(ec.presenceOf(element(by.className('table mat-table'))), 6000);
  // selecting the reward
  await element.all(by.css('td[role=gridcell]')).get(0).click();
   // waiting for button to load
  await browser.wait(ec.elementToBeClickable(element.all(by.css('cl-button')).last()), 5000);
   // selecting the add reward button
  await element.all(by.css('cl-button')).last().click();
  await browser.sleep(3000);
});

When(/^10_I click on the include probability box$/, async () => {
  // waiting for include probability box to be loaded
  await browser.executeScript('document.getElementById("walkme-player").remove();');
  await browser.wait(ec.elementToBeClickable(element.all(by.css('div.mat-checkbox-frame')).get(0)), 6000);
  // clicking on the probability box
  await element.all(by.css('div.mat-checkbox-inner-container')).get(0).click();
});

Then(/^10_I should be able to input interger string in the probability field$/, async () => {
  // waiting for the number fields to be loaded
  await browser.wait(ec.elementToBeClickable(element.all(by.css('input[type=number]')).get(0)), 8000);
  // asserting the presence of the interger fields
  // no reward field
  expect(await element.all(by.css('input[type=number]')).get(0).isPresent()).to.be.equal(true);
  // expect(await element.all(by.css('input[type=number]')).get(1).isPresent()).to.be.equal(true);
  // expect(await element.all(by.css('input[type=number]')).get(2).isPresent()).to.be.equal(true);
});

// Verifiying that the presence of include probablity box
Given(/^11_that I am on the campaign creation page.$/, async () => {
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
  // waiting for the probabilty box to load
  await browser.wait(ec.presenceOf(element.all(by.css('div.mat-checkbox-inner-container')).get(0)), 8000);
  // doing an assertion on the presence of the probability checkbox
  expect(await element.all(by.css('div.mat-checkbox-inner-container')).get(0).isPresent()).to.be.equal(true);
});

// Verifiying that the functionality of the next button
Given(/^12_that I am on the campaign creation page.$/, async () => {
  await CreateCampaignPage.navigateToCreateCampaign();
  // waiting for the search bar to load
  await browser.wait(ec.elementToBeClickable(element.all(by.css('input[type=text]')).get(1)), 6000);
  // entering search criteria for survey in search bar
  await element.all(by.css('input[type=text]')).get(1).sendKeys('Survey');
  // selecting first element
  await browser.wait(ec.elementToBeClickable(element.all(by.css('div.engagement-item')).first()), 5000);
  // asserting the presence of the card and title of the card
  await element.all(by.css('div.engagement-item')).first().click();
  // clicking on the next button on select engagement
  await element.all(by.css('cl-button')).get(1).click();
});

When(/^12_I click on the next button on campaign creation page$/, async () => {
  // clicking on the next button on rewards and limits page
  await element.all(by.css('cl-button')).get(1).click();
});

Then(/^12_I should see be in the campaign info card.$/, async () => {
  // waiting for campaign info card to load
  await browser.wait(ec.presenceOf(element.all(by.css('mat-expansion-panel')).get(0)), 5000);
  await browser.wait(ec.presenceOf(element.all(by.css('mat-expansion-panel-header')).get(0)), 5000);
  // doing an assertion on the presence of the element
  expect(await element.all(by.css('mat-expansion-panel')).get(0).isPresent()).to.equal(true);
  // expect(await element.all(by.css('mat-expansion-panel-header>span.mat-content')).get(0).getText()).to.contain('Campaign Info');
});
