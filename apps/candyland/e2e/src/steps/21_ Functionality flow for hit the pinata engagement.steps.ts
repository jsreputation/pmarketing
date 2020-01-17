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
import * as path from 'path' ;

import {
  CreateHitThePinataAppPage,
  ElementApp,
  LoginAppPage,
} from '../pages/candylandApp.po';

// Ensure functionality of headline and and sub-headline message
Given(/^4_I am on the hit the pinata creation page$/, async () => {
  const ec = protractor.ExpectedConditions;
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

  await CreateHitThePinataAppPage.navigateToHitThePinata();
  await browser.sleep(3000);
});

When(/^4_I input a test string in the headline and sub headline field.$/, async () => {
  const ec = protractor.ExpectedConditions;
  // waiting for headline field to load
  await browser.wait(ec.presenceOf(ElementApp.inputTextArray().get(1)), 6000);
  // waiting for sub-headline field to load
  await browser.wait(ec.presenceOf(ElementApp.inputTextArray().get(2)), 6000);
  // inputing a test string in the headline field
  await ElementApp.inputTextArray().get(1).clear();
  await ElementApp.inputTextArray().get(1).sendKeys('TestString0001');
  // inputing a test string in the sub-headline field
  await ElementApp.inputTextArray().get(2).clear();
  await ElementApp.inputTextArray().get(2).sendKeys('TestString0002');
});

Then(/^4_I should see the test string in the preview element.$/, async () => {
  const ec = protractor.ExpectedConditions;
  // waiting for the preview element to load
  await browser.wait(ec.presenceOf(ElementApp.mobilePreviewHeadline()), 6000);
  // doing an assertion on the presence of the text message in the preview element
  expect(await CreateHitThePinataAppPage.headlinePreview().getText()).to.contain('TestString0001');
  expect(await CreateHitThePinataAppPage.subHeadlinePreview().getText()).to.contain('TestString0002');
});

// Verifying the functionality of the game graphic options

Given(/^5_I am on the hit the pinata creation page$/, async () => {
  await CreateHitThePinataAppPage.navigateToHitThePinata();
  await browser.sleep(3000);
});

When(/^5_I select an option for the pinata and the background.$/, async () => {
  const ec = protractor.ExpectedConditions;
  // waiting for the pinata and the ground field to load
  // waiting for the pinata field to load
  await browser.wait(ec.presenceOf(ElementApp.designImageArray().get(1)), 6000);
  // waiting for the background field to load
  await browser.wait(ec.presenceOf(ElementApp.designImageArray().get(4)), 6000);
  // clicking on the second option of the pinata
  await ElementApp.designImageArray().get(1).click();
  // clicking on the second option of the background
  await ElementApp.designImageArray().get(4).click();
  await browser.sleep(3000);
});

Then(/^5_I should see the change in the preview element.$/, async () => {
  const bkgroundRegex = /full_bg_8\.jpg/;
  // doing an assertion on the attr of the elements.
  // pinata
  expect(await CreateHitThePinataAppPage.pinataImage().getAttribute('src')).to.contain('full_pinata_2.png');
  // background element
  expect(await ElementApp.mobilePreviewBackground().getAttribute('style')).to.match(bkgroundRegex);
});

// Verifying the functionality of the file upload field for hit the pinata.
Given(/^6_I am on the hit the pinata creation page.$/, async () => {
  await CreateHitThePinataAppPage.navigateToHitThePinata();
  await browser.sleep(3000);
});

When(/^6_I upload a background$/, async () => {
  const FileToUpload = './testArtifacts/testimg.png';
  const absolutePath = path.resolve(__dirname, FileToUpload);
  const ec = protractor.ExpectedConditions;
  // waiting for the upload field to load
  await browser.wait(ec.presenceOf(ElementApp.inputFile()), 6000);
  // uploading test img file into field
  await ElementApp.inputFile().sendKeys(absolutePath);
  await browser.sleep(3000);
});
Then(/^6_I should see the background in the preview element.$/, async () => {
  // doing an assertion based on the attribute of the img obj
  expect(await ElementApp.imageWrap().getAttribute('alt')).to.be.contain('upload');
});

// Verifying the functionality of button text field
Given(/^7_I am on the hit the pinata creation page.$/, async () => {
  await CreateHitThePinataAppPage.navigateToHitThePinata();
  await browser.sleep(3000);
});

When(/^7_I input a test string on the button text field$/, async () => {
  const ec = protractor.ExpectedConditions;
  // waiting for button text to load
  await browser.wait(ec.presenceOf(ElementApp.inputTextArray().get(3)), 6000);
  // entering test string button text field
  await ElementApp.inputTextArray().get(3).clear();
  await ElementApp.inputTextArray().get(3).sendKeys('TestString003');
  await browser.sleep(3000);
});

Then(/^7_I should see the change in the preview element.$/, async () => {
  // doing an assertion on the button text
  expect(await ElementApp.mobileButtonPreview().getText()).to.contain('TestString003');
});
