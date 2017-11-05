Feature: Todo API
  As todo api
  I want to be able to get, post, update and delete todos

  Scenario Outline: Add a new to-do task (GET and POST Todo)
    Given I get a list of to-dos
    And I delete all the existing to-do tasks
    When I add a new task with title <title>
    Then I should get a response with an id, title <title> and a task resolved status as <taskResolvedStatus>

    Examples:
      | taskResolvedStatus | title    |
      | false              | Buy Milk |

  Scenario Outline: Update a to-do task (PUT Todo)
    Given I get a list of to-dos
    And I delete all the existing to-do tasks
    And I add a new task with title <title>
    When I update a task and resolve it
    Then I should get a response with an id, title <title> and a task resolved status as <taskResolvedStatus>

    Examples:
      | taskResolvedStatus | title         |
      | true               | Buy Chocolate |

  Scenario: Delete a to-do task (DELETE Todo)
    Given I get a list of to-dos
    And I delete all the existing to-do tasks
    And I get a list of to-dos
    Then the list is empty

