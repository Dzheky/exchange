import { createSelector } from 'reselect'

export const selectExchangeRatesData = data => data.rates
export const selectExchangeTimestampData = data => data.timestamp
export const selectExchange = state => state.exchanges

export const selectExchangeRates = createSelector(
    selectExchange,
    (exchanges) => exchanges.rates
)

export const selectExchangeTimestmap = createSelector(
    selectExchange,
    (exchanges) => exchanges.timestamp
)

export const selectExchangeData = createSelector(
    selectExchangeRatesData,
    selectExchangeTimestampData,
    (rates, timestamp) => ({
        rates,
        timestamp,
    })
)