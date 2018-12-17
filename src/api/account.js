import { selectAccount } from '../selectors/account'
import { selectExchangeRates } from '../selectors/exchanges'
import { calculateExchangeRate } from '../components/App/appModel'

export const fetchAccount = () => (dispatch, getState) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(selectAccount(getState()))
        }, 100)
    })
}

export const exchangeMoney = (fromValue, fromCurrency, toCurrency) => (dispatch, getState) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const account = selectAccount(getState())
            const rates = selectExchangeRates(getState())
            const toValue = (fromValue * calculateExchangeRate(fromCurrency, toCurrency, rates)).toFixed(2)

            if (account[fromCurrency] < fromValue) {
                resolve(null)
            }

            resolve({
                ...account,
                [fromCurrency]: account[fromCurrency] - fromValue,
                [toCurrency]: account[toCurrency] + parseFloat(toValue),
            })
        }, 100)
    })
}
