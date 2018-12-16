import { handleActions } from 'redux-actions'
import { EXCHANGES } from '../constants/exchanges'
import { setAccountAction } from '../actions/accountActions'

const defaultState = {
    [EXCHANGES.EUR]: 21.5,
    [EXCHANGES.GBP]: 14.5,
    [EXCHANGES.USD]: 40.0,
}

export const accountReducer = handleActions({
    [setAccountAction]: (state, action) => ({
        ...action.payload,
    })
}, defaultState)