import * as actionTypes from './actionTypes';

export const saveResult = (counter) => {
    // change data
    return {
        type: actionTypes.STORE_RESULT,
        result: counter,
    };
}

export const storeResult = (counter) => {
    return (dispatch, getState) => {
        setTimeout(() => {  // simulate send HTTP request
            const counterFromState = getState().counterReducer.counter;
            console.log(counterFromState);
            dispatch(saveResult(counter));
        }, 2000);
    };
};

export const deleteResult = (od) => {
    return {
        type: actionTypes.DELETE_RESULT,
        elementToDeleteId: IDBCursor,
    };
};