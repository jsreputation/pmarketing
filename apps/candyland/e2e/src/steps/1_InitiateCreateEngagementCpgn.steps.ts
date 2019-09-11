import { Before, Given, Then, When, setDefaultTimeout } from 'cucumber';
import { expect } from 'chai';
import { element, by, protractor, browser } from 'protractor';
import { DashboardAppPage, EngagementAppPage, LoginAppPage } from '../pages/shakeTheTreeFlow.po';

let DashboardPage: DashboardAppPage;
let EngagementPage: EngagementAppPage;
let LoginApp: LoginAppPage;
// login credentials
const testAccountId: number = 2;
const testUserAccount: string = 'Admin_2';
const testPW: string = 'asdfjkl;';
// setting step timeout time
setDefaultTimeout(60 * 1000);
Before( () => {
  // initializing page objects instances
  DashboardPage = new DashboardAppPage();
  EngagementPage = new EngagementAppPage();
  LoginApp = new LoginAppPage();
});
// Background steps
/*Given(/^I am logged into the loyalty platform as admin user.$/, async () => {
  await LoginApp.navigateToLogin();
  const ec = protractor.ExpectedConditions;
  await browser.wait(ec.elementToBeClickable(element.all(by.css('input')).get(0)), 5000);
  // entering correct account id
  await element.all(by.css('input')).get(0).sendKeys(testAccountId);
  // entering correct testUserAccount
  await element.all(by.css('input')).get(1).sendKeys(testUserAccount);
  // entering correct pw
  await element.all(by.css('input')).get(2).sendKeys(testPW);
  // clicking on the login button
  await element.all(by.css('cl-button')).get(0).click();
  await browser.sleep(3000);
});*/
// Engagements tab is visible to customer
Given(/^1_I am on the dashboard page.$/, async () => {
  const ec = protractor.ExpectedConditions;
  // login process
  await LoginApp.navigateToLogin();
  await browser.wait(ec.elementToBeClickable(element.all(by.css('input')).get(0)), 5000);
  // entering correct account id
  await element.all(by.css('input')).get(0).sendKeys(testAccountId);
  // entering correct testUserAccount
  await element.all(by.css('input')).get(1).sendKeys(testUserAccount);
  // entering correct pw
  await element.all(by.css('input')).get(2).sendKeys(testPW);
  // clicking on the login button
  await element.all(by.css('cl-button')).get(0).click();
  await browser.sleep(3000);
  await DashboardPage.navigateToDashboard();
  // walk around for the walk me widget
  await browser.wait(ec.elementToBeClickable(element(by.className('trg-499259'))), 5000);
  await element(by.className('trg-499259')).click();
  await DashboardPage.navigateToDashboard();
  await browser.wait(ec.elementToBeClickable(element(by.className('walkme-custom-balloon-button-text'))), 5000);
  await element(by.className('walkme-custom-balloon-button-text')).click();

});

When(/^1_I take no action.$/, () => {});

Then(/^1_I should see the engagment tab.$/, async () => {
 // doing an assertion based on the text string of the tab
  const ec = protractor.ExpectedConditions;
  await browser.wait(ec.elementToBeClickable(element.all(by.css('h3')).get(2)), 5000);
  expect(await element.all(by.css('h3')).get(2).getText()).to.be.equal('Engagements');
});

// Clicking on the Engagment tabs leads to the engagment page.
Given(/^2_that I am on the dashboard page.$/, () => {
  // await DashboardPage.navigateToDashboard();
  // await browser.sleep(2000);
});

When(/^2_I click on the engagement tab.$/, async () => {
  const ec = protractor.ExpectedConditions;
  await browser.wait(ec.elementToBeClickable(element.all(by.css('h3')).get(2)), 5000);
  await element.all(by.css('h3')).get(2).click();
});

Then(/^2_I will be redirected to the the engagment page.$/, async () => {
  // doing a assertion based on the url path
  const ec = protractor.ExpectedConditions;
  await browser.wait(ec.urlContains('engagements'), 5000);
});

// Dialog present when customer clicks on create new button.

Given(/^3_that i am at the engagement page.$/, async () => {
  await EngagementPage.navigateToEngagement();
});

When(/^3_I click on the create new button.$/, async () => {
  await element.all(by.css('button')).get(2).click();
});

Then(/^3_the dialg box is present.$/, async () => {
  // doing on an assertion on the presence of the dialog box
  expect(await element(by.className('mat-dialog-content')).isPresent()).to.equal(true);
});

// The four engagment options are present.
Given(/^4_I am on the create engagement option dialog$/, async () => {
  await EngagementPage.navigateToEngagement();
  await element.all(by.css('button')).get(2).click();
});

When(/4_I do nothing.$/, () => {});

Then(/^4_There are 4 engagement options available.$/, async () => {
  // doing an assertion on the number of elements
  expect(await element.all(by.css('cl-type-item')).count()).to.be.equal(4);
});
// Client is able interact with the engagement campaign options
Given(/^5_I am on the create option dialog box.$/, async () => {
  await EngagementPage.navigateToEngagement();
  await element.all(by.css('button')).get(2).click();
         });

When(/^5_I click on the stamps option.$/, async () => {
  await element.all(by.css('cl-type-item')).get(2).click();
});

Then(/^5_The stamp option is highlighted.$/, async () => {
  // assertion based on the active item selector
  expect(await element(by.css('div.type-item.active-item>div.type-wrap-img>img')).getAttribute('alt')).to.equal('Stamp');
});
