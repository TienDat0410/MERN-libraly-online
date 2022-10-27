
import React, { Component } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
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
import ProtectedRoute from './components/routeAuth/ProtectedRoute';
import Dashboard from './components/admin/Dashboard';
import ListBooks from './components/admin/ListBook';


const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/bookhome' element={<BookHome />} />
        <Route exact path='/profile' element={<Profile />} />
        <Route exact path='/user-update' element={<UpdateProfile />} />

        <Route exact path='/addbook' element={<AddBook />} />
        <Route exact path='/getallbook' element={<Books />} />
        <Route exact path='/bookdetail/:id' element={<BookDetail />} />
        <Route exact path='/author' element={<Authors />} />
        <Route exact path='/register' element={<RegisterUser />} />
        <Route path="/login" element={<LoginUser />} />

        <Route path="/dashboard" element={<Dashboard />} />
        <Route exact path='/admin/listbook' element={<ListBooks />} />

      </Routes>
      <Footer />
        
     
    </BrowserRouter>

  );
}

export default App;
