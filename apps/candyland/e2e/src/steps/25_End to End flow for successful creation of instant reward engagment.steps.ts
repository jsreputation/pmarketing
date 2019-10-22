import { Given, Then, When } from 'cucumber';
import { expect } from 'chai';
import { browser, element, by , protractor, ProtractorExpectedConditions } from 'protractor';
import * as path from 'path' ;

const ec: ProtractorExpectedConditions = protractor.ExpectedConditions;

// Verifying successful creation of instant reward engagment
Given(/^8_I click on the instant reward option.$/, async () => {
  // waiting for the instant reward button to load
  await browser.wait(ec.presenceOf(element.all(by.css('button.engagement-selector')).get(3)), 6000);
  // clicking on the instant reward option
  await element.all(by.css('button.engagement-selector')).get(3).click();
});

Given(/^8_I enter a test string in the headline message and sub-headline message for instant reward.$/, async () => {
  // waiting for the headline and sub-headline to load
  // headline field
  await browser.wait(ec.presenceOf(element.all(by.css('input[type=text]')).get(1)), 6000);
  // sub-headline field
  await browser.wait(ec.presenceOf(element.all(by.css('input[type=text]')).get(2)), 6000);
  // inputing test string for headline and sub headline field
  // clearing default value and inputing test string into headline
  await element.all(by.css('input[type=text]')).get(1).clear();
  await element.all(by.css('input[type=text]')).get(1).sendKeys('E2Eteststring001');
  // Inputing test string in sub-headline
  await element.all(by.css('input[type=text]')).get(2).sendKeys('E2Eteststring002');
});

Given(/^8_I upload a background image for card background and background.$/, async () => {
  const FileToUpload = './testArtifacts/testimg.png';
  const absolutePath = path.resolve(__dirname, FileToUpload);
  // waiting for for the file upload fields to load
  // card background
  await browser.wait(ec.presenceOf(element.all(by.css('input[type=file]')).get(0)), 6000);
  // background
  await browser.wait(ec.presenceOf(element.all(by.css('input[type=file]')).get(1)), 6000);
  // uploading file for card background
  await element.all(by.css('input[type=file]')).get(0).sendKeys(absolutePath);
  // uploading file for background
  await element.all(by.css('input[type=file]')).get(1).sendKeys(absolutePath);
  await browser.sleep(3000);
});

When(/^8_I click on an option in the engagment dialog box.$/, async () => {
  // waiting for the the launch now button to load
  await browser.wait(ec.elementToBeClickable(element.all(by.css('cl-button')).get(2)), 6000);
  // clicking on the launch now button
  await element.all(by.css('cl-button')).get(2).click();
  await browser.sleep(3000);
});

Then(/^8_I should see the instant reward created.$/, async () => {
  // waiting for the card to load
  await browser.wait(ec.presenceOf(element.all(by.css('p.engagement-item-name.linkable')).get(0)), 6000);
  // doing an assertion on the name of the card
  expect(await element.all(by.css('p.engagement-item-name.linkable')).get(0).getText()).to.equal('Instant Reward');
});
