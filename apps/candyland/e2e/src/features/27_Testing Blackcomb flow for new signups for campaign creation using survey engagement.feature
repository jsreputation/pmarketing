Feature: 27_Testing Blackcomb flow for new signups for campaign creation using survey engagement.

This will be the test flow for new signs up for blackcomb

Scenario: Inputting the url link leads to the webpage
  Given 1_I am on the launch page with the url generated
  When  1_Navigating to the webpage with the url generated
  Then  1_I should get a http 200 response

Scenario: Doing on the assertions on the url link generated
  Given 2_1_I am on the launch page with the url generated
  When  2_I do nothing
  Then  2_I should see the tenant id in the url link generated.

Scenario: Ensure that instant reward page have relevant elements
  Given 3_I am on the blackcomb page
  When  3_I do nothing
  Then  3_I should see the relevant elements of the blackcomb

Scenario: Ensure that instant reward page have relevant elements
  Given 4_I am on the blackcomb page
  When  4_I do nothing
  Then  4_I should see the correct survey options reflected to blackcomb.
