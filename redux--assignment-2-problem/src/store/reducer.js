import * as actionTypes from './actions';

const initialState = {
    persons: [],
};

const reducer = (state = initialState, action) => {

    switch (action.type) {
        case actionTypes.ADD_PERSON:
            return {
                ...state,
                persons: state.persons.concat({ // `concat` return a new array (inlike `push` method)
                    id: new Date(), // not really unique but good enough here!
                    name: action.name,
                    age: action.age
                }),

            };
        case actionTypes.REMOVE_PERSON:
            return {
                ...state,
                persons: state.persons.filter(person => person.id !== action.id)
            };
    }

    return state;
};

export default reducer;