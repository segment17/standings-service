
const DefaultScenarioTester = require('../DefaultScenarioTester');
const TestFunctions = require('../../TestFunctions');
const globalObjects = require('../../..');
const assert = require('assert');

class MatchServiceGatewayScenarioTester extends DefaultScenarioTester {

  unitFunctionIsInvokedWithData(functionName, dataSource) {
    if (functionName == "getMatchesOfBoxer") {
      const specifiedData = TestFunctions.extractSpecifiedObjectData(dataSource);
      globalObjects.matchServiceGateway.getMatchesOfBoxer(specifiedData).then(result => {
        globalObjects.result = result;
      });
    } else if (functionName == "getAllMatches") {
      globalObjects.matchServiceGateway.getAllMatches().then(result => {
        globalObjects.result = result;
      });
    }
  }

  async thereAreMatchesSuchAs(dataSource) {
    const matches = TestFunctions.extractSpecifiedObjectData(dataSource);
    await globalObjects.matchServiceGateway.SetupAddMatches(matches);
    globalObjects.done = true;
  }

  async thereIsABoxerSuchAs(dataSource) {
    const specifiedBoxer = TestFunctions.extractSpecifiedObjectData(dataSource);
    await globalObjects.matchServiceGateway.SetupAddBoxer(specifiedBoxer);
    globalObjects.done = true;
  }

  async thereAreBoxersSuchAs(dataSource) {
    const boxers = TestFunctions.extractSpecifiedObjectData(dataSource);
    await globalObjects.matchServiceGateway.SetupAddBoxers(boxers);
    globalObjects.done = true;
  }

  async returnedDataIsAs(dataSource) {
    const expectedData = TestFunctions.extractSpecifiedObjectData(dataSource);
    await TestFunctions.waitUntilResult();
    const result = globalObjects.result;
    
    assert(result.code === expectedData.code);
    assert(result.message === expectedData.message);
    if(expectedData.boxer) {
      this.compareBoxers(result.boxer, expectedData.boxer);
    }
    this.compareMatches(result.matches, expectedData.matches);

  }



  async thereAreMatchesSuchAs(dataSource) {
    const matches = TestFunctions.extractSpecifiedObjectData(dataSource);
    await globalObjects.client.SetupAddMatches({matches: matches}, function (err, res) {
      globalObjects.done = true;
    });
  }
}

module.exports = MatchServiceGatewayScenarioTester;
