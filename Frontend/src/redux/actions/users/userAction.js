import { ALL_USERS_FAIL, ALL_USERS_REQUEST, ALL_USERS_SUCCESS, UPLOAD_FILE_FAIL, UPLOAD_FILE_REQUEST, UPLOAD_FILE_SUCCESS, USER_ADMIN_UPDATE_FAIL, USER_ADMIN_UPDATE_REQUEST, USER_ADMIN_UPDATE_SUCCESS, USER_DETAILS_FAIL, USER_DETAILS_REQUEST, USER_DETAILS_SUCCESS, USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT_SUCCESS, USER_PROFILE_FAIL, USER_PROFILE_REQUEST, USER_PROFILE_SUCCESS, USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_UPDATE_FAIL, USER_UPDATE_REQUEST, USER_UPDATE_SUCCESS } from "../actionsTypes";
import axios from "axios";

const registerUserAction = (userData) => {
    return async dispatch => {
        try {
            dispatch({
                type: USER_REGISTER_REQUEST,
            });

            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
            };

            const { data } = await axios.post('/user/register',
                userData,
                config
            );
            console.log(userData);
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

            const { data } = await axios.post('/user/login',
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
                payload: error.response.data.message,
                // payload: error.response && error.response.data.message,
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

//profile action
const getUserProfileAction = () => {
    return async (dispatch, getState) => {
        // grab the user Token from store
        const { userInfo } = getState().userLogin;
        try {
            dispatch({
                type: USER_PROFILE_REQUEST,
            });
            const config = {
                headers: {
                    authorization: `tiendat ${userInfo.token}`
                }
            };
            //make request
            const { data } = await axios.get('/user/profile', config);
            dispatch({
                type: USER_PROFILE_SUCCESS,
                payload: data,
            });
        } catch (error) {
            dispatch({
                type: USER_PROFILE_FAIL,
                payload: error.response && error.response.data.message,
            });
        }
    }
}
//update user
const updateUser = (userData) => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: USER_UPDATE_REQUEST,
                loading: true,
            });
            // Get the token of the user from store because that's what our endpoint need
            const { userInfo } = getState().userLogin;
            console.log(userInfo.token);
            //Create a config and pass to axios for authentication
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    authorization: `tiendat ${userInfo.token}`,
                },
            };
            const { data } = await axios.put('/user/auth/update', userData, config);
            dispatch({
                type: USER_UPDATE_SUCCESS,
                payload: data,
            });
        } catch (error) {
            dispatch({
                type: USER_UPDATE_FAIL,
                payload:
                    error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message,
            });
        }
    };
};
// Get all users
const allUsers = () => {
    return async (dispatch, getState) => {
        try {

            dispatch({ type: ALL_USERS_REQUEST });
            // Get the token of the user from store because that's what our endpoint need
            const { userInfo } = getState().userLogin;
            console.log(userInfo.token);
            //Create a config and pass to axios for authentication
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    authorization: `tiendat ${userInfo.token}`,
                },
            };

            const { data } = await axios.get('/user/auth/', config);

            dispatch({
                type: ALL_USERS_SUCCESS,
                payload: data.users
            })

        } catch (error) {
            dispatch({
                type: ALL_USERS_FAIL,
                payload: error.response.data.message
            })
        }
    }
};

// Update user - ADMIN
const updateUserAdmin = (id, userData) => {

    return async (dispatch, getState) => {
        try {

            dispatch({ type: USER_ADMIN_UPDATE_REQUEST });
            const { userInfo } = getState().userLogin;
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    authorization: `tiendat ${userInfo.token}`,
                },
            };

            const { data } = await axios.put(`/user/update/admin/${id}`, userData, config)

            dispatch({
                type: USER_ADMIN_UPDATE_SUCCESS,
                payload: data.success
            })

        } catch (error) {
            dispatch({
                type: USER_ADMIN_UPDATE_FAIL,
                payload: error.response.data.message
            })
        }
    }
};
// Get user details - ADMIN
const getUserDetails = (id) => {
    return async (dispatch, getState) => {
        try {

            dispatch({ type: USER_DETAILS_REQUEST });
            const { userInfo } = getState().userLogin;
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    authorization: `tiendat ${userInfo.token}`,
                },
            };


            const { data } = await axios.get(`/user/auth/${id}`, config);

            dispatch({
                type: USER_DETAILS_SUCCESS,
                payload: data.user
            })

        } catch (error) {
            dispatch({
                type: USER_DETAILS_FAIL,
                payload: error.response.data.message
            })
        }
    }
};



export { registerUserAction, loginUserAction, logoutUserAction, getUserProfileAction, updateUser, allUsers, updateUserAdmin, getUserDetails };