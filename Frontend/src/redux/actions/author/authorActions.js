import axios from 'axios';
import { FETCH_AUTHOR_FAIL, FETCH_AUTHOR_REQUEST, FETCH_AUTHOR_SUCCESS } from '../actionsTypes';


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

export {fetchAuthors};