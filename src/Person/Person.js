import React from 'react';
import './Person.css';

const person = (props) => {
    return (
        <div className="Person">
            <h3>Person: {props.name} | {props.age} </h3>
            <p>{props.children}</p>
            <input type="text" onChange={props.change} value={props.name} />
            <button type="button" onClick={props.click}>Delete</button>
        </div>
    );
};

export default person;