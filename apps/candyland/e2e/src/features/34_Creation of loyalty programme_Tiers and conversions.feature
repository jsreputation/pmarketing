Feature: 34_Creation of loyalty programme_Tiers and conversions

Scenario: Ensure that tiers and conversions page have relevant elements
  Given 11_I am on the loyalty creation page - tiers and conversions form.
  When  11_I do nothing.
  Then  11_I should see the relevant elements for tiers and conversions page.

Scenario: Ensure functionality of the create new tier button.
  Given 12_I am on the loyalty creation page - tiers & conversions form.
  When  12_I click on the create new tier button.
  Then  12_I should see the tier setup dialog box.

Scenario: Ensure that the essential fields are present.
  Given 13_I am on the tier setup dialog box.
  When  13_I do nothing.
  Then  13_The essential fields are present for the tier setup dialog.

Scenario: Ensure functionality of file upload field
  Given 14_I am on the tier setup dialog box.
  When  14_I upload a jpg file in the file upload field.
  Then  14_I can see the file uploaded.

Scenario: Ensure that there are assertions for the file upload field
  Given 15_I am on the tier setup dialog box.
  When  15_I upload a file that that does not have accepted format
  Then  15_I should see an error message

Scenario: Verifying that tier's name field generates error message when having null value.
  Given 16_I am on the tier setup dialog box.
  When  16_I input a null value in the tier's name field.
  Then  16_I should see error message.

Scenario: Successful creation of tier
  Given 17_I am on the tier setup dialog box.
  And   17_I enter a test string for tier's name
  And   17_I upload a file
  When  17_I click on the save button
  Then  17_Tier is present in the tiers table
