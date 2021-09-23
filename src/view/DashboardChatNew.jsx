import React from 'react'
import { TextInput, Button, Form } from 'carbon-components-react'
import { Send32 } from '@carbon/icons-react'
const fetch = require('node-fetch')

class Player extends React.Component {

  getmessages = () => {
    return new Promise((resolve, reject) => {
      fetch(this.state.chatLink)
        .then(r => { resolve(r.json()) })
        .catch(e => reject(e))
    })
  }

  constructor(props) {
    super(props)
    console.log(props.chatLink)
    this.state = {
      messagesList: [],
      inputValue: "",
      chatLink: props.chatLink
    }
  }

  componentDidMount() {
    this.fetchData();
    this.timer = setInterval(this.fetchData, 2000)
  }

  updateInputValue(evt) {
    this.setState({
      inputValue: evt.target.value
    });
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  fetchData = () => {
    // this.getmessages().then(r => { this.setState({ messagesList: r }) })
  }

  submitMessage = (event) => {
    event.preventDefault()
    // CHAT LINK SUBMIT
  }

  deleteMessage = (messageNumber) => {
    if (confirm("Are you sure you want to delete this message? It cannot be undone")) {
      fetch(this.state.chatLink + '?delete=' + messageNumber.toString())
    }
    this.fetchData()
  }

  render = () => {
    return (
      <div style={{ 'width': "100vw", "height": "100vh", "display": "flex", "flex-direction": "column" }}>
        <div style={{ 'overflowY': 'scroll', "flex": "2 1 auto" }}>
          <ul>
            {this.state.messagesList.map((item, index) => {
              var date = new Date(item.date * 1000)
              var time = (date.getHours()) + ":" + ("0" + date.getMinutes()).substr(-2)
              return (
                <li key={index} style={{ 'padding': '5px' }}>
                  <button onClick={() => this.deleteMessage(index)} style={{ "width": "100%", "backgroundColor": "#f4f4f4", "padding": "10px", "border": "none", "TextAlign": "left"}}>
                    <p style={{ 'fontFamily': 'Candara', 'fontWeight': 'normal', 'fontSize': '0.75em', 'color': '#808080', 'paddingBottom': '0px' }}>{time}</p>
                    <p style={{ 'fontFamily': 'Candara', 'fontWeight': 'normal', 'fontSize': '1em', 'color': '#000000', 'paddingTop': '0px' }}>{item.content}</p>
                  </button>
                </li>
              )
            })}
          </ul>
        </div>
        <div>
          <Form onSubmit={this.submitMessage} style={{ 'width': "100vw", "display": "flex", "flex-direction": "row", "overflow": "hidden" }}>
            <TextInput
              id="Message_Box"
              placeholder="Message"
              style={{ 'fontFamily': 'Candara', 'fontWeight': 'normal', 'fontSize': '1.5em', "boxSizing": "border-box" }}
              onChange={evt => this.updateInputValue(evt)}
              value={this.state.inputValue}
            />
            <Button
              style={{ 'backgroundColor': '#005eb8', 'fontSize': '2em', "boxSizing": "border-box" }}
              hasIconOnly
              renderIcon={Send32}
              tooltipAlignment="center"
              tooltipPosition="bottom"
              iconDescription="Send Message"
              size='field'
              type="submit"
            />
          </Form>
        </div>
      </div >
    )
  }
}


export default Player