import {
  Given,
  Then,
  When,
} from 'cucumber';
import {
  browser,
  protractor,
  ProtractorExpectedConditions,
} from 'protractor';
import { expect } from 'chai';

import {
  CreateCampaignAppPage,
  EngagementAppPage,
  LoginAppPage,
  ElementApp,
} from '../pages/candylandApp.po';

const ec: ProtractorExpectedConditions = protractor.ExpectedConditions;

// Inputting the url link leads to the webpage
Given(/^1_I am on the launch page with the url generated$/, async () => {
  // login process
  await LoginAppPage.navigateToLogin();
  // Waiting for account id field to load
  await browser.wait(ec.elementToBeClickable(LoginAppPage.accountIDField()), 5000);
  // entering correct account id
  await LoginAppPage.accountIDField().sendKeys(LoginAppPage.getAccountId());
  // entering correct testUserAccount
  await LoginAppPage.userAccountField().sendKeys(LoginAppPage.getUserAccount());
  // entering correct pw
  await LoginAppPage.pwField().sendKeys(LoginAppPage.getPassword());
  // pressing the enter key on the accountID field to log in
  await LoginAppPage.accountIDField().sendKeys(protractor.Key.ENTER);
  await browser.sleep(3000);

  await CreateCampaignAppPage.navigateToCreateCampaign();
  // await browser.executeScript('WalkMeAPI.stopFlow()');
  // waiting for the search bar to load
  await browser.wait(ec.elementToBeClickable(ElementApp.inputTextArray().get(1)), 6000);
  // entering search criteria for survey in search bar
  await ElementApp.inputTextArray().get(1).sendKeys('Survey');
  // selecting first element
  await browser.wait(ec.elementToBeClickable(EngagementAppPage.engagementItemArray().first()), 5000);
  // asserting the presence of the card and title of the card
  await EngagementAppPage.engagementItemArray().first().click();
  // clicking on the next button on select engagement page
  await ElementApp.clButtonArray().get(1).click();
  // clicking on the next button on the rewards and limits page
  await ElementApp.clButtonArray().get(1).click();
  browser.sleep(3000);
  // clicking the next button on the campaign details package
  await browser.wait(ec.elementToBeClickable(ElementApp.clButtonArray().get(1)), 6000);
  await ElementApp.clButtonArray().get(1).click();
  // clicking on the launch button
  await browser.wait(ec.elementToBeClickable(ElementApp.clButtonArray().get(1)), 6000);
  await ElementApp.clButtonArray().get(1).click();
  await browser.sleep(3000);
});

When(/^1_Navigating to the webpage with the url generated$/, async () => {
  // getting the url on the launch engagement dialog box
  await browser.wait(ec.presenceOf(ElementApp.inputTextArray().get(2)), 6000);
  const urlString = await ElementApp.inputTextArray().get(2).getAttribute('value');
  await browser.get(urlString);
  await browser.sleep(3000);
});

Then(/^1_I should get a http 200 response$/, async () =>  {
  // doing an assertion on  the current url
  expect(await browser.getCurrentUrl()).to.contain('whistler');
});

// Doing on the assertions on the url link generated
Given(/^2_I am on the launch page with the url generated$/, async () => {
  await CreateCampaignAppPage.navigateToCreateCampaign();
  // await browser.executeScript('WalkMeAPI.stopFlow()');
  // waiting for the search bar to load
  await browser.wait(ec.elementToBeClickable(ElementApp.inputTextArray().get(1)), 6000);
  // entering search criteria for survey in search bar
  await ElementApp.inputTextArray().get(1).sendKeys('Survey');
  // selecting first element
  await browser.wait(ec.elementToBeClickable(EngagementAppPage.engagementItemArray().first()), 5000);
  // asserting the presence of the card and title of the card
  await EngagementAppPage.engagementItemArray().first().click();
  // clicking on the next button on select engagement page
  await ElementApp.clButtonArray().get(1).click();
  // clicking on the next button on the rewards and limits page
  await ElementApp.clButtonArray().get(1).click();
  browser.sleep(3000);
  // clicking the next button on the campaign details package
  await browser.wait(ec.elementToBeClickable(ElementApp.clButtonArray().get(1)), 6000);
  await ElementApp.clButtonArray().get(1).click();
  // clicking on the launch button
  await browser.wait(ec.elementToBeClickable(ElementApp.clButtonArray().get(1)), 6000);
  await ElementApp.clButtonArray().get(1).click();
  await browser.sleep(3000);
});

Then(/^2_I should see the tenant id in the url link generated.$/, async () => {
  // waiting for the url link field to load
  await browser.wait(ec.presenceOf(ElementApp.inputTextArray().get(2)), 6000);
  // doing the assertion on the url link
  expect(await ElementApp.inputTextArray().get(2).getAttribute('value')).to.contain(LoginAppPage.getAccountId());

});

// Ensure that instant reward page have relevant elements
Given(/^3_I am on the blackcomb page$/, async () => {
  await CreateCampaignAppPage.navigateToCreateCampaign();
  // await browser.executeScript('WalkMeAPI.stopFlow()');
  // waiting for the search bar to load
  await browser.wait(ec.elementToBeClickable(ElementApp.inputTextArray().get(1)), 6000);
  // entering search criteria for survey in search bar
  await ElementApp.inputTextArray().get(1).sendKeys('Survey');
  // selecting first element
  await browser.wait(ec.elementToBeClickable(EngagementAppPage.engagementItemArray().first()), 5000);
  // asserting the presence of the card and title of the card
  await EngagementAppPage.engagementItemArray().first().click();
  // clicking on the next button on select engagement page
  await ElementApp.clButtonArray().get(1).click();
  // clicking on the next button on the rewards and limits page
  await ElementApp.clButtonArray().get(1).click();
  browser.sleep(3000);
  // clicking the next button on the campaign details package
  await browser.wait(ec.elementToBeClickable(ElementApp.clButtonArray().get(1)), 6000);
  await ElementApp.clButtonArray().get(1).click();
  // clicking on the launch button
  await browser.wait(ec.elementToBeClickable(ElementApp.clButtonArray().get(1)), 6000);
  await ElementApp.clButtonArray().get(1).click();
  await browser.wait(ec.presenceOf(ElementApp.inputTextArray().get(2)), 6000);
  const urlString = await ElementApp.inputTextArray().get(2).getAttribute('value');
  await browser.get(urlString);
  await browser.sleep(3000);
});

Then(/^3_I should see the relevant elements of the blackcomb$/, async () => {
  // waiting for the survey card to load
  await browser.wait(ec.presenceOf(ElementApp.matCard()), 6000);
  // doing an assertion on the presence of the card
  expect(await ElementApp.matCard().isDisplayed()).to.equal(true);
});

// Ensure that instant reward page have relevant elements
Given(/^4_I am on the blackcomb page$/, async () => {
  await CreateCampaignAppPage.navigateToCreateCampaign();
  // await browser.executeScript('WalkMeAPI.stopFlow()');
  // waiting for the search bar to load
  await browser.wait(ec.elementToBeClickable(ElementApp.inputTextArray().get(1)), 6000);
  // entering search criteria for survey in search bar
  await ElementApp.inputTextArray().get(1).sendKeys('Survey Template');
  // selecting first element
  await browser.wait(ec.elementToBeClickable(EngagementAppPage.engagementItemArray().first()), 5000);
  // asserting the presence of the card and title of the card
  await EngagementAppPage.engagementItemArray().first().click();
  // clicking on the next button on select engagement page
  await ElementApp.clButtonArray().get(1).click();
  // clicking on the next button on the rewards and limits page
  await ElementApp.clButtonArray().get(1).click();
  browser.sleep(3000);
  // clicking the next button on the campaign details package
  await browser.wait(ec.elementToBeClickable(ElementApp.clButtonArray().get(1)), 6000);
  await ElementApp.clButtonArray().get(1).click();
  // clicking on the launch button
  await browser.wait(ec.elementToBeClickable(ElementApp.clButtonArray().get(1)), 6000);
  await ElementApp.clButtonArray().get(1).click();
  await browser.wait(ec.presenceOf(ElementApp.inputTextArray().get(2)), 6000);
  const urlString = await ElementApp.inputTextArray().get(2).getAttribute('value');
  await browser.get(urlString);
  await browser.sleep(3000);
});

When(/^4_I do nothing$/, () => {});

Then(/^4_I should see the correct survey options reflected to blackcomb.$/, async () => {
  // waiting for the survey card to load
  await browser.wait(ec.presenceOf(ElementApp.matCard()), 6000);
  // doing an assertion on the number of questions in the survey
  expect(await ElementApp.divQuestion().count()).to.equal(1);
});

// Ensure that url link works on a new window
Given(/^5_I am on the campaign review page$/, async () => {
  await CreateCampaignAppPage.navigateToCreateCampaign();
  // await browser.executeScript('WalkMeAPI.stopFlow()');
  // waiting for the search bar to load
  await browser.wait(ec.elementToBeClickable(ElementApp.inputTextArray().get(1)), 6000);
  // entering search criteria for survey in search bar
  await ElementApp.inputTextArray().get(1).sendKeys('Survey Template');
  // selecting first element
  await browser.wait(ec.elementToBeClickable(EngagementAppPage.engagementItemArray().first()), 5000);
  // asserting the presence of the card and title of the card
  await EngagementAppPage.engagementItemArray().first().click();
  // clicking on the next button on select engagement page
  await ElementApp.clButtonArray().get(1).click();
  // clicking on the next button on the rewards and limits page
  await ElementApp.clButtonArray().get(1).click();
  browser.sleep(3000);
  // clicking the next button on the campaign details package
  await browser.wait(ec.elementToBeClickable(ElementApp.clButtonArray().get(1)), 6000);
  await ElementApp.clButtonArray().get(1).click();
});

When(/^5_I clear all session tokens from tbe browser$/, async () => {
  // clearing session token in local storage
  await browser.executeScript('window.localStorage.clear();');
});

Then(/^5_I access blackcomb with the url generated.$/, async () => {
  // clicking on the launch button
  await browser.wait(ec.elementToBeClickable(ElementApp.clButtonArray().get(1)), 5000);
  await ElementApp.clButtonArray().get(1).click();
  await browser.wait(ec.presenceOf(ElementApp.inputTextArray().get(2)), 6000);
  const urlString = await ElementApp.inputTextArray().get(2).getAttribute('value');
  await browser.restart();
  await browser.get(urlString);
  await browser.sleep(3000);
  // waiting for the survey card to load
  await browser.wait(ec.presenceOf(ElementApp.matCard()), 6000);
  // doing an assertion on the presence of the card
  expect(await ElementApp.matCard().isDisplayed()).to.equal(true);
});
