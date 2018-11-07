import * as actionTypes from '../actions/actionTypes';

const initialState = {
    orders: [],
    loading: false,
    purchased: false,
};
const reducer = (state = initialState, action) => {
    console.log('order', action.type);
    switch(action.type) {
        case actionTypes.PURCHASE_INIT:
        return {
            ...state,
            purchased: false,
        }
        case actionTypes.PURCHASE_BURGER_START:
            return {
                ...state,
                loading: true,
            };
        case actionTypes.PURCHASE_BURGER_SUCCESS:
            console.log(state.orders.concat({
                ...action.orderData,
                id: action.orderId,
            }));
            return {
                ...state,
                loading: false,
                purchased: true,
                orders: state.orders.concat({
                    ...action.orderData,
                    id: action.orderId,
                }),
            };
        case actionTypes.PURCHASE_BURGER_FAIL:
            return {
                ...state,
                loading: false,
                error: true,
            };
        default:
            return state;
    }
};

export default reducer;