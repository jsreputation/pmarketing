Feature: 32_Initiate creation of loyalty program

This is for testing flow for initiating the creation of the loyalty program.

Scenario: Ensuring the the loyalty tab is present.
  Given 1_I am on the dashboard page
  When  1_do nothing
  Then  1_I should see the loyalty tab.

Scenario: Ensuring that the loyalty tab is functional
  Given 2_I am on the the dashboard page
  When  2_I click on the loyalty tab.
  Then  2_I should be navigated to the loyalty page.

Scenario: Ensure that instant reward page have relevant elements
  Given 3_I am on the loyalty page
  When  3_I do nothing
  Then  3_I should see the relevant elements of the loyalty page.

Scenario: Ensure the functionality of the create new loyalty button
  Given 4_I am on the loyalty page
  When  4_I click on the new button
  Then  4_I should be navigated to the the loyalty creation page.
