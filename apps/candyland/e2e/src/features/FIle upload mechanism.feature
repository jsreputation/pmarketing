Feature: FIle upload mechanism

Testing the file upload mechanism affecting preview image. Testing the assertions on the
file upload as well.

Scenario: Successful file upload for gift box
  Given 1_I am on the shake a tree game creation page
  When  1_I upload a file
  Then  1_The file uploaded is present in the upload field under the gift box category .

Scenario: Successful file upload for background image
  Given 2_I am on the shake a tree game creation page
  When  2_I upload a file
  Then  2_The file uploaded is present in the upload field under the background category.

Scenario: Wrong file upload for gift box
  Given 3_I am on the shake a tree game creation page
  When  3_I upload a file with wrong format
  Then  3_my file should not be successfully uploaded.

Scenario: Wrong file upload for background image
  Given 4_I am on the shake a tree game creation page
  When  4_I upload a file with wrong format
  Then  4_my file should not be successfully uploaded.

Scenario: Successful file upload for gift box reflected in preview image
  Given 5_that I am on the shake the tree creation page
  When  5_I upload a file with the appropriate format for gift box
  Then  5_gift box design reflects the file upload.

Scenario: Successful file upload for background reflected in preview image
  Given 6_that I am on the shake the tree creation page
  When  6_I upload a file with the appropriate format for background
  Then  6_background reflects the file upload.
