import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createBookReducer } from '../reducers/books/createBookReducer';
import booksListReducer from '../reducers/books/bookListReducer';
import userAuthReducer from '../reducers/users/userAuthReducer';


const middlewares = [thunk];

const reducer = combineReducers({
    bookcreated: createBookReducer,
    booksList: booksListReducer,
    userLogin: userAuthReducer, //login and register
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
    composeWithDevTools(applyMiddleware(...middlewares))
);

export { store };