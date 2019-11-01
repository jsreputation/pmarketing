import { Given, When, Then } from 'cucumber';
import { expect } from 'chai';
import { browser, element, by, ProtractorExpectedConditions, protractor  } from 'protractor';
import { BlackcombHomeAppPage, CreateCampaignAppPage } from '../pages/candylandApp.po';

// setDefaultTimeout(60 * 1000);
const ec: ProtractorExpectedConditions = protractor.ExpectedConditions;
let BlackcombHomeApp: BlackcombHomeAppPage;
let CreateCampaignPage: CreateCampaignAppPage;

// Ensuring home page has the relevant elements
Given(/^9_I am at the blackcomb home page$/, async () => {
  BlackcombHomeApp = new BlackcombHomeAppPage();
  CreateCampaignPage = new CreateCampaignAppPage();
  await CreateCampaignPage.navigateToCreateCampaign();
  // await browser.executeScript('WalkMeAPI.stopFlow()');
  // waiting for the search bar to load
  await browser.wait(ec.elementToBeClickable(element.all(by.css('input[type=text]')).get(1)), 5000);
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
  // clicking the next button on the campaign details package
  await browser.wait(ec.elementToBeClickable(element.all(by.css('cl-button')).get(1)), 5000);
  await element.all(by.css('cl-button')).get(1).click();
  // clicking on the launch button
  await browser.wait(ec.elementToBeClickable(element.all(by.css('cl-button')).get(1)), 5000);
  await element.all(by.css('cl-button')).get(1).click();
  await browser.wait(ec.presenceOf(element.all(by.css('input[type=text]')).get(2)), 5000);
  const urlString = await element.all(by.css('input[type=text]')).get(2).getAttribute('value');
  await browser.get(urlString);
  await browser.sleep(3000);
  await BlackcombHomeApp.navigateToBlackcombHomeApp();

});

Then(/^9_I see the welcome message ,relevant headers, qr button and category tabs.$/, async () => {
  // waiting for the welcome message to load
  await browser.wait(ec.presenceOf(element(by.css('div.welcome-text.ng-star-inserted'))), 6000);
  // waiting for the headers to load
  // game header
  await browser.wait(ec.presenceOf(element.all(by.css('div[class=title]')).get(0)), 6000);
  // featured rewards header
  await browser.wait(ec.presenceOf(element.all(by.css('div[class=title]')).get(1)), 6000);
  // waiting for qr button to load
  await browser.wait(ec.presenceOf(element(by.css('div.mat-button-ripple'))), 6000);
  // waiting for category tab to load
  await browser.wait(ec.presenceOf(element(by.css('div.mat-tab-list'))), 6000);
  // doing an assertion on the presence of the element
  expect(await element(by.css('div.welcome-text.ng-star-inserted')).isDisplayed()).to.equal(true);
  expect(await element.all(by.css('div[class=title]')).get(0).isDisplayed()).to.equal(true);
  expect(await element.all(by.css('div[class=title]')).get(1).isDisplayed()).to.equal(true);
  expect(await element(by.css('div.mat-button-ripple')).isDisplayed()).to.equal(true);
  expect(await element(by.css('div.mat-tab-list')).isDisplayed()).to.equal(true);
});

// Ensuring functionality of qr button.
Given(/^10_I am at the blackcomb home page$/, async () => {
  await BlackcombHomeApp.navigateToBlackcombHomeApp();
});

When(/^10_I click on the qr button$/, async () => {
  // waiting for qr button to load
  await browser.wait(ec.presenceOf(element(by.css('div.mat-button-ripple'))), 6000);
  // clicking on the qr button
  await element(by.css('span.mat-button-wrapper')).click();
  await browser.sleep(1000);
});

Then(/^10_I should be navigated to the qr card page.$/, async () => {
  expect(await browser.getCurrentUrl()).to.contain('qr');
});

// Ensuring qr page has the relevant elements.
/*Given(/^11_I am at the blackcomb qr page.$/, async () => {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
});

When(/^11_I do nothing$/, async () => {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
});

Then(/^11_I should see the qr code and the message text below the qr code.$/, async () => {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
});

// Ensuring functionality of cancel button for the qr code page
Given(/^12_I am at the blackcomb qr page.$/, async () => {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
  });

When(/^12_I click on the cancel button$/, async () => {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
});

Then(/^12_I should be navigated to blackcomb home page.$/, async () => {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
});

// Ensuring functionality of rewards filter
Given(/^13_I am at the blackcomb home page$/, async () => {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
  });

When(/^13_I click on a category$/, async () => {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
  });

Then(/^13_I should see the relevant rewards under the category.$/, async () => {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
  });

// Ensuring functionality of feature rewards card
Given(/^14_I am at the blackcomb home page$/, async () => {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
});

When(/^14_I click on a featured reward$/, async () => {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
  });

Then('{int}_I should be navigated to the reward description page', function(int) {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
  });

Given('{int}_I am at the blackcomb home page', function(int) {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
  });

When('{int}_I click on a reward under the all category', function(int) {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
  });

Then('{int}_I should be navigated to the reward description page', function(int) {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
  });*/
