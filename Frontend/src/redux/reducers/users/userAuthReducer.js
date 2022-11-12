import { ALL_USERS_FAIL, ALL_USERS_REQUEST, ALL_USERS_SUCCESS, CLEAR_ERRORS, DELETE_USER_FAIL, DELETE_USER_REQUEST, DELETE_USER_RESET, DELETE_USER_SUCCESS, USER_ADMIN_UPDATE_FAIL, USER_ADMIN_UPDATE_REQUEST, USER_ADMIN_UPDATE_RESET, USER_ADMIN_UPDATE_SUCCESS, USER_DETAILS_FAIL, USER_DETAILS_REQUEST, USER_DETAILS_SUCCESS, USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT, USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS } from "../../actions/actionsTypes";


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

const allUsersReducer = (state = { users: [] }, action) => {
    switch (action.type) {
        case ALL_USERS_REQUEST:
            return {
                ...state,
                loading: true,
            };

        case ALL_USERS_SUCCESS:
            return {
                ...state,
                loading: false,
                users: action.payload,
            };

        case ALL_USERS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };

        default:
            return state;
    }
};
const userUpdateAndDelete = (state = {}, action) => {
    switch (action.type) {

        case USER_ADMIN_UPDATE_REQUEST:
        case DELETE_USER_REQUEST:

            return {
                ...state,
                loading: true,
            };

        case USER_ADMIN_UPDATE_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload,
            };
        case DELETE_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload,
            };

        case USER_ADMIN_UPDATE_RESET:
            return {
                ...state,
                isUpdated: false,
            };
        case DELETE_USER_RESET:
            return {
                ...state,
                isDeleted: false,
            };
        case USER_ADMIN_UPDATE_FAIL:
        case DELETE_USER_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };

        default:
            return state;
    }
};
const userDetailsReducer = (state = { user: {} }, action) => {
    switch (action.type) {
        case USER_DETAILS_REQUEST:
            return {
                ...state,
                loading: true,
            };

        case USER_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false,
                user: action.payload,
            };

        case USER_DETAILS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };

        default:
            return state;
    }
};

export { userAuthReducer, allUsersReducer, userUpdateAndDelete, userDetailsReducer };