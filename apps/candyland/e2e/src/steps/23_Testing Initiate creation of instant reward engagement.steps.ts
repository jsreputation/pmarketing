import { Given, Then, When } from 'cucumber';
import { expect } from 'chai';
import { browser, element, by , protractor } from 'protractor';
import { EngagementAppPage } from '../pages/candylandApp.po';
let EngagementApp: EngagementAppPage;
// Ensure that instant reward engagement type option is present.

Then(/^1_The instant reward option should be present.$/, async () => {
  const ec = protractor.ExpectedConditions;
  await browser.sleep(3000);
  // waiting for the instant reward button to load
  await browser.wait(ec.elementToBeClickable(element.all(by.css('button.engagement-selector')).get(3)), 6000);
  // doing an assertion on the presence of the button
  expect(await element.all(by.css('button.engagement-selector')).get(3).isDisplayed()).to.equal(true);
});

// Ensure that selecting the instant reward option and clicking next navigates to instant reward template creation.
Given(/^2_I click on the instant reward option$/, async () => {
  EngagementApp = new EngagementAppPage();
  const ec = protractor.ExpectedConditions;
  await EngagementApp.navigateToEngagement();
  // waiting for the create new button to load
  await browser.wait(ec.elementToBeClickable(element(by.css('cl-button'))), 6000);
  // clicking on the create new button
  await element(by.css('cl-button')).click();
  // waiting for the instant reward button to load
  await browser.wait(ec.presenceOf(element.all(by.css('button.engagement-selector')).get(3)), 6000);
  // clicking on the instant reward option
  await element.all(by.css('button.engagement-selector')).get(3).click();
});

When(/^2_I click next button on the engagement dialog.$/, async () => {
  const ec = protractor.ExpectedConditions;
  // waiting for the next button to load
  await browser.wait(ec.elementToBeClickable(element.all(by.css('cl-button')).get(2)), 6000);
  // clicking on the next button
  await element.all(by.css('cl-button')).get(2).click();
  await browser.sleep(3000);
  // stopping the walkme widget
  await browser.executeScript('WalkMeAPI.stopFlow()');
});

Then(/^2_I should be navigated to the instant reward page.$/, async () => {
  expect(await browser.getCurrentUrl()).to.contain('new-instant-reward');
});

// Ensure that instant reward page have relevant elements
Then(/^3_I should see the relevant elements for instant reward.$/, async () => {
  const ec = protractor.ExpectedConditions;
  // waiting for the relevant text fields to load
  // header field
  await browser.wait(ec.presenceOf(element.all(by.css('input[type=text]')).get(0)), 6000);
  // headline field
  await browser.wait(ec.presenceOf(element.all(by.css('input[type=text]')).get(1)), 6000);
  // sub-headline field
  await browser.wait(ec.presenceOf(element.all(by.css('input[type=text]')).get(2)), 6000);
  // button text field
  await browser.wait(ec.presenceOf(element.all(by.css('input[type=text]')).get(3)), 6000);
  // asserting the presence of the element
  // header field
  expect(await element.all(by.css('input[type=text]')).get(0).isDisplayed()).to.equal(true);
  // headline field
  expect(await element.all(by.css('input[type=text]')).get(1).isDisplayed()).to.equal(true);
  // sub-headline field
  expect(await element.all(by.css('input[type=text]')).get(2).isDisplayed()).to.equal(true);
  // button text field
  expect(await element.all(by.css('input[type=text]')).get(3).isDisplayed()).to.equal(true);
});
