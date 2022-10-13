import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createBookReducer } from '../reducers/books/createBookReducer';
import booksListReducer from '../reducers/books/bookListReducer';
import userAuthReducer from '../reducers/users/userAuthReducer';
import { userProfileReducer } from '../reducers/users/userProfileReducer';
import userUpdateReducer from '../reducers/users/updateUserProfile';
import bookDetailReducer from '../reducers/books/bookDetailsReducer';
import uploadFileReducer from '../reducers/uploadfiles/uploadFileReducer';

// const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const middlewares = [thunk];

const reducer = combineReducers({
    bookcreated: createBookReducer,
    booksList: booksListReducer,
    bookDetails: bookDetailReducer,
    //user
    userLogin: userAuthReducer, //login and register
    userProfile: userProfileReducer, //profile
    updatedUser: userUpdateReducer, //update
    //upload file
    uploadFiles: uploadFileReducer,

});

//Get user from local

const userAuthFromStorage = localStorage.getItem('userAuthData')
    ? JSON.parse(localStorage.getItem('userAuthData'))
    : null;

const initialSate = {
    userLogin: {
        userInfo: userAuthFromStorage
    },
}
console.log(userAuthFromStorage);

const store = createStore(
    reducer,
    initialSate,
    composeWithDevTools(applyMiddleware(...middlewares)),
    // composeEnhancer(applyMiddleware(thunk))
);

export { store };