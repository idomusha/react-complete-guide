import React, { PureComponent } from 'react';
import Person from './Person/Person';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';

class Persons extends PureComponent {
    /* shouldComponentUpdate(nextProps, nextState) {
        console.log(nextProps.clicked);
        console.log(this.props.clicked);
        return nextProps.persons !== this.props.persons ||
            nextProps.clicked !== this.props.clicked ||
            nextProps.changed !== this.props.changed;
    } */

    render() {
        return this.props.persons.map((person, index) => {
            return <ErrorBoundary key={person.id}>
              <Person
                click={() => this.props.clicked(index)}
                change={(event) => this.props.changed(event, person.id)}
                name={person.name}
                age={person.age} />
            </ErrorBoundary>
          });
    }
}

      export default Persons;