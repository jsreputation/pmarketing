Feature: Functionality flow for creating shake the tree game

The acceptance criteria:
1. The two options for the enagagement games are present.
2. Relevant fields are present: engagement title,headline message,
sub-healine message,total number of gifts,button text.
3. Preview image reflects customer choice of customization.
4. Shake the tree game is successfully created.

Scenario: 1_Ensure that both options of engagment games is visible to customer
  Given 1_I am on the customer engagment dialog box
  When  1_I click on the games option
  Then  1_The two options for the games are present.

Scenario: 2_Verifying the correct url when page redirects to template page.
  Given 2_I am on the engagement creation dialog box
  When  2_I click the next button
  Then  2_the page should be redirected to the correct url.

Scenario: 3_Verifying that the relevant input text fields are present.
  Given 3_that I am on the shake the tree creation page
  When  3_I do nothing
  Then  3_The relevant text input fields are present.

Scenario: 4_Verifying the presence of the preview element.
  Given 4_that I am on the shake the tree creation page
  When  4_I do nothing
  Then  4_the preview section element is present.

Scenario: Verifiying that headline message field takes null value
  Given 5_that I am on the shake the tree creation page.
  When  5_I entered a empty text string in the headline text box.
  Then  5_the empty string entered is reflected in the preview element.

Scenario: Verifiying that headline message is reflected in the preview element
  Given 6_that I am on the shake the tree creation page.
  When  6_I entered a pseudo random text string in the headline text box.
  Then  6_the random string entered is reflected in the preview element.

Scenario: 7_Verifiying that sub-headline message field takes null value
  Given 7_that I am on the shake the tree creation page.
  When  7_I entered a empty text string in the sub-headline text box.
  Then  7_the empty string entered is reflected in the preview element.

Scenario: Verifiying that sub-headline message is reflected in the preview element
  Given 8_that I am on the shake the tree creation page.
  When  8_I entered a pseudo random text string in the sub-headline text box.
  Then  8_the random string entered is reflected in the preview element.

Scenario: Verifiying that button text message message field takes null value
  Given 9_that I am on the shake the tree creation page.
  When  9_I entered a empty text string in the button text message box.
  Then  9_the empty string entered is reflected in the preview element.

Scenario: Verifiying that button text message is reflected in the preview element
  Given 10_that I am on the shake the tree creation page.
  When  10_I entered a pseudo random text string in the button text box.
  Then  10_the random string entered is reflected in the preview element.

Scenario: Verifiying that engagement title text is not reflected in the preview element
  Given 11_that I am on the shake the tree creation page.
  When  11_I entered a pseudo random text string in the engagement title text box.
  Then  11_the random string entered is not reflected in the preview element.

Scenario: Verifying that the tree design choice is reflected in the preview element
  Given 12_that I am on the shake the tree creation page.
  When  12_you select one of the the tree design.
  Then  12_that selected tree design is reflected in the preview element.

Scenario: Verifying that the background design choice is reflected in the preview element
  Given 13_that I am on the shake the tree creation page.
  When  13_you select one of the the background design.
  Then  13_that selected background design design is reflected in the preview element.

Scenario: Verifying the choice of gift amount is reflected in the preview element
  Given 14_that I am on the shake the tree creation page.
  When  14_you select one of the options for the gift amount
  Then  14_the selected amount would be present in the preview element.

Scenario: Verifying the choice of gift design is reflected in the preview element
  Given 15_that I am on the shake the tree creation page.
  When  15_I click on the gift design of my choics
  Then  15_The preview element should reflect my choice.







