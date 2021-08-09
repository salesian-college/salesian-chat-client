import React from 'react';

const client = new W3CWebSocket('wss://echo.websocket.org');

class Index extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {}

  render() {
    return <h1>Hello, World.</h1>
  }
}

export default Index;