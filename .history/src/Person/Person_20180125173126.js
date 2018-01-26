import React from 'react';

const person = (props) => {
    return (
        <div>
            <p>Person: { props.name} | { props.age} </p>
            <p>{props.children}</p>
            <button>switch</button>
        </div>
    );
};

export default person;