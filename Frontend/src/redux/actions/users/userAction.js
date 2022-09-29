import { USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT_SUCCESS, USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS } from "../actionsTypes";
import axios from "axios";

const registerUserAction = (username, password, email, permission) => {
    return async dispatch => {
        try {
            dispatch({
                type: USER_REGISTER_REQUEST,
            });

            const config = {
                headers: { 'Content-Type': 'application/json' },
            };

            const { data } = await axios.post('/user/register',
                {
                    username,
                    password,
                    email,
                    permission,
                },
                config
            );
            console.log(username, password, email, permission);
            dispatch({
                type: USER_REGISTER_SUCCESS,
                payload: data,
            });

            //Save the user into localstorage
            localStorage.setItem('userAuthData', JSON.stringify(data));
        } catch (error) {
            console.log('mongdb error', error);
            dispatch({
                type: USER_REGISTER_FAIL,
                payload:
                    error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message,
            });
        }
    };
};

//Login action

const loginUserAction = (email, password) => {
    return async dispatch => {
        try {
            dispatch({
                type: USER_LOGIN_REQUEST,
            });

            //Make the actual
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            };

            const { data } = await axios.post(
                '/user/login',
                { email, password },
                config
            );
            dispatch({
                type: USER_LOGIN_SUCCESS,
                payload: data,
            });
            //Save the user into localstorage
            localStorage.setItem('userAuthData', JSON.stringify(data));
        } catch (error) {
            dispatch({
                type: USER_LOGIN_FAIL,
                payload: error.response && error.response.data.message,
            });
        }
    };
};

//Logout action
const logoutUserAction = () => async dispatch => {
    try {
        //Remove user from storage
        localStorage.removeItem('userAuthData');
        dispatch({
            type: USER_LOGOUT_SUCCESS,
        });
    } catch (error) { }
};

export { registerUserAction, loginUserAction, logoutUserAction };