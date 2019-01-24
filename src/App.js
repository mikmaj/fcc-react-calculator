import React, { Component } from 'react';
import './App.css';

import CalculatorContainer from './components/CalculatorContainer/CalculatorContainer'

class App extends Component {
  render() {
    return (
      <div className="App">
          <CalculatorContainer />
          <footer>
            created by <a href="https://github.com/mikmaj" target="_blank" rel="noopener noreferrer"> mikmaj </a>
          </footer>
      </div>
    );
  }
}

export default App;
