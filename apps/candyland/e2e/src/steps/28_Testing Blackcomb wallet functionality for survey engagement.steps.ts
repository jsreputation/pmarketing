import { Given, Then, When } from 'cucumber';
import { expect } from 'chai';
import { browser, protractor, ProtractorExpectedConditions } from 'protractor';
import { BlackcombWalletAppPage, ElementApp } from '../pages/candylandApp.po';

const ec: ProtractorExpectedConditions = protractor.ExpectedConditions;
let BlackcombWalletApp: BlackcombWalletAppPage;

// Ensuring wallet has the relevant elements
Given(/^6_I am  at the wallet blackcomb page$/, async () => {
  BlackcombWalletApp = new BlackcombWalletAppPage();
  await BlackcombWalletApp.navigateBlackcombWalletApp();
});

Then(/^6_I see the navigation bar$/, async () => {
  // waiting for the nav bar to load
  await browser.wait(ec.presenceOf(ElementApp.matToolbar()), 6000);
  // waiting for the card for stamp cards
  await browser.wait(ec.presenceOf(ElementApp.matCardArray().get(0)), 7000);
  // waiting for voucher field to load
  await browser.wait(ec.presenceOf(ElementApp.matCardArray().get(1)), 8000);
  // doing an assertion on the presence of the elements
  expect(await ElementApp.matToolbar().isDisplayed()).to.equal(true);
  expect(await ElementApp.matCardArray().get(0).isDisplayed()).to.equal(true);
  expect(await ElementApp.matCardArray().get(1).isDisplayed()).to.equal(true);
});

//  Ensuring functionality of stamp card
Given(/^7_I am  at the wallet blackcomb page$/, async () => {
  BlackcombWalletApp = new BlackcombWalletAppPage();
  await BlackcombWalletApp.navigateBlackcombWalletApp();
});

When(/^7_I click on the stamp card$/, async () => {
  // waiting for the card for stamp cards
  await browser.wait(ec.presenceOf(ElementApp.matCardArray().get(0)), 6000);
  // clicking on the stamp card
  await ElementApp.matCardArray().get(0).click();
  await browser.sleep(3000);
});

Then(/^7_I should be navigated to the stamp card page.$/, async () => {
  expect(await browser.getCurrentUrl()).to.contain('stamp');

});

// Ensuring functionality of voucher wallet
Given(/^8_I am  at the wallet blackcomb page$/, async () => {
  BlackcombWalletApp = new BlackcombWalletAppPage();
  await BlackcombWalletApp.navigateBlackcombWalletApp();
});

When(/^8_I click on a voucher$/, async () => {
  // waiting for voucher field to load
  await browser.wait(ec.presenceOf(ElementApp.matCardArray().get(1)), 6000);
  // clicking on the voucher field
  await ElementApp.matCardArray().get(1).click();
  await browser.sleep(3000);
});

Then(/^8_I should be navigated to voucher details page.$/, async () => {
  expect(await browser.getCurrentUrl()).to.contain('voucher-detail');
});
