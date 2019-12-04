Feature: 31_Testing Blackcomb account page functionality for survey engagement.

This is for testing for account page in blackcomb.

Scenario: Ensuring presence of account tab on the navigation bar.
  Given 19_I am at the blackcomb wallet page
  When  19_I do nothing
  Then  19_The account tab should be present.

Scenario: Ensuring the functionality of the account tab on the navigation bar
  Given 20_I am at the blackcomb wallet page
  When  20_I click on the account tab
  Then  20_I should be directed to the account page

Scenario: Ensuring the relevant elements of the account page is present
  Given 21_I am at the blackcomb account page
  When  21_I click on the history tab
  Then  21_I should see the contact us link and  t&c link.

Scenario: Ensuring the contact us link is functional
  Given 22_I am at the blackcomb account page
  When  22_I click on the contact us link
  Then  22_I should be navigated to the contact page

Scenario: Ensuring the t and c link is functional
  Given 23_I am at the blackcomb account page
  When  23_I click on the t and c link
  Then  23_I should be navigatd to the t and c page

Scenario: Ensuring the relevant elements of the t and c page is present.
  Given 23_I am at the blackcomb account page
  When  23_I click on the t and c link
  Then  23_I should see the relevant elements for t and c page.

Scenario: Ensuring the relevant elements of the contact us page is present.
  Given 24_I am at the blackcomb account page
  When  24_I click on the contact us link.
  Then  24_I should see the relevant link for the contact us page.
