const JUDGESELECTION = 'crime/selection'
const CRIMELANDING = 'crime/landing'
const CRIMEINDIVIDUAL = 'crime/individual'

const getJudgeCompareAction = payload => {

    return {
        type: JUDGESELECTION,
        payload
    }
}

const getCrimeLandingAction = payload => {

    return {
        type: CRIMELANDING,
        payload
    }
}

const getCrimeIndividualAction = payload => {

    return {
        type: CRIMEINDIVIDUAL,
        payload
    }
}

// county individual 

export const fetchCrimeIndividualSampleThunk = (id) => async dispatch => {

    const response = await fetch(`/api/crimes/individual/${id}`, {
        method: 'GET',
        credentials: 'include', // Ensures cookies are sent with the request
        headers: {
            'Content-Type': 'application/json'
        }
    });


    if (response.ok) {

        const crimeIndividualSample = await response.json()


        dispatch(getCrimeIndividualAction(crimeIndividualSample));

        return crimeIndividualSample
    }

}

// county Landing
export const fetchCrimeLandingSampleThunk = () => async dispatch => {

    const response = await fetch('/api/crimes/landing', {
        method: 'GET',
        credentials: 'include', // Ensures cookies are sent with the request
        headers: {
            'Content-Type': 'application/json'
        }
    });


    if (response.ok) {

        const countySample = await response.json()


        dispatch(getCrimeLandingAction(countySample));

        return countySample
    }

}


// all groups
export const fetchAllJudgesForCrimeThunk= (id) => async dispatch => {

    const response = await fetch(`/api/judges/crime/all/${id}`,{
     method: 'GET',
        credentials: 'include', // Ensures cookies are sent with the request
        headers: {
            'Content-Type': 'application/json'
        }
    });


    if (response.ok) {

        const judgeSample = await response.json()
        

        dispatch(getJudgeCompareAction(judgeSample));

        return judgeSample
    }

}








const initialState = {}

const crimeReducer = (state = initialState, action) => {



    switch (action.type) {

           case JUDGESELECTION: {
            if (!action.payload) return state;
            return [...action.payload]; // keep everything as an array
        }

        case CRIMELANDING: {
            if (!action.payload) return state;
            return action.payload 
        }

        case CRIMEINDIVIDUAL: {
            if (!action.payload) return state;
            return action.payload
        }

        default: {
            return state;
        }
    }
}


export default crimeReducer;