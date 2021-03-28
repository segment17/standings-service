@E2E
Feature: Standings Service E2E Features

  Background: Prepare Services
    Given "StandingsService" is running
    And "MatchService" is running

  @H2 @H2_Scenario1
  Scenario Outline: Get all standings
    Given there are boxers such as "<boxers>"
    And there are matches such as "<matches>"
    And there are standings such as "<standings>"
    When "<endpoint>" is called
    Then response is as "<expected_response>"

    Examples:
      | boxers                         | matches                         | standings                         | endpoint        | expected_response                         |
      | H2_Scenario1_Variation1.boxers | H2_Scenario1_Variation1.matches | H2_Scenario1_Variation1.standings | GetAllStandings | H2_Scenario1_Variation1.expected_response |

  @B1 @B1_Scenario1
  Scenario Outline: Get standing and matches of a boxer
    Given there is a boxer such as "<boxer>"
    And there are matches such as "<matches>"
    And there is a standing such as "<standing>"
    When "<endpoint>" is called with "<request_body>"
    Then response is as "<expected_response>"

    Examples:
      | boxer                         | matches                         | standing                         | endpoint                       | request_body                         | expected_response                         |
      | B1_Scenario1_Variation1.boxer | B1_Scenario1_Variation1.matches | B1_Scenario1_Variation1.standing | GetStandingAndMatchesOfBoxer | B1_Scenario1_Variation1.request_body | B1_Scenario1_Variation1.expected_response |

