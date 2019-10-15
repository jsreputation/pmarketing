Feature: 26_Testing Flow of setting timezone and currency option

This will be the test flow for setting up timezone and currency option.

Scenario: Ensure the options for timezone is correct
  Given 1_I am on general setting page
  When  1_I click on the timezone dropdown list
  Then  1_The number of options should be correct for timezone.

Scenario: Ensure the options for currency field is correct
  Given 2_I am on general setting page
  When  2_I click on the currency dropdown list
  Then  2_The number of options should be correct for currency.

Scenario: Ensure that the settings for timezone and currency remain constant after navigating to another tab
  Given 3_I am on general setting page
  And   3_I select an option for timezone
  And   3_I select an option for currency
  And   3_I click on the engagement tab
  When  3_I click on the setting tab
  Then  3_I should see that the settings remains unchanged.

Scenario: Ensure that the settings for timezone and currency remain constant after re-login
  Given 4_I am on general setting page
  And   4_I select an option for timezone
  And   4_I select an option for currency
  And   4_I logout of candyland
  And   4_I re-login
  When  4_I click on the settings button.
  Then  4_I should see that the settings remains unchanged.
