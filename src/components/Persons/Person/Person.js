import React, { Component } from 'react';
import styles from './Person.scss';
import wrapper from '../../../hoc/wrapper';

class Person extends Component {
  componentWillUnmount() {
    // Component is about to get removed => Perform any cleanup work here!
    console.log('I\'m about to be removed!');
  }

  render() {
      // if (Math.random() > 0.7) throw new Error('FAIL');
    return (
      <React.Fragment>
        <h3>Person: {this.props.name} | {this.props.age} </h3>
        <p>{this.props.children}</p>
        <input type="text" onChange={this.props.change} value={this.props.name} />
        <button type="button" onClick={this.props.click}>Delete</button>
      </React.Fragment>
    );
  }

};

export default wrapper(Person, styles.Person);
