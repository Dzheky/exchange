import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import App from './App'
import configureStore from '../../store'
import { EXCHANGES } from '../../constants/exchanges'
import { calculateExchangeRate } from './appModel'
import localTranslations from '../../constants/translations/en'
import { IntlProvider } from 'react-intl'

const testRates = {
    [EXCHANGES.GBP]: 1.5,
    [EXCHANGES.EUR]: 1.2,
    [EXCHANGES.USD]: 1,
}

it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(
        <IntlProvider
            locale="en"
            messages={localTranslations}
        >
            <Provider store={configureStore()}>
                <App/>
            </Provider>
        </IntlProvider>
        , div)
    ReactDOM.unmountComponentAtNode(div)
})

describe('calculateExchangeRate', () => {
    it('Should calculate correct exchange rate', () => {
        expect(calculateExchangeRate(EXCHANGES.USD, EXCHANGES.GBP, testRates)).toBeCloseTo(1.5)
        expect(calculateExchangeRate(EXCHANGES.GBP, EXCHANGES.EUR, testRates)).toBeCloseTo(0.8)
    })

    it('Should return NaN on wrong parameters', () => {
        expect(calculateExchangeRate('wrong from currency', EXCHANGES.GBP, testRates)).toBeNaN()
        expect(calculateExchangeRate(EXCHANGES.GBP, EXCHANGES.USD, 'wrong rates')).toBeNaN()
        expect(calculateExchangeRate()).toBeNaN()
    })
})
