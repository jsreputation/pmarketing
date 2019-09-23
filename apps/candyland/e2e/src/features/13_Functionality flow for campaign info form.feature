Feature: Functionality flow for campaign info form.

This is to test the flow for creating survey. Prioritization of test cases
will be on prudential features. Will enhance test coverage in the later run.

Scenario: Verifying that the relevant input text fields are present.
  Given 13_that I am on the campaign info page
  When  13_I do nothing
  Then  13_The relevant text input fields are present.

Scenario: Verifying the number of options for channel .
  Given 14_that I am on the campaign info page.
  When  14_I do nothing
  Then  14_I should see two options.

Scenario: Verifying the number of options for campaign goal .
  Given 15_that I am on the campaign info page.
  When  15_I click on the campaign goal
  Then  15_I should see five options.

Scenario: Verifying that functionality of audience upload form
  Given 16_that I am on the campaign info page.
  When  16_I upload a csv file
  Then  16_I should see file successfully updated.

Scenario: Verifying that functionality of launch button
  Given 17_that I am on the campaign review page.
  When  17_I click on the launch button.
  Then  17_I should see url link for campaign.

Scenario: Verifiying that the relevant elements in the campaign review page
  Given 18_that I am on the campaign review page.
  When  18_I do nothing .
  Then  18_I should see the relevant elements on the campaign review page.
