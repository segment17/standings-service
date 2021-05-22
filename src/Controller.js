const Mediator = require('./Mediator');

class Controller {

  constructor() {
    this.mediator = new Mediator();
  }

  async guardGetStandingAndMatchesOfBoxer(request) {
    return await this.mediator.getStandingAndMatchesOfBoxer(request.boxerId);
  }

  async guardGetAllStandings() {
    return await this.mediator.getAllStandings();
  }

  mock() {
    this.mediator.mock();
  }
}

module.exports = Controller;