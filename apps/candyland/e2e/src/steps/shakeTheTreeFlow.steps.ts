import { Before, Given, Then, When } from 'cucumber';
import { expect } from 'chai';
import { browser, element, by, protractor } from 'protractor';
import { EngagementAppPage, CreateShakeTheTreeAppPage } from '../pages/shakeTheTreeFlow.po';
// initializing page objects variables
let PageEngagement: EngagementAppPage;
let PageShakeTheTree: CreateShakeTheTreeAppPage;

Before( () => {
  // initializing page objects instances
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
  await browser.sleep(3000);
  });

When(/^3_I do nothing$/, () => {});

Then('3_The relevant text input fields are present.', async () => {
  // Verifying whether engagement title text input exists
  expect(await element(by.css('input#mat-input-0')).isPresent()).to.equal(true);
  // Verifying whether headline message text input exists
  expect(await element(by.css('input#mat-input-1')).isPresent()).to.equal(true);
  // Verifying whether sub-headline message text input exists
  expect(await element(by.css('input#mat-input-2')).isPresent()).to.equal(true);
  // Verifying whether button text input exists
  expect(await element(by.css('input#mat-input-3')).isPresent()).to.equal(true);
});

// Verifying the presence of the preview element.
Given(/^4_that I am on the shake the tree creation page$/, async () => {
  await PageShakeTheTree.navigateToShakeTheTree();
  await browser.sleep(3000);
});

When(/^4_I do nothing$/, () => {});

Then(/^4_the preview section element is present.$/, async () => {
  // checking whether mobile preview exist
  expect(await element(by.className('mobile-preview-mobile')).isPresent()).to.equal(true);

});

// Verifiying that headline message field takes null value
Given(/^5_that I am on the shake the tree creation page.$/, async () => {
  await PageShakeTheTree.navigateToShakeTheTree();
  await browser.sleep(3000);
});

When(/^5_I entered a empty text string in the headline text box.$/, async () => {
  await element(by.css('input#mat-input-1')).clear();
  await element(by.css('input#mat-input-1')).sendKeys(' ');

});

Then(/^5_the empty string entered is reflected in the preview element.$/, async () => {
  expect(await element(by.className('mobile-preview-headline')).getText()).to.be.equal('');
});

// Verifiying that headline message is reflected in the preview element

Given(/^6_that I am on the shake the tree creation page.$/, async () => {
  await PageShakeTheTree.navigateToShakeTheTree();
  await browser.sleep(3000);
});

When(/^6_I entered a pseudo random text string in the headline text box.$/, async () => {
  await element(by.css('input#mat-input-1')).clear();
  await element(by.css('input#mat-input-1')).sendKeys('This is a test string!');
});

Then(/^6_the random string entered is reflected in the preview element.$/, async () => {
  expect(await element(by.className('mobile-preview-headline')).getText()).to.be.equal('This is a test string!');
});

// Verifiying that sub-headline message field takes null value
Given(/^7_that I am on the shake the tree creation page.$/, async () => {
  await PageShakeTheTree.navigateToShakeTheTree();
  await browser.sleep(3000);

});

When(/^7_I entered a empty text string in the sub-headline text box.$/, async () => {
  await element(by.css('input#mat-input-2')).clear();
  await element(by.css('input#mat-input-2')).sendKeys(' ');
});

Then(/^7_the empty string entered is reflected in the preview element.$/, async () => {
  expect(await element(by.className('mobile-preview-sub-headline')).getText()).to.be.equal('');
});

// Verifiying that sub-headline message is reflected in the preview element
Given(/^8_that I am on the shake the tree creation page.$/, async () => {
  await PageShakeTheTree.navigateToShakeTheTree();
  await browser.sleep(3000);
});

When(/^8_I entered a pseudo random text string in the sub-headline text box.$/, async () => {
  await element(by.css('input#mat-input-2')).clear();
  await element(by.css('input#mat-input-2')).sendKeys('This is a test string!');
});

Then(/^8_the random string entered is reflected in the preview element.$/, async () => {
  expect(await element(by.className('mobile-preview-sub-headline')).getText()).to.be.equal('This is a test string!');
});

//  Verifiying that button text message message field takes null value
Given(/^9_that I am on the shake the tree creation page.$/, async () => {
  await PageShakeTheTree.navigateToShakeTheTree();
  await browser.sleep(3000);
});

When(/^9_I entered a empty text string in the button text message box.$/, async () => {
  await element(by.css('input#mat-input-3')).clear();
  await element(by.css('input#mat-input-3')).sendKeys(' ');
});

Then(/^9_the empty string entered is reflected in the preview element.$/, async () => {
  expect(await element(by.className('mobile-preview-btn')).getText()).to.be.equal('');
});

// Verifiying that button text message is reflected in the preview element
Given(/^10_that I am on the shake the tree creation page.$/, async () => {
  await PageShakeTheTree.navigateToShakeTheTree();
  await browser.sleep(3000);
});

When(/^10_I entered a pseudo random text string in the button text box.$/, async () => {
  await element(by.css('input#mat-input-3')).clear();
  await element(by.css('input#mat-input-3')).sendKeys('This is a test string!');
});

Then(/^10_the random string entered is reflected in the preview element.$/, async () => {
  expect(await element(by.className('mobile-preview-btn')).getText()).to.be.equal('This is a test string!');
});

// Verifiying that header message is not reflected in the preview element
Given(/^11_that I am on the shake the tree creation page.$/, async () => {
  await PageShakeTheTree.navigateToShakeTheTree();
  await browser.sleep(3000);
});

When(/^11_I entered a pseudo random text string in the engagement title text box.$/, async () => {
  await element(by.css('input#mat-input-0')).clear();
  await element(by.css('input#mat-input-0')).sendKeys('This is a test string!');
});

Then(/^11_the random string entered is not reflected in the preview element.$/, async () => {
  // verifying that string is not present in the headline
  expect(await element(by.className('mobile-preview-headline')).getText()).to.be.not.equal('This is a test string!');
  // verifying that string is not present in the sub-headline
  expect(await element(by.className('mobile-preview-sub-headline')).getText()).to.be.not.equal('This is a test string!');
  // verifying that string is not present in the button text
  expect(await element(by.className('mobile-preview-btn')).getText()).to.be.not.equal('This is a test string!');
});

// Verifying that the tree design choice is reflected in the preview element
Given('12_that I am on the shake the tree creation page.', async () => {
  await PageShakeTheTree.navigateToShakeTheTree();
  await browser.sleep(3000);

});

When(/^12_you select one of the the tree design.$/, async () => {
// clicking the second tree
 await element.all(by.tagName('cl-images-preview')).get(1).click();
 });

Then(/^12_that selected tree design is reflected in the preview element.$/, async () => {
  const TreeElement = element(by.className('tree__img ng-star-inserted'));
  // Doing an assertion on the src attribute
  expect(await TreeElement.getAttribute('src')).to.contain('assets/images/tree/full_tree_2.png');

  });

// Verifying that the background design choice is reflected in the preview element

Given(/^13_that I am on the shake the tree creation page.$/, async () =>  {
  await PageShakeTheTree.navigateToShakeTheTree();
  await browser.sleep(3000);
});

When(/^13_you select one of the the background design.$/, async () => {
  // clicking on the third option for the background image
  await element.all(by.tagName('cl-images-preview')).last().click();
});

Then(/^13_that selected background design design is reflected in the preview element.$/, async () => {
  const BkgrdElement = element(by.className('mobile-preview-background'));
  // Doing an assertion on the src attribute
  expect(await BkgrdElement.getAttribute('style')).to.contain('assets/images/background/full_bg_3.jpg');
});

// Verifying the choice of gift amount is reflected in the preview element
Given(/^14_that I am on the shake the tree creation page.$/, async () => {
  await PageShakeTheTree.navigateToShakeTheTree();
  await browser.sleep(3000);
});

When(/^14_you select one of the options for the gift amount$/, async () => {
  // selecting the dropdown list and clicking it
  await element(by.className('mat-select-trigger')).click();
  // selecting the 4 gifts option
  await element.all(by.className('mat-option ng-star-inserted')).get(1).click();
});

Then(/^14_the selected amount would be present in the preview element.$/, async () => {
    expect(await element.all(by.css('img.gift-img')).count()).to.be.equal(4);
});

// Verifying the choice of gift design is reflected in the preview element
Given(/^15_that I am on the shake the tree creation page.$/, async () => {
  await PageShakeTheTree.navigateToShakeTheTree();
  await browser.sleep(3000);
  });

When(/^15_I click on the gift design of my choics$/, async () => {
    // selecting the second option for gift design
    await element.all(by.className('image-wrap')).get(4).click();
});

Then(/^15_The preview element should reflect my choice.$/, async () => {
   const giftElement = element(by.className('gift-img gift-img__1 ng-star-inserted'));
   // doing an asssertion base on the url in src
   expect(await giftElement.getAttribute('src')).to.contain('assets/images/gifts/state2.png');
  });
