export const calculateExchangeRate = (fromCurrency, toCurrency, rates) => {
    if (!rates || typeof rates !== 'object') {
        return NaN
    }

    return 1 / rates[fromCurrency] * rates[toCurrency]
}