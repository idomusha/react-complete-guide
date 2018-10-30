import * as actionTypes from '../actions';

const initialState = {
    results: [],
};

const reducer = (state = initialState, action) => {

    switch (action.type) {
        case actionTypes.STORE_RESULT:
            return {
                ...state,
                results: state.results.concat({ // `concat` return a new array (inlike `push` method)
                    id: new Date(),
                    value: action.result
                }),
            };
        case actionTypes.DELETE_RESULT:
            return {
                ...state,
                results: state.results.filter(result => result.id !== action.elementToDeleteId), // `filter` return a new array (inlike `splice` method)
            };
    }

    return state;
};

export default reducer;