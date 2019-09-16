import { Before, Given, Then, When } from 'cucumber';
import { expect } from 'chai';
import { browser, element, by } from 'protractor';
import * as path from 'path' ;
import { CreateShakeTheTreeAppPage } from '../pages/candylandApp.po';

let PageShakeTheTree: CreateShakeTheTreeAppPage ;

// Successful file upload for gift box
Before( () => {
  // initializing page objects instances
  PageShakeTheTree = new CreateShakeTheTreeAppPage();
});
Given(/^21_I am on the shake a tree game creation page$/, async () => {
  await PageShakeTheTree.navigateToShakeTheTree();
  await browser.sleep(3000);
});

When(/^21_I upload a file$/, async () => {
  // creating var for url path
 const FileToUpload = './testArtifacts/testimg.png';
 const absolutePath = path.resolve(__dirname, FileToUpload); // __dirname when inplementing circle ci later
 // upload the file to the gift img upload section
 await element.all(by.css('input[type="file"]')).get(0).sendKeys(absolutePath);

});

Then(/^21_The file uploaded is present in the upload field under the gift box category .$/, async () => {
  // doing an assertion based on the attribute of the img obj
  expect(await element(by.css('div.image-wrap.ng-star-inserted>img.image')).getAttribute('alt')).to.be.contain('upload');
});

// Successful file upload for background image
Given(/^22_I am on the shake a tree game creation page$/, async () => {
  await PageShakeTheTree.navigateToShakeTheTree();
  await browser.sleep(3000);
});

When(/^22_I upload a file$/, async () => {
  // creating var for url path
  const FileToUpload = './testArtifacts/testimg.png';
  const absolutePath = path.resolve(__dirname, FileToUpload); // __dirname when inplementing circle ci later
  // upload the file to the gift background upload section
  await element.all(by.css('input[type="file"]')).get(1).sendKeys(absolutePath);
});

Then(/^22_The file uploaded is present in the upload field under the background category.$/, async () => {
  // doing an assertion based on the attribute of the img obj
  expect(await element(by.css('div.image-wrap.ng-star-inserted>img.image')).getAttribute('alt')).to.be.contain('upload');
});

// Wrong file upload for gift box
Given(/^23_I am on the shake a tree game creation page$/, async () => {
  await PageShakeTheTree.navigateToShakeTheTree();
  await browser.sleep(3000);
});

When(/^23_I upload a file with wrong format$/, async () => {
  // creating var for url path
  const FileToUpload = './testArtifacts/testfile.xyz';
  const absolutePath = path.resolve(__dirname, FileToUpload); // __dirname when inplementing circle ci later
  // upload the file to the gift background upload section
  await element.all(by.css('input[type="file"]')).get(0).sendKeys(absolutePath);
});

Then(/^23_my file should not be successfully uploaded.$/, async () =>  {
  // do an assertion based on the message shown
  expect(await element(by.css('div.upload-error-wrap.ng-star-inserted>span')).getText()).to.contain('Only .JPG or .PNG are supported.');
  // do an assertion where there are still 2 empty input fields
  expect(await element.all(by.css('input[type="file"]')).count()).to.be.equal(2);
});

// Wrong file upload for background image
Given(/^24_I am on the shake a tree game creation page$/, async () => {
  await PageShakeTheTree.navigateToShakeTheTree();
  await browser.sleep(3000);
});

When(/^24_I upload a file with wrong format$/, async () => {
  const FileToUpload = './testArtifacts/testfile.xyz';
  const absolutePath = path.resolve(__dirname, FileToUpload); // __dirname when inplementing circle ci later
  // upload the file to the gift background upload section
  await element.all(by.css('input[type="file"]')).get(1).sendKeys(absolutePath);
});

Then(/^24_my file should not be successfully uploaded.$/, async () => {
  expect(await element(by.css('div.upload-error-wrap.ng-star-inserted>span')).getText()).to.contain('Only .JPG or .PNG are supported.');
  // do an assertion where there are still 2 empty input fields
  expect(await element.all(by.css('input[type="file"]')).count()).to.be.equal(2);
});

// Successful file upload for gift box reflected in preview image
Given(/^25_that I am on the shake the tree creation page$/, async () => {
  await PageShakeTheTree.navigateToShakeTheTree();
  // await browser.sleep(2000);
});

When(/^25_I upload a file with the appropriate format for gift box$/, async () => {
   // creating var for url path
  const FileToUpload = './testArtifacts/testimg.png';
  const absolutePath = path.resolve(__dirname, FileToUpload); // __dirname when inplementing circle ci later
  // upload the file to the gift img upload section
  await element.all(by.css('input[type="file"]')).get(0).sendKeys(absolutePath);
  await browser.sleep(3000);
});

Then(/^25_gift box design reflects the file upload.$/, async () => {
  // initializing variables for attributes src
  const srcUploadField = await element(by.css('div.image-wrap.ng-star-inserted>img')).getAttribute('src');
  const srcElementPreview = await element(by.css('div.gift-wrapper.gift-wrapper__1.hang.ng-star-inserted>img')).getAttribute('src');
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
  await PageShakeTheTree.navigateToShakeTheTree();
});

When(/^26_I upload a file with the appropriate format for background$/, async () => {
  // creating var for url path
  const FileToUpload = './testArtifacts/testimg.png';
  const absolutePath = path.resolve(__dirname, FileToUpload); // __dirname when inplementing circle ci later
  // upload the file to the background img upload section
  await element.all(by.css('input[type="file"]')).get(1).sendKeys(absolutePath);
  await browser.sleep(3000);
});

Then(/^26_background reflects the file upload.$/, async () => {
  // initializing variables for attributes src
  const srcUploadField = await element(by.css('div.image-wrap.ng-star-inserted>img')).getAttribute('src');
  const srcElementPreview = await element(by.css('div.mobile-preview-background')).getAttribute('style');
  // initializing regex looking for ','
  const regex = /,/;
  // doing a substring matching the first 6 characters of src attr
  const srcUploadFieldSubstr = srcUploadField.substring(srcUploadField.search(regex), srcUploadField.search(regex) + 5);
  const srcElementPreviewSubstr = srcElementPreview.substring(srcElementPreview.search(regex), srcElementPreview.search(regex) + 5);
  // doing an assertion matching the src substring
  expect(await srcUploadFieldSubstr).to.contain(srcElementPreviewSubstr);
});
