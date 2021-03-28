const GlobalObjects = require('./GlobalObjects');
var globalObjects = new GlobalObjects();
module.exports = globalObjects;

// GRPC SETUP
const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
const PROTO_PATH = __dirname + '/proto/standingsservice.proto';
const packageDefinition = protoLoader.loadSync(PROTO_PATH, { keepCase: true, longs: String, enums: String, defaults: true, oneofs: true });
const standingsservice_package = grpc.loadPackageDefinition(packageDefinition).standingsservice_package;
// GRPC SETUP


async function bindGetStandingAndMatchesOfBoxer(call, callback) {
  let r = await globalObjects.controller.guardGetStandingAndMatchesOfBoxer(call.request);
  callback(null, r);
}

async function bindGetAllStandings(callback) {
  let r = await globalObjects.controller.guardGetAllStandings();
  callback(null, r);
}

async function bindMock(call, callback) {
  await globalObjects.controller.mock();
  callback(null, null);
}

async function bindSetupAddBoxer(call, callback) {
  globalObjects.controller.mediator.boxerRepository.setupAddBoxer(call.request.boxer);
  callback(null, {code: 200})
}

async function bindSetupAddStandingAndMatches(call, callback) {
  globalObjects.controller.mediator.standingsServiceGateway.setupAddStandingAndMatches(call.request.standingAndMatches);
  callback(null, {code: 200})
}

function main() {
  console.log("Server running...");
  server = new grpc.Server();
  server.addService(standingsservice_package.StandingsService.service, {
    GetStandingAndMatchesOfBoxer: bindGetStandingAndMatchesOfBoxer,
    GetAllStandings: bindGetAllStandings,
    Mock: bindMock,
    SetupAddBoxer: bindSetupAddBoxer,
    SetupAddStandingAndMatches: bindSetupAddStandingAndMatches,
  });

  if (process.env.STANDINGS_SERVICE_SERVICE_PORT != undefined) {
    server.bind("0.0.0.0" + ":" + process.env.STANDINGS_SERVICE_SERVICE_PORT, grpc.ServerCredentials.createInsecure());
  } else {
    server.bind("localhost:50001", grpc.ServerCredentials.createInsecure());
  }
  server.start();
}

main();
