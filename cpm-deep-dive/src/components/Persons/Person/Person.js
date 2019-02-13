import React, { Component } from "react";
import PropTypes from "prop-types";
import styles from "./Person.scss";
import wrapper from "../../../hoc/wrapper";
import { AuthContext } from "../../../containers/App";
class Person extends Component {
  constructor(props) {
    super(props);
    this.inputElement = React.createRef();
  }

  componentDidMount() {
    if (this.props.position === 0) {
      this.inputElement.current.focus();
    }
  }

  componentWillUnmount() {
    // Component is about to get removed => Perform any cleanup work here!
    console.log("I'm about to be removed!");
  }

  focus() {
    this.inputElement.current.focus();
  }

  render() {
    // if (Math.random() > 0.7) throw new Error('FAIL');
    return (
      <React.Fragment>
        <h3>
          Person: {this.props.name}{" "}
          <AuthContext.Consumer>
            {auth => (auth ? <small> (logged)</small> : null)}
          </AuthContext.Consumer>
          {" | "}
          {this.props.age}{" "}
        </h3>
        <p>{this.props.children}</p>
        <input
          ref={this.inputElement}
          type="text"
          onChange={this.props.change}
          value={this.props.name}
        />
        <button type="button" onClick={this.props.click}>
          Delete
        </button>
      </React.Fragment>
    );
  }
}

Person.propTypes = {
  name: PropTypes.string,
  age: PropTypes.number,
  click: PropTypes.func,
  change: PropTypes.func
};

export default wrapper(Person, styles.Person);
