import axios from 'axios';
import { ADD_AUTHOR_FAIL, ADD_AUTHOR_REQUEST, ADD_AUTHOR_SUCCESS, DELETE_AUTHOR_FAIL, DELETE_AUTHOR_REQUEST, DELETE_AUTHOR_SUCCESS, FETCH_AUTHOR_FAIL, FETCH_AUTHOR_REQUEST, FETCH_AUTHOR_SUCCESS } from '../actionsTypes';

//add author
const AddAuthors = (formData) => {
  return async (dispatch, getState) => {
    // grab the user Token from store
    const { userInfo } = getState().userLogin;
    try {
      dispatch({
        type: ADD_AUTHOR_REQUEST,
        loading: true,
      });
      const config = {
        headers: {
          authorization: `tiendat ${userInfo.token}`,
          'Content-Type': 'application/json'
        }
      };
      const { data } = await axios.post('/author/auth', formData, config);

      dispatch({
        type: ADD_AUTHOR_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ADD_AUTHOR_FAIL,
        error: error.response && error.response.data.message,
      });
    }
  };
};
//
const fetchAuthors = () => {
  return async (dispatch, getState) => {
    // grab the user Token from store
    const { userInfo } = getState().userLogin;
    try {
      dispatch({
        type: FETCH_AUTHOR_REQUEST,
        loading: true,
      });
      const config = {
        headers: {
          authorization: `tiendat ${userInfo.token}`,
          'Content-Type': 'application/json'
        }
      };
      const { data } = await axios.get('/author', config);

      dispatch({
        type: FETCH_AUTHOR_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: FETCH_AUTHOR_FAIL,
        error: error.response && error.response.data.message,
      });
    }
  };
};

// Delete author (Admin)
export const dltAuthor = (id) => {
  return async (dispatch, getState) => {
  const { userInfo } = getState().userLogin;
  try {
    dispatch({ type: DELETE_AUTHOR_REQUEST });
    const config = {
      headers: {
        authorization: `tiendat ${userInfo.token}`,
        'Content-Type': 'application/json'
      }
    };

    const { data } = await axios.delete(`/author/auth/${id}`, config);

    dispatch({
      type: DELETE_AUTHOR_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_AUTHOR_FAIL,
      payload: error.response.data.message,
    });
  }
}
};


export { fetchAuthors, AddAuthors };