import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import { useParams } from "react-router"
import React, { Suspense } from 'react'
const ChatConponent = React.lazy(() => import('./Chat.jsx'))
const DashboardIndex = React.lazy(() => import('./DashboardIndex.jsx'))

function Chat() {
    let { ChatName } = useParams()
    var chatLink = "/api/channel/" + ChatName
    return (< ChatConponent chatLink={chatLink} />)
}

function App() {
    return (
        <Suspense fallback={<div style={{ 'height': '100%', 'display': 'flex', 'alignItems': 'center', 'justifyContent': 'center', 'padding': '10px' }}><div style={{ "padding": "10px", "margin": "10px", "backgroundClip": "padding-box", "backgroundColor": "#FFFFFF", "height": "100%", 'textAlign': 'center', 'fontFamily': 'Candara' }}>Loading....</div></div>}>
            <Router>
                <Switch>
                    <Route exact path="/" children={<div style={{ 'height': '100%', 'display': 'flex', 'alignItems': 'center', 'justifyContent': 'center', 'padding': '10px' }}>Hi, I am <a href="https://jsanderson.net">Josh</a> and I am the technical director of website operations, and I will be assisting with this website.</div>} />
                    <Route path="/Dashboard" children={<DashboardIndex />} />
                    <Route path="/:ChatName" children={<Chat />} />
                </Switch>
            </Router>
        </Suspense>
    );
}

export default App