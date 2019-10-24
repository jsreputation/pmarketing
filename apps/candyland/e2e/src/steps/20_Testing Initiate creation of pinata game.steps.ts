import { Given, Then, When } from 'cucumber';
import { expect } from 'chai';
import { browser, element, by , protractor } from 'protractor';
import { EngagementAppPage, CreateHitThePinataAppPage } from '../pages/candylandApp.po';

let PageEngagement: EngagementAppPage;
let PageHitThePinata: CreateHitThePinataAppPage;

// Ensure that hit the pinata engagement type option is present.
Given(/^1_I am on engagement page$/, async () => {
  PageEngagement = new EngagementAppPage();
  await PageEngagement.navigateToEngagement();
  await browser.sleep(3000);
  // await browser.executeScript('WalkMeAPI.stopFlow()');
});

Given(/^1_I click on the create new button$/, async () => {
  const ec = protractor.ExpectedConditions;
  // waiting for the create new button to load
  await browser.wait(ec.elementToBeClickable(element(by.css('cl-button'))), 6000);
  // clicking on the create new button
  await element(by.css('cl-button')).click();
});

When(/^1_I Click on the game option.$/, async () => {
  const ec = protractor.ExpectedConditions;
  // waiting for the game option to load
  await browser.wait(ec.elementToBeClickable(element.all(by.css('cl-type-item')).get(1)), 6000);
  // clicking on the game option
  await element.all(by.css('cl-type-item')).get(1).click();
});

Then(/^1_The hit the pinata game should be present.$/, async () => {
  const ec = protractor.ExpectedConditions;
  // waiting for the game engagement options to load
  await browser.wait(ec.elementToBeClickable(element.all(by.css('cl-game')).get(1)), 6000);
  // doing an assertion on the presence of the element and the text of the option
  expect(await element.all(by.css('cl-game')).get(1).isDisplayed()).to.equal(true);
  expect(await element.all(by.css('cl-game')).get(1).getText()).to.contain('Hit the pinata');
});

// Ensure that selecting the hit the pinata option and clicking next navigates to template creation.

Given(/^2_I am on engagement page$/, async () => {
  PageEngagement = new EngagementAppPage();
  await PageEngagement.navigateToEngagement();
  await browser.sleep(3000);
  await browser.executeScript('WalkMeAPI.stopFlow()');
  await browser.executeScript('document.getElementById("walkme-player").remove()');
});

Given(/^2_I click on the create new button$/, async () => {
  const ec = protractor.ExpectedConditions;
  // waiting for the create new button to load
  await browser.wait(ec.elementToBeClickable(element(by.css('cl-button'))), 6000);
  // clicking on the create new button
  await element(by.css('cl-button')).click();
});

Given(/^2_I Click on the game option.$/, async () => {
  const ec = protractor.ExpectedConditions;
  // waiting for the game option to load
  await browser.wait(ec.elementToBeClickable(element.all(by.css('cl-type-item')).get(1)), 6000);
  // clicking on the game option
  await element.all(by.css('cl-type-item')).get(1).click();
});

Given(/^2_I click on hit the pinata option$/, async () => {
  const ec = protractor.ExpectedConditions;
  // waiting for the game engagement options to load
  await browser.wait(ec.elementToBeClickable(element.all(by.css('cl-game')).get(1)), 6000);
  // clicking on the hit the pinata option
  await element.all(by.css('cl-game')).get(1).click();
});

When(/^2_I click next$/, async () => {
  await element.all(by.css('cl-button')).get(2).click();
  await browser.sleep(3000);
});

Then(/^2_I should be navigated to the hit the pinata page.$/, async () => {
  expect(await browser.getCurrentUrl()).to.contain('new-pinata');
});

// Ensure that hit the pinata page have relevant elements

Given(/^3_I am on the hit the pinata creation page.$/, async () => {
  PageHitThePinata = new CreateHitThePinataAppPage();
  await PageHitThePinata.navigateToHitThePinata();
  await browser.sleep(3000);
  await browser.executeScript('WalkMeAPI.stopFlow()');
});

Then(/^3_I should see the relevant elements for hit the pinata creation page.$/, async () => {
  const ec = protractor.ExpectedConditions;
  // waiting for the relevant text fields to load
  // waiting for header field to load
  await browser.wait(ec.presenceOf(element.all(by.css('input[type=text]')).get(0)), 6000);
  // waiting for headline field to load
  await browser.wait(ec.presenceOf(element.all(by.css('input[type=text]')).get(1)), 6000);
  // waiting for sub-headline field to load
  await browser.wait(ec.presenceOf(element.all(by.css('input[type=text]')).get(2)), 6000);
  // waiting for button text to load
  await browser.wait(ec.presenceOf(element.all(by.css('input[type=text]')).get(3)), 6000);
  // doing an assertion on the elements present
  // header field
  expect(await element.all(by.css('input[type=text]')).get(0).isDisplayed()).to.equal(true);
  // headline field
  expect(await element.all(by.css('input[type=text]')).get(1).isDisplayed()).to.equal(true);
  // sub-headline field
  expect(await element.all(by.css('input[type=text]')).get(2).isDisplayed()).to.equal(true);
  // button text field
  expect(await element.all(by.css('input[type=text]')).get(3).isDisplayed()).to.equal(true);
});
