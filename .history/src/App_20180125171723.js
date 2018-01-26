import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import Person from './Person/Person';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>App title</h1>
        <Person name="Max" age="28" />
        <Person name="Ali" age="29" />
        <Person name="Sam" age="27">Content</Person>

      </div>
    );
    // return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'App title'))
  }
}

export default App;
