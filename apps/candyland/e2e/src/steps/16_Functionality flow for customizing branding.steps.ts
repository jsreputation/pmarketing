import { Before, Given, Then, When } from 'cucumber';
import { expect } from 'chai';
import { browser, element, by , protractor } from 'protractor';
import { GeneralSettingsAppPage, BrandingSettingsAppPage } from '../pages/candylandApp.po';
import * as path from 'path' ;

let generalSettingsApp: GeneralSettingsAppPage;
let brandingSettingsApp: BrandingSettingsAppPage;
Before( () => {
  // initializing page objects instances
  generalSettingsApp = new GeneralSettingsAppPage();
  brandingSettingsApp = new BrandingSettingsAppPage();
});

// Ensure functionality of the branding tab
Given(/^4_I am on the general settings page.$/, async () => {
  await generalSettingsApp.navigateToGeneralSettings();
});

When(/^4_I click on the branding tab$/, async () => {
  const ec = protractor.ExpectedConditions;
  // waiting for the tabs to load
  await browser.wait(ec.elementToBeClickable(element.all(by.css('a.mat-tab-link')).get(1)), 6000);
  // clicking on the branding tab
  await element.all(by.css('a.mat-tab-link')).get(1).click();
  await browser.sleep(3000);

});

Then(/^4_I should be on the branding setting tab.$/, async () => {
  // doing an assertion on the url when navigating to page
  expect(await browser.getCurrentUrl()).to.contain('branding');
});

// Verifying that the relevant fields are present.
Given(/^5_that I am on the branding settings page.$/, async () => {
  await brandingSettingsApp.navigateToBrandingSettings();
  await browser.sleep(3000);
});

When(/^5_I do nothing.$/, () => {});

Then(/^5_The relevant fields are present for branding settings page.$/, async () => {
  const ec = protractor.ExpectedConditions;
  // waiting for the relvant fields to load
  // waiting for style field to load
  // Style field
  await browser.wait(ec.presenceOf(element.all(by.css('div.mat-select-value')).get(0)), 8000);
  // Font type field
  await browser.wait(ec.presenceOf(element.all(by.css('div.mat-select-value')).get(1)), 8000);
  // Color field
  await browser.wait(ec.presenceOf(element.all(by.css('div.mat-select-value')).get(2)), 8000);
  // Button color field
  await browser.wait(ec.presenceOf(element.all(by.css('div.mat-select-value')).get(3)), 8000);
  // asserting the presence of elements
  // Style field
  expect(await element.all(by.css('div.mat-select-value')).get(0).isDisplayed());
  // Font type field
  expect(await element.all(by.css('div.mat-select-value')).get(1).isDisplayed());
  // Color field
  expect(await element.all(by.css('div.mat-select-value')).get(2).isDisplayed());
  // Button color field
  expect(await element.all(by.css('div.mat-select-value')).get(3).isDisplayed());
});

// Verifying the presence of the preview element.
Given(/^6_that I am on the settings branding page.$/, async () => {
  await brandingSettingsApp.navigateToBrandingSettings();
});

Then(/^6_I should see the preview element.$/, async () => {
  const ec = protractor.ExpectedConditions;
  // waiting for the preview element to load
  await browser.wait(ec.presenceOf(element(by.css('mat-tab-group'))), 6000);
  // asserting the presence of the element
  expect(await element(by.css('mat-tab-group')).isDisplayed()).to.equal(true);
});

// Verifying the functionality of font type on preview element
Given(/^7_that I am on the settings branding page.$/, async () => {
  await brandingSettingsApp.navigateToBrandingSettings();
});

When(/^7_I select the Lato option.$/, async () => {
  const ec = protractor.ExpectedConditions;
  // waiting for font type drop down to load
  await browser.wait(ec.elementToBeClickable(element.all(by.css('div.mat-select-value')).get(1)), 6000);
  // clicking on the font type drop down
  await element.all(by.css('div.mat-select-value')).get(1).click();
  await browser.sleep(3000);
  // selecting the lato option
  await element.all(by.css('span.mat-option-text')).get(1).click();

});

Then(/^7_I should see the change reflected in the preview element$/, async () => {
  // doing an assertion based on the attr value of the preview element
  expect(await element(by.css('cl-simple-mobile-view')).getAttribute('ng-reflect-font-family')).to.contain('Lato');
});

// Verifying the functionality of primary color field on preview element
Given(/^8_that I am on the settings branding page.$/, async () => {
  await brandingSettingsApp.navigateToBrandingSettings();
});

When(/^8_I select a color.$/, async () => {
  const ec = protractor.ExpectedConditions;
  // waiting for color field for header and navbar to load
  await browser.wait(ec.presenceOf(element.all(by.css('div.mat-select-value')).get(2)), 5000);
  // clicking on the colour field drop down
  await element.all(by.css('div.mat-select-value')).get(2).click();
  await browser.sleep(3000);
  // selecting the primary colour option
  await element.all(by.css('span.mat-option-text')).get(0).click();

});

Then(/^8_I should see the change reflected in the preview element$/, async () => {
  // doing an assertion based on the attr value of the preview element
  const priColor = await element.all(by.css('button.picker-btn')).get(0).getAttribute('ng-reflect-color-picker');
  expect(await element(by.css('cl-simple-mobile-view')).getAttribute('ng-reflect-header-color')).to.contain(priColor);
});

// Verifying the functionality of secondary color field on preview element
Given(/^9_that I am on the settings branding page.$/, async () => {
  await brandingSettingsApp.navigateToBrandingSettings();
});

When(/^9_I select a color.$/, async () => {
  const ec = protractor.ExpectedConditions;
  // waiting for color field for header and navbar to load
  await browser.wait(ec.presenceOf(element.all(by.css('div.mat-select-value')).get(2)), 5000);
  // clicking on the colour field drop down
  await element.all(by.css('div.mat-select-value')).get(2).click();
  await browser.sleep(3000);
  // selecting the primary colour option
  await element.all(by.css('span.mat-option-text')).get(1).click();
});

Then(/^9_I should see the change reflected in the preview element$/, async () => {
  const secColor = await element.all(by.css('button.picker-btn')).get(1).getAttribute('ng-reflect-color-picker');
  expect(await element(by.css('cl-simple-mobile-view')).getAttribute('ng-reflect-header-color')).to.contain(secColor);
});

// Verifying the functionality of logo header upload field
Given(/^10_that I am on the settings branding page.$/, async () => {
  await brandingSettingsApp.navigateToBrandingSettings();
});

When(/^10_I upload a picture.$/, async () => {
  const ec = protractor.ExpectedConditions;
  const FileToUpload = './testArtifacts/testimg.png';
  const absolutePath = path.resolve(__dirname, FileToUpload);
  // waiting for logo header button to load
  await browser.wait(ec.elementToBeClickable(element.all(by.css('div.mat-radio-inner-circle')).get(0)), 8000);
  // clicking on the radio button
  element.all(by.css('div.mat-radio-inner-circle')).get(0).click();
  // waiting for upload field to load
  // await browser.wait(ec.presenceOf(element(by.css('img.image'))), 6000);
  // clearing the default picture choice
  // await element(by.css('button.image-clear')).click();
  // waiting for empty file upload field to load
  await browser.wait(ec.presenceOf(element(by.css('input[type=file]'))), 8000);
  // uploading img in the img upload field
  await element(by.css('input[type="file"]')).sendKeys(absolutePath);
  await browser.sleep(3000);
});

Then(/^10_I should see the change reflected in the preview element$/, async () => {
  // doing an assertion based on the presence of the attr
  expect(await element(by.css('cl-simple-mobile-view')).getAttribute('ng-reflect-logo')).to.not.equal(null);
});

// Verifying the assertions of logo header upload field
Given(/^11_that I am on the settings branding page.$/, async () => {
  await brandingSettingsApp.navigateToBrandingSettings();
});

When(/^11_I upload a non image file.$/, async () => {
  const ec = protractor.ExpectedConditions;
  const FileToUpload = './testArtifacts/testfile.xyz';
  const absolutePath = path.resolve(__dirname, FileToUpload);
  // waiting for logo header button to load
  await browser.wait(ec.elementToBeClickable(element.all(by.css('div.mat-radio-inner-circle')).get(0)), 8000);
  // clicking on the radio button
  element.all(by.css('div.mat-radio-inner-circle')).get(0).click();
  // waiting for upload field to load
  // await browser.wait(ec.presenceOf(element(by.css('img.image'))), 6000);
  // clearing the default picture choice
  // await element(by.css('button.image-clear')).click();
  // waiting for empty file upload field to load
  await browser.wait(ec.presenceOf(element(by.css('input[type=file]'))), 8000);
  // uploading img in the img upload field
  await element(by.css('input[type="file"]')).sendKeys(absolutePath);
  await browser.sleep(3000);
  });

Then(/^11_I should a message indicating this is an invalid file.$/, async () => {
  // asserting the presence of an error message
  expect(await element(by.css('span.upload-error')).isPresent()).to.equal(true);
});

// Verifying the functionality of text header on preview element
Given(/^12_that I am on the settings branding page.$/, async () => {
  await brandingSettingsApp.navigateToBrandingSettings();
});

When(/^12_I input a test text string.$/, async () => {
   const ec = protractor.ExpectedConditions;
   // wait for text header radio button to load
   // await browser.wait(ec.elementToBeClickable(element.all(by.css('div.mat-radio-outer-circle')).get(1)), 6000);
   // clicking on the text header button
   // await element.all(by.css('div.mat-radio-outer-circle')).get(1).click();
   // waiting for the text field to load
   await browser.wait(ec.elementToBeClickable(element(by.css('input[type=text]'))), 6000);
   // entering text string
   await element(by.css('input[type=text]')).clear();
   await element(by.css('input[type=text]')).sendKeys('Test company');
   await browser.sleep(3000);
});

Then(/^12_I should see the change reflected in the preview element$/, async () => {
   // doing an assertion based on attr tags
   expect(await element(by.css('cl-simple-mobile-view')).getAttribute('ng-reflect-logo')).to.contain('Test company');
});
