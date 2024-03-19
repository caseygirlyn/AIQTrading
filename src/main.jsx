import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-icons/font/bootstrap-icons.css"
import * as bootstrap from 'bootstrap';
import './index.css'
import { Provider } from 'react-redux';
import store from './store/store.js';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
        <BrowserRouter>
        <Provider store={store}>
            <App />
        </Provider>
        </BrowserRouter>
    </React.StrictMode>
)