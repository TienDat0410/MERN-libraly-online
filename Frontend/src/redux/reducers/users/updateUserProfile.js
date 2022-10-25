import { USER_UPDATE_FAIL, USER_UPDATE_REQUEST, USER_UPDATE_SUCCESS } from "../../actions/actionsTypes";


const userUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_UPDATE_REQUEST:
      return {
        loading: true,
      };
    case USER_UPDATE_SUCCESS:
      return {
        loading: false,
        isUpdated: action.payload,
      };
    case USER_UPDATE_FAIL:
      return {
        isDeleted: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default userUpdateReducer;