Feature: 28_Testing Blackcomb wallet functionality for survey engagement.

This will be the test flow for new signs up for blackcomb wallet functionality.
@runThis
Scenario: Ensuring wallet has the relevant elements
  Given 6_I am  at the wallet blackcomb page
  When  6_I do nothing
  Then  6_I see the navigation bar
@runThis
Scenario: Ensuring functionality of stamp card
  Given 7_I am  at the wallet blackcomb page
  When  7_I click on the stamp card
  Then  7_I should be navigated to the stamp card page.
@runThis
Scenario: Ensuring functionality of voucher wallet
  Given 8_I am  at the wallet blackcomb page
  When  8_I click on a voucher
  Then  8_I should be navigated to voucher details page.
