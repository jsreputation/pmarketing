import {
  Given,
  When,
  Then,
} from 'cucumber';
import {
  browser,
  ProtractorExpectedConditions,
  protractor,
} from 'protractor';
import { expect } from 'chai';

import {
  BlackcombHomeAppPage,
  CreateCampaignAppPage,
  EngagementAppPage,
  ElementApp,
} from '../pages/candylandApp.po';

// setDefaultTimeout(60 * 1000);
const ec: ProtractorExpectedConditions = protractor.ExpectedConditions;

// Ensuring home page has the relevant elements
Given(/^9_I am at the blackcomb home page$/, async () => {
  await CreateCampaignAppPage.navigateToCreateCampaign();
  // await browser.executeScript('WalkMeAPI.stopFlow()');
  // waiting for the search bar to load
  await browser.wait(ec.elementToBeClickable(ElementApp.inputTextArray().get(1)), 5000);
  // entering search criteria for survey in search bar
  await ElementApp.inputTextArray().get(1).sendKeys('Survey 1');
  // selecting first element
  await browser.wait(ec.elementToBeClickable(EngagementAppPage.engagementItemArray().first()), 5000);
  // asserting the presence of the card and title of the card
  await EngagementAppPage.engagementItemArray().first().click();
  // clicking on the next button on select engagement page
  await ElementApp.clButtonArray().get(1).click();
  // clicking on the next button on the rewards and limits page
  await ElementApp.clButtonArray().get(1).click();
  // clicking the next button on the campaign details package
  await browser.wait(ec.elementToBeClickable(ElementApp.clButtonArray().get(1)), 5000);
  await ElementApp.clButtonArray().get(1).click();
  // clicking on the launch button
  await browser.wait(ec.elementToBeClickable(ElementApp.clButtonArray().get(1)), 5000);
  await ElementApp.clButtonArray().get(1).click();
  await browser.wait(ec.presenceOf(ElementApp.inputTextArray().get(2)), 5000);
  const urlString = await ElementApp.inputTextArray().get(2).getAttribute('value');
  await browser.get(urlString);
  await browser.sleep(3000);
  await BlackcombHomeAppPage.navigateToBlackcombHomeApp();

});

Then(/^9_I see the welcome message ,relevant headers, qr button and category tabs.$/, async () => {
  // waiting for the welcome message to load
  await browser.wait(ec.presenceOf(ElementApp.divWelcomeText()), 6000);
  // waiting for the headers to load
  // game header
  await browser.wait(ec.presenceOf(ElementApp.divTitle().get(0)), 6000);
  // featured rewards header
  await browser.wait(ec.presenceOf(ElementApp.divTitle().get(1)), 6000);
  // waiting for qr button to load
  await browser.wait(ec.presenceOf(ElementApp.matButtonRipple()), 6000);
  // waiting for category tab to load
  await browser.wait(ec.presenceOf(ElementApp.matTabList()), 6000);
  // doing an assertion on the presence of the element
  expect(await ElementApp.divWelcomeText().isDisplayed()).to.equal(true);
  expect(await ElementApp.divTitle().get(0).isDisplayed()).to.equal(true);
  expect(await ElementApp.divTitle().get(1).isDisplayed()).to.equal(true);
  expect(await ElementApp.matButtonRipple().isDisplayed()).to.equal(true);
  expect(await ElementApp.matTabList().isDisplayed()).to.equal(true);
});

// Ensuring functionality of qr button.
Given(/^10_I am at the blackcomb home page$/, async () => {
  await BlackcombHomeAppPage.navigateToBlackcombHomeApp();
});

When(/^10_I click on the qr button$/, async () => {
  // waiting for qr button to load
  await browser.wait(ec.presenceOf(ElementApp.matButtonRipple()), 6000);
  // clicking on the qr button
  await ElementApp.spanMatButtonWrapper().click();
  await browser.sleep(1000);
});

Then(/^10_I should be navigated to the qr card page.$/, async () => {
  expect(await browser.getCurrentUrl()).to.contain('qr');
});

// Ensuring qr page has the relevant elements.
Given(/^11_I am at the blackcomb qr page.$/, async () => {
  await BlackcombHomeAppPage.navigateToBlackcombHomeApp();
  // waiting for qr button to load
  await browser.wait(ec.presenceOf(ElementApp.matButtonRipple()), 6000);
  // clicking on the qr button
  await ElementApp.spanMatButtonWrapper().click();
  await browser.sleep(1000);
});

When(/^11_I do nothing$/, () => {});

Then(/^11_I should see the qr code and the message text below the qr code.$/, async () => {
  // waiting for the qr code to load
  await browser.wait(ec.presenceOf(ElementApp.imgArray().get(1)), 6000);
  // waiting for the qr text field to load
  await browser.wait(ec.presenceOf(ElementApp.h4()), 5000);
  // doing an assertion on the presence of the elements
  expect(await ElementApp.imgArray().get(1).isDisplayed()).to.equal(true);
  expect(await ElementApp.h4().isDisplayed()).to.equal(true);
  expect(await ElementApp.h4().getText()).to.contain('QR');
});

// Ensuring functionality of cancel button for the qr code page
Given(/^12_I am at the blackcomb qr page.$/, async () => {
  await BlackcombHomeAppPage.navigateToBlackcombHomeApp();
  // waiting for qr button to load
  await browser.wait(ec.presenceOf(ElementApp.matButtonRipple()), 6000);
  // clicking on the qr button
  await ElementApp.spanMatButtonWrapper().click();
  await browser.sleep(1000);
});

When(/^12_I click on the cancel button$/, async () => {
  // waiting for the cancel button to load
  await browser.wait(ec.elementToBeClickable(ElementApp.button()), 6000);
  // clicking on the cancel button
  await ElementApp.button().click();
  await browser.sleep(1000);
});

Then(/^12_I should be navigated to blackcomb home page.$/, async () => {
  // doing an assertion on the url of the page
  expect(await browser.getCurrentUrl()).to.contain('home');
});

// Ensuring functionality of rewards filter
Given(/^13_I am at the blackcomb home page$/, async () => {
  await BlackcombHomeAppPage.navigateToBlackcombHomeApp();
});

When(/^13_I click on a category$/, async () => {
  // waiting for the category filter to load
  await browser.wait(ec.presenceOf(ElementApp.matTabList()), 5000);
  // clicking on the f&b tab
  await ElementApp.matTabLabelContent().get(1).click();
});

Then(/^13_I should see the relevant rewards under the category.$/, async () => {
  // waiting for the card to load
  await browser.wait(ec.presenceOf(ElementApp.h1()), 6000);
  // assertion on the presence of the card and the text value of the card
  expect(await ElementApp.h1().isDisplayed()).to.equal(true);
  expect(await ElementApp.h1().getText()).to.contain('e-enable sticky architectures');
});

// Ensuring functionality of featured rewards card
Given(/^14_I am at the blackcomb home page$/, async () => {
  await BlackcombHomeAppPage.navigateToBlackcombHomeApp();
});

When(/^14_I click on a featured reward$/, async () => {
  // waiting for featured reward to load
  await browser.wait(ec.presenceOf(ElementApp.matCardArray().get(2)), 6000);
  // clicking on the featured reward
  await ElementApp.matCardArray().get(2).click();
  await browser.sleep(1000);
});

Then(/^14_I should be navigated to the reward description page$/, async () => {
  expect(await browser.getCurrentUrl()).to.contain('reward-detail');
});

// Ensuring functionality of rewards card
Given(/^15_I am at the blackcomb home page$/, async () => {
  await BlackcombHomeAppPage.navigateToBlackcombHomeApp();
});

When(/^15_I click on a reward under the all category$/, async () => {
  // waiting for featured reward to load
  await browser.wait(ec.presenceOf(ElementApp.matCardArray().get(3)), 6000);
  // clicking on the featured reward
  await ElementApp.matCardArray().get(3).click();
  await browser.sleep(1000);
});

Then(/^15_I should be navigated to the reward description page$/, async () => {
  expect(await browser.getCurrentUrl()).to.contain('reward-detail');
});
