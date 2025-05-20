import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { GlobalStyles } from './styles/GlobalStyles.js'
import { Provider } from 'react-redux'
import { persistor, store } from './redux/store.js'
import { PersistGate } from "redux-persist/integration/react"

import "primereact/resources/themes/lara-light-cyan/theme.css";
import { ToastProvider } from './context/ToastContext'
import { GoogleOAuthProvider } from '@react-oauth/google'

ReactDOM.createRoot(document.getElementById('root')).render(
   <React.StrictMode>
      <GoogleOAuthProvider clientId="100624139882-rcl71eblremdlmsjlpd4455v4q31prsl.apps.googleusercontent.com">
         <Provider store={store}>
            <PersistGate persistor={persistor}>
               <ToastProvider>
                  <App />
                  <GlobalStyles/>
               </ToastProvider>
            </PersistGate>
         </Provider> 
      </GoogleOAuthProvider>
   </React.StrictMode>,
)
