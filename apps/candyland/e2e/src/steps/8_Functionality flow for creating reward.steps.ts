import { Before, Given, Then, When } from 'cucumber';
import { expect } from 'chai';
import { browser, element, by , protractor } from 'protractor';
import { CreateRewardAppPage } from '../pages/shakeTheTreeFlow.po';

let CreateRewardPage: CreateRewardAppPage;
Before( () => {
  // initializing page objects instance
  CreateRewardPage = new CreateRewardAppPage();
});

// Verifying that the relevant input text fields are present.
Given(/^6_that I am on the reward creation page$/, async () => {
  await CreateRewardPage.navigateToRewardCreate();
});

Then(/^6_The relevant text input fields are present.$/, async () => {
  const ec = protractor.ExpectedConditions;
  // waiting for relevant text input fields to load
  // waiting for header to load
  await browser.wait(ec.presenceOf(element.all(by.css('input[ng-reflect-type="text"]')).get(0)), 5000);
  // waiting for voucher code type field to load
  await browser.wait(ec.presenceOf(element.all(by.css('input[ng-reflect-type="text"]')).get(1)), 5000);
  // waiting for description field to load
  await browser.wait(ec.presenceOf(element.all(by.css('textarea')).get(0)), 5000);
  // waiting for the t&c field to load
  await browser.wait(ec.presenceOf(element.all(by.css('textarea')).get(1)), 5000);
  // asserting the presence of the relevant text input fields
  expect(await element.all(by.css('input[ng-reflect-type="text"]')).get(0).isPresent()).to.equal(true);
  expect(await element.all(by.css('input[ng-reflect-type="text"]')).get(1).isPresent()).to.equal(true);
  expect(await element.all(by.css('textarea')).get(0).isPresent()).to.equal(true);
  expect(await element.all(by.css('textarea')).get(1).isPresent()).to.equal(true);
});

// Verifying the number of options in reward type.
Given(/^7_that I am on the reward creation page.$/, async () => {
  await CreateRewardPage.navigateToRewardCreate();
});

When(/^7_I click on reward type.$/, async () => {
  const ec = protractor.ExpectedConditions;
  // waiting for reward type field
  await browser.wait(ec.elementToBeClickable(element.all(by.css('div.mat-select-trigger')).get(0)), 6000 );
  await element.all(by.css('div.mat-select-trigger')).get(0).click();
});

Then(/^7_I should see eight options.$/, async () => {
  // asserting the number of options
  expect(await element.all(by.css('span.mat-option-text')).count()).to.equal(8);
});

// Verifying the number of options in categories.
Given(/^8_that I am on the reward creation page.$/, async () => {
  await CreateRewardPage.navigateToRewardCreate();
});

When(/^8_I click on categories.$/, async () => {
  const ec = protractor.ExpectedConditions;
  // waiting for category field
  await browser.wait(ec.elementToBeClickable(element.all(by.css('div.mat-select-trigger')).get(1)), 6000 );
  await element.all(by.css('div.mat-select-trigger')).get(1).click();
});

Then(/^8_I should see eight options.$/, async () => {
  // asserting the number of options
  expect(await element.all(by.css('span.mat-option-text')).count()).to.equal(8);
});

// Verifying the number of options in redemption types.
Given(/^9_that I am on the reward creation page.$/, async () => {
  await CreateRewardPage.navigateToRewardCreate();
});

When(/^9_I click on redemption type.$/, async () => {
  const ec = protractor.ExpectedConditions;
  // waiting for category field
  await browser.wait(ec.elementToBeClickable(element.all(by.css('div.mat-select-trigger')).get(2)), 6000 );
  await element.all(by.css('div.mat-select-trigger')).get(2).click();
});

Then(/^9_I should see four options.$/, async () => {
  // asserting the number of options
  expect(await element.all(by.css('span.mat-option-text')).count()).to.equal(4);
});

// Verifiying that there is an upload field when clicking on the option user upload
/*Given('{int}_that I am on the survey creation page.', function(int) {
           // Write code here that turns the phrase above into concrete actions
           return 'pending';
         });

When('{int}_I click on the user upload button.', function(int) {
           // Write code here that turns the phrase above into concrete actions
           return 'pending';
         });

Then('{int}_There should be an upload field.', function(int) {
           // Write code here that turns the phrase above into concrete actions
           return 'pending';
         });

Given('{int}_that I am on the survey creation page.', function(int) {
           // Write code here that turns the phrase above into concrete actions
           return 'pending';
         });

When('{int}_I click on the slider .', function(int) {
           // Write code here that turns the phrase above into concrete actions
           return 'pending';
         });

Then('{int}_I should be type a value in the voucher field and select the frequency.', function(int) {
           // Write code here that turns the phrase above into concrete actions
           return 'pending';
         });

Given('{int}_that I am on the survey creation page.', function(int) {
            // Write code here that turns the phrase above into concrete actions
            return 'pending';
          });

When('{int}_I click on the slider .', function(int) {
            // Write code here that turns the phrase above into concrete actions
            return 'pending';
          });

Then('{int}_I should be able to type a value in the times field and select the frequency.', function(int) {
            // Write code here that turns the phrase above into concrete actions
            return 'pending';
          });

Given('{int}_that I am on the survey creation page.', function(int) {
            // Write code here that turns the phrase above into concrete actions
            return 'pending';
          });

When('{int}_I click on the slider .', function(int) {
            // Write code here that turns the phrase above into concrete actions
            return 'pending';
          });

Then('{int}_I should be able to type a value in the times field and select the frequency.', function(int) {
            // Write code here that turns the phrase above into concrete actions
            return 'pending';
          });*/
