import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import CreateTrigger from './components/Triggers/CreateTrigger';
import ListTriggers from './components/Triggers/ListTriggers';

const App = () => (
    <Router>
        <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/triggers/create" element={<CreateTrigger />} />
            <Route path="/triggers/list" element={<ListTriggers />} />
        </Routes>
    </Router>
);


export default App;
