
const DefaultScenarioTester = require('../DefaultScenarioTester');
const TestFunctions = require('../../TestFunctions');
const globalObjects = require('../../..');
const assert = require('assert');

class MatchServiceGatewayScenarioTester extends DefaultScenarioTester {

  async thereIsAStandingAndMatchesSuchAs(dataSource) {
    const specifiedStandingAndMatches = TestFunctions.extractSpecifiedObjectData(dataSource);
    await globalObjects.standingsServiceGateway.setupAddStandingAndMatches(specifiedStandingAndMatches);
    globalObjects.done = true;
  }

  unitFunctionIsInvokedWithData(functionName, dataSource) {
    const specifiedData = TestFunctions.extractSpecifiedObjectData(dataSource);
    if (functionName == "getStandingAndMatchesOfBoxer") {
      globalObjects.standingsServiceGateway.getStandingAndMatchesOfBoxer(specifiedData).then(result => {

        globalObjects.result = result;
      });
    }
  }

  async returnedDataIsAs(dataSource) {
    const expectedData = TestFunctions.extractSpecifiedObjectData(dataSource);
    await TestFunctions.waitUntilResult();

    assert(globalObjects.result.code === undefined);
    assert(globalObjects.result.message === undefined);
    let standing = globalObjects.result.standing;
    assert(standing !== undefined && standing !== null);
    if(expectedData.standing.boxer === null) {
      assert(standing.boxer === null);
    } else {
      assert.strictEqual(standing.boxer.id, expectedData.standing.boxer.id);
    }
    assert.strictEqual(standing.winCount, expectedData.standing.winCount);
    assert.strictEqual(standing.lossCount, expectedData.standing.lossCount);
    assert.strictEqual(standing.score,  expectedData.standing.score);

    let matches = globalObjects.result.matches;
    assert(matches != undefined && matches != null);
    if(matches.length > 2) {
      for (let index = 0; index < matches.length; index++) {
        const element = matches[index];
        assert(element.homeBoxer.id == expectedData.standing.boxer.id || element.awayBoxer.id == expectedData.standing.boxer.id);
      }
    }
  }
}

module.exports = MatchServiceGatewayScenarioTester;
