import React from 'react'
import { TextInput, Button, Form } from 'carbon-components-react'
import { Send32 } from '@carbon/icons-react'
const fetch = require('node-fetch')

class Player extends React.Component {

  getmessages = () => {
    return new Promise((resolve, reject) => {
      fetch(this.state.chatLink)
        .then(r => {
          resolve(r.json())
        })
        .catch(e => reject(e))
    })
  }

  constructor (props) {
    super(props)
    this.state = {
      messagesList: [],
      playerHeight: 0,
      formHeight: 0,
      width: window.innerWidth,
      height: window.innerHeight,
      inputValue: "",
      chatLink: props.chatLink
    }
  }

  componentDidMount () {
    this.fetchData()
    this.timer = setInterval(this.fetchData, 2000)
    this.timer = setInterval(this.updateCSS, 20)
    window.addEventListener('resize', this.handleWindowSizeChange)
    const formHeight = this.formElement.clientHeight
    this.setState({ formHeight })
  }

  updateInputValue (evt) {
    this.setState({
      inputValue: evt.target.value
    })
  }

  componentWillUnmount () {
    clearInterval(this.timer);
    window.removeEventListener('resize', this.handleWindowSizeChange)
  }

  fetchData = () => {
    this.getmessages().then(r => {
      this.setState({ messagesList: r })
    })
  }

  handleWindowSizeChange = () => {
    this.setState({ width: window.innerWidth })
    this.setState({ width: window.innerHeight })
    const formHeight = this.formElement.clientHeight
    this.setState({ formHeight })
  };

  submitMessage = (event) => {
    event.preventDefault()
    fetch(this.state.chatLink + '?message=' + this.state.inputValue).then(this.setState({ inputValue: "" }))
    this.fetchData()
  }

  deleteMessage = (messageNumber) => {
    if (confirm("Are you sure you want to delete this message? It cannot be undone")) {
      fetch(this.state.chatLink + '?delete=' + messageNumber.toString())
    }
    this.fetchData()
  }

  render = () => {
    return (
      <div>
        <div style={{ "backgroundClip": "padding-box", "backgroundColor": "#FFFFFF", "height": this.state.height, "paddingLeft": "20px" }}>
          <h1>Chat dashboard</h1>
          <h5>Send messages at the bottom of the page, to delete a message, click on any message and it will delete the message.</h5>
          <br/>
          <div style={{ 'overflowY': 'scroll', "height": this.state.height - this.state.formHeight - 50 }}>
            <ul>
              {this.state.messagesList.map((item, index) => (
                <li key={index} style={{ 'padding': '5px' }}>
                  <button onClick={() => this.deleteMessage(index)} style={{ "width": "100%", "backgroundColor": "#f4f4f4", "padding": "10px", "border": "none", "TextAlign": "left"}}>
                    <p style={{ 'fontFamily': 'Candara', 'fontWeight': 'normal', 'fontSize': '1vw', 'color': '#808080', 'paddingBottom': '0px', 'height': '1.5vw' }}>{item.date}</p>
                    <p style={{ 'fontFamily': 'Candara', 'fontWeight': 'normal', 'fontSize': '1vw', 'color': '#000000', 'paddingTop': '0px', 'height': '1.5vw' }}>{item.content}</p>
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <br />
          <div className="test" ref={(divElement) => { this.formElement = divElement }}>
            <Form onSubmit={this.submitMessage} style={{ 'alignContent': 'center', 'width': '100%', 'paddingBottom': '0px', "verticalAlign": "bottom", 'height': '0' }}>
              <td style={{ "width": "100%", 'display': 'inline-flex' }}>
                <TextInput
                  id="Message_Box"
                  placeholder="Message"
                  style={{ 'fontFamily': 'Candara', 'fontWeight': 'normal', 'fontSize': '1.5vw' }}
                  onChange={evt => this.updateInputValue(evt)}
                  value={this.state.inputValue}
                />
                <Button
                  style={{ 'backgroundColor': '#005eb8', 'fontSize': '1.5vw' }}
                  hasIconOnly
                  renderIcon={Send32}
                  tooltipAlignment="center"
                  tooltipPosition="bottom"
                  iconDescription="Send Message"
                  size='field'
                  type="submit"
                />
              </td>
            </Form>
          </div>
        </div>
      </div>
    )
  }
}


export default Player