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



async function bindGetAllStandings(call, callback) {
  let r = await globalObjects.controller.guardGetAllStandings();
  callback(null, r);
}

async function bindMock(call, callback) {
  await globalObjects.controller.mock();
  callback(null, null);
}

async function bindSetupAddBoxer(call, callback) {
  await globalObjects.controller.mediator.matchServiceGateway.SetupAddBoxer(call.request.boxer);
  callback(null, {code: 200});
}

async function bindSetupAddBoxers(call, callback) {
  await globalObjects.controller.mediator.matchServiceGateway.SetupAddBoxers(call.request.boxers);
  callback(null, {code: 200});
}

async function bindSetupAddMatches(call, callback) {
  await globalObjects.controller.mediator.matchServiceGateway.SetupAddMatches(call.request.matches);
  callback(null, {code: 200});
}

async function bindSetupCleanUp(call, callback) {
  await globalObjects.cleanUp();
  callback(null, {code: 200});
}

function main() {
  console.log("Server running...");
  server = new grpc.Server();
  server.addService(standingsservice_package.StandingsService.service, {
    GetStandingAndMatchesOfBoxer: bindGetStandingAndMatchesOfBoxer,
    GetAllStandings: bindGetAllStandings,
    Mock: bindMock,
    SetupAddBoxer: bindSetupAddBoxer,
    SetupAddBoxers: bindSetupAddBoxers,
    SetupAddMatches: bindSetupAddMatches,
    SetupCleanUp: bindSetupCleanUp
  });

  if (process.env.STANDINGS_SERVICE_SERVICE_PORT != undefined) {
    server.bind("0.0.0.0" + ":" + process.env.STANDINGS_SERVICE_SERVICE_PORT, grpc.ServerCredentials.createInsecure());
  } else {
    server.bind("localhost:50004", grpc.ServerCredentials.createInsecure());
  }
  server.start();
}

main();
