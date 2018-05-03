import React, { Component } from 'react';
import Radium, { StyleRoot } from 'radium';
import styles from './App.scss';
// import logo from './logo.svg';
import Person from './Person/Person';
import ErrorBoundary from './ErrorBoundary/ErrorBoundary';


class App extends Component {
  state = {
    persons: [
      { id: 1, name: 'Max', age: 28 },
      { id: 2, name: 'Ali', age: 29 },
      { id: 3, name: 'Sam', age: 31 },
    ],
    showPersons: true,
  };

  handleChangePersonName = (event, id) => {
    const personIndex = this.state.persons.findIndex(p => p.id === id);

    const person = {
      ...this.state.persons[personIndex],
    };

    person.name = event.target.value;

    const persons = [...this.state.persons];
    persons[personIndex] = person;
    this.setState({ persons });
  }

  handleTogglePersons = () => {
    const doesShow = this.state.showPersons;
    this.setState({ showPersons: !doesShow });
  };

  handleDeletePerson = (personIndex) => {
    const persons = this.state.persons.slice();
    persons.splice(personIndex, 1);
    this.setState({ persons });
  };

  render() {
    let persons = null;
    let buttonClass = '';

    if (this.state.showPersons) {
      persons = (
        <div>
          {
            this.state.persons.map((person, index) => {
              return <ErrorBoundary key={person.id}>
                <Person
                  click={() => this.handleDeletePerson(index)}
                  change={(event) => this.handleChangePersonName(event, person.id)}
                  name={person.name}
                  age={person.age} />
              </ErrorBoundary>
            })
          }
        </div>
      );

      buttonClass = styles.opened;
    }

    const classes = [];
    if (this.state.persons.length <= 2) {
      classes.push(styles['color-red']);
    }
    if (this.state.persons.length <= 1) {
      classes.push(styles['font-weight-700']);
    }


    return (
      <StyleRoot>
        <div className={styles.App}>
          <h1>App title</h1>
          <p className={classes.join(' ')}>Awesome paragraph!</p>
          <button className={buttonClass} onClick={this.handleTogglePersons}>Toggle</button>

          {persons}

        </div>
      </StyleRoot>
    );
    /* return React.createElement(
      'div',
      {className: 'App'},
      React.createElement('h1', null, 'App title')
    ); */
  }
}

export default Radium(App);
