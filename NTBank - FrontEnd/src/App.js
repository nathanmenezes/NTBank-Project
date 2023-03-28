import React from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";

import Main from "./pages/Main/Main";
import Register from "./pages/Register/Register";
import "./App.css"
import Login from "./pages/Login/Login";
import Account from "./pages/Account/Account";
function App() {
  return (
    <BrowserRouter>
      <Routes>
            <Route path='/' element={<Main />}/>
            <Route path='/cadastrar' element={<Register />}/>
            <Route path='/login' element={<Login />}/>
            <Route path='/conta' element={<Account />}/>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
