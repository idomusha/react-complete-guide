import React from 'react';

const person = (props) => {
    return (
        <div className="Person">
            <p onClick={props.click}>Person: {props.name} | {props.age} </p>
            <p>{props.children}</p>
            <input type="text" onChange={props.change} value={props.name} />
        </div>
    );
};

export default person;