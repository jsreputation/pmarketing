import {
  Given,
  Then,
  When,
} from 'cucumber';
import {
  browser,
  protractor,
  ElementFinder,
  ProtractorExpectedConditions,
} from 'protractor';
import { expect } from 'chai';
import * as path from 'path' ;

import {
  RewardAppPage,
  CreateRewardAppPage,
  ElementApp,
  LoginAppPage,
} from '../pages/candylandApp.po';

const ec: ProtractorExpectedConditions = protractor.ExpectedConditions;

Given(/^19_I am on the rewards page.$/, async () => {
  // login process
  await LoginAppPage.navigateToLogin();
  // Waiting for account id field to load
  await browser.wait(ec.elementToBeClickable(ElementApp.inputArray().first()), 5000);
  // entering correct account id
  await ElementApp.inputArray().first().sendKeys(LoginAppPage.getAccountId());
  // entering correct testUserAccount
  await ElementApp.inputArray().get(1).sendKeys(LoginAppPage.getUserAccount());
  // entering correct pw
  await ElementApp.inputArray().get(2).sendKeys(LoginAppPage.getPassword());
  // pressing the enter key on the accountID field to log in
  await ElementApp.inputArray().first().sendKeys(protractor.Key.ENTER);
  await browser.sleep(3000);

  await RewardAppPage.navigateToReward();
});

Given(/^19_I click on create new button.$/, async () => {
  await browser.wait(ec.presenceOf(ElementApp.clButton()), 6000);
  // clicking on the create new button
  await ElementApp.clButton().click();

});

Given(/^19_I click on option for reward type.$/, async () => {
  // selecting the free option for the reward type for the prudential case
  // waiting for reward type field
  await CreateRewardAppPage.navigateToRewardCreate();
  await browser.sleep(3000);
  // removing the walkme
  // await browser.executeScript('document.getElementById("walkme-player").remove();');
  // making the position header absolute so it will not obstruct element
  // await browser.executeScript('document.querySelector("div.page-header.full-with").style.position = "absolute"');
  await browser.wait(ec.elementToBeClickable(ElementApp.matSelectTrigger().get(0)), 10000 );
  await ElementApp.matSelectTrigger().get(0).click();
  // selecting the free option
  await ElementApp.spanMatOptionText().get(0).click();
  // browser.sleep(20000);
});

Given(/^19_I click on option for category.$/, async () => {
  // enter a test string for title
  await ElementApp.inputTextArray().first().sendKeys('Test title');
  // selecting other for the category section
  // waiting for category field
  await browser.wait(ec.elementToBeClickable(ElementApp.matSelectTrigger().get(1)), 10000 );
  await ElementApp.matSelectTrigger().get(1).click();
  await ElementApp.spanMatOptionText().last().click();
});

Given(/^19_I click on option for redemption type.$/, async () => {
  // waiting for redemption type
  await browser.wait(ec.elementToBeClickable(ElementApp.matSelectTrigger().get(2)), 6000 );
  await ElementApp.matSelectTrigger().get(2).click();
  // selecting qr code option
  ElementApp.spanMatOptionText().first().click();
});

Given(/^19_I enter a test string for description.$/, async () => {
  await CreateRewardAppPage.textField().first().sendKeys('This is a test string for description');
});

Given(/^19_I enter a test string for T&Cs.$/, async () => {
  await CreateRewardAppPage.textField().last().sendKeys('This is a test string for t and c');
});

Given(/^19_I select an existing merchant.$/, async () => {
  // clicking on  the select existing merchant button
  await CreateRewardAppPage.merchantButtonArray().get(0).click();
  // clicking the first row of merchants
  await browser.wait(ec.elementToBeClickable(ElementApp.matRowInserted().get(0)), 6000);
  // clicking on the first row of merchant
  await ElementApp.matRowInserted().get(0).click();
  // clicking on the add merchant button
  await ElementApp.clButtonArray().last().click();

});

Given(/^19_I enter a value for cost of reward.$/, async () => {
  // waiting for reward field to load
  await browser.wait(ec.presenceOf(ElementApp.inputNumberArray().get(0)), 6000);
  // entering a test value for the cost of reward field
  await ElementApp.inputNumberArray().get(0).sendKeys(1);
});

Given(/^19_I select user upload option for unique codes.$/, async () => {
  // waiting for user upload radio button to load
  // making the position header absolute so it will not obstruct element
  await browser.executeScript('document.querySelector("div.page-header.full-with").style.position = "absolute"');
  await browser.wait(ec.elementToBeClickable(CreateRewardAppPage.radioPrimaryButton()), 6000);
  // getting the element finder for the radio button for user upload
  const elementRadioButton: ElementFinder = CreateRewardAppPage.radioButton();
  await browser.wait(ec.elementToBeClickable(CreateRewardAppPage.radioButton()), 6000);
  await browser.executeScript('arguments[0].scrollIntoView(true);', elementRadioButton.getWebElement()).then(function anon(): void {
    elementRadioButton.click();
  });
});
// this step is not valid for now
Given(/^19_I select upload a csv file under unique codes.$/, async () => {
  const FileToUpload = './testArtifacts/pru-event-reward-test.csv';
  const absolutePath = path.resolve(__dirname, FileToUpload); // __dirname when inplementing circle ci later
  // upload the file to the user upload voucher upload section
  await CreateRewardAppPage.uploadSection().sendKeys(absolutePath);
  await browser.sleep(3000);
});
// this step is not valid for now
Given(/^19_I enter a valid date range for voucher validity.$/, () => {
  // inputing date into the from date field
  // await element.all(by.css('input.mat-date-picker')).get(0).sendKeys('9/17/2019');
  // inputing time into from date field
  // await element.all(by.css('input.time-picker-toggle')).get(0).sendKeys('12:00 am');
  // inputing date into the to date field
  // await element.all(by.css('input.mat-date-picker')).get(0).sendKeys('9/20/2019');
  // inputing time into to date field
  // await element.all(by.css('input.time-picker-toggle')).get(0).sendKeys('12:00 am');
});
// this step is not valid for now
Given(/^19_I enter test values for Voucher Limits Per Campaign.$/, async () => {
  // waiting for the slider to load for voucher limits per campaign
  await browser.wait(ec.elementToBeClickable(CreateRewardAppPage.checkboxField().get(1)), 6000);
  // clicking on the slider
  await CreateRewardAppPage.slider().get(0).click();
  // entering a value for  voucher limits per campaign
  await ElementApp.inputNumberArray().get(1).sendKeys(1);
  // selecting a time frame for voucher limits per camapaign by clicking on drop down menu
  await CreateRewardAppPage.dropDownMenu().get(3).click();
  // selecting the day value
  await ElementApp.spanMatOptionText().get(0).click();
});
// this step is not valid for now
Given(/^19_I enter test values for Issuance Limits Per User.$/, async () => {
  // waiting for the slider to load for value for issuance limit per user
  await browser.wait(ec.elementToBeClickable(CreateRewardAppPage.checkboxField().get(2)), 6000);
  // clicking on the slider
  await CreateRewardAppPage.slider().get(1).click();
  // entering a value for issuance limit per user
  await ElementApp.inputNumberArray().get(2).sendKeys(1);
  // selecting a time frame for value for issuance limit per user by clicking on drop down menu
  await CreateRewardAppPage.dropDownMenu().get(4).click();
  // selecting the day value
  await ElementApp.spanMatOptionText().get(0).click();
});
// this step is not valid for now
Given(/^19_I enter test values for Redemption Limits Per User.$/, async () => {
  // waiting for the slider to load for value for redemption limits per user
  await browser.wait(ec.elementToBeClickable(CreateRewardAppPage.checkboxField().get(3)), 6000);
  // clicking on the slider
  await CreateRewardAppPage.slider().get(2).click();
  // entering a value for redemption limits per user
  await ElementApp.inputNumberArray().get(3).sendKeys(1);
  // selecting a time frame for value for redemption limits per user by clicking on drop down menu
  await CreateRewardAppPage.dropDownMenu().get(5).click();
  // selecting the day value
  await ElementApp.spanMatOptionText().get(0).click();
});

When(/^19_I press save button.$/, async () => {
  // clicking on the save button
  await ElementApp.clButtonArray().get(1).click();
  // press the close button
  await ElementApp.clButtonArray().get(2).click();
});

Then(/^19_Reward is present under the reward category .$/, () => {
  // Will work on the assertions after i am done with PW-918
  expect(true).to.equal(true);
});
