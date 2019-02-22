import React from 'react';

const list = (props) => {
    console.log('Rendering the list...');

    return (
        <ul>
            {props.items.map((item, index) => (
                <li key={item.id} onClick={props.remove.bind(this, item.id)}>{item.label}</li>
            ))}
        </ul>
    );
};

export default list;
