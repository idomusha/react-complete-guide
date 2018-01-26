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

  switchNameHandler = (value) => {
    this.setState({
      persons: [
        { name: value, age: 28},
        { name: 'Ali', age: 29},
        { name: 'Sam', age: 31},
      ]
    });
  };

  nameChangeHandler= (event) => {
    this.setState( {
      persons: [
        { name: 'Max', age: 28},
        { name: event.target.value, age: 29},
        { name: 'Sam', age: 31},
      ]
    });
  }

  render() {
    return (
      <div className="App">
        <h1>App title</h1>
        <button onClick={ this.switchNameHandler.bind(this, 'aaa') }>Switch</button>
        <Person
          name={ this.state.persons[0].name }
          age={ this.state.persons[0].age } />
        <Person
          name={ this.state.persons[1].name }
          age={ this.state.persons[1].age } />
        <Person
          name={ this.state.persons[2].name }
          age={ this.state.persons[2].age }
          click={this.switchNameHandler}>Content</Person>
      </div>
    );
    // return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'App title'))
  }
}

export default App;
