import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import Person from './Person/Person';

class App extends Component {
  state = {
    persons: [
      { name: 'Max', age: 28},
      { name: 'Ali', age: 29},
      { name: 'Sam', age: 31},
    ]
  }

  switchNameHandler = () => {
    console.log('clicked');
  };

  render() {
    return (
      <div className="App">
        <h1>App title</h1>
        <button onClick={this.switchNameHandler}>Switch</button>
        <Person name={ this.state.persons[0].name } age={ this.state.persons[0].age } />
        <Person name={ this.state.persons[1].name } age={ this.state.persons[1].age } />
        <Person name={ this.state.persons[2].name } age={ this.state.persons[2].age }>Content</Person>
      </div>
    );
    // return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'App title'))
  }
}

export default App;
