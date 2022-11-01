import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Routes from './routes';
import AuthVerify from './helpers/AuthVerify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

function App() {
  console.log(process.env.REACT_APP_API_URL);
  console.log(process.env.REACT_APP_CLOUDINARY_API_KEY);
  console.log(process.env.REACT_APP_CLOUDINARY_API_URL);
  console.log(process.env.REACT_APP_CLOUDINARY_PRESET_NAME);
  console.log(process.env.REACT_APP_URL);
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
