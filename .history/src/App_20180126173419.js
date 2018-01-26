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
    this.setState({showPersos: !doesShow});
  };

  render() {
    const style = {
      backgroundColor: 'cyan',
      border: '1px solid grey',
      padding: '8px',
      cursor: 'pointer',
    };
    return (
      <div className="App">
        <h1>App title</h1>
        <button style={style} onClick={ this.togglePersonsHandler }>Toggle</button>
        { this.state.showPersons ?
          <div>
            <Person
              name={ this.state.persons[0].name }
              age={ this.state.persons[0].age } />
            <Person
              name={ this.state.persons[1].name }
              age={ this.state.persons[1].age } />
            <Person
              name={ this.state.persons[2].name }
              age={ this.state.persons[2].age }
              click={this.switchNameHandler }
              change={this.nameChangeHandler }>Content</Person>
          </div> : null
        }
      </div>
    );
    // return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'App title'))
  }
}

export default App;
