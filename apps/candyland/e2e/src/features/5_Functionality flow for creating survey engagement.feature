Feature: Functionality flow for creating survey engagement.

This is to test the flow for creating survey. Prioritization of test cases
will be on prudential features. Will enhance test coverage in the later run.

Scenario: Ensure that clicking the survey button leads to survey creation page
  Given 1_I am on the customer engagment dialog box
  When  1_I click on the survey option
  Then  1_the page should be redirected to the correct url.

Scenario: Verifying that the relevant input text fields are present.
  Given 2_that I am on the survey creation page
  When  2_I do nothing
  Then  2_The relevant text input fields are present.

Scenario: Verifying the presence of the preview element.
  Given 3_that I am on the survey creation page
  When  3_I do nothing
  Then  3_the preview section element is present.

Scenario: Verifiying that headline message field generates error message when having null value.
  Given 4_that I am on the survey creation page
  When  4_I entered a empty text string in the headline text box.
  Then  4_There is an error message present.

Scenario: Verifiying that sub-headline message field generates error message when having null value.
  Given 5_that I am on the survey creation page
  When  5_I entered a empty text string in the sub-headline text box.
  Then  5_There is an error message present.

Scenario: Verifiying that add question button element exists.
  Given 6_that I am on the survey creation page
  When  6_I do nothing
  Then  6_The Add question button is present.

Scenario: Verifiying that when clicking add question button element generates a list of seven options.
  Given 7_that I am on the survey creation page
  When  7_I click on the add question button.
  Then  7_There are seven options.

Scenario: Verifiying that when clicking add picture choice list element generates a form.
  Given 8_that I am on list of options for the add question elements
  When  8_I select the option for picture choice.
  Then  8_There is a form present.

Scenario: Verifiying that picture choice form has relevant text fields
  Given 9_that I have selected added question picture choice
  When  9_I do nothing
  Then  9_The relevant text fields are present.

Scenario: Verifiying that the image is uploaded in the picture choice form successfully
  Given 10_that I am on the picture choice form
  When  10_I upload a file
  Then  10_File is uploaded successfully.

Scenario: Verifiying that header message field generates error message when having null value.
  Given 11_that I am on the survey creation page
  When  11_I entered a empty text string in the header text box.
  Then  11_There is an error message present.
