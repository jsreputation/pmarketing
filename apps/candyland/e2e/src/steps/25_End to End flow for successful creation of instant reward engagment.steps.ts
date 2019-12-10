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
import * as path from 'path' ;

import {
  ElementApp,
  CreateInstantRewardAppPage,
} from '../pages/candylandApp.po';

const ec: ProtractorExpectedConditions = protractor.ExpectedConditions;

// Verifying successful creation of instant reward engagment
Given(/^8_I click on the instant reward option.$/, async () => {
  // waiting for the instant reward button to load
  await browser.wait(ec.presenceOf(CreateInstantRewardAppPage.instantRewardBtn()), 6000);
  // clicking on the instant reward option
  await CreateInstantRewardAppPage.instantRewardBtn().click();
});

Given(/^8_I enter a test string in the headline message and sub-headline message for instant reward.$/, async () => {
  // waiting for the headline and sub-headline to load
  // headline field
  await browser.wait(ec.presenceOf(ElementApp.inputTextArray().get(1)), 6000);
  // sub-headline field
  await browser.wait(ec.presenceOf(ElementApp.inputTextArray().get(2)), 6000);
  // inputing test string for headline and sub headline field
  // clearing default value and inputing test string into headline
  await ElementApp.inputTextArray().get(1).clear();
  await ElementApp.inputTextArray().get(1).sendKeys('E2Eteststring001');
  // Inputing test string in sub-headline
  await ElementApp.inputTextArray().get(2).sendKeys('E2Eteststring002');
});

Given(/^8_I upload a background image for card background and background.$/, async () => {
  const FileToUpload = './testArtifacts/testimg.png';
  const absolutePath = path.resolve(__dirname, FileToUpload);
  // waiting for for the file upload fields to load
  // card background
  await browser.wait(ec.presenceOf(ElementApp.inputFileArray().get(0)), 6000);
  // background
  await browser.wait(ec.presenceOf(ElementApp.inputFileArray().get(1)), 6000);
  // uploading file for card background
  await ElementApp.inputFileArray().get(0).sendKeys(absolutePath);
  // uploading file for background
  // after uploading card background, there is only one file input remains, so the index is again 0
  await ElementApp.inputFileArray().get(0).sendKeys(absolutePath);
  await browser.sleep(3000);
});

When(/^8_I click on an option in the engagment dialog box.$/, async () => {
  // waiting for the the launch now button to load
  await browser.wait(ec.elementToBeClickable(ElementApp.clButtonArray().get(2)), 6000);
  // clicking on the launch now button
  await ElementApp.clButtonArray().get(2).click();
  await browser.sleep(3000);
});

Then(/^8_I should see the instant reward created.$/, async () => {
  // waiting for the card to load
  await browser.wait(ec.presenceOf(ElementApp.engagementCreated()), 6000);
  // doing an assertion on the name of the card
  expect(await ElementApp.engagementCreated().getText()).to.equal('Instant Reward Template');
});
