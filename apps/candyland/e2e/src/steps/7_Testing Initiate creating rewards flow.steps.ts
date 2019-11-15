import { Before, Given, Then, When } from 'cucumber';
import { expect } from 'chai';
import { browser, protractor } from 'protractor';
import { DashboardAppPage, RewardAppPage } from '../pages/candylandApp.po';

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
  await browser.wait(ec.elementToBeClickable(RewardPage.rewardTab()), 5000);
  expect(await RewardPage.rewardTab().getText()).to.be.equal('Rewards');
});

// Ensure that clicking on the reward tab leads to the reward page
Given(/^2_I am on dashboard page$/, async () => {
  await DashboardPage.navigateToDashboard();
});

When(/^2_I click on the rewards tab$/, async () => {
  const ec = protractor.ExpectedConditions;
  await browser.wait(ec.elementToBeClickable(RewardPage.rewardTab()), 5000);
  await RewardPage.rewardTab().click();
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
    await browser.wait(ec.presenceOf(RewardPage.searchBar()), 5000);
    // waiting for reward list to load
    await browser.wait(ec.presenceOf(RewardPage.rewardList()), 5000);
    // waiting for create new button to load
    await browser.wait(ec.presenceOf(RewardPage.createNewButton()), 5000);
    // asserting the presence of search bar , reward list , create new button
    expect(await RewardPage.searchBar().isPresent()).to.equal(true);
    expect(await RewardPage.rewardList().isPresent()).to.equal(true);
    expect(await RewardPage.createNewButton().isPresent()).to.equal(true);
});

// Ensure that create new reward button is functional
Given(/^4_I am on the reward page$/, async () => {
    await RewardPage.navigateToReward();
});

When(/^4_I click on the create new button$/, async () => {
    const ec = protractor.ExpectedConditions;
    await browser.wait(ec.elementToBeClickable(RewardPage.createNewButton()), 5000);
    await RewardPage.createNewButton().click();
    await browser.sleep(3000);
});

Then(/^4_I should be on the create new reward page.$/, async () => {
    expect(await browser.getCurrentUrl()).to.contain('new-reward');
});

// Ensure that search bar is functional
Given(/^5_I am on the reward page$/, async () => {
    await RewardPage.navigateToReward();
});

When(/^5_I enter a filter criteria$/, async () => {
  const ec = protractor.ExpectedConditions;
  // waiting for search bar to load
  await browser.wait(ec.presenceOf(RewardPage.searchBar()), 5000);
  // entering search criteria
  await RewardPage.searchBar().sendKeys('test10101010');
  await browser.sleep(3000);
});

Then(/^5_I should see the filter items on the list.$/, async () => {
  // doing an assertion on the elements on the table based on the search criteria
  expect(await RewardPage.filterItems().getText()).to.contain('test10101010');
});
