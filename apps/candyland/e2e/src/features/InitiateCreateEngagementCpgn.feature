Feature: Initiate creation of engagement campaign

The acceptance criteria:
1. The 4 types of engagement options present: survey, games , instant rewards and stamp.
2. Dialog box present when customer taps on create new button.
3. Engagements tab visible to customer
4. Engagment options are clickable.

Scenario: Engagements tab is visible to customer.
Given I am on the dashboard page.
When I take no action.
Then I should see the engagment tab.

Scenario: Clicking on the Engagment tabs leads to the engagment page.
Given that I am on the dashboard page.
When I click on the engagement tab.
Then I will be redirected to the the engagment page.

Scenario: Dialog present when customer clicks on create new button.
Given that i am at the engagement page.
When I click on the create new button.
Then the dialg box is present.

Scenario: The four engagment options are present.
Given I am on the create engagement option dialog
When I do nothing.
Then There are 4 engagement options available.

Scenario: Client is able interact with the engagement campaign options
Given I am on the create option dialog box
When i click on the stamps option.
Then  The stamp option is highlighted.
