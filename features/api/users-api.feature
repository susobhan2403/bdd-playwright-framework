@api
Feature: Users API
  As a developer
  I want to validate the users API
  So that I can ensure it works as expected

  Scenario: Get user by ID
    Given I send a GET request to "/users/1"
    Then the response status code should be 200
    And the response body should contain "id": 1
    And the response body should contain "username"