import { ADD_AUTHOR_FAIL, ADD_AUTHOR_REQUEST, ADD_AUTHOR_SUCCESS, CLEAR_ERRORS, DELETE_AUTHOR_FAIL, DELETE_AUTHOR_REQUEST, DELETE_AUTHOR_RESET, DELETE_AUTHOR_SUCCESS, FETCH_AUTHOR_FAIL, FETCH_AUTHOR_REQUEST, FETCH_AUTHOR_SUCCESS, NEW_AUTHOR_RESET } from "../../actions/actionsTypes";

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

const addAuthorReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_AUTHOR_REQUEST:
      return {
        loading: true,
      };
    case ADD_AUTHOR_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        authors: action.payload,

      };
    case ADD_AUTHOR_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case NEW_AUTHOR_RESET:
      return {
        ...state,
        success: false,
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

const dltAuthorReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_AUTHOR_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case DELETE_AUTHOR_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };

    case DELETE_AUTHOR_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case DELETE_AUTHOR_RESET:
      return {
        ...state,
        isDeleted: false,
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

export { authorListReducer, addAuthorReducer, dltAuthorReducer };