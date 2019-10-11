import { Given, Then, When } from 'cucumber';
import { expect } from 'chai';
import { browser, element, by , protractor } from 'protractor';
import { CreateInstantRewardAppPage } from '../pages/candylandApp.po';
import * as path from 'path' ;

let CreateInstantRewardPage: CreateInstantRewardAppPage;

// Ensure functionality of headline and and sub-headline message
Given(/^4_I am on the hit the instant reward creation page$/, async () => {
  CreateInstantRewardPage = new CreateInstantRewardAppPage();
  await CreateInstantRewardPage.navigateToCreateInstantReward();
});

When(/^4_I input a test string in the headlline and sub headline field for instant reward.$/, async () => {
  const ec = protractor.ExpectedConditions;
  // waiting for the headline and sub-headline to load
  // headline field
  await browser.wait(ec.presenceOf(element.all(by.css('input[type=text]')).get(1)), 6000);
  // sub-headline field
  await browser.wait(ec.presenceOf(element.all(by.css('input[type=text]')).get(2)), 6000);
  // inputing test string for headline and sub headline field
  // clearing default value and inputing test string into headline
  await element.all(by.css('input[type=text]')).get(1).clear();
  await element.all(by.css('input[type=text]')).get(1).sendKeys('teststring001');
  // Inputing test string in sub-headline
  await element.all(by.css('input[type=text]')).get(2).sendKeys('teststring002');
});

Then(/^4_I should see the test string in the preview element for instant reward.$/, async () => {
  const ec = protractor.ExpectedConditions;
  // waiting for element to load for preview element
  await browser.wait(ec.presenceOf(element(by.css('p.mobile-preview-headline'))), 6000);
  await browser.wait(ec.presenceOf(element(by.css('p.mobile-preview-sub-headline'))), 6000);
  // asserting the text value shown in mobile preview element
  expect(await element(by.css('p.mobile-preview-headline')).getText()).to.contain('teststring001');
  expect(await element(by.css('p.mobile-preview-sub-headline')).getText()).to.contain('teststring002');
});

// Verifying the fucnctionality of the game graphic options

Given(/^5_I am on the hit the instant reward creation page$/, async () => {
  CreateInstantRewardPage = new CreateInstantRewardAppPage();
  await CreateInstantRewardPage.navigateToCreateInstantReward();
});

When(/^5_I select an option for the card and the background for instant reward.$/, async () => {
  const ec = protractor.ExpectedConditions;
  // waiting for for the file option fields to load
  // card background
  await browser.wait(ec.presenceOf(element.all(by.css('cl-images-preview')).get(1)), 6000);
  // background
  await browser.wait(ec.presenceOf(element.all(by.css('cl-images-preview')).get(4)), 6000);
  // selecting option 2 for card background
  await element.all(by.css('cl-images-preview')).get(1).click();
  // selecting option 2 for background
  await element.all(by.css('cl-images-preview')).get(4).click();
});

Then(/^5_I should see the change in the preview element for instant reward.$/, async () => {
  const cardBackgroundRegex = /card-bg-2.png/;
  const backgroundRegex = /full_bg_2.jpg/;
  // doing an assertion on the style attribute value for the card on the preview element
  expect(await element(by.css('div.mobile-preview-card')).getAttribute('style')).to.match(cardBackgroundRegex);
  // doing an assertion on the style attribute value for mobile preview element
  expect(await element(by.css('div.mobile-preview-background')).getAttribute('style')).to.match(backgroundRegex);

});

// Verifying the functionality of the file upload field for instant reward.
Given(/^6_I am on the hit the instant reward creation page.$/, async () => {
  CreateInstantRewardPage = new CreateInstantRewardAppPage();
  await CreateInstantRewardPage.navigateToCreateInstantReward();
});

When(/^6_I upload a card background and a background img file for instant reward.$/, async () => {
  const FileToUpload = './testArtifacts/testimg.png';
  const absolutePath = path.resolve(__dirname, FileToUpload);
  const ec = protractor.ExpectedConditions;
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

Then(/^6_I should see the background and card background in the preview element for instant reward.$/, async () => {
  const uploadFileRegex = /666666666/;
  expect(await element(by.css('div.mobile-preview-card')).getAttribute('style')).to.match(uploadFileRegex);
  // doing an assertion on the style attribute value for mobile preview element
  expect(await element(by.css('div.mobile-preview-background')).getAttribute('style')).to.match(uploadFileRegex);
});

// Verifying the functionality of button text field
/*Given(/^7_I am on the hit the instant reward creation page.$/, async () => {
           // Write code here that turns the phrase above into concrete actions
           return 'pending';
         });

When(/^7_I input a test string on the message for instant reward.$/, async () => {
           // Write code here that turns the phrase above into concrete actions
           return 'pending';
         });

Then(/^7_I should see the change in the preview element for instant reward.$/, async () => {
           // Write code here that turns the phrase above into concrete actions
           return 'pending';
});*/
