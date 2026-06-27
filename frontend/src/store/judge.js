const allJudgesInCounty = 'judge/judgeList'
const judgeSearch = 'judge/search'
const judgeCrime = 'judge/crime'

const getAllJudgesAction = payload => {

    return {
        type: allJudgesInCounty,
        payload
    }
}

const judgeSearchAction = payload => {

    return {
        type: judgeSearch,
        payload
    }
}

const getJudgesSentenedCrimeAction = payload => {

    return {
        type: judgeCrime,
        payload
    }
}

export const fetchJudgesBasedOnCrimesThunk = (id) => async dispatch => {

    const response = await fetch(`/api/judges/crime/${id}`, {
        method: 'GET',
        credentials: 'include', // Ensures cookies are sent with the request
        headers: {
            'Content-Type': 'application/json'
        }
    });


    if (response.ok) {

        const individualSample = await response.json()


        dispatch(getJudgesSentenedCrimeAction(individualSample));

        return individualSample
    }

}




export const fetchJudgeSearchThunk = (lastName, county) => async dispatch => {
    console.log("lastName:", lastName);
  console.log("county:", county);
  const queryParams = new URLSearchParams({
  lastName,
  county
}).toString();

const response = await fetch(`/api/judges/search?${queryParams}`, {
  method: 'GET',
  credentials: 'include',
  headers: {
    'Content-Type': 'application/json'
  }
});

  if (response.ok) {
    const results = await response.json();
    dispatch(judgeSearchAction(results));
    return results;
  }
};



// all groups
export const fetchAllJudgesInCountyThunk = (county) => async dispatch => {

    const response = await fetch(`/api/judges/all/${county}`,{
     method: 'GET',
        credentials: 'include', // Ensures cookies are sent with the request
        headers: {
            'Content-Type': 'application/json'
        }
    });


    if (response.ok) {

        const judgeSample = await response.json()
        

        dispatch(getAllJudgesAction(judgeSample));

        return judgeSample
    }

}





const initialState = {}

const judgeReducer = (state = initialState, action) => {



    switch (action.type) {


      case allJudgesInCounty: {
    if (!action.payload) return state;
    return [...action.payload]; // keep everything as an array
}

    case judgeSearch: {
          if (!action.payload) return state;
    return [...action.payload]; // keep everything as an array
    }

    case judgeCrime: {
  if (!action.payload) return state;
  return {
    judgeCrimeList: action.payload.topJudgeCrimes || [],
    crime: action.payload.totalCrimeData || {}
  };
}


        default: {
            return state;
        }
    }
}


export default judgeReducer;