import React, { useState } from 'react'

import {
  Content,
  TextInput,
  Button,
  Row
} from 'carbon-components-react'

import { ArrowRight20 } from '@carbon/icons-react'

const Login = ({ setToken }) => {
  const [password, setPassword] = useState()
  const [error, setError] = useState()

  const handleSubmit = () => {
    fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ password })
    })
      .then(data => data.json())
      .then(json => {
        if (json.error) setError(true)
        else setToken(json.password)
      })
  }

  return (
    <Content>
      <div className='container' style={{ "width": "100vw" }}>
        <div style={{ "width": "25vw", "margin": "auto" }}>
          <br />
          <br />
          <img src="/images/icon.jpg" style={{ "width": "25vw", "margin": "auto" }} />
          <br />
          <br />
          <br />
          <br />
          <br />
          <Row>
            <TextInput
              type='password'
              id='password'
              placeholder='••••••••••'
              labelText='Password'
              onClick={() => { }}
              onChange={e => setPassword(e.target.value)}
              invalidText="The password you entered was invalid"
              invalid={error}
            />
          </Row>
          <br />
          <Row>
            <Button onClick={handleSubmit} size='default' kind='primary' style={{ width: '100%', maxWidth: '100%' }} renderIcon={ArrowRight20}>
              Continue
            </Button>
          </Row>
          <br />
        </div>
      </div>
    </Content>
  )
}

export default Login