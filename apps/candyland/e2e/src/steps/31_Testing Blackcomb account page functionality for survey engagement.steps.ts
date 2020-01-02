import {
  Given,
  When,
  Then,
} from 'cucumber';
import {
  browser,
  ProtractorExpectedConditions,
  protractor,
} from 'protractor';
import { expect } from 'chai';
import {
  BlackcombHistoryAppPage,
  BlackcombWalletAppPage,
  BlackcombAccountAppPage,
  ElementApp,
} from '../pages/candylandApp.po';

const ec: ProtractorExpectedConditions = protractor.ExpectedConditions;

Given(/^19_I am at the blackcomb wallet page$/, async () => {
  await BlackcombHistoryAppPage.navigateToBlackcombHistoryApp();
  await browser.sleep(3000);

  await BlackcombWalletAppPage.navigateBlackcombWalletApp();
  await browser.sleep(3000);
});

When(/^19_I do nothing$/, () => {});

Then(/^19_The account tab should be present.$/, async () => {
  // waiting for the nav bar to load
  await browser.wait(ec.presenceOf(ElementApp.matToolbar()), 6000);
  // doing an assertion on the presence of the account tab
  expect(await ElementApp.matToolbarLinkArray().get(2).isDisplayed()).to.equal(true);
});

// Ensuring the functionality of the account  tab on the navigation bar
Given(/^20_I am at the blackcomb wallet page$/, async () => {
  await BlackcombWalletAppPage.navigateBlackcombWalletApp();
  await browser.sleep(3000);
});

When(/^20_I click on the account tab$/, async () => {
  // waiting for the nav bar to load
  await browser.wait(ec.presenceOf(ElementApp.matToolbar()), 6000);
  // clicking on the account tab
  await ElementApp.matToolbarLinkArray().get(2).click();
  await browser.sleep(3000);
});

Then(/^20_I should be directed to the account page$/, async () => {
  expect(await browser.getCurrentUrl()).to.contain('account');
});

// Ensuring the relevant elements of the account page is present
Given(/^21_I am at the blackcomb wallet page$/, async () => {
  await BlackcombWalletAppPage.navigateBlackcombWalletApp();
  await browser.sleep(3000);
});

When(/^21_I click on the account tab$/, async () => {
  // waiting for the nav bar to load
  await browser.wait(ec.presenceOf(ElementApp.matToolbar()), 6000);
  // clicking on the account tab
  await ElementApp.matToolbarLinkArray().get(2).click();
  await browser.sleep(3000);
});

Then(/^21_I should see the contact us link and t&c link.$/, async () => {
  // waiting for the nav bar to load
  await browser.wait(ec.presenceOf(BlackcombAccountAppPage.accountSection()), 6000);
  // doing an assertion on the presence of the contact us link and t&c link
  expect(await BlackcombAccountAppPage.accountLinksArray().get(0).isDisplayed()).to.equal(true);
  expect(await BlackcombAccountAppPage.accountLinksArray().get(1).isDisplayed()).to.equal(true);
});

// Ensuring the contact us link is functional
Given(/^22_I am at the blackcomb account page$/, async () => {
  await BlackcombAccountAppPage.navigateToBlackcombAccountApp();
  await browser.sleep(3000);
});

When(/^22_I click on the contact us link$/, async () => {
  // waiting for the account links section to load
  await browser.wait(ec.presenceOf(BlackcombAccountAppPage.accountSection()), 6000);
  // clicking on the contact us link
  await BlackcombAccountAppPage.accountLinksArray().get(0).click();
  await browser.sleep(3000);
});

Then(/^22_I should be navigated to the contact page$/, async () => {
  expect(await browser.getCurrentUrl()).to.contain('contact-us');
});

// Ensuring the t and c link is functional
Given(/^23_I am at the blackcomb account page$/, async () => {
  await BlackcombAccountAppPage.navigateToBlackcombAccountApp();
  await browser.sleep(3000);
});

When(/^23_I click on the t and c link$/, async () => {
  // waiting for the nav bar to load
  await browser.wait(ec.presenceOf(BlackcombAccountAppPage.accountSection()), 6000);
  // clicking on the t&c link
  await BlackcombAccountAppPage.accountLinksArray().get(1).click();
  await browser.sleep(3000);
});

Then(/^23_I should be navigatd to the t and c page$/, async () => {
  expect(await browser.getCurrentUrl()).to.contain('tnc');
});

Then(/^23_I should see the relevant elements for t and c page.$/, async () => {
  // waiting for content section to load
  await browser.wait(ec.presenceOf(BlackcombAccountAppPage.contentSection()), 6000);
  // waiting for header to load
  await browser.wait(ec.presenceOf(ElementApp.h1()), 6000);
  // Verifying whether header exists
  expect(await ElementApp.h1().isDisplayed()).to.equal(true);
  expect(await ElementApp.h2Array().count()).to.equal(2);
});

// Ensuring the relevant elements of the contact us page is present.
Given(/^24_I am at the blackcomb account page$/, async () => {
  await BlackcombAccountAppPage.navigateToBlackcombAccountApp();
  await browser.sleep(3000);
});

When(/^24_I click on the contact us link.$/, async () => {
  // waiting for the account links section to load
  await browser.wait(ec.presenceOf(BlackcombAccountAppPage.accountSection()), 6000);
  // clicking on the contact us link
  await BlackcombAccountAppPage.accountLinksArray().get(0).click();
  await browser.sleep(3000);
});

Then(/^24_I should see the relevant link for the contact us page.$/, async () => {
  // waiting for content section to load
  await browser.wait(ec.presenceOf(BlackcombAccountAppPage.contentSection()), 6000);
  // waiting for header to load
  await browser.wait(ec.presenceOf(ElementApp.h1()), 6000);
  // Verifying whether header exists
  expect(await ElementApp.h1().isDisplayed()).to.equal(true);
  expect(await ElementApp.pArray().count()).to.equal(3);
});
