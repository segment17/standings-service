// GRPC SETUP
const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
const PROTO_PATH = __dirname + '../../../proto/ubc.proto';
const packageDefinition = protoLoader.loadSync(PROTO_PATH, { keepCase: true, longs: String, enums: String, defaults: true, oneofs: true });
const ubc_package = grpc.loadPackageDefinition(packageDefinition).ubc_package;
// GRPC SETUP
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
class MatchServiceGateway {

  readyClient() {
    if (this.client == undefined || this.client == null) {
      this.client = new ubc_package.MatchService((process.env.MATCH_SERVICE_ADDR || "0.0.0.0:50053"), grpc.credentials.createInsecure());
    }
  }

  async getMatchesOfBoxer(param) {
    let response = await this.doCallForGetMatchesOfBoxer(param);
    return response;
  }

  async getAllMatches() {
    let response = await this.doCallForGetAllMatches();
    return response;
  }

  async doCallForGetMatchesOfBoxer(param) {
    this.readyClient();
    await sleep(50);
    console.log('🔵MatchService.GetMatchesOfBoxer🔵\t:: ', param);
    let response = await this.PROMISE_doCallForGetMatchesOfBoxer(param);
    await sleep(50);
    console.log('🟣MatchService.GetMatchesOfBoxer🟣\t:: ', JSON.stringify(response));
    return response;
  }

  async PROMISE_doCallForGetMatchesOfBoxer(obj) {
    return new Promise((resolve, reject) => {
      this.client.GetMatchesOfBoxer({ boxerId: obj }, function (err, res) {
        resolve(res);
      });
    });
  }

  async doCallForGetAllMatches(param) {
    this.readyClient();
    await sleep(50);
    console.log('🔵MatchService.GetAllMatches🔵\t:: ', param);
    let response = await this.PROMISE_doCallForGetAllMatches();
    await sleep(50);
    console.log('🟣MatchService.GetAllMatches🟣\t:: ', JSON.stringify(response));
    return response;
  }

  async PROMISE_doCallForGetAllMatches() {
    return new Promise((resolve, reject) => {
      this.client.GetAllMatches({}, function (err, res) {
        resolve(res);
      });
    });
  }

  async SetupAddMatches(obj) {
    this.readyClient();
    let response = await this.PROMISE_doCallForSetupAddMatches(obj);
    return response;
  }

  async PROMISE_doCallForSetupAddMatches(data) {
    return new Promise((resolve, reject) => {
      this.client.SetupAddMatches({ matches: data }, function (err, res) {
        resolve(res);
      });
    });
  }

  async SetupAddBoxer(obj) {
    this.readyClient();
    let response = await this.PROMISE_doCallForSetupAddBoxer(obj);
    return response;
  }

  async PROMISE_doCallForSetupAddBoxer(data) {
    return new Promise((resolve, reject) => {
      this.client.SetupAddBoxers({ boxers: [data] }, function (err, res) {
        resolve(res);
      });
    });
  }

  async SetupAddBoxers(obj) {
    this.readyClient();
    let response = await this.PROMISE_doCallForSetupAddBoxers(obj);
    return response;
  }

  async PROMISE_doCallForSetupAddBoxers(data) {
    return new Promise((resolve, reject) => {
      this.client.SetupAddBoxers({ boxers: data }, function (err, res) {
        resolve(res);
      });
    });
  }

  extractMatchesFromResponse(response) {
    return response.matches;
  }

  async cleanUp() {
    this.readyClient();
    await this.PROMISE_doCallForCleanUp();
  }

  async PROMISE_doCallForCleanUp() {
    return new Promise((resolve, reject) => {
      this.client.SetupCleanUp({}, function (err, res) {
        resolve(res);
      });
    });
  }
}

module.exports = MatchServiceGateway;
