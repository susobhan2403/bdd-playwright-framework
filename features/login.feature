@ui @smoke @login
Feature: Login functionality
  As a user
  I want to login to the application
  So that I can access the secure area

  Background:
    Given I navigate to the application

  Scenario: Successful login with valid credentials
    Given I am on the login page
    When I login with username "tomsmith" and password "SuperSecretPassword!"
    Then I should be redirected to the secure area

  Scenario: Failed login with invalid credentials
    Given I am on the login page
    When I login with username "tomsmith" and password "WrongPassword"
    Then I should see a flash message "Your password is invalid!"