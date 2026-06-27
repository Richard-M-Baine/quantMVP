const MisconductSearch = 'misconduct/landing'


const getMisconductAction = payload => {

    return {
        type: MisconductSearch,
        payload
    }
}





export const fetchMisconductSearchThunk = (payload) => async dispatch => {
  

    // Turn payload object into query string
    const queryString = new URLSearchParams(payload).toString();

    const response = await fetch(`/api/county/misconduct?${queryString}`, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        const misconductResults = await response.json();
 
        dispatch(getMisconductAction(misconductResults));
        return misconductResults;
    }
};





const initialState = {}

const misconductReducer = (state = initialState, action) => {

    let newState = {};

    switch (action.type) {


      case MisconductSearch: {
    if (!action.payload) return state;
    return [...action.payload]; // keep everything as an array
}

 

        default: {
            return state;
        }
    }
}


export default misconductReducer;