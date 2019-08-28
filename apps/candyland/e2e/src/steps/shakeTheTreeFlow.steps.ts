import { Before, Given, Then, When } from 'cucumber';
import { expect } from 'chai';
import { browser, element, by, protractor } from 'protractor';
import { EngagementAppPage } from '../pages/shakeTheTreeFlow.po';

let page: EngagementAppPage;

Before( () => {
  page = new EngagementAppPage();

});

Given(/^I am on the customer engagment dialog box$/, async () => {
  await page.navigateToEngagement();
  await browser.sleep(3000);
  // await element(by.className('btn mat-flat-button primary')).click();
  // await browser.sleep(1000);

});

When(/^I click on the games option$/,  async () => {
  const ec = protractor.ExpectedConditions;
  await browser.wait(ec.elementToBeClickable(element(by.className('btn mat-flat-button primary'))), 5000);
  await element(by.className('btn mat-flat-button primary')).click();
  await element.all(by.tagName('cl-type-item')).get(1).click();
});

Then(/^The two options for the games are present.$/, async () => {
  expect(await element.all(by.className('game-icon')).count()).to.equal(2);
  expect(await element(by.css('p.create-engagement-dialog-content-title')).getText()).to.equal('Select Engagement Type');
});

/*Given('I am on the engagement creation dialog box', function () {
        // Write code here that turns the phrase above into concrete actions
        return 'pending';
      });

When('I click the next button', function () {
        // Write code here that turns the phrase above into concrete actions
        return 'pending';
      });



Then('the page should be redirected to the correct url.', function () {
        // Write code here that turns the phrase above into concrete actions
        return 'pending';
      });


Given('that I am on the {string} creation page', function (string) {
        // Write code here that turns the phrase above into concrete actions
        return 'pending';
      });


When('I do nothing', function () {
        // Write code here that turns the phrase above into concrete actions
        return 'pending';
      });



Then('The relevant text input fields are present.', function () {
        // Write code here that turns the phrase above into concrete actions
        return 'pending';
      });



Given('that I am on the {string} creation page', function (string) {
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
