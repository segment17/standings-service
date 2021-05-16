const TestFunctions = require('../TestFunctions');
const globalObjects = require('../../index');
const assert = require('assert');

class DefaultScenarioTester {

  constructor(scenario) {
    this.scenario = scenario;
  }

  // Special Before Scenario Function
  before() {
    globalObjects.reset();
    globalObjects.resetResult();
    globalObjects.setScenario(this.scenario);
    if (!TestFunctions.isScenarioE2E(this.scenario) && !TestFunctions.isScenarioIntegration(this.scenario)) {
      // If it's not E2E or Integration, it means everything is mocked.
      globalObjects.mock();
      globalObjects.client.Mock({}, (err, res) => {
        globalObjects.done = true;
      });
    } else {
      globalObjects.done = true;
    }
  }

  endpointIsCalledWithRequestBody(endpoint, requestBodySource) {
    this.endpoint = endpoint;
    const requestBody = TestFunctions.extractSpecifiedObjectData(requestBodySource);
    assert(requestBody != undefined);
    assert(endpoint != undefined);
    if (endpoint == "GetStandingAndMatchesOfBoxer") {
      globalObjects.client.GetStandingAndMatchesOfBoxer(requestBody, function (err, res) {
        globalObjects.result = res;
      });
    } else {
      console.log("Endpoint not found!");
      assert(false);
    }
  }

  endpointIsCalled(endpoint) {
    this.endpoint = endpoint;
    assert(endpoint != undefined);
    if (endpoint == "GetAllStandings") {
      globalObjects.client.GetAllStandings(null, function (err, res) {
        globalObjects.result = res;
      });
    } else {
      console.log("Endpoint not found!");
      assert(false);
    }
  }

  compareBoxers(actual, expected) {
    assert.strictEqual(actual.id, expected.id);
    assert.strictEqual(actual.fullName, expected.fullName);
    assert.strictEqual(actual.height, expected.height);
    assert.strictEqual(actual.weight, expected.weight);
    assert(actual.birthDate == expected.birthDate);
  }

  compareStanding(actual, expected) {
    if (expected.boxerId != undefined && expected.boxerId != null) {
      assert.strictEqual(actual.boxerId, expected.boxerId);
      assert.strictEqual(actual.winCount, expected.winCount);
      assert(actual.lossCount == expected.lossCount);
      assert(actual.score == expected.score);
    }
  }

  compareStandings(actual, expected) {
    for(let index in expected) {
      this.compareStanding(actual[index], expected[index]);
    }
  }

  async responseIsAs(expectedResponseSource) {
    const expectedResponse = TestFunctions.extractSpecifiedObjectData(expectedResponseSource);
    await TestFunctions.waitUntilResult();

    const response = globalObjects.result;
    assert.strictEqual(response.code, expectedResponse.code);
    assert(response.message === expectedResponse.message);
    if(expectedResponse.standings) {
      this.compareStandings(response.standings.sort((a, b) => a.boxerId - b.boxerId), expectedResponse.standings.sort((a, b) => a.boxerId - b.boxerId));
    }


    if (this.endpoint == "GetStandingAndMatchesOfBoxer") {
      this.compareMatches(response.standingAndMatches.matches, expectedResponse.standingAndMatches.matches);
      this.compareStanding(response.standingAndMatches.standing, expectedResponse.standingAndMatches.standing);
    }
    
  }

  compareMatches(response, expected) {
    for (let i = 0; i < response.length; i++) {
      const rMatch = response[i];
      const eMatch = expected[i];
      this.compareTwoMatches(rMatch, eMatch);
    }
  }

  compareTwoMatches(responseMatch, expectedMatch) {
    assert.strictEqual(responseMatch.id, expectedMatch.id);
    assert.strictEqual(responseMatch.homeBoxerId, expectedMatch.homeBoxerId);
    assert.strictEqual(responseMatch.awayBoxerId, expectedMatch.awayBoxerId);
    assert(responseMatch.matchTime = expectedMatch.matchTime);
    if (expectedMatch.winnerBoxerId) {
      assert.strictEqual(responseMatch.winnerBoxerId, expectedMatch.winnerBoxerId);
    }
  }

  async thereAreMatchesSuchAs(dataSource) {
    const matches = TestFunctions.extractSpecifiedObjectData(dataSource);
    await globalObjects.client.SetupAddMatches({matches: matches}, function (err, res) {
      globalObjects.done = true;
    });
  }

  async thereIsABoxerSuchAs(dataSource) {
    const specifiedBoxer = TestFunctions.extractSpecifiedObjectData(dataSource);
    await globalObjects.client.SetupAddBoxer({boxer: specifiedBoxer}, function (err, res) {
      globalObjects.done = true;
    });
  }

  async thereAreBoxersSuchAs(dataSource) {
    const boxers = TestFunctions.extractSpecifiedObjectData(dataSource);
    await globalObjects.client.SetupAddBoxers({boxers: boxers}, function (err, res) {
      globalObjects.done = true;
    });
  }
}

module.exports = DefaultScenarioTester;