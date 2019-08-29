Feature: Initiate creation of engagement campaign

The acceptance criteria:
1. The 4 types of engagement options present: survey, games , instant rewards and stamp.
2. Dialog box present when customer taps on create new button.
3. Engagements tab visible to customer
4. Engagment options are clickable.

Scenario: Engagements tab is visible to customer.
  Given 1_I am on the dashboard page.
  When  1_I take no action.
  Then  1_I should see the engagment tab.

Scenario: Clicking on the Engagment tabs leads to the engagment page.
  Given 2_that I am on the dashboard page.
  When  2_I click on the engagement tab.
  Then  2_I will be redirected to the the engagment page.

Scenario: Dialog present when customer clicks on create new button.
  Given 3_that i am at the engagement page.
  When  3_I click on the create new button.
  Then  3_the dialg box is present.

Scenario: The four engagment options are present.
  Given 4_I am on the create engagement option dialog
  When  4_I do nothing.
  Then  4_There are 4 engagement options available.

Scenario: Client is able interact with the engagement campaign options
  Given 5_I am on the create option dialog box.
  When  5_I click on the stamps option.
  Then  5_The stamp option is highlighted.
