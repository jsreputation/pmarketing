import {
  Given,
  Then,
  When,
} from 'cucumber';
import { browser, protractor, ProtractorExpectedConditions } from 'protractor';
import { DashboardAppPage, ElementApp, LoyaltyAppPage } from '../pages/candylandApp.po';
import { expect } from 'chai';

const ec: ProtractorExpectedConditions = protractor.ExpectedConditions;

// Ensuring the the loyalty tab is present.
Then(/^1_I should see the loyalty tab.$/,  async () => {
  // doing an assertion based on the text string of the tab
  await browser.wait(ec.elementToBeClickable(ElementApp.h3Array().get(4)), 5000);
  expect(await ElementApp.h3Array().get(4).getText()).to.be.equal('Loyalty (β)');
});

// Ensuring that the loyalty tab is functional
Given(/^2_I am on the the dashboard page$/, async () => {
  await DashboardAppPage.navigateToDashboard();
});

When(/^2_I click on the loyalty tab.$/, async () => {
  await browser.wait(ec.elementToBeClickable(ElementApp.h3Array().get(4)), 5000);
  await ElementApp.h3Array().get(4).click();
});

Then(/^2_I should be navigated to the loyalty page.$/, async () => {
  // doing a assertion based on the url path
  await browser.wait(ec.urlContains('loyalty'), 5000);
});

// Ensure that loyalty page have relevant elements
Given(/^3_I am on the loyalty page$/, async () => {
  await LoyaltyAppPage.navigateToLoyalty();
});

Then(/^3_I should see the relevant elements of the loyalty page.$/, async () => {
  // waiting for the paginator to load
  await browser.wait(ec.presenceOf(LoyaltyAppPage.paginator()), 6000);
  // waiting for the item list to load
  await browser.wait(ec.presenceOf(LoyaltyAppPage.itemList()), 6000);
  // doing an assertion on the presence of the paginator
  expect(await LoyaltyAppPage.paginator().isDisplayed()).to.equal(true);
  // doing an assertion on the presence of the item list
  expect(await LoyaltyAppPage.itemList().isDisplayed()).to.equal(true);
});

// Ensure the functionality of the create new loyalty button
Given(/^4_I am on the loyalty page$/, async () => {
  await LoyaltyAppPage.navigateToLoyalty();
});

When(/^4_I click on the new button$/, async () => {
  // waiting for the create new button to load
  await browser.wait(ec.elementToBeClickable(ElementApp.clButton()), 6000);
  // clicking on the create new button
  await ElementApp.clButton().click();
});

Then(/^4_I should be navigated to the the loyalty creation page.$/, async () => {
  expect(await browser.getCurrentUrl()).to.contain('new');
});
