Feature: 17_Testing Initiate Audience adding audience flow

This will be the test flow for all the features for creation of audience.

Scenario: Ensure that audience tab is present
  Given 1_I am on dashboard page
  When  1_I do nothing
  Then  1_The audience tab should be present.

Scenario: Ensure that clicking on the audience tab leads to the audience page
  Given 2_I am on dashboard page
  When  2_I click on the audience tab
  Then  2_I should be navigated to the audience page.

Scenario: Ensure that audience page have relevant elements
  Given 3_I am on the audience page
  When  3_I do nothing
  Then  3_I should see the relevant elements for audience page.
