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
  CreateShakeTheTreeAppPage,
  LoginAppPage,
  ElementApp,
} from '../pages/candylandApp.po';

const ec: ProtractorExpectedConditions = protractor.ExpectedConditions;

Given(/^21_I am on the shake a tree game creation page$/, async () => {
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

  await CreateShakeTheTreeAppPage.navigateToShakeTheTree();
  await browser.sleep(3000);
});

When(/^21_I upload a file$/, async () => {
  // creating var for url path
  const FileToUpload = './testArtifacts/testimg.png';
  const absolutePath = path.resolve(__dirname, FileToUpload); // __dirname when inplementing circle ci later
  // upload the file to the gift img upload section
  await ElementApp.inputFileArray().get(0).sendKeys(absolutePath);
});

Then(/^21_The file uploaded is present in the upload field under the gift box category .$/, async () => {
  // doing an assertion based on the attribute of the img obj
  expect(await ElementApp.imageWrap().getAttribute('alt')).to.be.contain('upload');
});

// Successful file upload for background image
Given(/^22_I am on the shake a tree game creation page$/, async () => {
  await CreateShakeTheTreeAppPage.navigateToShakeTheTree();
  await browser.sleep(3000);
});

When(/^22_I upload a file$/, async () => {
  // creating var for url path
  const FileToUpload = './testArtifacts/testimg.png';
  const absolutePath = path.resolve(__dirname, FileToUpload); // __dirname when inplementing circle ci later
  // upload the file to the gift background upload section
  await ElementApp.inputFileArray().get(1).sendKeys(absolutePath);
});

Then(/^22_The file uploaded is present in the upload field under the background category.$/, async () => {
  // doing an assertion based on the attribute of the img obj
  expect(await ElementApp.imageWrap().getAttribute('alt')).to.be.contain('upload');
});

// Wrong file upload for gift box
Given(/^23_I am on the shake a tree game creation page$/, async () => {
  await CreateShakeTheTreeAppPage.navigateToShakeTheTree();
  await browser.sleep(3000);
});

When(/^23_I upload a file with wrong format$/, async () => {
  // creating var for url path
  const FileToUpload = './testArtifacts/testfile.xyz';
  const absolutePath = path.resolve(__dirname, FileToUpload); // __dirname when inplementing circle ci later
  // upload the file to the gift background upload section
  await ElementApp.inputFileArray().get(0).sendKeys(absolutePath);
});

Then(/^23_my file should not be successfully uploaded.$/, async () =>  {
  // do an assertion based on the message shown
  expect(await ElementApp.errorUploadMessage().getText()).to.contain('Only .JPG, .PNG or .GIF are supported.');
  // do an assertion where there are still 2 empty input fields
  expect(await ElementApp.inputFileArray().count()).to.be.equal(2);
});

// Wrong file upload for background image
Given(/^24_I am on the shake a tree game creation page$/, async () => {
  await CreateShakeTheTreeAppPage.navigateToShakeTheTree();
  await browser.sleep(3000);
});

When(/^24_I upload a file with wrong format$/, async () => {
  const FileToUpload = './testArtifacts/testfile.xyz';
  const absolutePath = path.resolve(__dirname, FileToUpload); // __dirname when inplementing circle ci later
  // upload the file to the gift background upload section
  await ElementApp.inputFileArray().get(1).sendKeys(absolutePath);
});

Then(/^24_my file should not be successfully uploaded.$/, async () => {
  expect(await ElementApp.errorUploadMessage().getText()).to.contain('Only .JPG, .PNG or .GIF are supported.');
  // do an assertion where there are still 2 empty input fields
  expect(await ElementApp.inputFileArray().count()).to.be.equal(2);
});

// Successful file upload for gift box reflected in preview image
Given(/^25_that I am on the shake the tree creation page$/, async () => {
  await CreateShakeTheTreeAppPage.navigateToShakeTheTree();
  // await browser.sleep(2000);
});

When(/^25_I upload a file with the appropriate format for gift box$/, async () => {
  // creating var for url path
  const FileToUpload = './testArtifacts/testimg.png';
  const absolutePath = path.resolve(__dirname, FileToUpload); // __dirname when inplementing circle ci later
  // upload the file to the gift img upload section
  await ElementApp.inputFileArray().get(0).sendKeys(absolutePath);
  await browser.sleep(3000);
});

Then(/^25_gift box design reflects the file upload.$/, async () => {
  // initializing variables for attributes src
  const srcUploadField = await ElementApp.imageWrap().getAttribute('src');
  const srcElementPreview = await CreateShakeTheTreeAppPage.giftPreview().getAttribute('src');
  // initializing regex looking for ','
  const regex = /,/;
  // doing a substring matching the first 6 characters of src attr
  const srcUploadFieldSubstr = srcUploadField.substring(srcUploadField.search(regex), srcUploadField.search(regex) + 5);
  const srcElementPreviewSubstr = srcElementPreview.substring(srcElementPreview.search(regex), srcElementPreview.search(regex) + 5);
  // doing an assertion matching the src substring
  expect(await srcUploadFieldSubstr).to.contain(srcElementPreviewSubstr);

});

//  Successful file upload for background reflected in preview image
Given(/^26_that I am on the shake the tree creation page$/, async () => {
  await CreateShakeTheTreeAppPage.navigateToShakeTheTree();
});

When(/^26_I upload a file with the appropriate format for background$/, async () => {
  // creating var for url path
  const FileToUpload = './testArtifacts/testimg.png';
  const absolutePath = path.resolve(__dirname, FileToUpload); // __dirname when inplementing circle ci later
  // upload the file to the background img upload section
  await ElementApp.inputFileArray().get(1).sendKeys(absolutePath);
  await browser.sleep(3000);
});

Then(/^26_background reflects the file upload.$/, async () => {
  // initializing variables for attributes src
  const srcUploadField = await ElementApp.imageWrap().getAttribute('src');
  const srcElementPreviewStyle = await ElementApp.imgArray().get(7).getAttribute('src');
  // get background-image url from style
  // const bgUrl = srcElementPreviewStyle.split('"')[1];
  // initializing regex looking for ','
  const regex = /333333333/;
  // doing a substring matching the first 6 characters of src attr
  const srcUploadFieldSubstr = srcUploadField.substring(srcUploadField.search(regex));
  // , srcUploadField.search(regex) + 5);
  const srcElementPreviewSubstr = srcElementPreviewStyle.substring(srcElementPreviewStyle.search(regex));
  // ,srcElementPreviewStyle.search(regex) + 5);
  // doing an assertion matching the src substring
  expect(await srcUploadFieldSubstr).to.contain(srcElementPreviewSubstr);
});
