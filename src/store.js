import { createStore } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { composeWithDevTools } from 'redux-devtools-extension'
import rootReducer from './reducers'

const rootPersistConfig = {
  key: 'root',
  storage,
  whitelist: ['visits']
}

const persistedReducer = persistReducer(rootPersistConfig, rootReducer)

export const store = createStore(persistedReducer, composeWithDevTools())
export const persistor = persistStore(store)
