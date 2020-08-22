import { combineReducers } from 'redux'
import spots from './spots'
import visits from './visits'
import searchQuery from '../search/reducer'
import spotLoading from './spotLoading'
import spotDetail from './spotDetail'

export default combineReducers({
  spots,
  visits,
  searchQuery,
  spotLoading,
  spotDetail
})
