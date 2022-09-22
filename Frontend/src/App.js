
import React, { Component }  from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import AddBook from './components/Books/AddBooks';
import Header from './components/Header/Header';

// function App() {
//   return (
    
//     <div className="App">
//      <h1>Book App</h1>
//     </div>
//   );
// }

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Header />
        <h1>Book App</h1>
        {/* <Route exact path='/addbook' component={AddBook} /> */}
      </BrowserRouter>
    </>
  );
};

export default App;
