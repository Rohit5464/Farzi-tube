import React from 'react';
import ReactDom from 'react-dom/client';
import { Store } from './features/store';
import App from './App'
import './index.css'
import { Provider } from 'react-redux';
const root = ReactDom.createRoot(document.getElementById('root'));

root.render(<Provider  store ={Store}><App/></Provider>);


