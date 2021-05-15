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
    assert.strictEqual(actual, expected);
  }

  compareStandings(actual, expected) {
    for(let index in expected) {
      this.compareBoxers(actual[index].boxer, expected[index].boxer);
      assert.strictEqual(actual[index].winCount, expected[index].winCount);
      assert(actual[index].lossCount == expected[index].lossCount);
      assert(actual[index].score == expected[index].score);
    }
  }

  async responseIsAs(expectedResponseSource) {
    const expectedResponse = TestFunctions.extractSpecifiedObjectData(expectedResponseSource);
    await TestFunctions.waitUntilResult();

    const response = globalObjects.result;
    assert(response.code === expectedResponse.code);
    assert(response.message === expectedResponse.message);
    if(expectedResponse.standings) {
      this.compareStandings(response.standings.sort((a, b) => a.boxerId - b.boxerId), expectedResponse.standings.sort((a, b) => a.boxerId - b.boxerId));
    }
    if(expectedResponse.boxer) {
      this.compareBoxers(response.boxer, expectedResponse.boxer);
      assert(JSON.stringify(response.standingAndMatches.matches.sort()) == JSON.stringify(response.standingAndMatches.matches.sort()));
      assert(JSON.stringify(response.standingAndMatches.standing) == JSON.stringify(response.standingAndMatches.standing));
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