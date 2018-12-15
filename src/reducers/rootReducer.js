import { combineReducers } from 'redux'
import { exchangeReducer } from './exchangeReducer'

const reducer = combineReducers({
 exchanges: exchangeReducer,
})

export default reducer