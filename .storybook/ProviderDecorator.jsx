import React from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import rootReducer from '../src/reducers'

const store = createStore(rootReducer)

export default storyFn => <Provider store={store}>{storyFn()}</Provider>
