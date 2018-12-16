import { combineReducers } from 'redux'
import { exchangeReducer } from './exchangeReducer'
import { accountReducer } from './accountReducer'

const reducer = combineReducers({
    exchanges: exchangeReducer,
    account: accountReducer,
})

export default reducer