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
  ElementApp,
  BlackcombHistoryAppPage,
  BlackcombWalletAppPage,
} from '../pages/candylandApp.po';

const ec: ProtractorExpectedConditions = protractor.ExpectedConditions;
const Element = ElementApp;

Given(/^16_I am at the blackcomb wallet page$/, async () => {
  await BlackcombHistoryAppPage.navigateToBlackcombHistoryApp();
  await browser.sleep(3000);

  await BlackcombWalletAppPage.navigateBlackcombWalletApp();
  await browser.sleep(3000);
});

When(/^16_I click on the history tab$/, async () => {
  // waiting for the nav bar to load
  await browser.wait(ec.presenceOf(ElementApp.matToolbar()), 6000);
  // clicking on the history tab
  await Element.matToolbarLinkArray().get(1).click();
  await browser.sleep(3000);
});

Then(/^16_I should be navigated history page$/, async () => {
  expect(await browser.getCurrentUrl()).to.contain('history');
});

Given(/^17_I am at the blackcomb wallet page$/, async () => {
  await BlackcombHistoryAppPage.navigateToBlackcombHistoryApp();
  await browser.sleep(3000);

  await BlackcombWalletAppPage.navigateBlackcombWalletApp();
  await browser.sleep(3000);
});

When(/^17_I do nothing$/, () => {});

Then(/^17_I should see the history tab in the nav bar$/, async () => {
  // waiting for the nav bar to load
  await browser.wait(ec.presenceOf(ElementApp.matToolbar()), 6000);
  // doing an assertion on the presence of the history tab
  expect(await Element.matToolbarLinkArray().get(1).isDisplayed()).to.equal(true);
});

Given(/^18_I am at the blackcomb wallet page$/, async () => {
  await BlackcombHistoryAppPage.navigateToBlackcombHistoryApp();
  await browser.sleep(3000);

  await BlackcombWalletAppPage.navigateBlackcombWalletApp();
  await browser.sleep(3000);
});

When(/^18_I click on the history tab$/, async () => {
  // waiting for the nav bar to load
  await browser.wait(ec.presenceOf(ElementApp.matToolbar()), 6000);
  // clicking on the history tab
  await Element.matToolbarLinkArray().get(1).click();
  await browser.sleep(3000);
});

Then(/^18_I should see the my history header on the history page$/, async () => {
  // waiting for the history header to load
  await browser.wait(ec.presenceOf(ElementApp.h1()), 6000);
  // assertion on the presence of the history header on the history page
  expect(await ElementApp.h1().isDisplayed()).to.equal(true);
});
