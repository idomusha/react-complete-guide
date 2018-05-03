import React from 'react';
import Radium from 'radium';
import styles from './Person.scss';

const person = (props) => {
  // if (Math.random() > 0.7) throw new Error('FAIL');
  return (
    <div className={styles.Person}>
      <h3>Person: {props.name} | {props.age} </h3>
      <p>{props.children}</p>
      <input type="text" onChange={props.change} value={props.name} />
      <button type="button" onClick={props.click}>Delete</button>
    </div>
  );
};

export default Radium(person);
