import { Before, Given, Then, When } from 'cucumber';
import { expect } from 'chai';
import { browser, element, by } from 'protractor';
import * as path from 'path' ;
// const path = require('path');

import { CreateShakeTheTreeAppPage } from '../pages/shakeTheTreeFlow.po';

let PageShakeTheTree: CreateShakeTheTreeAppPage ;

Before( () => {
  // initializing page objects instances
  PageShakeTheTree = new CreateShakeTheTreeAppPage();
});
Given(/^1_I am on the shake a tree game creation page$/, async () => {
  await PageShakeTheTree.navigateToShakeTheTree();
  await browser.sleep(3000);
});

When(/^1_I upload a file$/, async () => {
 const FileToUpload = './Downloads/testimg.png';
 const absolutePath = path.resolve('/Users/perx', FileToUpload); // __dirname
 await element.all(by.css('input[type="file"]')).get(0).sendKeys(absolutePath);
  // await element(by.id('uploadButton')).click();
});

Then(/^1_The file uploaded is present in the upload field under the gift box category .$/, async () => {
  expect(await element(by.css('div.image-wrap.ng-star-inserted>img.image')).getAttribute('alt')).to.be.contain('upload');
});

/*Given('I am on the shake a tree game creation page', function() {
           // Write code here that turns the phrase above into concrete actions
           return 'pending';
         });

When('I upload a file', function() {
           // Write code here that turns the phrase above into concrete actions
           return 'pending';
         });

Then('The file uploaded is present in the upload field under the background category.', function() {
           // Write code here that turns the phrase above into concrete actions
           return 'pending';
         });

Given('I am on the shake a tree game creation page', function() {
           // Write code here that turns the phrase above into concrete actions
           return 'pending';
         });

When('I upload a file with wrong format', function() {
           // Write code here that turns the phrase above into concrete actions
           return 'pending';
         });

Then('my file should not be successfully uploaded.', function() {
           // Write code here that turns the phrase above into concrete actions
           return 'pending';
         });

Given('I am on the shake a tree game creation page', function() {
           // Write code here that turns the phrase above into concrete actions
           return 'pending';
         });

When('I upload a file with wrong format', function() {
           // Write code here that turns the phrase above into concrete actions
           return 'pending';
         });

Then('my file should not be successfully uploaded.', function() {
           // Write code here that turns the phrase above into concrete actions
           return 'pending';
         });

Given('that I am on the shake the tree creation page', function() {
           // Write code here that turns the phrase above into concrete actions
           return 'pending';
         });

When('I upload a file with the appropriate format for gift box', function() {
           // Write code here that turns the phrase above into concrete actions
           return 'pending';
         });

Then('gift box design reflects the file upload.', function() {
           // Write code here that turns the phrase above into concrete actions
           return 'pending';
         });

Given('that I am on the shake the tree creation page', function() {
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
