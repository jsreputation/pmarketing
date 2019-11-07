Feature: 29_Testing Blackcomb home page functionality for survey engagement.
@runThis
Scenario: Ensuring home page has the relevant elements
  Given 9_I am at the blackcomb home page
  When  9_I do nothing
  Then  9_I see the welcome message ,relevant headers, qr button and category tabs.
@runThis
Scenario: Ensuring functionality of qr button.
  Given 10_I am at the blackcomb home page
  When  10_I click on the qr button
  Then  10_I should be navigated to the qr card page.
@runThis
Scenario: Ensuring qr page has the relevant elements.
  Given 11_I am at the blackcomb qr page.
  When  11_I do nothing
  Then  11_I should see the qr code and the message text below the qr code.
@runThis
Scenario: Ensuring functionality of cancel button for the qr code page
  Given 12_I am at the blackcomb qr page.
  When  12_I click on the cancel button
  Then  12_I should be navigated to blackcomb home page.
@runThis
Scenario: Ensuring functionality of rewards filter
  Given 13_I am at the blackcomb home page
  When  13_I click on a category
  Then  13_I should see the relevant rewards under the category.
@runThis
Scenario: Ensuring functionality of feature rewards card
  Given 14_I am at the blackcomb home page
  When  14_I click on a featured reward
  Then  14_I should be navigated to the reward description page
@runThis
Scenario: Ensuring functionality of rewards card
  Given 15_I am at the blackcomb home page
  When  15_I click on a reward under the all category
  Then  15_I should be navigated to the reward description page
