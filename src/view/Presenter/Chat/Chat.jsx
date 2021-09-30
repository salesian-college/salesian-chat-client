import React from 'react'
import { TextInput, Button, Form } from 'carbon-components-react'
import { TrashCan32, Screen32 } from '@carbon/icons-react'
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
      chatLink: props.chatLink,
      reply: {},
      edit: false,
      messageEdit: {}
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

  broadcastMessage = (message) => {
      fetch(this.props.chatLink + "/broadcast",
        {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Sal-Token': this.getToken()
          },
          method: "POST",
          body: JSON.stringify(message)
        })
        .then((r) => r.text())
        .then(console.log)
  }

  render = () => {
    return (
      <div className="chat-container">
        <div className="messages-container">
          <ul>
            {this.state.messagesList.map((item, index) => {
              var date = new Date(item.date * 1000)
              var time = (date.getHours()) + ":" + ("0" + date.getMinutes()).substr(-2)
              if (item.reply) {
                var reply = item.reply.replace(/^(.{80}[^\s]*).*/, "$1")
                if (reply.length < item.reply.length) reply = reply + "..."
                time = "Replying to: " + reply + " • " + time
              }
              var className = "message"
              return (
                <Form className="form messageform" key={index}>
                  <li className="messages-list">
                    <p className="date">{time}</p>
                    <p className={className}>{item.content}</p>
                  </li>
                  <Button
                    hasIconOnly
                    renderIcon={Screen32}
                    tooltipAlignment="center"
                    tooltipPosition="bottom"
                    iconDescription="Broadcast Message"
                    onClick={() => this.broadcastMessage(item)}
                  />
                </Form>
              )
            })}
          </ul>
        </div>
      </div >
    )
  }
}


export default Chat