Feature: Functionality flow for creating survey campaign.

This is to test the flow for creating survey. Prioritization of test cases
will be on prudential features. Will enhance test coverage in the later run.
@runThis
Scenario: Ensure that survey template is present under the campaign page
  Given 5_I am on the campaign creation page
  When  5_I search for survey template in the search bar
  Then  5_I should see the survey template.
@runThis
Scenario: Verifying that the relevant input text fields are present.
  Given 6_that I am on the campaign creation page
  When  6_I do nothing
  Then  6_The relevant text input fields are present for campaign rewards and limits page.
@runThis
Scenario: Verifying the add rewards button.
  Given 7_that I am on the campaign creation page.
  When  7_I do nothing.
  Then  7_I should see the add rewards button on campaign creation page.
@runThis
Scenario: Verifying the elements present when clicking add rewards.
  Given 8_that I am on the campaign creation page.
  When  8_I click on add rewards.
  Then  8_I should see the necessary elements present like the search bar and appropriate title.

@runThis
Scenario: Verifying that functionality of add rewards button.
  Given 9_that I am on the campaign creation page.
  And   9_I select add rewards button
  And   9_I select a reward.
  When  9_I select the add reward button
  Then  9_I should see reward added to rewards list.
@runThis
Scenario: Verifiying functionality of include probablity box
  Given 10_that I am on the campaign creation page.
  And   10_I added a reward to the reward list.
  When  10_I click on the include probability box
  Then  10_I should be able to input interger string in the probability field
@runThis
Scenario: Verifiying that the presence of include probablity box
  Given 11_that I am on the campaign creation page.
  When  11_I do nothing .
  Then  11_I should see include probablity box.
@runThis
Scenario: Verifiying that the functionality of the next button
  Given 12_that I am on the campaign creation page.
  When  12_I click on the next button on campaign creation page
  Then  12_I should see be in the campaign info card.
