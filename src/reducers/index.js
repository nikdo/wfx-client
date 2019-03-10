import { combineReducers } from 'redux'
import searchQuery from './searchQuery'
import spotLoading from './spotLoading'
import spotDetail from './spotDetail'

export default combineReducers({
  searchQuery,
  spotLoading,
  spotDetail
})
