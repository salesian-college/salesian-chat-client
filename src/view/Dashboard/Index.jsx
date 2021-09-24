import React, { useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Login from './components/LoginManager.jsx';
import Dashboard from './Dashboard.jsx';
import useToken from './components/useToken.jsx';

function App() {
    const { token, setToken } = useToken();

    if (!token) return <Login setToken={setToken} />

    return <Dashboard />
}

export default App;