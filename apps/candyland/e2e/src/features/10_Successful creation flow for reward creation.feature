Feature: Successful creation flow for reward creation

This is to test the flow for creating survey. Prioritization of test cases
will be on prudential features. Will enhance test coverage in the later run.


Scenario: Successful creation of survey engagement
  Given 18_I am on the rewards page.
  And   18_I click on create new button.
  And   18_I click on option for reward type.
  And   18_I click on option for category.
  And   18_I click on option for redemption type.
  And   18_I enter a test string for description.
  And   18_I enter a test string for T&Cs.
  And   18_I select an existing merchant.
  And   18_I enter a value for cost of reward.
  And   18_I select user upload option for unique codes.
  And   18_I select upload a csv file under unique codes.
  And   18_I enter a valid date range for voucher validity.
  And   18_I enter test values for Voucher Limits Per Campaign.
  And   18_I enter test values for Issuance Limits Per User.
  And   18_I enter test values for Redemption Limits Per User.
  When  18_I press save button.
  Then  18_Reward is present under the reward category .
