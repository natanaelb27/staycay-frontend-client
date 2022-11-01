import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Routes from './routes';
import AuthVerify from './helpers/AuthVerify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes />
      <AuthVerify logOut={() => {
        localStorage.clear();
      }}
      />
    </BrowserRouter>
  );
}

export default App;
