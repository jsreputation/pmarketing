Feature: 18_Functionality flow for adding audience.

This will be the test flow for all the features for creation of audience.

Scenario: Ensure functionality of the add user button.
  Given 4_I am on the audience page.
  When  4_I click on the add user button.
  Then  4_I should see the add audience dialog box.

Scenario: Verifying that the essential fields are present.
  Given 5_that I am on add audience dialog box.
  When  5_I do nothing.
  Then  5_The essential fields are present for add audience engagement dialog.

Scenario: Verifying the number of options for add to audience list dropdown.
  Given 6_that I am on add audience dialog box.
  When  6_I click on the add to audience list.
  Then  6_The number of options is correct.

Scenario: Verifying the assertion of the email address field.
  Given 7_that I am on add audience dialog box.
  When  7_I input a non email address
  Then  7_I should see a error message.

 Scenario: Verifying the assertion of the essential fields.
  Given 8_that I am on add audience dialog box.
  When  8_I input null values for the essential fields
  Then  8_I should see a error message.
