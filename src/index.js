import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import * as serviceWorkerRegistration from './serviceWorkerRegistration'
import { Provider as StyletronProvider, DebugEngine } from 'styletron-react'
import { Client as Styletron } from 'styletron-engine-atomic'

const debug = process.env.NODE_ENV === 'production' ? void 0 : new DebugEngine()

// 1. Create a client engine instance
const engine = new Styletron()

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <StyletronProvider value={engine} debug={debug} debugAfterHydration>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </StyletronProvider>
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register()
