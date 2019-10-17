import { Before, Given, Then, When } from 'cucumber';
import { expect } from 'chai';
import { browser, element, by , protractor } from 'protractor';
import { CampaignAppPage } from '../pages/candylandApp.po';

let  CampaignPage: CampaignAppPage;

Before( () => {
  // initializing page objects instance
  CampaignPage = new CampaignAppPage();
});

// Ensure that campaign tab is present
Then(/^1_The campaign tab should be present.$/, async () => {
  const ec = protractor.ExpectedConditions;
  // waiting for campaign tab to load
  await browser.wait(ec.elementToBeClickable(element.all(by.css('h3')).get(3)), 5000);
  expect(await element.all(by.css('h3')).get(3).getText()).to.be.equal('Campaigns');
});

// Ensure that clicking on the campaign tab leads to the campaign page
When(/^2_I click on the campaign tab$/, async () => {
  // waiting for campaign tab to load
  const ec = protractor.ExpectedConditions;
  await browser.wait(ec.elementToBeClickable(element.all(by.css('h3')).get(3)), 5000);
  // clicking on the campaign tab
  await element.all(by.css('h3')).get(3).click();
  browser.sleep(3000);
  // disabling walkme script
  await browser.executeScript('WalkMeAPI.stopFlow()');
  await browser.sleep(3000);
});

Then(/^2_I should be navigated to the campaign page.$/, async () => {
  const ec = protractor.ExpectedConditions;
  await browser.wait(ec.urlContains('campaigns'), 6000);
});

// Ensure that campaign page have relevant element
Given(/^3_I am on the campaign page$/, async () => {
  await CampaignPage.navigateToCampaign();
  // walk around for the walk me button
  // const ec = protractor.ExpectedConditions;
  // await browser.wait(ec.elementToBeClickable(element(by.className('walkme-custom-balloon-button-text'))), 8000);
  // clicking on the walkme button
  // await element(by.className('walkme-custom-balloon-button-text')).click();
  // await browser.sleep(3000);
  // await browser.executeScript('document.getElementById("walkme-main").remove()');
  // await browser.sleep(3000);
});

Then(/^3_I should see the relevant elements.$/, async () => {
  const ec = protractor.ExpectedConditions;
  // waiting for search bar to load
  await browser.wait(ec.presenceOf(element.all(by.css('input')).get(0)), 6000);
  // waiting for start date filter to load
  await browser.wait(ec.presenceOf(element.all(by.css('input')).get(1)), 6000);
  // waiting for end date filter to load
  await browser.wait(ec.presenceOf(element.all(by.css('input')).get(2)), 6000);
  // doing the assertions for the elements present
  expect(await element.all(by.css('input')).get(0).isPresent()).to.equal(true);
  expect(await element.all(by.css('input')).get(1).isPresent()).to.equal(true);
  expect(await element.all(by.css('input')).get(2).isPresent()).to.equal(true);
});

// Ensure that create new campaign button is functional
Given(/^4_I am on the campaign page$/, async () => {
  await CampaignPage.navigateToCampaign();
  await browser.executeScript('WalkMeAPI.stopFlow()');
  await browser.sleep(3000);
});

Then(/^4_I should be on the create new campaign page.$/, async () => {
  const ec = protractor.ExpectedConditions;
  await browser.wait(ec.urlContains('new-campaign'), 6000);
});
