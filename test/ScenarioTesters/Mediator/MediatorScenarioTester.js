const globalObjects = require('../../..');
const DefaultScenarioTester = require('../DefaultScenarioTester');
const TestFunctions = require('../../TestFunctions');

class MediatorScenarioTester extends DefaultScenarioTester {

  thereIsAnActiveStandingSpecifiedAsData(dataSource) {
    console.log("mediator.StandingsServiceGateway is getting mock data.")
    const specifiedStanding = TestFunctions.extractSpecifiedObjectData(dataSource);
    globalObjects.mediator.StandingsServiceGateway.SetupAddStanding(specifiedStanding);
  }

  thereIsABoxerSpecifiedAsData(dataSource) {
    console.log("mediator.BoxerRepository is getting mock data.")
    const specifiedBoxer = TestFunctions.extractSpecifiedObjectData(dataSource);
    globalObjects.mediator.BoxerRepository.SetupAddGreeeting(specifiedBoxer);
  }
  

}

module.exports = MediatorScenarioTester;