import { handleActions } from 'redux-actions'
import { setExchangesAction } from '../actions/exchangeActions'

const defaultState = {
    rates: {},
    timestamp: new Date().getTime(),
}

export const exchangeReducer = handleActions({
    [setExchangesAction]: (state, action) => ({
        ...state,
        ...action.payload,
        timestamp: action.payload.timestamp * 1000,
    }),
}, defaultState)