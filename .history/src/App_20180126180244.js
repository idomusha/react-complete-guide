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

  nameChangeHandler = (event) => {
    this.setState( {
      persons: [
        { name: 'Max', age: 28},
        { name: 'Ali', age: 29},
        { name: event.target.value, age: 31},
      ]
    });
  }

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({showPersons: !doesShow});
  };

  render() {
    const style = {
      backgroundColor: 'cyan',
      border: '1px solid grey',
      padding: '8px',
      cursor: 'pointer',
    };
    let persons = null;

    if (this.state.showPersons) {
      persons = (
        <div>
          {
            this.state.persons.map(person => {
              return <Person
              name={person.name}
              age={person.age} />
            })
          }
        </div>
      );
    }

    return (
      <div className="App">
        <h1>App title</h1>
        <button style={style} onClick={ this.togglePersonsHandler }>Toggle</button>

        {persons}

      </div>
    );
    // return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'App title'))
  }
}

export default App;
