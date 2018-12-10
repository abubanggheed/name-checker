import React, { Component } from 'react';
import Header from './components/header/header';
import CsvGraph from './components/csv-graph/csv-graph';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <CsvGraph />
      </div>
    );
  }
}

export default App;
