import { Given, Then, When } from 'cucumber';
import { expect } from 'chai';
import { browser, protractor } from 'protractor';
import { EngagementAppPage, ElementApp, CreateInstantRewardAppPage } from '../pages/candylandApp.po';
let EngagementApp: EngagementAppPage;
const Element = ElementApp;
// Ensure that instant reward engagement type option is present.

Then(/^1_The instant reward option should be present.$/, async () => {
  const ec = protractor.ExpectedConditions;
  await browser.sleep(3000);
  // waiting for the instant reward button to load
  await browser.wait(ec.elementToBeClickable(CreateInstantRewardAppPage.instantRewardBtn()), 6000);
  // doing an assertion on the presence of the button
  expect(await CreateInstantRewardAppPage.instantRewardBtn().isDisplayed()).to.equal(true);
});

// Ensure that selecting the instant reward option and clicking next navigates to instant reward template creation.
Given(/^2_I click on the instant reward option$/, async () => {
  EngagementApp = new EngagementAppPage();
  const ec = protractor.ExpectedConditions;
  await EngagementApp.navigateToEngagement();
  // waiting for the create new button to load
  await browser.wait(ec.elementToBeClickable(Element.clButton()), 6000);
  // clicking on the create new button
  await Element.clButton().click();
  // waiting for the instant reward button to load
  await browser.wait(ec.presenceOf(CreateInstantRewardAppPage.instantRewardBtn()), 6000);
  // clicking on the instant reward option
  await CreateInstantRewardAppPage.instantRewardBtn().click();
});

When(/^2_I click next button on the engagement dialog.$/, async () => {
  const ec = protractor.ExpectedConditions;
  // waiting for the next button to load
  await browser.wait(ec.elementToBeClickable(Element.clButtonArray().get(2)), 6000);
  // clicking on the next button
  await Element.clButtonArray().get(2).click();
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
  await browser.wait(ec.presenceOf(Element.inputTextArray().get(0)), 6000);
  // headline field
  await browser.wait(ec.presenceOf(Element.inputTextArray().get(1)), 6000);
  // sub-headline field
  await browser.wait(ec.presenceOf(Element.inputTextArray().get(2)), 6000);
  // button text field
  await browser.wait(ec.presenceOf(Element.inputTextArray().get(3)), 6000);
  // asserting the presence of the element
  // header field
  expect(await Element.inputTextArray().get(0).isDisplayed()).to.equal(true);
  // headline field
  expect(await Element.inputTextArray().get(1).isDisplayed()).to.equal(true);
  // sub-headline field
  expect(await Element.inputTextArray().get(2).isDisplayed()).to.equal(true);
  // button text field
  expect(await Element.inputTextArray().get(3).isDisplayed()).to.equal(true);
});
