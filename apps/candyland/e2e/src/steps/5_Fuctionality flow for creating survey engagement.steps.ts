import { Before, Given, Then, When } from 'cucumber';
import { expect } from 'chai';
import { browser, element, by , protractor } from 'protractor';
import { EngagementAppPage, CreateSurveyAppPage } from '../pages/candylandApp.po';
import * as path from 'path' ;

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
  await browser.sleep(5000);
});

Then(/^1_the page should be redirected to the correct url.$/, async () => {
  expect(await browser.getCurrentUrl()).to.contain('new-survey');
});

// Verifying that the relevant input text fields are present.
Given(/^2_that I am on the survey creation page$/, async () => {
  await CreateSurveyPage.navigateToSurvey();
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

// Verifying the presence of the preview element.
Given(/^3_that I am on the survey creation page$/, async () => {
    await CreateSurveyPage.navigateToSurvey();
});

When(/^3_I do nothing$/, () => {});

Then(/^3_the preview section element is present.$/, async () => {
    expect(await element(by.className('mobile-preview-mobile')).isPresent()).to.equal(true);
});

// Verifiying that headline message field generates error message when having null value.
Given(/^4_that I am on the survey creation page$/, async () => {
    await CreateSurveyPage.navigateToSurvey();
    browser.sleep(3000);
  });

When(/^4_I entered a empty text string in the headline text box.$/, async () => {
    const ec = protractor.ExpectedConditions;
    await browser.wait(ec.presenceOf(element(by.id('mat-input-1'))), 6000);
    // to elicit the required field message , i click on the headline box first then sub headline box
    await element(by.id('mat-input-1')).click();
    await element(by.id('mat-input-2')).click();
  });

Then(/^4_There is an error message present.$/, async () => {
   const ec = protractor.ExpectedConditions;
   await browser.wait(ec.presenceOf(element(by.id('mat-error-0'))), 6000 );
   expect(await element(by.id('mat-error-0')).getText()).to.contain('Required field');
});

// Verifiying that sub-headline message field generates error message when having null value.
Given(/^5_that I am on the survey creation page$/, async () => {
  await CreateSurveyPage.navigateToSurvey();
  browser.sleep(3000);
});

When(/^5_I entered a empty text string in the sub-headline text box.$/, async () => {
  const ec = protractor.ExpectedConditions;
  await browser.wait(ec.elementToBeClickable(element(by.css('input#mat-input-2'))), 6000);
  await browser.wait(ec.elementToBeClickable(element(by.css('input#mat-input-1'))), 6000);
  // to elicit the required field message , i click on the sub-headline box first then headline box
  await element(by.id('mat-input-2')).click();
  await element(by.id('mat-input-1')).click();
});

Then(/^5_There is an error message present.$/, async () => {
  const ec = protractor.ExpectedConditions;
  await browser.wait(ec.presenceOf(element(by.css('mat-error'))), 6000 );
  expect(await element(by.css('mat-error')).getText()).to.contain('Required field');
});

// Verifiying that add question button element exists.
Given(/^6_that I am on the survey creation page$/, async () => {
  await CreateSurveyPage.navigateToSurvey();
});

When(/^6_I do nothing$/, () => {});

Then(/^6_The Add question button is present.$/, async () => {
   // verifying add question button element
   expect(await element.all(by.css('cl-button>button')).last().isPresent()).to.equal(true);
});

// Verifiying that when clicking add question button element generates a list of five options.
Given(/^7_that I am on the survey creation page$/, async () => {
    await CreateSurveyPage.navigateToSurvey();
});

When(/^7_I click on the add question button.$/, async () => {
    const ec = protractor.ExpectedConditions;
    // waiting for the add question button to be loaded
    await browser.wait(ec.elementToBeClickable(element.all(by.css('cl-button>button')).last()), 6000 );
    await element.all(by.css('cl-button')).last().click();
});

Then(/^7_There are seven options.$/, async () => {
    const ec = protractor.ExpectedConditions;
    await browser.wait(ec.presenceOf(element.all(by.css('mat-option.mat-option.ng-star-inserted')).get(0)), 6000 );
    expect(await element.all(by.css('mat-option.mat-option.ng-star-inserted')).count()).to.be.equal(7);
});

// Verifiying that when clicking add picture choice list element generates a form.
Given(/^8_that I am on list of options for the add question elements$/, async () => {
    const ec = protractor.ExpectedConditions;
    await CreateSurveyPage.navigateToSurvey();
    // waiting for the add question button to be loaded
    await browser.wait(ec.elementToBeClickable(element.all(by.css('cl-button>button')).last()), 6000 );
    // clicking the add question button.
    element.all(by.css('cl-button')).last().click();
});

When(/^8_I select the option for picture choice.$/, async () => {
    // clicking the picture option
    const ec = protractor.ExpectedConditions;
    await browser.wait(ec.presenceOf(element.all(by.css('span.mat-option-text')).get(1)), 6000 );
    await element.all(by.css('div.view-wrap')).get(1).click();
});

Then(/^8_There is a form present.$/, async () => {
    // checking whether the question form is displayed.
    expect(await element.all(by.css('div.question-form-header')).last().isDisplayed()).to.be.equal(true);
});

// Verifiying that picture choice form has relevant text fields
Given(/^9_that I have selected added question picture choice$/, async () => {
    const ec = protractor.ExpectedConditions;
    await CreateSurveyPage.navigateToSurvey();
    // waiting for the add question button to be loaded
    await browser.wait(ec.elementToBeClickable(element.all(by.css('cl-button>button')).last()), 6000 );
    // clicking the add question button.
    element.all(by.css('cl-button')).last().click();
    await browser.wait(ec.presenceOf(element.all(by.css('mat-option.mat-option.ng-star-inserted')).get(1)), 6000 );
    // clicking on the picture choice option
    await element.all(by.css('div.view-text')).get(1).click();
});

Then(/^9_The relevant text fields are present.$/, async () => {
    // ensuring that the relevant text input field is present
    expect(await element(by.css('input#mat-input-3')).isPresent()).to.be.equal(true);
});

// Verifiying that the image is uploaded in the picture choice form successfully
Given(/^10_that I am on the picture choice form$/, async () => {
  const ec = protractor.ExpectedConditions;
  await CreateSurveyPage.navigateToSurvey();
  // waiting for the add question button to be loaded
  await browser.wait(ec.elementToBeClickable(element.all(by.css('cl-button>button')).last()), 6000 );
  // clicking the add question button.
  element.all(by.css('cl-button')).last().click();
  await browser.wait(ec.presenceOf(element.all(by.css('mat-option.mat-option.ng-star-inserted')).get(1)), 6000 );
  // clicking on the picture choice option
  await element.all(by.css('div.view-text')).get(1).click();
  // clicking on the text field to get the upload field
  await element(by.css('input#mat-input-3')).click();
});

When(/^10_I upload a file$/, async () => {
  const FileToUpload = './testArtifacts/testimg.png';
  const absolutePath = path.resolve(__dirname, FileToUpload); // __dirname when inplementing circle ci later
  // upload the file to the picture choice option field
  await element.all(by.css('input[type="file"]')).get(0).sendKeys(absolutePath);
});

Then(/^10_File is uploaded successfully.$/, async () => {
  // making an assertion based on the alt tag
  expect(await element(by.css('div.image-wrap.ng-star-inserted>img')).getAttribute('alt')).to.contain('upload');

});

// Verifiying that header message field generates error message when having null value.
Given(/^11_that I am on the survey creation page$/, async () => {
  await CreateSurveyPage.navigateToSurvey();
});

When(/^11_I entered a empty text string in the header text box.$/, async () => {
  const ec = protractor.ExpectedConditions ;
  // waiting for header text field
  await browser.wait(ec.presenceOf(element.all(by.css('input[type=text]')).get(0)), 7000 );
  // clearing default values
  await element.all(by.css('input[type=text]')).get(0).clear();
  // pressing tab on the header field
  await element.all(by.css('input[type=text]')).get(0).sendKeys(protractor.Key.TAB);
  await browser.sleep(3000);
  // clicking on the headline message field to elicit the message
  // await element(by.id('mat-input-1')).click();
});

Then(/^11_There is an error message present.$/, async () => {
  // doing an assertion based on the attr aria-invalid
  expect(await element(by.id('mat-input-0')).getAttribute('aria-invalid')).to.contain('true');
});
