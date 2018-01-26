import React from 'react';

const person = (props) => {
    return (
        <p>Person: { props.name} | { props.age} </p>
    );
};

export default person;