Feature: 33_Creation of loyalty programme_loyalty details form

Scenario: Ensure that the relvant text fields are present
  Given 5_I am on the loyalty creation page - loyalty details form.
  When  5_I do nothing.
  Then  5_I should see the relevant text fields present.

Scenario: Ensure that null value not accepted when transaction amount checkbox is ticked
  Given 6_I am on the loyalty creation page - loyalty details form.
  When  6_I click on the transaction amount checkbox.
  And   6_I input a null value in thetransaction amount.
  Then  6_I see the error message for transaction amount.

Scenario: Ensure functionality of file upload field
  Given 7_I am on the loyalty creation page - loyalty details form.
  When  7_I upload a jpg file in the file upload field
  Then  7_I can see the file uploaded.

Scenario: Ensure that there are assertions for the file upload field
  Given 8_I am on the loyalty creation page - loyalty details form.
  When  8_I upload a file that that does not have accepted format
  Then  8_I should see an error message

Scenario: Ensure that the user joing method field is essential
  Given 9_I am on the loyalty creation page - loyalty details form.
  When  9_I uncheck all the the checkboxes for user joining method.
  Then  9_I should see the error message for user joining method.

Scenario: Ensure that the select audience dropdown field is present
  Given 10_I am on the loyalty creation page - loyalty details form.
  When  10_I do nothing
  Then  10_I should see the drop down field for audience.
