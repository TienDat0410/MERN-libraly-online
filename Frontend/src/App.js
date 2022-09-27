
import React, { Component } from 'react';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import './App.css';
import AddBook from './components/Books/AddBooks';
import Books from './components/Books/FetchBook';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
//cần chia ra 2 phần thành action và phần component ko gộp cả hai
import Login from './redux/actions/Login/Login';
import Register from './redux/actions/Register/Register';
import RegisterUser from './components/Register/Register';

// function App() {
//   return (

//     <div className="App">
//      <h1>Book App</h1>
//     </div>
//   );
// }
// import { BrowserRouter } from 'react-router-dom'
// ReactDOM.render((
//   <BrowserRouter>
//     <App />

//   </BrowserRouter>
// ), document.getElementById('root'))

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route exact path='/' element={<Home/>} />
        <Route exact path='/addbook' element={<AddBook/>} />
        <Route exact path='/getallbook' element={<Books/>} />
        <Route exact path='/register' element={<RegisterUser/>} />
        {/* <Route path="/register" element={<Register />} /> Hậu */}
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
