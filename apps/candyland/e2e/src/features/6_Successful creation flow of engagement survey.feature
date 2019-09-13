Feature:Successful creation flow of engagement survey.

This will test the flow of successfully creating an engagement survey .

Scenario: Successful creation of survey engagement
  Given 12_I am on the engagment page.
  And   12_I click on create new button.
  And   12_I click on survey option.
  And   12_I click on the next button.
  And   12_I type the test string.
  When  12_I press save button.
  Then  12_Game is present under the engagment category .
