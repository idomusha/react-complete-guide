import * as actionTypes from '../actions/actionTypes';
// import { updateObject } from '../utility';

const initialState = {
    orders: [],
    loading: false,
    purchased: false,
};

const purchaseInit = (state, action) => {
    return {
        ...state,
        purchased: false,
    };
};

const purchaseStart = (state, action) => {
    return {
        ...state,
        loading: true,
    };
};

const purchaseSuccess = (state, action) => {
    return {
        ...state,
        loading: false,
        purchased: true,
        orders: state.orders.concat({
            ...action.orderData,
            id: action.orderId,
        }),
    };
};

const purchaseFail = (state, action) => {
    return {
        ...state,
        loading: false,
        error: true,
    };
};
const fetchOrdersStart = (state, action) => {
    return {
        ...state,
        loading: true,
    };
};

const fetchOrdersSuccess = (state, action) => {
    return {
        ...state,
        orders: action.orders,
        loading: false,
    };
};

const fetchOrdersFail = (state, action) => {
    return {
        ...state,
        loading: false,
        error: true,
    };
};

const reducer = (state = initialState, action) => {
    console.log('order', action.type);
    switch(action.type) {
        case actionTypes.PURCHASE_INIT: return purchaseInit(state, action);
        case actionTypes.PURCHASE_START: return purchaseStart(state, action);
        case actionTypes.PURCHASE_SUCCESS: return purchaseSuccess(state, action);
        case actionTypes.PURCHASE_FAIL: return purchaseFail(state, action);
        case actionTypes.FETCH_ORDERS_START: return fetchOrdersStart(state, action);
        case actionTypes.FETCH_ORDERS_SUCCESS: return fetchOrdersSuccess(state, action);
        case actionTypes.FETCH_ORDERS_FAIL: return fetchOrdersFail(state, action);
        default: return state;
    }
};

export default reducer;