Feature: Functionality flow for creating shake the tree game

The acceptance criteria:
1. The two options for the enagagement games are present.
2. Relevant fields are present: engagement title,headline message,
sub-healine message,total number of gifts,button text.
3. Preview image reflects customer choice of customization.
4. Shake the tree game is successfully created.

Scenario: Ensure that both options of engagment games is visible to customer
  Given I am on the customer engagment dialog box
  When  I click on the games option
  Then  The two options for the games are present.

Scenario: Verifying the correct url when page redirects to template page.
  Given I am on the engagement creation dialog box
  When  I click the next button
  Then  the page should be redirected to the correct url.

Scenario: Verifying that the relevant input text fields are present.
  Given that I am on the 'shake the tree' creation page
  When I do nothing
  Then The relevant text input fields are present.

Scenario: Verifying the presence of the preview element.
  Given that I am on the 'shake the tree' creation page
  When I do nothing
  Then the preview section element is present.

Scenario: Verifiying that headline message field takes null value
  Given that I am on the 'shake the tree' creation page.
  When I entered a empty text string in the headline text box.
  Then the empty string entered is reflected in the preview element.

Scenario: Verifiying that headline message is reflected in the preview element
  Given that I am on the 'shake the tree' creation page.
  When I entered a pseudo random text string in the headline text box.
  Then the random string entered is reflected in the preview element.

Scenario: Verifiying that sub-headline message field takes null value
  Given that I am on the 'shake the tree' creation page.
  When I entered a empty text string in the sub-headline text box.
  Then the empty string entered is reflected in the preview element.

Scenario: Verifiying that sub-headline message is reflected in the preview element
  Given that I am on the 'shake the tree' creation page.
  When  I entered a pseudo random text string in the sub-headline text box.
  Then  the random string entered is reflected in the preview element.

Scenario: Verifiying that button text message message field takes null value
  Given that I am on the 'shake the tree' creation page.
  When  I entered a empty text string in the button text message box.
  Then  the empty string entered is reflected in the preview element.

Scenario: Verifiying that button text message is reflected in the preview element
  Given that I am on the 'shake the tree' creation page.
  When  I entered a pseudo random text string in the button text box.
  Then  the random string entered is reflected in the preview element.

Scenario: Verifiying that header message is not reflected in the preview element
  Given that I am on the 'shake the tree' creation page.
  When  I entered a pseudo random text string in the header message text box.
  Then  the random string entered is not reflected in the preview element.

Scenario: Verifying that the tree design choice is reflected in the preview element
  Given that I am on the 'shake the tree' creation page.
  When  you select one of the the tree design.
  Then  that selected tree design is reflected in the preview element.

Scenario: Verifying that the background design choice is reflected in the preview element
  Given that I am on the 'shake the tree' creation page.
  When  you select one of the the background design.
  Then  that selected background design design is reflected in the preview element.

Scenario: Verifying the choice of gift is reflected in the preview element
  Given that I am on the 'shake the tree' creation page.
  When  you select one of the options for the gift amount
  Then  the selected amount would be present in the preview element.







