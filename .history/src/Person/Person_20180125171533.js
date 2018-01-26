import React from 'react';

const person = (props) => {
    return (
        <div>
            <p>Person: { props.name} | { props.age} </p>
            <span>test</span>
        </div>
    );
};

export default person;