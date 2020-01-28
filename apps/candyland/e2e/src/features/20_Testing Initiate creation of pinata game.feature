Feature:Testing Initiate creation of pinata game.

This will be the test flow for all the features of hit the pinata engagement type.

Scenario: Ensure that hit the pinata engagement type option is present.
  Given 1_I am on engagement page
  And   1_I click on the create new button
  When  1_I Click on the game option.
  Then  1_The hit the pinata game should be present.

Scenario: Ensure that selecting the hit the pinata option and clicking next navigates to template creation.
  Given 2_I am on engagement page
  And   2_I click on the create new button
  And   2_I Click on the game option.
  And   2_I click on hit the pinata option
  When  2_I click next
  Then  2_I should be navigated to the hit the pinata page.

Scenario: Ensure that hit the pinata page have relevant elements
  Given 3_I am on the hit the pinata creation page.
  When  3_I do nothing
  Then  3_I should see the relevant elements for hit the pinata creation page.
