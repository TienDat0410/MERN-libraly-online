import { UPLOAD_FILE_FAIL, UPLOAD_FILE_REQUEST, UPLOAD_FILE_SUCCESS } from "../../actions/actionsTypes";

const uploadFileReducer = (state = {}, action) => {
    switch (action.type) {
      case UPLOAD_FILE_REQUEST:
        return {
          loading: true,
        };
      case UPLOAD_FILE_SUCCESS:
        return {
          userfile: action.payload,
          loading: false,
        };
      case UPLOAD_FILE_FAIL:
        return {
          error: action.payload,
          loading: false,
        };
      default:
        return state;
    }
  };
  
  export default uploadFileReducer;