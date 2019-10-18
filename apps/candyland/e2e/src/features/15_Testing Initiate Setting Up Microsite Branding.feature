Feature: 15_Testing Initiate Setting Up Microsite Branding

This will be the test flow for all the features for customizing microsite branding.

Scenario: Ensure that setting tab is present
  Given 1_I am on dashboard page
  When  1_I do nothing
  Then  1_The setting tab should be present.

Scenario: Ensure that clicking on the settings tab leads to the general settings page
  Given 2_I am on dashboard page
  When  2_I click on the settings tab
  Then  2_I should be navigated to the general settings page.

Scenario: Ensure that settings page have relevant element
  Given 3_I am on the general settings page
  When  3_I do nothing
  Then  3_I should see the relevant elements for general settings page.
