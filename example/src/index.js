import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
//import App from './App';
import {App, DataLine} from "react-termynal-new";
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App typeDelay={80} lineDelay={700}>
      <DataLine type="input" prompt="▲">npm uninstall react</DataLine>
      <DataLine>Are you sure you want to uninstall 'react'?</DataLine>
      <DataLine type="input" typeDelay={1000} prompt="(y/n)">y</DataLine>
      <DataLine type="progress" progressChar="."></DataLine>
      <DataLine>Successfully uninstalled 'react'.</DataLine>
      <DataLine type="input" prompt="▲">node</DataLine>
      <DataLine type="input" prompt="▲">Array(5).fill('❤')</DataLine>
      <DataLine>[ '❤', '❤', '❤', '❤', '❤' ]</DataLine>
      <DataLine type="input" prompt="▲">cd ~/repos</DataLine>
      <DataLine type="input" prompt="▲ ~/repos">git checkout branch main</DataLine>
      <DataLine type="input" prompt="▲ ~/repos (main)">git commit -m "Fix things"</DataLine>
    </App>
    <h2>React Termynal</h2>
    <p>
      A terminal component for React.
    </p>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
