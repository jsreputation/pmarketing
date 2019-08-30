import { Before, Given, Then, When, setDefaultTimeout } from 'cucumber';
import { expect } from 'chai';
import { element, by, protractor, browser } from 'protractor';
import { DashboardAppPage } from '../pages/shakeTheTreeFlow.po';

let DashboardPage: DashboardAppPage;
// setting step timeout time
setDefaultTimeout(60 * 1000);
Before( () => {
  // initializing page objects instances
  DashboardPage = new DashboardAppPage();
});

Given(/^1_I am on the dashboard page.$/, async () => {
  await DashboardPage.navigateToDashboard();
  await element(by.className('walkme-custom-balloon-button-text')).click();
  await DashboardPage.navigateToDashboard();
});

When(/^1_I take no action.$/, () => {});

Then(/^1_I should see the engagment tab.$/, async () => {
 // doing an assertion based on the text string of the tab
  const ec = protractor.ExpectedConditions;
  await browser.wait(ec.elementToBeClickable(element.all(by.css('h3')).get(2)), 5000);
  expect(await element.all(by.css('h3')).get(2).getText()).to.be.equal('Engagements');
});

        /* Given('{int}_that I am on the dashboard page.', function (int) {
           // Write code here that turns the phrase above into concrete actions
           return 'pending';
         });

         When('{int}_I click on the engagement tab.', function (int) {
           // Write code here that turns the phrase above into concrete actions
           return 'pending';
         });

         Then('{int}_I will be redirected to the the engagment page.', function (int) {
           // Write code here that turns the phrase above into concrete actions
           return 'pending';
         });

         Given('{int}_that i am at the engagement page.', function (int) {
           // Write code here that turns the phrase above into concrete actions
           return 'pending';
         });

         When('{int}_I click on the create new button.', function (int) {
           // Write code here that turns the phrase above into concrete actions
           return 'pending';
         });
\

         Then('{int}_the dialg box is present.', function (int) {
           // Write code here that turns the phrase above into concrete actions
           return 'pending';
         });

         Given('{int}_I am on the create engagement option dialog', function (int) {
           // Write code here that turns the phrase above into concrete actions
           return 'pending';
         });

         When('{int}_I do nothing.', function (int) {
           // Write code here that turns the phrase above into concrete actions
           return 'pending';
         });

         Then('{int}_There are {int} engagement options available.', function (int, int2) {
           // Write code here that turns the phrase above into concrete actions
           return 'pending';
         });

         Given('{int}_I am on the create option dialog box.', function (int) {
           // Write code here that turns the phrase above into concrete actions
           return 'pending';
         });

         When('{int}_I click on the stamps option.', function (int) {
           // Write code here that turns the phrase above into concrete actions
           return 'pending';
         });

         Then('{int}_The stamp option is highlighted.', function (int) {
           // Write code here that turns the phrase above into concrete actions
           return 'pending';
         });

         */
