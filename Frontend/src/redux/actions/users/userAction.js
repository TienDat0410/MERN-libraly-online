import { USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS } from "../actionsTypes";
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

export default registerUserAction;