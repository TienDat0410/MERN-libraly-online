
import React, { Component, Fragment } from 'react';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
// import './App.css';
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
//
import Head from 'next/head';

import { CacheProvider } from '@emotion/react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import {theme} from './theme/index';
import { createEmotionCache } from './utils/create-emotion-cache';
import { AuthConsumer, AuthProvider } from './contexts/auth-context';

const clientSideEmotionCache = createEmotionCache();

const App = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>
          Material Kit Pro
        </title>
        <meta
          name="viewport"
          content="initial-scale=1, width=device-width"
        />
      </Head>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <AuthProvider>
            <AuthConsumer>
              
                  <Fragment />
                   getLayout(<Component {...pageProps} />
              
            </AuthConsumer>
          </AuthProvider>
        </ThemeProvider>
      </LocalizationProvider>
    </CacheProvider>
    
    // <BrowserRouter>
    //   <Header />
    //   <Routes>
    //     <Route exact path='/' element={<Home/>} />
    //     <Route exact path='/profile' element={<Profile/>} />
    //     <Route exact path='/user-update' element={<UpdateProfile/>} />

    //     <Route exact path='/addbook' element={<AddBook/>} />
    //     <Route exact path='/getallbook' element={<Books/>} />
    //     <Route exact path='/bookdetail/:id' element={<BookDetail/>} />

    //     {/* author */}
    //     <Route exact path='/author' element={<Authors/>} />


    //     <Route exact path='/register' element={<RegisterUser/>} />
    //     <Route path="/login" element={<LoginUser />} />
    //   </Routes>
    // </BrowserRouter>
  );
}

export default App;
