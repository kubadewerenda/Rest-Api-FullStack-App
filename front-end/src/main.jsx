import React from 'react'
import ReactDom from 'react-dom/client'
import App from './App.jsx'
import { Provider } from './components/ui/provider'

ReactDom.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider>
      <App />
    </Provider>  
  </React.StrictMode>,
);
