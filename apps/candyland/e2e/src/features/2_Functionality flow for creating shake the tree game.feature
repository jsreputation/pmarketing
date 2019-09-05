Feature: Functionality flow for creating shake the tree game

The acceptance criteria:
1. The two options for the enagagement games are present.
2. Relevant fields are present: engagement title,headline message,
sub-healine message,total number of gifts,button text.
3. Preview image reflects customer choice of customization.
4. Shake the tree game is successfully created.

Scenario: Ensure that both options of engagment games is visible to customer
  Given 6_I am on the customer engagment dialog box
  When  6_I click on the games option
  Then  6_The two options for the games are present.

Scenario: Verifying the correct url when page redirects to template page.
  Given 7_I am on the engagement creation dialog box
  When  7_I click the next button
  Then  7_the page should be redirected to the correct url.

Scenario: Verifying that the relevant input text fields are present.
  Given 8_that I am on the shake the tree creation page
  When  8_I do nothing
  Then  8_The relevant text input fields are present.

Scenario: Verifying the presence of the preview element.
  Given 9_that I am on the shake the tree creation page
  When  9_I do nothing
  Then  9_the preview section element is present.

Scenario: Verifiying that headline message field takes null value
  Given 10_that I am on the shake the tree creation page.
  When  10_I entered a empty text string in the headline text box.
  Then  10_the empty string entered is reflected in the preview element.

Scenario: Verifiying that headline message is reflected in the preview element
  Given 11_that I am on the shake the tree creation page.
  When  11_I entered a pseudo random text string in the headline text box.
  Then  11_the random string entered is reflected in the preview element.

Scenario: 7_Verifiying that sub-headline message field takes null value
  Given 12_that I am on the shake the tree creation page.
  When  12_I entered a empty text string in the sub-headline text box.
  Then  12_the empty string entered is reflected in the preview element.

Scenario: Verifiying that sub-headline message is reflected in the preview element
  Given 13_that I am on the shake the tree creation page.
  When  13_I entered a pseudo random text string in the sub-headline text box.
  Then  13_the random string entered is reflected in the preview element.

Scenario: Verifiying that button text message message field takes null value
  Given 14_that I am on the shake the tree creation page.
  When  14_I entered a empty text string in the button text message box.
  Then  14_the empty string entered is reflected in the preview element.

Scenario: Verifiying that button text message is reflected in the preview element
  Given 15_that I am on the shake the tree creation page.
  When  15_I entered a pseudo random text string in the button text box.
  Then  15_the random string entered is reflected in the preview element.

Scenario: Verifiying that engagement title text is not reflected in the preview element
  Given 16_that I am on the shake the tree creation page.
  When  16_I entered a pseudo random text string in the engagement title text box.
  Then  16_the random string entered is not reflected in the preview element.

Scenario: Verifying that the tree design choice is reflected in the preview element
  Given 17_that I am on the shake the tree creation page.
  When  17_you select one of the the tree design.
  Then  17_that selected tree design is reflected in the preview element.

Scenario: Verifying that the background design choice is reflected in the preview element
  Given 18_that I am on the shake the tree creation page.
  When  18_you select one of the the background design.
  Then  18_that selected background design design is reflected in the preview element.

Scenario: Verifying the choice of gift amount is reflected in the preview element
  Given 19_that I am on the shake the tree creation page.
  When  19_you select one of the options for the gift amount
  Then  19_the selected amount would be present in the preview element.

Scenario: Verifying the choice of gift design is reflected in the preview element
  Given 20_that I am on the shake the tree creation page.
  When  20_I click on the gift design of my choics
  Then  20_The preview element should reflect my choice.







