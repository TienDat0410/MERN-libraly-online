import { FETCH_AUTHOR_FAIL, FETCH_AUTHOR_REQUEST, FETCH_AUTHOR_SUCCESS } from "../../actions/actionsTypes";

const authorListReducer = (state = [], action) => {
    switch (action.type) {
      case FETCH_AUTHOR_REQUEST:
        return {
          loading: true,
        };
      case FETCH_AUTHOR_SUCCESS:
        return {
          authors: action.payload,
          loading: false,
        };
      case FETCH_AUTHOR_FAIL:
        return {
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default authorListReducer;