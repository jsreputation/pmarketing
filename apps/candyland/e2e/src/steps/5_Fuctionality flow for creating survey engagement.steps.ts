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
import * as path from 'path' ;

import {
  EngagementAppPage,
  CreateSurveyAppPage,
  LoginAppPage,
  ElementApp,
} from '../pages/candylandApp.po';

const ec: ProtractorExpectedConditions = protractor.ExpectedConditions;

// Ensure that clicking the survey button leads to survey creation page
Given(/^1_I am on the customer engagment dialog box$/, async () => {
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

  await EngagementAppPage.navigateToEngagement();
  await browser.wait(ec.presenceOf(ElementApp.matFlatButtonPrimary()), 5000);
  // clicking on the create new button
  await ElementApp.matFlatButtonPrimary().click();
});

When(/^1_I click on the survey option$/, async () => {
  // clicking on the survey option
  await browser.wait(ec.presenceOf(EngagementAppPage.engagementTypeOptions().first()), 5000);
  // clicking the survey option
  await EngagementAppPage.engagementTypeOptions().first().click();
  // clicking on the next button
  await ElementApp.matFlatButtonPrimaryArray().click();
  await browser.sleep(5000);
});

Then(/^1_the page should be redirected to the correct url.$/, async () => {
  expect(await browser.getCurrentUrl()).to.contain('new-survey');
});

// Verifying that the relevant input text fields are present.
Given(/^2_that I am on the survey creation page$/, async () => {
  await CreateSurveyAppPage.navigateToSurvey();
});

When(/^2_I do nothing$/,  () => {});

Then(/^2_The relevant text input fields are present.$/, async () => {
  // waiting for header text field
  await browser.wait(ec.presenceOf(CreateSurveyAppPage.headerByIdField()), 7000);
  // waiting for headline text field
  await browser.wait(ec.presenceOf(CreateSurveyAppPage.headlineByIdField()), 7000);
  // waiting for sub-headline text field
  await browser.wait(ec.presenceOf(CreateSurveyAppPage.subHeadlineByIdField()), 7000);
  expect(await CreateSurveyAppPage.headerByIdField().isPresent()).to.equal(true);
  expect(await CreateSurveyAppPage.headlineByIdField().isPresent()).to.equal(true);
  expect(await CreateSurveyAppPage.subHeadlineByIdField().isPresent()).to.equal(true);
});

// Verifying the presence of the preview element.
Given(/^3_that I am on the survey creation page$/, async () => {
  await CreateSurveyAppPage.navigateToSurvey();
});

When(/^3_I do nothing$/, () => {});

Then(/^3_the preview section element is present.$/, async () => {
  expect(await CreateSurveyAppPage.previewElement().isPresent()).to.equal(true);
});

// Verifiying that headline message field generates error message when having null value.
Given(/^4_that I am on the survey creation page$/, async () => {
  await CreateSurveyAppPage.navigateToSurvey();
  browser.sleep(3000);
});

When(/^4_I entered a empty text string in the headline text box.$/, async () => {
  await browser.wait(ec.presenceOf(CreateSurveyAppPage.headlineByIdField()), 6000);
  // to elicit the required field message , i click on the headline box first then sub headline box
  await CreateSurveyAppPage.headlineByIdField().click();
  await CreateSurveyAppPage.subHeadlineByIdField().click();
});

Then(/^4_There is an error message present.$/, async () => {
  await browser.wait(ec.presenceOf(CreateSurveyAppPage.errorMessageByIdField()), 6000);
  expect(await CreateSurveyAppPage.errorMessageByIdField().getText()).to.contain('Required field');
});

// This scenario is not valid for now, as far as sub-headline is no longer a required field
// Verifiying that sub-headline message field generates error message when having null value.
Given(/^5_that I am on the survey creation page$/, async () => {
  await CreateSurveyAppPage.navigateToSurvey();
  browser.sleep(3000);
});

When(/^5_I entered a empty text string in the sub-headline text box.$/, async () => {
  await browser.wait(ec.elementToBeClickable(CreateSurveyAppPage.subHeadlineField()), 6000);
  await browser.wait(ec.elementToBeClickable(ElementApp.inputTextArray().get(1)), 6000);
  // to elicit the required field message , i click on the sub-headline box first then headline box
  await CreateSurveyAppPage.subHeadlineByIdField().click();
  await CreateSurveyAppPage.headlineByIdField().click();
});

Then(/^5_There is an error message present.$/, async () => {
  await browser.wait(ec.presenceOf(ElementApp.matError()), 6000 );
  expect(await ElementApp.matError().getText()).to.contain('Required field');
});

// Verifiying that add question button element exists.
Given(/^6_that I am on the survey creation page$/, async () => {
  await CreateSurveyAppPage.navigateToSurvey();
});

When(/^6_I do nothing$/, () => {});

Then(/^6_The Add question button is present.$/, async () => {
  // verifying add question button element
  expect(await CreateSurveyAppPage.loadQuestionButton().isPresent()).to.equal(true);
});

// Verifiying that when clicking add question button element generates a list of five options.
Given(/^7_that I am on the survey creation page$/, async () => {
  await CreateSurveyAppPage.navigateToSurvey();
});

When(/^7_I click on the add question button.$/, async () => {
  // waiting for the add question button to be loaded
  await browser.wait(ec.elementToBeClickable(CreateSurveyAppPage.loadQuestionButton()), 6000);
  await ElementApp.clButtonArray().last().click();
});

Then(/^7_There are seven options.$/, async () => {
  await browser.wait(ec.presenceOf(CreateSurveyAppPage.surveyOptions().get(0)), 6000);
  expect(await CreateSurveyAppPage.surveyOptions().count()).to.be.equal(7);
});

// Verifiying that when clicking add picture choice list element generates a form.
Given(/^8_that I am on list of options for the add question elements$/, async () => {
  await CreateSurveyAppPage.navigateToSurvey();
  // waiting for the add question button to be loaded
  await browser.wait(ec.elementToBeClickable(CreateSurveyAppPage.loadQuestionButton()), 6000);
  // clicking the add question button.
  ElementApp.clButtonArray().last().click();
});

When(/^8_I select the option for picture choice.$/, async () => {
  // clicking the picture option
  await browser.wait(ec.presenceOf(ElementApp.spanMatOptionText().get(1)), 6000);
  await CreateSurveyAppPage.optionWrap().click();
});

Then(/^8_There is a form present.$/, async () => {
  // checking whether the question form is displayed.
  expect(await CreateSurveyAppPage.questionForm().isDisplayed()).to.be.equal(true);
});

// Verifiying that picture choice form has relevant text fields
Given(/^9_that I have selected added question picture choice$/, async () => {
  await CreateSurveyAppPage.navigateToSurvey();
  // waiting for the add question button to be loaded
  await browser.wait(ec.elementToBeClickable(CreateSurveyAppPage.loadQuestionButton()), 6000);
  // clicking the add question button.
  ElementApp.clButtonArray().last()
    .click();
  await browser.wait(ec.presenceOf(CreateSurveyAppPage.surveyOptions().get(1)), 6000);
  // clicking on the picture choice option
  await CreateSurveyAppPage.pictureChoiceOption().click();
});

Then(/^9_The relevant text fields are present.$/, async () => {
  // ensuring that the relevant text input field is present
  expect(await CreateSurveyAppPage.textField().isPresent()).to.be.equal(true);
});

// Verifiying that the image is uploaded in the picture choice form successfully
Given(/^10_that I am on the picture choice form$/, async () => {
  await CreateSurveyAppPage.navigateToSurvey();
  // waiting for the add question button to be loaded
  await browser.wait(ec.elementToBeClickable(CreateSurveyAppPage.loadQuestionButton()), 6000 );
  // clicking the add question button.
  ElementApp.clButtonArray().last().click();
  await browser.wait(ec.presenceOf(CreateSurveyAppPage.surveyOptions().get(1)), 6000 );
  // clicking on the picture choice option
  await CreateSurveyAppPage.pictureChoiceOption().click();
  // clicking on the text field to get the upload field
  await CreateSurveyAppPage.textField().click();
});

When(/^10_I upload a file$/, async () => {
  const FileToUpload = './testArtifacts/testimg.png';
  const absolutePath = path.resolve(__dirname, FileToUpload); // __dirname when inplementing circle ci later
  // upload the file to the picture choice option field
  await ElementApp.inputFileArray().get(0).sendKeys(absolutePath);
});

Then(/^10_File is uploaded successfully.$/, async () => {
  // making an assertion based on the alt tag
  expect(await ElementApp.imageWrap().getAttribute('alt')).to.contain('upload');
});

// Verifiying that header message field generates error message when having null value.
Given(/^11_that I am on the survey creation page$/, async () => {
  await CreateSurveyAppPage.navigateToSurvey();
});

When(/^11_I entered a empty text string in the header text box.$/, async () => {
  // waiting for header text field
  await browser.wait(ec.presenceOf(ElementApp.inputTextArray().get(0)), 7000 );
  // clearing default values
  await ElementApp.inputTextArray().get(0).clear();
  // pressing tab on the header field
  await ElementApp.inputTextArray().get(0).sendKeys(protractor.Key.TAB);
  await browser.sleep(3000);
  // clicking on the headline message field to elicit the message
  // await element(by.id('mat-input-1')).click();
});

Then(/^11_There is an error message present.$/, async () => {
  // doing an assertion based on the attr aria-invalid
  expect(await CreateSurveyAppPage.headerByIdField().getAttribute('aria-invalid')).to.contain('true');
});
