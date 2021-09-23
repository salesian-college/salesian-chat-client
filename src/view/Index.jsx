import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import { useParams } from "react-router"
import React, { Suspense } from 'react'
const ChatConponent = React.lazy(() => import('./Chat.jsx'))
const DashboardIndex = React.lazy(() => import('./DashboardIndex.jsx'))

function Chat() {
    let { ChatName } = useParams()
    var chatLink = "/chats/" + ChatName
    return (< ChatConponent chatLink={chatLink} />)
}

function App() {
    return (
        <Suspense fallback={<div style={{ 'height': '100%', 'display': 'flex', 'alignItems': 'center', 'justifyContent': 'center', 'padding': '10px' }}><div style={{ "padding": "10px", "margin": "10px", "backgroundClip": "padding-box", "backgroundColor": "#FFFFFF", "height": "100%", 'textAlign': 'center', 'fontFamily': 'Candara' }}>Loading....</div></div>}>
            <Router>
                <Switch>
                    <Route exact path="/" children={<div style={{ 'height': '100%', 'display': 'flex', 'alignItems': 'center', 'justifyContent': 'center', 'padding': '10px' }}>Salesian chat rooms. Written by: <a href="https://jsanderson.net">Joshua Sanderson</a></div>} />
                    <Route path="/Dashboard" children={<DashboardIndex />} />
                    <Route path="/:ChatName" children={<Chat />} />
                </Switch>
            </Router>
        </Suspense>
    );
}

export default App