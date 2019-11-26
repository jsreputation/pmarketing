import { Before, Given, Then, When } from 'cucumber';
import { expect } from 'chai';
import { browser, protractor, ElementFinder, ProtractorExpectedConditions } from 'protractor';
import { RewardAppPage, CreateRewardAppPage, ElementApp } from '../pages/candylandApp.po';
import * as path from 'path' ;

let RewardPage: RewardAppPage;
let CreateRewardPage: CreateRewardAppPage;
const Element = ElementApp;
// creating var for protractor expected conditions
// const ec: ProtractorExpectedConditions = protractor.ExpectedConditions;

Before( () => {
  // initializing page objects instance
  RewardPage = new RewardAppPage();
  CreateRewardPage = new CreateRewardAppPage();
});

Given(/^19_I am on the rewards page.$/, async () => {
  await RewardPage.navigateToReward();
});

Given(/^19_I click on create new button.$/, async () => {
  const ec: ProtractorExpectedConditions = protractor.ExpectedConditions;
  await browser.wait(ec.presenceOf(Element.clButton()), 6000);
  // clicking on the create new button
  await Element.clButton().click();

});

Given(/^19_I click on option for reward type.$/, async () => {
  const ec: ProtractorExpectedConditions = protractor.ExpectedConditions;
  // selecting the free option for the reward type for the prudential case
  // waiting for reward type field
  await CreateRewardPage.navigateToRewardCreate();
  await browser.sleep(3000);
  // removing the walkme
  await browser.executeScript('document.getElementById("walkme-player").remove();');
  // making the position header absolute so it will not obstruct element
  // await browser.executeScript('document.querySelector("div.page-header.full-with").style.position = "absolute"');
  await browser.wait(ec.elementToBeClickable(CreateRewardPage.selectField().get(0)), 10000 );
  await CreateRewardPage.selectField().get(0).click();
  // selecting the free option
  await CreateRewardPage.rewardOptions().get(0).click();
  // browser.sleep(20000);
});

Given(/^19_I click on option for category.$/, async () => {
  // selecting other for the category section
  // waiting for category field
  const ec: ProtractorExpectedConditions = protractor.ExpectedConditions;
  await browser.wait(ec.elementToBeClickable(CreateRewardPage.selectField().get(1)), 10000 );
  await CreateRewardPage.selectField().get(1).click();
  await CreateRewardPage.rewardOptions().last().click();
});

Given(/^19_I click on option for redemption type.$/, async () => {
  // waiting for redemption type
  const ec: ProtractorExpectedConditions = protractor.ExpectedConditions;
  await browser.wait(ec.elementToBeClickable(CreateRewardPage.selectField().get(2)), 6000 );
  await CreateRewardPage.selectField().get(2).click();
  // selecting qr code option
  CreateRewardPage.rewardOptions().first().click();

});

Given(/^19_I enter a test string for description.$/, async () => {
  await CreateRewardPage.textField().first().sendKeys('This is a test string for description');
});

Given(/^19_I enter a test string for T&Cs.$/, async () => {
  await CreateRewardPage.textField().last().sendKeys('This is a test string for t and c');
});

Given(/^19_I select an existing merchant.$/, async () => {
  // clicking on  the select existing merchant button
  const ec: ProtractorExpectedConditions = protractor.ExpectedConditions;
  await CreateRewardPage.merchantButton().click();
  // clicking the first row of merchants
  await browser.wait(ec.elementToBeClickable(CreateRewardPage.firstMerchantsRow()), 6000);
  // clicking on the first row of merchant
  await CreateRewardPage.firstMerchantsRow().get(0).click();
  // clicking on the add merchant button
  await Element.clButtonArray().last().click();

});

Given(/^19_I enter a value for cost of reward.$/, async () => {
  // waiting for reward field to load
  const ec: ProtractorExpectedConditions = protractor.ExpectedConditions;
  await browser.wait(ec.presenceOf(CreateRewardPage.numberField().get(0)), 6000);
  // entering a test value for the cost of reward field
  await CreateRewardPage.numberField().get(0).sendKeys(1);

});

Given(/^19_I select user upload option for unique codes.$/, async () => {
  // waiting for user upload radio button to load
  const ec: ProtractorExpectedConditions = protractor.ExpectedConditions;
  // making the position header absolute so it will not obstruct element
  await browser.executeScript('document.querySelector("div.page-header.full-with").style.position = "absolute"');
  await browser.wait(ec.elementToBeClickable(CreateRewardPage.radioPrimaryButton()), 6000);
  // getting the element finder for the radio button for user upload
  const elementRadioButton: ElementFinder = CreateRewardPage.radioButton();
  await browser.wait(ec.elementToBeClickable(CreateRewardPage.radioButton()), 6000);
  await browser.executeScript('arguments[0].scrollIntoView(true);', elementRadioButton.getWebElement()).then(function anon(): void {
    elementRadioButton.click();
  });
});

Given(/^19_I select upload a csv file under unique codes.$/, async () => {
  const FileToUpload = './testArtifacts/pru-event-reward-test.csv';
  const absolutePath = path.resolve(__dirname, FileToUpload); // __dirname when inplementing circle ci later
  // upload the file to the user upload voucher upload section
  await CreateRewardPage.uploadSection().sendKeys(absolutePath);
  await browser.sleep(3000);
});

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

Given(/^19_I enter test values for Voucher Limits Per Campaign.$/, async () => {
  // waiting for the slider to load for voucher limits per campaign
  const ec: ProtractorExpectedConditions = protractor.ExpectedConditions;
  await browser.wait(ec.elementToBeClickable(CreateRewardPage.checkboxField().get(1)), 6000);
  // clicking on the slider
  await CreateRewardPage.slider().get(0).click();
  // entering a value for  voucher limits per campaign
  await CreateRewardPage.numberField().get(1).sendKeys(1);
  // selecting a time frame for voucher limits per camapaign by clicking on drop down menu
  await CreateRewardPage.dropDownMenu().get(3).click();
  // selecting the day value
  await CreateRewardPage.rewardOptions().get(0).click();
});

Given(/^19_I enter test values for Issuance Limits Per User.$/, async () => {
  // waiting for the slider to load for value for issuance limit per user
  const ec: ProtractorExpectedConditions = protractor.ExpectedConditions;
  await browser.wait(ec.elementToBeClickable(CreateRewardPage.checkboxField().get(2)), 6000);
  // clicking on the slider
  await CreateRewardPage.slider().get(1).click();
  // entering a value for issuance limit per user
  await CreateRewardPage.numberField().get(2).sendKeys(1);
  // selecting a time frame for value for issuance limit per user by clicking on drop down menu
  await CreateRewardPage.dropDownMenu().get(4).click();
  // selecting the day value
  await CreateRewardPage.rewardOptions().get(0).click();
  });

Given(/^19_I enter test values for Redemption Limits Per User.$/, async () => {
    // waiting for the slider to load for value for redemption limits per user
  const ec: ProtractorExpectedConditions = protractor.ExpectedConditions;
  await browser.wait(ec.elementToBeClickable(CreateRewardPage.checkboxField().get(3)), 6000);
  // clicking on the slider
  await CreateRewardPage.slider().get(2).click();
  // entering a value for redemption limits per user
  await CreateRewardPage.numberField().get(3).sendKeys(1);
  // selecting a time frame for value for redemption limits per user by clicking on drop down menu
  await CreateRewardPage.dropDownMenu().get(5).click();
  // selecting the day value
  await CreateRewardPage.rewardOptions().get(0).click();
});

When(/^19_I press save button.$/, async () => {
  // clicking on the save button
  await Element.clButtonArray().get(1).click();
  // press the close button
  await Element.clButtonArray().get(2).click();
});

Then(/^19_Reward is present under the reward category .$/, () => {
  // Will work on the assertions after i am done with PW-918
  expect(true).to.equal(true);
});
