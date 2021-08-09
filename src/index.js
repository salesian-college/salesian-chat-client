import React from 'react'
import ReactDOM from 'react-dom'
import Index from './view/Index.jsx'
import './view/index.css'
import * as serviceWorker from './serviceWorker'

ReactDOM.render(<Index />, document.getElementById('root'))

serviceWorker.unregister()
