import { Before, Given, Then, When } from 'cucumber';
import { expect } from 'chai';
import { browser, protractor } from 'protractor';
import { CreateSurveyAppPage, EngagementAppPage } from '../pages/candylandApp.po';

let PageEngagement: EngagementAppPage;
let CreateSurveyPage: CreateSurveyAppPage;

Before( () => {
  // initializing page objects instances
  PageEngagement = new EngagementAppPage();
  CreateSurveyPage = new CreateSurveyAppPage();
});

// Successful creation of survey engagement
Given(/^12_I am on the engagment page.$/, async () => {
  await PageEngagement.navigateToEngagement();
});

Given(/^12_I click on create new button.$/, async () => {
  await CreateSurveyPage.surveyCreateNewButton();
});
// default option is survey, so no action taken.
Given(/^12_I click on survey option.$/, () => {});

Given(/^12_I click on the next button.$/, async () => {
  await CreateSurveyPage.questionButton().click();
});

Given(/^12_I type the test string.$/, async () => {
  const ec = protractor.ExpectedConditions;
  // waiting for header text field
  await browser.wait(ec.presenceOf(CreateSurveyPage.headerTextField()), 7000 );
  // clearing the current default string
  await CreateSurveyPage.headerTextField().first().clear();
  // entering a test string in the header text field
  await CreateSurveyPage.headerTextField().sendKeys('TestSurvey_0101');
  // entering a test string in the headline text field
  await CreateSurveyPage.headlineTextField().sendKeys('TestHeadline_0101');
  // entering a test string in the sub-headline text field
  await CreateSurveyPage.subHeadlineTextField().sendKeys('TestSubHeadline_0101');
  // entering a test string in the question text field
  await CreateSurveyPage.questionTextField().sendKeys('TestQuestion_0101');
});

When(/^12_I press save button.$/, async () => {
  const ec = protractor.ExpectedConditions;
  // clicking on the save button
  await PageEngagement.saveButton().click();
  // Wait for engagement tab to appear
  await browser.wait(ec.presenceOf(PageEngagement.confirmModal()), 6000);
  // clicking on the launch now button
  await PageEngagement.nextLaunchNowButton().click();
});

Then(/^12_Game is present under the engagment category .$/, async () => {
  const ec = protractor.ExpectedConditions;
  await browser.wait(ec.presenceOf(PageEngagement.itemName()), 5000);
  // doing an assertion based on the title of the survey engagement
  expect(await PageEngagement.itemInfo().getText()).to.contain('TestSurvey_0101');
});
