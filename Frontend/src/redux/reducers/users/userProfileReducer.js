const { USER_PROFILE_SUCCESS, USER_PROFILE_REQUEST, USER_UPDATE_FAIL } = require("../../actions/actionsTypes");

const userProfileReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_PROFILE_REQUEST:
            return {
                loading: true,
            };
        case USER_PROFILE_SUCCESS:
            return {
                users: action.payload,
            };
        case USER_UPDATE_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export { userProfileReducer };