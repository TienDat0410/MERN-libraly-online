import { USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT, USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS } from "../../actions/actionsTypes";


const userAuthReducer = (state = {}, action) => {
    switch (action.type) {
        // Register
        case USER_REGISTER_REQUEST:
            return { 
                loading: true 
            };
        case USER_REGISTER_SUCCESS:
            return {               
                userInfo: action.payload,
            };
        case USER_REGISTER_FAIL:
            return {               
                error: action.payload,
                loading: false,
            };
        // Login
        case USER_LOGIN_REQUEST:
            return {
                loading: true,
            };
        case USER_LOGIN_SUCCESS:
            return {              
                userInfo: action.payload,
            };
        case USER_LOGIN_FAIL:
            return {
                error: action.payload,
            };
        // Logout
        case USER_LOGOUT:
            return {};
        default:
            return state;
    }
};

export default userAuthReducer;