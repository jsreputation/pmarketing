import { Before, Given, Then } from 'cucumber';
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

/*Given('{int}_that I am on the reward creation page.', function(int) {
           // Write code here that turns the phrase above into concrete actions
           return 'pending';
         });

When('{int}_I click on reward type.', function(int) {
           // Write code here that turns the phrase above into concrete actions
           return 'pending';
         });

Then('{int}_I should see eight options.', function(int) {
           // Write code here that turns the phrase above into concrete actions
           return 'pending';
         });

Given('{int}_that I am on the reward creation page.', function(int) {
           // Write code here that turns the phrase above into concrete actions
           return 'pending';
         });

When('{int}_I click on categories.', function(int) {
           // Write code here that turns the phrase above into concrete actions
           return 'pending';
         });

Then('{int}_I should see six options.', function(int) {
           // Write code here that turns the phrase above into concrete actions
           return 'pending';
         });

Given('{int}_that I am on the reward creation page.', function(int) {
           // Write code here that turns the phrase above into concrete actions
           return 'pending';
         });

When('{int}_I click on redemption type.', function(int) {
           // Write code here that turns the phrase above into concrete actions
           return 'pending';
         });

Then('{int}_I should see four options.', function(int) {
           // Write code here that turns the phrase above into concrete actions
           return 'pending';
         });

Given('{int}_that I am on the survey creation page.', function(int) {
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
