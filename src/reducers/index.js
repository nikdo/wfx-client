import { combineReducers } from 'redux'
import searchQuery from './searchQuery'
import spotLoading from './spotLoading'

export default combineReducers({
  searchQuery,
  spotLoading
})
