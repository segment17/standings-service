const testBoxer = {
  id: 1,
  fullName: "Mike Tyson",
  birthDate: 127419968,
  height: 178,
  weight: 100
}

// UNIT MATCH SERVICE GATEWAY SUCCESS SCENARIOS

var Unit_MatchServiceGateway_Scenario1 = {
  boxers: null,
  matches: null,
  expected_data: {
    code: "200",
    message: "success",
    standings: []
  }
  /* standing_and_matches: {
    standing: {
      boxer: {
        id: 1,
        fullName: "Mike Tyson",
        birthDate: 127419968, // Timestamp
        height: 178,
        weight: 100
      },
      winCount: 1,
      lossCount: 1,
      score: 0.5,
    },
    matches: [
      {
        id: 1,
        homeBoxer: {
          id: 1,
          fullName: "Mike Tyson",
          birthDate: 127419968, // Timestamp
          height: 178,
          weight: 100
        },
        awayBoxer: {
          id: 4,
          fullName: "Connor McGregor",
          birthDate: 127419968, // Timestamp
          height: 175,
          weight: 80
        },
        matchTime: 127419968,
        isFinished: true,
        winnerBoxer: {
          id: 4,
          fullName: "Connor McGregor",
          birthDate: 127419968, // Timestamp
          height: 175,
          weight: 80
        }
      },
      {
        id: 1,
        awayBoxer: {
          id: 1,
          fullName: "Mike Tyson",
          birthDate: 127419968, // Timestamp
          height: 178,
          weight: 100
        },
        homeBoxer: {
          id: 6,
          fullName: "Logan Paul",
          birthDate: 127419968, // Timestamp
          height: 195,
          weight: 120
        },
        matchTime: 127419968,
        isFinished: true,
        winnerBoxer: {
          id: 1,
          fullName: "Mike Tyson",
          birthDate: 127419968, // Timestamp
          height: 178,
          weight: 100
        }
      },
      {
        id: 1,
        awayBoxer: {
          id: 1,
          fullName: "Mike Tyson",
          birthDate: 127419968, // Timestamp
          height: 178,
          weight: 100
        },
        homeBoxer: {
          id: 8,
          fullName: "Dwayne \"The Rock\" Johnson",
          birthDate: 127419968, // Timestamp
          height: 196,
          weight: 118
        },
        matchTime: 129419968,
        isFinished: false
      }
    ]
  } */
}

var Unit_MatchServiceGateway_Scenario2 = {
  boxer: null,
  matches: null,
  boxer_id: 1,
  expected_data: {
    code: "200",
    message: "success",
    boxer: null,
    standings: []
  }
}

// UNIT MATCH SERVICE GATEWAY FAIL SCENARIOS

var Unit_MatchServiceGateway_Scenario3_Fail1 = {
  boxers: null,
  matches: null,
  expected_data: {
    code: "200",
    message: "success",
    standings: []
  }
}

var Unit_MatchServiceGateway_Scenario4_Fail1 = {
  boxer: null,
  matches: null,
  boxer_id: 1,
  expected_data: {
    code: "200",
    message: "success",
    boxer: null,
    standings: []
  }
}

// COMPONENT SUCCESS SCENARIOS

// GetAllStandings
const H2_Scenario1_Variation1 = {
  boxers: null,
  matches: null,
  standings: null,
  expected_response: {
    code: 200,
    message: 'success',
    standings: []
  }
}

// GetStandingAndMatchesOfBoxer
const B1_Scenario1_Variation1 = {
  boxer: null,
  standing: null,
  matches: null,
  request_body: {
    id: 1,
  },
  expected_response: {
    code: 200,
    message: 'success',
    boxer: null
  }
}

// COMPONENT FAIL SCENARIOS

// GetAllStandings
const H2_Scenario2_Fail1 = {
  boxers: null,
  matches: null,
  standings: null,
  expected_response: {
    code: 404,
    message: 'not_found',
    standings: []
  }
}

// GetStandingAndMatchesOfBoxer
const B1_Scenario2_Fail1 = {
  boxer: null,
  standing: null,
  matches: null,
  request_body: {
    id: 1,
  },
  expected_response: {
    code: 404,
    message: 'not_found',
    boxer: null
  }
}

module.exports = {
  H2_Scenario2_Fail1,

  Unit_MatchServiceGateway_Scenario1,
  Unit_MatchServiceGateway_Scenario2,
  Unit_MatchServiceGateway_Scenario3_Fail1,
  Unit_MatchServiceGateway_Scenario4_Fail1,
  H2_Scenario1_Variation1,
  B1_Scenario1_Variation1,
  B1_Scenario2_Fail1,
}