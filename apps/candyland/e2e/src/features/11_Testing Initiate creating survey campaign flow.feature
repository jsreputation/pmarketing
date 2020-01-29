Feature: Testing Initiate creating survey campaign flow.

This is to test the flow for creating rewards. Prioritization of test cases
will be on prudential features. Will enhance test coverage in the later run.

Scenario: Ensure that campaign tab is present
  Given 1_I am on dashboard page
  When  1_I do nothing
  Then  1_The campaign tab should be present.

Scenario: Ensure that clicking on the campaign tab leads to the campaign page
  Given 2_I am on dashboard page
  When  2_I click on the campaign tab
  Then  2_I should be navigated to the campaign page.

Scenario: Ensure that campaign page have relevant element
  Given 3_I am on the campaign page
  When  3_I do nothing
  Then  3_I should see the relevant elements.

Scenario: Ensure that create new campaign button is functional
  Given 4_I am on the campaign page
  When  4_I click on the create new button
  Then  4_I should be on the create new campaign page.
