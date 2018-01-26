import React from 'react';

const person = (props) => {
    return (
        <div>
            <p onClick={props.click}>Person: { props.name} | { props.age} </p>
            <p>{props.children}</p>
        </div>
    );
};

export default person;