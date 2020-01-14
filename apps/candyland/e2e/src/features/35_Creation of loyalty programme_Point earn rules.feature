Feature: 35_Creation of loyalty programme_Point earn rules

Scenario: Ensure that points earn rules page have relevant elements
  Given 28_I am on the loyalty creation page - points earn rules form.
  When  28_I do nothing.
  Then  28_I should see the relevant elements for points earn rules page.

Scenario: Ensure functionality of create new rule button
  Given 29_I am on the loyalty creation page - points earn rules form.
  When  29_I click on the create new rule button
  Then  29_I should see the add rule dialog box

Scenario: Ensure that the rule name field generates error message when having null value.
  Given 30_I am on the add rule dialog box
  When  30_I input a null value in the rule name field
  Then  30_I should see error message

Scenario: Ensure functionality of add another subcondition button
  Given 31_I am on the loyalty creation page - points earn rules form.
  When  31_I click on the add another subcondition button
  And   31_I choose first option
  Then  31_I should see the subcondition was added

Scenario: Ensure functionality of remove subcondition button
  Given 31_I am on the loyalty creation page - points earn rules form.
  And   31_I click on the add another subcondition button
  And   31_I choose first option
  When  31_I click on the remove subcondition button
  Then  31_I should see the subcondition was removed

Scenario: Ensure that null value not accepted when bonus points is selected.
  Given 32_I am on the add rule dialog box
  When  32_I input a null value in the award field
  Then  32_I should see error message

Scenario: Ensure that char value not accepted when bonus points is selected.
  Given 33_I am on the add rule dialog box
  When  33_I input a char value in the award field
  Then  33_I should see award field is empty

Scenario: Ensure that null value not accepted when multiplier is selected.
  Given 34_I am on the add rule dialog box
  And   34_I select multiplier option
  When  34_I input a null value in the apply field
  Then  34_I should see error message

Scenario: Ensure that char value not accepted when multiplier is selected.
  Given 35_I am on the add rule dialog box
  And   35_I select multiplier option
  When  35_I input a char value in the apply field
  Then  35_I should see award field is empty

Scenario: Ensure functionality of cancel button
  Given 36_I am on the add rule dialog box
  When  36_I click on the cancel button
  Then  36_Rule is not present in the points earn rules table

Scenario: Successful creation of rule
  Given 37_I am on the add rule dialog box
  When  37_I input a test string in the rule name field
  And   37_I click on the save button
  Then  37_I should see rule in the points earn rules table
