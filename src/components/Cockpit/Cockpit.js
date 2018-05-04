import React from 'react';
import styles from './Cockpit.scss';

const cockpit = (props) => {
    const classes = [];
    let paragraph = 'Awesome paragraph!';
    let buttonClass = '';

    if (props.showPersons) {
        buttonClass = styles.opened;
    }

    if (props.persons.length <= 2) {
      classes.push(styles['color-red']);
    }

    if (props.persons.length <= 1) {
      classes.push(styles['font-weight-700']);
      paragraph = 'Only one!';
    }

    if (props.persons.length <= 0) {
        classes.push(styles['font-weight-700']);
        paragraph = 'Add a person.';
    }

    return (
        <React.Fragment>
            <h1>{props.title}</h1>
            <p className={classes.join(' ')}>{paragraph}</p>
            <button className={buttonClass} onClick={props.clicked}>Toggle</button>
        </React.Fragment>
    );
};

export default cockpit;