Feature: Login functionality

The acceptance criteria:
1. Able to log in with correct credential.
2. Unable to log in with the incorrect credentials.
3. Message prompt to user when there is an unsuccessful login.

Scenario: Login with correct credentials
  Given 31_I am on the login page
  When  31_I enter the right credentials
  Then  31_I am able to login successfully

Scenario: Login with incorrect username
  Given 32_I am on the login page
  When  32_I entered the incorrect username with the valid p/w
  Then  32_I am not able to login.

Scenario: Login with incorrect p/w
  Given 33_I am on the login page.
  When  33_I entered the correct email and invalid p/w
  Then  33_I am not able to login.

Scenario: Login with incorrect accountId
  Given 34_I am on the login page.
  When  34_I entered the correct email and p/w with invalid accountId
  Then  34_I am not able to login.

Scenario: Verifying presence of message prompt to user.
  Given 35_I am on the login page.
  When  35_I entered the correct email and invalid p/w
  Then  35_I see the message prompt for invalid login
