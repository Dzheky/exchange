export const SWIPE_DIRECTION = {
    LEFT: 'left',
    RIGHT: 'right',
}

export const formatCurrencyValue = (value, sign) => {
    if (value === undefined || sign === undefined) {
        return null
    }

    if (value[0] && value[0] !== sign) {
        if (value[0].match(/\d/g)) {
            value = `${sign}${value}`
        } else {
            value = value.replace(value[0], sign)
        }

    }

    if (value.match(/^\D\d+(\.?\d+?|\.?)$/g)) {
        return value
    } else if (value === sign) {
        return ''
    } else {
        return null
    }
}