import { Before, Given, Then, When } from 'cucumber';
import { expect } from 'chai';
import { browser, protractor, ProtractorExpectedConditions } from 'protractor';
import { CreateSurveyAppPage, ElementApp, EngagementAppPage, LoginAppPage } from '../pages/candylandApp.po';

let PageEngagement: EngagementAppPage;
let CreateSurveyPage: CreateSurveyAppPage;
const ec: ProtractorExpectedConditions = protractor.ExpectedConditions;

Before( () => {
  // initializing page objects instances
  PageEngagement = new EngagementAppPage();
  CreateSurveyPage = new CreateSurveyAppPage();
});

// Successful creation of survey engagement
Given(/^12_I am on the engagment page.$/, async () => {
  // login process
  await LoginAppPage.navigateToLogin();
  // Waiting for account id field to load
  await browser.wait(ec.elementToBeClickable(LoginAppPage.accountIDField()), 5000);
  // entering correct account id
  await LoginAppPage.accountIDField().sendKeys(LoginAppPage.getAccountId());
  // entering correct testUserAccount
  await LoginAppPage.userAccountField().sendKeys(LoginAppPage.getUserAccount());
  // entering correct pw
  await LoginAppPage.pwField().sendKeys(LoginAppPage.getPassword());
  // pressing the enter key on the accountID field to log in
  await LoginAppPage.accountIDField().sendKeys(protractor.Key.ENTER);
  await browser.sleep(3000);

  await PageEngagement.navigateToEngagement();
});

Given(/^12_I click on create new button.$/, async () => {
  await browser.wait(ec.elementToBeClickable(ElementApp.clButton()), 6000);
  // clicking on the create new button
  await ElementApp.clButton().click();
});
// default option is survey, so no action taken.
Given(/^12_I click on survey option.$/, () => {});

Given(/^12_I click on the next button.$/, async () => {
  await browser.wait(ec.elementToBeClickable(PageEngagement.engagementNextButton()), 6000);
  await PageEngagement.engagementNextButton().click();
});

Given(/^12_I type the test string.$/, async () => {
  // waiting for header text field
  await browser.wait(ec.presenceOf(CreateSurveyPage.headerTextField()), 7000 );
  // clearing the current default string
  await CreateSurveyPage.headerTextField().clear();
  // entering a test string in the header text field
  await CreateSurveyPage.headerTextField().sendKeys('TestSurvey_0101');
  // entering a test string in the headline text field
  await CreateSurveyPage.headlineTextField().sendKeys('TestHeadline_0101');
  // entering a test string in the sub-headline text field
  await CreateSurveyPage.subHeadlineTextField().sendKeys('TestSubHeadline_0101');
});

When(/^12_I press save button.$/, async () => {
  // clicking on the save button
  await ElementApp.clButtonArray().get(1).click();
  // Wait for engagement tab to appear
  await browser.wait(ec.presenceOf(CreateSurveyPage.confirmModal()), 6000);
  // clicking on the launch now button
  await ElementApp.clButtonArray().get(2).click();
});

Then(/^12_Game is present under the engagment category .$/, async () => {
  await browser.wait(ec.presenceOf(PageEngagement.itemName()), 5000);
  // doing an assertion based on the title of the survey engagement
  expect(await PageEngagement.itemInfo().getText()).to.contain('TestSurvey_0101');
});
