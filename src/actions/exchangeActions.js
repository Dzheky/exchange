import { createAction } from 'redux-actions'
import { selectExchangeData } from '../selectors/exchanges'
import { fetchExchanges } from '../api/exchanges'

export const setExchangesAction = createAction('FETCH_EXCHANGES')

export const fetchExchangesAction = () => async (dispatch) => {
    const result = await fetchExchanges()
    const resultBody = await result.json()

    dispatch(setExchangesAction(selectExchangeData(resultBody)))
}