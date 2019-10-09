import { Given, Then, When } from 'cucumber';
import { expect } from 'chai';
import { browser, element, by , protractor } from 'protractor';
import { CreateHitThePinataAppPage } from '../pages/candylandApp.po';
import * as path from 'path' ;

let PageHitThePinata: CreateHitThePinataAppPage;

// Ensure functionality of headline and and sub-headline message
Given(/^4_I am on the hit the pinata creation page$/, async () => {
  PageHitThePinata = new CreateHitThePinataAppPage();
  await PageHitThePinata.navigateToHitThePinata();
  await browser.sleep(3000);
});

When(/^4_I input a test string in the headlline and sub headline field.$/, async () => {
  const ec = protractor.ExpectedConditions;
  // waiting for headline field to load
  await browser.wait(ec.presenceOf(element.all(by.css('input[type=text]')).get(1)), 6000);
  // waiting for sub-headline field to load
  await browser.wait(ec.presenceOf(element.all(by.css('input[type=text]')).get(2)), 6000);
  // inputing a test string in the headline field
  await element.all(by.css('input[type=text]')).get(1).clear();
  await element.all(by.css('input[type=text]')).get(1).sendKeys('TestString0001');
  // inputing a test string in the sub-headline field
  await element.all(by.css('input[type=text]')).get(2).clear();
  await element.all(by.css('input[type=text]')).get(2).sendKeys('TestString0002');
});

Then(/^4_I should see the test string in the preview element.$/, async () => {
  const ec = protractor.ExpectedConditions;
  // waiting for the preview element to load
  await browser.wait(ec.presenceOf(element(by.className('mobile-preview-headline'))), 6000);
  // doing an assertion on the presence of the text message in the preview element
  expect(await element.all(by.className('mobile-preview-headline')).getText()).to.contain('TestString0001');
  expect(await element.all(by.className('mobile-preview-sub-headline')).getText()).to.contain('TestString0002');
});

// Verifying the fucnctionality of the game graphic options

Given(/^5_I am on the hit the pinata creation page$/, async () => {
  PageHitThePinata = new CreateHitThePinataAppPage();
  await PageHitThePinata.navigateToHitThePinata();
  await browser.sleep(3000);
});

When(/^5_I select an option for the pinata and the background.$/, async () => {
  const ec = protractor.ExpectedConditions;
  // waiting for the pinata and the ground field to load
  // waiting for the pinata field to load
  await browser.wait(ec.presenceOf(element.all(by.css('cl-images-preview')).get(1)), 6000);
  // waiting for the background field to load
  await browser.wait(ec.presenceOf(element.all(by.css('cl-images-preview')).get(4)), 6000);
  // clicking on the second option of the pinata
  await element.all(by.css('cl-images-preview')).get(1).click();
  // clicking on the second option of the background
  await element.all(by.css('cl-images-preview')).get(4).click();
  await browser.sleep(3000);
});

Then(/^5_I should see the change in the preview element.$/, async () => {
  const bkgroundRegex = /full_bg_8\.jpg/;
  // doing an assertion on the attr of the elements.
  // pinata
  expect(await element(by.css('img.img')).getAttribute('src')).to.contain('full_pinata_2.png');
  // background element
  expect(await element(by.css('div.mobile-preview-background')).getAttribute('style')).to.match(bkgroundRegex);
});

// Verifying the functionality of the file upload field for hit the pinata.
Given(/^6_I am on the hit the pinata creation page.$/, async () => {
  PageHitThePinata = new CreateHitThePinataAppPage();
  await PageHitThePinata.navigateToHitThePinata();
  await browser.sleep(3000);
});

When(/^6_I upload a background$/, async () => {
  const FileToUpload = './testArtifacts/testimg.png';
  const absolutePath = path.resolve(__dirname, FileToUpload);
  const ec = protractor.ExpectedConditions;
  // waiting for the upload field to load
  await browser.wait(ec.presenceOf(element(by.css('input[type=file]'))), 6000);
  // uploading test img file into field
  await element(by.css('input[type=file]')).sendKeys(absolutePath);
  await browser.sleep(3000);
});
Then(/^6_I should see the background in the preview element.$/, async () => {
  // doing an assertion based on the attribute of the img obj
  expect(await element(by.css('div.image-wrap.ng-star-inserted>img.image')).getAttribute('alt')).to.be.contain('upload');
});

// Verifying the functionality of button text field
Given(/^7_I am on the hit the pinata creation page.$/, async () => {
  PageHitThePinata = new CreateHitThePinataAppPage();
  await PageHitThePinata.navigateToHitThePinata();
  await browser.sleep(3000);
});

When(/^7_I input a test string on the button text field$/, async () => {
  const ec = protractor.ExpectedConditions;
  // waiting for button text to load
  await browser.wait(ec.presenceOf(element.all(by.css('input[type=text]')).get(3)), 6000);
  // entering test string button text field
  await element.all(by.css('input[type=text]')).get(3).clear();
  await element.all(by.css('input[type=text]')).get(3).sendKeys('TestString003');
  await browser.sleep(3000);
});

Then(/^7_I should see the change in the preview element.$/, async () => {
  // doing an assertion on the button text
  expect(await element(by.css('button.mobile-preview-btn')).getText()).to.contain('TestString003');
});
