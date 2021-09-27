import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import { useParams } from "react-router"
import React, { Suspense } from 'react'
const ChatConponent = React.lazy(() => import('./Chat/Chat.jsx'))
const DashboardIndex = React.lazy(() => import('./Dashboard/Index.jsx'))
const Home = React.lazy(() => import('./Home.jsx'))

function Chat() {
    let { ChatName } = useParams()
    var chatLink = "/api/channel/" + ChatName
    return (< ChatConponent chatLink={chatLink} />)
}

function App() {
    return (
        <Suspense fallback={<div style={{'display': 'flex', 'justifyContent': 'center', 'padding': '50px' }}><div>Loading....</div></div>}>
            <Router>
                <Switch>
                    <Route exact path="/" children={<Home />} />
                    <Route path="/dashboard" children={<DashboardIndex />} />
                    <Route path="/:ChatName" children={<Chat />} />
                </Switch>
            </Router>
        </Suspense>
    );
}

export default App