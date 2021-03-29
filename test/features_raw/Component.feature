@Component
Feature: Standings Service Component Features

  #SUCCESS SCENARIOS

  @H2 @H2_Scenario1
  Scenario Outline: Get all standings
    Given there are boxers such as "<boxers>"
    And there are matches such as "<matches>"
    When "<endpoint>" is called
    Then response is as "<expected_response>"

    Examples:
      | boxers                         | matches                         | endpoint        | expected_response                         |
      | H2_Scenario1_Variation1.boxers | H2_Scenario1_Variation1.matches | GetAllStandings | H2_Scenario1_Variation1.expected_response |

  @B1 @B1_Scenario1
  Scenario Outline: Get standing and matches of a boxer
    Given there is a boxer such as "<boxer>"
    And there are matches such as "<matches>"
    When "<endpoint>" is called with "<request_body>"
    Then response is as "<expected_response>"

    Examples:
      | boxer                         | matches                         | endpoint                     | request_body                         | expected_response                         |
      | B1_Scenario1_Variation1.boxer | B1_Scenario1_Variation1.matches | GetStandingAndMatchesOfBoxer | B1_Scenario1_Variation1.request_body | B1_Scenario1_Variation1.expected_response |

  #FAIL SCENARIOS

  @B1 @B1_Scenario2
  Scenario Outline: Get standing and matches of a boxer failure
    Given there is a boxer such as "<boxer>"
    And there are matches such as "<matches>"
    When "<endpoint>" is called with "<request_body>"
    Then response is as "<expected_response>"

    Examples:
      | boxer                    | matches                    | endpoint                     | request_body                    | expected_response                    |
      | B1_Scenario2_Fail1.boxer | B1_Scenario2_Fail1.matches | GetStandingAndMatchesOfBoxer | B1_Scenario2_Fail1.request_body | B1_Scenario2_Fail1.expected_response |