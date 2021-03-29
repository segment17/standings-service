const testBoxer = {
  id: 1,
  fullName: "Mike Tyson",
  birthDate: 127419968,
  height: 178,
  weight: 100,
};
const testMatches = [
  {
    id: 1,
    homeBoxer: {
      id: 1,
      fullName: "Mike Tyson",
      birthDate: 127419968, // Timestamp
      height: 178,
      weight: 100,
    },
    awayBoxer: {
      id: 4,
      fullName: "Connor McGregor",
      birthDate: 127419968, // Timestamp
      height: 175,
      weight: 80,
    },
    matchTime: 127419968,
    isFinished: true,
    winnerBoxer: {
      id: 4,
      fullName: "Connor McGregor",
      birthDate: 127419968, // Timestamp
      height: 175,
      weight: 80,
    },
  },
  {
    id: 1,
    awayBoxer: {
      id: 1,
      fullName: "Mike Tyson",
      birthDate: 127419968, // Timestamp
      height: 178,
      weight: 100,
    },
    homeBoxer: {
      id: 6,
      fullName: "Logan Paul",
      birthDate: 127419968, // Timestamp
      height: 195,
      weight: 120,
    },
    matchTime: 127419968,
    isFinished: true,
    winnerBoxer: {
      id: 1,
      fullName: "Mike Tyson",
      birthDate: 127419968, // Timestamp
      height: 178,
      weight: 100,
    },
  },
  {
    id: 1,
    awayBoxer: {
      id: 1,
      fullName: "Mike Tyson",
      birthDate: 127419968, // Timestamp
      height: 178,
      weight: 100,
    },
    homeBoxer: {
      id: 8,
      fullName: 'Dwayne "The Rock" Johnson',
      birthDate: 127419968, // Timestamp
      height: 196,
      weight: 118,
    },
    matchTime: 129419968,
    isFinished: false,
  },
  {
    id: 1,
    awayBoxer: {
      id: 4,
      fullName: "Connor McGregor",
      birthDate: 127419968, // Timestamp
      height: 175,
      weight: 80,
    },
    homeBoxer: {
      id: 8,
      fullName: 'Dwayne "The Rock" Johnson',
      birthDate: 127419968, // Timestamp
      height: 196,
      weight: 118,
    },
    matchTime: 129419968,
    isFinished: true,
    winnerBoxer: {
      id: 8,
      fullName: 'Dwayne "The Rock" Johnson',
      birthDate: 127419968, // Timestamp
      height: 196,
      weight: 118,
    }
  }
];
const testMatchesWithTestBoxer = [
  {
    id: 1,
    homeBoxer: {
      id: 1,
      fullName: "Mike Tyson",
      birthDate: 127419968, // Timestamp
      height: 178,
      weight: 100,
    },
    awayBoxer: {
      id: 4,
      fullName: "Connor McGregor",
      birthDate: 127419968, // Timestamp
      height: 175,
      weight: 80,
    },
    matchTime: 127419968,
    isFinished: true,
    winnerBoxer: {
      id: 4,
      fullName: "Connor McGregor",
      birthDate: 127419968, // Timestamp
      height: 175,
      weight: 80,
    },
  },
  {
    id: 1,
    awayBoxer: {
      id: 1,
      fullName: "Mike Tyson",
      birthDate: 127419968, // Timestamp
      height: 178,
      weight: 100,
    },
    homeBoxer: {
      id: 6,
      fullName: "Logan Paul",
      birthDate: 127419968, // Timestamp
      height: 195,
      weight: 120,
    },
    matchTime: 127419968,
    isFinished: true,
    winnerBoxer: {
      id: 1,
      fullName: "Mike Tyson",
      birthDate: 127419968, // Timestamp
      height: 178,
      weight: 100,
    },
  },
  {
    id: 1,
    awayBoxer: {
      id: 1,
      fullName: "Mike Tyson",
      birthDate: 127419968, // Timestamp
      height: 178,
      weight: 100,
    },
    homeBoxer: {
      id: 8,
      fullName: 'Dwayne "The Rock" Johnson',
      birthDate: 127419968, // Timestamp
      height: 196,
      weight: 118,
    },
    matchTime: 129419968,
    isFinished: false,
  },
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
  boxer: testBoxer,
  winCount: 1,
  lossCount: 1,
  score: 0.5
};
const testStandings = [
  testStandingOfTestBoxer,
  {
    boxer: {
      id: 4,
      fullName: "Connor McGregor",
      birthDate: 127419968,
      height: 175,
      weight: 80,
    },
    winCount: 1,
    lossCount: 1,
    score: 0.5
  },
  {
    boxer: {
      id: 6,
      fullName: "Logan Paul",
      birthDate: 127419968,
      height: 195,
      weight: 120,
    },
    winCount: 0,
    lossCount: 1,
    score: 0
  },
  {
    boxer: {
      id: 8,
      fullName: 'Dwayne "The Rock" Johnson',
      birthDate: 127419968,
      height: 196,
      weight: 118,
    },
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
    boxer: emptyBoxer,
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
    id: 1,
  },
  expected_response: {
    code: 200,
    message: "success",
    boxer: testBoxer,
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
    id: 2,
  },
  expected_response: {
    code: 404,
    message: "not_found",
    boxer: emptyBoxer,
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
