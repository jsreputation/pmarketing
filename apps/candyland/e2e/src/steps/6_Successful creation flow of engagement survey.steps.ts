import {
  Given,
  Then,
  When,
} from 'cucumber';
import {
  browser,
  protractor,
  ProtractorExpectedConditions,
} from 'protractor';
import { expect } from 'chai';

import {
  CreateSurveyAppPage,
  ElementApp,
  EngagementAppPage,
  LoginAppPage,
} from '../pages/candylandApp.po';

const ec: ProtractorExpectedConditions = protractor.ExpectedConditions;

// Successful creation of survey engagement
Given(/^12_I am on the engagment page.$/, async () => {
  // login process
  await LoginAppPage.navigateToLogin();
  // Waiting for account id field to load
  await browser.wait(ec.elementToBeClickable(ElementApp.inputArray().first()), 5000);
  // entering correct account id
  await ElementApp.inputArray().first().sendKeys(LoginAppPage.getAccountId());
  // entering correct testUserAccount
  await ElementApp.inputArray().get(1).sendKeys(LoginAppPage.getUserAccount());
  // entering correct pw
  await ElementApp.inputArray().get(2).sendKeys(LoginAppPage.getPassword());
  // pressing the enter key on the accountID field to log in
  await ElementApp.inputArray().first().sendKeys(protractor.Key.ENTER);
  await browser.sleep(3000);

  await EngagementAppPage.navigateToEngagement();
});

Given(/^12_I click on create new button.$/, async () => {
  await browser.wait(ec.elementToBeClickable(ElementApp.clButton()), 6000);
  // clicking on the create new button
  await ElementApp.clButton().click();
});
// default option is survey, so no action taken.
Given(/^12_I click on survey option.$/, () => {});

Given(/^12_I click on the next button.$/, async () => {
  await browser.wait(ec.elementToBeClickable(ElementApp.matFlatButtonPrimaryArray().get(1)), 6000);
  await ElementApp.matFlatButtonPrimaryArray().get(1).click();
});

Given(/^12_I type the test string.$/, async () => {
  // waiting for header text field
  await browser.wait(ec.presenceOf(CreateSurveyAppPage.headerTextField()), 7000 );
  // clearing the current default string
  await CreateSurveyAppPage.headerTextField().clear();
  // entering a test string in the header text field
  await CreateSurveyAppPage.headerTextField().sendKeys('TestSurvey_0101');
  // entering a test string in the headline text field
  await CreateSurveyAppPage.headlineTextField().sendKeys('TestHeadline_0101');
  // entering a test string in the sub-headline text field
  await CreateSurveyAppPage.subHeadlineTextField().sendKeys('TestSubHeadline_0101');
});

When(/^12_I press save button.$/, async () => {
  // clicking on the save button
  await ElementApp.clButtonArray().get(1).click();
  // Wait for engagement tab to appear
  await browser.wait(ec.presenceOf(ElementApp.clConfirmDialog()), 6000);
  // clicking on the launch now button
  await ElementApp.clButtonArray().get(2).click();
});

Then(/^12_Game is present under the engagment category .$/, async () => {
  await browser.wait(ec.presenceOf(EngagementAppPage.engagementItemArray().first()), 5000);
  // doing an assertion based on the title of the survey engagement
  expect(await EngagementAppPage.itemInfo().getText()).to.contain('TestSurvey_0101');
});
