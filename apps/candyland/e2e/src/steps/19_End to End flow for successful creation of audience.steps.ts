import { Before, Given, Then, When } from 'cucumber';
import { expect } from 'chai';
import { browser, element, by , protractor } from 'protractor';
import { AudienceAppPage } from '../pages/candylandApp.po';
let AudienceApp: AudienceAppPage;

Before( () => {
  // initializing page objects instances
  AudienceApp = new AudienceAppPage();
});

// Verifying successful creation of user
Given(/^9_I am on the audience page.$/, async () => {
  await AudienceApp.navigateToAudience();
  await browser.sleep(3000);
  await browser.executeScript('WalkMeAPI.stopFlow()');
  // removing walkme widget
  await browser.executeScript('document.getElementById("walkme-player").remove()');
  // await browser.waitForAngularEnabled(false);
});

Given(/^9_I click on the add user button$/, async () => {
  const ec = protractor.ExpectedConditions;
  // wait for add user button to load
  await browser.wait(ec.presenceOf(element(by.css('cl-button'))), 6000);
  // clicking on the add user button
  await element(by.css('cl-button')).click();
});

Given(/^9_I enter a value for first name ,last name ,email address and mobile number$/, async () => {
  // waiting for the required fields to load
  const ec = protractor.ExpectedConditions;
  // first name field
  await browser.wait(ec.presenceOf(element.all(by.css('input[type=text]')).get(1)), 8000);
  // last name field
  await browser.wait(ec.presenceOf(element.all(by.css('input[type=text]')).get(2)), 8000);
  // email address field
  await browser.wait(ec.presenceOf(element(by.css('input[type=email]'))), 8000);
  // mobile number field
  await browser.wait(ec.presenceOf(element(by.css('input[type=tel]'))), 8000);
  // entering test string in first name field
  await element.all(by.css('input[type=text]')).get(1).sendKeys('testname01');
  await element.all(by.css('input[type=text]')).get(2).sendKeys('testlastname01');
  await element(by.css('input[type=email]')).sendKeys('abc@xyz.com');
  await element(by.css('input[type=tel]')).sendKeys('11111111');
});

Given(/^9_I enter a value for race and nationality ,city and state$/, async () => {
  const ec = protractor.ExpectedConditions;
  // waiting for the fields to load
  // Race
  await browser.wait(ec.presenceOf(element.all(by.css('input[type=text]')).get(3)), 8000);
  // Nationality
  await browser.wait(ec.presenceOf(element.all(by.css('input[type=text]')).get(4)), 8000);
  // city
  await browser.wait(ec.presenceOf(element.all(by.css('input[type=text]')).get(5)), 8000);
  // State
  await browser.wait(ec.presenceOf(element.all(by.css('input[type=text]')).get(6)), 8000);
  // inputing test values in the fields
  await element.all(by.css('input[type=text]')).get(3).sendKeys('Test');
  await element.all(by.css('input[type=text]')).get(4).sendKeys('Test');
  await element.all(by.css('input[type=text]')).get(5).sendKeys('Test');
  await element.all(by.css('input[type=text]')).get(6).sendKeys('Test');
});

Given(/^9_I select a country and a user category$/, async () => {
  const ec = protractor.ExpectedConditions;
  // clicking on the country
  await element(by.css('mat-select[formcontrolname=country]')).click();
  // selecting the first option
  await element.all(by.css('span.mat-option-text')).first().click();
  // waiting for the add audience list form to be loaded
  await browser.wait(ec.elementToBeClickable(element(by.css('mat-select[formcontrolname=audienceList]'))), 6000);
  // cicking on the add audience list field
  await element(by.css('mat-select[formcontrolname=audienceList]')).click();
  // selecting the developers option
  await browser.switchTo().activeElement();
  await element.all(by.css('mat-pseudo-checkbox')).get(0).click();
  await browser.actions().sendKeys(protractor.Key.ESCAPE).perform();
  await browser.sleep(5000);
});

When(/^9_I click on the add button$/, async () => {
  const ec = protractor.ExpectedConditions;
  // waiting for the add button to be clickable
  await browser.wait(ec.elementToBeClickable(element.all(by.css('cl-button')).get(2)), 6000);
  // clicking the add button
  await element.all(by.css('cl-button')).get(2).click();
});

Then(/^9_I should see the user created.$/, async () => {
  const ec = protractor.ExpectedConditions;
  // waiting for the search bar to load
  await browser.wait(ec.presenceOf(element.all(by.css('input[type=text]')).get(0)), 6000);
  // filtering the search results on the search bar
  await element.all(by.css('input[type=text]')).get(0).sendKeys('testname01');
  // waiting for the first row to be loaded
  await browser.wait(ec.presenceOf(element.all(by.css('tr.mat-row.ng-star-inserted')).get(0)), 6000);
  expect(await element(by.xpath('(//*[@href="/audience/1"][1]/span)[2]')).getText()).to.contain('testname01');
});

// Verifying the functionality of manage list feature
Given(/^10_I am on the audience page.$/, async () => {
  await AudienceApp.navigateToAudience();
  await browser.sleep(3000);
});

Given(/^10_I select a user$/, async () => {
  const ec = protractor.ExpectedConditions;
  // waiting for the first row to be loaded
  await browser.wait(ec.presenceOf(element.all(by.css('tr.mat-row.ng-star-inserted')).get(0)), 6000);
  // clicking on the first row button
  await element.all(by.css('button.mat-icon-button')).get(0).click();
  await browser.sleep(3000);
});

Given(/^10_I click on the manage list option$/, async () => {
  // clicking on the manage list option
  const ec = protractor.ExpectedConditions;
  await browser.wait(ec.elementToBeClickable(element(by.css('button[role=menuitem]'))), 6000);
  // await browser.switchTo().activeElement();
  await element(by.css('button[role=menuitem]')).click();
});

When(/^10_I select an option for the audience list$/, async () => {
  const devCheckBoxClass: string = await element.all(by.css('mat-checkbox')).get(0).getAttribute('class');
  const regex = /mat-checkbox-checked/;
  const ec = protractor.ExpectedConditions;
  // waiting for the checkbox to load
  await browser.wait(ec.elementToBeClickable(element.all(by.css('mat-checkbox')).get(0)), 6000);
  // creating a check on the button check box status
  // if the checkbox is ticked, do nothing else click on the check box
  if (devCheckBoxClass.search(regex) !== -1 ) {
    await browser.sleep(3000);
  } else {
  await browser.sleep(3000);
  await browser.wait(ec.elementToBeClickable(element.all(by.css('div.mat-checkbox-inner-container')).get(0)), 6000);
  await element.all(by.css('div.mat-checkbox-inner-container')).get(0).click();
  await browser.sleep(3000);
  }
  // clicking on the save button
  await element.all(by.css('cl-button')).get(2).click();
  await browser.sleep(3000);
});

Then(/^10_I should see the change reflected for the user selected.$/, async () => {
  const ec = protractor.ExpectedConditions;
  // waiting for the row to load
  await browser.wait(ec.presenceOf(element.all(by.css('td.column-audiencelist')).first()), 6000);
  // doing an assertion based on the audience list type
  expect(await element.all(by.css('td.column-audiencelist')).first().getText()).to.contain('Developers');
});
