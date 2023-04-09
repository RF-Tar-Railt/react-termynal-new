import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
//import App from './App';
import {App, DataLine} from "react-termynal-new";
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App>
      <DataLine type="input">pip install spacy</DataLine>
      <DataLine type="progress"></DataLine>
      <DataLine>SUCCESS: spacy-2.0.18-cp36-cp36m-win_amd64.whl is in your current directory.</DataLine>
      <DataLine></DataLine>
      <DataLine type="input">python -m spacy download en</DataLine>
      <DataLine type="progress"></DataLine>
      <DataLine>Installed en_core_web_sm-2.0.0</DataLine>
      <DataLine></DataLine>
      <DataLine type="input">python</DataLine>
      <DataLine type="input" prompt=">>>">import spacy</DataLine>
      <DataLine type="input" prompt=">>>">nlp = spacy.load('en')</DataLine>
      <DataLine type="input" prompt=">>>">doc = nlp("Hello world!")</DataLine>
      <DataLine type="input" prompt=">>>">print([(w.text, w.pos_) for w in doc])</DataLine>
      <DataLine type="output">[('Hello', 'INTJ'), ('world', 'NOUN'), ('!', 'PUNCT')]</DataLine>
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
