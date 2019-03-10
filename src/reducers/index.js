import { combineReducers } from 'redux'
import spots from './spots'
import searchQuery from './searchQuery'
import spotLoading from './spotLoading'
import spotDetail from './spotDetail'

export default combineReducers({
  spots,
  searchQuery,
  spotLoading,
  spotDetail
})
