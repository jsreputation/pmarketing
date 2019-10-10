Feature: 24_Functionality flow for instant reward engagement

This will be the test flow for all the features of instant reward type.

Scenario: Ensure functionality of headline and and sub-headline message
  Given 4_I am on the hit the instant reward creation page
  When  4_I input a test string in the headlline and sub headline field.
  Then  4_I should see the test string in the preview element.

Scenario: Verifying the fucnctionality of the game graphic options
  Given 5_I am on the hit the instant reward creation page
  When  5_I select an option for the card and the background.
  Then  5_I should see the change in the preview element.

Scenario: Verifying the functionality of the file upload field for hit the pinata.
  Given 6_I am on the hit the instant reward creation page.
  When  6_I upload a card background and a background img file.
  Then  6_I should see the background and card background in the preview element.

 Scenario: Verifying the functionality of button text field
  Given 7_I am on the hit the instant reward creation page.
  When  7_I input a test string on the message
  Then  7_I should see the change in the preview element.
