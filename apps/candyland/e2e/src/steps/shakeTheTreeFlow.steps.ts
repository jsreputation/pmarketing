import { Before, Given, Then, When } from 'cucumber';
import { expect } from 'chai';
import { browser, element, by, protractor } from 'protractor';
import { EngagementAppPage, CreateShakeTheTreeAppPage } from '../pages/shakeTheTreeFlow.po';

let PageEngagement: EngagementAppPage;
let PageShakeTheTree: CreateShakeTheTreeAppPage;


Before( () => {
  PageEngagement = new EngagementAppPage();
  PageShakeTheTree = new CreateShakeTheTreeAppPage();

});
// Scenario: Ensure that both options of engagment games is visible to customer
Given(/^1_I am on the customer engagment dialog box$/, async () => {
  await PageEngagement.navigateToEngagement();
  await browser.sleep(3000);
  // await element(by.className('btn mat-flat-button primary')).click();
  // await browser.sleep(1000);

});

When(/^1_I click on the games option$/,  async () => {
  const ec = protractor.ExpectedConditions;
  await browser.wait(ec.elementToBeClickable(element(by.className('btn mat-flat-button primary'))), 5000);
  // clicking on the create new button
  await element(by.className('btn mat-flat-button primary')).click();
  await element.all(by.tagName('cl-type-item')).get(1).click();
});

Then(/^1_The two options for the games are present.$/, async () => {
  expect(await element.all(by.className('game-icon')).count()).to.equal(2);
  expect(await element(by.css('p.create-engagement-dialog-content-title')).getText()).to.equal('Select Engagement Type');
});

// Scenario: Verifying the correct url when page redirects to template page.
Given(/^2_I am on the engagement creation dialog box$/, async () => {
  await PageEngagement.navigateToEngagement();
  await browser.sleep(3000);
      });

When(/^2_I click the next button$/, async () => {
  const ec = protractor.ExpectedConditions;
  await browser.wait(ec.elementToBeClickable(element(by.className('btn mat-flat-button primary'))), 5000);
  // clicking on the create new button
  await element(by.className('btn mat-flat-button primary')).click();
  // clicking on the create engagements
  await element.all(by.tagName('cl-type-item')).get(1).click();
  // clicking on the next button
  await element.all(by.className('btn mat-flat-button primary')).get(1).click();
  });

Then(/^2_the page should be redirected to the correct url.$/, async () => {
  expect(await browser.getCurrentUrl()).to.equal('http://localhost:4200/engagements/games/new-shake');
});

// Verifying that the relevant input text fields are present.
Given(/^3_that I am on the shake the tree creation page$/, async () => {
  await PageShakeTheTree.navigateToShakeTheTree();
  });

When(/^3_I do nothing$/, () => {});

Then(/$3_The relevant text input fields are present.$/, async() => {

});

/*Given('that I am on the {string} creation page', function (string) {
        // Write code here that turns the phrase above into concrete actions
        return 'pending';
      });



When('I do nothing', function () {
        // Write code here that turns the phrase above into concrete actions
        return 'pending';
      });



Then('the preview section element is present.', function () {
        // Write code here that turns the phrase above into concrete actions
        return 'pending';
      });



Given('that I am on the {string} creation page.', function (string) {
        // Write code here that turns the phrase above into concrete actions
        return 'pending';
      });


When('I entered a empty text string in the headline text box.', function () {
        // Write code here that turns the phrase above into concrete actions
        return 'pending';
      });



Then('the empty string entered is reflected in the preview element.', function () {
        // Write code here that turns the phrase above into concrete actions
        return 'pending';
      });



Given('that I am on the {string} creation page.', function (string) {
        // Write code here that turns the phrase above into concrete actions
        return 'pending';
      });



When('I entered a pseudo random text string in the headline text box.', function () {
        // Write code here that turns the phrase above into concrete actions
        return 'pending';
      });


Then('the random string entered is reflected in the preview element.', function () {
        // Write code here that turns the phrase above into concrete actions
        return 'pending';
      });


Given('that I am on the {string} creation page.', function (string) {
        // Write code here that turns the phrase above into concrete actions
        return 'pending';
      });


When('I entered a empty text string in the sub-headline text box.', function () {
        // Write code here that turns the phrase above into concrete actions
        return 'pending';
      });


Then('the empty string entered is reflected in the preview element.', function () {
        // Write code here that turns the phrase above into concrete actions
        return 'pending';
      });



Given('that I am on the {string} creation page.', function (string) {
        // Write code here that turns the phrase above into concrete actions
        return 'pending';
      });



When('I entered a pseudo random text string in the sub-headline text box.', function () {
        // Write code here that turns the phrase above into concrete actions
        return 'pending';
      });



Then('the random string entered is reflected in the preview element.', function () {
        // Write code here that turns the phrase above into concrete actions
        return 'pending';
      });



Given('that I am on the {string} creation page.', function (string) {
        // Write code here that turns the phrase above into concrete actions
        return 'pending';
      });


When('I entered a empty text string in the button text message box.', function () {
        // Write code here that turns the phrase above into concrete actions
        return 'pending';
      });


Then('the empty string entered is reflected in the preview element.', function () {
        // Write code here that turns the phrase above into concrete actions
        return 'pending';
      });


Given('that I am on the {string} creation page.', function (string) {
        // Write code here that turns the phrase above into concrete actions
        return 'pending';
      });



When('I entered a pseudo random text string in the button text box.', function () {
        // Write code here that turns the phrase above into concrete actions
        return 'pending';
      });


Then('the random string entered is reflected in the preview element.', function () {
        // Write code here that turns the phrase above into concrete actions
        return 'pending';
      });



Given('that I am on the {string} creation page.', function (string) {
         // Write code here that turns the phrase above into concrete actions
         return 'pending';
       });



When('I entered a pseudo random text string in the header message text box.', function () {
         // Write code here that turns the phrase above into concrete actions
         return 'pending';
       });



Then('the random string entered is not reflected in the preview element.', function () {
         // Write code here that turns the phrase above into concrete actions
         return 'pending';
       });



Given('that I am on the {string} creation page.', function (string) {
         // Write code here that turns the phrase above into concrete actions
         return 'pending';
       });


When('you select one of the the tree design.', function () {
         // Write code here that turns the phrase above into concrete actions
         return 'pending';
       });


Then('that selected tree design is reflected in the preview element.', function () {
         // Write code here that turns the phrase above into concrete actions
         return 'pending';
       });



Given('that I am on the {string} creation page.', function (string) {
         // Write code here that turns the phrase above into concrete actions
         return 'pending';
       });



When('you select one of the the background design.', function () {
         // Write code here that turns the phrase above into concrete actions
         return 'pending';
       });



Then('that selected background design design is reflected in the preview element.', function () {
         // Write code here that turns the phrase above into concrete actions
         return 'pending';
       });



Given('that I am on the {string} creation page.', function (string) {
         // Write code here that turns the phrase above into concrete actions
         return 'pending';
       });



When('you select one of the options for the gift amount', function () {
         // Write code here that turns the phrase above into concrete actions
         return 'pending';
       });



Then('the selected amount would be present in the preview element.', function () {
         // Write code here that turns the phrase above into concrete actions
         return 'pending';
       });
*/
