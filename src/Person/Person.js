import React from 'react';
import Radium from 'radium';
import './Person.css';

const person = (props) => {
    const style = {
        '@media (max-width: 812px)': {
            width: '100%'
        }
    };
    return (
        <div className="Person" style={style}>
            <h3>Person: {props.name} | {props.age} </h3>
            <p>{props.children}</p>
            <input type="text" onChange={props.change} value={props.name} />
            <button type="button" onClick={props.click}>Delete</button>
        </div>
    );
};

export default Radium(person);