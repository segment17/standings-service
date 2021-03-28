const MatchServiceGateway = require('./Gateway/MatchServiceGateway');
const MockMatchServiceGateway = require('./Gateway/Mock/MockMatchServiceGateway');

class Mediator {

  constructor() {
    this.matchServiceGateway = new MatchServiceGateway();
  }

  // Endpoints

  async getStandingAndMatchesOfBoxer(id) {
    /* let getBoxerResponse = await this.boxerRepository.getBoxerWithId(id);
    // Do validation here
    let standingAndMatches = await this.standingsServiceGateway.getStandingAndMatchesOfBoxer(id);
    // Do validation here
    return {
      code: getBoxerResponse.code,
      message: getBoxerResponse.message,
      boxer: getBoxerResponse.boxer,
      standingAndMatches: standingAndMatches
    } */
    return null;
  }

  async getAllStandings() {
    /* const validation = await this.getValidation(token);
    let response = {};
    if(validation.code !== 200) {
      response.code = validation.code;
      response.message = validation.message;
      response.boxer = { id: 0, fullName: '', birthDate: '0', height: 0, weight: 0 };
    } else {
      response = await this.boxerRepository.addBoxerWithGivenData(fullName, birthDate, height, weight);
    }
    return response; */
    return null;
  }

  // Mock everything.
  mock() {
    this.matchServiceGateway = new MockMatchServiceGateway();
  }

}

module.exports = Mediator;
