import React, { Component } from 'react'
import { connect } from 'react-redux'
import styles from './app.module.css'
import { fetchExchangesAction } from '../../actions/exchangeActions'
import PropTypes from 'prop-types'
import { selectExchangeRates } from '../../selectors/exchanges'
import CurrencyPicker from '../CurrencyPicker/CurrencyPicker'
import { EXCHANGES, SIGNS } from '../../constants/exchanges'
import { exchangeMoneyAction, fetchAccountAction } from '../../actions/accountActions'
import { selectAccount } from '../../selectors/account'
import { calculateExchangeRate } from './appModel'
import { FormattedNumber } from 'react-intl'

class App extends Component {
    state = {
        fromValue: '',
        toValue: '',
        fromCurrency: EXCHANGES.GBP,
        toCurrency: EXCHANGES.EUR,
    }

    handleFromValueChange = (value) => {
        const { rates } = this.props
        const { fromCurrency, toCurrency } = this.state

        this.setState({
            fromValue: value,
            toValue: (value * calculateExchangeRate(fromCurrency, toCurrency, rates)).toFixed(2).toString(),
        })
    }

    handleToValueChange = (value) => {
        const { rates } = this.props
        const { fromCurrency, toCurrency } = this.state

        this.setState({
            toValue: value,
            fromValue: (value * calculateExchangeRate(toCurrency, fromCurrency, rates)).toFixed(2).toString(),
        })
    }

    handleExchangeClick = () => {
        const { exchangeMoney } = this.props
        const { fromValue, fromCurrency, toCurrency } = this.state

        exchangeMoney(fromValue, fromCurrency, toCurrency)

        this.setState({
            fromValue: '',
            toValue: '',
        })
    }

    handleFromCurrencyChange = (currency) => {
        const { rates } = this.props
        const { toCurrency, fromValue } = this.state

        this.setState({
            fromCurrency: currency,
            toValue: (fromValue * calculateExchangeRate(currency, toCurrency, rates)).toFixed(2).toString()
        })
    }

    handleToCurrencyChange = (currency) => {
        const { rates } = this.props
        const { fromCurrency, fromValue } = this.state

        this.setState({
            toCurrency: currency,
            toValue: (fromValue * calculateExchangeRate(fromCurrency, currency, rates)).toFixed(2).toString()
        })
    }

    componentDidMount() {
        const { fetchExchanges, fetchAccount } = this.props
        fetchExchanges()
        this.interval = setInterval(fetchExchanges, 10000)
        fetchAccount()
    }

    componentWillUnmount() {
        clearInterval(this.interval)
    }

    renderExchangeLabel = () => {
        const { rates } = this.props
        const { fromCurrency, toCurrency } = this.state
        const exchangeRate = calculateExchangeRate(fromCurrency, toCurrency, rates)

        return (
            <span>
                <FormattedNumber
                    value="1"
                    style="currency"
                    currency={fromCurrency}
                />
                {' = '}
                <FormattedNumber
                    value={exchangeRate}
                    style="currency"
                    currency={toCurrency}
                />
            </span>
        )

    }

    render() {
        const { account } = this.props
        const {
            fromValue,
            toValue,
            fromCurrency,
            toCurrency,
        } = this.state


        return (
            <div className={styles.container}>
                <div className={styles.exchangeButtonContainer}>
                    <button
                        className={styles.exchangeButton}
                        onClick={this.handleExchangeClick}
                        disabled={!fromValue || account[fromCurrency] < fromValue}
                    >
                        Exchange
                    </button>
                </div>
                <CurrencyPicker
                    initialCurrency={EXCHANGES.GBP}
                    currencyValue={fromValue}
                    sign={SIGNS.MINUS}
                    currencyAmount={account[fromCurrency]}
                    onValueChange={this.handleFromValueChange}
                    onCurrencyChange={this.handleFromCurrencyChange}
                />
                <CurrencyPicker
                    initialCurrency={EXCHANGES.EUR}
                    currencyValue={toValue}
                    sign={SIGNS.PLUS}
                    ignoreCurrency={fromCurrency}
                    currencyAmount={account[toCurrency]}
                    label={this.renderExchangeLabel()}
                    onValueChange={this.handleToValueChange}
                    onCurrencyChange={this.handleToCurrencyChange}
                />
            </div>
        )
    }
}

App.propTypes = {
    fetchExchanges: PropTypes.func,
    fetchAccount: PropTypes.func,
    exchangeMoney: PropTypes.func,
    rates: PropTypes.object,
    account: PropTypes.object,
}

const mapStateToProps = state => ({
    rates: selectExchangeRates(state),
    account: selectAccount(state),
})

const mapDispatchToProps = dispatch => ({
    fetchExchanges: () => dispatch(fetchExchangesAction()),
    fetchAccount: () => dispatch(fetchAccountAction()),
    exchangeMoney: (fromValue, fromCurrency, toCurrency) => dispatch(exchangeMoneyAction(fromValue, fromCurrency, toCurrency)),
})


export default connect(mapStateToProps, mapDispatchToProps)(App)
