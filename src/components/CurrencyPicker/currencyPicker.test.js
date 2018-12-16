import { formatCurrencyValue, getCarouselIndex, SLIDE_DIRECTION } from './currencyPickerModel'
import { SIGNS } from '../../constants/exchanges'

describe('formatCurrencyValue', () => {
    it('Should return value with the sign provided', () => {
        expect(formatCurrencyValue('123.22', SIGNS.MINUS)).toBe(`${SIGNS.MINUS}123.22`)
    })

    it('Should return empty string if value is just a sign', () => {
        expect(formatCurrencyValue('-', SIGNS.MINUS)).toBe('')
    })

    it('Should return null if value is invalid', () => {
        expect(formatCurrencyValue('123,22', SIGNS.MINUS)).toBeNull()
    })

    it('Should return null if there is no value or sign', () => {
        expect(formatCurrencyValue()).toBeNull()
    })

    it('Should replace old sign if different sign provided', () => {
        expect(formatCurrencyValue('-123.22', SIGNS.PLUS)).toBe(`${SIGNS.PLUS}123.22`)
    })

    it('Should not add extra sign', () => {
        expect(formatCurrencyValue('-123.22', SIGNS.MINUS)).toBe(`${SIGNS.MINUS}123.22`)
    })
})

