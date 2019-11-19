import {
  Given,
  Then,
  When,
} from 'cucumber';
import {
  browser,
  protractor,
} from 'protractor';
import { expect } from 'chai';

import {
  AudienceAppPage,
  ElementApp,
} from '../pages/candylandApp.po';

// Verifying successful creation of user
Given(/^9_I am on the audience page.$/, async () => {
  await AudienceAppPage.navigateToAudience();
  await browser.sleep(3000);
  await browser.executeScript('WalkMeAPI.stopFlow()');
  // removing walkme widget
  await browser.executeScript('document.getElementById("walkme-player").remove()');
  // await browser.waitForAngularEnabled(false);
});

Given(/^9_I click on the add user button$/, async () => {
  const ec = protractor.ExpectedConditions;
  // wait for add user button to load
  await browser.wait(ec.presenceOf(ElementApp.clButton()), 6000);
  // clicking on the add user button
  await ElementApp.clButton().click();
});

Given(/^9_I enter a value for first name ,last name ,email address and mobile number$/, async () => {
  // waiting for the required fields to load
  const ec = protractor.ExpectedConditions;
  // first name field
  await browser.wait(ec.presenceOf(ElementApp.inputTextArray().get(1)), 8000);
  // last name field
  await browser.wait(ec.presenceOf(ElementApp.inputTextArray().get(2)), 8000);
  // email address field
  await browser.wait(ec.presenceOf(ElementApp.inputEmail()), 8000);
  // mobile number field
  await browser.wait(ec.presenceOf(ElementApp.inputTel()), 8000);
  // entering test string in first name field
  await ElementApp.inputTextArray().get(1).sendKeys('testname01');
  await ElementApp.inputTextArray().get(2).sendKeys('testlastname01');
  await ElementApp.inputEmail().sendKeys('abc@xyz.com');
  await ElementApp.inputTel().sendKeys('11111111');
});

Given(/^9_I enter a value for race and nationality ,city and state$/, async () => {
  const ec = protractor.ExpectedConditions;
  // waiting for the fields to load
  // Race
  await browser.wait(ec.presenceOf(ElementApp.inputTextArray().get(3)), 8000);
  // Nationality
  await browser.wait(ec.presenceOf(ElementApp.inputTextArray().get(4)), 8000);
  // city
  await browser.wait(ec.presenceOf(ElementApp.inputTextArray().get(5)), 8000);
  // State
  await browser.wait(ec.presenceOf(ElementApp.inputTextArray().get(6)), 8000);
  // inputing test values in the fields
  await ElementApp.inputTextArray().get(3).sendKeys('Test');
  await ElementApp.inputTextArray().get(4).sendKeys('Test');
  await ElementApp.inputTextArray().get(5).sendKeys('Test');
  await ElementApp.inputTextArray().get(6).sendKeys('Test');
});

Given(/^9_I select a country and a user category$/, async () => {
  const ec = protractor.ExpectedConditions;
  // clicking on the country
  await ElementApp.matSelectCountry().click();
  // selecting the first option
  await ElementApp.spanMatOptionText().first().click();
  // waiting for the add audience list form to be loaded
  await browser.wait(ec.elementToBeClickable(AudienceAppPage.audienceList()), 6000);
  // cicking on the add audience list field
  await AudienceAppPage.audienceList().click();
  // selecting the developers option
  await browser.switchTo().activeElement();
  await ElementApp.matPseudoCheckbox().get(0).click();
  await browser.actions().sendKeys(protractor.Key.ESCAPE).perform();
  await browser.sleep(5000);
});

When(/^9_I click on the add button$/, async () => {
  const ec = protractor.ExpectedConditions;
  // waiting for the add button to be clickable
  await browser.wait(ec.elementToBeClickable(ElementApp.clButtonArray().get(2)), 6000);
  // clicking the add button
  await ElementApp.clButtonArray().get(2).click();
});

Then(/^9_I should see the user created.$/, async () => {
  const ec = protractor.ExpectedConditions;
  // waiting for the search bar to load
  await browser.wait(ec.presenceOf(ElementApp.inputText().get(0)), 6000);
  // filtering the search results on the search bar
  await ElementApp.inputText().get(0).sendKeys('testname01');
  // waiting for the first row to be loaded
  await browser.wait(ec.presenceOf(ElementApp.matRowInserted().get(0)), 6000);
  expect(await AudienceAppPage.audienceSpan().getText()).to.contain('testname01');
});

// Verifying the functionality of manage list feature
Given(/^10_I am on the audience page.$/, async () => {
  await AudienceAppPage.navigateToAudience();
  await browser.sleep(3000);
});

Given(/^10_I select a user$/, async () => {
  const ec = protractor.ExpectedConditions;
  // waiting for the first row to be loaded
  await browser.wait(ec.presenceOf(ElementApp.matRowInserted().get(0)), 6000);
  // clicking on the first row button
  await ElementApp.matIconButton().get(0).click();
  await browser.sleep(3000);
});

Given(/^10_I click on the manage list option$/, async () => {
  // clicking on the manage list option
  const ec = protractor.ExpectedConditions;
  await browser.wait(ec.elementToBeClickable(ElementApp.menuItemButton()), 6000);
  // await browser.switchTo().activeElement();
  await ElementApp.menuItemButton().click();
});

When(/^10_I select an option for the audience list$/, async () => {
  const devCheckBoxClass: string = await ElementApp.matCheckboxArray().get(0).getAttribute('class');
  const regex = /mat-checkbox-checked/;
  const ec = protractor.ExpectedConditions;
  // waiting for the checkbox to load
  await browser.wait(ec.elementToBeClickable(ElementApp.matCheckboxArray().get(0)), 6000);
  // creating a check on the button check box status
  // if the checkbox is ticked, do nothing else click on the check box
  if (devCheckBoxClass.search(regex) !== -1 ) {
    await browser.sleep(3000);
  } else {
    await browser.sleep(3000);
    await browser.wait(ec.elementToBeClickable(AudienceAppPage.audienceCheckboxContainer().get(0)), 6000);
    await AudienceAppPage.audienceCheckboxContainer().get(0).click();
    await browser.sleep(3000);
  }
  // clicking on the save button
  await ElementApp.clButtonArray().get(2).click();
  await browser.sleep(3000);
});

Then(/^10_I should see the change reflected for the user selected.$/, async () => {
  const ec = protractor.ExpectedConditions;
  // waiting for the row to load
  await browser.wait(ec.presenceOf(AudienceAppPage.audienceColumnList().first()), 6000);
  // doing an assertion based on the audience list type
  expect(await AudienceAppPage.audienceColumnList().first().getText()).to.contain('Developers');
});
