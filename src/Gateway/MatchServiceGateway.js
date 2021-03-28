class MatchServiceGateway {

  // Template code

  // Gateway exposed function
  async getStandingAndMatchesOfBoxer(param) {
    let response = await this.doCallForGetStandingWithId(param);
    let standing = this.extractStandingAndMatchesFromResponse(response);
    return standing;
  }

  // doCallFor[function name]
  async doCallForGetStandingWithId(param) {
    console.log("Real get call to AnyService with param: " + param);
    return {}; //TODO
  }

  async setupAddStandingAndMatches(obj) {
    return null;
  }

  extractStandingAndMatchesFromResponse(response) {
    //TODO Parse response here...
    return response.standingAndMatches;
  }

}

module.exports = MatchServiceGateway;
