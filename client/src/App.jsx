import {BrowserRouter, Routes, Route} from "react-router-dom";
import React from 'react'
import {Home} from "./pages/Home";
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";
import { Service } from "./pages/Service";
import { Register } from "./pages/Register";
import { Login } from "./pages/Login";
import { Navbar } from "./Components/Navbar";
import { Error } from "./pages/Error";
import { Logout } from "./pages/Logout";

const App = () => {
  return (
   <>
    <BrowserRouter>
    <Navbar/>
      <Routes>
        <Route path="/" element = { <Home/> }/>;
        <Route path="/about" element = { <About/> }/>;
        <Route path="/contact" element = { <Contact/> }/>;
        <Route path="/service" element = { <Service/> }/>;
        <Route path="/register" element = { <Register/> }/>;
        <Route path="/login" element = { <Login/> }/>;
        <Route path="/logout" element = { <Logout/> }/>;
        <Route path="*" element = { <Error/> }/>;
      </Routes>
    </BrowserRouter>
   </>
  )
}

export default App