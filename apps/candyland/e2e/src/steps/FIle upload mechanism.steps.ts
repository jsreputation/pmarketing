import { Before, Given, Then, When } from 'cucumber';
import { expect } from 'chai';
import { browser, element, by } from 'protractor';
import * as path from 'path' ;
import { CreateShakeTheTreeAppPage } from '../pages/shakeTheTreeFlow.po';

let PageShakeTheTree: CreateShakeTheTreeAppPage ;

// Successful file upload for gift box
Before( () => {
  // initializing page objects instances
  PageShakeTheTree = new CreateShakeTheTreeAppPage();
});
Given(/^1_I am on the shake a tree game creation page$/, async () => {
  await PageShakeTheTree.navigateToShakeTheTree();
  await browser.sleep(3000);
});

When(/^1_I upload a file$/, async () => {
  // creating var for url path
 const FileToUpload = './testArtifacts/testimg.png';
 const absolutePath = path.resolve(__dirname, FileToUpload); // __dirname when inplementing circle ci later
 // upload the file to the gift img upload section
 await element.all(by.css('input[type="file"]')).get(0).sendKeys(absolutePath);

});

Then(/^1_The file uploaded is present in the upload field under the gift box category .$/, async () => {
  // doing an assertion based on the attribute of the img obj
  expect(await element(by.css('div.image-wrap.ng-star-inserted>img.image')).getAttribute('alt')).to.be.contain('upload');
});

// Successful file upload for background image
Given(/^2_I am on the shake a tree game creation page$/, async () => {
  await PageShakeTheTree.navigateToShakeTheTree();
  await browser.sleep(3000);
});

When(/^2_I upload a file$/, async () => {
  // creating var for url path
  const FileToUpload = './testArtifacts/testimg.png';
  const absolutePath = path.resolve(__dirname, FileToUpload); // __dirname when inplementing circle ci later
  // upload the file to the gift background upload section
  await element.all(by.css('input[type="file"]')).get(1).sendKeys(absolutePath);
});

Then(/^2_The file uploaded is present in the upload field under the background category.$/, async () => {
  // doing an assertion based on the attribute of the img obj
  expect(await element(by.css('div.image-wrap.ng-star-inserted>img.image')).getAttribute('alt')).to.be.contain('upload');
});

// Wrong file upload for gift box
Given(/^3_I am on the shake a tree game creation page$/, async () => {
  await PageShakeTheTree.navigateToShakeTheTree();
  await browser.sleep(3000);
});

When(/^3_I upload a file with wrong format$/, async () => {
  // creating var for url path
  const FileToUpload = './testArtifacts/testfile.xyz';
  const absolutePath = path.resolve(__dirname, FileToUpload); // __dirname when inplementing circle ci later
  // upload the file to the gift background upload section
  await element.all(by.css('input[type="file"]')).get(0).sendKeys(absolutePath);
});

Then(/^3_my file should not be successfully uploaded.$/, async () =>  {
  // do an assertion based on the message shown
  expect(await element(by.css('div.upload-error-wrap.ng-star-inserted>span')).getText()).to.contain('Only .JPG or .PNG are supported.');
  // do an assertion where there are still 2 empty input fields
  expect(await element.all(by.css('input[type="file"]')).count()).to.be.equal(2);
});

// Wrong file upload for background image
Given(/^4_I am on the shake a tree game creation page$/, async () => {
  await PageShakeTheTree.navigateToShakeTheTree();
  await browser.sleep(3000);
});

When(/^4_I upload a file with wrong format$/, async () => {
  const FileToUpload = './testArtifacts/testfile.xyz';
  const absolutePath = path.resolve(__dirname, FileToUpload); // __dirname when inplementing circle ci later
  // upload the file to the gift background upload section
  await element.all(by.css('input[type="file"]')).get(1).sendKeys(absolutePath);
});

Then(/^4_my file should not be successfully uploaded.$/, async () => {
  expect(await element(by.css('div.upload-error-wrap.ng-star-inserted>span')).getText()).to.contain('Only .JPG or .PNG are supported.');
  // do an assertion where there are still 2 empty input fields
  expect(await element.all(by.css('input[type="file"]')).count()).to.be.equal(2);
});

// Successful file upload for gift box reflected in preview image
/*Given(/^5_that I am on the shake the tree creation page$/, async () => {
  await PageShakeTheTree.navigateToShakeTheTree();
  await browser.sleep(3000);
});

When(/^5_I upload a file with the appropriate format for gift box$/, async () => {
   // creating var for url path
  const FileToUpload = './Downloads/testimg.png';
  const absolutePath = path.resolve('/Users/perx', FileToUpload); // __dirname when inplementing circle ci later
  // upload the file to the gift img upload section
  await element.all(by.css('input[type="file"]')).get(0).sendKeys(absolutePath);
});

Then(/^5_gift box design reflects the file upload.$/, async () => {
  // do an assertion based on the src attr of upload png.
  expect(await element(by.className('gift-img gift-img__1 ng-star-inserted')).getAttribute('src')).to.contain
  (element(by.css('div.image-wrap.ng-star-inserted>img')).getAttribute('src'));
});

/*Given('that I am on the shake the tree creation page', function() {
           // Write code here that turns the phrase above into concrete actions
           return 'pending';
         });

When('I upload a file with the appropriate format for background', function() {
           // Write code here that turns the phrase above into concrete actions
           return 'pending';
         });

Then('background reflects the file upload.', function() {
           // Write code here that turns the phrase above into concrete actions
           return 'pending';
         });
*/
