import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { IntlProvider } from 'react-intl'
import configureStore from './store'
import './index.css'
import App from './components/App/App'
import localTranslations from './constants/translations/en.js'
import * as serviceWorker from './serviceWorker'

ReactDOM.render(
    <IntlProvider
        locale="en"
        messages={localTranslations}
    >
        <Provider store={configureStore()}>
            <App/>
        </Provider>
    </IntlProvider>,
    document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
