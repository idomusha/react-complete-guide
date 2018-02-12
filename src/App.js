import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import Radium, { StyleRoot } from 'radium';
import Person from './Person/Person';


class App extends Component {
  state = {
    persons: [
      { id: 1, name: 'Max', age: 28},
      { id: 2, name: 'Ali', age: 29},
      { id: 3, name: 'Sam', age: 31},
    ],
    showPersons: true
  }

  handleChangePersonName = (event, id) => {
    const personIndex = this.state.persons.findIndex(p => p.id === id);

    const person = {
      ...this.state.persons[personIndex]
    };

    person.name = event.target.value;

    const persons = [...this.state.persons];
    persons[personIndex] = person;
    this.setState({persons: persons});
  }

  handleTogglePersons = () => {
    const doesShow = this.state.showPersons;
    this.setState({showPersons: !doesShow});
  };

  handleDeletePerson = (personIndex) => {
    const persons = this.state.persons.slice();
    persons.splice(personIndex, 1);
    this.setState({persons: persons})
  };

  render() {
    const style = {
      backgroundColor: 'cyan',
      border: '1px solid grey',
      padding: '8px',
      cursor: 'pointer',
      ':hover': {
        backgroundColor: 'lightblue',
      }
    };
    let persons = null;

    if (this.state.showPersons) {
      persons = (
        <div>
          {
            this.state.persons.map((person, index) => {
              return <Person
              key={person.id}
              click={() => this.handleDeletePerson(index)}
              change={(event) => this.handleChangePersonName(event, person.id)}
              name={person.name}
              age={person.age} />
            })
          }
        </div>
      );

      style.backgroundColor = 'greenyellow';
      style[':hover'] = {
        backgroundColor: 'lightgreen',
      };
    }

    let classes = [];
    if (this.state.persons.length <= 2) {
      classes.push('color-red');
    }
    if (this.state.persons.length <= 1) {
      classes.push('font-weight-700');
    }


    return (
      <StyleRoot>
        <div className="App">
          <h1>App title</h1>
          <p className={classes.join(' ')}>Awesome paragraph!</p>
          <button style={style} onClick={this.handleTogglePersons}>Toggle</button>

          {persons}

        </div>
      </StyleRoot>
    );
    // return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'App title'))
  }
}

export default Radium(App);
