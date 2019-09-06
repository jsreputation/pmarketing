Feature:Successful creation flow of engagement game shake the tree.

This will test the flow of successfully creating an engagement shake the tree game .

Scenario: Successful creation of engagement game shake the tree - launch now
  Given 27_I am on the engagment page.
  And   27_I click on create new button.
  And   27_I click on games button.
  And   27_I click on shake the tree.
  And   27_I click on the next button.
  And   27_I type the test string
  And   27_I press save button
  When  27_I press launch now button
  Then  27_Game is present under the engagment category .

Scenario: Successful creation of engagement game shake the tree - launch later
  Given 28_I am on the engagment page.
  And   28_I click on create new button.
  And   28_I click on games button.
  And   28_I click on shake the tree.
  And   28_I click on the next button.
  And   28_I type the test string
  And   28_I press save button
  When  28_I press launch later button
  Then  28_Game is present under the engagment category .

Scenario: Dialog box present when save button is pressed
  Given 29_I am on the shake a tree game creation page
  When  29_I press the save button
  Then  29_The file dialog box is present.

Scenario: Dialog box has 2 options present when save button is pressed.
  Given 30_I am on the shake a tree game creation page
  When  30_I press the save button
  Then  30_Both options are present.


