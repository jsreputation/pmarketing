Feature: FIle upload mechanism

Testing the file upload mechanism affecting preview image. Testing the assertions on the
file upload as well.

Scenario: Successful file upload for gift box
  Given 21_I am on the shake a tree game creation page
  When  21_I upload a file
  Then  21_The file uploaded is present in the upload field under the gift box category .

Scenario: Successful file upload for background image
  Given 22_I am on the shake a tree game creation page
  When  22_I upload a file
  Then  22_The file uploaded is present in the upload field under the background category.

Scenario: Wrong file upload for gift box
  Given 23_I am on the shake a tree game creation page
  When  23_I upload a file with wrong format
  Then  23_my file should not be successfully uploaded.

Scenario: Wrong file upload for background image
  Given 24_I am on the shake a tree game creation page
  When  24_I upload a file with wrong format
  Then  24_my file should not be successfully uploaded.

Scenario: Successful file upload for gift box reflected in preview image
  Given 25_that I am on the shake the tree creation page
  When  25_I upload a file with the appropriate format for gift box
  Then  25_gift box design reflects the file upload.

Scenario: Successful file upload for background reflected in preview image
  Given 26_that I am on the shake the tree creation page
  When  26_I upload a file with the appropriate format for background
  Then  26_background reflects the file upload.
