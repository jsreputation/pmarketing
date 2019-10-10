Feature: End to End flow for successful creation of hit the pinata engagment

This will be the test flow for all the features of hit the pinata engagement type.

Scenario: Verifying successful creation of hit the pinata engagment
  Given 8_I am on engagement page
  And   8_I click on the create new button
  And   8_I click on the game option.
  And   8_I select hit the pinata option
  And   8_I click on the next button
  And   8_I enter a test string in the headline message and sub-headline message
  And   8_I upload a background image.
  And   8_I click on the save button.
  When  8_I click on an option in the engagment dialog box.
  Then  8_I should see the game created.
