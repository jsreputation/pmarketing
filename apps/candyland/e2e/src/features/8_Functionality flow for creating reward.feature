Feature: Functionality flow for creating reward.

This is to test the flow for creating survey. Prioritization of test cases
will be on prudential features. Will enhance test coverage in the later run.


Scenario: Verifying that the relevant input text fields are present.
  Given 6_that I am on the reward creation page
  When  6_I do nothing
  Then  6_The relevant text input fields are present.

Scenario: Verifying the number of options in reward type.
  Given 7_that I am on the reward creation page.
  When  7_I click on reward type.
  Then  7_I should see eight options.

Scenario: Verifying the number of options in categories.
  Given 8_that I am on the reward creation page.
  When  8_I click on categories.
  Then  8_I should see eight options.

Scenario: Verifying the number of options in redemption types.
  Given 9_that I am on the reward creation page.
  When  9_I click on redemption type.
  Then  9_I should see four options.

Scenario: Verifiying that there is an upload field when clicking on the option user upload
  Given 10_that I am on the reward creation page.
  When  10_I click on the user upload button.
  Then  10_There should be an upload field.

Scenario: Verifiying that the slider functionality is working for voucher limits per campaign
  Given 11_that I am on the reward creation page.
  When  11_I click on the slider .
  Then  11_I should be type a value in the voucher field and select the frequency.

Scenario: Verifiying that the slider functionality is working for issuance limits per user
  Given 12_that I am on the reward creation page.
  When  12_I click on the slider .
  Then  12_I should be able to type a value in the times field and select the frequency.

Scenario: Verifiying that the slider functionality is working for redemption limits per user
  Given 13_that I am on the reward creation page.
  When  13_I click on the slider .
  Then  13_I should be able to type a value in the times field and select the frequency.
