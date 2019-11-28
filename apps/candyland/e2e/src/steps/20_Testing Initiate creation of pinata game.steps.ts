import { Given, Then, When } from 'cucumber';
import { expect } from 'chai';
import { browser, protractor } from 'protractor';
import { EngagementAppPage, CreateHitThePinataAppPage, ElementApp } from '../pages/candylandApp.po';

let PageEngagement: EngagementAppPage;
let PageHitThePinata: CreateHitThePinataAppPage;
const Element = ElementApp;

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
  await browser.wait(ec.elementToBeClickable(Element.clButton()), 6000);
  // clicking on the create new button
  await Element.clButton().click();
});

When(/^1_I Click on the game option.$/, async () => {
  const ec = protractor.ExpectedConditions;
  // waiting for the game option to load
  await browser.wait(ec.elementToBeClickable(PageEngagement.engagementTypeOptions().get(1)), 6000);
  // clicking on the game option
  await PageEngagement.engagementTypeOptions().get(1).click();
});

Then(/^1_The hit the pinata game should be present.$/, async () => {
  const ec = protractor.ExpectedConditions;
  // waiting for the game engagement options to load
  await browser.wait(ec.elementToBeClickable(PageEngagement.gamePinataOptions()), 6000);
  // doing an assertion on the presence of the element and the text of the option
  expect(await PageEngagement.gamePinataOptions().isDisplayed()).to.equal(true);
  expect(await PageEngagement.gamePinataOptions().getText()).to.contain('Hit the pinata');
});

// Ensure that selecting the hit the pinata option and clicking next navigates to template creation.

Given(/^2_I am on engagement page$/, async () => {
  PageEngagement = new EngagementAppPage();
  await PageEngagement.navigateToEngagement();
  await browser.sleep(3000);
  // await browser.executeScript('WalkMeAPI.stopFlow()');
  // await browser.executeScript('document.getElementById("walkme-player").remove()');
});

Given(/^2_I click on the create new button$/, async () => {
  const ec = protractor.ExpectedConditions;
  // waiting for the create new button to load
  await browser.wait(ec.elementToBeClickable(Element.clButton()), 6000);
  // clicking on the create new button
  await Element.clButton().click();
});

Given(/^2_I Click on the game option.$/, async () => {
  const ec = protractor.ExpectedConditions;
  // waiting for the game option to load
  await browser.wait(ec.elementToBeClickable(PageEngagement.engagementTypeOptions().get(1)), 6000);
  // clicking on the game option
  await PageEngagement.engagementTypeOptions().get(1).click();
});

Given(/^2_I click on hit the pinata option$/, async () => {
  const ec = protractor.ExpectedConditions;
  // waiting for the game engagement options to load
  await browser.wait(ec.elementToBeClickable(PageEngagement.gamePinataOptions()), 6000);
  // clicking on the hit the pinata option
  await PageEngagement.gamePinataOptions().click();
});

When(/^2_I click next$/, async () => {
  await Element.matFlatButtonArray().click();
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
  await browser.wait(ec.presenceOf(Element.inputTextArray().get(0)), 6000);
  // waiting for headline field to load
  await browser.wait(ec.presenceOf(Element.inputTextArray().get(1)), 6000);
  // waiting for sub-headline field to load
  await browser.wait(ec.presenceOf(Element.inputTextArray().get(2)), 6000);
  // waiting for button text to load
  await browser.wait(ec.presenceOf(Element.inputTextArray().get(3)), 6000);
  // doing an assertion on the elements present
  // header field
  expect(await Element.inputTextArray().get(0).isDisplayed()).to.equal(true);
  // headline field
  expect(await Element.inputTextArray().get(1).isDisplayed()).to.equal(true);
  // sub-headline field
  expect(await Element.inputTextArray().get(2).isDisplayed()).to.equal(true);
  // button text field
  expect(await Element.inputTextArray().get(3).isDisplayed()).to.equal(true);
});
