import React from 'react'
import { TextInput, Button, Form } from 'carbon-components-react'
import { Send32, Edit32, TrashCan32, Reply32 } from '@carbon/icons-react'
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

  submitMessage = (event) => {
    event.preventDefault()
    if (this.state.edit) {
      fetch(this.props.chatLink + "/edit",
        {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'sal-token': this.getToken()
          },
          method: "POST",
          body: JSON.stringify({ "newContent": this.state.inputValue, "oldContent": this.state.messageEdit })
        })
        .then(r => r.json())
        .then((r) => {
          this.setState({ messagesList: r, inputValue: "", reply: {}, edit: false, messageEdit: {} })
        })
    }
    else {
      fetch(this.props.chatLink,
        {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'sal-token': this.getToken()
          },
          method: "POST",
          body: JSON.stringify({ "content": this.state.inputValue, "reply": this.state.reply.content })
        })
        .then(r => r.json())
        .then((r) => {
          this.setState({ messagesList: r, inputValue: "", reply: {} })
        })
    }
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
              if (item.reply) {
                var reply = item.reply.replace(/^(.{80}[^\s]*).*/, "$1")
                if (reply.length < item.reply.length) reply = reply + "..."
                time = "Replying to: " + reply + " • " + time
              }
              var className = "message"
              var edit = <Button
                hasIconOnly
                renderIcon={Reply32}
                tooltipAlignment="center"
                tooltipPosition="bottom"
                iconDescription="Reply to Message"
                size='field'
                onClick={() => this.setState({ reply: item })}
              />
              if (item.bold) {
                className = "message teacher"
                edit = <Button
                  hasIconOnly
                  renderIcon={Edit32}
                  tooltipAlignment="center"
                  tooltipPosition="bottom"
                  iconDescription="Edit Message"
                  size='field'
                  onClick={() => { this.setState({ edit: true, messageEdit: item, inputValue: item.content }); this.messageInput.focus() }}
                />
              }
              return (
                <Form className="form messageform" key={index}>
                  <li className="messages-list">
                    <p className="date">{time}</p>
                    <p className={className}>{item.content}</p>
                  </li>
                  {edit}
                  <Button
                    hasIconOnly
                    renderIcon={TrashCan32}
                    tooltipAlignment="center"
                    tooltipPosition="bottom"
                    iconDescription="Delete Message"
                    size='field'
                    kind="danger"
                    onClick={() => this.deleteMessage(item)}
                  />
                </Form>
              )
            })}
          </ul>
        </div>
        <div style={{ "visibility": this.state.reply.content ? "visible" : "hidden" }} className="reply-box">
          <a onClick={() => this.setState({ reply: {} })}>Replying to: "{this.state.reply.content}"</a>
        </div>
        <div>
          <Form onSubmit={this.submitMessage} className="form">
            <TextInput
              ref={(input) => { this.messageInput = input; }}
              id="Message_Box"
              placeholder="Message"
              className="message-box"
              onChange={evt => this.updateInputValue(evt)}
              value={this.state.inputValue}
            />
            <Button
              className="send-button"
              hasIconOnly
              renderIcon={this.state.edit ? Edit32 : Send32}
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