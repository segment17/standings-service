const Mediator = require('./Mediator');

class Controller {

  constructor() {
    this.mediator = new Mediator();
  }

  // Endpoint guards: guard[endpoint name]
  async guardGetStandingAndMatchesOfBoxer(request) {
    //Do validation here

    let response = await this.mediator.getStandingAndMatchesOfBoxer(request.id);
    // Do validation here
    return response;
  }

  async guardGetAllStandings() {
    // Do validation here

    let response = await this.mediator.getAllStandings();
    // Do validation here
    return response;
  }

  // Mock
  mock() {
    // Assign to mediator to mock everything it has.
    this.mediator.mock();
  }

}

module.exports = Controller;