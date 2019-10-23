import { Given, Then, When } from 'cucumber';
import { expect } from 'chai';
import { browser, element, by , protractor, ProtractorExpectedConditions } from 'protractor';
import { BlackcombWalletAppPage } from '../pages/candylandApp.po';

const ec: ProtractorExpectedConditions = protractor.ExpectedConditions;
let BlackcombWalletApp: BlackcombWalletAppPage;

// Ensuring wallet has the relevant elements
Given(/^5_I am  at the wallet blackcomb page$/, async () => {
  BlackcombWalletApp = new BlackcombWalletAppPage();
  await BlackcombWalletApp.navigateBlackcombWalletApp();
});

When(/^5_I do nothing$/, () => {});

Then(/^5_I see the navigation bar$/, async () => {
  // waiting for the nav bar to load
  await browser.wait(ec.presenceOf(element.all(by.css('mat-toolbar')).get(1)), 6000);
  // waiting for the card for stamp cards
  await browser.wait(ec.presenceOf(element.all(by.css('mat-card')).get(0)), 6000);
  // waiting for voucher field to load
  await browser.wait(ec.presenceOf(element.all(by.css('mat-card')).get(1)), 6000);
  // doing an assertion on the presence of the elements
  expect(await element.all(by.css('mat-toolbar')).get(1).isDisplayed()).to.equal(true);
  expect(await element.all(by.css('mat-card')).get(0).isDisplayed()).to.equal(true);
  expect(await element.all(by.css('mat-card')).get(1).isDisplayed()).to.equal(true);
});

//  Ensuring functionality of stamp card
Given(/^6_I am  at the wallet blackcomb page$/, async () => {
  BlackcombWalletApp = new BlackcombWalletAppPage();
  await BlackcombWalletApp.navigateBlackcombWalletApp();
});

When(/^6_I click on the stamp card$/, async () => {
  // waiting for the card for stamp cards
  await browser.wait(ec.presenceOf(element.all(by.css('mat-card')).get(0)), 6000);
  // clicking on the stamp card
  await element.all(by.css('mat-card')).get(0).click();
  await browser.sleep(3000);
});

Then(/^6_I should be navigated to the stamp card page.$/, async () => {
  expect(await browser.getCurrentUrl()).to.contain('stamp');

});

// Ensuring functionality of voucher wallet
Given(/^7_I am  at the wallet blackcomb page$/, async () => {
  BlackcombWalletApp = new BlackcombWalletAppPage();
  await BlackcombWalletApp.navigateBlackcombWalletApp();
});

When(/^7_I click on a voucher$/, async () => {
  // waiting for voucher field to load
  await browser.wait(ec.presenceOf(element.all(by.css('mat-card')).get(1)), 6000);
  // clicking on the voucher field
  await element.all(by.css('mat-card')).get(1).click();
  await browser.sleep(3000);
});

Then(/^7_I should be navigated to voucher details page.$/, async () => {
  expect(await browser.getCurrentUrl()).to.contain('voucher-detail');
});
