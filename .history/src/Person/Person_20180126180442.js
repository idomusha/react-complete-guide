import React from 'react';
import './Person.css';

const person = (props) => {
    return (
        <div className="Person">
            <h2 onClick={props.click}>Person: {props.name} | {props.age} </h2>
            <p>{props.children}</p>
            <input type="text" onChange={props.change} value={props.name} />
        </div>
    );
};

export default person;