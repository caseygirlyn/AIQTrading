import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-icons/font/bootstrap-icons.css"
import * as bootstrap from 'bootstrap';
import './index.css'

const apiKey1 = import.meta.env.VITE_API_KEY_1;
const apiKey2 = import.meta.env.VITE_API_KEY_2;
const apiKey3 = import.meta.env.VITE_API_KEY_3;
    
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
        <BrowserRouter>
            <App apiKey1={apiKey1} apiKey2={apiKey2} apiKey3={apiKey3}/>
        </BrowserRouter>
    </React.StrictMode>
)