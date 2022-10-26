import axios from 'axios';
const { CREATE_BOOK_REQUEST, CREATE_BOOK_SUCCESS, CREATE_BOOK_FAIL, FETCH_BOOK_REQUEST, FETCH_BOOK_SUCCESS, FETCH_BOOK_FAIL, DELETE_BOOK_REQUEST, DELETE_BOOK_SUCCESS, DELETE_BOOK_FAIL, BOOK_UPDATE_REQUEST, BOOK_UPDATE_SUCCESS, BOOK_UPDATE_FAIL, BOOK_DETAIL_REQUEST, BOOK_DETAIL_SUCCESS, BOOK_DETAIL_FAIL, CLEAR_ERRORS } = require("../actionsTypes");

const createBookAction = bookData => {
  return async (dispatch, getState) => {
    // grab the user Token from store
    const { userInfo } = getState().userLogin;
    try {
      dispatch({
        type: CREATE_BOOK_REQUEST,
        loading: true,
      });

      const config = {
        headers: {
          authorization: `tiendat ${userInfo.token}`,
          'Content-Type': 'application/json',
        }
      };
      // headers: {
      //     "Content-Type": "multipart/form-data"
      // }

      const { data } = await axios.post('/book/auth', bookData, config);

      dispatch({
        type: CREATE_BOOK_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: CREATE_BOOK_FAIL,
        error: error.response && error.response.data.message,
      });
    }
  };
};
//Fetch all books

const fetchBooks = () => {
  return async (dispatch, getState) => {
    // grab the user Token from store
    const { userInfo } = getState().userLogin;
    try {
      dispatch({
        type: FETCH_BOOK_REQUEST,
        loading: true,
      });
      const config = {
        headers: {
          authorization: `tiendat ${userInfo.token}`,
          'Content-Type': 'application/json'
        }
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
// delete book
const deleteBook = id => {
  return async (dispatch, getState) => {
    // grab the user Token from store
    const { userInfo } = getState().userLogin;
    try {
      dispatch({
        type: DELETE_BOOK_REQUEST,
        loading: true,
      });

      const config = {
        headers: {
          authorization: `tiendat ${userInfo.token}`,
          'Content-Type': 'application/json',
        },
      };
      const { data } = await axios.delete(`/book/auth/${id}`, config);
      dispatch({
        type: DELETE_BOOK_SUCCESS,
        payload: data,
      });

      dispatch({
        type: FETCH_BOOK_SUCCESS,
      });
    } catch (error) {
      dispatch({
        type: DELETE_BOOK_FAIL,
        loading: false,
        error: error.response && error.response.data.message,
      });
    }
  };
};

//Fetch a signle book
const fetchBook = (id) => {
  return async (dispatch, getState) => {
    // grab the user Token from store
    // const { userInfo } = getState().userLogin;
    try {
      dispatch({
        type: BOOK_DETAIL_REQUEST,
        loading: true,
      });
      const config = {
        headers: {
          // authorization: `tiendat ${userInfo.token}`,
          'Content-Type': 'application/json',
        },
      };
      const { data } = await axios.get(`/book/auth/${id}`, config);

      dispatch({
        type: BOOK_DETAIL_SUCCESS,
        payload: data.book,
      });
    } catch (error) {
      dispatch({
        type: BOOK_DETAIL_FAIL,
        payload: error.response.data.message,
      });
    }
  };
};

//UPDATE BOOK

const updateBook = (id, bookData) => {
  return async (dispatch, getState) => {
    // grab the user Token from store
    const { userInfo } = getState().userLogin;
    try {
      dispatch({
        type: BOOK_UPDATE_REQUEST,
        loading: true,
      });

      const config = {
        headers: {
          authorization: `tiendat ${userInfo.token}`,
          'Content-Type': 'application/json',
        },
      };
      const { data } = await axios.put(`/book/auth/${id}`, bookData, config);
      dispatch({
        type: BOOK_UPDATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: BOOK_UPDATE_FAIL,
        loading: false,
        error: error.response && error.response.data.message,
      });
    }
  };
}

const clearErrors = () => async (dispatch) => {
	dispatch({
		type: CLEAR_ERRORS,
	});
};


export { createBookAction, fetchBooks, deleteBook, updateBook, fetchBook, clearErrors };