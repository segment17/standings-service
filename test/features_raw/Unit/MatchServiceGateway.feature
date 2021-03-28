@Unit @Gateway @MatchServiceGateway
Feature: Match Service Gateway Unit Feature

  #SUCCESS SCENARIOS

  @Unit_MatchServiceGateway_Scenario1
  Scenario Outline: Get all matches from Match Service Gateway
    Given there are boxers such as "<boxers>"
    And there are matches such as "<matches>"
    When "<gateway_function>" is invoked
    Then returned data is as "<expected_data>"

    Examples:
      | boxers                                    | matches                                    | gateway_function             | expected_data                                    |
      | Unit_MatchServiceGateway_Scenario1.boxers | Unit_MatchServiceGateway_Scenario1.matches | getStandingAndMatchesOfBoxer | Unit_MatchServiceGateway_Scenario1.expected_data |


  @Unit_MatchServiceGateway_Scenario2
  Scenario Outline: Get matches of boxer from Match Service Gateway
    Given there is a boxer such as "<boxer>"
    And there are matches such as "<matches>"
    When "<gateway_function>" is invoked with "<boxer_id>"
    Then returned data is as "<expected_data>"

    Examples:
      | boxer                                    | matches                                    | gateway_function             | boxer_id                                    | expected_data                                    |
      | Unit_MatchServiceGateway_Scenario2.boxer | Unit_MatchServiceGateway_Scenario2.matches | getStandingAndMatchesOfBoxer | Unit_MatchServiceGateway_Scenario2.boxer_id | Unit_MatchServiceGateway_Scenario2.expected_data |

  #FAIL SCENARIOS

  @Unit_MatchServiceGateway_Scenario3
  Scenario Outline: Get all matches from Match Service Gateway failure
    Given there are boxers such as "<boxers>"
    And there are matches such as "<matches>"
    When "<gateway_function>" is invoked
    Then returned data is as "<expected_data>"

    Examples:
      | boxers                                          | matches                                          | gateway_function             | expected_data                                          |
      | Unit_MatchServiceGateway_Scenario3_Fail1.boxers | Unit_MatchServiceGateway_Scenario3_Fail1.matches | getStandingAndMatchesOfBoxer | Unit_MatchServiceGateway_Scenario3_Fail1.expected_data |


  @Unit_MatchServiceGateway_Scenario4
  Scenario Outline: Get matches of boxer from Match Service Gateway failure
    Given there is a boxer such as "<boxer>"
    And there are matches such as "<matches>"
    When "<gateway_function>" is invoked with "<boxer_id>"
    Then returned data is as "<expected_data>"

    Examples:
      | boxer                                          | matches                                          | gateway_function             | boxer_id                                          | expected_data                                          |
      | Unit_MatchServiceGateway_Scenario4_Fail1.boxer | Unit_MatchServiceGateway_Scenario4_Fail1.matches | getStandingAndMatchesOfBoxer | Unit_MatchServiceGateway_Scenario4_Fail1.boxer_id | Unit_MatchServiceGateway_Scenario4_Fail1.expected_data |
