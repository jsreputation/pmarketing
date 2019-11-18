import { Before, Given, Then, When } from 'cucumber';
import { expect } from 'chai';
import { browser, protractor } from 'protractor';
import { EngagementAppPage, CreateShakeTheTreeAppPage } from '../pages/candylandApp.po';
import * as moment from 'moment';
// initializing instances of the pages

let PageEngagement: EngagementAppPage;
let PageShakeTheTree: CreateShakeTheTreeAppPage;

// Getting the current day, month , year
const now = moment().format();

Before( () => {
  // initializing page objects instances
  PageEngagement = new EngagementAppPage();
  PageShakeTheTree = new CreateShakeTheTreeAppPage();

});

// Successful creation of engagement game shake the tree - launch now
Given(/^27_I am on the engagment page.$/, async () => {
  await PageEngagement.navigateToEngagement();
  await browser.waitForAngularEnabled(false);
  await browser.sleep(3000);
});

Given(/^27_I click on create new button.$/, async () => {
  await PageShakeTheTree.shakeTreeCreateNewButton().click();
});

Given(/^27_I click on games button.$/, async () => {
  // clicking on the games option
  await PageShakeTheTree.shakeTreeTypeOptions().click();
});

Given(/^27_I click on shake the tree.$/, () => {});

Given(/^27_I click on the next button.$/, async () => {
  // clicking on the next button
  await PageEngagement.engagementNextButton().click();
});

Given(/^27_I type the test string$/, async () => {
  const ec = protractor.ExpectedConditions;
  // waiting for main headline field to load
  await browser.wait(ec.presenceOf(PageShakeTheTree.headlineField()), 6000);
  // typing test string in the main headline text field
  await PageShakeTheTree.mainHeadlineField().clear();
  await PageShakeTheTree.mainHeadlineField().sendKeys('Test - launch now');
});

Given(/^27_I press save button$/, async () => {
  // clicking on the save button
  await PageShakeTheTree.shakeTreeSaveButton().click();
});

When(/^27_I press launch now button$/, async () => {
  // clicking on the launch now button
  await PageShakeTheTree.shakeTreeLaunchButton().click();
});

Then(/^27_Game is present under the engagment category .$/, async () => {
  // Verifying that the latest card has the correct item name
  const ec = protractor.ExpectedConditions;
  await browser.wait(ec.presenceOf(PageEngagement.itemName()), 5000);
  expect(await PageEngagement.itemInfo().getText()).to.contain('Test - launch now');
  // Verifying the current date of transaction
  await browser.wait(ec.presenceOf(PageShakeTheTree.transactionDate()), 5000);
  expect(await PageShakeTheTree.transactionDate().
    getText()).to.equal(moment(now).format('DD MMM YYYY'));
});

// Successful creation of engagement game shake the tree - launch later
Given(/^28_I am on the engagment page.$/, async () => {
  await PageEngagement.navigateToEngagement();
  await browser.sleep(3000);
});

Given(/^28_I click on create new button.$/, async () => {
  await PageShakeTheTree.shakeTreeCreateNewButton().click();
});

Given(/^28_I click on games button.$/, async () => {
  await PageShakeTheTree.shakeTreeTypeOptions().click();
});

Given(/^28_I click on shake the tree.$/, () => {});

Given(/^28_I click on the next button.$/, async () => {
  await PageEngagement.engagementNextButton().click();
});

Given(/^28_I type the test string$/, async () => {
  const ec = protractor.ExpectedConditions;
  // waiting for main headline field to load
  await browser.wait(ec.presenceOf(PageShakeTheTree.headlineField()), 6000);
  // typing test string in the main headline text field
  await PageShakeTheTree.mainHeadlineField().clear();
  await PageShakeTheTree.mainHeadlineField().sendKeys('Test - launch later');
});

Given(/^28_I press save button$/, async () => {
  await PageShakeTheTree.shakeTreeSaveButton().click();
         });

When(/^28_I press launch later button$/, async () => {
  await PageShakeTheTree.launchLaterBtn().click();
});

Then(/^28_Game is present under the engagment category .$/, async () => {
  // Verifying that the latest card has the correct item name
  const ec = protractor.ExpectedConditions;
  await browser.wait(ec.presenceOf(PageEngagement.itemName()), 5000);
  expect(await PageEngagement.itemInfo().getText()).to.contain('Test - launch later');
  // Verifying the current date of transaction
  await browser.wait(ec.presenceOf(PageShakeTheTree.transactionDate()), 5000);
  expect(await PageShakeTheTree.transactionDate().
    getText()).to.equal(moment(now).format('DD MMM YYYY'));
});

// Dialog box present when save button is pressed
Given(/^29_I am on the shake a tree game creation page$/, async () => {
  await PageShakeTheTree.navigateToShakeTheTree();
});

When(/^29_I press the save button$/, async () => {
  await PageShakeTheTree.shakeTreeSaveButton().click();
});

Then(/^29_The file dialog box is present.$/, async () => {
  expect(await PageShakeTheTree.fileDialog().isPresent()).to.equal(true);
});

// Dialog box has 2 options present when save button is pressed.
Given(/^30_I am on the shake a tree game creation page$/, async () => {
  await PageShakeTheTree.navigateToShakeTheTree();
});

When(/^30_I press the save button$/, async () => {
  await PageShakeTheTree.shakeTreeSaveButton().click();
});

Then(/^30_Both options are present.$/, async () => {
  // doing an assertion on the presence of both elements in the dialog
  // waiting for the dialog element to load
  const ec = protractor.ExpectedConditions;
  await browser.wait(ec.presenceOf(PageShakeTheTree.fileDialog()), 6000);
  expect(await PageShakeTheTree.firstDialogEl()).to.equal(true);
  expect(await PageShakeTheTree.secondDialogEl().isPresent()).to.equal(true);
});
