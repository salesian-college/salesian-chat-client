import React, { Suspense } from 'react'
import { BrowserRouter as Router, Switch, Route, useParams } from 'react-router-dom'
import HeaderContainer from 'carbon-components-react/lib/components/UIShell/HeaderContainer'
import { Content, Header, HeaderMenuButton, HeaderName, SkipToContent, SideNav, SideNavItems, SideNavLink } from 'carbon-components-react/lib/components/UIShell'
import { Chat32 } from '@carbon/icons-react'
const ChatConponent = React.lazy(() => import('./components/Chat/Chat.jsx'))

const Chat = () => {
  let { ChatName } = useParams()
  var chatLink = "/api/channel/" + ChatName
  return <ChatConponent chatLink={chatLink} />
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
                <HeaderName href="/dashboard" prefix=''>
                  Open Evening Dashboard
                </HeaderName>
                <SideNav aria-label="Side navigation" expanded={isSideNavExpanded} isRail={true}>
                  <SideNavItems>
                    {this.state.channels.map((channel, index) => <SideNavLink renderIcon={Chat32} key={index} href={`/dashboard/${channel}`}>{channel}</SideNavLink>)}
                  </SideNavItems>
                </SideNav>
              </Header>
              <Switch>
                <Content id="main-content">
                  <div className="bx--grid">
                    <div className="bx--row">
                      <section className="bx--offset-lg-2 bx--col-lg-10">
                        <Suspense fallback={<div style={{ 'height': '100%', 'display': 'flex', 'alignItems': 'center', 'justifyContent': 'center', 'padding': '10px' }}><div style={{ "padding": "10px", "margin": "10px", "backgroundClip": "padding-box", "backgroundColor": "#FFFFFF", "height": "100%", 'textAlign': 'center', 'fontFamily': 'Candara' }}>Loading....</div></div>}>
                          <Route exact path="/dashboard">
                            <h1>Teacher Chat Dashboard</h1>
                            <h3>Click on your subject to moderate and send chat messages</h3>
                          </Route>
                          <Route exact path="/dashboard/:ChatName" children={<Chat />} />
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
