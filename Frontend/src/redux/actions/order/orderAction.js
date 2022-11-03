import axios from 'axios'
import { ALL_ORDERS_FAIL, ALL_ORDERS_REQUEST, ALL_ORDERS_SUCCESS, CLEAR_ERRORS, CREATE_ORDER_FAIL, CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS, MY_ORDERS_FAIL, MY_ORDERS_REQUEST, MY_ORDERS_SUCCESS, ORDER_DETAILS_FAIL, ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS } from '../actionsTypes';


const createOrder = (order) => async (dispatch, getState) => {
    return async (dispatch, getState) => {
        // grab the user Token from store
        const { userInfo } = getState().userLogin;
        try {
            dispatch({ type: CREATE_ORDER_REQUEST });

            const config = {
                headers: {
                    authorization: `tiendat ${userInfo.token}`,
                    "Content-Type": "application/json",
                },
            };

            const { data } = await axios.post("/order/new/auth", order, config);

            dispatch({
                type: CREATE_ORDER_SUCCESS,
                payload: data,
            });
        } catch (error) {
            dispatch({
                type: CREATE_ORDER_FAIL,
                payload: error.response.data.message,
            });
        }
    }
};

// Get curretly logged in user orders
const myOrders = () => async (dispatch, getState) => {
    return async (dispatch, getState) => {
        // grab the user Token from store
        const { userInfo } = getState().userLogin;
        try {
            dispatch({ type: MY_ORDERS_REQUEST });
            const config = {
                headers: {
                    authorization: `tiendat ${userInfo.token}`,
                    "Content-Type": "application/json",
                },
            };
            const { data } = await axios.get("/order/me", config);

            dispatch({
                type: MY_ORDERS_SUCCESS,
                payload: data.orders,
            });
        } catch (error) {
            dispatch({
                type: MY_ORDERS_FAIL,
                payload: error.response.data.message,
            });
        }
    }
};
// Get order details
const getOrderDetails = (id) => async (dispatch, getState) => {
    return async (dispatch, getState) => {
        // grab the user Token from store
        const { userInfo } = getState().userLogin;
        try {
            dispatch({ type: ORDER_DETAILS_REQUEST });
            const config = {
                headers: {
                    authorization: `tiendat ${userInfo.token}`,
                    "Content-Type": "application/json",
                },
            };
            const { data } = await axios.get(`/order/auth/${id}`, config);

            dispatch({
                type: ORDER_DETAILS_SUCCESS,
                payload: data.order,
            });
        } catch (error) {
            dispatch({
                type: ORDER_DETAILS_FAIL,
                payload: error.response.data.message,
            });
        }
    }
};

// Get all orders - ADMIN
const allOrders = () => async (dispatch, getState) => {
        // grab the user Token from store
        const { userInfo } = getState().userLogin;
        try {
            dispatch({ type: ALL_ORDERS_REQUEST });
            const config = {
                headers: {
                    authorization: `tiendat ${userInfo.token}`,
                    "Content-Type": "application/json",
                },
            };
            const { data } = await axios.get("order/auth", config);

            dispatch({
                type: ALL_ORDERS_SUCCESS,
                payload: data,
            });
        } catch (error) {
            dispatch({
                type: ALL_ORDERS_FAIL,
                payload: error.response.data.message,
            });
        }
};
// Clear Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS,
    });
};

export { createOrder, myOrders, getOrderDetails, allOrders };