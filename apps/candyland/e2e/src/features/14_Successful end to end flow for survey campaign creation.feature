Feature: Successful end to end flow for survey campaign creation

This is to test the flow for creating survey. Prioritization of test cases
will be on prudential features. Will enhance test coverage in the later run.

Scenario: Successful creation of survey campaign-launch now
  Given 19_I am on the campaign creation page.
  And   19_I click on the survey engagement.
  And   19_I click next on select engagement page.
  And   19_I click on the include probability checkbox
  And   19_I click next on rewards and limits
  And   19_I select sms for channel
  And   19_I enter a test string for the content field
  And   19_I upload an audience list
  And   19_I click on next on campaign details.
  When  19_I click on the launch button.
  Then  19_I can see the success dialog box with the url link .
