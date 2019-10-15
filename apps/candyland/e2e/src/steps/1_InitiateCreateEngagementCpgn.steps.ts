import { Before, Given, Then, When, setDefaultTimeout } from 'cucumber';
import { expect } from 'chai';
import { element, by, protractor, browser } from 'protractor';
import { DashboardAppPage, EngagementAppPage, LoginAppPage } from '../pages/candylandApp.po';

let DashboardPage: DashboardAppPage;
let EngagementPage: EngagementAppPage;
let LoginApp: LoginAppPage;

// setting step timeout time
setDefaultTimeout(60 * 1000);
Before( () => {
  // initializing page objects instances
  DashboardPage = new DashboardAppPage();
  EngagementPage = new EngagementAppPage();
  LoginApp = new LoginAppPage();
});

// Engagements tab is visible to customer
Given(/^1_I am on the dashboard page.$/, async () => {
  const ec = protractor.ExpectedConditions;
  // login process
  await LoginApp.navigateToLogin();
  // Waiting for account id field to load
  await browser.wait(ec.elementToBeClickable(LoginApp.accountIDField()), 5000);
  // entering correct account id
  await LoginApp.accountIDField().sendKeys(LoginApp.getAccountId());
  // entering correct testUserAccount
  await LoginApp.userAccountField().sendKeys(LoginApp.getUserAccount());
  // entering correct pw
  await LoginApp.pwField().sendKeys(LoginApp.getPassword());
   // pressing the enter key on the accountID field to log in
  await LoginApp.accountIDField().sendKeys(protractor.Key.ENTER);
  await browser.sleep(3000);
  await browser.executeScript('WalkMeAPI.stopFlow()');
  await DashboardPage.navigateToDashboard();
  await browser.sleep(3000);

});

When(/^1_I take no action.$/, () => {});

Then(/^1_I should see the engagment tab.$/, async () => {
 // doing an assertion based on the text string of the tab
  const ec = protractor.ExpectedConditions;
  await browser.wait(ec.elementToBeClickable(EngagementPage.engagementTabOption()), 5000);
  expect(await EngagementPage.engagementTabOption().getText()).to.be.equal('Engagements');
});

// Clicking on the Engagment tabs leads to the engagment page.
Given(/^2_that I am on the dashboard page.$/, async () => {
  await DashboardPage.navigateToDashboard();
  // await browser.sleep(2000);
});

When(/^2_I click on the engagement tab.$/, async () => {
  const ec = protractor.ExpectedConditions;
  await browser.wait(ec.elementToBeClickable(EngagementPage.engagementTabOption()), 5000);
  await EngagementPage.engagementTabOption().click();
});

Then(/^2_I will be redirected to the the engagment page.$/, async () => {
  // doing a assertion based on the url path
  const ec = protractor.ExpectedConditions;
  await browser.wait(ec.urlContains('engagements'), 5000);
});

// Dialog present when customer clicks on create new button.

Given(/^3_that i am at the engagement page.$/, async () => {
  await EngagementPage.navigateToEngagement();
  await browser.sleep(3000);
  await browser.executeScript('WalkMeAPI.stopFlow()');
});

When(/^3_I click on the create new button.$/, async () => {
  const ec = protractor.ExpectedConditions;
  await browser.wait(ec.elementToBeClickable(element(by.css('cl-button'))), 6000);
  await element(by.css('cl-button')).click();
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
  await element(by.css('button.btn.mat-flat-button.primary')).click();
});

When(/^5_I click on the stamps option.$/, async () => {
  await element.all(by.css('cl-type-item')).get(2).click();
});

Then(/^5_The stamp option is highlighted.$/, async () => {
  // assertion based on the active item class name
  expect(await element.all(by.css('button.engagement-selector')).get(2).getAttribute('class')).to.match(/active/);
});
