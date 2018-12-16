import { createAction } from 'redux-actions'
import { fetchAccount } from '../api/account'

export const setAccountAction = createAction('SET_ACCOUNT')

export const fetchAccountAction = () => async (dispatch) => {
    const result = await dispatch(fetchAccount())

    dispatch(setAccountAction(result))
}