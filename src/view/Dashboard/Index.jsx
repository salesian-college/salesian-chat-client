import React from 'react';
const Login = React.lazy(() => import('./Login/Login.jsx'))
const Dashboard = React.lazy(() => import('./Dashboard.jsx'))
import useToken from './useToken.jsx';

function App() {
    const { token, setToken } = useToken();

    if (!token) return <Login setToken={setToken} />

    return <Dashboard />
}

function Index() {
    return <App/>
}

export default Index