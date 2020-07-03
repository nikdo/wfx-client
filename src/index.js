import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import { composeWithDevTools } from 'redux-devtools-extension'

import rootReducer from './reducers'
import App from './App'
import registerServiceWorker from './registerServiceWorker'

ReactDOM.render(
  <Provider store={createStore(rootReducer, composeWithDevTools())}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
)
registerServiceWorker()
