import React, { Component } from 'react'
import classnames from 'classnames/bind'
import Slider from 'react-slick'
import PropTypes from 'prop-types'
import styles from './currencyPicker.module.css'
import { EXCHANGES } from '../../constants/exchanges'

import './customDots.css'

const cx = classnames.bind(styles)

class CurrencyPicker extends Component {

    state = {
        currencyInputValue: '',
    }

    handleInputChange = (event) => {
        const { sign } = this.props
        let { value } = event.target

        if (value[0] !== sign) {
            value = `${sign}${value}`
        }

        if (value.match(/^\D\d+(\.?\d+?|\.?)$/g)) {
            this.setState({
                currencyInputValue: value,
            })
        } else if (value === sign) {
            this.setState({
                currencyInputValue: '',
            })
        }

    }

    renderPickerPage = (currency) => (
        <div
            key={currency}
            className={styles.page}
        >
            <div className={styles.pageTopContent}>
                <div className={styles.currencyLabel}>
                    {currency}
                </div>
                <input
                    className={styles.currencyInput}
                    value={this.state.currencyInputValue}
                    onChange={this.handleInputChange}
                />
            </div>
            <div className={styles.pageBottomContent}>
            </div>
        </div>
    )

    render() {
        return (
            <div className={cx('container', this.props.className)}>
                <Slider
                    arrows={false}
                    dots
                >
                    {Object.keys(EXCHANGES).map(this.renderPickerPage)}
                </Slider>
            </div>
        )
    }
}

CurrencyPicker.propTypes = {
    className: PropTypes.string,
    sign: PropTypes.string,
}

export default CurrencyPicker