@Integration @Gateway @MatchServiceGateway
Feature: Match Service Gateway Integration Feature

  #SUCCESS SCENARIOS

  @Unit_MatchServiceGateway_Scenario1 @H2
  Scenario Outline: Get all matches from Match Service Gateway
    Given there are boxers such as "<boxers>"
    And there are matches such as "<matches>"
    When "<gateway_function>" is invoked
    Then returned data is as "<expected_data>"

    Examples:
      | boxers                                    | matches                                    | gateway_function | expected_data                                    |
      | Unit_MatchServiceGateway_Scenario1.boxers | Unit_MatchServiceGateway_Scenario1.matches | getAllMatches    | Unit_MatchServiceGateway_Scenario1.expected_data |


  @Unit_MatchServiceGateway_Scenario2 @B1
  Scenario Outline: Get matches of boxer from Match Service Gateway
    Given there are boxers such as "<boxers>"
    And there are matches such as "<matches>"
    When "<gateway_function>" is invoked with "<boxer_id>"
    Then returned data is as "<expected_data>"

    Examples:
      | boxers                                    | matches                                    | gateway_function  | boxer_id                                    | expected_data                                    |
      | Unit_MatchServiceGateway_Scenario2.boxers | Unit_MatchServiceGateway_Scenario2.matches | getMatchesOfBoxer | Unit_MatchServiceGateway_Scenario2.boxer_id | Unit_MatchServiceGateway_Scenario2.expected_data |

  #FAIL SCENARIOS

  @Unit_MatchServiceGateway_Scenario3 @B1
  Scenario Outline: Get matches of boxer from Match Service Gateway failure
    Given there are boxers such as "<boxers>"
    And there are matches such as "<matches>"
    When "<gateway_function>" is invoked with "<boxer_id>"
    Then returned data is as "<expected_data>"

    Examples:
      | boxers                                          | matches                                          | gateway_function  | boxer_id                                          | expected_data                                          |
      | Unit_MatchServiceGateway_Scenario3_Fail1.boxers | Unit_MatchServiceGateway_Scenario3_Fail1.matches | getMatchesOfBoxer | Unit_MatchServiceGateway_Scenario3_Fail1.boxer_id | Unit_MatchServiceGateway_Scenario3_Fail1.expected_data |
