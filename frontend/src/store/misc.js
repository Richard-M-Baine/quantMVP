import { apiFetch } from '../api';

const offenseList = 'misc/listOfCrimes'


const getOffenseListAction = payload => {

    return {
        type: offenseList,
        payload
    }
}



export const fetchListOfCrimesThunk = () => async dispatch => {

    const response = await apiFetch('/api/misc/search', {
        method: 'GET',
        credentials: 'include', // Ensures cookies are sent with the request
        headers: {
            'Content-Type': 'application/json'
        }
    });


    if (response.ok) {

        const crimeList = await response.json()


        dispatch(getOffenseListAction(crimeList));

        return crimeList
    }

}

const initialState = []

const miscReducer = (state = initialState, action) => {



    switch (action.type) {


      case offenseList: {
    if (!action.payload) return state;
    return [...action.payload]; // keep everything as an array
}

default: {
    return state;
}
    }
}


export default miscReducer