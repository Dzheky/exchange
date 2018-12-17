import { createAction } from 'redux-actions'
import { exchangeMoney, fetchAccount } from '../api/account'

export const setAccountAction = createAction('SET_ACCOUNT')

export const fetchAccountAction = () => async (dispatch) => {
    const result = await dispatch(fetchAccount())

    dispatch(setAccountAction(result))
}

export const exchangeMoneyAction = (fromValue, fromCurrency, toCurrency) => async (dispatch) => {
    const result = await dispatch(exchangeMoney(fromValue, fromCurrency, toCurrency))

    if (result) {
        dispatch(setAccountAction(result))
    }
}