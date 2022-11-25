import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import UserOverview from './components/User-overview';
import MessageOverview from './components/Message-overview';
import Login from './components/Login';
import Status from './components/Status';
import Publish from './components/Publish';
import Friends from './components/Friends';

function login() {}

function App() {
    if (sessionStorage.getItem('id') === null) {
        return (
            <>
                <main className="container mt-5">
                    <Login />
                </main>
            </>
        );
    } else {
        return (
            <main className="container mt-5">
                <div id="container" className="">
                    <div id="Messages" className="border border-dark shadow  mb-5 bg-white rounded">
                        <MessageOverview />
                    </div>

                    <div
                        className=" m-3 border border-dark shadow  mb-5 bg-white rounded"
                        id="Status"
                    >
                        <Status />
                    </div>
                    <div
                        className="  m-3 border border-dark shadow  mb-5 bg-white rounded"
                        id="Publish"
                    >
                        <Publish />
                    </div>

                    <div
                        className="  m-3 border border-dark shadow  mb-5 bg-white rounded"
                        id="Friends"
                    >
                        <Friends />
                    </div>
                </div>
            </main>
        );
    }
}

export default App;
