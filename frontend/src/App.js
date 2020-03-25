import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Bem vindo a Semana Omnistack!</p>
        <p>
          Opa, tudo bom? O que acha de ver o trabalho do Daniel Hessel no primeiro dia da semana Omnistack 11?
        </p>
        <a
          className="App-link"
          href="https://github.com/daniel21h/be-the-hero"
          target="_blank"
          rel="noopener noreferrer"
        >
          Node.js
        </a>
      </header>
    </div>
  );
}

export default App;
