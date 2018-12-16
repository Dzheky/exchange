import React, { Component } from 'react'
import classnames from 'classnames/bind'
import Slider from 'react-slick'
import PropTypes from 'prop-types'
import styles from './currencyPicker.module.css'
import { FormattedMessage, FormattedNumber } from 'react-intl'
import { EXCHANGES } from '../../constants/exchanges'

import './customCarouselDots.css'
import { formatCurrencyValue, SWIPE_DIRECTION } from './currencyPickerModel'

const cx = classnames.bind(styles)

class CurrencyPicker extends Component {
    slider
    timer
    direction
    exchanges = Object.keys(EXCHANGES)
    carouselIndex = this.exchanges.indexOf(this.props.initialCurrency) || 0
    carouselCurrency = this.props.initialCurrency

    state = {
        currencyInputValue: '',
    }

    componentDidUpdate() {
        if (this.carouselCurrency === this.props.ignoreCurrency) {
            this.slider.slickPrev()
        }
    }

    componentWillUnmount() {
        clearTimeout(this.timer)
    }

    handleSwipe = (direction) => {
        this.direction = direction
    }

    handleAfterChange = (index) => {
        const { ignoreCurrency, onCurrencyChange } = this.props
        const newCurrency = this.exchanges[index]

        if (ignoreCurrency && ignoreCurrency === newCurrency) {
            this.timer = setTimeout(() => {
                if (this.direction === SWIPE_DIRECTION.LEFT) {
                    this.slider.slickNext()
                } else {
                    this.slider.slickPrev()
                }
            }, 100)
            window.slider = this.slider
        } else {
            onCurrencyChange(newCurrency)
        }

        this.carouselIndex = index
        this.carouselCurrency = newCurrency
    }

    handleInputChange = (event) => {
        const { sign, onValueChange } = this.props
        const { value } = event.target
        const formattedValue = formatCurrencyValue(value, sign)

        if (formattedValue !== null) {
            if (onValueChange) {
                onValueChange(formattedValue.substring(1))
            } else {
                this.setState({
                    currencyInputValue: formattedValue,
                })
            }
        }

    }

    renderCurrencyAmount = () => {
        const { currencyAmount } = this.props

        return (
            <FormattedMessage
                id="components/App/youHaveAmount"
                values={{
                    amount: (
                        <FormattedNumber
                            value={currencyAmount}
                            style="currency"
                            currency={this.carouselCurrency}
                        />
                    ),
                }}
            />
        )
    }

    renderPickerPage = (currency) => {
        const { currencyInputValue } = this.state
        const { currencyValue, sign, label } = this.props

        return (
            <div
                key={currency}
                className={styles.page}
            >
                <div className={styles.pageTopContent}>
                    <div>
                        {currency}
                    </div>
                    <input
                        className={styles.currencyInput}
                        value={formatCurrencyValue(currencyValue, sign) || currencyInputValue}
                        onChange={this.handleInputChange}
                    />
                </div>
                <div className={styles.pageBottomContent}>
                    {this.renderCurrencyAmount()}
                    <div>
                        {label && label}
                    </div>
                </div>
            </div>
        )
    }

    setSliderRef = (ref) => {
        this.slider = ref
    }

    render() {
        return (
            <div className={cx('container', this.props.className)}>
                <Slider
                    ref={this.setSliderRef}
                    arrows={false}
                    initialSlide={this.carouselIndex}
                    afterChange={this.handleAfterChange}
                    onSwipe={this.handleSwipe}
                    dots
                    infinite
                >
                    {this.exchanges.map(this.renderPickerPage)}
                </Slider>
            </div>
        )
    }
}

CurrencyPicker.propTypes = {
    className: PropTypes.string,
    sign: PropTypes.string,
    initialCurrency: PropTypes.string,
    ignoreCurrency: PropTypes.string,
    currencyValue: PropTypes.string,
    currencyAmount: PropTypes.number,
    onValueChange: PropTypes.func,
    onCurrencyChange: PropTypes.func,
    label: PropTypes.node,
}

export default CurrencyPicker