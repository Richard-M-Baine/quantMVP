const LANDING = 'county/landing'
const Individual = 'county/individual'
const Search = 'county/search'
const COUNTY_CRIME_DATA = 'county/crime/data';

const SET_SELECTED_COUNTIES = "county/setSelectedCounties";
const SET_SELECTED_JUDGES = "county/setSelectedJudges";

const getLandingAction = payload => {

    return {
        type: LANDING,
        payload
    }
}

const getIndividualAction = payload => {

    return {
        type: Individual,
        payload
    }
}

const getCountySearchAction = payload => {

    return {
        type: Search,
        payload
    }
}

const getCountyCrimeDataAction = payload => {
    return {
        type: COUNTY_CRIME_DATA,
        payload
    };
};

export const setSelectedCountiesStore = (payload) => ({
  type: SET_SELECTED_COUNTIES,
  payload,
});

export const setSelectedJudgesStore = (payload) => ({
  type: SET_SELECTED_JUDGES,
  payload,
});


export const fetchCountyCrimeDataThunk = (county, crimeId) => async dispatch => {
    try {
        // Make the server call to the backend route

     
        const response = await fetch(`/api/county/${county}/crimeId/${crimeId}`, {
            
            method: 'GET',
            credentials: 'include',  // Send cookies if needed
            headers: {
                'Content-Type': 'application/json',
            }
        });

        // Check if server says "OK"
        if (response.ok) {
            const data = await response.json();

            // Dispatch to put data into frontend store
            dispatch(getCountyCrimeDataAction(data));
            
            return data;
        } else {
            console.error('Server not happy!');
        }
    } catch (err) {
        console.error('Error in thunk: ', err);
    }
};


// county Landing
export const fetchCountyLandingSampleThunk = () => async dispatch => {

    const response = await fetch('/api/county/landing', {
        method: 'GET',
        credentials: 'include', // Ensures cookies are sent with the request
        headers: {
            'Content-Type': 'application/json'
        }
    });


    if (response.ok) {

        const countySample = await response.json()


        dispatch(getLandingAction(countySample));

        return countySample
    }

}

// county individual compare 3 judges

// all groups
export const fetchIndividualCountyJudgesThunk = (county) => async dispatch => {

    const response = await fetch(`/api/county/individual/${county}`, {
        method: 'GET',
        credentials: 'include', // Ensures cookies are sent with the request
        headers: {
            'Content-Type': 'application/json'
        }
    });


    if (response.ok) {

        const individualSample = await response.json()


        dispatch(getIndividualAction(individualSample));

        return individualSample
    }

}



export const fetchCountyCrimeSearchThunk = (payload) => async dispatch => {


    // Turn payload object into query string
    const queryString = new URLSearchParams(payload).toString();

    const response = await fetch(`/api/county/crimesearch?${queryString}`, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        const countySearchResults = await response.json();

        dispatch(getCountySearchAction(countySearchResults));
        return countySearchResults;
    }
};


// local storage


const initialState = {}

const countyReducer = (state = initialState, action) => {



    switch (action.type) {


        case LANDING: {
            if (!action.payload) return state;
            return [...action.payload]; // keep everything as an array
        }
        case Individual: {
            if (!action.payload) return state;
            return [...action.payload]; // keep everything as an array
        }

        case Search: {
            if (!action.payload) return state;
            return [...action.payload]; // keep everything as an array
        }

        case COUNTY_CRIME_DATA:
    if (!action.payload) return state;
    return {
        ...state,
        countyCrimes: action.payload.countyCrimes,
        judgeCrimes: action.payload.judgeCrimes
    };

    case SET_SELECTED_COUNTIES:
  return {
    ...state,
    selectedCountiesStore: action.payload
  };

case SET_SELECTED_JUDGES:
  return {
    ...state,
    selectedJudgesStore: action.payload
  };





        default: {
            return state;
        }
    }
}


export default countyReducer;