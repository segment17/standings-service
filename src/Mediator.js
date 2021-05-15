const MatchServiceGateway = require('./Gateway/MatchServiceGateway');
const MockMatchServiceGateway = require('./Gateway/Mock/MockMatchServiceGateway');

class Mediator {

  constructor() {
    this.matchServiceGateway = new MatchServiceGateway();
  }

  // Endpoints

  calculateStandingOfBoxer(matches, boxerId) {
    let wins = 0;
    let losses = 0;
    for(let index in matches) {
      const match = matches[index];
      if(match.isFinished) {
        if(match.winnerBoxerId === boxerId) {
          wins++;
        } else {
          if(match.homeBoxerId === boxerId || match.awayBoxerId === boxerId) {
            losses++;
          }
        }
      }
    }
    let score = wins / (wins + losses);
    return { boxerId: boxerId, winCount: wins, lossCount: losses, score: score ? score : 0 };
  }

  extractBoxersFromMatches(matches) {
    let boxers = [];
    let boxer_ids = [];
    for(let index in matches) {
      const awayId = matches[index].awayBoxerId;
      const homeId = matches[index].homeBoxerId;
      if(!boxer_ids.includes(awayId)) {
        boxer_ids.push(awayId);
        boxers.push(awayId);
      }
      if(!boxer_ids.includes(homeId)) {
        boxer_ids.push(homeId);
        boxers.push(homeId);
      }
    }
    return boxers;
  }

  async getStandingAndMatchesOfBoxer(id) {
    const response = await this.matchServiceGateway.getMatchesOfBoxer(id);
    const standing = this.calculateStandingOfBoxer(response.matches, response.boxer);

    return {
      code: response.code,
      message: response.message,
      standingAndMatches: {
        standing: standing,
        matches: response.matches
      }
    };
  }

  async getAllStandings() {
    const response = await this.matchServiceGateway.getAllMatches();
    const matches = response.matches;
    let boxers = this.extractBoxersFromMatches(matches);
    let standings = [];
    for(let index in boxers) {
      standings.push(this.calculateStandingOfBoxer(matches, boxers[index]));
    }

    return {
      code: response.code,
      message: response.message,
      standings: standings
    };
  }

  // Mock everything.
  mock() {
    this.matchServiceGateway = new MockMatchServiceGateway();
  }

}

module.exports = Mediator;
