import { DELETE_BOOK_RESET, DELETE_BOOK_REQUEST, DELETE_BOOK_SUCCESS, DELETE_BOOK_FAIL, BOOK_UPDATE_REQUEST, BOOK_UPDATE_SUCCESS, BOOK_UPDATE_FAIL, UPDATE_BOOK_RESET , CLEAR_ERRORS } from "../../actions/actionsTypes";


const bookUpdateReducer = (state = {}, action) => {
    switch (action.type) {

        case DELETE_BOOK_REQUEST:
        case BOOK_UPDATE_REQUEST:
            return {
                ...state,
                loading: true
            }

        case DELETE_BOOK_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload
            }

        case BOOK_UPDATE_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload
            }


        case DELETE_BOOK_FAIL:
        case BOOK_UPDATE_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case DELETE_BOOK_RESET:
            return {
                ...state,
                isDeleted: false
            }

        case UPDATE_BOOK_RESET:
            return {
                ...state,
                isUpdated: false
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state
    }
}

export default bookUpdateReducer;