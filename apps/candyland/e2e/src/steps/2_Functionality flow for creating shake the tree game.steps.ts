import { Before, Given, Then, When } from 'cucumber';
import { expect } from 'chai';
import { browser, protractor, ProtractorExpectedConditions } from 'protractor';
import { EngagementAppPage, CreateShakeTheTreeAppPage, ElementApp, LoginAppPage } from '../pages/candylandApp.po';
// initializing page objects variables
let PageEngagement: EngagementAppPage;
let PageShakeTheTree: CreateShakeTheTreeAppPage;
const Element = ElementApp;
const ec: ProtractorExpectedConditions = protractor.ExpectedConditions;

Before( () => {
  // initializing page objects instances
  PageEngagement = new EngagementAppPage();
  PageShakeTheTree = new CreateShakeTheTreeAppPage();

});
// Scenario: Ensure that both options of engagment games is visible to customer
Given(/^6_I am on the customer engagment dialog box$/, async () => {
  // login process
  await LoginAppPage.navigateToLogin();
  // Waiting for account id field to load
  await browser.wait(ec.elementToBeClickable(LoginAppPage.accountIDField()), 5000);
  // entering correct account id
  await LoginAppPage.accountIDField().sendKeys(LoginAppPage.getAccountId());
  // entering correct testUserAccount
  await LoginAppPage.userAccountField().sendKeys(LoginAppPage.getUserAccount());
  // entering correct pw
  await LoginAppPage.pwField().sendKeys(LoginAppPage.getPassword());
  // pressing the enter key on the accountID field to log in
  await LoginAppPage.accountIDField().sendKeys(protractor.Key.ENTER);
  await browser.sleep(3000);
  await PageEngagement.navigateToEngagement();
  await browser.sleep(3000);
  // await element(by.className('btn mat-flat-button primary')).click();
  // await browser.sleep(1000);

});

When(/^6_I click on the games option$/,  async () => {
  await browser.wait(ec.elementToBeClickable(PageShakeTheTree.shakeTreeGamesButton()), 5000);
  // clicking on the create new button
  await PageShakeTheTree.shakeTreeGamesButton().click();
  await PageShakeTheTree.shakeTreeTypeOptions().click();
});

Then(/^6_The two options for the games are present.$/, async () => {
  expect(await PageShakeTheTree.firstPresentOption().count()).to.equal(3);
  expect(await PageShakeTheTree.secondPresentOption().getText()).to.equal('Select Engagement Type');
});

// Scenario: Verifying the correct url when page redirects to template page.
Given(/^7_I am on the engagement creation dialog box$/, async () => {
  await PageEngagement.navigateToEngagement();
  await browser.sleep(3000);
  // removing the walkme widget
  // await browser.executeScript('document.getElementById("walkme-player").remove()');
});

When(/^7_I click the next button$/, async () => {
  await browser.wait(ec.elementToBeClickable(PageShakeTheTree.shakeTreeGamesButton()), 5000);
  // clicking on the create new button
  await PageShakeTheTree.shakeTreeGamesButton().click();
  // clicking on the games option
  await PageShakeTheTree.shakeTreeTypeOptions().click();
  // clicking on the next button
  await Element.clButtonArray().get(2).click();
  await browser.sleep(3000);
  });

Then(/^7_the page should be redirected to the correct url.$/, async () => {
  expect(await browser.getCurrentUrl()).to.contain('new-shake');
});

// Verifying that the relevant input text fields are present.
Given(/^8_that I am on the shake the tree creation page$/, async () => {
  await PageShakeTheTree.navigateToShakeTheTree();
  // await browser.sleep(3000);
});

When(/^8_I do nothing$/, () => {});

Then('8_The relevant text input fields are present.', async () => {
  // waiting for element to load
  await browser.wait(ec.presenceOf(PageShakeTheTree.engagementTitleField()), 5000);
  await browser.wait(ec.presenceOf(PageShakeTheTree.headlineField()), 5000);
  await browser.wait(ec.presenceOf(PageShakeTheTree.subHeadlineField()), 5000);
  await browser.wait(ec.presenceOf(PageShakeTheTree.buttonTextField()), 5000);
  // Verifying whether engagement title text input exists
  expect(await PageShakeTheTree.engagementTitleField().isPresent()).to.equal(true);
  // Verifying whether headline message text input exists
  expect(await PageShakeTheTree.headlineField().isPresent()).to.equal(true);
  // Verifying whether sub-headline message text input exists
  expect(await PageShakeTheTree.subHeadlineField().isPresent()).to.equal(true);
  // Verifying whether button text input exists
  expect(await PageShakeTheTree.buttonTextField().isPresent()).to.equal(true);
});

// Verifying the presence of the preview element.
Given(/^9_that I am on the shake the tree creation page$/, async () => {
  await PageShakeTheTree.navigateToShakeTheTree();
  await browser.sleep(3000);
});

When(/^9_I do nothing$/, () => {});

Then(/^9_the preview section element is present.$/, async () => {
  // checking whether mobile preview exist
  expect(await browser.getCurrentUrl()).to.contain('new-shake');
  expect(await PageShakeTheTree.mobilePreviewCheck().isPresent()).to.equal(true);
});

// Verifiying that headline message field takes null value
Given(/^10_that I am on the shake the tree creation page.$/, async () => {
  await PageShakeTheTree.navigateToShakeTheTree();
  await browser.sleep(3000);
});

When(/^10_I entered a empty text string in the headline text box.$/, async () => {
  await PageShakeTheTree.headlineField().clear();
  await PageShakeTheTree.headlineField().sendKeys(protractor.Key.SPACE);

});

Then(/^10_the empty string entered is reflected in the preview element.$/, async () => {
  // waiting for preview headline to load
  await browser.wait(ec.presenceOf(PageShakeTheTree.shakeTreePreviewHeadline()), 6000);
  expect(await PageShakeTheTree.shakeTreePreviewEmptyHeadline().getText()).to.be.equal('');
});

// Verifiying that headline message is reflected in the preview element

Given(/^11_that I am on the shake the tree creation page.$/, async () => {
  await PageShakeTheTree.navigateToShakeTheTree();
  await browser.sleep(3000);
});

When(/^11_I entered a pseudo random text string in the headline text box.$/, async () => {
  await PageShakeTheTree.headlineField().clear();
  await PageShakeTheTree.headlineField().sendKeys('This is a test string!');
  await browser.sleep(3000);
});

Then(/^11_the random string entered is reflected in the preview element.$/, async () => {
  await browser.wait(ec.elementToBeClickable(PageShakeTheTree.shakeTreePreviewHeadline()), 6000);
  expect(await PageShakeTheTree.shakeTreePreviewHeadline().getText()).to.be.equal('This is a test string!');
});

// Verifiying that sub-headline message field takes null value
Given(/^12_that I am on the shake the tree creation page.$/, async () => {
  await PageShakeTheTree.navigateToShakeTheTree();
  await browser.sleep(3000);

});

When(/^12_I entered a empty text string in the sub-headline text box.$/, async () => {
  await PageShakeTheTree.subHeadlineField().clear();
  await PageShakeTheTree.subHeadlineField().sendKeys(' ');
});

Then(/^12_the empty string entered is reflected in the preview element.$/, async () => {
  expect(await PageShakeTheTree.shakeTreePreviewSubHeadline().getText()).to.be.equal('');
});

// Verifiying that sub-headline message is reflected in the preview element
Given(/^13_that I am on the shake the tree creation page.$/, async () => {
  await PageShakeTheTree.navigateToShakeTheTree();
  await browser.sleep(3000);
});

When(/^13_I entered a pseudo random text string in the sub-headline text box.$/, async () => {
  await PageShakeTheTree.subHeadlineField().clear();
  await PageShakeTheTree.subHeadlineField().sendKeys('This is a test string!');
  await browser.sleep(3000);
});

Then(/^13_the random string entered is reflected in the preview element.$/, async () => {
  await browser.wait(ec.elementToBeClickable(PageShakeTheTree.shakeTreePreviewSubHeadline()), 6000);
  expect(await PageShakeTheTree.shakeTreePreviewSubHeadline().getText()).to.be.equal('This is a test string!');
});

//  Verifiying that button text message message field takes null value
Given(/^14_that I am on the shake the tree creation page.$/, async () => {
  await PageShakeTheTree.navigateToShakeTheTree();
  await browser.sleep(3000);
});

When(/^14_I entered a empty text string in the button text message box.$/, async () => {
  await PageShakeTheTree.buttonTextField().clear();
  await PageShakeTheTree.buttonTextField().sendKeys(' ');
});

Then(/^14_the empty string entered is reflected in the preview element.$/, async () => {
  expect(await PageShakeTheTree.shakeTreePreviewButton().getText()).to.be.equal('');
});

// Verifiying that button text message is reflected in the preview element
Given(/^15_that I am on the shake the tree creation page.$/, async () => {
  await PageShakeTheTree.navigateToShakeTheTree();
  await browser.sleep(3000);
});

When(/^15_I entered a pseudo random text string in the button text box.$/, async () => {
  await PageShakeTheTree.buttonTextField().clear();
  await PageShakeTheTree.buttonTextField().sendKeys('This is a test string!');
  await browser.sleep(3000);
});

Then(/^15_the random string entered is reflected in the preview element.$/, async () => {
  await browser.wait(ec.elementToBeClickable(PageShakeTheTree.shakeTreePreviewButton()), 6000);
  expect(await PageShakeTheTree.shakeTreePreviewButton().getText()).to.be.equal('This is a test string!');
});

// Verifiying that header message is not reflected in the preview element
Given(/^16_that I am on the shake the tree creation page.$/, async () => {
  await PageShakeTheTree.navigateToShakeTheTree();
  await browser.sleep(3000);
});

When(/^16_I entered a pseudo random text string in the engagement title text box.$/, async () => {
  await PageShakeTheTree.engagementTitleField().clear();
  await PageShakeTheTree.engagementTitleField().sendKeys('This is a test string!');
});

Then(/^16_the random string entered is not reflected in the preview element.$/, async () => {
  // verifying that string is not present in the headline
  expect(await PageShakeTheTree.shakeTreePreviewHeadline().getText()).to.be.not.equal('This is a test string!');
  // verifying that string is not present in the sub-headline
  expect(await PageShakeTheTree.shakeTreePreviewSubHeadline().getText()).to.be.not.equal('This is a test string!');
  // verifying that string is not present in the button text
  expect(await PageShakeTheTree.shakeTreePreviewButton().getText()).to.be.not.equal('This is a test string!');
});

// Verifying that the tree design choice is reflected in the preview element
Given('17_that I am on the shake the tree creation page.', async () => {
  await PageShakeTheTree.navigateToShakeTheTree();
  await browser.sleep(3000);
  // making the header position absolute.
  await browser.executeScript('document.querySelector("header.page-header.full-with").style.position = "absolute"');

});

When(/^17_you select one of the the tree design.$/, async () => {
// clicking the second tree
 await PageShakeTheTree.shakeTreeDesign().click();
 });

Then(/^17_that selected tree design is reflected in the preview element.$/, async () => {
  const TreeElement = PageShakeTheTree.treeDesignPreview();
  const previewTreeElementRegex = /full_tree_2.png/;
  // Doing an assertion on the src attribute
  expect(await TreeElement.getAttribute('src')).to.match(previewTreeElementRegex);

  });

// Verifying that the background design choice is reflected in the preview element

Given(/^18_that I am on the shake the tree creation page.$/, async () =>  {
  await PageShakeTheTree.navigateToShakeTheTree();
  await browser.sleep(3000);
});

When(/^18_you select one of the the background design.$/, async () => {
  // clicking on the third option for the background image
  await PageShakeTheTree.shakeTreeBackgroundDesign().click();
});

Then(/^18_that selected background design design is reflected in the preview element.$/, async () => {
  const BkgrdElement = PageShakeTheTree.shakeTreePreviewBackground();
  const previewBkgrdElementRegex = /full_bg_6.jpg/;
  // Doing an assertion on the src attribute
  expect(await BkgrdElement.getAttribute('style')).to.match(previewBkgrdElementRegex);
});

// Verifying the choice of gift amount is reflected in the preview element
Given(/^19_that I am on the shake the tree creation page.$/, async () => {
  await PageShakeTheTree.navigateToShakeTheTree();
  await browser.sleep(3000);
});

When(/^19_you select one of the options for the gift amount$/, async () => {
  // selecting the dropdown list and clicking it
  await PageShakeTheTree.dropdownList().click();
  // selecting the 4 gifts option
  await PageShakeTheTree.selectOption().click();
});

Then(/^19_the selected amount would be present in the preview element.$/, async () => {
    expect(await PageShakeTheTree.selectedAmountPreview().count()).to.be.equal(4);
});

// Verifying the choice of gift design is reflected in the preview element
Given(/^20_that I am on the shake the tree creation page.$/, async () => {
  await PageShakeTheTree.navigateToShakeTheTree();
  await browser.sleep(3000);
  });

When(/^20_I click on the gift design of my choics$/, async () => {
    // selecting the second option for gift design
    await PageShakeTheTree.giftDesign().click();
});

Then(/^20_The preview element should reflect my choice.$/, async () => {
   const giftElement = PageShakeTheTree.previewMyChoice();
   // doing an assertion base on the url in src
   expect(await giftElement.getAttribute('src')).to.contain('assets/game/gift2.png');
  });
