import React from 'react'
import { TextInput, Button, Form } from 'carbon-components-react'
import { Send32 } from '@carbon/icons-react'
const fetch = require('node-fetch')
import "./Chat.css"

class Chat extends React.Component {

  getToken = () => {
    return sessionStorage.getItem('token');
  }

  getmessages = () => {
    return new Promise((resolve, reject) => {
      fetch(this.state.chatLink)
        .then(r => { resolve(r.json()) })
        .catch(e => reject(e))
    })
  }

  constructor(props) {
    super(props)
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
    this.getmessages().then(r => { this.setState({ messagesList: r }) })
  }

  submitMessage = (event) => {
    event.preventDefault()
    fetch(this.props.chatLink,
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'sal-token': this.getToken()
        },
        method: "POST",
        body: JSON.stringify({ "content": this.state.inputValue })
      })
      .then(r => r.json())
      .then((r) => {
        this.setState({ messagesList: r, inputValue: "" })
      })
  }

  deleteMessage = (message) => {
    if (confirm("Are you sure you want to delete this message? It cannot be undone")) {
      fetch(this.props.chatLink + "/delete",
        {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Sal-Token': this.getToken()
          },
          method: "POST",
          body: JSON.stringify(message)
        })
        .then(r => r.json())
        .then((r) => {
          this.setState({ messagesList: r, inputValue: "" })
        })
    }
    this.fetchData()
  }

  render = () => {
    return (
      <div className="chat-container">
        <div className="messages-container">
          <ul>
            {this.state.messagesList.map((item, index) => {
              var date = new Date(item.date * 1000)
              var time = (date.getHours()) + ":" + ("0" + date.getMinutes()).substr(-2)
              var className = "message"
              if (item.bold) className = "message teacher"
              return (
                <li className = "messages-list" key={index}>
                  <button onClick={() => this.deleteMessage(item)} className="delete-button">
                    <p className="date">{time}</p>
                    <p className={className}>{item.content}</p>
                  </button>
                </li>
              )
            })}
          </ul>
        </div>
        <div>
          <Form onSubmit={this.submitMessage} className="form">
            <TextInput
              id="Message_Box"
              placeholder="Message"
              className="message-box"
              onChange={evt => this.updateInputValue(evt)}
              value={this.state.inputValue}
            />
            <Button
              className="send-button"
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


export default Chat