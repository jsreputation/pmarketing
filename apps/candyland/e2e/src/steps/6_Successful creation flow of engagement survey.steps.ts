import { Before, Given, Then, When } from 'cucumber';
import { expect } from 'chai';
import { browser, element, by , protractor } from 'protractor';
import { EngagementAppPage } from '../pages/candylandApp.po';

let PageEngagement: EngagementAppPage ;

Before( () => {
  // initializing page objects instances
  PageEngagement = new EngagementAppPage();
});

// Successful creation of survey engagement
Given(/^12_I am on the engagment page.$/, async () => {
  await PageEngagement.navigateToEngagement();
});

Given(/^12_I click on create new button.$/, async () => {
  await element.all(by.css('button')).get(2).click();
});
// default option is survey, so no action taken.
Given(/^12_I click on survey option.$/, () => {});

Given(/^12_I click on the next button.$/, async () => {
  await element.all(by.css('cl-button')).last().click();
});

Given(/^12_I type the test string.$/, async () => {
  const ec = protractor.ExpectedConditions;
  // waiting for header text field
  await browser.wait(ec.presenceOf(element.all(by.css('div.mat-form-field-infix>input')).first()), 7000 );
  // clearing the current default string
  await element.all(by.css('div.mat-form-field-infix>input')).first().clear();
  // entering a test string in the header text field
  await element.all(by.css('div.mat-form-field-infix>input')).first().sendKeys('TestSurvey_0101');
  // entering a test string in the headline text field
  await element.all(by.css('div.mat-form-field-infix>input')).get(1).sendKeys('TestHeadline_0101');
  // entering a test string in the sub-headline text field
  await element.all(by.css('div.mat-form-field-infix>input')).get(2).sendKeys('TestSubHeadline_0101');
  // entering a test string in the question text field
  await element.all(by.css('div.mat-form-field-infix>input')).get(3).sendKeys('TestQuestion_0101');
});

When(/^12_I press save button.$/, async () => {
  const ec = protractor.ExpectedConditions;
  // clicking on the save button
  await element.all(by.css('cl-button')).get(1).click();
  // Wait for engagement tab to appear
  await browser.wait(ec.presenceOf(element(by.css('cl-confirm-modal'))), 6000);
  // clicking on the launch now button
  await element.all(by.css('cl-button')).get(2).click();
});

Then(/^12_Game is present under the engagment category .$/, async () => {
  const ec = protractor.ExpectedConditions;
  await browser.wait(ec.presenceOf(element.all(by.css('p.engagement-item-name')).first()), 5000);
  // doing an assertion based on the title of the survey engagement
  expect(await element.all(by.css('div.engagement-item-info>p.engagement-item-name')).first().getText()).to.contain('TestSurvey_0101');
});
