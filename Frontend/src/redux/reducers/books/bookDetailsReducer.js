import { BOOK_DETAIL_FAIL, BOOK_DETAIL_REQUEST, BOOK_DETAIL_SUCCESS, CLEAR_ERRORS } from "../../actions/actionsTypes";

const bookDetailReducer = (state = { book: {} }, action) => {
  switch (action.type) {
    case BOOK_DETAIL_REQUEST:
      return {
        loading: true,
      };
    case BOOK_DETAIL_SUCCESS:
      return {
        loading: false,
        book: action.payload,
      };
    case BOOK_DETAIL_FAIL:
      return {
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null
      }
    default:
      return state;
  }
};

export default bookDetailReducer;