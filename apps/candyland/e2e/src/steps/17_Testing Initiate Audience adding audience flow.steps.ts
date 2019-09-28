import { Given, Then, When } from 'cucumber';
import { expect } from 'chai';
import { browser, element, by , protractor } from 'protractor';
import { AudienceAppPage } from '../pages/candylandApp.po';
let AudienceApp: AudienceAppPage;

// Ensure that audience tab is present
Then(/^1_The audience tab should be present.$/, async () => {
 // waiting for the audience tab to load
 const ec = protractor.ExpectedConditions;
 await browser.wait(ec.presenceOf(element.all(by.css('h3')).get(5)), 6000);
 expect(await element.all(by.css('h3')).get(5).isPresent()).to.equal(true);
});

// Ensure that clicking on the audience tab leads to the audience page
When(/^2_I click on the audience tab$/, async () => {
  const ec = protractor.ExpectedConditions;
  // waiting for audience tab to load
  await browser.wait(ec.presenceOf(element.all(by.css('h3')).get(5)), 6000);
  // clicking on the audience tab
  await element.all(by.css('h3')).get(5).click();
  await browser.sleep(3000);

});

Then(/^2_I should be navigated to the audience page.$/, async () => {
  expect(await browser.getCurrentUrl()).to.contain('audience');
});

// Ensure that audience page have relevant elements
Given(/^3_I am on the audience page$/, async () => {
  AudienceApp = new AudienceAppPage();
  await AudienceApp.navigateToAudience();
});

Then(/^3_I should see the relevant elements for audience page.$/, async () => {
   // waiting for the search bar and the add user button to load
   const ec = protractor.ExpectedConditions;
   // wait for the search bar to load
   await browser.wait(ec.presenceOf(element(by.css('input[type=text]'))), 6000);
   // wait for add user button to load
   await browser.wait(ec.presenceOf(element(by.css('cl-button'))), 6000);
   // doing an assertion on the presence of the elements
   // search bar
   expect(await element(by.css('input[type=text]')).isDisplayed()).to.equal(true);
   // add user button
   expect(await element(by.css('cl-button')).isDisplayed()).to.equal(true);
});
