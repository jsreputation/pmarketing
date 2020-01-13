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

Scenario: Ensure that null value not accepted when points threshold checkbox is ticked
  Given 17_I am on the tier setup dialog box.
  When  17_I click on the points threshold checkbox.
  And   17_I input a null value in the points threshold
  Then  17_I see the error message for points threshold

Scenario: Ensure that the qualification criteria field is essential
  Given 18_I am on the tier setup dialog box.
  When  18_I uncheck all the the checkboxes for qualification criteria.
  Then  18_I should see the error message for qualification criteria.

Scenario: Ensure that points threshold field generates error message when having null value.
  Given 19_I am on the tier setup dialog box.
  When  19_I click on the points threshold checkbox.
  And   19_I input a null value in the points threshold
  Then  19_I should see error message

Scenario: Ensure that the points threshold field do not accept char values
  Given 19_I am on the tier setup dialog box.
  When  19_I click on the points threshold checkbox.
  And   19_I input a char value in the points threshold
  Then  19_I should see points threshold field is empty

Scenario: Ensure that accelerated earn for tier field generates error message when having null value.
  Given 20_I am on the tier setup dialog box.
  When  20_I input a null value in the accelerated earn for tier
  Then  20_I should see error message

Scenario: Ensure that accelerated earn for tier field do not accept char values
  Given 21_I am on the tier setup dialog box.
  When  21_I input a char value in the accelerated earn for tier
  Then  21_I should see accelerated earn for tier field is empty

Scenario: Ensure that accelerated burn rule field generates error message when having null value.
  Given 22_I am on the tier setup dialog box.
  When  22_I input a null value in the accelerated burn rule
  Then  22_I should see error message

Scenario: Ensure that accelerated burn rule field do not accept char values
  Given 23_I am on the tier setup dialog box.
  When  23_I input a char value in the accelerated burn rule
  Then  23_I should see accelerated burn rule field is empty

Scenario: Ensure that points expire field generates error message when having null value.
  Given 24_I am on the tier setup dialog box.
  When  24_I input a null value in the points expire
  Then  24_I should see error message

Scenario: Ensure that points expire field do not accept char values
  Given 25_I am on the tier setup dialog box.
  When  25_I input a char value in the points expire
  Then  25_I should see points expire field is empty

Scenario: Ensure functionality of cancel button
  Given 26_I am on the tier setup dialog box.
  When  26_I click on the cancel button
  Then  26_Tier is not present in the tiers table

Scenario: Successful creation of tier
  Given 27_I am on the tier setup dialog box.
  And   27_I enter a test string for tier's name
  And   27_I upload a file
  When  27_I click on the save button
  Then  27_Tier is present in the tiers table
