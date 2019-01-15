import React, { Component } from 'react';
import './App.css';

import CalculatorContainer from './components/CalculatorContainer/CalculatorContainer'

class App extends Component {
  render() {
    return (
      <div className="App">
        <CalculatorContainer />
      </div>
    );
  }
}

export default App;
