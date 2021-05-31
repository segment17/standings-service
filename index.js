const GlobalObjects = require('./GlobalObjects');
var globalObjects = new GlobalObjects();
module.exports = globalObjects;

// GRPC SETUP
const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
const PROTO_PATH = __dirname + '/proto/ubc.proto';
const packageDefinition = protoLoader.loadSync(PROTO_PATH, { keepCase: true, longs: String, enums: String, defaults: true, oneofs: true });
const ubc_package = grpc.loadPackageDefinition(packageDefinition).ubc_package;
// GRPC SETUP

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function bindGetStandingAndMatchesOfBoxer(call, callback) {
  await sleep(300);
  console.log('\n⚪GetStandingAndMatchesOfBoxer⚪\t:: ', JSON.stringify(call.request));
  let r = await globalObjects.controller.guardGetStandingAndMatchesOfBoxer(call.request);
  await sleep(300);
  console.log('🟢GetStandingAndMatchesOfBoxer🟢\t:: ', JSON.stringify(r));
  callback(null, r);
}

async function bindGetAllStandings(call, callback) {
  await sleep(300);
  console.log('\n⚪GetAllStandings⚪\t:: ', JSON.stringify(call.request));
  let r = await globalObjects.controller.guardGetAllStandings();
  await sleep(300);
  console.log('🟢GetAllStandings🟢\t:: ', JSON.stringify(r));
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
  server.addService(ubc_package.StandingsService.service, {
    GetStandingAndMatchesOfBoxer: bindGetStandingAndMatchesOfBoxer,
    GetAllStandings: bindGetAllStandings,
    Mock: bindMock,
    SetupAddBoxer: bindSetupAddBoxer,
    SetupAddBoxers: bindSetupAddBoxers,
    SetupAddMatches: bindSetupAddMatches,
    SetupCleanUp: bindSetupCleanUp
  });

  server.bind("0.0.0.0:50054", grpc.ServerCredentials.createInsecure());
  server.start();
}

main();
