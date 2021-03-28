const DefaultScenarioTester = require('./DefaultScenarioTester');
const MatchServiceGatewayScenarioTester = require('./Gateway/MatchServiceGatewayScenarioTester');
const MediatorScenarioTester = require('./Mediator/MediatorScenarioTester');
const TestFunctions = require('../TestFunctions');

class ScenarioTesterFactory {

  static createScenarioTester(scenario) {
    if (TestFunctions.isScenarioUnit(scenario, "MatchServiceGateway") || TestFunctions.isScenarioIntegration(scenario, "MatchServiceGateway")) {
      return new MatchServiceGatewayScenarioTester(scenario);
    } else if (TestFunctions.isScenarioUnit(scenario, "Mediator")) {
      return new MediatorScenarioTester(scenario);
    }
    return new DefaultScenarioTester(scenario);
  }

}

module.exports = ScenarioTesterFactory;
