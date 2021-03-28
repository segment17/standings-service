const Controller = require('./src/Controller');
const Mediator = require('./src/Mediator');
const MatchServiceGateway = require('./src/Gateway/MatchServiceGateway');
const MockMatchServiceGateway = require('./src/Gateway/Mock/MockMatchServiceGateway');

// GRPC SETUP
const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
const PROTO_PATH = __dirname + '/proto/standingsservice.proto';
const packageDefinition = protoLoader.loadSync(PROTO_PATH, { keepCase: true, longs: String, enums: String, defaults: true, oneofs: true });
const standingsservice_package = grpc.loadPackageDefinition(packageDefinition).standingsservice_package;
// GRPC SETUP

class GlobalObjects {

  constructor() {
    this.done = false;
    this.result = null; // Result object that will be filled during tests.
    this.controller = new Controller();
    this.mediator = new Mediator();
    this.matchServiceGateway = new MatchServiceGateway();

    // Connect to Kubernetes if possible
    if (process.env.STANDINGS_SERVICE_SERVICE_PORT != undefined) {
      this.client = new standingsservice_package.StandingsService("0.0.0.0" + ":" + process.env.STANDINGS_SERVICE_SERVICE_PORT, grpc.credentials.createInsecure());
    } else {
      this.client = new standingsservice_package.StandingsService("0.0.0.0:50001", grpc.credentials.createInsecure());
    }
  }

  // Mock everything...
  mock() {
    this.mediator.mock();
    this.matchServiceGateway = new MockMatchServiceGateway();
  }

  resetResult() {
    this.result = null;
  }

  setScenario(scenario) {
    this.scenario = scenario;
  }

  setScenarioTester(scenarioTester) {
    this.scenarioTester = scenarioTester;
  }

  reset() {
    this.result = null; // Result object that will be filled during tests.
    this.controller = new Controller();
    this.mediator = new Mediator();
    this.matchServiceGateway = new MatchServiceGateway();

    // Connect to Kubernetes if possible
    if (process.env.STANDINGS_SERVICE_SERVICE_PORT != undefined) {
      this.client = new standingsservice_package.StandingsService("0.0.0.0" + ":" + process.env.STANDINGS_SERVICE_SERVICE_PORT, grpc.credentials.createInsecure());
    } else {
      this.client = new standingsservice_package.StandingsService("0.0.0.0:50001", grpc.credentials.createInsecure());
    }
  }

}

module.exports = GlobalObjects;
