import { useState, useEffect, useCallback } from "react";
import { Routes, Route } from "react-router-dom";
import Main from "../pages/main/Main";
import About from "../pages/about/About";
import Contacts from "../pages/contacts/Contacts";
import Register from "../pages/register/Register";
import Login from "../pages/login/Login";
import Header from "../header/Header";
import './app.scss';

const App = () => {

    return (
        <div className="app">
            <div className="app-container">
                {/* <Header /> */}
                <Routes>
                    <Route path="/about" element={<About />}/>
                    <Route path="/contacts" element={<Contacts />}/>
                    <Route path="/registration" element={<Register />}/>
                    <Route path="/login" element={<Login />}/>
                    <Route path="/" element={<Main children={() => <Header/>}/>}/>
                </Routes>
            </div>
        </div>
        
    )
}

export default App;
