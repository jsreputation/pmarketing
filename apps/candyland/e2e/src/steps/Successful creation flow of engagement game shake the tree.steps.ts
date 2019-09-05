import { Before, Given, Then, When } from 'cucumber';
import { expect } from 'chai';
import { browser, element, by , protractor } from 'protractor';
import { EngagementAppPage } from '../pages/shakeTheTreeFlow.po';
import * as moment from 'moment';
// initializing instances of the pages

let PageEngagement: EngagementAppPage;

// Getting the current day, month , year
const now = moment().format();

Before( () => {
  // initializing page objects instances
  PageEngagement = new EngagementAppPage();
  // PageShakeTheTree = new CreateShakeTheTreeAppPage();

});

// Successful creation of engagement game shake the tree - launch now
Given(/^27_I am on the engagment page.$/, async () => {
  await PageEngagement.navigateToEngagement();
  await browser.sleep(3000);
});

Given(/^27_I click on create new button.$/, async () => {
  await element.all(by.css('button')).get(2).click();
});

Given(/^27_I click on games button.$/, async () => {
  // clicking on the games option
  await element.all(by.tagName('cl-type-item')).get(1).click();
});

Given(/^27_I click on shake the tree.$/, () => {});

Given(/^27_I click on the next button.$/, async () => {
  // clicking on the next button
  await element.all(by.className('btn mat-flat-button primary')).get(1).click();
});

Given(/^27_I type the test string$/, async () => {
  // typing test string in the main headline text field
  await element(by.css('input#mat-input-1')).clear();
  await element(by.css('input#mat-input-1')).sendKeys('Test - launch now');
});

Given(/^27_I press save button$/, async () => {
  // clicking on the save button
  await element(by.css('button.btn.mat-flat-button.primary')).click();
});

When(/^27_I press launch now button$/, async () => {
  // clicking on the launch now button
  await element.all(by.css('button.btn.mat-flat-button.primary')).last().click();
});

Then(/^27_Game is present under the engagment category .$/, async () => {
  // Verifying that the latest card has the correct item name
  const ec = protractor.ExpectedConditions;
  await browser.wait(ec.presenceOf(element.all(by.css('p.engagement-item-name')).first()), 5000);
  expect(await element.all(by.css('div.engagement-item-info>p.engagement-item-name')).first().getText()).to.contain('Test - launch now');
  // Verifying the current date of transaction
  await browser.wait(ec.presenceOf(element.all(by.css('p.engagement-item-date')).first()), 5000);
  expect(await element.all(by.css('p.engagement-item-date')).first().
  getText()).to.equal(moment(now).format('DD MMM YYYY'));
});

// Successful creation of engagement game shake the tree - launch later
Given(/^28_I am on the engagment page.$/, async () => {
  await PageEngagement.navigateToEngagement();
  await browser.sleep(3000);
});

Given(/^28_I click on create new button.$/, async () => {
  await element.all(by.css('button')).get(2).click();
});

Given(/^28_I click on games button.$/, async () => {
  await element.all(by.tagName('cl-type-item')).get(1).click();
});

Given(/^28_I click on shake the tree.$/, () => {});

Given(/^28_I click on the next button.$/, async () => {
  await element.all(by.className('btn mat-flat-button primary')).get(1).click();
});

Given(/^28_I type the test string$/, async () => {
  await element(by.css('input#mat-input-1')).clear();
  await element(by.css('input#mat-input-1')).sendKeys('Test - launch later');
});

Given(/^28_I press save button$/, async () => {
  await element(by.css('button.btn.mat-flat-button.primary')).click();
         });

When(/^28_I press launch later button$/, async () => {
  await element(by.css('cl-button.actions-close')).click();
});

Then(/^28_Game is present under the engagment category .$/, async () => {
  // Verifying that the latest card has the correct item name
  const ec = protractor.ExpectedConditions;
  await browser.wait(ec.presenceOf(element.all(by.css('p.engagement-item-name')).first()), 5000);
  expect(await element.all(by.css('div.engagement-item-info>p.engagement-item-name')).first().getText()).to.contain('Test - launch later');
  // Verifying the current date of transaction
  await browser.wait(ec.presenceOf(element.all(by.css('p.engagement-item-date')).first()), 5000);
  expect(await element.all(by.css('p.engagement-item-date')).first().
  getText()).to.equal(moment(now).format('DD MMM YYYY'));
});

/*When('{int}_I press the save button', function(int) {
           // Write code here that turns the phrase above into concrete actions
           return 'pending';
         });

Then('{int}_The file dialog box is present.', function(int) {
           // Write code here that turns the phrase above into concrete actions
           return 'pending';
         });

When('{int}_I press the save button', function(int) {
           // Write code here that turns the phrase above into concrete actions
           return 'pending';
         });

Then('{int}_Both options are present.', function(int) {
           // Write code here that turns the phrase above into concrete actions
           return 'pending';
         });

Given('{int}_I am on the shake a tree game creation page', function(int) {
           // Write code here that turns the phrase above into concrete actions
           return 'pending';
         });

Given('{int}_I entered text string {string}', function(int, string) {
           // Write code here that turns the phrase above into concrete actions
           return 'pending';
         });

Given('{int}_I press the save button.', function(int) {
           // Write code here that turns the phrase above into concrete actions
           return 'pending';
         });

When('{int}_I press the button launch now', function(int) {
           // Write code here that turns the phrase above into concrete actions
           return 'pending';
         });

Then('{int}_Latest card has the correct game title and date.', function(int) {
           // Write code here that turns the phrase above into concrete actions
           return 'pending';
         });
*/
