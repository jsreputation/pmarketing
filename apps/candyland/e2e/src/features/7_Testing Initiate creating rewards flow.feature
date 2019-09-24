Feature: Testing Initiate creating rewards flow.

This is to test the flow for creating rewards. Prioritization of test cases
will be on prudential features. Will enhance test coverage in the later run.

Scenario: Ensure that reward tab is present
  Given 1_I am on dashboard page
  When  1_I do nothing
  Then  1_The reward tab should be present.
@runThis
Scenario: Ensure that clicking on the reward tab leads to the reward page
  Given 2_I am on dashboard page
  When  2_I click on the rewards tab
  Then  2_I should be navigated to the rewards page.

Scenario: Ensure that reward page have relevant element
  Given 3_I am on the reward page
  When  3_I do nothing
  Then  3_I should see the search bar ,reward list and create new button.

Scenario: Ensure that create new reward button is functional
  Given 4_I am on the reward page
  When  4_I click on the create new button
  Then  4_I should be on the create new reward page.

Scenario: Ensure that search bar is functional
  Given 5_I am on the reward page
  When  5_I enter a filter criteria
  Then  5_I should see the filter items on the list.
