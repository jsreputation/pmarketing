import { Before, Given, Then, When } from 'cucumber';
import { expect } from 'chai';
import { browser, element, by , protractor } from 'protractor';
import { EngagementAppPage, CreateSurveyAppPage } from '../pages/shakeTheTreeFlow.po';

let PageEngagement: EngagementAppPage;
let CreateSurveyPage: CreateSurveyAppPage;

Before( () => {
  // initializing page objects instances
  PageEngagement = new EngagementAppPage();
  CreateSurveyPage = new CreateSurveyAppPage();
});
// Ensure that clicking the survey button leads to survey creation page
Given(/^1_I am on the customer engagment dialog box$/, async () => {
  const ec = protractor.ExpectedConditions;
  await PageEngagement.navigateToEngagement();
  await browser.wait(ec.presenceOf(element.all(by.css('button')).get(2)), 5000);
  // clicking on the create new button
  await element.all(by.css('button')).get(2).click();
});

When(/^1_I click on the survey option$/, async () => {
  // clicking on the survey option
  const ec = protractor.ExpectedConditions;
  await browser.wait(ec.presenceOf(element.all(by.css('cl-type-item')).first()), 5000);
  // clicking the survey option
  await element.all(by.css('cl-type-item')).first().click();
  // clicking on the next button
  await element.all(by.className('btn mat-flat-button primary')).get(1).click();
});

Then(/^1_the page should be redirected to the correct url.$/, async () => {
  expect(await browser.getCurrentUrl()).to.contain('new-survey');
});

// Verifying that the relevant input text fields are present.
Given(/^2_that I am on the survey creation page$/, async () => {
  await CreateSurveyPage.navigateToSurvey();
  browser.sleep(3000);
});

When(/^2_I do nothing$/,  () => {});

Then(/^2_The relevant text input fields are present.$/, async () => {
   const ec = protractor.ExpectedConditions ;
   // waiting for header text field
   await browser.wait(ec.presenceOf(element(by.id('mat-input-0'))), 7000 );
   // waiting for headline text field
   await browser.wait(ec.presenceOf(element(by.id('mat-input-1'))), 7000 );
   // waiting for sub-headline text field
   await browser.wait(ec.presenceOf(element(by.id('mat-input-2'))), 7000 );
   expect( await element(by.id('mat-input-0')).isPresent()).to.equal(true);
   expect( await element(by.id('mat-input-1')).isPresent()).to.equal(true);
   expect( await element(by.id('mat-input-2')).isPresent()).to.equal(true);
});

/*Given('{int}_that I am on the survey creation page', function (int) {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
  });

When('{int}_I do nothing', function (int) {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
  });

Then('{int}_the preview section element is present.', function (int) {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
  });

Given('{int}_that I am on the survey creation page', function (int) {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
  });

When('{int}_I entered a empty text string in the headline text box.', function (int) {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
  });

Then('{int}_There is an error message present.', function (int) {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
  });

Given('{int}_that I am on the survey creation page', function (int) {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
  });

When('{int}_I entered a empty text string in the sub-headline text box.', function (int) {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
  });

Then('{int}_There is an error message present.', function (int) {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
  });

Given('{int}_that I am on the survey creation page', function (int) {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
  });

When('{int}_I do nothing', function (int) {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
  });

Then('{int}_The Add question button is present.', function (int) {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
  });

Given('{int}_that I am on the survey creation page', function (int) {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
  });

When('{int}_I click on the add question button.', function (int) {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
  });

Then('{int}_There are five options.', function (int) {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
  });

Given('{int}_that I am on list of options for the add question elements', function (int) {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
  });

When('{int}_I select the option for picture choice.', function (int) {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
  });

Then('{int}_There is a form present.', function (int) {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
  });

Given('{int}_that I have selected added question picture choice', function (int) {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
  });

Then('{int}_The relevant text fields are present.', function (int) {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
  });

Given('{int}_that I am on the picture choice form', function (int) {
     // Write code here that turns the phrase above into concrete actions
     return 'pending';
   });

When('{int}_I upload a file', function (int) {
     // Write code here that turns the phrase above into concrete actions
     return 'pending';
   });

Then('{int}_File is uploaded successfully.', function (int) {
     // Write code here that turns the phrase above into concrete actions
     return 'pending';
   });
*/
