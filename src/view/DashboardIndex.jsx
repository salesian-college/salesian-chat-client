import React, { Suspense, useState, useEffect } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams
} from 'react-router-dom'
import HeaderContainer from 'carbon-components-react/lib/components/UIShell/HeaderContainer'
import {
  Content,
  Header,
  HeaderMenuButton,
  HeaderName,
  SkipToContent,
  SideNav,
  SideNavItems
} from 'carbon-components-react/lib/components/UIShell'
import NavLink from './components/NavLink.jsx'
const ChatConponent = React.lazy(() => import('./DashboardChatNew.jsx'))

const Chat = () => {
  let { ChatName } = useParams()
  var chatLink = "/api/channel/" + ChatName
  return <ChatConponent chatLink={chatLink}/>
}

class DashboardIndex extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      channels: [],
    }
  }

  componentDidMount() {
    fetch("/api/channel")
      .then(r => r.json())
      .then(channels => this.setState({ channels }))
  }

  render = () => (
    <div className="container bx--theme--g100">
      <Router>
        <HeaderContainer
          render={({ isSideNavExpanded, onClickSideNavExpand }) => (
            <>
              <Header aria-label="Open Evening Dashboard">
                <SkipToContent />
                <HeaderMenuButton
                  aria-label="Open menu"
                  onClick={onClickSideNavExpand}
                  isActive={isSideNavExpanded}
                />
                <HeaderName href="/Dashboard" prefix=''>
                  Open Evening Dashboard
                </HeaderName>
                <SideNav aria-label="Side navigation" expanded={isSideNavExpanded}>
                  <SideNavItems>
                    {this.state.channels.map((channel, index) => <NavLink key={index} to={`/dashboard/${channel}`} label={channel}/>)}
                  </SideNavItems>
                </SideNav>
              </Header>
              <Switch>
                <Content id="main-content">
                  <div className="bx--grid">
                    <div className="bx--row">
                      <section className="bx--offset-lg-2 bx--col-lg-10">
                        <Suspense fallback={<div style={{ 'height': '100%', 'display': 'flex', 'alignItems': 'center', 'justifyContent': 'center', 'padding': '10px' }}><div style={{ "padding": "10px", "margin": "10px", "backgroundClip": "padding-box", "backgroundColor": "#FFFFFF", "height": "100%", 'textAlign': 'center', 'fontFamily': 'Candara' }}>Loading....</div></div>}>
                          <Route exact path="/Dashboard">
                            <h1>Teacher Chat Dashboard</h1>
                            <h3>Click on your subject to moderate and send chat messages</h3>
                          </Route>
                          <Route exact path="/Dashboard/:ChatName" children={<Chat />} />
                        </Suspense>
                      </section>
                    </div>
                  </div>
                </Content>
              </Switch>
            </>
          )}
        />
      </Router>
    </div>
  )
}
export default DashboardIndex
