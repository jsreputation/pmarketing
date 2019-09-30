import { Before, Given, Then, When } from 'cucumber';
import { expect } from 'chai';
import { browser, element, by , protractor } from 'protractor';
import { AudienceAppPage } from '../pages/candylandApp.po';

let AudienceApp: AudienceAppPage;
Before( () => {
  // initializing page objects instances
  AudienceApp = new AudienceAppPage();
});
// Ensure functionality of the add user button.
Given(/^4_I am on the audience page.$/, async () => {
  await AudienceApp.navigateToAudience();
});

When(/^4_I click on the add user button.$/, async () => {
  const ec = protractor.ExpectedConditions;
  // wait for add user button to load
  await browser.wait(ec.presenceOf(element(by.css('cl-button'))), 6000);
  // clicking on the add user button
  await element(by.css('cl-button')).click();
});

Then(/^4_I should see the add audience dialog box.$/, async () => {
  const ec = protractor.ExpectedConditions;
  // waiting for the create user dialog box to load
  await browser.wait(ec.presenceOf(element(by.css('mat-tab-body'))), 6000);
  // asserting the presence of the create user dialog box
  expect(await element(by.css('mat-tab-body')).isDisplayed()).to.equal(true);
});

// Verifying that the essential fields are present.

Given(/^5_that I am on add audience dialog box.$/, async () => {
  const ec = protractor.ExpectedConditions;
  await AudienceApp.navigateToAudience();
  await browser.wait(ec.presenceOf(element(by.css('cl-button'))), 6000);
  // clicking on the add user button
  await element(by.css('cl-button')).click();
  await browser.sleep(3000);
});

Then(/^5_The essential fields are present for add audience engagement dialog.$/, async () => {
  // waiting for the required fields to load
  const ec = protractor.ExpectedConditions;
  // first name field
  await browser.wait(ec.presenceOf(element.all(by.css('input[type=text]')).get(1)), 8000);
  // last name field
  await browser.wait(ec.presenceOf(element.all(by.css('input[type=text]')).get(2)), 8000);
  // email address field
  await browser.wait(ec.presenceOf(element(by.css('input[type=email]'))), 8000);
  // mobile number field
  await browser.wait(ec.presenceOf(element(by.css('input[type=tel]'))), 8000);
  // asserting the presence of the fields
  // first name field
  expect(await element.all(by.css('input[type=text]')).get(1).isDisplayed()).to.equal(true);
  // last name field
  expect(await element.all(by.css('input[type=text]')).get(2).isDisplayed()).to.equal(true);
  // email address field
  expect(await element(by.css('input[type=email]')).isDisplayed()).to.equal(true);
  // mobile number field
  expect(await element(by.css('input[type=tel]')).isDisplayed()).to.equal(true);
});

// Verifying the number of options for add to audience list dropdown.
/*Given(/^6_that I am on add audience dialog box.$/, async () => {
           // Write code here that turns the phrase above into concrete actions
           return 'pending';
});

When(/^6_I click on the add to audience list.$/, async () => {
           // Write code here that turns the phrase above into concrete actions
           return 'pending';
         });

Then(/^{int}_The number of options is correct.$/, async () => {
           // Write code here that turns the phrase above into concrete actions
           return 'pending';
         });

// Verifying the assertion of the email address field.
Given(/^{int}_that I am on add audience dialog box.$/, async () => {
           // Write code here that turns the phrase above into concrete actions
           return 'pending';
         });

When(/^{int}_I input a non email address$/, async () => {
           // Write code here that turns the phrase above into concrete actions
           return 'pending';
         });

Then(/^{int}_I should see a error message.$/, async () => {
           // Write code here that turns the phrase above into concrete actions
           return 'pending';
         });

// Verifying the assertion of the essential fields.

Given(/^{int}_{int}_that I am on add audience dialog box.$/, async () => {
           // Write code here that turns the phrase above into concrete actions
           return 'pending';
         });

When(/^{int}_I input null values for the essential fields$/, async () => {
           // Write code here that turns the phrase above into concrete actions
           return 'pending';
         });

Then(/^{int}_I should see a error message.$/, async () => {
           // Write code here that turns the phrase above into concrete actions
           return 'pending';
         });*/
