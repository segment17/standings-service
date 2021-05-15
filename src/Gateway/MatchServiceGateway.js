class MatchServiceGateway {

  // Gateway exposed function
  async getMatchesOfBoxer(param) {
    let response = await this.doCallForGetMatchesOfBoxer(param);
    return response;
  }

  async getAllMatches() {
    let response = await this.doCallForGetAllMatches();
    return response;
  }

  async doCallForGetMatchesOfBoxer(param) {
    console.log("Real get call to AnyService with param: " + param);
    return {}; //TODO
  }

  async doCallForGetAllMatches(param) {
    console.log("Real get call to AnyService with param: " + param);
    return {}; //TODO
  }

  async SetupAddMatches(obj) {
    return null;
  }

  async SetupAddBoxer(obj) {
    return null;
  }

  async SetupAddBoxers(obj) {
    return null;
  }

  extractMatchesFromResponse(response) {
    //TODO Parse response here...
    return response.matches;
  }

}

module.exports = MatchServiceGateway;
