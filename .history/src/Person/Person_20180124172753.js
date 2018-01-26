import React from 'react';

const person = () => {
    return (
        <p>Person</p>
        <span>Age: { Math.floor(Math.random() * 30) }</span>
    );
};

export default person;