import axios from 'axios';
const { CREATE_BOOK_REQUEST, CREATE_BOOK_SUCCESS, CREATE_BOOK_FAIL, FETCH_BOOK_REQUEST, FETCH_BOOK_SUCCESS, FETCH_BOOK_FAIL } = require("../actionsTypes");

const createBookAction = bookData => {
    return async (dispatch) => {
        try {
            dispatch({
                type: CREATE_BOOK_REQUEST,
            });

            const config = {
                'Content-Type': 'application/json',
                
            };

            const { data } = await axios.post('/book/auth', bookData, {
                // headers: {
                //     "Content-Type": "multipart/form-data"
                // }
            });

            dispatch({
                type: CREATE_BOOK_SUCCESS,
                payload: data,
            });
        } catch (error) {
            dispatch({
                type: CREATE_BOOK_FAIL,
                payload: error.response && error.response.data.message,
            });
        }
    };
};
//Fetch all books

export const fetchBooks = () => {
    return async dispatch => {
        try {
            dispatch({
                type: FETCH_BOOK_REQUEST,
                loading: true,
            });
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            };
            const { data } = await axios.get('/book', config);

            dispatch({
                type: FETCH_BOOK_SUCCESS,
                payload: data,
            });
        } catch (error) {
            dispatch({
                type: FETCH_BOOK_FAIL,
                error: error.response && error.response.data.message,
            });
        }
    };
};


export { createBookAction };