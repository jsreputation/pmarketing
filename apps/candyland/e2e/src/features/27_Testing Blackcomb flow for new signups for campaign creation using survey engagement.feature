Feature: 27_Testing Blackcomb flow for new signups for campaign creation using survey engagement.

This will be the test flow for new signs up for blackcomb
@runThis
Scenario: Inputting the url link leads to the webpage
  Given 1_I am on the launch page with the url generated
  When  1_Navigating to the webpage with the url generated
  Then  1_I should get a http 200 response
@runThis
Scenario: Doing on the assertions on the url link generated
  Given 2_I am on the launch page with the url generated
  When  2_I do nothing
  Then  2_I should see the tenant id in the url link generated.
@runThis
Scenario: Ensure that instant reward page have relevant elements
  Given 3_I am on the blackcomb page
  When  3_I do nothing
  Then  3_I should see the relevant elements of the blackcomb
@runThis
Scenario: Ensure that instant reward page have relevant elements
  Given 4_I am on the blackcomb page
  When  4_I do nothing
  Then  4_I should see the correct survey options reflected to blackcomb.
@runThis
Scenario: Ensure that url link works on a new window
  Given 5_I am on the campaign review page
  When  5_I clear all session tokens from tbe browser
  Then  5_I access blackcomb with the url generated.
