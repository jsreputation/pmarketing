Feature: 23_Testing Initiate creation of instant reward engagement.

This will be the test flow for all the features of instant rewards engagement type.

Scenario: Ensure that instant reward engagement type option is present.
  Given 1_I am on engagement page
  When  1_I click on the create new button
  Then  1_The instant reward option should be present.

Scenario: Ensure that selecting the instant reward option and clicking next navigates to instant reward template creation.
  Given 2_I am on engagement page
  And   2_I click on the create new button
  And   2_I click on the instant reward option
  When  2_I click next button on the engagement dialog.
  Then  2_I should be navigated to the instant reward page.

Scenario: Ensure that instant reward page have relevant elements
  Given 3_I am on the hit the pinata creation page.
  When  3_I do nothing
  Then  3_I should see the relevant elements for instant reward.
