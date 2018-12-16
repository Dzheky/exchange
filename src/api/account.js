import { selectAccount } from '../selectors/account'

export const fetchAccount = () => (dispatch, getState) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(selectAccount(getState()))
        }, 100)
    })
}