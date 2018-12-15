import React, { Component } from 'react'
import { connect } from 'react-redux'
import styles from './app.module.css'
import { fetchExchangesAction } from '../../actions/exchangeActions'
import PropTypes from 'prop-types'
import { selectExchangeRates } from '../../selectors/exchanges'
import CurrencyPicker from '../CurrencyPicker/CurrencyPicker'
import { EXCHANGES, SIGNS } from '../../constants/exchanges'

class App extends Component {
    componentDidMount() {
        this.interval = setInterval(this.props.fetchExchanges, 10000)
    }

    componentWillUnmount() {
        clearInterval(this.interval)
    }

    render() {
        return (
            <div className={styles.container}>
                <CurrencyPicker
                    currency={EXCHANGES.GBP}
                    sign={SIGNS.MINUS}
                />
            </div>
        )
    }
}

App.propTypes = {
    fetchExchanges: PropTypes.func,
    rates: PropTypes.object,
}

const mapStateToProps = state => ({
    rates: selectExchangeRates(state),
})

const mapDispatchToProps = dispatch => ({
    fetchExchanges: () => dispatch(fetchExchangesAction())
})


export default connect(mapStateToProps, mapDispatchToProps)(App)
