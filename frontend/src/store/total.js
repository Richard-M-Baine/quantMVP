const JudgeCrime = 'total/crime'


const getJudgeLandingCrimeAction = payload => {

    return {
        type: JudgeCrime,
        payload
    }
}

export const fetchJudgeLandingCrimeThunk = (searchGroup) => async dispatch => {
    const queryParams = new URLSearchParams(searchGroup).toString();

    const response = await fetch(`/api/crimes/judge?${queryParams}`, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        const results = await response.json();
        dispatch(getJudgeLandingCrimeAction(results));
        return results;
    }
};


const initialState = {}

const crimeReducer = (state = initialState, action) => {



    switch (action.type) {


        case JudgeCrime: {
            if (!action.payload) return state;
            return [...action.payload]; // keep everything as an array
        }


        default: {
            return state;
        }

    }
}

export default crimeReducer