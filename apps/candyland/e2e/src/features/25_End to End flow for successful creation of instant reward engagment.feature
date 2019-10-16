Feature: 25_End to End flow for successful creation of instant reward engagment

This will be the test flow for all the features of instant reward engagement type.

Scenario: Verifying successful creation of instant reward engagment
  Given 8_I am on engagement page
  And   8_I click on the create new button
  And   8_I click on the instant reward option.
  And   8_I click on the next button
  And   8_I enter a test string in the headline message and sub-headline message for instant reward.
  And   8_I upload a background image for card background and background.
  And   8_I click on the save button.
  When  8_I click on an option in the engagment dialog box.
  Then  8_I should see the instant reward created.
