import React from 'react';
const Login = React.lazy(() => import('./Login/Login.jsx'))
const Chat = React.lazy(() => import('./Chat/Chat.jsx'))
import useToken from './useToken.jsx';

function App() {
    const { token, setToken } = useToken();

    if (!token) return <Login setToken={setToken} />
    return <Chat chatLink={"/api/channel/" + window.location.href.substring(window.location.href.lastIndexOf('/') + 1)}/>
}

export default App