
import React, { Component, useEffect, useState } from 'react';
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import './App.css';
import AddBook from './components/Books/AddBooks';
import Books from './components/Books/FetchBook';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import Profile from './components/Profile/Profile';
import UpdateProfile from './components/Profile/UpdateProfile';
//
import LoginUser from './components/Login/Login';
import RegisterUser from './components/Register/Register';
import BookDetail from './components/Books/BookDetail';
import Authors from './components/Authors/FetchAuthors';
import Footer from './components/Footer/Footer';
import BookHome from './components/Books/book';

import Dashboard from './components/admin/Dashboard';
import ListBooks from './components/admin/ListBook';
import ListOrders from './components/order/ListOrders';
import Cart from './components/Cart/Cart';
import Shipping from './components/Cart/Shipping';
import ConfirmOrder from './components/Cart/ConfirmOrder';
import OrderSuccess from './components/Cart/OrderSuccess';
import OrdersList from './components/admin/OrdersList';
import { getUserProfileAction } from './redux/actions/users/userAction';

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Payment from './components/Cart/Payment';
//
import store from "./redux/store/store";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import ProcessOrder from './components/admin/ProcessOrder';
import UpdateBook from './components/admin/UpdateBook';
import NewAuthor from './components/Authors/addAuthors';
import ListAuthors from './components/Authors/ListAuthors';
import UsersList from './components/admin/UsersList';
import UpdateUserAdmin from './components/admin/UpdateUser';
//

const stripePromise = loadStripe('pk_test_51M2RnIJWdYJbdc7DSlRkynwVzE1WCeqAtHMAMfiKNpuwrk5rLynWLZ90M68YWmOyzaZeRjNJZ6uTCY93GiIGv9B800vVgCD44D');
// console.log(stripePromise);

const App = () => {
  const [stripeApiKey, setStripeApiKey] = useState("");
  // const userLogin = useSelector(state => state.userLogin);
  // const { userInfo } = userLogin;
  // const dispatch = useDispatch();

  useEffect(() => {
    // store.dispatch(getUserProfileAction());
    // dispatch(getUserProfileAction());

    async function getStripApiKey() {


      const { data } = await axios.get("/payment/stripeapi");

      setStripeApiKey(data.stripeApiKey);
    }

    getStripApiKey();
  }, []);
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path="/search/:keyword" element={<Home />} />

        {/* test datatable */}
        <Route exact path='/bookhome' element={<BookHome />} />

        <Route exact path='/profile' element={<Profile />} />
        <Route exact path='/user-update' element={<UpdateProfile />} />
        <Route exact path='/admin/users' element={<UsersList />} />
        <Route exact path='/admin/updateUser/:id' element={<UpdateUserAdmin />} />



        <Route exact path='/addbook' element={<AddBook />} />
        <Route exact path='/getallbook' element={<Books />} />
        <Route exact path='/bookdetail/:id' element={<BookDetail />} />
        <Route exact path='/bookupdate/:id' element={<UpdateBook />} />


        <Route exact path='/author' element={<Authors />} />
        <Route exact path='/listAuthor' element={<ListAuthors />} />
        <Route exact path='/newAuthor' element={<NewAuthor />} />



        <Route exact path='/register' element={<RegisterUser />} />
        <Route path="/login" element={<LoginUser />} />

        <Route path="/dashboard" element={<Dashboard />} />
        <Route exact path='/admin/listbook' element={<ListBooks />} />
        <Route exact path='/orders/me' element={<ListOrders />} />
        {/* đang test */}
        <Route exact path='/auth' element={<OrdersList />} />
        <Route exact path='/order/auth/:id' element={<ProcessOrder />} />
        {/* <Route exact path='/order/auth/:id' element={<ProcessOrder />} /> */}




        <Route exact path='/cart' element={<Cart />} />
        <Route exact path='/shipping' element={<Shipping />} />
        <Route exact path='/confirm' element={<ConfirmOrder />} />
        {/* payment */}
        <Route path='/payment' element={stripeApiKey &&
        <Elements stripe={loadStripe(stripeApiKey)}> <Payment /></Elements>} exact />

        <Route exact path='/success' element={<OrderSuccess />} />

        <Route exact path='/admin/orders' element={<OrdersList />} />

      </Routes>
      <Footer />
    </BrowserRouter>

  );
}

export default App;
