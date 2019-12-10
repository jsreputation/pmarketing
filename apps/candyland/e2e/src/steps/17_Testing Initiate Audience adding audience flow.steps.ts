import {
  Given,
  Then,
  When,
} from 'cucumber';
import {
  browser,
  protractor,
} from 'protractor';
import { expect } from 'chai';

import {
  AudienceAppPage,
  ElementApp,
} from '../pages/candylandApp.po';

// Ensure that audience tab is present
Then(/^1_The audience tab should be present.$/, async () => {
  // waiting for the audience tab to load
  // await browser.executeScript('WalkMeAPI.stopFlow()');
  const ec = protractor.ExpectedConditions;
  await browser.wait(ec.presenceOf(ElementApp.h3Array().get(6)), 6000);
  expect(await ElementApp.h3Array().get(6).isPresent()).to.equal(true);
});

// Ensure that clicking on the audience tab leads to the audience page
When(/^2_I click on the audience tab$/, async () => {
  const ec = protractor.ExpectedConditions;
  // waiting for audience tab to load
  await browser.wait(ec.presenceOf(ElementApp.h3Array().get(6)), 6000);
  // clicking on the audience tab
  await ElementApp.h3Array().get(6).click();
  await browser.sleep(3000);

});

Then(/^2_I should be navigated to the audience page.$/, async () => {
  expect(await browser.getCurrentUrl()).to.contain('audience');
});

// Ensure that audience page have relevant elements
Given(/^3_I am on the audience page$/, async () => {
  await AudienceAppPage.navigateToAudience();
});

Then(/^3_I should see the relevant elements for audience page.$/, async () => {
  // waiting for the search bar and the add user button to load
  const ec = protractor.ExpectedConditions;
  // wait for the search bar to load
  await browser.wait(ec.presenceOf(ElementApp.inputText()), 6000);
  // wait for add user button to load
  await browser.wait(ec.presenceOf(ElementApp.clButton()), 6000);
  // doing an assertion on the presence of the elements
  // search bar
  expect(await ElementApp.inputText().isDisplayed()).to.equal(true);
  // add user button
  expect(await ElementApp.clButton().isDisplayed()).to.equal(true);
});
