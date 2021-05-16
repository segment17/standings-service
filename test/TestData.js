const testBoxer = {
  id: 1,
  fullName: "Mike Tyson",
  birthDate: 127419968,
  height: 178,
  weight: 100,
};
const testMatchesWithTestBoxer = [
  {
    id: 1,
    homeBoxerId: 1,
    awayBoxerId: 4,
    matchTime: 127419968,
    isFinished: true,
    winnerBoxerId: 4,
  },
  {
    id: 2,
    awayBoxerId: 1,
    homeBoxerId: 6,
    matchTime: 127419968,
    isFinished: true,
    winnerBoxerId: 1,
  },
  {
    id: 3,
    awayBoxerId: 1,
    homeBoxerId: 8,
    matchTime: 129419968,
    isFinished: false,
  },
];
const testMatches = [
  ...testMatchesWithTestBoxer,
  {
    id: 4 ,
    awayBoxerId: 4,
    homeBoxerId: 8,
    matchTime: 129419968,
    isFinished: true,
    winnerBoxerId: 8
  }
];

const testBoxers = [
  {
    id: 1,
    fullName: "Mike Tyson",
    birthDate: 127419968,
    height: 178,
    weight: 100,
  },
  {
    id: 4,
    fullName: "Connor McGregor",
    birthDate: 127419968,
    height: 175,
    weight: 80,
  },
  {
    id: 6,
    fullName: "Logan Paul",
    birthDate: 127419968,
    height: 195,
    weight: 120,
  },
  {
    id: 8,
    fullName: 'Dwayne "The Rock" Johnson',
    birthDate: 127419968,
    height: 196,
    weight: 118,
  }
];
const testStandingOfTestBoxer = {
  boxerId: 1,
  winCount: 1,
  lossCount: 1,
  score: 0.5
};
const testStandings = [
  testStandingOfTestBoxer,
  {
    boxerId: 4,
    winCount: 1,
    lossCount: 1,
    score: 0.5
  },
  {
    boxerId: 6,
    winCount: 0,
    lossCount: 1,
    score: 0
  },
  {
    boxerId: 8,
    winCount: 1,
    lossCount: 0,
    score: 1
  }
];
const emptyBoxer = { id: 0, fullName: '', birthDate: '0', height: 0, weight: 0 };
const emptyStanding = { boxer: null, winCount: 0, lossCount: 0, score: 0 };

/* UNIT MATCH SERVICE GATEWAY SUCCESS SCENARIOS */

// GetAllMatches
var Unit_MatchServiceGateway_Scenario1 = {
  boxers: testBoxers,
  matches: testMatches,
  expected_data: {
    code: 200,
    message: "success",
    matches: testMatches
  }
};

// GetMatchesOfBoxer
var Unit_MatchServiceGateway_Scenario2 = {
  boxers: testBoxers,
  matches: testMatches,
  boxer_id: 1,
  expected_data: {
    code: 200,
    message: "success",
    boxer: testBoxer,
    matches: testMatchesWithTestBoxer,
  },
};

/* UNIT MATCH SERVICE GATEWAY FAIL SCENARIOS */

// GetMatchesOfBoxer Fail
var Unit_MatchServiceGateway_Scenario3_Fail1 = {
  boxers: testBoxers,
  matches: testMatches,
  boxer_id: 2,
  expected_data: {
    code: 404,
    message: "not_found",
    boxer: 0,
    matches: [],
  },
};

/* COMPONENT SUCCESS SCENARIOS */

// GetAllStandings
const H2_Scenario1_Variation1 = {
  boxers: testBoxers,
  matches: testMatches,
  expected_response: {
    code: 200,
    message: "success",
    standings: testStandings,
  },
};

// GetStandingAndMatchesOfBoxer
const B1_Scenario1_Variation1 = {
  boxer: testBoxer,
  matches: testMatches,
  request_body: {
    boxerId: 1,
  },
  expected_response: {
    code: 200,
    message: "success",
    standingAndMatches: {
      standing: testStandingOfTestBoxer,
      matches: testMatchesWithTestBoxer
    },
  },
};

/* COMPONENT FAIL SCENARIOS */

// GetStandingAndMatchesOfBoxer Fail
const B1_Scenario2_Fail1 = {
  boxer: testBoxer,
  matches: testMatches,
  request_body: {
    boxerId: 2,
  },
  expected_response: {
    code: 404,
    message: "not_found",
    boxer: 0,
    standingAndMatches: {
      standing: emptyStanding,
      matches: []
    }
  },
};

module.exports = {
  Unit_MatchServiceGateway_Scenario1,
  Unit_MatchServiceGateway_Scenario2,
  Unit_MatchServiceGateway_Scenario3_Fail1,
  H2_Scenario1_Variation1,
  B1_Scenario1_Variation1,
  B1_Scenario2_Fail1,
};
