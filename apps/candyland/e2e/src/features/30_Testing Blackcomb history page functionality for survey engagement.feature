Feature: 30_Testing Blackcomb history page functionality for survey engagement.

This is for testing the blackcomb history page.

Scenario: Ensuring functionality of history tab
  Given 16_I am at the blackcomb wallet page
  When  16_I click on the history tab
  Then  16_I should be navigated history page

Scenario: Ensuring the presence of the history tab on the navigation bar
  Given 17_I am at the blackcomb wallet page
  When  17_I do nothing
  Then  17_I should see the history tab in the nav bar

Scenario: Ensuring the relevant elements of the page is present
  Given 18_I am at the blackcomb wallet page
  When  18_I click on the history tab
  Then  18_I should see the my history header on the history page
