import { Before, Given, Then, When } from 'cucumber';
import { expect } from 'chai';
import { browser, element, by , protractor } from 'protractor';
import { LoginAppPage,DashboardAppPage } from '../pages/shakeTheTreeFlow.po';
// declaring page variable
let LoginApp: LoginAppPage;
let DashboardPage: DashboardAppPage;
// login credentials
const testAccountId: number = 2;
const testUserAccount: string = 'Admin_2';
const testPW: string = 'asdfjkl;';

Before( () => {
  // initializing page objects instances
  LoginApp = new LoginAppPage();
  DashboardPage = new DashboardAppPage();
});

// Login with correct credentials
Given(/^32_I am on the login page$/, async () => {
  await DashboardPage.navigateToDashboard();
  // clearing session token in local storage
  await browser.executeScript('window.localStorage.clear();');
  await LoginApp.navigateToLogin();
});

When(/^32_I enter the right credentials$/, async () => {
  const ec = protractor.ExpectedConditions;
  await browser.wait(ec.elementToBeClickable(element.all(by.css('input')).get(0)), 5000);
  // entering correct account id
  await element.all(by.css('input')).get(0).sendKeys(testAccountId);
  // entering correct testUserAccount
  await element.all(by.css('input')).get(1).sendKeys(testUserAccount);
  // entering correct pw
  await element.all(by.css('input')).get(2).sendKeys(testPW);
  // clicking on the login button
  await element.all(by.css('cl-button')).get(0).click();

});

Then(/^32_I am able to login successfully$/, async () => {
  expect(await browser.getCurrentUrl()).to.contain('dashboard');
});

// Login with incorrect email
/*Given('{int}_I am on the login page', function(int) {
            // Write code here that turns the phrase above into concrete actions
            return 'pending';
          });

When('{int}_I entered the incorrect email with the valid p\/w', function(int) {
            // Write code here that turns the phrase above into concrete actions
            return 'pending';
          });

Then('{int}_I am not able to login.', function(int) {
            // Write code here that turns the phrase above into concrete actions
            return 'pending';
          });

// Login with incorrect p/w
Given('{int}_I am on the login page.', function(int) {
            // Write code here that turns the phrase above into concrete actions
            return 'pending';
          });

When('{int}_I entered the correct email and invalid p\/w', function(int) {
            // Write code here that turns the phrase above into concrete actions
            return 'pending';
          });

Then('{int}_I am not able to login.', function(int) {
            // Write code here that turns the phrase above into concrete actions
            return 'pending';
          });

// Verifying presence of message prompt to user.
Given('{int}_I am on the login page.', function(int) {
            // Write code here that turns the phrase above into concrete actions
            return 'pending';
          });

When('{int}_I entered the correct email and invalid p\/w', function(int) {
            // Write code here that turns the phrase above into concrete actions
            return 'pending';
          });

Then('{int}_I see the message prompt for invalid login', function(int) {
            // Write code here that turns the phrase above into concrete actions
            return 'pending';
});
*/
