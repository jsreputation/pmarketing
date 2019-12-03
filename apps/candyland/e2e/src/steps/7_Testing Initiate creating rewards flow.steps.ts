import {
  Given,
  Then,
  When,
} from 'cucumber';
import {
  browser,
  protractor,
  ProtractorExpectedConditions,
} from 'protractor';
import { expect } from 'chai';

import {
  DashboardAppPage,
  RewardAppPage,
  ElementApp,
  LoginAppPage,
} from '../pages/candylandApp.po';

const ec: ProtractorExpectedConditions = protractor.ExpectedConditions;

// Ensure that reward tab is present
Given(/^1_I am on dashboard page$/, async () => {
  // login process
  await LoginAppPage.navigateToLogin();
  // Waiting for account id field to load
  await browser.wait(ec.elementToBeClickable(ElementApp.inputArray().first()), 5000);
  // entering correct account id
  await ElementApp.inputArray().first().sendKeys(LoginAppPage.getAccountId());
  // entering correct testUserAccount
  await LoginAppPage.userAccountField().sendKeys(LoginAppPage.getUserAccount());
  // entering correct pw
  await LoginAppPage.pwField().sendKeys(LoginAppPage.getPassword());
  // pressing the enter key on the accountID field to log in
  await ElementApp.inputArray().first().sendKeys(protractor.Key.ENTER);
  await browser.sleep(3000);

  await DashboardAppPage.navigateToDashboard();
});

When(/^1_I do nothing$/, () => {});

Then(/^1_The reward tab should be present.$/, async () => {
  await browser.wait(ec.elementToBeClickable(ElementApp.h3Array().get(1)), 5000);
  expect(await ElementApp.h3Array().get(1).getText()).to.be.equal('Rewards');
});

// Ensure that clicking on the reward tab leads to the reward page
Given(/^2_I am on dashboard page$/, async () => {
  await DashboardAppPage.navigateToDashboard();
});

When(/^2_I click on the rewards tab$/, async () => {
  await browser.wait(ec.elementToBeClickable(ElementApp.h3Array().get(1)), 5000);
  await ElementApp.h3Array().get(1).click();
});

Then(/^2_I should be navigated to the rewards page.$/, async () => {
  expect(await browser.getCurrentUrl()).to.contain('rewards');
});

// Ensure that reward page have relevant element
Given(/^3_I am on the reward page$/, async () => {
  await RewardAppPage.navigateToReward();
});

Then(/^3_I should see the search bar ,reward list and create new button.$/, async () => {
  // waiting for search bar to load
  await browser.wait(ec.presenceOf(RewardAppPage.searchBar()), 5000);
  // waiting for reward list to load
  await browser.wait(ec.presenceOf(RewardAppPage.rewardList()), 5000);
  // waiting for create new button to load
  await browser.wait(ec.presenceOf(ElementApp.clButton()), 5000);
  // asserting the presence of search bar , reward list , create new button
  expect(await RewardAppPage.searchBar().isPresent()).to.equal(true);
  expect(await RewardAppPage.rewardList().isPresent()).to.equal(true);
  expect(await ElementApp.clButton().isPresent()).to.equal(true);
});

// Ensure that create new reward button is functional
Given(/^4_I am on the reward page$/, async () => {
  await RewardAppPage.navigateToReward();
});

When(/^4_I click on the create new button$/, async () => {
  await browser.wait(ec.elementToBeClickable(ElementApp.clButton()), 5000);
  await ElementApp.clButton().click();
  await browser.sleep(3000);
});

Then(/^4_I should be on the create new reward page.$/, async () => {
  expect(await browser.getCurrentUrl()).to.contain('new-reward');
});

// Ensure that search bar is functional
Given(/^5_I am on the reward page$/, async () => {
  await RewardAppPage.navigateToReward();
});

When(/^5_I enter a filter criteria$/, async () => {
  // waiting for search bar to load
  await browser.wait(ec.presenceOf(RewardAppPage.searchBar()), 5000);
  // entering search criteria
  await RewardAppPage.searchBar().sendKeys('test10101010');
  await browser.sleep(3000);
});

Then(/^5_I should see the filter items on the list.$/, async () => {
  // doing an assertion on the elements on the table based on the search criteria
  expect(await RewardAppPage.filterItems().getText()).to.contain('test10101010');
});
