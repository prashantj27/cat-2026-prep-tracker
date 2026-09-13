import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { AppStoreProvider } from './hooks/store.jsx'
import './styles/base.css'
import './styles/components.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <AppStoreProvider>
    <App />
  </AppStoreProvider>,
)