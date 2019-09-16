Feature: Functionality flow for reward creation file upload.

This is to test the flow for creating survey. Prioritization of test cases
will be on prudential features. Will enhance test coverage in the later run.

Scenario: Verifiying file upload field for reward creation
  Given 14_that I am on reward creation page
  When  14_I do nothing
  Then  14_I should see the file upload field.

Scenario: Verifiying file upload field functionality
  Given 15_that I am on reward creation page
  When  15_I upload a file
  Then  15_File uploaded successfully.

Scenario: Verifiying file upload assertions
  Given 16_that I am on reward creation page
  When  16_I upload a file with an inappropriate format
  Then  16_File uploaded unsuccessfully.

Scenario: Verifiying file upload functionality for user upload codes
  Given 17_that I am on reward creation page
  And   17_I select user upload option for unique codes
  When  17_I upload a file
  Then  17_File uploaded successfully.

Scenario: Verifiying file upload assertion for user upload codes
  Given 18_that I am on reward creation page
  And   18_I select user upload option for unique codes
  When  18_I upload a non csv file
  Then  18_File uploaded unsuccessfully.

