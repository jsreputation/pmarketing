import { Before, Given, Then, When } from 'cucumber';
import { expect } from 'chai';
import { browser, element, by , protractor } from 'protractor';
import { DashboardAppPage, RewardAppPage } from '../pages/shakeTheTreeFlow.po';

let  DashboardPage: DashboardAppPage;
let  RewardPage: RewardAppPage;

Before( () => {
  // initializing page objects instances
  DashboardPage = new DashboardAppPage();
  RewardPage = new RewardAppPage();
});
// Ensure that reward tab is present
Given(/^1_I am on dashboard page$/, async () => {
  await DashboardPage.navigateToDashboard();
});

When(/^1_I do nothing$/, () => {});

Then(/^1_The reward tab should be present.$/, async () => {
  const ec = protractor.ExpectedConditions;
  await browser.wait(ec.elementToBeClickable(element.all(by.css('h3')).get(1)), 5000);
  expect(await element.all(by.css('h3')).get(1).getText()).to.be.equal('Rewards');
});

// Ensure that clicking on the reward tab leads to the reward page
Given(/^2_I am on dashboard page$/, async () => {
  await DashboardPage.navigateToDashboard();
});

When(/^2_I click on the rewards tab$/, async () => {
  const ec = protractor.ExpectedConditions;
  await browser.wait(ec.elementToBeClickable(element.all(by.css('h3')).get(1)), 5000);
  await element.all(by.css('h3')).get(1).click();
});

Then(/^2_I should be navigated to the rewards page.$/, async () => {
  expect(await browser.getCurrentUrl()).to.contain('rewards');
});

// Ensure that reward page have relevant element
Given(/^3_I am on the reward page$/, async () => {
  await RewardPage.navigateToReward();
});

Then(/^3_I should see the search bar ,reward list and create new button.$/, async () => {
    const ec = protractor.ExpectedConditions;
    // waiting for search bar to load
    await browser.wait(ec.presenceOf(element(by.css('input'))), 5000);
    // waiting for reward list to load
    await browser.wait(ec.presenceOf(element(by.css('table'))), 5000);
    // waiting for create new button to load
    await browser.wait(ec.presenceOf(element(by.css('cl-button'))), 5000);
    // asserting the presence of search bar , reward list , create new button
    expect(await element(by.css('input')).isPresent()).to.equal(true);
    expect(await element(by.css('table')).isPresent()).to.equal(true);
    expect(await element(by.css('cl-button')).isPresent()).to.equal(true);
});

// Ensure that create new reward button is functional
/*Given('{int}_I am on the reward page', function(int) {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
  });

When('{int}_I click on the create new button', function(int) {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
  });

Then('{int}_I should be on the create new reward page.', function(int) {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
  });

Given('{int}_I am on the reward page', function(int) {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
  });

When('{int}_I enter a filter criteria', function(int) {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
  });

Then('{int}_I should see the filter items on the list.', function(int) {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
  });*/
