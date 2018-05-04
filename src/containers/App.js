import React, { PureComponent } from 'react';
import Radium, { StyleRoot } from 'radium';
import styles from './App.scss';
// import logo from './assets/logo.svg';
import Cockpit from '../components/Cockpit/Cockpit';
import Persons from '../components/Persons/Persons';
import wrapper from '../hoc/wrapper';

class App extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      persons: [
        { id: 1, name: 'Max', age: 28 },
        { id: 2, name: 'Ali', age: 29 },
        { id: 3, name: 'Sam', age: 31 },
      ],
      showPersons: false,
      toggleClicked: 0,
    };

  }

  /* state = {
    persons: [
      { id: 1, name: 'Max', age: 28 },
      { id: 2, name: 'Ali', age: 29 },
      { id: 3, name: 'Sam', age: 31 },
    ],
    showPersons: true,
  }; */

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
    this.setState( (prevState, props) => {
      return {
        showPersons: !doesShow,
        toggleClicked: prevState.toggleClicked + 1
      }
    });
  };

  handleDeletePerson = (personIndex) => {
    const persons = this.state.persons.slice();
    persons.splice(personIndex, 1);
    this.setState({ persons });
  };

  render() {
    let persons = null;

    if (this.state.showPersons) {
      persons = <Persons
        persons={this.state.persons}
        clicked={this.handleDeletePerson}
        changed={this.handleChangePersonName}
      />;
    }

    return (
      <StyleRoot>
        <React.Fragment>
          <Cockpit
            title={this.props.title}
            showPersons={this.state.showPersons}
            persons={this.state.persons}
            clicked={this.handleTogglePersons}
          />
          {persons}

        </React.Fragment>
      </StyleRoot>
    );
    /* return React.createElement(
      'div',
      {className: 'App'},
      React.createElement('h1', null, 'App title')
    ); */
  }
}

export default wrapper(App, styles.App);
