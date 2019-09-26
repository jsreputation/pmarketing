Feature: 19_End to End flow for successful creation of audience.

This will be the test flow for all the features for creation of audience.

Scenario: Verifying successful creation of user
  Given 9_I am on the audience page.
  And 	9_I click on the add user button
  And   9_I enter a value for first name ,last name ,email address and mobile number
  And 	9_I enter a value for race and nationality ,city and state
  And 	9_I select a country and a user category
  When  9_I click on the add button
  Then  9_I should see the user created.

Scenario: Verifying the functionality of manage list feature
  Given 10_I am on the audience page.
  And   10_I select a user
  And   10_I click on the manage list option
  When  10_i select an option for the audience list
  Then  10_I should see the change reflected for the user selected.
