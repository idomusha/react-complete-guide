import React, { PureComponent } from "react";
import Person from "./Person/Person";
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";

class Persons extends PureComponent {
  /* shouldComponentUpdate(nextProps, nextState) {
        console.log(nextProps.clicked);
        console.log(this.props.clicked);
        return nextProps.persons !== this.props.persons ||
            nextProps.clicked !== this.props.clicked ||
            nextProps.changed !== this.props.changed;
    } */
  constructor(props) {
    super(props);
    this.lastPersonRef = React.createRef();
  }

  componentDidMount() {
    this.lastPersonRef.current.focus();
  }

  render() {
    return this.props.persons.map((person, index) => {
      return (
        <ErrorBoundary key={person.id}>
          <Person
            click={() => this.props.clicked(index)}
            change={event => this.props.changed(event, person.id)}
            name={person.name}
            age={person.age}
            position={index}
            ref={this.lastPersonRef}
          />
        </ErrorBoundary>
      );
    });
  }
}

export default Persons;
