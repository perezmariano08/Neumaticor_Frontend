import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { GlobalStyles } from './styles/GlobalStyles.js'
import { Provider } from 'react-redux'
import { persistor, store } from './redux/store.js'
import { PersistGate } from "redux-persist/integration/react"

import "primereact/resources/themes/lara-light-cyan/theme.css";
import { ToastProvider } from './context/ToastContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <ToastProvider>
          <App />
          <GlobalStyles/>
        </ToastProvider>
      </PersistGate>
    </Provider> 
  </React.StrictMode>,
)
