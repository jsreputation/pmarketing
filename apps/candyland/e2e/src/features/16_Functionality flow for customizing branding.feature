Feature: 16_Functionality flow for customizing branding.

This will be the test flow for all the features for customizing microsite branding.

Scenario: Ensure functionality of the branding tab
  Given 4_I am on the general settings page.
  When  4_I click on the branding tab
  Then  4_I should be on the branding setting tab.

Scenario: Verifying that the relevant fields are present.
  Given 5_that I am on the branding settings page.
  When  5_I do nothing.
  Then  5_The relevant fields are present for branding settings page.

Scenario: Verifying the presence of the preview element.
  Given 6_that I am on the settings branding page.
  When  6_I do nothing.
  Then  6_I should see the preview element.

Scenario: Verifying the functionality of font type on preview element
  Given 7_that I am on the settings branding page.
  When  7_I select the Lato option.
  Then  7_I should see the change reflected in the preview element

Scenario: Verifying the functionality of primary color field on preview element
  Given 8_that I am on the settings branding page.
  When  8_I select a color.
  Then  8_I should see the change reflected in the preview element

Scenario: Verifying the functionality of secondary color field on preview element
  Given 9_that I am on the settings branding page.
  When  9_I select a color.
  Then  9_I should see the change reflected in the preview element

Scenario: Verifying the functionality of logo header upload field
  Given 10_that I am on the settings branding page.
  When  10_I upload a picture.
  Then  10_I should see the change reflected in the preview element

Scenario: Verifying the assertions for logo header upload field
  Given 11_that I am on the settings branding page.
  When  11_I upload a non image file.
  Then  11_I should a message indicating this is an invalid file.

Scenario: Verifying the functionality of text header on preview element
  Given 12_that I am on the settings branding page.
  When  12_I input a test text string.
  Then  12_I should see the change reflected in the preview element
