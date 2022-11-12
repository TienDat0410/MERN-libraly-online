import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createBookReducer } from '../reducers/books/createBookReducer';
import booksListReducer from '../reducers/books/bookListReducer';
import {userAuthReducer, allUsersReducer, userUpdateAndDelete, userDetailsReducer} from '../reducers/users/userAuthReducer';
import { userProfileReducer } from '../reducers/users/userProfileReducer';
import userUpdateReducer from '../reducers/users/updateUserProfile';
import bookDetailReducer from '../reducers/books/bookDetailsReducer';

import {authorListReducer, addAuthorReducer, dltAuthorReducer} from '../reducers/author/authorListReducer'
import { callCardReducer, callCartReducer } from '../reducers/callcard/callCardReducer';
import { allOrdersReducer, myOrdersReducer, newOrderReducer, orderDetailsReducer, orderReducer } from '../reducers/order/orderReducer';
import bookUpdateReducer from '../reducers/books/bookUpdateReducer';


// const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const middlewares = [thunk];

const reducer = combineReducers({
    bookcreated: createBookReducer,
    booksList: booksListReducer,
    bookDetails: bookDetailReducer,
    bookUpdateAndDelete: bookUpdateReducer,
    //user
    userLogin: userAuthReducer, //login and register
    userProfile: userProfileReducer, //profile
    updatedUser: userUpdateReducer, //update
    allUsers: allUsersReducer,
    userUpdateAndDlt: userUpdateAndDelete,
    userDetails: userDetailsReducer,
    //author
    authorsList: authorListReducer,
    authorcreated: addAuthorReducer,
    dltAuthor: dltAuthorReducer,

    //upload file
    // uploadFiles: uploadFileReducer,
    cart: callCardReducer,
    //
    newOrder: newOrderReducer,
	myOrders: myOrdersReducer,
	allOrders: allOrdersReducer,
	orderDetails: orderDetailsReducer,
	order: orderReducer,
});

//Get user from local

const userAuthFromStorage = localStorage.getItem('userAuthData')
    ? JSON.parse(localStorage.getItem('userAuthData'))
    : null;
const loanInfo = localStorage.getItem("loanInfo")
    ? JSON.parse(localStorage.getItem("loanInfo"))
    : {};
const callCardItems = localStorage.getItem("callCardItems")
? JSON.parse(localStorage.getItem("callCardItems"))
: [];

const initialSate = {
    userLogin: {
        userInfo: userAuthFromStorage
    },
    cart: {
        callCardItems: callCardItems,
		loanInfo: loanInfo,
    }
}

console.log(userAuthFromStorage);

const store = createStore(
    reducer,
    initialSate,
    composeWithDevTools(applyMiddleware(...middlewares)),
    // composeEnhancer(applyMiddleware(thunk))
);

export default store;




