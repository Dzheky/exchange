import React, { Component } from 'react'
import { connect } from 'react-redux'
import styles from './app.module.css'
import { fetchExchangesAction } from '../../actions/exchangeActions'
import PropTypes from 'prop-types'
import { selectExchangeRates } from '../../selectors/exchanges'
import CurrencyPicker from '../CurrencyPicker/CurrencyPicker'
import { EXCHANGES, SIGNS } from '../../constants/exchanges'
import { fetchAccountAction } from '../../actions/accountActions'
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

    handleFromCurrencyChange = (currency) => {
        this.setState({
            fromCurrency: currency,
        })
    }

    handleToCurrencyChange = (currency) => {
        this.setState({
            toCurrency: currency,
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
                    ignoreCurrency={fromCurrency}
                    sign={SIGNS.PLUS}
                    currencyAmount={account[toCurrency]}
                    label={this.renderExchangeLabel()}
                    currencyValue={toValue}
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
    rates: PropTypes.object,
    account: PropTypes.object,
}

const mapStateToProps = state => ({
    rates: selectExchangeRates(state),
    account: selectAccount(state),
})

const mapDispatchToProps = dispatch => ({
    fetchExchanges: () => dispatch(fetchExchangesAction()),
    fetchAccount: () => dispatch(fetchAccountAction())
})


export default connect(mapStateToProps, mapDispatchToProps)(App)
